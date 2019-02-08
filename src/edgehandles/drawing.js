const assign = require('../assign');
const isArray = obj => Array.isArray ? Array.isArray( obj ) : obj != null && obj instanceof Array;

function makeEdges( preview = false ) {
  // can't make edges outside of regular gesture lifecycle
  if( !this.active ){ return; }

  let { cy, options, presumptiveTargets, previewEles } = this;

  // can't make preview if disabled
  if( preview && !options.preview ){ return; }

  let { sourceNode, targetNode, handleNode } = this;

  // detect cancel
  if( !targetNode || targetNode.empty() ){
    this.removePreview();

    this.emit( 'cancel', this.mp(), sourceNode, presumptiveTargets );

    return;
  }

  // just remove preview class if we already have the edges
  if( !preview && previewEles.nonempty() ) {
    cy.startBatch();
    previewEles.removeClass('eh-preview').removeStyle('events');
    cy.endBatch();

    this.emit( 'complete', this.mp(), sourceNode, targetNode, previewEles );

    return;
  }

  let edgeType = options.edgeType( sourceNode, targetNode, handleNode );

  // must have a non-empty edge type
  if( !edgeType ){ return; }

  let p;
  let p1 = sourceNode.position();
  let p2 = targetNode.position();

  if( sourceNode.same( targetNode ) ) {
    p = {
      x: p1.x + options.nodeLoopOffset,
      y: p1.y + options.nodeLoopOffset
    };
  } else {
    p = {
      x: ( p1.x + p2.x ) / 2,
      y: ( p1.y + p2.y ) / 2
    };
  }

  let added = cy.collection();
  let edgeParams = options.edgeParams( sourceNode, targetNode, 0, handleNode );

  cy.startBatch();

  if( edgeType === 'node' ){
    let interNodeParams = options.nodeParams( sourceNode, targetNode, handleNode );
    let edgeParams2 = options.edgeParams( sourceNode, targetNode, 1, handleNode );

    let interNode = cy.add( assign({}, interNodeParams, {
      group: 'nodes',
      position: p
    }) );

    let sourceEdge = cy.add( assign({}, edgeParams, {
      group: 'edges',
      data: assign({}, edgeParams.data, {
        source: sourceNode.id(),
        target: interNode.id()
      })
    }) );

    let targetEdge = cy.add( assign({}, edgeParams2, {
      group: 'edges',
      data: assign({}, edgeParams2.data, {
        source: interNode.id(),
        target: targetNode.id()
      })
    }) );

    added = added.merge( interNode ).merge( sourceEdge ).merge( targetEdge );

  } else { // flat
    added = cy.add( assign({}, edgeParams, {
      group: 'edges',
      data: assign({}, edgeParams.data, {
        source: sourceNode.id(),
        target: targetNode.id()
      })
    }) );
  }

  if( preview ) {
    added.style('events', 'no');
    added.addClass('eh-preview');
    this.previewEles = added;
  }

  cy.endBatch();

  if( !preview ) {
    this.emit( 'complete', this.mp(), sourceNode, targetNode, added );
  }

  return this;
}

function makePreview(){
  this.makeEdges( true );

  return this;
}

function removePreview(){
  if( this.previewEles.nonempty() ){
    this.previewEles.remove();
    this.previewEles = this.cy.collection();
  }

  return this;
}

function handleShown(){
  return this.handleNodes.nonempty();
}

function removeHandles(){
  if( this.handleNodes.nonempty() ){
    this.handleNodes.remove();
    this.handleNodes = this.cy.collection();
  }

  return this;
}

function handlePosition( node ) {
  let { options } = this;
  let handlePosition = typeof options.handlePosition === typeof '' ? () => options.handlePosition : options.handlePosition;
  let p = node.position();
  let h = node.outerHeight();
  let w = node.outerWidth();

  // store how much we should move the handle from origin(p.x, p.y)
  let moveX = 0;
  let moveY = 0;

  // grab axes
  let axes = handlePosition( node ).toLowerCase().split(/\s+/);
  let axisX = axes[0];
  let axisY = axes[1];

  // based on handlePosition move left/right/top/bottom. Middle/middle will just be normal
  if( axisX === 'left' ){
    moveX = -(w / 2);
  } else if( axisX === 'right' ){
    moveX = w / 2;
  } if( axisY === 'top' ){
    moveY = -(h / 2);
  } else if( axisY === 'bottom' ){
    moveY = h / 2;
  }

  // set handle x and y based on adjusted positions
  let hx = p.x + moveX;
  let hy = p.y + moveY;

  return { x: hx, y: hy };
}

function makeHandles( node ) {
  let { options, cy } = this;

  let handleParams = options.handleParams( node );
  if (!isArray( handleParams ))
  {
    handleParams = [ handleParams ];
  }

  let handles = [];
  for( let i = 0; i < handleParams.length; i++ ){
    let handle = assign({}, handleParams[i], {
      group: 'nodes',
      grabbable: false,
      selectable: false
    });

    if (!handle.hasOwnProperty('position'))
    {
      handle.position = this.handlePosition( node );
    }

    handles.push( handle );
  }

  cy.startBatch();
  this.removeHandles();
  this.handleNodes = cy.add( handles );
  this.handleNodes.addClass('eh-handle');
  cy.endBatch();

  return this;
}

function updateEdge() {
  let { sourceNode, ghostNode } = this;
  let x = this.mx;
  let y = this.my;

  // can't draw a line without having the starting node
  if( !sourceNode ){ return; }

  if( ghostNode.empty() || ghostNode.removed() ) {
    let { handleNode, options, cy } = this;
    let ghostEdge, ghostEles;

    cy.startBatch();

    ghostNode = this.ghostNode = cy.add({
      group: 'nodes',
      classes: 'eh-ghost eh-ghost-node',
      position: { x: x, y: y }
    });

    ghostNode.style({
      'background-color': 'blue',
      'width': 0.0001,
      'height': 0.0001,
      'opacity': 0,
      'events': 'no'
    });

    let ghostEdgeParams = options.ghostEdgeParams( sourceNode, handleNode );

    ghostEdge = cy.add( assign({}, ghostEdgeParams, {
      group: 'edges',
      data: assign({}, ghostEdgeParams.data, {
        source: sourceNode.id(),
        target: ghostNode.id()
      })
    }) );

    ghostEdge.addClass('eh-ghost eh-ghost-edge');
    ghostEdge.style('events', 'no');

    ghostEles = this.ghostEles = cy.collection();
    ghostEles.merge( ghostNode ).merge( ghostEdge );

    cy.endBatch();
  }
  else
  {
    this.ghostNode.position({ x, y });
  }

  return this;
}

module.exports = {
  makeEdges, makePreview, removePreview,
  updateEdge,
  handleShown, handlePosition, makeHandles, removeHandles
};
