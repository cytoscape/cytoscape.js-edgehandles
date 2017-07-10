/*!
Copyright (c) The Cytoscape Consortium

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the “Software”), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

( function($$) {
  'use strict';

  var whitespace = /\s+/;

  var $ = function(d){
    var dataKey = '_cytoscapeEdgehandlesData';
    var listenerKey = '_cytoscapeEdgehandlesListeners';

    return {
      0: d,
      addClass: function( cls ){
        this.toggleClass( cls, true );
      },
      removeClass: function( cls ){
        this.toggleClass( cls, true );
      },
      toggleClass: function( cls, bool ){
        this[0].classList.toggle( cls, bool );
      },
      data: function( name, val ){
        var k = dataKey;
        var data = this[0][k] = this[0][k] || {};

        if ( val === undefined ) {
          return data[ name ];
        } else {
          data[ name ] = val;
        }

        return this;
      },
      trigger: function(eventName){
        var evt = new Event(eventName);

        this[0].dispatchEvent(evt);

        return this;
      },
      append: function(ele) {
        this[0].appendChild( ele[0] || ele );

        return this;
      },
      attr: function( name, val ) {
        if (val === undefined) {
          return this[0].getAttribute( name );
        } else {
          this[0].setAttribute( name, val );
        }

        return this;
      },
      offset: function() {
        var rect = this[0].getBoundingClientRect();

        return {
          top: rect.top + window.pageYOffset,
          left: rect.left + window.pageXOffset
        };
      },
      listeners: function( name ){
        var k = listenerKey;
        var l = this[0][k] = this[0][k] || {};

        l[ name ] = l[ name ] || [];

        return l[ name ];
      },
      on: function(name, listener, one) {
        name.split( whitespace ).forEach(function(n){
          var wrappedListener = (function( e ){
            e.originalEvent = e;

            if( one ){
              this.off( n, wrappedListener );
            }

            listener.apply( this[0], [ e ] );
          }).bind( this );

          this.listeners(n).push({
            wrapped: wrappedListener,
            passed: listener
          });

          this[0].addEventListener( n, wrappedListener );
        }, this);

        return this;
      },
      bind: function(name, listener){
        return this.on( name, listener );
      },
      off: function(name, listener){
        name.split( whitespace ).forEach(function(n) {
          var liss = this.listeners(n);

          for( var i = liss.length - 1; i >= 0; i-- ){
            var lis = liss[i];

            if( lis.wrapped === listener || lis.passed === listener ){
              this[0].removeEventListener( n, lis.wrapped );

              liss.splice( i, 1 );
            }
          }
        }, this);

        return this;
      },
      one: function(name, listener) {
        return this.on( name, listener, true );
      },
      height: function(){
        return this[0].clientHeight;
      },
      width: function(){
        return this[0].clientWidth;
      }
    };
  };

  var assign = function( tgt ){
    for( var i = 1; i < arguments.length; i++ ){
      var obj = arguments[i];
      var keys = Object.keys( obj );

      for( var j = 0; j < keys.length; j++ ){
        var key = keys[j];

        tgt[key] = obj[key];
      }
    }

    return tgt;
  };

  // registers the extension on a cytoscape lib ref
  var register = function( $$, debounce, throttle ) {
    if( !$$ || !debounce || !throttle ) {
      return;
    } // can't register if cytoscape or dependencies unspecified

    /* eslint-disable no-unused-vars */
    var defaults = {
      preview: true, // whether to show added edges preview before releasing selection
      stackOrder: 4, // Controls stack order of edgehandles canvas element by setting it's z-index
      handleSize: 10, // the size of the edge handle put on nodes
      handleHitThreshold: 6, // a threshold for hit detection that makes it easier to grab the handle
      handleIcon: false, // an image to put on the handle
      handleColor: '#ff0000', // the colour of the handle and the line drawn from it
      handleLineType: 'ghost', // can be 'ghost' for real edge, 'straight' for a straight line, or 'draw' for a draw-as-you-go line
      handleLineWidth: 1, // width of handle line in pixels
      handleOutlineColor: '#000000', // the colour of the handle outline
      handleOutlineWidth: 0, // the width of the handle outline in pixels
      handleNodes: 'node', // selector/filter function for whether edges can be made from a given node
      handlePosition: 'middle top', // sets the position of the handle in the format of "X-AXIS Y-AXIS" such as "left top", "middle top"
      handleHighlightColor: '#ff0000', // the colour to highlight handle on hover
      handleHighlightPercentOffset: '1.0', // percent offset respective to handle size
      hoverDelay: 150, // time spend over a target node before it is considered a target selection
      cxt: false, // whether cxt events trigger edgehandles (useful on touch)
      enabled: true, // whether to start the plugin in the enabled state
      toggleOffOnLeave: false, // whether an edge is cancelled by leaving a node (true), or whether you need to go over again to cancel (false; allows multiple edges in one pass)
      edgeType: function( sourceNode, targetNode ) {
        // can return 'flat' for flat edges between nodes or 'node' for intermediate node between them
        // returning null/undefined means an edge can't be added between the two nodes
        return 'flat';
      },
      loopAllowed: function( node ) {
        // for the specified node, return whether edges from itself to itself are allowed
        return false;
      },
      nodeLoopOffset: -50, // offset for edgeType: 'node' loops
      nodeParams: function( sourceNode, targetNode ) {
        // for edges between the specified source and target
        // return element object to be passed to cy.add() for intermediary node
        return {};
      },
      edgeParams: function( sourceNode, targetNode, i ) {
        // for edges between the specified source and target
        // return element object to be passed to cy.add() for edge
        // NB: i indicates edge index in case of edgeType: 'node'
        return {};
      },
      nodeHandlePosition: function( node ) {
        // for handle positions for a specific node.
        // set value in handlePosition for default handle positions 
        // and return a specific positions for node in this function.
        // return null to use the default value from handlePosition
        return null;
      },
      start: function( sourceNode ) {
        // fired when edgehandles interaction starts (drag on handle)
      },
      complete: function( sourceNode, targetNodes, addedEntities, sourceHandleAngle, targetHandleAngle ) {
        // fired when edgehandles is done and entities are added
      },
      stop: function( sourceNode ) {
        // fired when edgehandles interaction is stopped (either complete with added edges or incomplete)
      },
      cancel: function( sourceNode, renderedPosition, invalidTarget ) {
        // fired when edgehandles are cancelled ( incomplete - nothing has been added ) - renderedPosition is where the edgehandle was released, invalidTarget is
        // a collection on which the handle was released, but which for other reasons (loopAllowed | edgeType) is an invalid target
      }
    };
    /* eslint-enable */

    var edgehandles = function( params ) {
      var cy = this;
      var fn = params;
      var container = cy.container();

      var functions = {
        destroy: function() {
          var $container = $( this );
          var data = $container.data( 'cyedgehandles' );

          if( data == null ) {
            return;
          }

          data.unbind();
          $container.data( 'cyedgehandles', {} );

          return $container;
        },

        option: function( name, value ) {
          var $container = $( this );
          var data = $container.data( 'cyedgehandles' );

          if( data == null ) {
            return;
          }

          var options = data.options;
          options.handlePosition = parseHandlePosition(data.options.handlePosition);

          if( value === undefined ) {
            if( typeof name == typeof {} ) {
              var newOpts = name;
              options = assign( {}, defaults, newOpts );
              data.options = options;
            } else {
              return options[ name ];
            }
          } else {
            options[ name ] = value;
          }

          $container.data( 'cyedgehandles', data );

          return $container;
        },

        disable: function() {
          return functions.option.apply( this, [ 'enabled', false ] );
        },

        enable: function() {
          return functions.option.apply( this, [ 'enabled', true ] );
        },

        resize: function() {
          var $container = $( this );

          $container.trigger( 'cyedgehandles.resize' );
        },

        drawon: function() {
          $( this ).trigger( 'cyedgehandles.drawon' );
        },

        drawoff: function() {
          $( this ).trigger( 'cyedgehandles.drawoff' );
        },

        init: function() {
          var opts = assign({}, defaults, params );
          var $container = $( this );
          var canvas = document.createElement('canvas');
          var $canvas = $(canvas);
          var linePoints;
          var mdownOnHandle = false;
          var grabbingNode = false;
          var inForceStart = false;
          var hr;
          var mx, my;
          var hoverTimeout;
          var drawsClear = true;
          var ghostNode;
          var sourceNode;
          var drawMode = false;
          var pxRatio;
          var sourceHandleAngle;
          var hoveredTarget;
          var hoveredTargetHandle = {};

          const positionXYToAngle = {
            "right middle": 0,
            "right top": 45,
            "middle top": 90,
            "left top": 135,
            "left middle": 180,
            "left bottom": 225,
            "middle bottom": 270,
            "right bottom": 315,
            "middle middle": -1
          };

          opts.handlePosition = parseHandlePosition(opts.handlePosition)

          function getDevicePixelRatio(){
            return window.devicePixelRatio || 1;
          }

          cy.on( 'resize', function() {
            $container.trigger( 'cyedgehandles.resize' );
          });

          $container.append( $canvas );

          var _sizeCanvas = debounce( function(){
            pxRatio = getDevicePixelRatio();

            var width = $container.width();
            var height = $container.height();

            var attrWidth = width * pxRatio;
            var attrHeight = height * pxRatio;

            $canvas
              .attr( 'width', attrWidth )
              .attr( 'height', attrHeight )
            ;

            canvas.setAttribute('style', 'position:absolute; top:0; left:0; z-index:'+options().stackOrder+'; width:'+width+'px; height:'+height+'px;');

            var c2d = canvas.getContext('2d');

            c2d.setTransform( 1, 0, 0, 1, 0, 0 );

            c2d.scale( pxRatio, pxRatio );
          }, 250 );

          var sizeCanvas = function(){
            clearDraws();
            _sizeCanvas();
          };

          sizeCanvas();

          var winResizeHandler;
          $( window ).bind( 'resize', winResizeHandler = function() {
            sizeCanvas();
          } );

          var ctrResizeHandler;
          $container.bind( 'cyedgehandles.resize', ctrResizeHandler = function() {
            sizeCanvas();
          } );

          var prevUngrabifyState;
          var ctrDrawonHandler;
          $container.on( 'cyedgehandles.drawon', ctrDrawonHandler = function() {
            drawMode = true;

            prevUngrabifyState = cy.autoungrabify();

            cy.autoungrabify( true );
          } );

          var ctrDrawoffHandler;
          $container.on( 'cyedgehandles.drawoff', ctrDrawoffHandler = function() {
            drawMode = false;

            cy.autoungrabify( prevUngrabifyState );
          } );

          var ctx = $canvas[ 0 ].getContext( '2d' );

          // write options to data
          var data = $container.data( 'cyedgehandles' );
          if( data == null ) {
            data = {};
          }
          data.options = opts;

          var optCache;

          function options() {
            return optCache || ( optCache = $container.data( 'cyedgehandles' ).options );
          }

          function enabled() {
            return options().enabled;
          }

          function disabled() {
            return !enabled();
          }

          function addClassesToEleJson( json, classes ){
            if( json.classes ){
              json.classes += classes;
            } else {
              json.classes = classes;
            }

            return json;
          }

          function clearDraws() {

            if( drawsClear ) {
              return;
            } // break early to be efficient

            var w = $container.width();
            var h = $container.height();

            ctx.clearRect( 0, 0, w, h );
            drawsClear = true;
          }

          var lastPanningEnabled, lastZoomingEnabled, lastBoxSelectionEnabled;

          function disableGestures() {
            lastPanningEnabled = cy.panningEnabled();
            lastZoomingEnabled = cy.zoomingEnabled();
            lastBoxSelectionEnabled = cy.boxSelectionEnabled();

            cy
              .zoomingEnabled( false )
              .panningEnabled( false )
              .boxSelectionEnabled( false );
          }

          function resetGestures() {
            cy
              .zoomingEnabled( lastZoomingEnabled )
              .panningEnabled( lastPanningEnabled )
              .boxSelectionEnabled( lastBoxSelectionEnabled );
          }

          function resetToDefaultState() {

            clearDraws();

            //setTimeout(function(){
            cy.nodes()
              .removeClass( 'edgehandles-hover' )
              .removeClass( 'edgehandles-source' )
              .removeClass( 'edgehandles-presumptive-target')
              .removeClass( 'edgehandles-target' );

            cy.$( '.edgehandles-ghost, .edgehandles-preview' ).remove();
            //}, 1);


            linePoints = null;

            sourceNode = null;

            resetGestures();
          }

          function makePreview( source, target ) {
            makeEdges( true );

            target.trigger( 'cyedgehandles.addpreview' );
          }

          function removePreview( source, target ) {
            source.edgesWith( target ).filter( '.edgehandles-preview' ).remove();

            target
              .neighborhood( 'node.edgehandles-preview' )
              .closedNeighborhood( '.edgehandles-preview' )
              .remove();

            target.trigger( 'cyedgehandles.removepreview' );

          }

          function parseHandlePosition( positions ) {
            return positions.split(',').reduce( function ( prev, item ) {
              if(isNaN( parseInt(item)) ) {
                const sanitized = sanitizePositionFormat( item );
                const angle = positionXYToAngle[sanitized];
                if(angle !== undefined) {
                  prev.push( angle );
                }
              } else {
                prev.push( item );
              }

              return prev;
            }, [] ).join( ',' );
          }

          function sanitizePositionFormat( pos ) {
            const posXY = pos.split( ' ' );
            if( posXY.length !== 2 ) {
              return 'middle middle';
            }

            if( posXY[0] !== 'left' && posXY[0] !== 'right' ) {
              posXY[0] = 'middle';
            }

            if( posXY[1] !== 'top' && posXY[1] !== 'bottom' ) {
              posXY[1] = 'middle';
            }

            return posXY.join( ' ' );
          }

          function drawHandle( node ) {
            if( node ) {
              drawHandleForAngles( node );
            }
          }

          function drawHandleForPosition( hx, hy ) {
            ctx.fillStyle = options().handleColor;
            ctx.strokeStyle = options().handleOutlineColor;

            ctx.beginPath();
            ctx.arc( hx, hy, hr, 0, 2 * Math.PI );
            ctx.closePath();
            ctx.fill();

            if( options().handleOutlineWidth ) {
              ctx.lineWidth = options().handleLineWidth * cy.zoom();
              ctx.stroke();
            }

            if( options().handleIcon ){
               var icon = options().handleIcon;
               var width = icon.width*cy.zoom(), height = icon.height*cy.zoom();
               ctx.drawImage( icon, hx-(width/2), hy-(height/2), width, height );
            }

            drawsClear = false;
          }

          function drawHandleForAngles( node ) {
            const positions = getHandlePositionsForNode( node );

            positions.forEach( function(position) {
              drawHandleForPosition(position.posX, position.posY);
            } );
          }

          function getHandlePositionsForNode( node ) {
            const strHandles = options().nodeHandlePosition( node );
            // If there are specific handle positions is set for this node, use that
            // Otherwise, use default handle positions.
            const handles = strHandles ? parseHandlePosition( strHandles ) : options().handlePosition;
            
            const angles = handles.split(',').reduce( function(prev, strAngle) {
              const angle = parseInt(strAngle);
              if (!isNaN(angle)) {
                prev.push(angle);
              }

              return prev;
            }, [] );

            const nodePos = node.renderedPosition();
            const nodeWidth = node.renderedWidth();
            const nodeHeight = node.renderedHeight();

            return angles.map( function(angle) {
              if (node.style().shape === 'ellipse' || !node.style().shape) {
                return getHandleCenterForCircle( angle, nodePos, nodeWidth, nodeHeight );
              } else {
                return getHandleCenterForRect( angle, nodePos, nodeWidth, nodeHeight );
              }
            } );
          }

          function getHandleCenterForCircle( angle, pos, width, height ) {
            if (angle < 0) {
              return { angle: angle, posX: pos.x, posY: pos.y };
            }

            const rad = toRadian( angle );
            const posX = pos.x + ( width / 2 ) * Math.cos( rad );
            const posY = pos.y - ( height / 2 ) * Math.sin( rad );

            return { angle: angle, posX: posX, posY: posY };
          }

          function getHandleCenterForRect( angle, pos, width, height ) {
            if (angle < 0) {
              return { angle: angle, posX: pos.x, posY: pos.y };
            }

            var posX, posY;
            const rad = toRadian( angle );

            const abssin = Math.abs( Math.sin(rad) );
            const abscos = Math.abs( Math.cos(rad) );
            const fracMax = 1 / Math.max( abssin, abscos );

            const rectRadiusX = width / 2 * fracMax;
            const rectRadiusY = height / 2 * fracMax;
            posX = pos.x + rectRadiusX * Math.cos( rad );
            posY = pos.y - rectRadiusY * Math.sin( rad );
            
            return { angle: angle, posX: posX, posY: posY };
          }

          function toRadian( angle ) {
            return angle * ( Math.PI / 180 );  
          }

          var lineDrawRate = 1000 / 60;

          var drawLine = throttle( function( x, y ) {

            // can't draw a line without having the starting node
            if( !sourceNode ){ return; }

            if( options().handleLineType !== 'ghost' ) {
              ctx.fillStyle = options().handleColor;
              ctx.strokeStyle = options().handleColor;
              ctx.lineWidth = options().handleLineWidth;
            }

            const positions = getHandlePositionsForNode(sourceNode);
            const pos = positions.filter(function( position ) {
              return position.angle === sourceHandleAngle.angle;
            })[0];
            const hx = pos.x;
            const hy = pos.y;

            // draw line based on type
            switch( options().handleLineType ) {
              case 'ghost':

                if( !ghostNode || ghostNode.removed() ) {

                  ghostNode = cy.add( {
                    group: 'nodes',
                    classes: 'edgehandles-ghost edgehandles-ghost-node',
                    css: {
                      'background-color': 'blue',
                      'width': 0.0001,
                      'height': 0.0001,
                      'opacity': 0,
                      'events': 'no'
                    },
                    position: {
                      x: 0,
                      y: 0
                    }
                  } );

                  cy.add( {
                    group: 'edges',
                    classes: 'edgehandles-ghost edgehandles-ghost-edge',
                    data: {
                      source: sourceNode.id(),
                      target: ghostNode.id()
                    },
                    css: {
                      'events': 'no'
                    }
                  } );

                }

                ghostNode.renderedPosition( {
                  x: x,
                  y: y
                } );


                break;

              case 'straight':

                ctx.beginPath();
                ctx.moveTo( hx, hy );
                ctx.lineTo( x, y );
                ctx.closePath();
                ctx.stroke();

                break;
              case 'draw':
              default:

                if( linePoints == null ) {
                  linePoints = [ [ x, y ] ];
                } else {
                  linePoints.push( [ x, y ] );
                }

                ctx.beginPath();

                ctx.moveTo( pos.x, pos.y );

                for( var i = 0; i < linePoints.length; i++ ) {
                  var pt = linePoints[ i ];

                  ctx.lineTo( pt[ 0 ], pt[ 1 ] );
                }

                ctx.stroke();

                break;
            }

            if( options().handleLineType !== 'ghost' ) {
              drawsClear = false;
            }
          }, lineDrawRate, { leading: true } );

          function makeEdges( preview, src, tgt ) {

            // console.log('make edges', preview);

            var source = src ? src : cy.nodes( '.edgehandles-source' );
            var targets = tgt ? tgt : cy.nodes( '.edgehandles-target' );
            var classes = preview ? 'edgehandles-preview' : '';
            var added = cy.collection();

            if( !src && !tgt && !preview && options().preview ) {
              cy.$( '.edgehandles-ghost' ).remove();
            }

            if( source.size() === 0 || targets.size() === 0 ) {
              var presumptiveTarget = cy.nodes( '.edgehandles-presumptive-target' );
              options().cancel(source, {x: mx, y: my}, presumptiveTarget);
              source.trigger( 'cyedgehandles.cancel', [{x: mx, y: my}, presumptiveTarget]);
              return; // nothing to do :(
            }

            const hit = hitTest(targets, { x: mx, y: my });

            // just remove preview class if we already have the edges
            if( !src && !tgt ) {
              if( !preview && options().preview ) {
                added = cy.elements( '.edgehandles-preview' ).removeClass( 'edgehandles-preview' );

                if ( !hit ) {
                  added.remove();
                } else {
                  const targetHandleAngle = hit;
                  options().complete( source, targets, added, sourceHandleAngle.angle, targetHandleAngle.angle );
                  source.trigger( 'cyedgehandles.complete' );
                }

                return;
              } else {
                // remove old previews
                cy.elements( '.edgehandles-preview' ).remove();
              }
            }

            for( var i = 0; i < targets.length; i++ ) {
              var target = targets[ i ];

              switch( options().edgeType( source, target ) ) {
                case 'node':

                  var p1 = source.position();
                  var p2 = target.position();
                  var p;

                  if( source.id() === target.id() ) {
                    p = {
                      x: p1.x + options().nodeLoopOffset,
                      y: p1.y + options().nodeLoopOffset
                    };
                  } else {
                    p = {
                      x: ( p1.x + p2.x ) / 2,
                      y: ( p1.y + p2.y ) / 2
                    };
                  }

                  var interNode = cy.add(
                    addClassesToEleJson( assign(
                      {
                        group: 'nodes',
                        position: p
                      },
                      options().nodeParams( source, target )
                    ), classes )
                  );

                  var source2inter = cy.add(
                    addClassesToEleJson( assign(
                      {
                        group: 'edges',
                        data: {
                          source: source.id(),
                          target: interNode.id()
                        }
                      },
                      options().edgeParams( source, target, 0 )
                    ), classes )
                  );

                  var inter2target = cy.add(
                    addClassesToEleJson( assign(
                      {
                        group: 'edges',
                        data: {
                          source: interNode.id(),
                          target: target.id()
                        }
                      },
                      options().edgeParams( source, target, 1 )
                    ), classes )
                  );

                  added = added.add( interNode ).add( source2inter ).add( inter2target );

                  break;

                case 'flat':
                  var edge = cy.add(
                    addClassesToEleJson( assign(
                      {
                        group: 'edges',
                        data: {
                          source: source.id(),
                          target: target.id()
                        }
                      },
                      options().edgeParams( source, target, 0 )
                    ), classes )
                  );

                  added = added.add( edge );

                  break;

                default:
                  target.removeClass( 'edgehandles-target' );
                  break; // don't add anything
              }
            }

            if( !preview ) {
              const targetHandleAngle = hit;
              options().complete( source, targets, added, sourceHandleAngle.angle, targetHandleAngle.angle );
              source.trigger( 'cyedgehandles.complete' );
            }
          }

          function hoverOver( node ) {
            var target = node;
            hoveredTarget = target;
            
            clearTimeout( hoverTimeout );
            hoverTimeout = setTimeout( function() {
              var source = cy.nodes( '.edgehandles-source' );

              var isLoop = node.hasClass( 'edgehandles-source' );
              var loopAllowed = options().loopAllowed( node );
              var isGhost = node.hasClass( 'edgehandles-ghost-node' );
              var noEdge = options().edgeType( source, node ) == null;

              node.addClass('edgehandles-presumptive-target');


              if( isGhost || noEdge ) {
                return;
              }

              if( !isLoop || ( isLoop && loopAllowed ) ) {
                node.addClass( 'edgehandles-hover' );
                node.toggleClass( 'edgehandles-target' );

                if( options().preview ) {
                  if( node.hasClass( 'edgehandles-target' ) ) {
                    makePreview( source, target );
                  } else {
                    removePreview( source, target );
                  }
                }
              }
            }, options().hoverDelay );
          }

          function hoverOut( node ) {
            var target = node;

            node.removeClass( 'edgehandles-hover' );

            clearTimeout( hoverTimeout );

            if( options().toggleOffOnLeave ) {
              var source = sourceNode;

              node.removeClass( 'edgehandles-target' );
              node.removeClass( 'edgehandles-presumptive-target' );

              removePreview( source, target );
            }

            if (target.data().id !== sourceNode.data().id) {
              deHighlightHandle( target );
              hoveredTarget = null;
              hoveredTargetHandle = {};
            }
          }

          function setHandleDimensions( node ){
            hr = options().handleSize / 2 * cy.zoom();
          }

          function hitTest ( node, touchPos ) {
            const handlePositions = getHandlePositionsForNode(node);
            const nodePos = node.renderedPosition();
            const halfHandleSize = (options().handleIcon ? options().handleIcon.width : hr) * cy.zoom() / 2;

            const hits = handlePositions.filter(function (handle) {
              return Math.abs(handle.posX - touchPos.x) <= halfHandleSize && 
                     Math.abs(handle.posY - touchPos.y) <= halfHandleSize;
            });

            return hits[0];
          }

          function highlightHandle( node, handle ) {
            // console.log(node, handle);
            if( options().handleHighlightColor ) {
              const percentOffset = options().handleHighlightPercentOffset || 1.0;
              const hightlightSize = options().handleIcon ? options().handleIcon.width / 2 : hr;
              ctx.beginPath();
              ctx.arc( handle.posX, handle.posY, hightlightSize * percentOffset, 0, 2 * Math.PI );
              ctx.closePath();
              
              ctx.strokeStyle = options().handleHighlightColor;
              ctx.lineWidth = cy.zoom();
              ctx.stroke();

              drawsClear = false;
            }
          }

          function deHighlightHandle(node) {
            const pos = node.renderedPosition();
            const x = pos.x;
            const y = pos.y;
            const width = node.renderedOuterWidth();
            const height = node.renderedOuterHeight();

            ctx.clearRect(x - width, y - height, width * 2, height * 2);
          }

          cy.ready( function() {
            lastPanningEnabled = cy.panningEnabled();
            lastZoomingEnabled = cy.zoomingEnabled();
            lastBoxSelectionEnabled = cy.boxSelectionEnabled();

            // console.log('handles on ready')

            var lastActiveId;

            var transformHandler;
            cy.bind( 'zoom pan', transformHandler = function() {
              clearDraws();
            } );

            var lastMdownHandler;

            var startHandler, hoverHandler, leaveHandler, grabNodeHandler, freeNodeHandler, dragNodeHandler, forceStartHandler, removeHandler, cxtstartHandler, tapToStartHandler, cxtdragHandler, cxtdragoverHandler, cxtdragoutHandler, cxtendHandler, dragHandler, grabHandler;
            cy.on( 'mouseover tap', 'node', startHandler = function() {
              var node = this;

              if( disabled() || drawMode || mdownOnHandle || grabbingNode || this.hasClass( 'edgehandles-preview' ) || inForceStart || this.hasClass( 'edgehandles-ghost-node' ) || node.filter( options().handleNodes ).length === 0 ) {
                return; // don't override existing handle that's being dragged
                // also don't trigger when grabbing a node etc
              }

              //console.log('mouseover startHandler %s %o', this.id(), this);

              if( lastMdownHandler ) {
                $container[ 0 ].removeEventListener( 'mousedown', lastMdownHandler, true );
                $container[ 0 ].removeEventListener( 'touchstart', lastMdownHandler, true );
              }

              lastActiveId = node.id();

              // remove old handle
              clearDraws();

              setHandleDimensions( node );

              // add new handle
              drawHandle( node );

              node.trigger( 'cyedgehandles.showhandle' );


              function mdownHandler( e ) {
                $container[ 0 ].removeEventListener( 'mousedown', mdownHandler, true );
                $container[ 0 ].removeEventListener( 'touchstart', mdownHandler, true );

                var pageX = !e.touches ? e.pageX : e.touches[ 0 ].pageX;
                var pageY = !e.touches ? e.pageY : e.touches[ 0 ].pageY;
                var x = pageX - $container.offset().left;
                var y = pageY - $container.offset().top;
                var hrTarget = hr + options().handleHitThreshold;

                if( e.button !== 0 && !e.touches ) {
                  return; // sorry, no right clicks allowed
                }

                const hit = hitTest(node, { x: x, y: y });
                if ( !hit ) {
                  return;
                }
                sourceHandleAngle = hit;

                if( inForceStart ) {
                  return; // we don't want this going off if we have the forced start to consider
                }

                // console.log('mdownHandler %s %o', node.id(), node);

                mdownOnHandle = true;

                e.preventDefault();
                e.stopPropagation();

                sourceNode = node;

                hoveredTarget = null;
                hoveredTargetHandle = {};
                highlightHandle(sourceNode, sourceHandleAngle);

                node.addClass( 'edgehandles-source' );
                node.trigger( 'cyedgehandles.start' );

                function doneMoving() {
                  // console.log('doneMoving %s %o', node.id(), node);

                  if( !mdownOnHandle || inForceStart ) {
                    return;
                  }

                  mdownOnHandle = false;
                  $( window ).off( 'mousemove touchmove', moveHandler );

                  makeEdges();
                  resetToDefaultState();

                  options().stop( node );
                  node.trigger( 'cyedgehandles.stop' );
                }

                $( window ).one('mouseup touchend touchcancel blur', doneMoving )
                  .bind('mousemove touchmove', moveHandler );
                disableGestures();

                options().start( node );

                return false;
              }

              function moveHandler( e ) {
                // console.log('mousemove moveHandler %s %o', node.id(), node);

                var pageX = !e.touches ? e.pageX : e.touches[ 0 ].pageX;
                var pageY = !e.touches ? e.pageY : e.touches[ 0 ].pageY;
                var x = pageX - $container.offset().left;
                var y = pageY - $container.offset().top;

                mx = x;
                my = y;

                if( options().handleLineType !== 'ghost' ) {
                  if( hoveredTarget ) {
                    const hit = hitTest( hoveredTarget, {x: mx, y: my} );

                    deHighlightHandle( hoveredTarget );
                    drawHandle( hoveredTarget );
                    
                    if( hit ) {
                      highlightHandle( hoveredTarget, hit );
                      hoveredTargetHandle = hit;
                    }
                  }
                }
                drawLine( x, y );


                return false;
              }

              $container[ 0 ].addEventListener( 'mousedown', mdownHandler, true );
              $container[ 0 ].addEventListener( 'touchstart', mdownHandler, true );
              lastMdownHandler = mdownHandler;


            } ).on( 'mouseover tapdragover', 'node', hoverHandler = function(e) {
              var node = this;

              // console.log('mouseover hoverHandler')

              if( disabled() || drawMode || this.hasClass( 'edgehandles-preview' ) ) {
                return; // ignore preview nodes
              }

              // n.b. only desktop mouse events can show hover preview in force mode
              if( mdownOnHandle || (inForceStart && e.type === 'mouseover') ) {

                // console.log( 'mouseover hoverHandler %s $o', node.id(), node );

                hoverOver( node );

                return false;
              }

            } ).on( 'mouseout tapdragout', 'node', leaveHandler = function(e) {
              var node = this;

              if( drawMode ) {
                return;
              }

              // n.b. only desktop mouse events can show hover preview in force mode
              if( mdownOnHandle || (inForceStart && e.type === 'mouseout') ) {
                hoverOut( node );
              }

            } ).on( 'drag position', 'node', dragNodeHandler = function(e) {
              if( drawMode ) {
                return;
              }

              var node = this;

              if( !node.hasClass( 'edgehandles-ghost' ) ) {
                setTimeout( clearDraws, 50 );
              }

              if( hoveredTarget ) {
                const hit = hitTest( hoveredTarget, node.renderedPosition() );

                deHighlightHandle( hoveredTarget );
                drawHandle( hoveredTarget );
                
                if( hit ) {
                  highlightHandle( hoveredTarget, hit );
                  hoveredTargetHandle = hit;
                }
              }

            } ).on( 'grab', 'node', grabHandler = function() {
              //grabbingNode = true;

              //setTimeout(function(){
              hoveredTarget = null;
              hoveredTargetHandle = {};
              clearDraws();
              //}, 5);


            } ).on( 'drag', 'node', dragHandler = function() {
              grabbingNode = true;


            } ).on( 'free', 'node', freeNodeHandler = function() {
              grabbingNode = false;

            } ).on( 'cyedgehandles.forcestart', 'node', forceStartHandler = function() {
              var node = this;

              if( node.filter( options().handleNodes ).length === 0 ) {
                return; // skip if node not allowed
              }

              inForceStart = true;
              clearDraws(); // clear just in case

              var source = sourceNode = node;

              lastActiveId = node.id();

              node.trigger( 'cyedgehandles.start' );
              node.addClass( 'edgehandles-source' );

              var p = node.renderedPosition();
              var h = node.renderedOuterHeight();
              var w = node.renderedOuterWidth();

              setHandleDimensions( node );

              drawHandle( node );

              node.trigger( 'cyedgehandles.showhandle' );

              var moveHandler = function( me ) {
                var offset = $container.offset();
                var x = ( me.pageX !== undefined ? me.pageX : me.touches[ 0 ].pageX ) - offset.left;
                var y = ( me.pageY !== undefined ? me.pageY : me.touches[ 0 ].pageY ) - offset.top;

                mx = x;
                my = y;

                if( options().handleLineType !== 'ghost' ) {
                  clearDraws();
                  drawHandle();
                }
                drawLine( x, y );
              };

              // case: down and drag as normal
              var downHandler = function( e ) {

                $container[ 0 ].removeEventListener( 'mousedown', downHandler, true );
                $container[ 0 ].removeEventListener( 'touchstart', downHandler, true );

                var x = ( e.pageX !== undefined ? e.pageX : e.touches[ 0 ].pageX ) - $container.offset().left;
                var y = ( e.pageY !== undefined ? e.pageY : e.touches[ 0 ].pageY ) - $container.offset().top;
                var d = hr / 2;
                var onNode = p.x - w / 2 - d <= x && x <= p.x + w / 2 + d && p.y - h / 2 - d <= y && y <= p.y + h / 2 + d;

                if( onNode ) {
                  disableGestures();
                  mdownOnHandle = true; // enable the regular logic for handling going over target nodes

                  $container[ 0 ].addEventListener( 'mousemove', moveHandler, true );
                  $container[ 0 ].addEventListener( 'touchmove', moveHandler, true );

                  $( window ).one( 'mouseup touchend blur', function() {
                    $container[ 0 ].removeEventListener( 'mousemove', moveHandler, true );
                    $container[ 0 ].removeEventListener( 'touchmove', moveHandler, true );

                    inForceStart = false; // now we're done so reset the flag
                    mdownOnHandle = false; // we're also no longer down on the node

                    makeEdges();

                    options().stop( node );
                    node.trigger( 'cyedgehandles.stop' );

                    cy.off( 'tap', tapHandler );
                    node.off( 'remove', removeBeforeHandler );
                    resetToDefaultState();
                  } );

                  e.stopPropagation();
                  e.preventDefault();
                  return false;
                }
              };

              $container[ 0 ].addEventListener( 'mousedown', downHandler, true );
              $container[ 0 ].addEventListener( 'touchstart', downHandler, true );

              var removeBeforeHandler;
              node.one( 'remove', function() {
                $container[ 0 ].removeEventListener( 'mousedown', downHandler, true );
                $container[ 0 ].removeEventListener( 'touchstart', downHandler, true );
                cy.off( 'tap', tapHandler );
              } );

              function stopForceMode( node ){
                inForceStart = false; // now we're done so reset the flag

                options().stop( node );
                node.trigger( 'cyedgehandles.stop' );

                $container[ 0 ].removeEventListener( 'mousedown', downHandler, true );
                $container[ 0 ].removeEventListener( 'touchstart', downHandler, true );
                $container[ 0 ].removeEventListener( 'mousemove', moveHandler, true );
                node.off( 'remove', removeBeforeHandler );

                resetToDefaultState();
              }

              // case: tap a target node
              var tapHandler;
              cy.one( 'tap', tapHandler = function(e) {
                var target = e.target || e.cyTarget; // 3.x | 2.x

                if( target === cy ){ // tap bg cancels force gesture
                  stopForceMode( node );

                  return;
                } else if( target.isNode() ){ // tap node completes force gesture
                  var isLoop = source.id() === target.id();
                  var loopAllowed = options().loopAllowed( target );

                  if( !isLoop || ( isLoop && loopAllowed ) ) {
                    makeEdges( false, source, target );
                  }

                  stopForceMode( node );
                }
              } );

              // in the forced start, we use the above tap case but we can still preview on desktop mousemove
              if( inForceStart ){
                $container[ 0 ].addEventListener( 'mousemove', moveHandler, true );
              }


            } ).on( 'remove', 'node', removeHandler = function() {
              var id = this.id();

              if( id === lastActiveId ) {
                setTimeout( function() {
                  resetToDefaultState();
                }, 5 );
              }


            } ).on( 'cxttapstart tapstart', 'node', cxtstartHandler = function( e ) {
              var node = this;

              if( disabled() ) {
                return; // prevent drawing an edge whenever the extension is disabled
              }

              if( node.filter( options().handleNodes ).length === 0 ) {
                return; // skip if node not allowed
              }

              var cxtOk = options().cxt && e.type === 'cxttapstart';
              var tapOk = drawMode && e.type === 'tapstart';

              if( cxtOk || tapOk ) {

                clearDraws(); // clear just in case

                disableGestures(); // cases like draw mode need this

                node = sourceNode = this;

                lastActiveId = node.id();

                node.trigger( 'cyedgehandles.start' );
                node.addClass( 'edgehandles-source' );

                setHandleDimensions( node );

                drawHandle( node );

                node.trigger( 'cyedgehandles.showhandle' );

                options().start( node );
                node.trigger( 'cyedgehandles.start' );
              }


            } ).on( 'cxtdrag tapdrag', cxtdragHandler = function( e ) {
              var cxtOk = options().cxt && e.type === 'cxtdrag';
              var tapOk = drawMode && e.type === 'tapdrag';

              if( ( cxtOk || tapOk ) && sourceNode ) {
                var rpos = e.renderedPosition || e.cyRenderedPosition;

                drawLine( rpos.x, rpos.y );

              }


            } ).on( 'cxtdragover tapdragover', 'node', cxtdragoverHandler = function( e ) {
              var cxtOk = options().cxt && e.type === 'cxtdragover';
              var tapOk = drawMode && e.type === 'tapdragover';

              if( ( cxtOk || tapOk ) && sourceNode ) {
                var node = this;

                hoverOver( node );
              }


            } ).on( 'cxtdragout tapdragout', 'node', cxtdragoutHandler = function( e ) {
              var cxtOk = options().cxt && e.type === 'cxtdragout';
              var tapOk = drawMode && e.type === 'tapdragout';

              if( ( cxtOk || tapOk ) && sourceNode ) {
                var node = this;

                hoverOut( node );
              }


            } ).on( 'cxttapend tapend', cxtendHandler = function( e ) {
              var cxtOk = options().cxt && e.type === 'cxttapend';
              var tapOk = drawMode && e.type === 'tapend';

              if( cxtOk || tapOk ) {

                makeEdges();

                if( sourceNode ) {
                  options().stop( sourceNode );
                  sourceNode.trigger( 'cyedgehandles.stop' );
                }

                resetToDefaultState();
              }

            } ).on( 'tap', 'node', tapToStartHandler = function() {
              // TODO can this be re-enabled and exposed behind an option?
              // var node = this;
              //
              // if( !sourceNode ) { // must not be active
              //   setTimeout( function() {
              //     if( node.filter( options().handleNodes ).length === 0 ) {
              //       return; // skip if node not allowed
              //     }
              //
              //     clearDraws(); // clear just in case
              //
              //     setHandleDimensions( node );
              //
              //     drawHandle();
              //
              //     node.trigger( 'cyedgehandles.showhandle' );
              //   }, 16 );
              // }
            } );


            data.unbind = function() {
              cy
                .off( 'mouseover', 'node', startHandler )
                .off( 'mouseover', 'node', hoverHandler )
                .off( 'mouseout', 'node', leaveHandler )
                .off( 'drag position', 'node', dragNodeHandler )
                .off( 'grab', 'node', grabNodeHandler )
                .off( 'free', 'node', freeNodeHandler )
                .off( 'cyedgehandles.forcestart', 'node', forceStartHandler )
                .off( 'remove', 'node', removeHandler )
                .off( 'cxttapstart', 'node', cxtstartHandler )
                .off( 'cxttapend', cxtendHandler )
                .off( 'cxtdrag', cxtdragHandler )
                .off( 'cxtdragover', 'node', cxtdragoverHandler )
                .off( 'cxtdragout', 'node', cxtdragoutHandler )
                .off( 'tap', 'node', tapToStartHandler )
                .off( 'drag', 'node', dragHandler )
                .off( 'grab', 'node', grabHandler )
              ;

              cy.unbind( 'zoom pan', transformHandler );

              $( window ).off( 'resize', winResizeHandler );

              $container
                .off( 'cyedgehandles.resize', ctrResizeHandler )
                .off( 'cyedgehandles.drawon', ctrDrawonHandler )
                .off( 'cyedgehandles.drawoff', ctrDrawoffHandler );
            };
          } );

          $container.data( 'cyedgehandles', data );
        },

        start: function( id ) {
          cy.ready( function() {
            cy.$( '#' + id ).trigger( 'cyedgehandles.forcestart' );
          } );
        }
      };

      if( functions[ fn ] ) {
        return functions[ fn ].apply( container, Array.prototype.slice.call( arguments, 1 ) );
      } else if( typeof fn == 'object' || !fn ) {
        return functions.init.apply( container, arguments );
      } else {
        throw new Error( 'No such function `' + fn + '` for edgehandles' );
      }
    };

    $$( 'core', 'edgehandles', edgehandles );

  };

  /* global _, define, cytoscape */

  if( typeof module !== 'undefined' && module.exports ) { // expose as a commonjs module
    module.exports = function( $$ ){
      register( $$, require('lodash.debounce'), require('lodash.throttle') );
    };
  } else if( typeof define !== 'undefined' && define.amd ) { // expose as an amd/requirejs module
    define( 'cytoscape-edgehandles', function() {
      return register;
    } );
  }

  if( $$ && typeof _ !== 'undefined' ) { // expose to global cytoscape (i.e. window.cytoscape)
    register( $$, _.debounce.bind( _ ), _.throttle.bind( _ ) );
  }

} )( typeof cytoscape !== 'undefined' ? cytoscape : null );
