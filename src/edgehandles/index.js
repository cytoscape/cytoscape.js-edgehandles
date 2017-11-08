const defaults = require('./defaults');
const assign = require('../assign');

const cyGesturesToggle = require('./cy-gestures-toggle');
const cyListeners = require('./cy-listeners');
const drawMode = require('./draw-mode');
const drawing = require('./drawing');
const enabling = require('./enabling');
const gestureLifecycle = require('./gesture-lifecycle');
const listeners = require('./listeners');

function Edgehandles( options ){
  let cy = options.cy;

  this.cy = cy;
  this.listeners = [];

  // edgehandles gesture state
  this.enabled = true;
  this.drawMode = false;
  this.active = false;
  this.grabbingNode = false;

  // edgehandles elements
  this.handleNode = cy.collection();
  this.clearCollections();

  // handle
  this.hx = 0;
  this.hy = 0;
  this.hr = 0;

  // mouse position
  this.mx = 0;
  this.my = 0;

  this.options = assign( {}, defaults, options );

  this.saveGestureState();
  this.addListeners();
}

let proto = Edgehandles.prototype = {};
let extend = obj => assign( proto, obj );

proto.destroy = function(){
  this.removeListeners();
};

proto.setOptions = function( options ){
  assign( this.options, options );
};

proto.mp = function(){
  return { x: this.mx, y: this.my };
};

proto.hp = function(){
  return { x: this.hx, y: this.hy };
};

proto.clearCollections = function(){
  let { cy } = this;

  this.previewEles = cy.collection();
  this.ghostEles = cy.collection();
  this.ghostNode = cy.collection();
  this.sourceNode = cy.collection();
  this.targetNode = cy.collection();
  this.presumptiveTargets = cy.collection();
};

[
  cyGesturesToggle,
  cyListeners,
  drawMode,
  drawing,
  enabling,
  gestureLifecycle,
  listeners
].forEach( extend );

module.exports = Edgehandles;
