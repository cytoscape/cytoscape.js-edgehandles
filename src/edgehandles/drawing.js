const assign = require('../assign');
const isString = x => typeof x === typeof '';
const isArray = x => typeof x === typeof [] && x.length != null;

function getEleJson( overrides, params, addedClasses ){
  let json = {};

  // basic values
  assign( json, params, overrides );

  // make sure params can specify data but that overrides take precedence
  assign( json.data, params.data, overrides.data );

  if( isString(params.classes) ){
    json.classes = params.classes + ' ' + addedClasses;
  } else if( isArray(params.classes) ){
    json.classes = params.classes.join(' ') + ' ' + addedClasses;
  } else {
    json.classes = addedClasses;
  }

  return json;
}

function makeEdges( preview = false ) {
  let { cy, options, presumptiveTargets, previewEles, active } = this;

  let source = this.sourceNode;
  let target = this.targetNode;
  let classes = preview ? 'eh-preview' : '';
  let added = cy.collection();
  let canConnect = this.canConnect(target);

  // can't make edges outside of regular gesture lifecycle
  if( !active ){ return; }

  // must be able to connect
  if( !canConnect ){ return; }

  // detect cancel
  if( !target || target.size() === 0 ){
    previewEles.remove();

    this.emit( 'cancel', this.mp(), source, presumptiveTargets );

    return;
  }

  // just remove preview class if we already have the edges
  if( !preview ) {
    previewEles.removeClass('eh-preview').style('events', '');

    this.emit( 'complete', this.mp(), source, target, previewEles );

    return;
  }

  let source2target = cy.add(
    getEleJson(
      {
        group: 'edges',
        data: {
          source: source.id(),
          target: target.id()
        }
      },
      this.edgeParams( target ),
      classes
    )
  );

  added = added.merge( source2target );

  if( preview ) {
    this.previewEles = added;

    added.style('events', 'no');
  } else {
    added.style('events', '');

    this.emit( 'complete', this.mp(), source, target, added );
  }

  return this;
}

function makePreview() {
  this.makeEdges( true );

  return this;
}

function previewShown(){
  return this.previewEles.nonempty() && this.previewEles.inside();
}

function removePreview() {
  if( this.previewShown() ){
    this.previewEles.remove();
  }

  return this;
}

function updateEdge() {
  let { sourceNode, ghostNode, cy, mx, my } = this;
  let x = mx;
  let y = my;
  let ghostEdge, ghostEles;

  // can't draw a line without having the starting node
  if( !sourceNode ){ return; }

  if( !ghostNode || ghostNode.length === 0 || ghostNode.removed() ) {
    ghostEles = this.ghostEles = cy.collection();

    cy.batch( () => {
      ghostNode = this.ghostNode = cy.add( {
        group: 'nodes',
        classes: 'eh-ghost eh-ghost-node',
        position: {
          x: 0,
          y: 0
        }
      } );

      ghostNode.style({
        'background-color': 'blue',
        'width': 0.0001,
        'height': 0.0001,
        'opacity': 0,
        'events': 'no'
      });

      let ghostEdgeParams = {};

      ghostEdge = cy.add( assign({}, ghostEdgeParams, {
        group: 'edges',
        data: assign({}, ghostEdgeParams.data, {
          source: sourceNode.id(),
          target: ghostNode.id()
        }),
        classes: 'eh-ghost eh-ghost-edge'
      }) );

      ghostEdge.style({
        'events': 'no'
      });
    } );

    ghostEles.merge( ghostNode ).merge( ghostEdge );
  }

  ghostNode.position({ x, y });

  return this;
}

module.exports = {
  makeEdges, makePreview, removePreview, previewShown,
  updateEdge
};
