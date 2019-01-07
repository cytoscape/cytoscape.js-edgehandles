const assign = require('../assign');

function makeEdges( preview = false ) {
  // can't make edges outside of regular gesture lifecycle
  if( !this.active ){ return; }

  let { cy, options, presumptiveTargets, previewEles } = this;

  // can't make preview if disabled
  if( preview && !options.preview ){ return; }

  let { sourceNode, targetNode } = this;

  // detect cancel
  if( !targetNode || targetNode.length === 0 ){
    this.removePreview();

    this.emit( 'cancel', this.mp(), sourceNode, presumptiveTargets );

    return;
  }

  // just remove preview class if we already have the edges
  if( !preview && previewEles.length > 0 ) {
    cy.startBatch();
    previewEles.removeClass('eh-preview').style('events', '');
    cy.endBatch();

    this.emit( 'complete', this.mp(), sourceNode, targetNode, previewEles );

    return;
  }

  let edgeType = options.edgeType( sourceNode, targetNode );

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
  let edgeParams = options.edgeParams( sourceNode, targetNode, 0 );

  cy.startBatch();

  if( edgeType === 'node' ){
    let interNodeParams = options.nodeParams( sourceNode, targetNode );
    let edgeParams2 = options.edgeParams( sourceNode, targetNode, 1 );

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
  if( this.previewEles.length > 0 ){
    this.previewEles.remove();
    this.previewEles = this.cy.collection();
  }

  return this;
}

function handleShown(){
  return this.handleNodes.length > 0;
}

function removeHandle(){
  if( this.handleNodes.length > 0 ){
    this.handleNodes.remove();
    this.handleNodes = this.cy.collection();
  }

  return this;
}

function makeHandle( node ) {
  let { options, cy } = this;

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
  let hx = this.hx = p.x + moveX;
  let hy = this.hy = p.y + moveY;
  let pos = { x: hx, y: hy };

  cy.startBatch();
  this.removeHandle();
  this.handleNodes = cy.add([
    {
      classes: 'eh-handle',
      position: pos,
      grabbable: false,
      selectable: false
    }
  ]);
  this.handleNodes.style('z-index', 9007199254740991);
  cy.endBatch();

  return this;
}

function updateEdge() {
  let { sourceNode, ghostNode, cy, mx, my, options } = this;
  let x = mx;
  let y = my;
  let ghostEdge, ghostEles;

  // can't draw a line without having the starting node
  if( !sourceNode ){ return; }

  if( ghostNode.length === 0 || ghostNode.removed() ) {
    ghostEles = this.ghostEles = cy.collection();

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
      'opacity': 0
    });

    let ghostEdgeParams = options.ghostEdgeParams();

    ghostEdge = cy.add( assign({}, ghostEdgeParams, {
      group: 'edges',
      data: assign({}, ghostEdgeParams.data, {
        source: sourceNode.id(),
        target: ghostNode.id()
      })
    }) );

    ghostEdge.addClass('eh-ghost eh-ghost-edge');

    ghostEles.merge( ghostNode ).merge( ghostEdge );

    ghostEles.style('events', 'no');

    cy.endBatch();
  }
  else
  {
    ghostNode.position({ x, y });
  }

  return this;
}

module.exports = {
  makeEdges, makePreview, removePreview,
  updateEdge,
  handleShown, makeHandle, removeHandle
};
