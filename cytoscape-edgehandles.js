;(function( $$, $ ){ 'use strict';

  // registers the extension on a cytoscape lib ref
  var register = function( $$, $ ){
    if( !cytoscape ){ return; } // can't register if cytoscape unspecified

    var defaults = {
      preview: true, // whether to show added edges preview before releasing selection
      handleSize: 10, // the size of the edge handle put on nodes
      handleTouchTargetMult: 3, // effective size of handle on touch (not shown but used to make grabbing the small handle easier)
      handleColor: '#ff0000', // the colour of the handle and the line drawn from it
      handleLineType: 'ghost', // can be 'ghost' for real edge, 'straight' for a straight line, or 'draw' for a draw-as-you-go line
      handleLineWidth: 1, // width of handle line in pixels
      handleNodes: 'node', // selector/filter function for whether edges can be made from a given node
      hoverDelay: 150, // time spend over a target node before it is considered a target selection
      cxt: false, // whether cxt events trigger edgehandles (useful on touch)
      enabled: true, // whether to start the plugin in the enabled state
      toggleOffOnLeave: false, // whether an edge is cancelled by leaving a node (true), or whether you need to go over again to cancel (false; allows multiple edges in one pass)
      edgeType: function( sourceNode, targetNode ){
        // can return 'flat' for flat edges between nodes or 'node' for intermediate node between them
        // returning null/undefined means an edge can't be added between the two nodes
        return 'flat'; 
      },
      loopAllowed: function( node ){
        // for the specified node, return whether edges from itself to itself are allowed
        return false;
      },
      nodeLoopOffset: -50, // offset for edgeType: 'node' loops
      nodeParams: function( sourceNode, targetNode ){
        // for edges between the specified source and target
        // return element object to be passed to cy.add() for intermediary node
        return {};
      },
      edgeParams: function( sourceNode, targetNode, i ){
        // for edges between the specified source and target
        // return element object to be passed to cy.add() for edge
        // NB: i indicates edge index in case of edgeType: 'node'
        return {};
      },
      start: function( sourceNode ){
        // fired when edgehandles interaction starts (drag on handle)
      },
      complete: function( sourceNode, targetNodes, addedEntities ){
        // fired when edgehandles is done and entities are added
      },
      stop: function( sourceNode ){
        // fired when edgehandles interaction is stopped (either complete with added edges or incomplete)
      }
    };
    
    $.fn.cytoscapeEdgehandles = function( params ){
      var fn = params;
      
      var functions = {
        destroy: function(){
          var $container = $(this);
          var data = $container.data('cyedgehandles');
          
          if( data == null ){
            return;
          }
          
          data.unbind();
          $container.data('cyedgehandles', {});
          
          return $container;
        },
        
        option: function(name, value){
          var $container = $(this);
          var data = $container.data('cyedgehandles');
          
          if( data == null ){
            return;
          }
          
          var options = data.options;
          
          if( value === undefined ){
            if( typeof name == typeof {} ){
              var newOpts = name;
              options = $.extend(true, {}, defaults, newOpts);
              data.options = options;
            } else {
              return options[ name ];
            }
          } else {
            options[ name ] = value;
          }
          
          $container.data('cyedgehandles', data);

          return $container;
        },

        disable: function(){
          return functions.option.apply(this, ['enabled', false]);
        },

        enable: function(){
          return functions.option.apply(this, ['enabled', true]);
        },
          
        resize: function(){
          var $container = $(this);

          $container.trigger('cyedgehandles.resize');
        },

        drawon: function(){
          $(this).trigger('cyedgehandles.drawon');
        },

        drawoff: function(){
          $(this).trigger('cyedgehandles.drawoff');
        },

        init: function(){
          var self = this;
          var opts = $.extend(true, {}, defaults, params); 
          var $container = $(this);
          var cy;
          var $canvas = $('<canvas></canvas>');
          var handle;
          var line, linePoints;
          var mdownOnHandle = false;
          var grabbingNode = false;
          var inForceStart = false;
          var hx, hy, hr;
          var hoverTimeout;
          var drawsClear = true;
          var ghostNode;
          var ghostEdge;
          var sourceNode;
          var drawMode = false;

          $container.append( $canvas );

          function sizeCanvas(){
            $canvas
              .attr('height', $container.height())
              .attr('width', $container.width())
              .css({
                'position': 'absolute',
                'z-index': '999'
              })
            ;
          }
          sizeCanvas();

          $(window).bind('resize', function(){
            sizeCanvas();
          });

          $container.bind('cyedgehandles.resize', function(){
            sizeCanvas();
          });

          var prevUngrabifyState;
          $container.on('cyedgehandles.drawon', function(){
            drawMode = true;

            prevUngrabifyState = cy.autoungrabify();

            cy.autoungrabify(true);
          });

          $container.on('cyedgehandles.drawoff', function(){
            drawMode = false;

            cy.autoungrabify(prevUngrabifyState);
          });

          var ctx = $canvas[0].getContext('2d'); 
          
          // write options to data
          var data = $container.data('cyedgehandles');
          if( data == null ){
            data = {};
          }
          data.options = opts;
          
          var optCache;
          function options(){
            return optCache || (optCache = $container.data('cyedgehandles').options);
          }

          function enabled(){
            return options().enabled;
          }

          function disabled(){
            return !enabled();
          }
          
          function clearDraws(){ 

            if( drawsClear ){ return; } // break early to be efficient

            var w = $container.width();
            var h = $container.height();

            ctx.clearRect( 0, 0, w, h );
            drawsClear = true;
          }

          var lastPanningEnabled, lastZoomingEnabled, lastBoxSelectionEnabled;
          function disableGestures(){
            lastPanningEnabled = cy.panningEnabled();
            lastZoomingEnabled = cy.zoomingEnabled();
            lastBoxSelectionEnabled = cy.boxSelectionEnabled();

            cy
              .zoomingEnabled(false)
              .panningEnabled(false)
              .boxSelectionEnabled(false)
            ;
          }

          function resetGestures(){
            cy
              .zoomingEnabled(lastZoomingEnabled)
              .panningEnabled(lastPanningEnabled)
              .boxSelectionEnabled(lastBoxSelectionEnabled)
            ;
          }

          function resetToDefaultState(){

            clearDraws();
            
            //setTimeout(function(){
              cy.nodes()
                .removeClass('edgehandles-hover')
                .removeClass('edgehandles-source')
                .removeClass('edgehandles-target')
              ;

              cy.$('.edgehandles-ghost').remove();
            //}, 1);
            

            linePoints = null;

            sourceNode = null;
            
            resetGestures();
          }
          
          function makePreview( source, target ){
            makeEdges( true );

            target.trigger('cyedgehandles.addpreview');
          }
          
          function removePreview( source, target ){
            source.edgesWith(target).filter('.edgehandles-preview').remove();
            
            target
              .neighborhood('node.edgehandles-preview')
              .closedNeighborhood('.edgehandles-preview')
              .remove();

            target.trigger('cyedgehandles.removepreview');
            
          }
          
          function drawHandle(hx, hy, hr){
            ctx.fillStyle = options().handleColor;
            ctx.strokeStyle = options().handleColor;

            // if( $$.is.touch() ){
            //   hr *= 1.5;
            //   hy -= hr/3;
            // }

            ctx.beginPath();
            ctx.arc(hx, hy, hr, 0 , 2*Math.PI);
            ctx.closePath();
            ctx.fill();

            drawsClear = false;
          }

          var lineDrawRate = 1000/30;
          var lastDrawLine = 0;
          var drawLine = function(hx, hy, x, y){
            var now = +new Date();

            if( now - lastDrawLine < lineDrawRate ){
              return;
            }

            lastDrawLine = now;

            if( options().handleLineType !== 'ghost' ){
              ctx.fillStyle = options().handleColor;
              ctx.strokeStyle = options().handleColor;
              ctx.lineWidth = options().handleLineWidth;
            }

            // draw line based on type
            switch( options().handleLineType ){
            case 'ghost':

              if( !ghostNode || ghostNode.removed() ){

                drawHandle();

                ghostNode = cy.add({
                  group: 'nodes',
                  classes: 'edgehandles-ghost edgehandles-ghost-node',
                  css: {
                    'background-color': 'blue',
                    'width': 0.0001,
                    'height': 0.0001,
                    'opacity': 0
                  },
                  position: {
                    x: 0,
                    y: 0
                  }
                });

                ghostEdge = cy.add({
                  group: 'edges',
                  classes: 'edgehandles-ghost edgehandles-ghost-edge',
                  data: {
                    source: sourceNode.id(),
                    target: ghostNode.id()
                  }
                });

              }

              ghostNode.renderedPosition({
                x: x,
                y: y
              });
              

              break;

            case 'straight':

              ctx.beginPath();
              ctx.moveTo(hx, hy);
              ctx.lineTo(x, y);
              ctx.closePath();
              ctx.stroke();
              
              break;
            case 'draw':
            default:
              
              if( linePoints == null ){
                linePoints = [ [x, y] ];
              } else {
                linePoints.push([ x, y ]);
              }

              ctx.beginPath();
              ctx.moveTo(hx, hy);

              for( var i = 0; i < linePoints.length; i++ ){
                var pt = linePoints[i];

                ctx.lineTo(pt[0], pt[1]);
              }

              ctx.stroke();

              break;
            }

            if( options().handleLineType !== 'ghost' ){
              drawsClear = false;
            }
          };

          function makeEdges( preview, src, tgt ){
            
            // console.log('make edges', preview);
            
            var source = src ? src : cy.nodes('.edgehandles-source');
            var targets = tgt ? tgt : cy.nodes('.edgehandles-target');
            var classes = preview ? 'edgehandles-preview' : '';
            var added = cy.collection();
            
            if( !src && !tgt && !preview && options().preview ){
              cy.$('.edgehandles-ghost').remove();
            }

            if( source.size() === 0 || targets.size() === 0 ){
              return; // nothing to do :(
            }
            
            // just remove preview class if we already have the edges
            if( !src && !tgt ){
              if( !preview && options().preview ){
                added = cy.elements('.edgehandles-preview').removeClass('edgehandles-preview');
                
                options().complete( source, targets, added );
                source.trigger('cyedgehandles.complete'); 
                return;
              } else {
                // remove old previews
                cy.elements('.edgehandles-preview').remove();
              }
            }
            
            for( var i = 0; i < targets.length; i++ ){
              var target = targets[i];
              
              switch( options().edgeType( source, target ) ){
              case 'node':
                
                var p1 = source.position();
                var p2 = target.position();
                var p;

                if( source.id() === target.id() ){
                  p = {
                    x: p1.x + options().nodeLoopOffset,
                    y: p1.y + options().nodeLoopOffset
                  };
                } else {
                  p = {
                    x: (p1.x + p2.x)/2,
                    y: (p1.y + p2.y)/2
                  };
                }
                          
                var interNode = cy.add($.extend( true, {
                  group: 'nodes',
                  position: p
                }, options().nodeParams(source, target) )).addClass(classes);

                var source2inter = cy.add($.extend( true, {
                  group: 'edges',
                  data: {
                    source: source.id(),
                    target: interNode.id()
                  }
                }, options().edgeParams(source, target, 0) )).addClass(classes);
                
                var inter2target = cy.add($.extend( true, {
                  group: 'edges',
                  data: {
                    source: interNode.id(),
                    target: target.id()
                  }
                }, options().edgeParams(source, target, 1) )).addClass(classes);
                
                added = added.add( interNode ).add( source2inter ).add( inter2target );
                
                break;
              
              case 'flat':
                var edge = cy.add($.extend( true, {
                  group: 'edges',
                  data: {
                    source: source.id(),
                    target: target.id()
                  }
                }, options().edgeParams(source, target, 0) )).addClass(classes);
              
                added = added.add( edge );
              
                break;

              default:
                target.removeClass('edgehandles-target');
                break; // don't add anything
              }
            }
            
            if( !preview ){
              options().complete( source, targets, added );
              source.trigger('cyedgehandles.complete'); 
            }
          }

          function hoverOver( node ){
            var target = node;

            clearTimeout( hoverTimeout );
            hoverTimeout = setTimeout(function(){
              var source = cy.nodes('.edgehandles-source');
              
              var isLoop = node.hasClass('edgehandles-source');
              var loopAllowed = options().loopAllowed( node );
              var isGhost = node.hasClass('edgehandles-ghost-node');
              var noEdge = options().edgeType( source, node ) == null;
              
              if( isGhost || noEdge ){ return; }

              if( !isLoop || (isLoop && loopAllowed) ){
                node.addClass('edgehandles-hover');
                node.toggleClass('edgehandles-target');
                
                if( options().preview ){
                  if( node.hasClass('edgehandles-target') ){
                    makePreview( source, target );
                  } else {
                    removePreview( source, target );
                  }
                }
              }
            }, options().hoverDelay);
          }

          function hoverOut( node ){
            var target = node;

            node.removeClass('edgehandles-hover');

            clearTimeout(hoverTimeout);

            if( options().toggleOffOnLeave ){
              var source = sourceNode;

              node.removeClass('edgehandles-target');
              removePreview( source, target );
            }
          }

          $container.cytoscape(function(e){
            cy = this;
            
            lastPanningEnabled = cy.panningEnabled();
            lastZoomingEnabled = cy.zoomingEnabled();
            lastBoxSelectionEnabled = cy.boxSelectionEnabled();

            // console.log('handles on ready')

            var lastActiveId;

            var transformHandler;
            cy.bind('zoom pan', transformHandler = function(){
              clearDraws();
            });
            
            var lastMdownHandler;

            var startHandler, hoverHandler, leaveHandler, grabNodeHandler, freeNodeHandler, dragNodeHandler, forceStartHandler, removeHandler, cxtstartHandler, tapToStartHandler, cxtdragHandler, cxtdragoverHandler, cxtdragoutHandler, cxtendHandler, dragHandler, grabHandler;
            cy.on('mouseover tap', 'node', startHandler = function(e){
              var node = this;
              
              if( disabled() || drawMode || mdownOnHandle || grabbingNode || this.hasClass('edgehandles-preview') || inForceStart || this.hasClass('edgehandles-ghost-node') || node.filter(options().handleNodes).length === 0 ){
                return; // don't override existing handle that's being dragged
                // also don't trigger when grabbing a node etc
              } 

              //console.log('mouseover startHandler %s %o', this.id(), this);
              
              if( lastMdownHandler ){
                $container[0].removeEventListener('mousedown', lastMdownHandler, true);
                $container[0].removeEventListener('touchstart', lastMdownHandler, true);
              }

              var source = this;
              var p = node.renderedPosition();
              var h = node.renderedOuterHeight();
              
              lastActiveId = node.id();

              // remove old handle
              clearDraws();
              
              hr = options().handleSize/2 * cy.zoom();
              hx = p.x;
              hy = p.y - h/2;
              
              // add new handle
              drawHandle(hx, hy, hr);

              node.trigger('cyedgehandles.showhandle');
              

              function mdownHandler(e){
                $container[0].removeEventListener('mousedown', mdownHandler, true);
                $container[0].removeEventListener('touchstart', mdownHandler, true);

                var pageX = !e.touches ? e.pageX : e.touches[0].pageX;
                var pageY = !e.touches ? e.pageY : e.touches[0].pageY; 
                var x = pageX - $container.offset().left;
                var y = pageY - $container.offset().top;
                var hrTarget = $$.is.touch() ? hr * options().handleTouchTargetMult : hr;

                if( e.button !== 0 && !e.touches ){
                  return; // sorry, no right clicks allowed 
                }
                
                if( Math.abs(x - hx) > hrTarget || Math.abs(y - hy) > hrTarget ){
                  return; // only consider this a proper mousedown if on the handle
                }

                if( inForceStart ){
                  return; // we don't want this going off if we have the forced start to consider
                }

                // console.log('mdownHandler %s %o', node.id(), node);
                
                mdownOnHandle = true;
                
                e.preventDefault();
                e.stopPropagation();
                
                sourceNode = node;

                node.addClass('edgehandles-source');
                node.trigger('cyedgehandles.start');
                
                function doneMoving(dmEvent){ 
                  // console.log('doneMoving %s %o', node.id(), node);
                  
                  if( !mdownOnHandle || inForceStart ){
                    return;
                  }
                  
                  var $this = $(this);
                  mdownOnHandle = false;
                  $(window).unbind('mousemove touchmove', moveHandler);
                  
                  makeEdges();
                  resetToDefaultState();
                  
                  options().stop( node );
                  node.trigger('cyedgehandles.stop');
                }
                
                $(window).one('mouseup touchend touchcancel blur', doneMoving).bind('mousemove touchmove', moveHandler);
                disableGestures();
                
                options().start( node );

                return false;
              }
              
              function moveHandler(e){
                // console.log('mousemove moveHandler %s %o', node.id(), node);
                
                var pageX = !e.originalEvent.touches ? e.pageX : e.originalEvent.touches[0].pageX;
                var pageY = !e.originalEvent.touches ? e.pageY : e.originalEvent.touches[0].pageY;
                var x = pageX - $container.offset().left;
                var y = pageY - $container.offset().top;

                if( options().handleLineType !== 'ghost' ){
                  clearDraws();
                  drawHandle(hx, hy, hr);
                }
                drawLine(hx, hy, x, y);
                
                return false;
              }

              $container[0].addEventListener('mousedown', mdownHandler, true);
              $container[0].addEventListener('touchstart', mdownHandler, true);
              lastMdownHandler = mdownHandler;

              
            }).on('mouseover tapdragover', 'node', hoverHandler = function(){
              var node = this;
              var target = this;

            // console.log('mouseover hoverHandler')

              if( disabled() || drawMode || this.hasClass('edgehandles-preview') ){
                return; // ignore preview nodes
              }
              
              if( mdownOnHandle ){ // only handle mdown case

                // console.log( 'mouseover hoverHandler %s $o', node.id(), node );

                hoverOver( node );

                return false;
              }

            }).on('mouseout tapdragout', 'node', leaveHandler = function(){
              var node = this;

              if( drawMode ){ return; }

              if( mdownOnHandle ){
                hoverOut(node);
              }

            }).on('drag position', 'node', dragNodeHandler = function(){
              if( drawMode ){ return; }

              var node = this;

              if( !node.hasClass('edgehandles-ghost') ){
                setTimeout(clearDraws, 50);
              }

            }).on('grab', 'node', grabHandler = function(){
              //grabbingNode = true;

              //setTimeout(function(){
                clearDraws();
              //}, 5);
              

            }).on('drag', 'node', dragHandler = function(){
              grabbingNode = true;
              

            }).on('free', 'node', freeNodeHandler = function(){
              grabbingNode = false;

            }).on('cyedgehandles.forcestart', 'node', forceStartHandler = function(){
              var node = this;

              if( node.filter(options().handleNodes).length === 0 ){
                return; // skip if node not allowed
              }

              inForceStart = true;
              clearDraws(); // clear just in case

              var source = sourceNode = node;

              lastActiveId = node.id();

              node.trigger('cyedgehandles.start');
              node.addClass('edgehandles-source');

              var p = node.renderedPosition();
              var h = node.renderedOuterHeight();
              var w = node.renderedOuterWidth();
                          
              var hr = options().handleSize/2 * cy.zoom();
              var hx = p.x;
              var hy = p.y - h/2;

              drawHandle(hx, hy, hr);

              node.trigger('cyedgehandles.showhandle');

              // case: down and drag as normal
              var downHandler = function(e){
                
                $container[0].removeEventListener('mousedown', downHandler, true);
                $container[0].removeEventListener('touchstart', downHandler, true);

                var x = (e.pageX !== undefined ? e.pageX : e.originalEvent.touches[0].pageX) - $container.offset().left;
                var y = (e.pageY !== undefined ? e.pageY : e.originalEvent.touches[0].pageY) - $container.offset().top;
                var d = hr/2;
                var onNode = p.x - w/2 - d <= x && x <= p.x + w/2 + d
                  && p.y - h/2 - d <= y && y <= p.y + h/2 + d;

                if( onNode ){
                  disableGestures();
                  mdownOnHandle = true; // enable the regular logic for handling going over target nodes
                  
                  var moveHandler = function(me){
                    var x = (me.pageX !== undefined ? me.pageX : me.originalEvent.touches[0].pageX) - $container.offset().left;
                    var y = (me.pageY !== undefined ? me.pageY : me.originalEvent.touches[0].pageY) - $container.offset().top;

                    if( options().handleLineType !== 'ghost' ){
                      clearDraws();
                      drawHandle(hx, hy, hr);
                    }
                    drawLine(hx, hy, x, y);
                  }

                  $container[0].addEventListener('mousemove', moveHandler, true);
                  $container[0].addEventListener('touchmove', moveHandler, true);

                  $(window).one('mouseup touchend blur', function(){
                    $container[0].removeEventListener('mousemove', moveHandler, true);
                    $container[0].removeEventListener('touchmove', moveHandler, true);

                    inForceStart = false; // now we're done so reset the flag
                    mdownOnHandle = false; // we're also no longer down on the node

                    makeEdges();

                    options().stop( node );
                    node.trigger('cyedgehandles.stop');

                    cy.off('tap', 'node', tapHandler);
                    node.off('remove', removeBeforeHandler);
                    resetToDefaultState();
                  });

                  e.stopPropagation();
                  e.preventDefault();
                  return false;
                }
              };

              $container[0].addEventListener('mousedown', downHandler, true);
              $container[0].addEventListener('touchstart', downHandler, true);

              var removeBeforeHandler;
              node.one('remove', function(){
                $container[0].removeEventListener('mousedown', downHandler, true);
                $container[0].removeEventListener('touchstart', downHandler, true);
                cy.off('tap', 'node', tapHandler);
              });

              // case: tap a target node
              var tapHandler;
              cy.one('tap', 'node', tapHandler = function(){
                var target = this;

                var isLoop = source.id() === target.id();
                var loopAllowed = options().loopAllowed( target );
                
                if( !isLoop || (isLoop && loopAllowed) ){             
                  makeEdges(false, source, target);

                  //options().complete( node );
                  //node.trigger('cyedgehandles.complete'); 
                }

                inForceStart = false; // now we're done so reset the flag

                options().stop( node );
                node.trigger('cyedgehandles.stop');

                $container[0].removeEventListener('mousedown', downHandler, true);
                $container[0].removeEventListener('touchstart', downHandler, true);
                node.off('remove', removeBeforeHandler);
                resetToDefaultState();
              });
            

            }).on('remove', 'node', removeHandler = function(){
              var id = this.id();

              if( id === lastActiveId ){
                setTimeout(function(){
                  resetToDefaultState();
                }, 5);
              }
            

            }).on('cxttapstart tapstart', 'node', cxtstartHandler = function(e){ 
              var node = this;

              if( node.filter(options().handleNodes).length === 0 ){
                return; // skip if node not allowed
              }

              var cxtOk = options().cxt && e.type === 'cxttapstart';
              var tapOk = drawMode && e.type === 'tapstart';

              if( cxtOk || tapOk ){
                
                clearDraws(); // clear just in case

                var node = sourceNode = this;
                var source = node;

                lastActiveId = node.id();

                node.trigger('cyedgehandles.start');
                node.addClass('edgehandles-source');

                var p = node.renderedPosition();
                var h = node.renderedOuterHeight();
                var w = node.renderedOuterWidth();
                            
                hr = options().handleSize/2 * cy.zoom();
                hx = p.x;
                hy = p.y - h/2 - hr/2;

                drawHandle(hx, hy, hr);

                node.trigger('cyedgehandles.showhandle');

                options().start( node );
                node.trigger('cyedgehandles.start');
              }


            }).on('cxtdrag tapdrag', cxtdragHandler = function(e){
              var cxtOk = options().cxt && e.type === 'cxtdrag';
              var tapOk = drawMode && e.type === 'tapdrag';

              if( ( cxtOk || tapOk ) && sourceNode ){
                var rpos = e.cyRenderedPosition;

                drawLine(hx, hy, rpos.x, rpos.y);

              }


            }).on('cxtdragover tapdragover', 'node', cxtdragoverHandler = function(e){
              var cxtOk = options().cxt && e.type === 'cxtdragover';
              var tapOk = drawMode && e.type === 'tapdragover';

              if( (cxtOk || tapOk) && sourceNode ){ 
                var node = this;

                hoverOver( node );
              }


            }).on('cxtdragout tapdragout', 'node', cxtdragoutHandler = function(e){
              var cxtOk = options().cxt && e.type === 'cxtdragout';
              var tapOk = drawMode && e.type === 'tapdragout';

              if( (cxtOk || tapOk) && sourceNode ){ 
                var node = this;

                hoverOut( node );
              }


            }).on('cxttapend tapend', cxtendHandler = function(e){
              var cxtOk = options().cxt && e.type === 'cxttapend';
              var tapOk = drawMode && e.type === 'tapend';

              if( cxtOk || tapOk ){ 
                
                makeEdges();
                resetToDefaultState();
                sourceNode = null;

                if( sourceNode ){
                  options().stop( sourceNode );
                  node.trigger('cyedgehandles.stop');

                  options().complete( sourceNode );
                }
              }

            }).on('tap', 'node', tapToStartHandler = function(){ return;
              var node = this;

              if( !sourceNode ){ // must not be active
                setTimeout(function(){
                  if( node.filter(options().handleNodes).length === 0 ){
                    return; // skip if node not allowed
                  }

                  clearDraws(); // clear just in case

                  var p = node.renderedPosition();
                  var h = node.renderedOuterHeight();
                  var w = node.renderedOuterWidth();
                              
                  var hr = options().handleSize/2 * cy.zoom();
                  var hx = p.x;
                  var hy = p.y - h/2;

                  drawHandle(hx, hy, hr);

                  node.trigger('cyedgehandles.showhandle');
                }, 16);
              }
              
            });
          

            data.unbind = function(){
              cy
                .off('mouseover', 'node', startHandler)
                .off('mouseover', 'node', hoverHandler)
                .off('mouseout', 'node', leaveHandler)
                .off('drag position', 'node', dragNodeHandler)
                .off('grab', 'node', grabNodeHandler)
                .off('free', 'node', freeNodeHandler)
                .off('cyedgehandles.forcestart', 'node', forceStartHandler)
                .off('remove', 'node', removeHandler)
                .off('cxttapstart', 'node', cxtstartHandler)
                .off('cxttapend', cxtendHandler)
                .off('cxtdrag', cxtdragHandler)
                .off('cxtdragover', 'node', cxtdragoverHandler)
                .off('cxtdragout', 'node', cxtdragoutHandler)
                .off('tap', 'node', tapToStartHandler)
              ;
              
              cy.unbind('zoom pan', transformHandler);
            };
          });
          
          $container.data('cyedgehandles', data);
        },

        start: function( id ){
          var $container = $(this);

          $container.cytoscape(function(e){
            var cy = this;

            cy.$('#' + id).trigger('cyedgehandles.forcestart');
          });
        }
      };
      
      if( functions[fn] ){
        return functions[fn].apply(this, Array.prototype.slice.call( arguments, 1 ));
      } else if( typeof fn == 'object' || !fn ) {
        return functions.init.apply( this, arguments );
      } else {
        $.error('No such function `'+ fn +'` for jquery.cytoscapeEdgeHandles');
      }
      
      return $(this);
    };

    $.fn.cyEdgehandles = $.fn.cytoscapeEdgehandles;

    $$('core', 'edgehandles', function( options ){
      var cy = this;

      return $( cy.container() ).cytoscapeEdgehandles( options );
    });

  };

  if( typeof module !== 'undefined' && module.exports ){ // expose as a commonjs module
    module.exports = register;
  }

  if( typeof define !== 'undefined' && define.amd ){ // expose as an amd/requirejs module
    define('cytoscape-edgehandles', function(){
      return register;
    });
  }

  if( $ && $$ ){ // expose to global cytoscape (i.e. window.cytoscape)
    register( $$, $ );
  }

})( cytoscape, jQuery );