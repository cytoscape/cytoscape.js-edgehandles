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

    this.emit('cancel', this.mp(), [source, presumptiveTargets, cy.collection()]);

    return;
  }

  // just remove preview class if we already have the edges
  if (!preview && options.preview) {
    previewEles.removeClass('eh-preview');

    this.emit('complete', this.mp(), [source, target, previewEles]);

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
    this.emit('complete', this.mp(), [source, target, added]);
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
    this.handleNode = cy.add({
      classes: 'eh-handle',
      position: pos,
      grabbable: false,
      style: {
        'z-index': 9007199254740991
      }
    });
  }

  return this;
}

function updateEdge() {
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

    ghostNode = this.ghostNode = cy.add({
      group: 'nodes',
      classes: 'eh-ghost eh-ghost-node',
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
    });

    ghostEdge = cy.add({
      group: 'edges',
      classes: 'eh-ghost eh-ghost-edge',
      data: {
        source: sourceNode.id(),
        target: ghostNode.id()
      },
      css: {
        'events': 'no'
      }
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

  this.emit('show', this.hp());

  return this;
}

function hide() {
  var cy = this.cy;


  this.removeHandle();

  this.sourceNode = cy.collection();

  this.emit('hide', this.hp());

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

  this.emit('start', this.hp());
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

      _this.emit('hoverover', _this.mp(), [source, target]);

      if (options.preview) {
        target.addClass('eh-preview');

        _this.makePreview();

        _this.emit('previewon', _this.mp(), [source, target, previewEles]);
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

  this.emit('hoverout', this.mp(), [source, target]);
  this.emit('previewoff', this.mp(), [source, target, previewEles]);

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

  this.emit('stop', this.mp(), [sourceNode, targetNode]);

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

  cy.emit({ type: type, position: position }, args);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBlOTAxY2Q5Mzk3MDUyMDBlZTZmMSIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzaWduLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9lZGdlaGFuZGxlcy9jeS1nZXN0dXJlcy10b2dnbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VkZ2VoYW5kbGVzL2N5LWxpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWRnZWhhbmRsZXMvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VkZ2VoYW5kbGVzL2RyYXctbW9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWRnZWhhbmRsZXMvZHJhd2luZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWRnZWhhbmRsZXMvZW5hYmxpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VkZ2VoYW5kbGVzL2dlc3R1cmUtbGlmZWN5Y2xlLmpzIiwid2VicGFjazovLy8uL3NyYy9lZGdlaGFuZGxlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWRnZWhhbmRsZXMvbGlzdGVuZXJzLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiT2JqZWN0IiwiYXNzaWduIiwiYmluZCIsInRndCIsInNyY3MiLCJmb3JFYWNoIiwia2V5cyIsInNyYyIsImsiLCJFZGdlaGFuZGxlcyIsInJlcXVpcmUiLCJvcHRpb25zIiwiY3kiLCJkaXNhYmxlR2VzdHVyZXMiLCJzYXZlR2VzdHVyZVN0YXRlIiwiem9vbWluZ0VuYWJsZWQiLCJwYW5uaW5nRW5hYmxlZCIsImJveFNlbGVjdGlvbkVuYWJsZWQiLCJyZXNldEdlc3R1cmVzIiwibGFzdFpvb21pbmdFbmFibGVkIiwibGFzdFBhbm5pbmdFbmFibGVkIiwibGFzdEJveFNlbGVjdGlvbkVuYWJsZWQiLCJhZGRDeXRvc2NhcGVMaXN0ZW5lcnMiLCJhZGRMaXN0ZW5lciIsImdyYWJiaW5nTm9kZSIsInNob3ciLCJlIiwidGFyZ2V0Iiwibm9kZSIsInNhbWUiLCJoYW5kbGVOb2RlIiwiaGlkZSIsInNvdXJjZU5vZGUiLCJzdGFydCIsImRyYXdNb2RlIiwidXBkYXRlIiwicG9zaXRpb24iLCJwcmV2aWV3IiwidW5wcmV2aWV3Iiwic3RvcCIsImRlZmF1bHRzIiwiaG92ZXJEZWxheSIsImhhbmRsZU5vZGVzIiwiaGFuZGxlUG9zaXRpb24iLCJoYW5kbGVJbkRyYXdNb2RlIiwiZWRnZVR5cGUiLCJ0YXJnZXROb2RlIiwibG9vcEFsbG93ZWQiLCJub2RlTG9vcE9mZnNldCIsIm5vZGVQYXJhbXMiLCJlZGdlUGFyYW1zIiwiaSIsImNvbXBsZXRlIiwiYWRkZWRFbGVzIiwiY2FuY2VsIiwiY2FuY2VsbGVkVGFyZ2V0cyIsImhvdmVyb3ZlciIsImhvdmVyb3V0IiwicHJldmlld29uIiwicHJldmlld0VsZXMiLCJwcmV2aWV3b2ZmIiwiZHJhd29uIiwiZHJhd29mZiIsInRvZ2dsZURyYXdNb2RlIiwiYm9vbCIsInByZXZVbmdyYWJpZnlTdGF0ZSIsImF1dG91bmdyYWJpZnkiLCJoYW5kbGVTaG93biIsImVtaXQiLCJlbmFibGVEcmF3TW9kZSIsImRpc2FibGVEcmF3TW9kZSIsImFkZENsYXNzZXNUb0VsZUpzb24iLCJqc29uIiwiY2xhc3NlcyIsIm1ha2VFZGdlcyIsInByZXN1bXB0aXZlVGFyZ2V0cyIsInNvdXJjZSIsImFkZGVkIiwiY29sbGVjdGlvbiIsInNpemUiLCJyZW1vdmUiLCJtcCIsInJlbW92ZUNsYXNzIiwicDEiLCJwMiIsInAiLCJ4IiwieSIsImludGVyTm9kZSIsImFkZCIsImdyb3VwIiwic291cmNlMmludGVyIiwiZGF0YSIsImlkIiwiaW50ZXIydGFyZ2V0IiwibWVyZ2UiLCJzb3VyY2UydGFyZ2V0IiwibWFrZVByZXZpZXciLCJwcmV2aWV3U2hvd24iLCJub25lbXB0eSIsImluc2lkZSIsInJlbW92ZVByZXZpZXciLCJyZW1vdmVIYW5kbGUiLCJzZXRIYW5kbGVGb3IiLCJoIiwib3V0ZXJIZWlnaHQiLCJ3Iiwib3V0ZXJXaWR0aCIsIm1vdmVYIiwibW92ZVkiLCJheGVzIiwidG9Mb3dlckNhc2UiLCJzcGxpdCIsImF4aXNYIiwiYXhpc1kiLCJoeCIsImh5IiwicG9zIiwiZ3JhYmJhYmxlIiwic3R5bGUiLCJ1cGRhdGVFZGdlIiwiZ2hvc3ROb2RlIiwibXgiLCJteSIsImdob3N0RWRnZSIsImdob3N0RWxlcyIsImxlbmd0aCIsInJlbW92ZWQiLCJjc3MiLCJlbmFibGUiLCJlbmFibGVkIiwiZGlzYWJsZSIsImNhblN0YXJ0T24iLCJpc1ByZXZpZXciLCJhbnlTYW1lIiwiZWwiLCJpc0dob3N0IiwidXNlckZpbHRlciIsImZpbHRlciIsImlzSGFuZGxlIiwiaXNUZW1wIiwiYWN0aXZlIiwiY2FuU3RhcnREcmF3TW9kZU9uIiwiY2FuU3RhcnROb25EcmF3TW9kZU9uIiwiaHAiLCJhZGRDbGFzcyIsImNsZWFyVGltZW91dCIsInByZXZpZXdUaW1lb3V0Iiwic2V0VGltZW91dCIsImlzTG9vcCIsIm5vRWRnZSIsImNsZWFyQ29sbGVjdGlvbnMiLCJjeUdlc3R1cmVzVG9nZ2xlIiwiY3lMaXN0ZW5lcnMiLCJkcmF3aW5nIiwiZW5hYmxpbmciLCJnZXN0dXJlTGlmZWN5Y2xlIiwibGlzdGVuZXJzIiwiaHIiLCJhZGRMaXN0ZW5lcnMiLCJwcm90byIsInByb3RvdHlwZSIsImV4dGVuZCIsIm9iaiIsImRlc3Ryb3kiLCJyZW1vdmVMaXN0ZW5lcnMiLCJzZXRPcHRpb25zIiwibCIsInJlbW92ZUxpc3RlbmVyIiwiZXZlbnQiLCJzZWxlY3RvciIsImNhbGxiYWNrIiwiZ2V0TGlzdGVuZXIiLCJpc0RvbSIsIkVsZW1lbnQiLCJwdXNoIiwiYWRkRXZlbnRMaXN0ZW5lciIsImwyIiwic3BsaWNlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInR5cGUiLCJhcmdzIiwiaW1w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QUFSLENBQWI7O0FBRUE7QUFDQSxJQUFJNkssV0FBVyxTQUFYQSxRQUFXLENBQVVDLFNBQVYsRUFBcUI7QUFDbEMsTUFBSSxDQUFDQSxTQUFMLEVBQWdCO0FBQUU7QUFBUyxHQURPLENBQ047O0FBRTVCQSxZQUFXLE1BQVgsRUFBbUIsYUFBbkIsRUFBa0NGLElBQWxDLEVBSGtDLENBR1E7QUFDM0MsQ0FKRDs7QUFNQSxJQUFJLE9BQU9FLFNBQVAsS0FBcUIsV0FBekIsRUFBc0M7QUFBRTtBQUN0Q0QsV0FBVUMsU0FBVixFQURvQyxDQUNiO0FBQ3hCOztBQUVEMUwsT0FBT0MsT0FBUCxHQUFpQndMLFFBQWpCLEMiLCJmaWxlIjoiY3l0b3NjYXBlLWVkZ2VoYW5kbGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiY3l0b3NjYXBlRWRnZWhhbmRsZXNcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiY3l0b3NjYXBlRWRnZWhhbmRsZXNcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZTkwMWNkOTM5NzA1MjAwZWU2ZjEiLCIvLyBTaW1wbGUsIGludGVybmFsIE9iamVjdC5hc3NpZ24oKSBwb2x5ZmlsbCBmb3Igb3B0aW9ucyBvYmplY3RzIGV0Yy5cblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduICE9IG51bGwgPyBPYmplY3QuYXNzaWduLmJpbmQoIE9iamVjdCApIDogZnVuY3Rpb24oIHRndCwgLi4uc3JjcyApe1xuICBzcmNzLmZvckVhY2goIHNyYyA9PiB7XG4gICAgT2JqZWN0LmtleXMoIHNyYyApLmZvckVhY2goIGsgPT4gdGd0W2tdID0gc3JjW2tdICk7XG4gIH0gKTtcblxuICByZXR1cm4gdGd0O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NpZ24uanMiLCJjb25zdCBFZGdlaGFuZGxlcyA9IHJlcXVpcmUoJy4vZWRnZWhhbmRsZXMnKTtcbmNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJy4vYXNzaWduJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oIG9wdGlvbnMgKXtcbiAgbGV0IGN5ID0gdGhpcztcblxuICByZXR1cm4gbmV3IEVkZ2VoYW5kbGVzKCBhc3NpZ24oeyBjeSB9LCBvcHRpb25zKSApO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb3JlLmpzIiwiZnVuY3Rpb24gZGlzYWJsZUdlc3R1cmVzKCl7XG4gIHRoaXMuc2F2ZUdlc3R1cmVTdGF0ZSgpO1xuXG4gICggdGhpcy5jeVxuICAgIC56b29taW5nRW5hYmxlZCggZmFsc2UgKVxuICAgIC5wYW5uaW5nRW5hYmxlZCggZmFsc2UgKVxuICAgIC5ib3hTZWxlY3Rpb25FbmFibGVkKCBmYWxzZSApXG4gICk7XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIHJlc2V0R2VzdHVyZXMoKXtcbiAgKCB0aGlzLmN5XG4gICAgLnpvb21pbmdFbmFibGVkKCB0aGlzLmxhc3Rab29taW5nRW5hYmxlZCApXG4gICAgLnBhbm5pbmdFbmFibGVkKCB0aGlzLmxhc3RQYW5uaW5nRW5hYmxlZCApXG4gICAgLmJveFNlbGVjdGlvbkVuYWJsZWQoIHRoaXMubGFzdEJveFNlbGVjdGlvbkVuYWJsZWQgKVxuICApO1xuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBzYXZlR2VzdHVyZVN0YXRlKCl7XG4gIGxldCB7IGN5IH0gPSB0aGlzO1xuXG4gIHRoaXMubGFzdFBhbm5pbmdFbmFibGVkID0gY3kucGFubmluZ0VuYWJsZWQoKTtcbiAgdGhpcy5sYXN0Wm9vbWluZ0VuYWJsZWQgPSBjeS56b29taW5nRW5hYmxlZCgpO1xuICB0aGlzLmxhc3RCb3hTZWxlY3Rpb25FbmFibGVkID0gY3kuYm94U2VsZWN0aW9uRW5hYmxlZCgpO1xuXG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgZGlzYWJsZUdlc3R1cmVzLCByZXNldEdlc3R1cmVzLCBzYXZlR2VzdHVyZVN0YXRlIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZWRnZWhhbmRsZXMvY3ktZ2VzdHVyZXMtdG9nZ2xlLmpzIiwiZnVuY3Rpb24gYWRkQ3l0b3NjYXBlTGlzdGVuZXJzKCl7XG4gIGxldCB7IGN5IH0gPSB0aGlzO1xuXG4gIC8vIGdyYWJiaW5nIG5vZGVzXG4gIHRoaXMuYWRkTGlzdGVuZXIoIGN5LCAnZHJhZycsICgpID0+IHRoaXMuZ3JhYmJpbmdOb2RlID0gdHJ1ZSApO1xuICB0aGlzLmFkZExpc3RlbmVyKCBjeSwgJ2ZyZWUnLCAoKSA9PiB0aGlzLmdyYWJiaW5nTm9kZSA9IGZhbHNlICk7XG5cbiAgLy8gc2hvdyBoYW5kbGUgb24gaG92ZXJcbiAgdGhpcy5hZGRMaXN0ZW5lciggY3ksICdtb3VzZW92ZXInLCAnbm9kZScsIGUgPT4ge1xuICAgIHRoaXMuc2hvdyggZS50YXJnZXQgKTtcbiAgfSApO1xuXG4gIC8vIGhpZGUgaGFuZGxlIG9uIHRhcCBoYW5kbGVcbiAgdGhpcy5hZGRMaXN0ZW5lciggY3ksICd0YXAnLCAnbm9kZScsIGUgPT4ge1xuICAgIGxldCBub2RlID0gZS50YXJnZXQ7XG5cbiAgICBpZiggbm9kZS5zYW1lKCB0aGlzLmhhbmRsZU5vZGUgKSApe1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hvdyggbm9kZSApO1xuICAgIH1cbiAgfSApO1xuXG4gIC8vIGhpZGUgaGFuZGxlIHdoZW4gc291cmNlIG5vZGUgbW92ZWRcbiAgdGhpcy5hZGRMaXN0ZW5lciggY3ksICdwb3NpdGlvbicsICdub2RlJywgZSA9PiB7XG4gICAgaWYoIGUudGFyZ2V0LnNhbWUoIHRoaXMuc291cmNlTm9kZSApICl7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG4gIH0gKTtcblxuICAvLyBzdGFydCBvbiB0YXBzdGFydCBoYW5kbGVcbiAgLy8gc3RhcnQgb24gdGFwc3RhcnQgbm9kZSAoZHJhdyBtb2RlKVxuICAvLyB0b2dnbGUgb24gc291cmNlIG5vZGVcbiAgdGhpcy5hZGRMaXN0ZW5lciggY3ksICd0YXBzdGFydCcsICdub2RlJywgZSA9PiB7XG4gICAgbGV0IG5vZGUgPSBlLnRhcmdldDtcblxuICAgIGlmKCBub2RlLnNhbWUoIHRoaXMuaGFuZGxlTm9kZSApICl7XG4gICAgICB0aGlzLnN0YXJ0KCB0aGlzLnNvdXJjZU5vZGUgKTtcbiAgICB9IGVsc2UgaWYoIHRoaXMuZHJhd01vZGUgKXtcbiAgICAgIHRoaXMuc3RhcnQoIG5vZGUgKTtcbiAgICB9IGVsc2UgaWYoIG5vZGUuc2FtZSggdGhpcy5zb3VyY2VOb2RlICkgKXtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cbiAgfSApO1xuXG4gIC8vIHVwZGF0ZSBsaW5lIG9uIGRyYWdcbiAgdGhpcy5hZGRMaXN0ZW5lciggY3ksICd0YXBkcmFnJywgZSA9PiB7XG4gICAgdGhpcy51cGRhdGUoIGUucG9zaXRpb24gKTtcbiAgfSApO1xuXG4gIC8vIGhvdmVyIG92ZXIgcHJldmlld1xuICB0aGlzLmFkZExpc3RlbmVyKCBjeSwgJ3RhcGRyYWdvdmVyJywgJ25vZGUnLCBlID0+IHtcbiAgICB0aGlzLnByZXZpZXcoIGUudGFyZ2V0ICk7XG4gIH0gKTtcblxuICAvLyBob3ZlciBvdXQgdW5wcmV2aWV3XG4gIHRoaXMuYWRkTGlzdGVuZXIoIGN5LCAndGFwZHJhZ291dCcsICdub2RlJywgZSA9PiB7XG4gICAgdGhpcy51bnByZXZpZXcoIGUudGFyZ2V0ICk7XG4gIH0gKTtcblxuICAvLyBzdG9wIGdlc3R1cmUgb24gdGFwZW5kXG4gIHRoaXMuYWRkTGlzdGVuZXIoIGN5LCAndGFwZW5kJywgKCkgPT4ge1xuICAgIHRoaXMuc3RvcCgpO1xuICB9ICk7XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBhZGRDeXRvc2NhcGVMaXN0ZW5lcnMgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lZGdlaGFuZGxlcy9jeS1saXN0ZW5lcnMuanMiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xubGV0IGRlZmF1bHRzID0ge1xuICBwcmV2aWV3OiB0cnVlLCAvLyB3aGV0aGVyIHRvIHNob3cgYWRkZWQgZWRnZXMgcHJldmlldyBiZWZvcmUgcmVsZWFzaW5nIHNlbGVjdGlvblxuICBob3ZlckRlbGF5OiAxNTAsIC8vIHRpbWUgc3BlbnQgaG92ZXJpbmcgb3ZlciBhIHRhcmdldCBub2RlIGJlZm9yZSBpdCBpcyBjb25zaWRlcmVkIHNlbGVjdGVkXG4gIGhhbmRsZU5vZGVzOiAnbm9kZScsIC8vIHNlbGVjdG9yL2ZpbHRlciBmdW5jdGlvbiBmb3Igd2hldGhlciBlZGdlcyBjYW4gYmUgbWFkZSBmcm9tIGEgZ2l2ZW4gbm9kZVxuICBoYW5kbGVQb3NpdGlvbjogJ21pZGRsZSB0b3AnLCAvLyBzZXRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgaGFuZGxlIGluIHRoZSBmb3JtYXQgb2YgXCJYLUFYSVMgWS1BWElTXCIgc3VjaCBhcyBcImxlZnQgdG9wXCIsIFwibWlkZGxlIHRvcFwiXG4gIGhhbmRsZUluRHJhd01vZGU6IGZhbHNlLCAvLyB3aGV0aGVyIHRvIHNob3cgdGhlIGhhbmRsZSBpbiBkcmF3IG1vZGVcbiAgZWRnZVR5cGU6IGZ1bmN0aW9uKCBzb3VyY2VOb2RlLCB0YXJnZXROb2RlICl7XG4gICAgLy8gY2FuIHJldHVybiAnZmxhdCcgZm9yIGZsYXQgZWRnZXMgYmV0d2VlbiBub2RlcyBvciAnbm9kZScgZm9yIGludGVybWVkaWF0ZSBub2RlIGJldHdlZW4gdGhlbVxuICAgIC8vIHJldHVybmluZyBudWxsL3VuZGVmaW5lZCBtZWFucyBhbiBlZGdlIGNhbid0IGJlIGFkZGVkIGJldHdlZW4gdGhlIHR3byBub2Rlc1xuICAgIHJldHVybiAnZmxhdCc7XG4gIH0sXG4gIGxvb3BBbGxvd2VkOiBmdW5jdGlvbiggbm9kZSApe1xuICAgIC8vIGZvciB0aGUgc3BlY2lmaWVkIG5vZGUsIHJldHVybiB3aGV0aGVyIGVkZ2VzIGZyb20gaXRzZWxmIHRvIGl0c2VsZiBhcmUgYWxsb3dlZFxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcbiAgbm9kZUxvb3BPZmZzZXQ6IC01MCwgLy8gb2Zmc2V0IGZvciBlZGdlVHlwZTogJ25vZGUnIGxvb3BzXG4gIG5vZGVQYXJhbXM6IGZ1bmN0aW9uKCBzb3VyY2VOb2RlLCB0YXJnZXROb2RlICl7XG4gICAgLy8gZm9yIGVkZ2VzIGJldHdlZW4gdGhlIHNwZWNpZmllZCBzb3VyY2UgYW5kIHRhcmdldFxuICAgIC8vIHJldHVybiBlbGVtZW50IG9iamVjdCB0byBiZSBwYXNzZWQgdG8gY3kuYWRkKCkgZm9yIGludGVybWVkaWFyeSBub2RlXG4gICAgcmV0dXJuIHt9O1xuICB9LFxuICBlZGdlUGFyYW1zOiBmdW5jdGlvbiggc291cmNlTm9kZSwgdGFyZ2V0Tm9kZSwgaSApe1xuICAgIC8vIGZvciBlZGdlcyBiZXR3ZWVuIHRoZSBzcGVjaWZpZWQgc291cmNlIGFuZCB0YXJnZXRcbiAgICAvLyByZXR1cm4gZWxlbWVudCBvYmplY3QgdG8gYmUgcGFzc2VkIHRvIGN5LmFkZCgpIGZvciBlZGdlXG4gICAgLy8gTkI6IGkgaW5kaWNhdGVzIGVkZ2UgaW5kZXggaW4gY2FzZSBvZiBlZGdlVHlwZTogJ25vZGUnXG4gICAgcmV0dXJuIHt9O1xuICB9LFxuICBzaG93OiBmdW5jdGlvbiggc291cmNlTm9kZSApe1xuICAgIC8vIGZpcmVkIHdoZW4gaGFuZGxlIGlzIHNob3duXG4gIH0sXG4gIGhpZGU6IGZ1bmN0aW9uKCBzb3VyY2VOb2RlICl7XG4gICAgLy8gZmlyZWQgd2hlbiB0aGUgaGFuZGxlIGlzIGhpZGRlblxuICB9LFxuICBzdGFydDogZnVuY3Rpb24oIHNvdXJjZU5vZGUgKXtcbiAgICAvLyBmaXJlZCB3aGVuIGVkZ2VoYW5kbGVzIGludGVyYWN0aW9uIHN0YXJ0cyAoZHJhZyBvbiBoYW5kbGUpXG4gIH0sXG4gIGNvbXBsZXRlOiBmdW5jdGlvbiggc291cmNlTm9kZSwgdGFyZ2V0Tm9kZSwgYWRkZWRFbGVzICl7XG4gICAgLy8gZmlyZWQgd2hlbiBlZGdlaGFuZGxlcyBpcyBkb25lIGFuZCBlbGVtZW50cyBhcmUgYWRkZWRcbiAgfSxcbiAgc3RvcDogZnVuY3Rpb24oIHNvdXJjZU5vZGUgKXtcbiAgICAvLyBmaXJlZCB3aGVuIGVkZ2VoYW5kbGVzIGludGVyYWN0aW9uIGlzIHN0b3BwZWQgKGVpdGhlciBjb21wbGV0ZSB3aXRoIGFkZGVkIGVkZ2VzIG9yIGluY29tcGxldGUpXG4gIH0sXG4gIGNhbmNlbDogZnVuY3Rpb24oIHNvdXJjZU5vZGUsIGNhbmNlbGxlZFRhcmdldHMgKXtcbiAgICAvLyBmaXJlZCB3aGVuIGVkZ2VoYW5kbGVzIGFyZSBjYW5jZWxsZWQgKGluY29tcGxldGUgZ2VzdHVyZSlcbiAgfSxcbiAgaG92ZXJvdmVyOiBmdW5jdGlvbiggc291cmNlTm9kZSwgdGFyZ2V0Tm9kZSApe1xuICAgIC8vIGZpcmVkIHdoZW4gYSB0YXJnZXQgaXMgaG92ZXJlZFxuICB9LFxuICBob3Zlcm91dDogZnVuY3Rpb24oIHNvdXJjZU5vZGUsIHRhcmdldE5vZGUgKXtcbiAgICAvLyBmaXJlZCB3aGVuIGEgdGFyZ2V0IGlzbid0IGhvdmVyZWQgYW55bW9yZVxuICB9LFxuICBwcmV2aWV3b246IGZ1bmN0aW9uKCBzb3VyY2VOb2RlLCB0YXJnZXROb2RlLCBwcmV2aWV3RWxlcyApe1xuICAgIC8vIGZpcmVkIHdoZW4gcHJldmlldyBpcyBzaG93blxuICB9LFxuICBwcmV2aWV3b2ZmOiBmdW5jdGlvbiggc291cmNlTm9kZSwgdGFyZ2V0Tm9kZSwgcHJldmlld0VsZXMgKXtcbiAgICAvLyBmaXJlZCB3aGVuIHByZXZpZXcgaXMgaGlkZGVuXG4gIH0sXG4gIGRyYXdvbjogZnVuY3Rpb24oKXtcbiAgICAvLyBmaXJlZCB3aGVuIGRyYXcgbW9kZSBlbmFibGVkXG4gIH0sXG4gIGRyYXdvZmY6IGZ1bmN0aW9uKCl7XG4gICAgLy8gZmlyZWQgd2hlbiBkcmF3IG1vZGUgZGlzYWJsZWRcbiAgfVxufTtcbi8qIGVzbGludC1lbmFibGUgKi9cblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lZGdlaGFuZGxlcy9kZWZhdWx0cy5qcyIsImZ1bmN0aW9uIHRvZ2dsZURyYXdNb2RlKCBib29sICl7XG4gIGxldCB7IGN5LCBvcHRpb25zIH0gPSB0aGlzO1xuXG4gIHRoaXMuZHJhd01vZGUgPSBib29sICE9IG51bGwgPyBib29sIDogIXRoaXMuZHJhd01vZGU7XG5cbiAgaWYoIHRoaXMuZHJhd01vZGUgKXtcbiAgICB0aGlzLnByZXZVbmdyYWJpZnlTdGF0ZSA9IGN5LmF1dG91bmdyYWJpZnkoKTtcblxuICAgIGN5LmF1dG91bmdyYWJpZnkoIHRydWUgKTtcblxuICAgIGlmKCAhb3B0aW9ucy5oYW5kbGVJbkRyYXdNb2RlICYmIHRoaXMuaGFuZGxlU2hvd24oKSApe1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5lbWl0KCdkcmF3b24nKTtcbiAgfSBlbHNlIHtcbiAgICBjeS5hdXRvdW5ncmFiaWZ5KCB0aGlzLnByZXZVbmdyYWJpZnlTdGF0ZSApO1xuXG4gICAgdGhpcy5lbWl0KCdkcmF3b2ZmJyk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn1cblxuZnVuY3Rpb24gZW5hYmxlRHJhd01vZGUoKXtcbiAgcmV0dXJuIHRoaXMudG9nZ2xlRHJhd01vZGUoIHRydWUgKTtcbn1cblxuZnVuY3Rpb24gZGlzYWJsZURyYXdNb2RlKCl7XG4gIHJldHVybiB0aGlzLnRvZ2dsZURyYXdNb2RlKCBmYWxzZSApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgdG9nZ2xlRHJhd01vZGUsIGVuYWJsZURyYXdNb2RlLCBkaXNhYmxlRHJhd01vZGUgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lZGdlaGFuZGxlcy9kcmF3LW1vZGUuanMiLCJjb25zdCBhc3NpZ24gPSByZXF1aXJlKCcuLi9hc3NpZ24nKTtcblxuZnVuY3Rpb24gYWRkQ2xhc3Nlc1RvRWxlSnNvbigganNvbiwgY2xhc3NlcyApe1xuICBpZigganNvbi5jbGFzc2VzICl7XG4gICAganNvbi5jbGFzc2VzICs9ICcgJyArIGNsYXNzZXM7XG4gIH0gZWxzZSB7XG4gICAganNvbi5jbGFzc2VzID0gY2xhc3NlcztcbiAgfVxuXG4gIHJldHVybiBqc29uO1xufVxuXG5mdW5jdGlvbiBtYWtlRWRnZXMoIHByZXZpZXcgPSBmYWxzZSApIHtcbiAgbGV0IHsgY3ksIG9wdGlvbnMsIHByZXN1bXB0aXZlVGFyZ2V0cywgcHJldmlld0VsZXMgfSA9IHRoaXM7XG5cbiAgbGV0IHNvdXJjZSA9IHRoaXMuc291cmNlTm9kZTtcbiAgbGV0IHRhcmdldCA9IHRoaXMudGFyZ2V0Tm9kZTtcbiAgbGV0IGNsYXNzZXMgPSBwcmV2aWV3ID8gJ2VoLXByZXZpZXcnIDogJyc7XG4gIGxldCBhZGRlZCA9IGN5LmNvbGxlY3Rpb24oKTtcblxuICAvLyBjYW4ndCBtYWtlIHByZXZpZXcgaWYgZGlzYWJsZWRcbiAgaWYoIHByZXZpZXcgJiYgIW9wdGlvbnMucHJldmlldyApeyByZXR1cm47IH1cblxuICAvLyBkZXRlY3QgY2FuY2VsXG4gIGlmKCAhdGFyZ2V0IHx8IHRhcmdldC5zaXplKCkgPT09IDAgKXtcbiAgICBwcmV2aWV3RWxlcy5yZW1vdmUoKTtcblxuICAgIHRoaXMuZW1pdCggJ2NhbmNlbCcsIHRoaXMubXAoKSwgW3NvdXJjZSwgcHJlc3VtcHRpdmVUYXJnZXRzLCBjeS5jb2xsZWN0aW9uKCldICk7XG5cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBqdXN0IHJlbW92ZSBwcmV2aWV3IGNsYXNzIGlmIHdlIGFscmVhZHkgaGF2ZSB0aGUgZWRnZXNcbiAgaWYoICFwcmV2aWV3ICYmIG9wdGlvbnMucHJldmlldyApIHtcbiAgICBwcmV2aWV3RWxlcy5yZW1vdmVDbGFzcygnZWgtcHJldmlldycpO1xuXG4gICAgdGhpcy5lbWl0KCAnY29tcGxldGUnLCB0aGlzLm1wKCksIFtzb3VyY2UsIHRhcmdldCwgcHJldmlld0VsZXNdICk7XG5cbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgcDEgPSBzb3VyY2UucG9zaXRpb24oKTtcbiAgbGV0IHAyID0gdGFyZ2V0LnBvc2l0aW9uKCk7XG5cbiAgbGV0IHA7XG4gIGlmKCBzb3VyY2Uuc2FtZSggdGFyZ2V0ICkgKSB7XG4gICAgcCA9IHtcbiAgICAgIHg6IHAxLnggKyBvcHRpb25zLm5vZGVMb29wT2Zmc2V0LFxuICAgICAgeTogcDEueSArIG9wdGlvbnMubm9kZUxvb3BPZmZzZXRcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHAgPSB7XG4gICAgICB4OiAoIHAxLnggKyBwMi54ICkgLyAyLFxuICAgICAgeTogKCBwMS55ICsgcDIueSApIC8gMlxuICAgIH07XG4gIH1cblxuICBsZXQgZWRnZVR5cGUgPSBvcHRpb25zLmVkZ2VUeXBlKCBzb3VyY2UsIHRhcmdldCApO1xuXG4gIGlmKCBlZGdlVHlwZSA9PT0gJ25vZGUnICl7XG4gICAgbGV0IGludGVyTm9kZSA9IGN5LmFkZChcbiAgICAgIGFkZENsYXNzZXNUb0VsZUpzb24oIGFzc2lnbihcbiAgICAgICAge1xuICAgICAgICAgIGdyb3VwOiAnbm9kZXMnLFxuICAgICAgICAgIHBvc2l0aW9uOiBwXG4gICAgICAgIH0sXG4gICAgICAgIG9wdGlvbnMubm9kZVBhcmFtcyggc291cmNlLCB0YXJnZXQgKVxuICAgICAgKSwgY2xhc3NlcyApXG4gICAgKTtcblxuICAgIGxldCBzb3VyY2UyaW50ZXIgPSBjeS5hZGQoXG4gICAgICBhZGRDbGFzc2VzVG9FbGVKc29uKCBhc3NpZ24oXG4gICAgICAgIHtcbiAgICAgICAgICBncm91cDogJ2VkZ2VzJyxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBzb3VyY2U6IHNvdXJjZS5pZCgpLFxuICAgICAgICAgICAgdGFyZ2V0OiBpbnRlck5vZGUuaWQoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW9ucy5lZGdlUGFyYW1zKCBzb3VyY2UsIHRhcmdldCwgMCApXG4gICAgICApLCBjbGFzc2VzIClcbiAgICApO1xuXG4gICAgbGV0IGludGVyMnRhcmdldCA9IGN5LmFkZChcbiAgICAgIGFkZENsYXNzZXNUb0VsZUpzb24oIGFzc2lnbihcbiAgICAgICAge1xuICAgICAgICAgIGdyb3VwOiAnZWRnZXMnLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHNvdXJjZTogaW50ZXJOb2RlLmlkKCksXG4gICAgICAgICAgICB0YXJnZXQ6IHRhcmdldC5pZCgpXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvcHRpb25zLmVkZ2VQYXJhbXMoIHNvdXJjZSwgdGFyZ2V0LCAxIClcbiAgICAgICksIGNsYXNzZXMgKVxuICAgICk7XG5cbiAgICBhZGRlZCA9IGFkZGVkLm1lcmdlKCBpbnRlck5vZGUgKS5tZXJnZSggc291cmNlMmludGVyICkubWVyZ2UoIGludGVyMnRhcmdldCApO1xuICB9IGVsc2UgeyAvLyBmbGF0XG4gICAgbGV0IHNvdXJjZTJ0YXJnZXQgPSBjeS5hZGQoXG4gICAgICBhZGRDbGFzc2VzVG9FbGVKc29uKCBhc3NpZ24oXG4gICAgICAgIHtcbiAgICAgICAgICBncm91cDogJ2VkZ2VzJyxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBzb3VyY2U6IHNvdXJjZS5pZCgpLFxuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQuaWQoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW9ucy5lZGdlUGFyYW1zKCBzb3VyY2UsIHRhcmdldCwgMCApXG4gICAgICApLCBjbGFzc2VzIClcbiAgICApO1xuXG4gICAgYWRkZWQgPSBhZGRlZC5tZXJnZSggc291cmNlMnRhcmdldCApO1xuICB9XG5cbiAgaWYoIHByZXZpZXcgKSB7XG4gICAgdGhpcy5wcmV2aWV3RWxlcyA9IGFkZGVkO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuZW1pdCggJ2NvbXBsZXRlJywgdGhpcy5tcCgpLCBbc291cmNlLCB0YXJnZXQsIGFkZGVkXSApO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIG1ha2VQcmV2aWV3KCkge1xuICB0aGlzLm1ha2VFZGdlcyggdHJ1ZSApO1xuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBwcmV2aWV3U2hvd24oKXtcbiAgcmV0dXJuIHRoaXMucHJldmlld0VsZXMubm9uZW1wdHkoKSAmJiB0aGlzLnByZXZpZXdFbGVzLmluc2lkZSgpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVQcmV2aWV3KCkge1xuICBpZiggdGhpcy5wcmV2aWV3U2hvd24oKSApe1xuICAgIHRoaXMucHJldmlld0VsZXMucmVtb3ZlKCk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn1cblxuZnVuY3Rpb24gaGFuZGxlU2hvd24oKXtcbiAgcmV0dXJuIHRoaXMuaGFuZGxlTm9kZS5ub25lbXB0eSgpICYmIHRoaXMuaGFuZGxlTm9kZS5pbnNpZGUoKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlSGFuZGxlKCl7XG4gIHRoaXMuaGFuZGxlTm9kZS5yZW1vdmUoKTtcblxuICByZXR1cm4gdGhpcztcbn1cblxuZnVuY3Rpb24gc2V0SGFuZGxlRm9yKCBub2RlICl7XG4gIGxldCB7IG9wdGlvbnMsIGN5IH0gPSB0aGlzO1xuXG4gIGxldCBwID0gbm9kZS5wb3NpdGlvbigpO1xuICBsZXQgaCA9IG5vZGUub3V0ZXJIZWlnaHQoKTtcbiAgbGV0IHcgPSBub2RlLm91dGVyV2lkdGgoKTtcblxuICAvLyBzdG9yZSBob3cgbXVjaCB3ZSBzaG91bGQgbW92ZSB0aGUgaGFuZGxlIGZyb20gb3JpZ2luKHAueCwgcC55KVxuICBsZXQgbW92ZVggPSAwO1xuICBsZXQgbW92ZVkgPSAwO1xuXG4gIC8vIGdyYWIgYXhpcydzXG4gIGxldCBheGVzID0gb3B0aW9ucy5oYW5kbGVQb3NpdGlvbi50b0xvd2VyQ2FzZSgpLnNwbGl0KCcgJyk7XG4gIGxldCBheGlzWCA9IGF4ZXNbMF07XG4gIGxldCBheGlzWSA9IGF4ZXNbMV07XG5cbiAgLy8gYmFzZWQgb24gaGFuZGxlUG9zaXRpb24gbW92ZSBsZWZ0L3JpZ2h0L3RvcC9ib3R0b20uIE1pZGRsZS9taWRkbGUgd2lsbCBqdXN0IGJlIG5vcm1hbFxuICBpZiggYXhpc1ggPT09ICdsZWZ0JyApe1xuICAgIG1vdmVYID0gLSh3IC8gMik7XG4gIH0gZWxzZSBpZiggYXhpc1ggPT09ICdyaWdodCcgKXtcbiAgICBtb3ZlWCA9IHcgLyAyO1xuICB9IGlmKCBheGlzWSA9PT0gJ3RvcCcgKXtcbiAgICBtb3ZlWSA9IC0oaCAvIDIpO1xuICB9IGVsc2UgaWYoIGF4aXNZID09PSAnYm90dG9tJyApe1xuICAgIG1vdmVZID0gaCAvIDI7XG4gIH1cblxuICAvLyBzZXQgaGFuZGxlIHggYW5kIHkgYmFzZWQgb24gYWRqdXN0ZWQgcG9zaXRpb25zXG4gIGxldCBoeCA9IHRoaXMuaHggPSBwLnggKyBtb3ZlWDtcbiAgbGV0IGh5ID0gdGhpcy5oeSA9IHAueSArIG1vdmVZO1xuICBsZXQgcG9zID0geyB4OiBoeCwgeTogaHkgfTtcblxuICBpZiggdGhpcy5oYW5kbGVTaG93bigpICl7XG4gICAgdGhpcy5oYW5kbGVOb2RlLnBvc2l0aW9uKCBwb3MgKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmhhbmRsZU5vZGUgPSBjeS5hZGQoe1xuICAgICAgY2xhc3NlczogJ2VoLWhhbmRsZScsXG4gICAgICBwb3NpdGlvbjogcG9zLFxuICAgICAgZ3JhYmJhYmxlOiBmYWxzZSxcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgICd6LWluZGV4JzogOTAwNzE5OTI1NDc0MDk5MVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUVkZ2UoKSB7XG4gIGxldCB7IHNvdXJjZU5vZGUsIGdob3N0Tm9kZSwgY3ksIG14LCBteSB9ID0gdGhpcztcbiAgbGV0IHggPSBteDtcbiAgbGV0IHkgPSBteTtcbiAgbGV0IGdob3N0RWRnZSwgZ2hvc3RFbGVzO1xuXG4gIC8vIGNhbid0IGRyYXcgYSBsaW5lIHdpdGhvdXQgaGF2aW5nIHRoZSBzdGFydGluZyBub2RlXG4gIGlmKCAhc291cmNlTm9kZSApeyByZXR1cm47IH1cblxuICBpZiggIWdob3N0Tm9kZSB8fCBnaG9zdE5vZGUubGVuZ3RoID09PSAwIHx8IGdob3N0Tm9kZS5yZW1vdmVkKCkgKSB7XG4gICAgZ2hvc3RFbGVzID0gdGhpcy5naG9zdEVsZXMgPSBjeS5jb2xsZWN0aW9uKCk7XG5cbiAgICBnaG9zdE5vZGUgPSB0aGlzLmdob3N0Tm9kZSA9IGN5LmFkZCgge1xuICAgICAgZ3JvdXA6ICdub2RlcycsXG4gICAgICBjbGFzc2VzOiAnZWgtZ2hvc3QgZWgtZ2hvc3Qtbm9kZScsXG4gICAgICBjc3M6IHtcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAnYmx1ZScsXG4gICAgICAgICd3aWR0aCc6IDAuMDAwMSxcbiAgICAgICAgJ2hlaWdodCc6IDAuMDAwMSxcbiAgICAgICAgJ29wYWNpdHknOiAwLFxuICAgICAgICAnZXZlbnRzJzogJ25vJ1xuICAgICAgfSxcbiAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDBcbiAgICAgIH1cbiAgICB9ICk7XG5cbiAgICBnaG9zdEVkZ2UgPSBjeS5hZGQoIHtcbiAgICAgIGdyb3VwOiAnZWRnZXMnLFxuICAgICAgY2xhc3NlczogJ2VoLWdob3N0IGVoLWdob3N0LWVkZ2UnLFxuICAgICAgZGF0YToge1xuICAgICAgICBzb3VyY2U6IHNvdXJjZU5vZGUuaWQoKSxcbiAgICAgICAgdGFyZ2V0OiBnaG9zdE5vZGUuaWQoKVxuICAgICAgfSxcbiAgICAgIGNzczoge1xuICAgICAgICAnZXZlbnRzJzogJ25vJ1xuICAgICAgfVxuICAgIH0gKTtcblxuICAgIGdob3N0RWxlcy5tZXJnZSggZ2hvc3ROb2RlICkubWVyZ2UoIGdob3N0RWRnZSApO1xuICB9XG5cbiAgZ2hvc3ROb2RlLnBvc2l0aW9uKHsgeCwgeSB9KTtcblxuICByZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1ha2VFZGdlcywgbWFrZVByZXZpZXcsIHJlbW92ZVByZXZpZXcsIHByZXZpZXdTaG93bixcbiAgdXBkYXRlRWRnZSxcbiAgaGFuZGxlU2hvd24sIHNldEhhbmRsZUZvciwgcmVtb3ZlSGFuZGxlXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VkZ2VoYW5kbGVzL2RyYXdpbmcuanMiLCJmdW5jdGlvbiBlbmFibGUoKXtcbiAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcblxuICB0aGlzLmVtaXQoJ2VuYWJsZScpO1xuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBkaXNhYmxlKCl7XG4gIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuXG4gIHRoaXMuZW1pdCgnZGlzYWJsZScpO1xuXG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgZW5hYmxlLCBkaXNhYmxlIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZWRnZWhhbmRsZXMvZW5hYmxpbmcuanMiLCJmdW5jdGlvbiBjYW5TdGFydE9uKCBub2RlICl7XG4gIGNvbnN0IHsgb3B0aW9ucywgcHJldmlld0VsZXMsIGdob3N0RWxlcywgaGFuZGxlTm9kZSB9ID0gdGhpcztcbiAgY29uc3QgaXNQcmV2aWV3ID0gZWwgPT4gcHJldmlld0VsZXMuYW55U2FtZShlbCk7XG4gIGNvbnN0IGlzR2hvc3QgPSBlbCA9PiBnaG9zdEVsZXMuYW55U2FtZShlbCk7XG4gIGNvbnN0IHVzZXJGaWx0ZXIgPSBlbCA9PiBlbC5maWx0ZXIoIG9wdGlvbnMuaGFuZGxlTm9kZXMgKS5sZW5ndGggPiAwO1xuICBjb25zdCBpc0hhbmRsZSA9IGVsID0+IGhhbmRsZU5vZGUuc2FtZShlbCk7XG4gIGNvbnN0IGlzVGVtcCA9IGVsID0+IGlzUHJldmlldyhlbCkgfHwgaXNIYW5kbGUoZWwpIHx8IGlzR2hvc3QoZWwpO1xuXG4gIGNvbnN0IHsgZW5hYmxlZCwgYWN0aXZlLCBncmFiYmluZ05vZGUgfSA9IHRoaXM7XG5cbiAgcmV0dXJuIChcbiAgICBlbmFibGVkICYmICFhY3RpdmUgJiYgIWdyYWJiaW5nTm9kZVxuICAgICYmICggbm9kZSA9PSBudWxsIHx8ICghaXNUZW1wKG5vZGUpICYmIHVzZXJGaWx0ZXIobm9kZSkpIClcbiAgKTtcbn1cblxuZnVuY3Rpb24gY2FuU3RhcnREcmF3TW9kZU9uKCBub2RlICl7XG4gIHJldHVybiB0aGlzLmNhblN0YXJ0T24oIG5vZGUgKSAmJiB0aGlzLmRyYXdNb2RlO1xufVxuXG5mdW5jdGlvbiBjYW5TdGFydE5vbkRyYXdNb2RlT24oIG5vZGUgKXtcbiAgcmV0dXJuIHRoaXMuY2FuU3RhcnRPbiggbm9kZSApICYmICF0aGlzLmRyYXdNb2RlO1xufVxuXG5mdW5jdGlvbiBzaG93KCBub2RlICl7XG4gIGxldCB7IG9wdGlvbnMsIGRyYXdNb2RlIH0gPSB0aGlzO1xuXG4gIGlmKCAhdGhpcy5jYW5TdGFydE9uKG5vZGUpIHx8ICggZHJhd01vZGUgJiYgIW9wdGlvbnMuaGFuZGxlSW5EcmF3TW9kZSApICl7IHJldHVybjsgfVxuXG4gIHRoaXMuc291cmNlTm9kZSA9IG5vZGU7XG5cbiAgdGhpcy5zZXRIYW5kbGVGb3IoIG5vZGUgKTtcblxuICB0aGlzLmVtaXQoICdzaG93JywgdGhpcy5ocCgpICk7XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIGhpZGUoKXtcbiAgbGV0IHsgY3kgfSA9IHRoaXM7XG5cbiAgdGhpcy5yZW1vdmVIYW5kbGUoKTtcblxuICB0aGlzLnNvdXJjZU5vZGUgPSBjeS5jb2xsZWN0aW9uKCk7XG5cbiAgdGhpcy5lbWl0KCAnaGlkZScsIHRoaXMuaHAoKSApO1xuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBzdGFydCggbm9kZSApe1xuICBpZiggIXRoaXMuY2FuU3RhcnRPbihub2RlKSApeyByZXR1cm47IH1cblxuICB0aGlzLmFjdGl2ZSA9IHRydWU7XG5cbiAgdGhpcy5zb3VyY2VOb2RlID0gbm9kZTtcbiAgdGhpcy5zb3VyY2VOb2RlLmFkZENsYXNzKCdlaC1zb3VyY2UnKTtcblxuICB0aGlzLmRpc2FibGVHZXN0dXJlcygpO1xuXG4gIHRoaXMuZW1pdCggJ3N0YXJ0JywgdGhpcy5ocCgpICk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZSggcG9zICl7XG4gIGlmKCAhdGhpcy5hY3RpdmUgKXsgcmV0dXJuOyB9XG5cbiAgbGV0IHAgPSBwb3M7XG5cbiAgdGhpcy5teCA9IHAueDtcbiAgdGhpcy5teSA9IHAueTtcblxuICB0aGlzLnVwZGF0ZUVkZ2UoKTtcblxuICByZXR1cm4gdGhpcztcbn1cblxuZnVuY3Rpb24gcHJldmlldyggdGFyZ2V0ICkge1xuICBpZiggIXRoaXMuYWN0aXZlIHx8IHRhcmdldC5zYW1lKCB0aGlzLmhhbmRsZU5vZGUgKSApeyByZXR1cm47IH1cblxuICBsZXQgeyBvcHRpb25zLCBzb3VyY2VOb2RlLCBnaG9zdE5vZGUsIHByZXN1bXB0aXZlVGFyZ2V0cywgcHJldmlld0VsZXMgfSA9IHRoaXM7XG4gIGxldCBzb3VyY2UgPSBzb3VyY2VOb2RlO1xuXG4gIGNsZWFyVGltZW91dCggdGhpcy5wcmV2aWV3VGltZW91dCApO1xuXG4gIHRoaXMucHJldmlld1RpbWVvdXQgPSBzZXRUaW1lb3V0KCAoKSA9PiB7XG4gICAgbGV0IGlzTG9vcCA9IHRhcmdldC5zYW1lKCBzb3VyY2UgKTtcbiAgICBsZXQgbG9vcEFsbG93ZWQgPSBvcHRpb25zLmxvb3BBbGxvd2VkKCB0YXJnZXQgKTtcbiAgICBsZXQgaXNHaG9zdCA9IHRhcmdldC5zYW1lKCBnaG9zdE5vZGUgKTtcbiAgICBsZXQgbm9FZGdlID0gb3B0aW9ucy5lZGdlVHlwZSggc291cmNlLCB0YXJnZXQgKSA9PSBudWxsO1xuXG4gICAgdGhpcy50YXJnZXROb2RlID0gdGFyZ2V0O1xuICAgIHByZXN1bXB0aXZlVGFyZ2V0cy5tZXJnZSggdGFyZ2V0ICk7XG5cbiAgICB0YXJnZXQuYWRkQ2xhc3MoJ2VoLXByZXN1bXB0aXZlLXRhcmdldCcpO1xuXG4gICAgaWYoIGlzR2hvc3QgfHwgbm9FZGdlICkgeyByZXR1cm47IH1cblxuICAgIGlmKCAhaXNMb29wIHx8ICggaXNMb29wICYmIGxvb3BBbGxvd2VkICkgKSB7XG4gICAgICB0YXJnZXQuYWRkQ2xhc3MoJ2VoLXRhcmdldCcpO1xuXG4gICAgICB0aGlzLmVtaXQoICdob3Zlcm92ZXInLCB0aGlzLm1wKCksIFsgc291cmNlLCB0YXJnZXQgXSApO1xuXG4gICAgICBpZiggb3B0aW9ucy5wcmV2aWV3ICl7XG4gICAgICAgIHRhcmdldC5hZGRDbGFzcygnZWgtcHJldmlldycpO1xuXG4gICAgICAgIHRoaXMubWFrZVByZXZpZXcoKTtcblxuICAgICAgICB0aGlzLmVtaXQoICdwcmV2aWV3b24nLCB0aGlzLm1wKCksIFsgc291cmNlLCB0YXJnZXQsIHByZXZpZXdFbGVzIF0gKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIG9wdGlvbnMuaG92ZXJEZWxheSApO1xuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiB1bnByZXZpZXcoIHRhcmdldCApIHtcbiAgaWYoICF0aGlzLmFjdGl2ZSB8fCB0YXJnZXQuc2FtZSggdGhpcy5oYW5kbGVOb2RlICkgKXsgcmV0dXJuOyB9XG5cbiAgbGV0IHsgcHJldmlld1RpbWVvdXQsIHNvdXJjZU5vZGUsIHByZXZpZXdFbGVzIH0gPSB0aGlzO1xuICBjbGVhclRpbWVvdXQoIHByZXZpZXdUaW1lb3V0ICk7XG4gIHRoaXMucHJldmlld1RpbWVvdXQgPSBudWxsO1xuXG4gIGxldCBzb3VyY2UgPSBzb3VyY2VOb2RlO1xuXG4gIHRhcmdldC5yZW1vdmVDbGFzcygnZWgtcHJldmlldyBlaC10YXJnZXQgZWgtcHJlc3VtcHRpdmUtdGFyZ2V0Jyk7XG5cbiAgdGhpcy5yZW1vdmVQcmV2aWV3KCBzb3VyY2UsIHRhcmdldCApO1xuXG4gIHRoaXMuZW1pdCggJ2hvdmVyb3V0JywgdGhpcy5tcCgpLCBbIHNvdXJjZSwgdGFyZ2V0IF0gKTtcbiAgdGhpcy5lbWl0KCAncHJldmlld29mZicsIHRoaXMubXAoKSwgWyBzb3VyY2UsIHRhcmdldCwgcHJldmlld0VsZXMgXSApO1xuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBzdG9wKCl7XG4gIGlmKCAhdGhpcy5hY3RpdmUgKXsgcmV0dXJuOyB9XG5cbiAgbGV0IHsgc291cmNlTm9kZSwgdGFyZ2V0Tm9kZSwgaGFuZGxlTm9kZSwgZ2hvc3RFbGVzLCBwcmVzdW1wdGl2ZVRhcmdldHMgfSA9IHRoaXM7XG5cbiAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcblxuICB0aGlzLm1ha2VFZGdlcygpO1xuXG4gIHNvdXJjZU5vZGUucmVtb3ZlQ2xhc3MoJ2VoLXNvdXJjZScpO1xuICB0YXJnZXROb2RlLnJlbW92ZUNsYXNzKCdlaC10YXJnZXQgZWgtcHJldmlldyBlaC1ob3ZlcicpO1xuICBwcmVzdW1wdGl2ZVRhcmdldHMucmVtb3ZlQ2xhc3MoJ2VoLXByZXN1bXB0aXZlLXRhcmdldCcpO1xuXG4gIGhhbmRsZU5vZGUucmVtb3ZlKCk7XG4gIGdob3N0RWxlcy5yZW1vdmUoKTtcblxuICB0aGlzLmNsZWFyQ29sbGVjdGlvbnMoKTtcblxuICB0aGlzLnJlc2V0R2VzdHVyZXMoKTtcblxuICB0aGlzLmVtaXQoICdzdG9wJywgdGhpcy5tcCgpLCBbIHNvdXJjZU5vZGUsIHRhcmdldE5vZGUgXSApO1xuXG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2hvdywgaGlkZSwgc3RhcnQsIHVwZGF0ZSwgcHJldmlldywgdW5wcmV2aWV3LCBzdG9wLFxuICBjYW5TdGFydE9uLCBjYW5TdGFydERyYXdNb2RlT24sIGNhblN0YXJ0Tm9uRHJhd01vZGVPblxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lZGdlaGFuZGxlcy9nZXN0dXJlLWxpZmVjeWNsZS5qcyIsImNvbnN0IGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuY29uc3QgYXNzaWduID0gcmVxdWlyZSgnLi4vYXNzaWduJyk7XG5cbmNvbnN0IGN5R2VzdHVyZXNUb2dnbGUgPSByZXF1aXJlKCcuL2N5LWdlc3R1cmVzLXRvZ2dsZScpO1xuY29uc3QgY3lMaXN0ZW5lcnMgPSByZXF1aXJlKCcuL2N5LWxpc3RlbmVycycpO1xuY29uc3QgZHJhd01vZGUgPSByZXF1aXJlKCcuL2RyYXctbW9kZScpO1xuY29uc3QgZHJhd2luZyA9IHJlcXVpcmUoJy4vZHJhd2luZycpO1xuY29uc3QgZW5hYmxpbmcgPSByZXF1aXJlKCcuL2VuYWJsaW5nJyk7XG5jb25zdCBnZXN0dXJlTGlmZWN5Y2xlID0gcmVxdWlyZSgnLi9nZXN0dXJlLWxpZmVjeWNsZScpO1xuY29uc3QgbGlzdGVuZXJzID0gcmVxdWlyZSgnLi9saXN0ZW5lcnMnKTtcblxuZnVuY3Rpb24gRWRnZWhhbmRsZXMoIG9wdGlvbnMgKXtcbiAgbGV0IGN5ID0gb3B0aW9ucy5jeTtcblxuICB0aGlzLmN5ID0gY3k7XG4gIHRoaXMubGlzdGVuZXJzID0gW107XG5cbiAgLy8gZWRnZWhhbmRsZXMgZ2VzdHVyZSBzdGF0ZVxuICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuICB0aGlzLmRyYXdNb2RlID0gZmFsc2U7XG4gIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gIHRoaXMuZ3JhYmJpbmdOb2RlID0gZmFsc2U7XG5cbiAgLy8gZWRnZWhhbmRsZXMgZWxlbWVudHNcbiAgdGhpcy5oYW5kbGVOb2RlID0gY3kuY29sbGVjdGlvbigpO1xuICB0aGlzLmNsZWFyQ29sbGVjdGlvbnMoKTtcblxuICAvLyBoYW5kbGVcbiAgdGhpcy5oeCA9IDA7XG4gIHRoaXMuaHkgPSAwO1xuICB0aGlzLmhyID0gMDtcblxuICAvLyBtb3VzZSBwb3NpdGlvblxuICB0aGlzLm14ID0gMDtcbiAgdGhpcy5teSA9IDA7XG5cbiAgdGhpcy5vcHRpb25zID0gYXNzaWduKCB7fSwgZGVmYXVsdHMsIG9wdGlvbnMgKTtcblxuICB0aGlzLnNhdmVHZXN0dXJlU3RhdGUoKTtcbiAgdGhpcy5hZGRMaXN0ZW5lcnMoKTtcbn1cblxubGV0IHByb3RvID0gRWRnZWhhbmRsZXMucHJvdG90eXBlID0ge307XG5sZXQgZXh0ZW5kID0gb2JqID0+IGFzc2lnbiggcHJvdG8sIG9iaiApO1xuXG5wcm90by5kZXN0cm95ID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5yZW1vdmVMaXN0ZW5lcnMoKTtcbn07XG5cbnByb3RvLnNldE9wdGlvbnMgPSBmdW5jdGlvbiggb3B0aW9ucyApe1xuICBhc3NpZ24oIHRoaXMub3B0aW9ucywgb3B0aW9ucyApO1xufTtcblxucHJvdG8ubXAgPSBmdW5jdGlvbigpe1xuICByZXR1cm4geyB4OiB0aGlzLm14LCB5OiB0aGlzLm15IH07XG59O1xuXG5wcm90by5ocCA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB7IHg6IHRoaXMuaHgsIHk6IHRoaXMuaHkgfTtcbn07XG5cbnByb3RvLmNsZWFyQ29sbGVjdGlvbnMgPSBmdW5jdGlvbigpe1xuICBsZXQgeyBjeSB9ID0gdGhpcztcblxuICB0aGlzLnByZXZpZXdFbGVzID0gY3kuY29sbGVjdGlvbigpO1xuICB0aGlzLmdob3N0RWxlcyA9IGN5LmNvbGxlY3Rpb24oKTtcbiAgdGhpcy5naG9zdE5vZGUgPSBjeS5jb2xsZWN0aW9uKCk7XG4gIHRoaXMuc291cmNlTm9kZSA9IGN5LmNvbGxlY3Rpb24oKTtcbiAgdGhpcy50YXJnZXROb2RlID0gY3kuY29sbGVjdGlvbigpO1xuICB0aGlzLnByZXN1bXB0aXZlVGFyZ2V0cyA9IGN5LmNvbGxlY3Rpb24oKTtcbn07XG5cbltcbiAgY3lHZXN0dXJlc1RvZ2dsZSxcbiAgY3lMaXN0ZW5lcnMsXG4gIGRyYXdNb2RlLFxuICBkcmF3aW5nLFxuICBlbmFibGluZyxcbiAgZ2VzdHVyZUxpZmVjeWNsZSxcbiAgbGlzdGVuZXJzXG5dLmZvckVhY2goIGV4dGVuZCApO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVkZ2VoYW5kbGVzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VkZ2VoYW5kbGVzL2luZGV4LmpzIiwiZnVuY3Rpb24gYWRkTGlzdGVuZXJzKCl7XG4gIHRoaXMuYWRkQ3l0b3NjYXBlTGlzdGVuZXJzKCk7XG5cbiAgdGhpcy5hZGRMaXN0ZW5lciggdGhpcy5jeSwgJ2Rlc3Ryb3knLCAoKSA9PiB0aGlzLmRlc3Ryb3koKSApO1xuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiByZW1vdmVMaXN0ZW5lcnMoKXtcbiAgZm9yKCBsZXQgaSA9IHRoaXMubGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tICl7XG4gICAgbGV0IGwgPSB0aGlzLmxpc3RlbmVyc1tpXTtcblxuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoIGwudGFyZ2V0LCBsLmV2ZW50LCBsLnNlbGVjdG9yLCBsLmNhbGxiYWNrLCBsLm9wdGlvbnMgKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBnZXRMaXN0ZW5lciggdGFyZ2V0LCBldmVudCwgc2VsZWN0b3IsIGNhbGxiYWNrLCBvcHRpb25zICl7XG4gIGlmKCB0eXBlb2Ygc2VsZWN0b3IgIT09IHR5cGVvZiAnJyApe1xuICAgIGNhbGxiYWNrID0gc2VsZWN0b3I7XG4gICAgb3B0aW9ucyA9IGNhbGxiYWNrO1xuICAgIHNlbGVjdG9yID0gbnVsbDtcbiAgfVxuXG4gIGlmKCBvcHRpb25zID09IG51bGwgKXtcbiAgICBvcHRpb25zID0gZmFsc2U7XG4gIH1cblxuICByZXR1cm4geyB0YXJnZXQsIGV2ZW50LCBzZWxlY3RvciwgY2FsbGJhY2ssIG9wdGlvbnMgfTtcbn1cblxuZnVuY3Rpb24gaXNEb20oIHRhcmdldCApe1xuICByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gYWRkTGlzdGVuZXIoIHRhcmdldCwgZXZlbnQsIHNlbGVjdG9yLCBjYWxsYmFjaywgb3B0aW9ucyApe1xuICBsZXQgbCA9IGdldExpc3RlbmVyKCB0YXJnZXQsIGV2ZW50LCBzZWxlY3RvciwgY2FsbGJhY2ssIG9wdGlvbnMgKTtcblxuICB0aGlzLmxpc3RlbmVycy5wdXNoKCBsICk7XG5cbiAgaWYoIGlzRG9tKCBsLnRhcmdldCApICl7XG4gICAgbC50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lciggbC5ldmVudCwgbC5jYWxsYmFjaywgbC5vcHRpb25zICk7XG4gIH0gZWxzZSB7XG4gICAgaWYoIGwuc2VsZWN0b3IgKXtcbiAgICAgIGwudGFyZ2V0LmFkZExpc3RlbmVyKCBsLmV2ZW50LCBsLnNlbGVjdG9yLCBsLmNhbGxiYWNrLCBsLm9wdGlvbnMgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbC50YXJnZXQuYWRkTGlzdGVuZXIoIGwuZXZlbnQsIGwuY2FsbGJhY2ssIGwub3B0aW9ucyApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiByZW1vdmVMaXN0ZW5lciggdGFyZ2V0LCBldmVudCwgc2VsZWN0b3IsIGNhbGxiYWNrLCBvcHRpb25zICl7XG4gIGxldCBsID0gZ2V0TGlzdGVuZXIoIHRhcmdldCwgZXZlbnQsIHNlbGVjdG9yLCBjYWxsYmFjaywgb3B0aW9ucyApO1xuXG4gIGZvciggbGV0IGkgPSB0aGlzLmxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSApe1xuICAgIGxldCBsMiA9IHRoaXMubGlzdGVuZXJzW2ldO1xuXG4gICAgaWYoXG4gICAgICBsLnRhcmdldCA9PT0gbDIudGFyZ2V0XG4gICAgICAmJiBsLmV2ZW50ID09PSBsMi5ldmVudFxuICAgICAgJiYgKCBsLnNlbGVjdG9yID09IG51bGwgfHwgbC5zZWxlY3RvciA9PT0gbDIuc2VsZWN0b3IgKVxuICAgICAgJiYgKCBsLmNhbGxiYWNrID09IG51bGwgfHwgbC5jYWxsYmFjayA9PT0gbDIuY2FsbGJhY2sgKVxuICAgICl7XG4gICAgICB0aGlzLmxpc3RlbmVycy5zcGxpY2UoIGksIDEgKTtcblxuICAgICAgaWYoIGlzRG9tKCBsLnRhcmdldCApICl7XG4gICAgICAgIGwudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoIGwuZXZlbnQsIGwuY2FsbGJhY2ssIGwub3B0aW9ucyApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYoIGwuc2VsZWN0b3IgKXtcbiAgICAgICAgICBsLnRhcmdldC5yZW1vdmVMaXN0ZW5lciggbC5ldmVudCwgbC5zZWxlY3RvciwgbC5jYWxsYmFjaywgbC5vcHRpb25zICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbC50YXJnZXQucmVtb3ZlTGlzdGVuZXIoIGwuZXZlbnQsIGwuY2FsbGJhY2ssIGwub3B0aW9ucyApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBlbWl0KCB0eXBlLCBwb3NpdGlvbiwgLi4uYXJncyApe1xuICBsZXQgeyBvcHRpb25zLCBjeSB9ID0gdGhpcztcblxuICBjeS5lbWl0KCB7IHR5cGUsIHBvc2l0aW9uIH0sIGFyZ3MgKTtcblxuICBvcHRpb25zWyB0eXBlIF0oIC4uLmFyZ3MgKTtcblxuICByZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IGFkZExpc3RlbmVyLCBhZGRMaXN0ZW5lcnMsIHJlbW92ZUxpc3RlbmVyLCByZW1vdmVMaXN0ZW5lcnMsIGVtaXQgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lZGdlaGFuZGxlcy9saXN0ZW5lcnMuanMiLCJjb25zdCBpbXBsID0gcmVxdWlyZSgnLi9jb3JlJyk7XG5cbi8vIHJlZ2lzdGVycyB0aGUgZXh0ZW5zaW9uIG9uIGEgY3l0b3NjYXBlIGxpYiByZWZcbmxldCByZWdpc3RlciA9IGZ1bmN0aW9uKCBjeXRvc2NhcGUgKXtcbiAgaWYoICFjeXRvc2NhcGUgKXsgcmV0dXJuOyB9IC8vIGNhbid0IHJlZ2lzdGVyIGlmIGN5dG9zY2FwZSB1bnNwZWNpZmllZFxuXG4gIGN5dG9zY2FwZSggJ2NvcmUnLCAnZWRnZWhhbmRsZXMnLCBpbXBsICk7IC8vIHJlZ2lzdGVyIHdpdGggY3l0b3NjYXBlLmpzXG59O1xuXG5pZiggdHlwZW9mIGN5dG9zY2FwZSAhPT0gJ3VuZGVmaW5lZCcgKXsgLy8gZXhwb3NlIHRvIGdsb2JhbCBjeXRvc2NhcGUgKGkuZS4gd2luZG93LmN5dG9zY2FwZSlcbiAgcmVnaXN0ZXIoIGN5dG9zY2FwZSApOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVnaXN0ZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9