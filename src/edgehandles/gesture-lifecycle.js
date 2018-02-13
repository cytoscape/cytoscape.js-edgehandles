function canStartOn( node ){
  const { options, previewEles, ghostEles, handleNode } = this;
  const isPreview = el => previewEles.anySame(el);
  const isGhost = el => ghostEles.anySame(el);
  const userFilter = el => el.filter( options.handleNodes ).length > 0;
  const isHandle = el => handleNode.same(el);
  const isTemp = el => isPreview(el) || isHandle(el) || isGhost(el);

  const { enabled, active, grabbingNode } = this;

  return (
    enabled && !active && !grabbingNode
    && ( node == null || (!isTemp(node) && userFilter(node)) )
  );
}

function canStartDrawModeOn( node ){
  return this.canStartOn( node ) && this.drawMode;
}

function canStartNonDrawModeOn( node ){
  return this.canStartOn( node ) && !this.drawMode;
}

function show( node ){
  let { options, drawMode } = this;

  if( !this.canStartOn(node) || ( drawMode && !options.handleInDrawMode ) ){ return; }

  this.sourceNode = node;

  this.setHandleFor( node );

  this.emit( 'show', this.hp(), this.sourceNode );

  return this;
}

function hide(){
  this.removeHandle();

  this.emit( 'hide', this.hp(), this.sourceNode );

  return this;
}

function start( node ){
  if( !this.canStartOn(node) ){ return; }

  this.active = true;

  this.sourceNode = node;
  this.sourceNode.addClass('eh-source');

  this.disableGestures();

  this.emit( 'start', this.hp(), node );
}

function update( pos ){
  if( !this.active ){ return; }

  let p = pos;

  this.mx = p.x;
  this.my = p.y;

  this.updateEdge();

  return this;
}

function preview( target ){
  let { options, sourceNode, ghostNode, presumptiveTargets, previewEles, active } = this;
  let source = sourceNode;
  let isLoop = target.same( source );
  let loopAllowed = options.loopAllowed( target );
  let isGhost = target.same( ghostNode );
  let noEdge = !options.edgeType( source, target );
  let isHandle = target.same( this.handleNode );

  if( !active || isHandle || isGhost || noEdge ) { return; }

  clearTimeout( this.previewTimeout );

  this.previewTimeout = setTimeout( () => {
    this.targetNode = target;
    presumptiveTargets.merge( target );

    target.addClass('eh-presumptive-target');

    if( !isLoop || ( isLoop && loopAllowed ) ) {
      target.addClass('eh-target');

      this.emit( 'hoverover', this.mp(), source, target );

      if( options.preview ){
        target.addClass('eh-preview');

        this.makePreview();

        this.emit( 'previewon', this.mp(), source, target, previewEles );
      }
    }
  }, options.hoverDelay );

  return this;
}

function unpreview( target ) {
  if( !this.active || target.same( this.handleNode ) ){ return; }

  let { previewTimeout, sourceNode, previewEles, cy } = this;
  clearTimeout( previewTimeout );
  this.previewTimeout = null;

  let source = sourceNode;

  target.removeClass('eh-preview eh-target eh-presumptive-target');

  this.targetNode = cy.collection();

  this.removePreview( source, target );

  this.emit( 'hoverout', this.mp(), source, target );
  this.emit( 'previewoff', this.mp(), source, target, previewEles );

  return this;
}

function stop(){
  if( !this.active ){ return; }

  let { sourceNode, targetNode, ghostEles, presumptiveTargets } = this;

  clearTimeout( this.previewTimeout );

  sourceNode.removeClass('eh-source');
  targetNode.removeClass('eh-target eh-preview eh-hover');
  presumptiveTargets.removeClass('eh-presumptive-target');

  this.makeEdges();

  this.removeHandle();

  ghostEles.remove();

  this.clearCollections();

  this.resetGestures();

  this.active = false;

  this.emit( 'stop', this.mp(), sourceNode );

  return this;
}

module.exports = {
  show, hide, start, update, preview, unpreview, stop,
  canStartOn, canStartDrawModeOn, canStartNonDrawModeOn
};
