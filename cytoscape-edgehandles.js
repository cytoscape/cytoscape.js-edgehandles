(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cytoscapeEdgehandles"] = factory();
	else
		root["cytoscapeEdgehandles"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Simple, internal Object.assign() polyfill for options objects etc.

module.exports = Object.assign != null ? Object.assign.bind(Object) : function (tgt) {
  for (var _len = arguments.length, srcs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    srcs[_key - 1] = arguments[_key];
  }

  srcs.forEach(function (src) {
    Object.keys(src).forEach(function (k) {
      return tgt[k] = src[k];
    });
  });

  return tgt;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Edgehandles = __webpack_require__(9);
var assign = __webpack_require__(0);

module.exports = function (options) {
  var cy = this;

  return new Edgehandles(assign({ cy: cy }, options));
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function disableGestures() {
  this.saveGestureState();

  this.cy.zoomingEnabled(false).panningEnabled(false).boxSelectionEnabled(false);

  return this;
}

function resetGestures() {
  this.cy.zoomingEnabled(this.lastZoomingEnabled).panningEnabled(this.lastPanningEnabled).boxSelectionEnabled(this.lastBoxSelectionEnabled);

  return this;
}

function saveGestureState() {
  var cy = this.cy;


  this.lastPanningEnabled = cy.panningEnabled();
  this.lastZoomingEnabled = cy.zoomingEnabled();
  this.lastBoxSelectionEnabled = cy.boxSelectionEnabled();

  return this;
}

module.exports = { disableGestures: disableGestures, resetGestures: resetGestures, saveGestureState: saveGestureState };

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function addCytoscapeListeners() {
  var _this = this;

  var cy = this.cy;

  // grabbing nodes

  this.addListener(cy, 'drag', function () {
    return _this.grabbingNode = true;
  });
  this.addListener(cy, 'free', function () {
    return _this.grabbingNode = false;
  });

  // show handle on hover
  this.addListener(cy, 'mouseover', 'node', function (e) {
    _this.show(e.target);
  });

  // hide handle on tap handle
  this.addListener(cy, 'tap', 'node', function (e) {
    var node = e.target;

    if (node.same(_this.handleNode)) {
      _this.hide();
    } else {
      _this.show(node);
    }
  });

  // hide handle when source node moved
  this.addListener(cy, 'position', 'node', function (e) {
    if (e.target.same(_this.sourceNode)) {
      _this.hide();
    }
  });

  // start on tapstart handle
  // start on tapstart node (draw mode)
  // toggle on source node
  this.addListener(cy, 'tapstart', 'node', function (e) {
    var node = e.target;

    if (node.same(_this.handleNode)) {
      _this.start(_this.sourceNode);
    } else if (_this.drawMode) {
      _this.start(node);
    } else if (node.same(_this.sourceNode)) {
      _this.hide();
    }
  });

  // update line on drag
  this.addListener(cy, 'tapdrag', function (e) {
    _this.update(e.position);
  });

  // hover over preview
  this.addListener(cy, 'tapdragover', 'node', function (e) {
    _this.preview(e.target);
  });

  // hover out unpreview
  this.addListener(cy, 'tapdragout', 'node', function (e) {
    _this.unpreview(e.target);
  });

  // stop gesture on tapend
  this.addListener(cy, 'tapend', function () {
    _this.stop();
  });

  return this;
}

module.exports = { addCytoscapeListeners: addCytoscapeListeners };

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable no-unused-vars */
var defaults = {
  preview: true, // whether to show added edges preview before releasing selection
  hoverDelay: 150, // time spent hovering over a target node before it is considered selected
  handleNodes: 'node', // selector/filter function for whether edges can be made from a given node
  handlePosition: 'middle top', // sets the position of the handle in the format of "X-AXIS Y-AXIS" such as "left top", "middle top"
  handleInDrawMode: false, // whether to show the handle in draw mode
  edgeType: function edgeType(sourceNode, targetNode) {
    // can return 'flat' for flat edges between nodes or 'node' for intermediate node between them
    // returning null/undefined means an edge can't be added between the two nodes
    return 'flat';
  },
  loopAllowed: function loopAllowed(node) {
    // for the specified node, return whether edges from itself to itself are allowed
    return false;
  },
  nodeLoopOffset: -50, // offset for edgeType: 'node' loops
  nodeParams: function nodeParams(sourceNode, targetNode) {
    // for edges between the specified source and target
    // return element object to be passed to cy.add() for intermediary node
    return {};
  },
  edgeParams: function edgeParams(sourceNode, targetNode, i) {
    // for edges between the specified source and target
    // return element object to be passed to cy.add() for edge
    // NB: i indicates edge index in case of edgeType: 'node'
    return {};
  },
  show: function show(sourceNode) {
    // fired when handle is shown
  },
  hide: function hide(sourceNode) {
    // fired when the handle is hidden
  },
  start: function start(sourceNode) {
    // fired when edgehandles interaction starts (drag on handle)
  },
  complete: function complete(sourceNode, targetNode, addedEles) {
    // fired when edgehandles is done and elements are added
  },
  stop: function stop(sourceNode) {
    // fired when edgehandles interaction is stopped (either complete with added edges or incomplete)
  },
  cancel: function cancel(sourceNode, cancelledTargets) {
    // fired when edgehandles are cancelled (incomplete gesture)
  },
  hoverover: function hoverover(sourceNode, targetNode) {
    // fired when a target is hovered
  },
  hoverout: function hoverout(sourceNode, targetNode) {
    // fired when a target isn't hovered anymore
  },
  previewon: function previewon(sourceNode, targetNode, previewEles) {
    // fired when preview is shown
  },
  previewoff: function previewoff(sourceNode, targetNode, previewEles) {
    // fired when preview is hidden
  },
  drawon: function drawon() {
    // fired when draw mode enabled
  },
  drawoff: function drawoff() {
    // fired when draw mode disabled
  }
};
/* eslint-enable */

module.exports = defaults;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function toggleDrawMode(bool) {
  var cy = this.cy,
      options = this.options;


  this.drawMode = bool != null ? bool : !this.drawMode;

  if (this.drawMode) {
    this.prevUngrabifyState = cy.autoungrabify();

    cy.autoungrabify(true);

    if (!options.handleInDrawMode && this.handleShown()) {
      this.hide();
    }

    this.emit('drawon');
  } else {
    cy.autoungrabify(this.prevUngrabifyState);

    this.emit('drawoff');
  }

  return this;
}

function enableDrawMode() {
  return this.toggleDrawMode(true);
}

function disableDrawMode() {
  return this.toggleDrawMode(false);
}

module.exports = { toggleDrawMode: toggleDrawMode, enableDrawMode: enableDrawMode, disableDrawMode: disableDrawMode };

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(0);

function addClassesToEleJson(json, classes) {
  if (json.classes) {
    json.classes += ' ' + classes;
  } else {
    json.classes = classes;
  }

  return json;
}

function makeEdges() {
  var preview = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var cy = this.cy,
      options = this.options,
      presumptiveTargets = this.presumptiveTargets,
      previewEles = this.previewEles;


  var source = this.sourceNode;
  var target = this.targetNode;
  var classes = preview ? 'eh-preview' : '';
  var added = cy.collection();

  // can't make preview if disabled
  if (preview && !options.preview) {
    return;
  }

  // detect cancel
  if (!target || target.size() === 0) {
    previewEles.remove();

    this.emit('cancel', this.mp(), source, presumptiveTargets);

    return;
  }

  // just remove preview class if we already have the edges
  if (!preview && options.preview) {
    previewEles.removeClass('eh-preview');

    this.emit('complete', this.mp(), source, target, previewEles);

    return;
  }

  var p1 = source.position();
  var p2 = target.position();

  var p = void 0;
  if (source.same(target)) {
    p = {
      x: p1.x + options.nodeLoopOffset,
      y: p1.y + options.nodeLoopOffset
    };
  } else {
    p = {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2
    };
  }

  var edgeType = options.edgeType(source, target);

  if (edgeType === 'node') {
    var interNode = cy.add(addClassesToEleJson(assign({
      group: 'nodes',
      position: p
    }, options.nodeParams(source, target)), classes));

    var source2inter = cy.add(addClassesToEleJson(assign({
      group: 'edges',
      data: {
        source: source.id(),
        target: interNode.id()
      }
    }, options.edgeParams(source, target, 0)), classes));

    var inter2target = cy.add(addClassesToEleJson(assign({
      group: 'edges',
      data: {
        source: interNode.id(),
        target: target.id()
      }
    }, options.edgeParams(source, target, 1)), classes));

    added = added.merge(interNode).merge(source2inter).merge(inter2target);
  } else {
    // flat
    var source2target = cy.add(addClassesToEleJson(assign({
      group: 'edges',
      data: {
        source: source.id(),
        target: target.id()
      }
    }, options.edgeParams(source, target, 0)), classes));

    added = added.merge(source2target);
  }

  if (preview) {
    this.previewEles = added;
  } else {
    this.emit('complete', this.mp(), source, target, added);
  }

  return this;
}

function makePreview() {
  this.makeEdges(true);

  return this;
}

function previewShown() {
  return this.previewEles.nonempty() && this.previewEles.inside();
}

function removePreview() {
  if (this.previewShown()) {
    this.previewEles.remove();
  }

  return this;
}

function handleShown() {
  return this.handleNode.nonempty() && this.handleNode.inside();
}

function removeHandle() {
  this.handleNode.remove();

  return this;
}

function setHandleFor(node) {
  var _this = this;

  var options = this.options,
      cy = this.cy;


  var p = node.position();
  var h = node.outerHeight();
  var w = node.outerWidth();

  // store how much we should move the handle from origin(p.x, p.y)
  var moveX = 0;
  var moveY = 0;

  // grab axis's
  var axes = options.handlePosition.toLowerCase().split(' ');
  var axisX = axes[0];
  var axisY = axes[1];

  // based on handlePosition move left/right/top/bottom. Middle/middle will just be normal
  if (axisX === 'left') {
    moveX = -(w / 2);
  } else if (axisX === 'right') {
    moveX = w / 2;
  }if (axisY === 'top') {
    moveY = -(h / 2);
  } else if (axisY === 'bottom') {
    moveY = h / 2;
  }

  // set handle x and y based on adjusted positions
  var hx = this.hx = p.x + moveX;
  var hy = this.hy = p.y + moveY;
  var pos = { x: hx, y: hy };

  if (this.handleShown()) {
    this.handleNode.position(pos);
  } else {
    cy.batch(function () {
      _this.handleNode = cy.add({
        classes: 'eh-handle',
        position: pos,
        grabbable: false
      });

      _this.handleNode.style('z-index', 9007199254740991);
    });
  }

  return this;
}

function updateEdge() {
  var _this2 = this;

  var sourceNode = this.sourceNode,
      ghostNode = this.ghostNode,
      cy = this.cy,
      mx = this.mx,
      my = this.my;

  var x = mx;
  var y = my;
  var ghostEdge = void 0,
      ghostEles = void 0;

  // can't draw a line without having the starting node
  if (!sourceNode) {
    return;
  }

  if (!ghostNode || ghostNode.length === 0 || ghostNode.removed()) {
    ghostEles = this.ghostEles = cy.collection();

    cy.batch(function () {
      ghostNode = _this2.ghostNode = cy.add({
        group: 'nodes',
        classes: 'eh-ghost eh-ghost-node',
        position: {
          x: 0,
          y: 0
        }
      });

      ghostNode.style({
        'background-color': 'blue',
        'width': 0.0001,
        'height': 0.0001,
        'opacity': 0,
        'events': 'no'
      });

      ghostEdge = cy.add({
        group: 'edges',
        classes: 'eh-ghost eh-ghost-edge',
        data: {
          source: sourceNode.id(),
          target: ghostNode.id()
        }
      });

      ghostEdge.style({
        'events': 'no'
      });
    });

    ghostEles.merge(ghostNode).merge(ghostEdge);
  }

  ghostNode.position({ x: x, y: y });

  return this;
}

module.exports = {
  makeEdges: makeEdges, makePreview: makePreview, removePreview: removePreview, previewShown: previewShown,
  updateEdge: updateEdge,
  handleShown: handleShown, setHandleFor: setHandleFor, removeHandle: removeHandle
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function enable() {
  this.enabled = true;

  this.emit('enable');

  return this;
}

function disable() {
  this.enabled = false;

  this.emit('disable');

  return this;
}

module.exports = { enable: enable, disable: disable };

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function canStartOn(node) {
  var options = this.options,
      previewEles = this.previewEles,
      ghostEles = this.ghostEles,
      handleNode = this.handleNode;

  var isPreview = function isPreview(el) {
    return previewEles.anySame(el);
  };
  var isGhost = function isGhost(el) {
    return ghostEles.anySame(el);
  };
  var userFilter = function userFilter(el) {
    return el.filter(options.handleNodes).length > 0;
  };
  var isHandle = function isHandle(el) {
    return handleNode.same(el);
  };
  var isTemp = function isTemp(el) {
    return isPreview(el) || isHandle(el) || isGhost(el);
  };

  var enabled = this.enabled,
      active = this.active,
      grabbingNode = this.grabbingNode;


  return enabled && !active && !grabbingNode && (node == null || !isTemp(node) && userFilter(node));
}

function canStartDrawModeOn(node) {
  return this.canStartOn(node) && this.drawMode;
}

function canStartNonDrawModeOn(node) {
  return this.canStartOn(node) && !this.drawMode;
}

function show(node) {
  var options = this.options,
      drawMode = this.drawMode;


  if (!this.canStartOn(node) || drawMode && !options.handleInDrawMode) {
    return;
  }

  this.sourceNode = node;

  this.setHandleFor(node);

  this.emit('show', this.hp(), this.sourceNode);

  return this;
}

function hide() {
  var cy = this.cy;


  this.removeHandle();

  this.sourceNode = cy.collection();

  this.emit('hide', this.hp(), this.sourceNode);

  return this;
}

function start(node) {
  if (!this.canStartOn(node)) {
    return;
  }

  this.active = true;

  this.sourceNode = node;
  this.sourceNode.addClass('eh-source');

  this.disableGestures();

  this.emit('start', this.hp(), node);
}

function update(pos) {
  if (!this.active) {
    return;
  }

  var p = pos;

  this.mx = p.x;
  this.my = p.y;

  this.updateEdge();

  return this;
}

function preview(target) {
  var _this = this;

  if (!this.active || target.same(this.handleNode)) {
    return;
  }

  var options = this.options,
      sourceNode = this.sourceNode,
      ghostNode = this.ghostNode,
      presumptiveTargets = this.presumptiveTargets,
      previewEles = this.previewEles;

  var source = sourceNode;

  clearTimeout(this.previewTimeout);

  this.previewTimeout = setTimeout(function () {
    var isLoop = target.same(source);
    var loopAllowed = options.loopAllowed(target);
    var isGhost = target.same(ghostNode);
    var noEdge = options.edgeType(source, target) == null;

    _this.targetNode = target;
    presumptiveTargets.merge(target);

    target.addClass('eh-presumptive-target');

    if (isGhost || noEdge) {
      return;
    }

    if (!isLoop || isLoop && loopAllowed) {
      target.addClass('eh-target');

      _this.emit('hoverover', _this.mp(), source, target);

      if (options.preview) {
        target.addClass('eh-preview');

        _this.makePreview();

        _this.emit('previewon', _this.mp(), source, target, previewEles);
      }
    }
  }, options.hoverDelay);

  return this;
}

function unpreview(target) {
  if (!this.active || target.same(this.handleNode)) {
    return;
  }

  var previewTimeout = this.previewTimeout,
      sourceNode = this.sourceNode,
      previewEles = this.previewEles;

  clearTimeout(previewTimeout);
  this.previewTimeout = null;

  var source = sourceNode;

  target.removeClass('eh-preview eh-target eh-presumptive-target');

  this.removePreview(source, target);

  this.emit('hoverout', this.mp(), source, target);
  this.emit('previewoff', this.mp(), source, target, previewEles);

  return this;
}

function stop() {
  if (!this.active) {
    return;
  }

  var sourceNode = this.sourceNode,
      targetNode = this.targetNode,
      handleNode = this.handleNode,
      ghostEles = this.ghostEles,
      presumptiveTargets = this.presumptiveTargets;


  this.active = false;

  this.makeEdges();

  sourceNode.removeClass('eh-source');
  targetNode.removeClass('eh-target eh-preview eh-hover');
  presumptiveTargets.removeClass('eh-presumptive-target');

  handleNode.remove();
  ghostEles.remove();

  this.clearCollections();

  this.resetGestures();

  this.emit('stop', this.mp(), sourceNode);

  return this;
}

module.exports = {
  show: show, hide: hide, start: start, update: update, preview: preview, unpreview: unpreview, stop: stop,
  canStartOn: canStartOn, canStartDrawModeOn: canStartDrawModeOn, canStartNonDrawModeOn: canStartNonDrawModeOn
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(4);
var assign = __webpack_require__(0);

var cyGesturesToggle = __webpack_require__(2);
var cyListeners = __webpack_require__(3);
var drawMode = __webpack_require__(5);
var drawing = __webpack_require__(6);
var enabling = __webpack_require__(7);
var gestureLifecycle = __webpack_require__(8);
var listeners = __webpack_require__(10);

function Edgehandles(options) {
  var cy = options.cy;

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

  this.options = assign({}, defaults, options);

  this.saveGestureState();
  this.addListeners();
}

var proto = Edgehandles.prototype = {};
var extend = function extend(obj) {
  return assign(proto, obj);
};

proto.destroy = function () {
  this.removeListeners();
};

proto.setOptions = function (options) {
  assign(this.options, options);
};

proto.mp = function () {
  return { x: this.mx, y: this.my };
};

proto.hp = function () {
  return { x: this.hx, y: this.hy };
};

proto.clearCollections = function () {
  var cy = this.cy;


  this.previewEles = cy.collection();
  this.ghostEles = cy.collection();
  this.ghostNode = cy.collection();
  this.sourceNode = cy.collection();
  this.targetNode = cy.collection();
  this.presumptiveTargets = cy.collection();
};

[cyGesturesToggle, cyListeners, drawMode, drawing, enabling, gestureLifecycle, listeners].forEach(extend);

module.exports = Edgehandles;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function addListeners() {
  var _this = this;

  this.addCytoscapeListeners();

  this.addListener(this.cy, 'destroy', function () {
    return _this.destroy();
  });

  return this;
}

function removeListeners() {
  for (var i = this.listeners.length - 1; i >= 0; i--) {
    var l = this.listeners[i];

    this.removeListener(l.target, l.event, l.selector, l.callback, l.options);
  }

  return this;
}

function getListener(target, event, selector, callback, options) {
  if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) !== _typeof('')) {
    callback = selector;
    options = callback;
    selector = null;
  }

  if (options == null) {
    options = false;
  }

  return { target: target, event: event, selector: selector, callback: callback, options: options };
}

function isDom(target) {
  return target instanceof Element;
}

function addListener(target, event, selector, callback, options) {
  var l = getListener(target, event, selector, callback, options);

  this.listeners.push(l);

  if (isDom(l.target)) {
    l.target.addEventListener(l.event, l.callback, l.options);
  } else {
    if (l.selector) {
      l.target.addListener(l.event, l.selector, l.callback, l.options);
    } else {
      l.target.addListener(l.event, l.callback, l.options);
    }
  }

  return this;
}

function removeListener(target, event, selector, callback, options) {
  var l = getListener(target, event, selector, callback, options);

  for (var i = this.listeners.length - 1; i >= 0; i--) {
    var l2 = this.listeners[i];

    if (l.target === l2.target && l.event === l2.event && (l.selector == null || l.selector === l2.selector) && (l.callback == null || l.callback === l2.callback)) {
      this.listeners.splice(i, 1);

      if (isDom(l.target)) {
        l.target.removeEventListener(l.event, l.callback, l.options);
      } else {
        if (l.selector) {
          l.target.removeListener(l.event, l.selector, l.callback, l.options);
        } else {
          l.target.removeListener(l.event, l.callback, l.options);
        }
      }

      break;
    }
  }

  return this;
}

function emit(type, position) {
  var options = this.options,
      cy = this.cy;

  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  cy.emit({ type: 'eh' + type, position: position }, args);

  options[type].apply(options, args);

  return this;
}

module.exports = { addListener: addListener, addListeners: addListeners, removeListener: removeListener, removeListeners: removeListeners, emit: emit };

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var impl = __webpack_require__(1);

// registers the extension on a cytoscape lib ref
var register = function register(cytoscape) {
  if (!cytoscape) {
    return;
  } // can't register if cytoscape unspecified

  cytoscape('core', 'edgehandles', impl); // register with cytoscape.js
};

if (typeof cytoscape !== 'undefined') {
  // expose to global cytoscape (i.e. window.cytoscape)
  register(cytoscape); // eslint-disable-line no-undef
}

module.exports = register;

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjZjFmZWU3MGRlOWM1NDcyMTc5OCIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzaWduLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9lZGdlaGFuZGxlcy9jeS1nZXN0dXJlcy10b2dnbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VkZ2VoYW5kbGVzL2N5LWxpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWRnZWhhbmRsZXMvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VkZ2VoYW5kbGVzL2RyYXctbW9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWRnZWhhbmRsZXMvZHJhd2luZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWRnZWhhbmRsZXMvZW5hYmxpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VkZ2VoYW5kbGVzL2dlc3R1cmUtbGlmZWN5Y2xlLmpzIiwid2VicGFjazovLy8uL3NyYy9lZGdlaGFuZGxlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWRnZWhhbmRsZXMvbGlzdGVuZXJzLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiT2JqZWN0IiwiYXNzaWduIiwiYmluZCIsInRndCIsInNyY3MiLCJmb3JFYWNoIiwia2V5cyIsInNyYyIsImsiLCJFZGdlaGFuZGxlcyIsInJlcXVpcmUiLCJvcHRpb25zIiwiY3kiLCJkaXNhYmxlR2VzdHVyZXMiLCJzYXZlR2VzdHVyZVN0YXRlIiwiem9vbWluZ0VuYWJsZWQiLCJwYW5uaW5nRW5hYmxlZCIsImJveFNlbGVjdGlvbkVuYWJsZWQiLCJyZXNldEdlc3R1cmVzIiwibGFzdFpvb21pbmdFbmFibGVkIiwibGFzdFBhbm5pbmdFbmFibGVkIiwibGFzdEJveFNlbGVjdGlvbkVuYWJsZWQiLCJhZGRDeXRvc2NhcGVMaXN0ZW5lcnMiLCJhZGRMaXN0ZW5lciIsImdyYWJiaW5nTm9kZSIsInNob3ciLCJlIiwidGFyZ2V0Iiwibm9kZSIsInNhbWUiLCJoYW5kbGVOb2RlIiwiaGlkZSIsInNvdXJjZU5vZGUiLCJzdGFydCIsImRyYXdNb2RlIiwidXBkYXRlIiwicG9zaXRpb24iLCJwcmV2aWV3IiwidW5wcmV2aWV3Iiwic3RvcCIsImRlZmF1bHRzIiwiaG92ZXJEZWxheSIsImhhbmRsZU5vZGVzIiwiaGFuZGxlUG9zaXRpb24iLCJoYW5kbGVJbkRyYXdNb2RlIiwiZWRnZVR5cGUiLCJ0YXJnZXROb2RlIiwibG9vcEFsbG93ZWQiLCJub2RlTG9vcE9mZnNldCIsIm5vZGVQYXJhbXMiLCJlZGdlUGFyYW1zIiwiaSIsImNvbXBsZXRlIiwiYWRkZWRFbGVzIiwiY2FuY2VsIiwiY2FuY2VsbGVkVGFyZ2V0cyIsImhvdmVyb3ZlciIsImhvdmVyb3V0IiwicHJldmlld29uIiwicHJldmlld0VsZXMiLCJwcmV2aWV3b2ZmIiwiZHJhd29uIiwiZHJhd29mZiIsInRvZ2dsZURyYXdNb2RlIiwiYm9vbCIsInByZXZVbmdyYWJpZnlTdGF0ZSIsImF1dG91bmdyYWJpZnkiLCJoYW5kbGVTaG93biIsImVtaXQiLCJlbmFibGVEcmF3TW9kZSIsImRpc2FibGVEcmF3TW9kZSIsImFkZENsYXNzZXNUb0VsZUpzb24iLCJqc29uIiwiY2xhc3NlcyIsIm1ha2VFZGdlcyIsInByZXN1bXB0aXZlVGFyZ2V0cyIsInNvdXJjZSIsImFkZGVkIiwiY29sbGVjdGlvbiIsInNpemUiLCJyZW1vdmUiLCJtcCIsInJlbW92ZUNsYXNzIiwicDEiLCJwMiIsInAiLCJ4IiwieSIsImludGVyTm9kZSIsImFkZCIsImdyb3VwIiwic291cmNlMmludGVyIiwiZGF0YSIsImlkIiwiaW50ZXIydGFyZ2V0IiwibWVyZ2UiLCJzb3VyY2UydGFyZ2V0IiwibWFrZVByZXZpZXciLCJwcmV2aWV3U2hvd24iLCJub25lbXB0eSIsImluc2lkZSIsInJlbW92ZVByZXZpZXciLCJyZW1vdmVIYW5kbGUiLCJzZXRIYW5kbGVGb3IiLCJoIiwib3V0ZXJIZWlnaHQiLCJ3Iiwib3V0ZXJXaWR0aCIsIm1vdmVYIiwibW92ZVkiLCJheGVzIiwidG9Mb3dlckNhc2UiLCJzcGxpdCIsImF4aXNYIiwiYXhpc1kiLCJoeCIsImh5IiwicG9zIiwiYmF0Y2giLCJncmFiYmFibGUiLCJzdHlsZSIsInVwZGF0ZUVkZ2UiLCJnaG9zdE5vZGUiLCJteCIsIm15IiwiZ2hvc3RFZGdlIiwiZ2hvc3RFbGVzIiwibGVuZ3RoIiwicmVtb3ZlZCIsImVuYWJsZSIsImVuYWJsZWQiLCJkaXNhYmxlIiwiY2FuU3RhcnRPbiIsImlzUHJldmlldyIsImFueVNhbWUiLCJlbCIsImlzR2hvc3QiLCJ1c2VyRmlsdGVyIiwiZmlsdGVyIiwiaXNIYW5kbGUiLCJpc1RlbXAiLCJhY3RpdmUiLCJjYW5TdGFydERyYXdNb2RlT24iLCJjYW5TdGFydE5vbkRyYXdNb2RlT24iLCJocCIsImFkZENsYXNzIiwiY2xlYXJUaW1lb3V0IiwicHJldmlld1RpbWVvdXQiLCJzZXRUaW1lb3V0IiwiaXNMb29wIiwibm9FZGdlIiwiY2xlYXJDb2xsZWN0aW9ucyIsImN5R2VzdHVyZXNUb2dnbGUiLCJjeUxpc3RlbmVycyIsImRyYXdpbmciLCJlbmFibGluZyIsImdlc3R1cmVMaWZlY3ljbGUiLCJsaXN0ZW5lcnMiLCJociIsImFkZExpc3RlbmVycyIsInByb3RvIiwicHJvdG90eXBlIiwiZXh0ZW5kIiwib2JqIiwiZGVzdHJveSIsInJlbW92ZUxpc3RlbmVycyIsInNldE9wdGlvbnMiLCJsIiwicmVtb3ZlTGlzdGVuZXIiLCJldmVudCIsInNlbGVjdG9yIiwiY2FsbGJhY2siLCJnZXRMaXN0ZW5lciIsImlzRG9tIiwiRWxlbWVudCIsInB1c2giLCJhZGRFdmVudExpc3RlbmVyIiwibDIiLCJzcGxpY2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwidHlwZSIsImFyZ3MiLCJp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LDBCQUFmLEVBQTZCUyw4QkFBN0IsRUFBNkNILGdDQUE3QyxFQUE4RGpHLFVBQTlELEVBQWpCLEM7Ozs7Ozs7OztBQy9GQSxJQUFNa0gsT0FBTyxtQkFBQTVLLENBQVEsQ0FBUixDQUFiOztBQUVBO0FBQ0EsSUFBSTZLLFdBQVcsU0FBWEEsUUFBVyxDQUFVQyxTQUFWLEVBQXFCO0FBQ2xDLE1BQUksQ0FBQ0EsU0FBTCxFQUFnQjtBQUFFO0FBQVMsR0FETyxDQUNOOztBQUU1QkEsWUFBVyxNQUFYLEVBQW1CLGFBQW5CLEVBQWtDRixJQUFsQyxFQUhrQyxDQUdRO0FBQzNDLENBSkQ7O0FBTUEsSUFBSSxPQUFPRSxTQUFQLEtBQXFCLFdBQXpCLEVBQXNDO0FBQUU7QUFDdENELFdBQVVDLFNBQVYsRUFEb0MsQ0FDYjtBQUN4Qjs7QUFFRDFMLE9BQU9DLE9BQVAsR0FBaUJ3TCxRQUFqQixDIiwiZmlsZSI6ImN5dG9zY2FwZS1lZGdlaGFuZGxlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImN5dG9zY2FwZUVkZ2VoYW5kbGVzXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImN5dG9zY2FwZUVkZ2VoYW5kbGVzXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGNmMWZlZTcwZGU5YzU0NzIxNzk4IiwiLy8gU2ltcGxlLCBpbnRlcm5hbCBPYmplY3QuYXNzaWduKCkgcG9seWZpbGwgZm9yIG9wdGlvbnMgb2JqZWN0cyBldGMuXG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbiAhPSBudWxsID8gT2JqZWN0LmFzc2lnbi5iaW5kKCBPYmplY3QgKSA6IGZ1bmN0aW9uKCB0Z3QsIC4uLnNyY3MgKXtcbiAgc3Jjcy5mb3JFYWNoKCBzcmMgPT4ge1xuICAgIE9iamVjdC5rZXlzKCBzcmMgKS5mb3JFYWNoKCBrID0+IHRndFtrXSA9IHNyY1trXSApO1xuICB9ICk7XG5cbiAgcmV0dXJuIHRndDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzaWduLmpzIiwiY29uc3QgRWRnZWhhbmRsZXMgPSByZXF1aXJlKCcuL2VkZ2VoYW5kbGVzJyk7XG5jb25zdCBhc3NpZ24gPSByZXF1aXJlKCcuL2Fzc2lnbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCBvcHRpb25zICl7XG4gIGxldCBjeSA9IHRoaXM7XG5cbiAgcmV0dXJuIG5ldyBFZGdlaGFuZGxlcyggYXNzaWduKHsgY3kgfSwgb3B0aW9ucykgKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29yZS5qcyIsImZ1bmN0aW9uIGRpc2FibGVHZXN0dXJlcygpe1xuICB0aGlzLnNhdmVHZXN0dXJlU3RhdGUoKTtcblxuICAoIHRoaXMuY3lcbiAgICAuem9vbWluZ0VuYWJsZWQoIGZhbHNlIClcbiAgICAucGFubmluZ0VuYWJsZWQoIGZhbHNlIClcbiAgICAuYm94U2VsZWN0aW9uRW5hYmxlZCggZmFsc2UgKVxuICApO1xuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiByZXNldEdlc3R1cmVzKCl7XG4gICggdGhpcy5jeVxuICAgIC56b29taW5nRW5hYmxlZCggdGhpcy5sYXN0Wm9vbWluZ0VuYWJsZWQgKVxuICAgIC5wYW5uaW5nRW5hYmxlZCggdGhpcy5sYXN0UGFubmluZ0VuYWJsZWQgKVxuICAgIC5ib3hTZWxlY3Rpb25FbmFibGVkKCB0aGlzLmxhc3RCb3hTZWxlY3Rpb25FbmFibGVkIClcbiAgKTtcblxuICByZXR1cm4gdGhpcztcbn1cblxuZnVuY3Rpb24gc2F2ZUdlc3R1cmVTdGF0ZSgpe1xuICBsZXQgeyBjeSB9ID0gdGhpcztcblxuICB0aGlzLmxhc3RQYW5uaW5nRW5hYmxlZCA9IGN5LnBhbm5pbmdFbmFibGVkKCk7XG4gIHRoaXMubGFzdFpvb21pbmdFbmFibGVkID0gY3kuem9vbWluZ0VuYWJsZWQoKTtcbiAgdGhpcy5sYXN0Qm94U2VsZWN0aW9uRW5hYmxlZCA9IGN5LmJveFNlbGVjdGlvbkVuYWJsZWQoKTtcblxuICByZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IGRpc2FibGVHZXN0dXJlcywgcmVzZXRHZXN0dXJlcywgc2F2ZUdlc3R1cmVTdGF0ZSB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VkZ2VoYW5kbGVzL2N5LWdlc3R1cmVzLXRvZ2dsZS5qcyIsImZ1bmN0aW9uIGFkZEN5dG9zY2FwZUxpc3RlbmVycygpe1xuICBsZXQgeyBjeSB9ID0gdGhpcztcblxuICAvLyBncmFiYmluZyBub2Rlc1xuICB0aGlzLmFkZExpc3RlbmVyKCBjeSwgJ2RyYWcnLCAoKSA9PiB0aGlzLmdyYWJiaW5nTm9kZSA9IHRydWUgKTtcbiAgdGhpcy5hZGRMaXN0ZW5lciggY3ksICdmcmVlJywgKCkgPT4gdGhpcy5ncmFiYmluZ05vZGUgPSBmYWxzZSApO1xuXG4gIC8vIHNob3cgaGFuZGxlIG9uIGhvdmVyXG4gIHRoaXMuYWRkTGlzdGVuZXIoIGN5LCAnbW91c2VvdmVyJywgJ25vZGUnLCBlID0+IHtcbiAgICB0aGlzLnNob3coIGUudGFyZ2V0ICk7XG4gIH0gKTtcblxuICAvLyBoaWRlIGhhbmRsZSBvbiB0YXAgaGFuZGxlXG4gIHRoaXMuYWRkTGlzdGVuZXIoIGN5LCAndGFwJywgJ25vZGUnLCBlID0+IHtcbiAgICBsZXQgbm9kZSA9IGUudGFyZ2V0O1xuXG4gICAgaWYoIG5vZGUuc2FtZSggdGhpcy5oYW5kbGVOb2RlICkgKXtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3coIG5vZGUgKTtcbiAgICB9XG4gIH0gKTtcblxuICAvLyBoaWRlIGhhbmRsZSB3aGVuIHNvdXJjZSBub2RlIG1vdmVkXG4gIHRoaXMuYWRkTGlzdGVuZXIoIGN5LCAncG9zaXRpb24nLCAnbm9kZScsIGUgPT4ge1xuICAgIGlmKCBlLnRhcmdldC5zYW1lKCB0aGlzLnNvdXJjZU5vZGUgKSApe1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICB9ICk7XG5cbiAgLy8gc3RhcnQgb24gdGFwc3RhcnQgaGFuZGxlXG4gIC8vIHN0YXJ0IG9uIHRhcHN0YXJ0IG5vZGUgKGRyYXcgbW9kZSlcbiAgLy8gdG9nZ2xlIG9uIHNvdXJjZSBub2RlXG4gIHRoaXMuYWRkTGlzdGVuZXIoIGN5LCAndGFwc3RhcnQnLCAnbm9kZScsIGUgPT4ge1xuICAgIGxldCBub2RlID0gZS50YXJnZXQ7XG5cbiAgICBpZiggbm9kZS5zYW1lKCB0aGlzLmhhbmRsZU5vZGUgKSApe1xuICAgICAgdGhpcy5zdGFydCggdGhpcy5zb3VyY2VOb2RlICk7XG4gICAgfSBlbHNlIGlmKCB0aGlzLmRyYXdNb2RlICl7XG4gICAgICB0aGlzLnN0YXJ0KCBub2RlICk7XG4gICAgfSBlbHNlIGlmKCBub2RlLnNhbWUoIHRoaXMuc291cmNlTm9kZSApICl7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG4gIH0gKTtcblxuICAvLyB1cGRhdGUgbGluZSBvbiBkcmFnXG4gIHRoaXMuYWRkTGlzdGVuZXIoIGN5LCAndGFwZHJhZycsIGUgPT4ge1xuICAgIHRoaXMudXBkYXRlKCBlLnBvc2l0aW9uICk7XG4gIH0gKTtcblxuICAvLyBob3ZlciBvdmVyIHByZXZpZXdcbiAgdGhpcy5hZGRMaXN0ZW5lciggY3ksICd0YXBkcmFnb3ZlcicsICdub2RlJywgZSA9PiB7XG4gICAgdGhpcy5wcmV2aWV3KCBlLnRhcmdldCApO1xuICB9ICk7XG5cbiAgLy8gaG92ZXIgb3V0IHVucHJldmlld1xuICB0aGlzLmFkZExpc3RlbmVyKCBjeSwgJ3RhcGRyYWdvdXQnLCAnbm9kZScsIGUgPT4ge1xuICAgIHRoaXMudW5wcmV2aWV3KCBlLnRhcmdldCApO1xuICB9ICk7XG5cbiAgLy8gc3RvcCBnZXN0dXJlIG9uIHRhcGVuZFxuICB0aGlzLmFkZExpc3RlbmVyKCBjeSwgJ3RhcGVuZCcsICgpID0+IHtcbiAgICB0aGlzLnN0b3AoKTtcbiAgfSApO1xuXG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgYWRkQ3l0b3NjYXBlTGlzdGVuZXJzIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZWRnZWhhbmRsZXMvY3ktbGlzdGVuZXJzLmpzIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmxldCBkZWZhdWx0cyA9IHtcbiAgcHJldmlldzogdHJ1ZSwgLy8gd2hldGhlciB0byBzaG93IGFkZGVkIGVkZ2VzIHByZXZpZXcgYmVmb3JlIHJlbGVhc2luZyBzZWxlY3Rpb25cbiAgaG92ZXJEZWxheTogMTUwLCAvLyB0aW1lIHNwZW50IGhvdmVyaW5nIG92ZXIgYSB0YXJnZXQgbm9kZSBiZWZvcmUgaXQgaXMgY29uc2lkZXJlZCBzZWxlY3RlZFxuICBoYW5kbGVOb2RlczogJ25vZGUnLCAvLyBzZWxlY3Rvci9maWx0ZXIgZnVuY3Rpb24gZm9yIHdoZXRoZXIgZWRnZXMgY2FuIGJlIG1hZGUgZnJvbSBhIGdpdmVuIG5vZGVcbiAgaGFuZGxlUG9zaXRpb246ICdtaWRkbGUgdG9wJywgLy8gc2V0cyB0aGUgcG9zaXRpb24gb2YgdGhlIGhhbmRsZSBpbiB0aGUgZm9ybWF0IG9mIFwiWC1BWElTIFktQVhJU1wiIHN1Y2ggYXMgXCJsZWZ0IHRvcFwiLCBcIm1pZGRsZSB0b3BcIlxuICBoYW5kbGVJbkRyYXdNb2RlOiBmYWxzZSwgLy8gd2hldGhlciB0byBzaG93IHRoZSBoYW5kbGUgaW4gZHJhdyBtb2RlXG4gIGVkZ2VUeXBlOiBmdW5jdGlvbiggc291cmNlTm9kZSwgdGFyZ2V0Tm9kZSApe1xuICAgIC8vIGNhbiByZXR1cm4gJ2ZsYXQnIGZvciBmbGF0IGVkZ2VzIGJldHdlZW4gbm9kZXMgb3IgJ25vZGUnIGZvciBpbnRlcm1lZGlhdGUgbm9kZSBiZXR3ZWVuIHRoZW1cbiAgICAvLyByZXR1cm5pbmcgbnVsbC91bmRlZmluZWQgbWVhbnMgYW4gZWRnZSBjYW4ndCBiZSBhZGRlZCBiZXR3ZWVuIHRoZSB0d28gbm9kZXNcbiAgICByZXR1cm4gJ2ZsYXQnO1xuICB9LFxuICBsb29wQWxsb3dlZDogZnVuY3Rpb24oIG5vZGUgKXtcbiAgICAvLyBmb3IgdGhlIHNwZWNpZmllZCBub2RlLCByZXR1cm4gd2hldGhlciBlZGdlcyBmcm9tIGl0c2VsZiB0byBpdHNlbGYgYXJlIGFsbG93ZWRcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG4gIG5vZGVMb29wT2Zmc2V0OiAtNTAsIC8vIG9mZnNldCBmb3IgZWRnZVR5cGU6ICdub2RlJyBsb29wc1xuICBub2RlUGFyYW1zOiBmdW5jdGlvbiggc291cmNlTm9kZSwgdGFyZ2V0Tm9kZSApe1xuICAgIC8vIGZvciBlZGdlcyBiZXR3ZWVuIHRoZSBzcGVjaWZpZWQgc291cmNlIGFuZCB0YXJnZXRcbiAgICAvLyByZXR1cm4gZWxlbWVudCBvYmplY3QgdG8gYmUgcGFzc2VkIHRvIGN5LmFkZCgpIGZvciBpbnRlcm1lZGlhcnkgbm9kZVxuICAgIHJldHVybiB7fTtcbiAgfSxcbiAgZWRnZVBhcmFtczogZnVuY3Rpb24oIHNvdXJjZU5vZGUsIHRhcmdldE5vZGUsIGkgKXtcbiAgICAvLyBmb3IgZWRnZXMgYmV0d2VlbiB0aGUgc3BlY2lmaWVkIHNvdXJjZSBhbmQgdGFyZ2V0XG4gICAgLy8gcmV0dXJuIGVsZW1lbnQgb2JqZWN0IHRvIGJlIHBhc3NlZCB0byBjeS5hZGQoKSBmb3IgZWRnZVxuICAgIC8vIE5COiBpIGluZGljYXRlcyBlZGdlIGluZGV4IGluIGNhc2Ugb2YgZWRnZVR5cGU6ICdub2RlJ1xuICAgIHJldHVybiB7fTtcbiAgfSxcbiAgc2hvdzogZnVuY3Rpb24oIHNvdXJjZU5vZGUgKXtcbiAgICAvLyBmaXJlZCB3aGVuIGhhbmRsZSBpcyBzaG93blxuICB9LFxuICBoaWRlOiBmdW5jdGlvbiggc291cmNlTm9kZSApe1xuICAgIC8vIGZpcmVkIHdoZW4gdGhlIGhhbmRsZSBpcyBoaWRkZW5cbiAgfSxcbiAgc3RhcnQ6IGZ1bmN0aW9uKCBzb3VyY2VOb2RlICl7XG4gICAgLy8gZmlyZWQgd2hlbiBlZGdlaGFuZGxlcyBpbnRlcmFjdGlvbiBzdGFydHMgKGRyYWcgb24gaGFuZGxlKVxuICB9LFxuICBjb21wbGV0ZTogZnVuY3Rpb24oIHNvdXJjZU5vZGUsIHRhcmdldE5vZGUsIGFkZGVkRWxlcyApe1xuICAgIC8vIGZpcmVkIHdoZW4gZWRnZWhhbmRsZXMgaXMgZG9uZSBhbmQgZWxlbWVudHMgYXJlIGFkZGVkXG4gIH0sXG4gIHN0b3A6IGZ1bmN0aW9uKCBzb3VyY2VOb2RlICl7XG4gICAgLy8gZmlyZWQgd2hlbiBlZGdlaGFuZGxlcyBpbnRlcmFjdGlvbiBpcyBzdG9wcGVkIChlaXRoZXIgY29tcGxldGUgd2l0aCBhZGRlZCBlZGdlcyBvciBpbmNvbXBsZXRlKVxuICB9LFxuICBjYW5jZWw6IGZ1bmN0aW9uKCBzb3VyY2VOb2RlLCBjYW5jZWxsZWRUYXJnZXRzICl7XG4gICAgLy8gZmlyZWQgd2hlbiBlZGdlaGFuZGxlcyBhcmUgY2FuY2VsbGVkIChpbmNvbXBsZXRlIGdlc3R1cmUpXG4gIH0sXG4gIGhvdmVyb3ZlcjogZnVuY3Rpb24oIHNvdXJjZU5vZGUsIHRhcmdldE5vZGUgKXtcbiAgICAvLyBmaXJlZCB3aGVuIGEgdGFyZ2V0IGlzIGhvdmVyZWRcbiAgfSxcbiAgaG92ZXJvdXQ6IGZ1bmN0aW9uKCBzb3VyY2VOb2RlLCB0YXJnZXROb2RlICl7XG4gICAgLy8gZmlyZWQgd2hlbiBhIHRhcmdldCBpc24ndCBob3ZlcmVkIGFueW1vcmVcbiAgfSxcbiAgcHJldmlld29uOiBmdW5jdGlvbiggc291cmNlTm9kZSwgdGFyZ2V0Tm9kZSwgcHJldmlld0VsZXMgKXtcbiAgICAvLyBmaXJlZCB3aGVuIHByZXZpZXcgaXMgc2hvd25cbiAgfSxcbiAgcHJldmlld29mZjogZnVuY3Rpb24oIHNvdXJjZU5vZGUsIHRhcmdldE5vZGUsIHByZXZpZXdFbGVzICl7XG4gICAgLy8gZmlyZWQgd2hlbiBwcmV2aWV3IGlzIGhpZGRlblxuICB9LFxuICBkcmF3b246IGZ1bmN0aW9uKCl7XG4gICAgLy8gZmlyZWQgd2hlbiBkcmF3IG1vZGUgZW5hYmxlZFxuICB9LFxuICBkcmF3b2ZmOiBmdW5jdGlvbigpe1xuICAgIC8vIGZpcmVkIHdoZW4gZHJhdyBtb2RlIGRpc2FibGVkXG4gIH1cbn07XG4vKiBlc2xpbnQtZW5hYmxlICovXG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZWRnZWhhbmRsZXMvZGVmYXVsdHMuanMiLCJmdW5jdGlvbiB0b2dnbGVEcmF3TW9kZSggYm9vbCApe1xuICBsZXQgeyBjeSwgb3B0aW9ucyB9ID0gdGhpcztcblxuICB0aGlzLmRyYXdNb2RlID0gYm9vbCAhPSBudWxsID8gYm9vbCA6ICF0aGlzLmRyYXdNb2RlO1xuXG4gIGlmKCB0aGlzLmRyYXdNb2RlICl7XG4gICAgdGhpcy5wcmV2VW5ncmFiaWZ5U3RhdGUgPSBjeS5hdXRvdW5ncmFiaWZ5KCk7XG5cbiAgICBjeS5hdXRvdW5ncmFiaWZ5KCB0cnVlICk7XG5cbiAgICBpZiggIW9wdGlvbnMuaGFuZGxlSW5EcmF3TW9kZSAmJiB0aGlzLmhhbmRsZVNob3duKCkgKXtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIHRoaXMuZW1pdCgnZHJhd29uJyk7XG4gIH0gZWxzZSB7XG4gICAgY3kuYXV0b3VuZ3JhYmlmeSggdGhpcy5wcmV2VW5ncmFiaWZ5U3RhdGUgKTtcblxuICAgIHRoaXMuZW1pdCgnZHJhd29mZicpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIGVuYWJsZURyYXdNb2RlKCl7XG4gIHJldHVybiB0aGlzLnRvZ2dsZURyYXdNb2RlKCB0cnVlICk7XG59XG5cbmZ1bmN0aW9uIGRpc2FibGVEcmF3TW9kZSgpe1xuICByZXR1cm4gdGhpcy50b2dnbGVEcmF3TW9kZSggZmFsc2UgKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IHRvZ2dsZURyYXdNb2RlLCBlbmFibGVEcmF3TW9kZSwgZGlzYWJsZURyYXdNb2RlIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZWRnZWhhbmRsZXMvZHJhdy1tb2RlLmpzIiwiY29uc3QgYXNzaWduID0gcmVxdWlyZSgnLi4vYXNzaWduJyk7XG5cbmZ1bmN0aW9uIGFkZENsYXNzZXNUb0VsZUpzb24oIGpzb24sIGNsYXNzZXMgKXtcbiAgaWYoIGpzb24uY2xhc3NlcyApe1xuICAgIGpzb24uY2xhc3NlcyArPSAnICcgKyBjbGFzc2VzO1xuICB9IGVsc2Uge1xuICAgIGpzb24uY2xhc3NlcyA9IGNsYXNzZXM7XG4gIH1cblxuICByZXR1cm4ganNvbjtcbn1cblxuZnVuY3Rpb24gbWFrZUVkZ2VzKCBwcmV2aWV3ID0gZmFsc2UgKSB7XG4gIGxldCB7IGN5LCBvcHRpb25zLCBwcmVzdW1wdGl2ZVRhcmdldHMsIHByZXZpZXdFbGVzIH0gPSB0aGlzO1xuXG4gIGxldCBzb3VyY2UgPSB0aGlzLnNvdXJjZU5vZGU7XG4gIGxldCB0YXJnZXQgPSB0aGlzLnRhcmdldE5vZGU7XG4gIGxldCBjbGFzc2VzID0gcHJldmlldyA/ICdlaC1wcmV2aWV3JyA6ICcnO1xuICBsZXQgYWRkZWQgPSBjeS5jb2xsZWN0aW9uKCk7XG5cbiAgLy8gY2FuJ3QgbWFrZSBwcmV2aWV3IGlmIGRpc2FibGVkXG4gIGlmKCBwcmV2aWV3ICYmICFvcHRpb25zLnByZXZpZXcgKXsgcmV0dXJuOyB9XG5cbiAgLy8gZGV0ZWN0IGNhbmNlbFxuICBpZiggIXRhcmdldCB8fCB0YXJnZXQuc2l6ZSgpID09PSAwICl7XG4gICAgcHJldmlld0VsZXMucmVtb3ZlKCk7XG5cbiAgICB0aGlzLmVtaXQoICdjYW5jZWwnLCB0aGlzLm1wKCksIHNvdXJjZSwgcHJlc3VtcHRpdmVUYXJnZXRzICk7XG5cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBqdXN0IHJlbW92ZSBwcmV2aWV3IGNsYXNzIGlmIHdlIGFscmVhZHkgaGF2ZSB0aGUgZWRnZXNcbiAgaWYoICFwcmV2aWV3ICYmIG9wdGlvbnMucHJldmlldyApIHtcbiAgICBwcmV2aWV3RWxlcy5yZW1vdmVDbGFzcygnZWgtcHJldmlldycpO1xuXG4gICAgdGhpcy5lbWl0KCAnY29tcGxldGUnLCB0aGlzLm1wKCksIHNvdXJjZSwgdGFyZ2V0LCBwcmV2aWV3RWxlcyApO1xuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IHAxID0gc291cmNlLnBvc2l0aW9uKCk7XG4gIGxldCBwMiA9IHRhcmdldC5wb3NpdGlvbigpO1xuXG4gIGxldCBwO1xuICBpZiggc291cmNlLnNhbWUoIHRhcmdldCApICkge1xuICAgIHAgPSB7XG4gICAgICB4OiBwMS54ICsgb3B0aW9ucy5ub2RlTG9vcE9mZnNldCxcbiAgICAgIHk6IHAxLnkgKyBvcHRpb25zLm5vZGVMb29wT2Zmc2V0XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBwID0ge1xuICAgICAgeDogKCBwMS54ICsgcDIueCApIC8gMixcbiAgICAgIHk6ICggcDEueSArIHAyLnkgKSAvIDJcbiAgICB9O1xuICB9XG5cbiAgbGV0IGVkZ2VUeXBlID0gb3B0aW9ucy5lZGdlVHlwZSggc291cmNlLCB0YXJnZXQgKTtcblxuICBpZiggZWRnZVR5cGUgPT09ICdub2RlJyApe1xuICAgIGxldCBpbnRlck5vZGUgPSBjeS5hZGQoXG4gICAgICBhZGRDbGFzc2VzVG9FbGVKc29uKCBhc3NpZ24oXG4gICAgICAgIHtcbiAgICAgICAgICBncm91cDogJ25vZGVzJyxcbiAgICAgICAgICBwb3NpdGlvbjogcFxuICAgICAgICB9LFxuICAgICAgICBvcHRpb25zLm5vZGVQYXJhbXMoIHNvdXJjZSwgdGFyZ2V0IClcbiAgICAgICksIGNsYXNzZXMgKVxuICAgICk7XG5cbiAgICBsZXQgc291cmNlMmludGVyID0gY3kuYWRkKFxuICAgICAgYWRkQ2xhc3Nlc1RvRWxlSnNvbiggYXNzaWduKFxuICAgICAgICB7XG4gICAgICAgICAgZ3JvdXA6ICdlZGdlcycsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgc291cmNlOiBzb3VyY2UuaWQoKSxcbiAgICAgICAgICAgIHRhcmdldDogaW50ZXJOb2RlLmlkKClcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9wdGlvbnMuZWRnZVBhcmFtcyggc291cmNlLCB0YXJnZXQsIDAgKVxuICAgICAgKSwgY2xhc3NlcyApXG4gICAgKTtcblxuICAgIGxldCBpbnRlcjJ0YXJnZXQgPSBjeS5hZGQoXG4gICAgICBhZGRDbGFzc2VzVG9FbGVKc29uKCBhc3NpZ24oXG4gICAgICAgIHtcbiAgICAgICAgICBncm91cDogJ2VkZ2VzJyxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBzb3VyY2U6IGludGVyTm9kZS5pZCgpLFxuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQuaWQoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW9ucy5lZGdlUGFyYW1zKCBzb3VyY2UsIHRhcmdldCwgMSApXG4gICAgICApLCBjbGFzc2VzIClcbiAgICApO1xuXG4gICAgYWRkZWQgPSBhZGRlZC5tZXJnZSggaW50ZXJOb2RlICkubWVyZ2UoIHNvdXJjZTJpbnRlciApLm1lcmdlKCBpbnRlcjJ0YXJnZXQgKTtcbiAgfSBlbHNlIHsgLy8gZmxhdFxuICAgIGxldCBzb3VyY2UydGFyZ2V0ID0gY3kuYWRkKFxuICAgICAgYWRkQ2xhc3Nlc1RvRWxlSnNvbiggYXNzaWduKFxuICAgICAgICB7XG4gICAgICAgICAgZ3JvdXA6ICdlZGdlcycsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgc291cmNlOiBzb3VyY2UuaWQoKSxcbiAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0LmlkKClcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9wdGlvbnMuZWRnZVBhcmFtcyggc291cmNlLCB0YXJnZXQsIDAgKVxuICAgICAgKSwgY2xhc3NlcyApXG4gICAgKTtcblxuICAgIGFkZGVkID0gYWRkZWQubWVyZ2UoIHNvdXJjZTJ0YXJnZXQgKTtcbiAgfVxuXG4gIGlmKCBwcmV2aWV3ICkge1xuICAgIHRoaXMucHJldmlld0VsZXMgPSBhZGRlZDtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmVtaXQoICdjb21wbGV0ZScsIHRoaXMubXAoKSwgc291cmNlLCB0YXJnZXQsIGFkZGVkICk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn1cblxuZnVuY3Rpb24gbWFrZVByZXZpZXcoKSB7XG4gIHRoaXMubWFrZUVkZ2VzKCB0cnVlICk7XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIHByZXZpZXdTaG93bigpe1xuICByZXR1cm4gdGhpcy5wcmV2aWV3RWxlcy5ub25lbXB0eSgpICYmIHRoaXMucHJldmlld0VsZXMuaW5zaWRlKCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVByZXZpZXcoKSB7XG4gIGlmKCB0aGlzLnByZXZpZXdTaG93bigpICl7XG4gICAgdGhpcy5wcmV2aWV3RWxlcy5yZW1vdmUoKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVTaG93bigpe1xuICByZXR1cm4gdGhpcy5oYW5kbGVOb2RlLm5vbmVtcHR5KCkgJiYgdGhpcy5oYW5kbGVOb2RlLmluc2lkZSgpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVIYW5kbGUoKXtcbiAgdGhpcy5oYW5kbGVOb2RlLnJlbW92ZSgpO1xuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBzZXRIYW5kbGVGb3IoIG5vZGUgKXtcbiAgbGV0IHsgb3B0aW9ucywgY3kgfSA9IHRoaXM7XG5cbiAgbGV0IHAgPSBub2RlLnBvc2l0aW9uKCk7XG4gIGxldCBoID0gbm9kZS5vdXRlckhlaWdodCgpO1xuICBsZXQgdyA9IG5vZGUub3V0ZXJXaWR0aCgpO1xuXG4gIC8vIHN0b3JlIGhvdyBtdWNoIHdlIHNob3VsZCBtb3ZlIHRoZSBoYW5kbGUgZnJvbSBvcmlnaW4ocC54LCBwLnkpXG4gIGxldCBtb3ZlWCA9IDA7XG4gIGxldCBtb3ZlWSA9IDA7XG5cbiAgLy8gZ3JhYiBheGlzJ3NcbiAgbGV0IGF4ZXMgPSBvcHRpb25zLmhhbmRsZVBvc2l0aW9uLnRvTG93ZXJDYXNlKCkuc3BsaXQoJyAnKTtcbiAgbGV0IGF4aXNYID0gYXhlc1swXTtcbiAgbGV0IGF4aXNZID0gYXhlc1sxXTtcblxuICAvLyBiYXNlZCBvbiBoYW5kbGVQb3NpdGlvbiBtb3ZlIGxlZnQvcmlnaHQvdG9wL2JvdHRvbS4gTWlkZGxlL21pZGRsZSB3aWxsIGp1c3QgYmUgbm9ybWFsXG4gIGlmKCBheGlzWCA9PT0gJ2xlZnQnICl7XG4gICAgbW92ZVggPSAtKHcgLyAyKTtcbiAgfSBlbHNlIGlmKCBheGlzWCA9PT0gJ3JpZ2h0JyApe1xuICAgIG1vdmVYID0gdyAvIDI7XG4gIH0gaWYoIGF4aXNZID09PSAndG9wJyApe1xuICAgIG1vdmVZID0gLShoIC8gMik7XG4gIH0gZWxzZSBpZiggYXhpc1kgPT09ICdib3R0b20nICl7XG4gICAgbW92ZVkgPSBoIC8gMjtcbiAgfVxuXG4gIC8vIHNldCBoYW5kbGUgeCBhbmQgeSBiYXNlZCBvbiBhZGp1c3RlZCBwb3NpdGlvbnNcbiAgbGV0IGh4ID0gdGhpcy5oeCA9IHAueCArIG1vdmVYO1xuICBsZXQgaHkgPSB0aGlzLmh5ID0gcC55ICsgbW92ZVk7XG4gIGxldCBwb3MgPSB7IHg6IGh4LCB5OiBoeSB9O1xuXG4gIGlmKCB0aGlzLmhhbmRsZVNob3duKCkgKXtcbiAgICB0aGlzLmhhbmRsZU5vZGUucG9zaXRpb24oIHBvcyApO1xuICB9IGVsc2Uge1xuICAgIGN5LmJhdGNoKCAoKSA9PiB7XG4gICAgICB0aGlzLmhhbmRsZU5vZGUgPSBjeS5hZGQoe1xuICAgICAgICBjbGFzc2VzOiAnZWgtaGFuZGxlJyxcbiAgICAgICAgcG9zaXRpb246IHBvcyxcbiAgICAgICAgZ3JhYmJhYmxlOiBmYWxzZVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuaGFuZGxlTm9kZS5zdHlsZSgnei1pbmRleCcsIDkwMDcxOTkyNTQ3NDA5OTEpO1xuICAgIH0gKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVFZGdlKCkge1xuICBsZXQgeyBzb3VyY2VOb2RlLCBnaG9zdE5vZGUsIGN5LCBteCwgbXkgfSA9IHRoaXM7XG4gIGxldCB4ID0gbXg7XG4gIGxldCB5ID0gbXk7XG4gIGxldCBnaG9zdEVkZ2UsIGdob3N0RWxlcztcblxuICAvLyBjYW4ndCBkcmF3IGEgbGluZSB3aXRob3V0IGhhdmluZyB0aGUgc3RhcnRpbmcgbm9kZVxuICBpZiggIXNvdXJjZU5vZGUgKXsgcmV0dXJuOyB9XG5cbiAgaWYoICFnaG9zdE5vZGUgfHwgZ2hvc3ROb2RlLmxlbmd0aCA9PT0gMCB8fCBnaG9zdE5vZGUucmVtb3ZlZCgpICkge1xuICAgIGdob3N0RWxlcyA9IHRoaXMuZ2hvc3RFbGVzID0gY3kuY29sbGVjdGlvbigpO1xuXG4gICAgY3kuYmF0Y2goICgpID0+IHtcbiAgICAgIGdob3N0Tm9kZSA9IHRoaXMuZ2hvc3ROb2RlID0gY3kuYWRkKCB7XG4gICAgICAgIGdyb3VwOiAnbm9kZXMnLFxuICAgICAgICBjbGFzc2VzOiAnZWgtZ2hvc3QgZWgtZ2hvc3Qtbm9kZScsXG4gICAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgICAgeDogMCxcbiAgICAgICAgICB5OiAwXG4gICAgICAgIH1cbiAgICAgIH0gKTtcblxuICAgICAgZ2hvc3ROb2RlLnN0eWxlKHtcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAnYmx1ZScsXG4gICAgICAgICd3aWR0aCc6IDAuMDAwMSxcbiAgICAgICAgJ2hlaWdodCc6IDAuMDAwMSxcbiAgICAgICAgJ29wYWNpdHknOiAwLFxuICAgICAgICAnZXZlbnRzJzogJ25vJ1xuICAgICAgfSk7XG5cbiAgICAgIGdob3N0RWRnZSA9IGN5LmFkZCgge1xuICAgICAgICBncm91cDogJ2VkZ2VzJyxcbiAgICAgICAgY2xhc3NlczogJ2VoLWdob3N0IGVoLWdob3N0LWVkZ2UnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgc291cmNlOiBzb3VyY2VOb2RlLmlkKCksXG4gICAgICAgICAgdGFyZ2V0OiBnaG9zdE5vZGUuaWQoKVxuICAgICAgICB9XG4gICAgICB9ICk7XG5cbiAgICAgIGdob3N0RWRnZS5zdHlsZSh7XG4gICAgICAgICdldmVudHMnOiAnbm8nXG4gICAgICB9KTtcbiAgICB9ICk7XG5cbiAgICBnaG9zdEVsZXMubWVyZ2UoIGdob3N0Tm9kZSApLm1lcmdlKCBnaG9zdEVkZ2UgKTtcbiAgfVxuXG4gIGdob3N0Tm9kZS5wb3NpdGlvbih7IHgsIHkgfSk7XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtYWtlRWRnZXMsIG1ha2VQcmV2aWV3LCByZW1vdmVQcmV2aWV3LCBwcmV2aWV3U2hvd24sXG4gIHVwZGF0ZUVkZ2UsXG4gIGhhbmRsZVNob3duLCBzZXRIYW5kbGVGb3IsIHJlbW92ZUhhbmRsZVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lZGdlaGFuZGxlcy9kcmF3aW5nLmpzIiwiZnVuY3Rpb24gZW5hYmxlKCl7XG4gIHRoaXMuZW5hYmxlZCA9IHRydWU7XG5cbiAgdGhpcy5lbWl0KCdlbmFibGUnKTtcblxuICByZXR1cm4gdGhpcztcbn1cblxuZnVuY3Rpb24gZGlzYWJsZSgpe1xuICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcblxuICB0aGlzLmVtaXQoJ2Rpc2FibGUnKTtcblxuICByZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IGVuYWJsZSwgZGlzYWJsZSB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VkZ2VoYW5kbGVzL2VuYWJsaW5nLmpzIiwiZnVuY3Rpb24gY2FuU3RhcnRPbiggbm9kZSApe1xuICBjb25zdCB7IG9wdGlvbnMsIHByZXZpZXdFbGVzLCBnaG9zdEVsZXMsIGhhbmRsZU5vZGUgfSA9IHRoaXM7XG4gIGNvbnN0IGlzUHJldmlldyA9IGVsID0+IHByZXZpZXdFbGVzLmFueVNhbWUoZWwpO1xuICBjb25zdCBpc0dob3N0ID0gZWwgPT4gZ2hvc3RFbGVzLmFueVNhbWUoZWwpO1xuICBjb25zdCB1c2VyRmlsdGVyID0gZWwgPT4gZWwuZmlsdGVyKCBvcHRpb25zLmhhbmRsZU5vZGVzICkubGVuZ3RoID4gMDtcbiAgY29uc3QgaXNIYW5kbGUgPSBlbCA9PiBoYW5kbGVOb2RlLnNhbWUoZWwpO1xuICBjb25zdCBpc1RlbXAgPSBlbCA9PiBpc1ByZXZpZXcoZWwpIHx8IGlzSGFuZGxlKGVsKSB8fCBpc0dob3N0KGVsKTtcblxuICBjb25zdCB7IGVuYWJsZWQsIGFjdGl2ZSwgZ3JhYmJpbmdOb2RlIH0gPSB0aGlzO1xuXG4gIHJldHVybiAoXG4gICAgZW5hYmxlZCAmJiAhYWN0aXZlICYmICFncmFiYmluZ05vZGVcbiAgICAmJiAoIG5vZGUgPT0gbnVsbCB8fCAoIWlzVGVtcChub2RlKSAmJiB1c2VyRmlsdGVyKG5vZGUpKSApXG4gICk7XG59XG5cbmZ1bmN0aW9uIGNhblN0YXJ0RHJhd01vZGVPbiggbm9kZSApe1xuICByZXR1cm4gdGhpcy5jYW5TdGFydE9uKCBub2RlICkgJiYgdGhpcy5kcmF3TW9kZTtcbn1cblxuZnVuY3Rpb24gY2FuU3RhcnROb25EcmF3TW9kZU9uKCBub2RlICl7XG4gIHJldHVybiB0aGlzLmNhblN0YXJ0T24oIG5vZGUgKSAmJiAhdGhpcy5kcmF3TW9kZTtcbn1cblxuZnVuY3Rpb24gc2hvdyggbm9kZSApe1xuICBsZXQgeyBvcHRpb25zLCBkcmF3TW9kZSB9ID0gdGhpcztcblxuICBpZiggIXRoaXMuY2FuU3RhcnRPbihub2RlKSB8fCAoIGRyYXdNb2RlICYmICFvcHRpb25zLmhhbmRsZUluRHJhd01vZGUgKSApeyByZXR1cm47IH1cblxuICB0aGlzLnNvdXJjZU5vZGUgPSBub2RlO1xuXG4gIHRoaXMuc2V0SGFuZGxlRm9yKCBub2RlICk7XG5cbiAgdGhpcy5lbWl0KCAnc2hvdycsIHRoaXMuaHAoKSwgdGhpcy5zb3VyY2VOb2RlICk7XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIGhpZGUoKXtcbiAgbGV0IHsgY3kgfSA9IHRoaXM7XG5cbiAgdGhpcy5yZW1vdmVIYW5kbGUoKTtcblxuICB0aGlzLnNvdXJjZU5vZGUgPSBjeS5jb2xsZWN0aW9uKCk7XG5cbiAgdGhpcy5lbWl0KCAnaGlkZScsIHRoaXMuaHAoKSwgdGhpcy5zb3VyY2VOb2RlICk7XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0KCBub2RlICl7XG4gIGlmKCAhdGhpcy5jYW5TdGFydE9uKG5vZGUpICl7IHJldHVybjsgfVxuXG4gIHRoaXMuYWN0aXZlID0gdHJ1ZTtcblxuICB0aGlzLnNvdXJjZU5vZGUgPSBub2RlO1xuICB0aGlzLnNvdXJjZU5vZGUuYWRkQ2xhc3MoJ2VoLXNvdXJjZScpO1xuXG4gIHRoaXMuZGlzYWJsZUdlc3R1cmVzKCk7XG5cbiAgdGhpcy5lbWl0KCAnc3RhcnQnLCB0aGlzLmhwKCksIG5vZGUgKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlKCBwb3MgKXtcbiAgaWYoICF0aGlzLmFjdGl2ZSApeyByZXR1cm47IH1cblxuICBsZXQgcCA9IHBvcztcblxuICB0aGlzLm14ID0gcC54O1xuICB0aGlzLm15ID0gcC55O1xuXG4gIHRoaXMudXBkYXRlRWRnZSgpO1xuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBwcmV2aWV3KCB0YXJnZXQgKSB7XG4gIGlmKCAhdGhpcy5hY3RpdmUgfHwgdGFyZ2V0LnNhbWUoIHRoaXMuaGFuZGxlTm9kZSApICl7IHJldHVybjsgfVxuXG4gIGxldCB7IG9wdGlvbnMsIHNvdXJjZU5vZGUsIGdob3N0Tm9kZSwgcHJlc3VtcHRpdmVUYXJnZXRzLCBwcmV2aWV3RWxlcyB9ID0gdGhpcztcbiAgbGV0IHNvdXJjZSA9IHNvdXJjZU5vZGU7XG5cbiAgY2xlYXJUaW1lb3V0KCB0aGlzLnByZXZpZXdUaW1lb3V0ICk7XG5cbiAgdGhpcy5wcmV2aWV3VGltZW91dCA9IHNldFRpbWVvdXQoICgpID0+IHtcbiAgICBsZXQgaXNMb29wID0gdGFyZ2V0LnNhbWUoIHNvdXJjZSApO1xuICAgIGxldCBsb29wQWxsb3dlZCA9IG9wdGlvbnMubG9vcEFsbG93ZWQoIHRhcmdldCApO1xuICAgIGxldCBpc0dob3N0ID0gdGFyZ2V0LnNhbWUoIGdob3N0Tm9kZSApO1xuICAgIGxldCBub0VkZ2UgPSBvcHRpb25zLmVkZ2VUeXBlKCBzb3VyY2UsIHRhcmdldCApID09IG51bGw7XG5cbiAgICB0aGlzLnRhcmdldE5vZGUgPSB0YXJnZXQ7XG4gICAgcHJlc3VtcHRpdmVUYXJnZXRzLm1lcmdlKCB0YXJnZXQgKTtcblxuICAgIHRhcmdldC5hZGRDbGFzcygnZWgtcHJlc3VtcHRpdmUtdGFyZ2V0Jyk7XG5cbiAgICBpZiggaXNHaG9zdCB8fCBub0VkZ2UgKSB7IHJldHVybjsgfVxuXG4gICAgaWYoICFpc0xvb3AgfHwgKCBpc0xvb3AgJiYgbG9vcEFsbG93ZWQgKSApIHtcbiAgICAgIHRhcmdldC5hZGRDbGFzcygnZWgtdGFyZ2V0Jyk7XG5cbiAgICAgIHRoaXMuZW1pdCggJ2hvdmVyb3ZlcicsIHRoaXMubXAoKSwgc291cmNlLCB0YXJnZXQgKTtcblxuICAgICAgaWYoIG9wdGlvbnMucHJldmlldyApe1xuICAgICAgICB0YXJnZXQuYWRkQ2xhc3MoJ2VoLXByZXZpZXcnKTtcblxuICAgICAgICB0aGlzLm1ha2VQcmV2aWV3KCk7XG5cbiAgICAgICAgdGhpcy5lbWl0KCAncHJldmlld29uJywgdGhpcy5tcCgpLCBzb3VyY2UsIHRhcmdldCwgcHJldmlld0VsZXMgKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIG9wdGlvbnMuaG92ZXJEZWxheSApO1xuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiB1bnByZXZpZXcoIHRhcmdldCApIHtcbiAgaWYoICF0aGlzLmFjdGl2ZSB8fCB0YXJnZXQuc2FtZSggdGhpcy5oYW5kbGVOb2RlICkgKXsgcmV0dXJuOyB9XG5cbiAgbGV0IHsgcHJldmlld1RpbWVvdXQsIHNvdXJjZU5vZGUsIHByZXZpZXdFbGVzIH0gPSB0aGlzO1xuICBjbGVhclRpbWVvdXQoIHByZXZpZXdUaW1lb3V0ICk7XG4gIHRoaXMucHJldmlld1RpbWVvdXQgPSBudWxsO1xuXG4gIGxldCBzb3VyY2UgPSBzb3VyY2VOb2RlO1xuXG4gIHRhcmdldC5yZW1vdmVDbGFzcygnZWgtcHJldmlldyBlaC10YXJnZXQgZWgtcHJlc3VtcHRpdmUtdGFyZ2V0Jyk7XG5cbiAgdGhpcy5yZW1vdmVQcmV2aWV3KCBzb3VyY2UsIHRhcmdldCApO1xuXG4gIHRoaXMuZW1pdCggJ2hvdmVyb3V0JywgdGhpcy5tcCgpLCBzb3VyY2UsIHRhcmdldCApO1xuICB0aGlzLmVtaXQoICdwcmV2aWV3b2ZmJywgdGhpcy5tcCgpLCBzb3VyY2UsIHRhcmdldCwgcHJldmlld0VsZXMgKTtcblxuICByZXR1cm4gdGhpcztcbn1cblxuZnVuY3Rpb24gc3RvcCgpe1xuICBpZiggIXRoaXMuYWN0aXZlICl7IHJldHVybjsgfVxuXG4gIGxldCB7IHNvdXJjZU5vZGUsIHRhcmdldE5vZGUsIGhhbmRsZU5vZGUsIGdob3N0RWxlcywgcHJlc3VtcHRpdmVUYXJnZXRzIH0gPSB0aGlzO1xuXG4gIHRoaXMuYWN0aXZlID0gZmFsc2U7XG5cbiAgdGhpcy5tYWtlRWRnZXMoKTtcblxuICBzb3VyY2VOb2RlLnJlbW92ZUNsYXNzKCdlaC1zb3VyY2UnKTtcbiAgdGFyZ2V0Tm9kZS5yZW1vdmVDbGFzcygnZWgtdGFyZ2V0IGVoLXByZXZpZXcgZWgtaG92ZXInKTtcbiAgcHJlc3VtcHRpdmVUYXJnZXRzLnJlbW92ZUNsYXNzKCdlaC1wcmVzdW1wdGl2ZS10YXJnZXQnKTtcblxuICBoYW5kbGVOb2RlLnJlbW92ZSgpO1xuICBnaG9zdEVsZXMucmVtb3ZlKCk7XG5cbiAgdGhpcy5jbGVhckNvbGxlY3Rpb25zKCk7XG5cbiAgdGhpcy5yZXNldEdlc3R1cmVzKCk7XG5cbiAgdGhpcy5lbWl0KCAnc3RvcCcsIHRoaXMubXAoKSwgc291cmNlTm9kZSApO1xuXG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2hvdywgaGlkZSwgc3RhcnQsIHVwZGF0ZSwgcHJldmlldywgdW5wcmV2aWV3LCBzdG9wLFxuICBjYW5TdGFydE9uLCBjYW5TdGFydERyYXdNb2RlT24sIGNhblN0YXJ0Tm9uRHJhd01vZGVPblxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lZGdlaGFuZGxlcy9nZXN0dXJlLWxpZmVjeWNsZS5qcyIsImNvbnN0IGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuY29uc3QgYXNzaWduID0gcmVxdWlyZSgnLi4vYXNzaWduJyk7XG5cbmNvbnN0IGN5R2VzdHVyZXNUb2dnbGUgPSByZXF1aXJlKCcuL2N5LWdlc3R1cmVzLXRvZ2dsZScpO1xuY29uc3QgY3lMaXN0ZW5lcnMgPSByZXF1aXJlKCcuL2N5LWxpc3RlbmVycycpO1xuY29uc3QgZHJhd01vZGUgPSByZXF1aXJlKCcuL2RyYXctbW9kZScpO1xuY29uc3QgZHJhd2luZyA9IHJlcXVpcmUoJy4vZHJhd2luZycpO1xuY29uc3QgZW5hYmxpbmcgPSByZXF1aXJlKCcuL2VuYWJsaW5nJyk7XG5jb25zdCBnZXN0dXJlTGlmZWN5Y2xlID0gcmVxdWlyZSgnLi9nZXN0dXJlLWxpZmVjeWNsZScpO1xuY29uc3QgbGlzdGVuZXJzID0gcmVxdWlyZSgnLi9saXN0ZW5lcnMnKTtcblxuZnVuY3Rpb24gRWRnZWhhbmRsZXMoIG9wdGlvbnMgKXtcbiAgbGV0IGN5ID0gb3B0aW9ucy5jeTtcblxuICB0aGlzLmN5ID0gY3k7XG4gIHRoaXMubGlzdGVuZXJzID0gW107XG5cbiAgLy8gZWRnZWhhbmRsZXMgZ2VzdHVyZSBzdGF0ZVxuICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuICB0aGlzLmRyYXdNb2RlID0gZmFsc2U7XG4gIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gIHRoaXMuZ3JhYmJpbmdOb2RlID0gZmFsc2U7XG5cbiAgLy8gZWRnZWhhbmRsZXMgZWxlbWVudHNcbiAgdGhpcy5oYW5kbGVOb2RlID0gY3kuY29sbGVjdGlvbigpO1xuICB0aGlzLmNsZWFyQ29sbGVjdGlvbnMoKTtcblxuICAvLyBoYW5kbGVcbiAgdGhpcy5oeCA9IDA7XG4gIHRoaXMuaHkgPSAwO1xuICB0aGlzLmhyID0gMDtcblxuICAvLyBtb3VzZSBwb3NpdGlvblxuICB0aGlzLm14ID0gMDtcbiAgdGhpcy5teSA9IDA7XG5cbiAgdGhpcy5vcHRpb25zID0gYXNzaWduKCB7fSwgZGVmYXVsdHMsIG9wdGlvbnMgKTtcblxuICB0aGlzLnNhdmVHZXN0dXJlU3RhdGUoKTtcbiAgdGhpcy5hZGRMaXN0ZW5lcnMoKTtcbn1cblxubGV0IHByb3RvID0gRWRnZWhhbmRsZXMucHJvdG90eXBlID0ge307XG5sZXQgZXh0ZW5kID0gb2JqID0+IGFzc2lnbiggcHJvdG8sIG9iaiApO1xuXG5wcm90by5kZXN0cm95ID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5yZW1vdmVMaXN0ZW5lcnMoKTtcbn07XG5cbnByb3RvLnNldE9wdGlvbnMgPSBmdW5jdGlvbiggb3B0aW9ucyApe1xuICBhc3NpZ24oIHRoaXMub3B0aW9ucywgb3B0aW9ucyApO1xufTtcblxucHJvdG8ubXAgPSBmdW5jdGlvbigpe1xuICByZXR1cm4geyB4OiB0aGlzLm14LCB5OiB0aGlzLm15IH07XG59O1xuXG5wcm90by5ocCA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB7IHg6IHRoaXMuaHgsIHk6IHRoaXMuaHkgfTtcbn07XG5cbnByb3RvLmNsZWFyQ29sbGVjdGlvbnMgPSBmdW5jdGlvbigpe1xuICBsZXQgeyBjeSB9ID0gdGhpcztcblxuICB0aGlzLnByZXZpZXdFbGVzID0gY3kuY29sbGVjdGlvbigpO1xuICB0aGlzLmdob3N0RWxlcyA9IGN5LmNvbGxlY3Rpb24oKTtcbiAgdGhpcy5naG9zdE5vZGUgPSBjeS5jb2xsZWN0aW9uKCk7XG4gIHRoaXMuc291cmNlTm9kZSA9IGN5LmNvbGxlY3Rpb24oKTtcbiAgdGhpcy50YXJnZXROb2RlID0gY3kuY29sbGVjdGlvbigpO1xuICB0aGlzLnByZXN1bXB0aXZlVGFyZ2V0cyA9IGN5LmNvbGxlY3Rpb24oKTtcbn07XG5cbltcbiAgY3lHZXN0dXJlc1RvZ2dsZSxcbiAgY3lMaXN0ZW5lcnMsXG4gIGRyYXdNb2RlLFxuICBkcmF3aW5nLFxuICBlbmFibGluZyxcbiAgZ2VzdHVyZUxpZmVjeWNsZSxcbiAgbGlzdGVuZXJzXG5dLmZvckVhY2goIGV4dGVuZCApO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVkZ2VoYW5kbGVzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VkZ2VoYW5kbGVzL2luZGV4LmpzIiwiZnVuY3Rpb24gYWRkTGlzdGVuZXJzKCl7XG4gIHRoaXMuYWRkQ3l0b3NjYXBlTGlzdGVuZXJzKCk7XG5cbiAgdGhpcy5hZGRMaXN0ZW5lciggdGhpcy5jeSwgJ2Rlc3Ryb3knLCAoKSA9PiB0aGlzLmRlc3Ryb3koKSApO1xuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiByZW1vdmVMaXN0ZW5lcnMoKXtcbiAgZm9yKCBsZXQgaSA9IHRoaXMubGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tICl7XG4gICAgbGV0IGwgPSB0aGlzLmxpc3RlbmVyc1tpXTtcblxuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoIGwudGFyZ2V0LCBsLmV2ZW50LCBsLnNlbGVjdG9yLCBsLmNhbGxiYWNrLCBsLm9wdGlvbnMgKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBnZXRMaXN0ZW5lciggdGFyZ2V0LCBldmVudCwgc2VsZWN0b3IsIGNhbGxiYWNrLCBvcHRpb25zICl7XG4gIGlmKCB0eXBlb2Ygc2VsZWN0b3IgIT09IHR5cGVvZiAnJyApe1xuICAgIGNhbGxiYWNrID0gc2VsZWN0b3I7XG4gICAgb3B0aW9ucyA9IGNhbGxiYWNrO1xuICAgIHNlbGVjdG9yID0gbnVsbDtcbiAgfVxuXG4gIGlmKCBvcHRpb25zID09IG51bGwgKXtcbiAgICBvcHRpb25zID0gZmFsc2U7XG4gIH1cblxuICByZXR1cm4geyB0YXJnZXQsIGV2ZW50LCBzZWxlY3RvciwgY2FsbGJhY2ssIG9wdGlvbnMgfTtcbn1cblxuZnVuY3Rpb24gaXNEb20oIHRhcmdldCApe1xuICByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gYWRkTGlzdGVuZXIoIHRhcmdldCwgZXZlbnQsIHNlbGVjdG9yLCBjYWxsYmFjaywgb3B0aW9ucyApe1xuICBsZXQgbCA9IGdldExpc3RlbmVyKCB0YXJnZXQsIGV2ZW50LCBzZWxlY3RvciwgY2FsbGJhY2ssIG9wdGlvbnMgKTtcblxuICB0aGlzLmxpc3RlbmVycy5wdXNoKCBsICk7XG5cbiAgaWYoIGlzRG9tKCBsLnRhcmdldCApICl7XG4gICAgbC50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lciggbC5ldmVudCwgbC5jYWxsYmFjaywgbC5vcHRpb25zICk7XG4gIH0gZWxzZSB7XG4gICAgaWYoIGwuc2VsZWN0b3IgKXtcbiAgICAgIGwudGFyZ2V0LmFkZExpc3RlbmVyKCBsLmV2ZW50LCBsLnNlbGVjdG9yLCBsLmNhbGxiYWNrLCBsLm9wdGlvbnMgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbC50YXJnZXQuYWRkTGlzdGVuZXIoIGwuZXZlbnQsIGwuY2FsbGJhY2ssIGwub3B0aW9ucyApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiByZW1vdmVMaXN0ZW5lciggdGFyZ2V0LCBldmVudCwgc2VsZWN0b3IsIGNhbGxiYWNrLCBvcHRpb25zICl7XG4gIGxldCBsID0gZ2V0TGlzdGVuZXIoIHRhcmdldCwgZXZlbnQsIHNlbGVjdG9yLCBjYWxsYmFjaywgb3B0aW9ucyApO1xuXG4gIGZvciggbGV0IGkgPSB0aGlzLmxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSApe1xuICAgIGxldCBsMiA9IHRoaXMubGlzdGVuZXJzW2ldO1xuXG4gICAgaWYoXG4gICAgICBsLnRhcmdldCA9PT0gbDIudGFyZ2V0XG4gICAgICAmJiBsLmV2ZW50ID09PSBsMi5ldmVudFxuICAgICAgJiYgKCBsLnNlbGVjdG9yID09IG51bGwgfHwgbC5zZWxlY3RvciA9PT0gbDIuc2VsZWN0b3IgKVxuICAgICAgJiYgKCBsLmNhbGxiYWNrID09IG51bGwgfHwgbC5jYWxsYmFjayA9PT0gbDIuY2FsbGJhY2sgKVxuICAgICl7XG4gICAgICB0aGlzLmxpc3RlbmVycy5zcGxpY2UoIGksIDEgKTtcblxuICAgICAgaWYoIGlzRG9tKCBsLnRhcmdldCApICl7XG4gICAgICAgIGwudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoIGwuZXZlbnQsIGwuY2FsbGJhY2ssIGwub3B0aW9ucyApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYoIGwuc2VsZWN0b3IgKXtcbiAgICAgICAgICBsLnRhcmdldC5yZW1vdmVMaXN0ZW5lciggbC5ldmVudCwgbC5zZWxlY3RvciwgbC5jYWxsYmFjaywgbC5vcHRpb25zICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbC50YXJnZXQucmVtb3ZlTGlzdGVuZXIoIGwuZXZlbnQsIGwuY2FsbGJhY2ssIGwub3B0aW9ucyApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBlbWl0KCB0eXBlLCBwb3NpdGlvbiwgLi4uYXJncyApe1xuICBsZXQgeyBvcHRpb25zLCBjeSB9ID0gdGhpcztcblxuICBjeS5lbWl0KCB7IHR5cGU6IGBlaCR7dHlwZX1gLCBwb3NpdGlvbiB9LCBhcmdzICk7XG5cbiAgb3B0aW9uc1sgdHlwZSBdKCAuLi5hcmdzICk7XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBhZGRMaXN0ZW5lciwgYWRkTGlzdGVuZXJzLCByZW1vdmVMaXN0ZW5lciwgcmVtb3ZlTGlzdGVuZXJzLCBlbWl0IH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZWRnZWhhbmRsZXMvbGlzdGVuZXJzLmpzIiwiY29uc3QgaW1wbCA9IHJlcXVpcmUoJy4vY29yZScpO1xuXG4vLyByZWdpc3RlcnMgdGhlIGV4dGVuc2lvbiBvbiBhIGN5dG9zY2FwZSBsaWIgcmVmXG5sZXQgcmVnaXN0ZXIgPSBmdW5jdGlvbiggY3l0b3NjYXBlICl7XG4gIGlmKCAhY3l0b3NjYXBlICl7IHJldHVybjsgfSAvLyBjYW4ndCByZWdpc3RlciBpZiBjeXRvc2NhcGUgdW5zcGVjaWZpZWRcblxuICBjeXRvc2NhcGUoICdjb3JlJywgJ2VkZ2VoYW5kbGVzJywgaW1wbCApOyAvLyByZWdpc3RlciB3aXRoIGN5dG9zY2FwZS5qc1xufTtcblxuaWYoIHR5cGVvZiBjeXRvc2NhcGUgIT09ICd1bmRlZmluZWQnICl7IC8vIGV4cG9zZSB0byBnbG9iYWwgY3l0b3NjYXBlIChpLmUuIHdpbmRvdy5jeXRvc2NhcGUpXG4gIHJlZ2lzdGVyKCBjeXRvc2NhcGUgKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlZ2lzdGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==