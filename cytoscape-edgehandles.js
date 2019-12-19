(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash.memoize"), require("lodash.throttle"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash.memoize", "lodash.throttle"], factory);
	else if(typeof exports === 'object')
		exports["cytoscapeEdgehandles"] = factory(require("lodash.memoize"), require("lodash.throttle"));
	else
		root["cytoscapeEdgehandles"] = factory(root["_"]["memoize"], root["_"]["throttle"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_lodash_memoize__, __WEBPACK_EXTERNAL_MODULE_lodash_throttle__) {
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assign.js":
/*!***********************!*\
  !*** ./src/assign.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Simple, internal Object.assign() polyfill for options objects etc.
/* harmony default export */ __webpack_exports__["default"] = (Object.assign != null ? Object.assign.bind(Object) : function (t) {
  for (var _len = arguments.length, srcs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    srcs[_key - 1] = arguments[_key];
  }

  srcs.filter(function (src) {
    return src != null;
  }).forEach(function (src) {
    Object.keys(src).forEach(function (k) {
      return t[k] = src[k];
    });
  });
  return t;
});

/***/ }),

/***/ "./src/core.js":
/*!*********************!*\
  !*** ./src/core.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _edgehandles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./edgehandles */ "./src/edgehandles/index.js");

/* harmony default export */ __webpack_exports__["default"] = (function (options) {
  var cy = this;

  if (options && options.hasOwnProperty('handleNodes')) {
    options.selector = options.handleNodes;
    delete options.handleNodes;
  }

  return new _edgehandles__WEBPACK_IMPORTED_MODULE_0__["default"](cy, options);
});

/***/ }),

/***/ "./src/edgehandles/cy-gestures-toggle.js":
/*!***********************************************!*\
  !*** ./src/edgehandles/cy-gestures-toggle.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function disableGestures() {
  this.saveGestureState();
  this.cy.zoomingEnabled(false).panningEnabled(false).boxSelectionEnabled(false);

  if (this.options.disableBrowserGestures) {
    var wlOpts = this.windowListenerOptions;
    window.addEventListener('touchstart', this.preventDefault, wlOpts);
    window.addEventListener('touchmove', this.preventDefault, wlOpts);
    window.addEventListener('wheel', this.preventDefault, wlOpts);
  }

  return this;
}

function resetGestures() {
  this.cy.zoomingEnabled(this.lastZoomingEnabled).panningEnabled(this.lastPanningEnabled).boxSelectionEnabled(this.lastBoxSelectionEnabled);

  if (this.options.disableBrowserGestures) {
    var wlOpts = this.windowListenerOptions;
    window.removeEventListener('touchstart', this.preventDefault, wlOpts);
    window.removeEventListener('touchmove', this.preventDefault, wlOpts);
    window.removeEventListener('wheel', this.preventDefault, wlOpts);
  }

  return this;
}

function saveGestureState() {
  var cy = this.cy;
  this.lastPanningEnabled = cy.panningEnabled();
  this.lastZoomingEnabled = cy.zoomingEnabled();
  this.lastBoxSelectionEnabled = cy.boxSelectionEnabled();
  return this;
}

/* harmony default export */ __webpack_exports__["default"] = ({
  disableGestures: disableGestures,
  resetGestures: resetGestures,
  saveGestureState: saveGestureState
});

/***/ }),

/***/ "./src/edgehandles/cy-listeners.js":
/*!*****************************************!*\
  !*** ./src/edgehandles/cy-listeners.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function addCytoscapeListeners() {
  var _this = this;

  var cy = this.cy,
      options = this.options; // grabbing nodes

  this.addListener(cy, 'drag', function () {
    return _this.grabbingNode = true;
  });
  this.addListener(cy, 'free', function () {
    return _this.grabbingNode = false;
  }); // show handle on hover

  this.addListener(cy, 'mouseover', 'node', function (e) {
    _this.show(e.target);
  }); // show handle on tap node

  this.addListener(cy, 'tap', 'node', function (e) {
    _this.show(e.target);
  }); // hide handle when any node moved

  this.addListener(cy, 'position', 'node', function () {
    _this.hide();
  }); // start on tapstart handle
  // start on tapstart node (draw mode)
  // toggle on source node

  this.addListener(cy, 'tapstart', 'node', function (e) {
    var node = e.target;

    if (node.anySame(_this.handleNodes)) {
      _this.handleNode = node.intersection(_this.handleNodes);

      _this.start(_this.sourceNode);
    } else if (_this.drawMode) {
      _this.start(node);
    } else if (node.same(_this.sourceNode)) {
      _this.hide();
    }
  }); // update line on drag

  this.addListener(cy, 'tapdrag', function (e) {
    _this.update(e.position);
  }); // hover over preview

  this.addListener(cy, 'tapdragover', 'node', function (e) {
    // then ignore events like mouseover
    if (!options.snap) {
      _this.preview(e.target);
    }
  }); // hover out unpreview

  this.addListener(cy, 'tapdragout', 'node', function (e) {
    // then keep the preview
    if (!options.snap) {
      _this.unpreview(e.target);
    }
  }); // stop gesture on tapend

  this.addListener(cy, 'tapend', function () {
    _this.stop();
  }); // hide handle if source node is removed

  this.addListener(cy, 'remove', function (e) {
    if (e.target.same(_this.sourceNode)) {
      _this.hide();
    }
  });
  return this;
}

/* harmony default export */ __webpack_exports__["default"] = ({
  addCytoscapeListeners: addCytoscapeListeners
});

/***/ }),

/***/ "./src/edgehandles/defaults.js":
/*!*************************************!*\
  !*** ./src/edgehandles/defaults.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* eslint-disable no-unused-vars */
var defaults = {
  selector: 'node',
  // selector/filter function for whether edges can be made from a given node
  preview: true,
  // whether to show added edges preview before releasing selection
  hoverDelay: 150,
  // time spent hovering over a target node before it is considered selected
  snap: false,
  // when enabled, the edge can be drawn by just moving close to a target node (can be confusing on compound graphs)
  snapThreshold: 50,
  // the target node must be less than or equal to this many pixels away from the cursor/finger
  snapFrequency: 15,
  // the number of times per second (Hz) that snap checks done (lower is less expensive)
  noEdgeEventsInDraw: false,
  // set events:no to edges during draws, prevents mouseouts on compounds
  disableBrowserGestures: true,
  // during an edge drawing gesture, disable browser gestures such as two-finger trackpad swipe and pinch-to-zoom
  handleParams: function handleParams(node) {
    // returns array of elements to be passed to cy.add() for the handle nodes
    // (default classes are always added for you)
    return [{}];
  },
  handlePosition: function handlePosition(node) {
    return 'middle top'; // sets the position of the handle in the format of "X-AXIS Y-AXIS" such as "left top", "middle top"
  },
  handleInDrawMode: false,
  // whether to show the handle in draw mode
  edgeType: function edgeType(sourceNode, targetNode, handleNode) {
    // can return 'flat' for flat edges between nodes or 'node' for intermediate node between them
    // returning null/undefined means an edge can't be added between the two nodes
    return 'flat';
  },
  loopAllowed: function loopAllowed(node, handleNode) {
    // for the specified node, return whether edges from itself to itself are allowed
    return false;
  },
  nodeLoopOffset: -50,
  // offset for edgeType: 'node' loops
  nodeParams: function nodeParams(sourceNode, targetNode, handleNode) {
    // for node between the specified source and target
    // return element object to be passed to cy.add() for intermediary node
    return {};
  },
  edgeParams: function edgeParams(sourceNode, targetNode, i, handleNode) {
    // for edges between the specified source and target
    // return element object to be passed to cy.add() for edge
    // NB: i indicates edge index in case of edgeType: 'node'
    return {};
  },
  ghostEdgeParams: function ghostEdgeParams(sourceNode, handleNode) {
    // return element object to be passed to cy.add() for the ghost edge
    // (default classes are always added for you)
    return {};
  },
  show: function show(sourceNode, handleNodes) {// fired when handles is shown
  },
  hide: function hide(sourceNode) {// fired when the handles is hidden
  },
  start: function start(sourceNode, handleNode) {// fired when edgehandles interaction starts (drag on handle)
  },
  complete: function complete(sourceNode, targetNode, addedEles) {// fired when edgehandles is done and elements are added
  },
  stop: function stop(sourceNode) {// fired when edgehandles interaction is stopped (either complete with added edges or incomplete)
  },
  cancel: function cancel(sourceNode, cancelledTargets) {// fired when edgehandles are cancelled (incomplete gesture)
  },
  hoverover: function hoverover(sourceNode, targetNode) {// fired when a target is hovered
  },
  hoverout: function hoverout(sourceNode, targetNode) {// fired when a target isn't hovered anymore
  },
  previewon: function previewon(sourceNode, targetNode, previewEles) {// fired when preview is shown
  },
  previewoff: function previewoff(sourceNode, targetNode, previewEles) {// fired when preview is hidden
  },
  drawon: function drawon() {// fired when draw mode enabled
  },
  drawoff: function drawoff() {// fired when draw mode disabled
  }
};
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (defaults);

/***/ }),

/***/ "./src/edgehandles/draw-mode.js":
/*!**************************************!*\
  !*** ./src/edgehandles/draw-mode.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = ({
  toggleDrawMode: toggleDrawMode,
  enableDrawMode: enableDrawMode,
  disableDrawMode: disableDrawMode
});

/***/ }),

/***/ "./src/edgehandles/drawing.js":
/*!************************************!*\
  !*** ./src/edgehandles/drawing.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assign */ "./src/assign.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



var isArray = function isArray(obj) {
  return Array.isArray ? Array.isArray(obj) : obj != null && obj instanceof Array;
};

function makeEdges() {
  var preview = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  // can't make edges outside of regular gesture lifecycle
  if (!this.active) {
    return;
  }

  var cy = this.cy,
      options = this.options,
      presumptiveTargets = this.presumptiveTargets,
      previewEles = this.previewEles; // can't make preview if disabled

  if (preview && !options.preview) {
    return;
  }

  var sourceNode = this.sourceNode,
      targetNode = this.targetNode,
      handleNode = this.handleNode; // detect cancel

  if (!targetNode || targetNode.empty()) {
    this.removePreview();
    this.emit('cancel', this.mp(), sourceNode, presumptiveTargets);
    return;
  } // just remove preview class if we already have the edges


  if (!preview && previewEles.nonempty()) {
    cy.startBatch();
    previewEles.removeClass('eh-preview').removeStyle('events');
    cy.endBatch();
    this.emit('complete', this.mp(), sourceNode, targetNode, previewEles);
    return;
  }

  var edgeType = options.edgeType(sourceNode, targetNode, handleNode); // must have a non-empty edge type

  if (!edgeType) {
    return;
  }

  var p;
  var p1 = sourceNode.position();
  var p2 = targetNode.position();

  if (sourceNode.same(targetNode)) {
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

  var added = cy.collection();
  var edgeParams = options.edgeParams(sourceNode, targetNode, 0, handleNode);
  cy.startBatch();

  if (edgeType === 'node') {
    var interNodeParams = options.nodeParams(sourceNode, targetNode, handleNode);
    var edgeParams2 = options.edgeParams(sourceNode, targetNode, 1, handleNode);
    var interNode = cy.add(Object(_assign__WEBPACK_IMPORTED_MODULE_0__["default"])({}, interNodeParams, {
      group: 'nodes',
      position: p
    }));
    var sourceEdge = cy.add(Object(_assign__WEBPACK_IMPORTED_MODULE_0__["default"])({}, edgeParams, {
      group: 'edges',
      data: Object(_assign__WEBPACK_IMPORTED_MODULE_0__["default"])({}, edgeParams.data, {
        source: sourceNode.id(),
        target: interNode.id()
      })
    }));
    var targetEdge = cy.add(Object(_assign__WEBPACK_IMPORTED_MODULE_0__["default"])({}, edgeParams2, {
      group: 'edges',
      data: Object(_assign__WEBPACK_IMPORTED_MODULE_0__["default"])({}, edgeParams2.data, {
        source: interNode.id(),
        target: targetNode.id()
      })
    }));
    added = added.merge(interNode).merge(sourceEdge).merge(targetEdge);
  } else {
    // flat
    added = cy.add(Object(_assign__WEBPACK_IMPORTED_MODULE_0__["default"])({}, edgeParams, {
      group: 'edges',
      data: Object(_assign__WEBPACK_IMPORTED_MODULE_0__["default"])({}, edgeParams.data, {
        source: sourceNode.id(),
        target: targetNode.id()
      })
    }));
  }

  if (preview) {
    added.style('events', 'no');
    added.addClass('eh-preview');
    this.previewEles = added;
  }

  cy.endBatch();

  if (!preview) {
    this.emit('complete', this.mp(), sourceNode, targetNode, added);
  }

  return this;
}

function makePreview() {
  this.makeEdges(true);
  return this;
}

function removePreview() {
  if (this.previewEles.nonempty()) {
    this.previewEles.remove();
    this.previewEles = this.cy.collection();
  }

  return this;
}

function handleShown() {
  return this.handleNodes.nonempty();
}

function handlePosition(node) {
  var options = this.options;
  var handlePosition = _typeof(options.handlePosition) === _typeof('') ? function () {
    return options.handlePosition;
  } : options.handlePosition;
  var p = node.position();
  var h = node.outerHeight();
  var w = node.outerWidth(); // store how much we should move the handle from origin(p.x, p.y)

  var moveX = 0;
  var moveY = 0; // grab axes

  var axes = handlePosition(node).toLowerCase().split(/\s+/);
  var axisX = axes[0];
  var axisY = axes[1]; // based on handlePosition move left/right/top/bottom. Middle/middle will just be normal

  if (axisX === 'left') {
    moveX = -(w / 2);
  } else if (axisX === 'right') {
    moveX = w / 2;
  }

  if (axisY === 'top') {
    moveY = -(h / 2);
  } else if (axisY === 'bottom') {
    moveY = h / 2;
  } // set handle x and y based on adjusted positions


  var hx = p.x + moveX;
  var hy = p.y + moveY;
  return {
    x: hx,
    y: hy
  };
}

function makeHandles(node) {
  var options = this.options,
      cy = this.cy;
  var handleParams = options.handleParams(node);

  if (!isArray(handleParams)) {
    handleParams = [handleParams];
  }

  var handles = [];

  for (var i = 0; i < handleParams.length; i++) {
    var handle = Object(_assign__WEBPACK_IMPORTED_MODULE_0__["default"])({}, handleParams[i], {
      group: 'nodes',
      grabbable: false,
      selectable: false
    });

    if (!handle.hasOwnProperty('position')) {
      handle.position = this.handlePosition(node);
    }

    handles.push(handle);
  }

  cy.startBatch();
  this.hide();
  this.handleNodes = cy.add(handles);
  this.handleNodes.addClass('eh-handle');
  cy.endBatch();
  return this;
}

function updateEdge() {
  var sourceNode = this.sourceNode,
      ghostNode = this.ghostNode;
  var x = this.mx;
  var y = this.my; // can't draw a line without having the starting node

  if (!sourceNode) {
    return;
  }

  if (ghostNode.empty() || ghostNode.removed()) {
    var handleNode = this.handleNode,
        options = this.options,
        cy = this.cy;
    var ghostEdge, ghostEles;
    cy.startBatch();
    ghostNode = this.ghostNode = cy.add({
      group: 'nodes',
      classes: 'eh-ghost eh-ghost-node',
      position: {
        x: x,
        y: y
      }
    });
    ghostNode.style({
      'background-color': 'blue',
      'width': 0.0001,
      'height': 0.0001,
      'opacity': 0,
      'events': 'no'
    });
    var ghostEdgeParams = options.ghostEdgeParams(sourceNode, handleNode);
    ghostEdge = cy.add(Object(_assign__WEBPACK_IMPORTED_MODULE_0__["default"])({}, ghostEdgeParams, {
      group: 'edges',
      data: Object(_assign__WEBPACK_IMPORTED_MODULE_0__["default"])({}, ghostEdgeParams.data, {
        source: sourceNode.id(),
        target: ghostNode.id()
      })
    }));
    ghostEdge.addClass('eh-ghost eh-ghost-edge');
    ghostEdge.style('events', 'no');
    ghostEles = this.ghostEles = cy.collection();
    ghostEles.merge(ghostNode).merge(ghostEdge);
    cy.endBatch();
  } else {
    this.ghostNode.position({
      x: x,
      y: y
    });
  }

  return this;
}

/* harmony default export */ __webpack_exports__["default"] = ({
  makeEdges: makeEdges,
  makePreview: makePreview,
  removePreview: removePreview,
  updateEdge: updateEdge,
  handleShown: handleShown,
  handlePosition: handlePosition,
  makeHandles: makeHandles
});

/***/ }),

/***/ "./src/edgehandles/edge-events-toggle.js":
/*!***********************************************!*\
  !*** ./src/edgehandles/edge-events-toggle.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function disableEdgeEvents() {
  if (this.options.noEdgeEventsInDraw) {
    this.cy.edges().style('events', 'no');
  }

  return this;
}

function enableEdgeEvents() {
  if (this.options.noEdgeEventsInDraw) {
    this.cy.edges().removeStyle('events');
  }

  return this;
}

/* harmony default export */ __webpack_exports__["default"] = ({
  disableEdgeEvents: disableEdgeEvents,
  enableEdgeEvents: enableEdgeEvents
});

/***/ }),

/***/ "./src/edgehandles/enabling.js":
/*!*************************************!*\
  !*** ./src/edgehandles/enabling.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = ({
  enable: enable,
  disable: disable
});

/***/ }),

/***/ "./src/edgehandles/gesture-lifecycle.js":
/*!**********************************************!*\
  !*** ./src/edgehandles/gesture-lifecycle.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_memoize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash.memoize */ "lodash.memoize");
/* harmony import */ var lodash_memoize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_memoize__WEBPACK_IMPORTED_MODULE_0__);

var sqrt2 = Math.sqrt(2);

function canStartOn(node) {
  var options = this.options,
      previewEles = this.previewEles,
      ghostEles = this.ghostEles,
      handleNodes = this.handleNodes;

  var isPreview = function isPreview(el) {
    return previewEles.anySame(el);
  };

  var isHandle = function isHandle(el) {
    return handleNodes.anySame(el);
  };

  var isGhost = function isGhost(el) {
    return ghostEles.anySame(el);
  };

  var isTemp = function isTemp(el) {
    return isPreview(el) || isHandle(el) || isGhost(el);
  };

  var userFilter = function userFilter(el) {
    return el.filter(options.selector).nonempty();
  };

  var enabled = this.enabled,
      active = this.active,
      grabbingNode = this.grabbingNode;
  return enabled && !active && !grabbingNode && node != null && node.inside() && !isTemp(node) && userFilter(node);
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

  if (!this.canStartOn(node) || drawMode && !options.handleInDrawMode || this.sourceNode === node) {
    return;
  }

  this.sourceNode = node;
  this.makeHandles(node);

  if (this.handleNodes.nonempty()) {
    this.emit('show', this.mp(), this.sourceNode, this.handleNodes);
  }

  return this;
}

function hide() {
  if (this.handleNodes.nonempty()) {
    this.handleNodes.remove();
    this.handleNodes = this.cy.collection();
    this.emit('hide', this.mp(), this.sourceNode);
  }

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
  this.disableEdgeEvents();
  this.emit('start', this.mp(), node, this.handleNode);
}

function update(pos) {
  if (!this.active) {
    return;
  }

  var p = pos;
  this.mx = p.x;
  this.my = p.y;
  this.updateEdge();
  this.throttledSnap();
  return this;
}

function snap() {
  if (!this.active || !this.options.snap) {
    return false;
  }

  var cy = this.cy;
  var target = this.targetNode;
  var threshold = this.options.snapThreshold;
  var mousePos = this.mp();
  var handleNode = this.handleNode,
      previewEles = this.previewEles,
      ghostNode = this.ghostNode;

  var radius = function radius(n) {
    return sqrt2 * Math.max(n.outerWidth(), n.outerHeight()) / 2;
  }; // worst-case enclosure of bb by circle


  var sqDist = function sqDist(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return dx * dx + dy * dy;
  };

  var sqDistByPt = function sqDistByPt(p1, p2) {
    return sqDist(p1.x, p1.y, p2.x, p2.y);
  };

  var nodeSqDist = function nodeSqDist(n) {
    return sqDistByPt(n.position(), mousePos);
  };

  var sqThreshold = function sqThreshold(n) {
    var r = radius(n);
    var t = r + threshold;
    return t * t;
  };

  var isWithinTheshold = function isWithinTheshold(n) {
    return nodeSqDist(n) <= sqThreshold(n);
  };

  var bbSqDist = function bbSqDist(n) {
    var p = n.position();
    var halfW = n.outerWidth() / 2;
    var halfH = n.outerHeight() / 2; // node and mouse positions, line is formed from node to mouse

    var nx = p.x;
    var ny = p.y;
    var mx = mousePos.x;
    var my = mousePos.y; // bounding box

    var x1 = nx - halfW;
    var x2 = nx + halfW;
    var y1 = ny - halfH;
    var y2 = ny + halfH;
    var insideXBounds = x1 <= mx && mx <= x2;
    var insideYBounds = y1 <= my && my <= y2;

    if (insideXBounds && insideYBounds) {
      // inside box
      return 0;
    } else if (insideXBounds) {
      // perpendicular distance to box, top or bottom
      var dy1 = my - y1;
      var dy2 = my - y2;
      return Math.min(dy1 * dy1, dy2 * dy2);
    } else if (insideYBounds) {
      // perpendicular distance to box, left or right
      var dx1 = mx - x1;
      var dx2 = mx - x2;
      return Math.min(dx1 * dx1, dx2 * dx2);
    } else if (mx < x1 && my < y1) {
      // top-left corner distance
      return sqDist(mx, my, x1, y1);
    } else if (mx > x2 && my < y1) {
      // top-right corner distance
      return sqDist(mx, my, x2, y1);
    } else if (mx < x1 && my > y2) {
      // bottom-left corner distance
      return sqDist(mx, my, x1, y2);
    } else {
      // bottom-right corner distance
      return sqDist(mx, my, x2, y2);
    }
  };

  var cmpBbSqDist = function cmpBbSqDist(n1, n2) {
    return bbSqDist(n1) - bbSqDist(n2);
  };

  var cmp = cmpBbSqDist;
  var allowHoverDelay = false;

  var mouseIsInside = function mouseIsInside(n) {
    var mp = mousePos;
    var w = n.outerWidth();
    var halfW = w / 2;
    var h = n.outerHeight();
    var halfH = h / 2;
    var p = n.position();
    var x1 = p.x - halfW;
    var x2 = p.x + halfW;
    var y1 = p.y - halfH;
    var y2 = p.y + halfH;
    return x1 <= mp.x && mp.x <= x2 && y1 <= mp.y && mp.y <= y2;
  };

  var isEhEle = function isEhEle(n) {
    return n.same(handleNode) || n.same(previewEles) || n.same(ghostNode);
  };

  var nodesByDist = cy.nodes(function (n) {
    return !isEhEle(n) && isWithinTheshold(n);
  }).sort(cmp);
  var snapped = false;

  if (target.nonempty() && !isWithinTheshold(target)) {
    this.unpreview(target);
  }

  for (var i = 0; i < nodesByDist.length; i++) {
    var n = nodesByDist[i]; // skip a parent node when the mouse is inside it

    if (n.isParent() && mouseIsInside(n)) {
      continue;
    } // skip a child node when the mouse is not inside the parent


    if (n.isChild() && !mouseIsInside(n.parent())) {
      continue;
    }

    if (n.same(target) || this.preview(n, allowHoverDelay)) {
      snapped = true;
      break;
    }
  }

  return snapped;
}

function preview(target) {
  var _this = this;

  var allowHoverDelay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var options = this.options,
      sourceNode = this.sourceNode,
      ghostNode = this.ghostNode,
      handleNode = this.handleNode,
      ghostEles = this.ghostEles,
      presumptiveTargets = this.presumptiveTargets,
      previewEles = this.previewEles,
      active = this.active;
  var source = sourceNode;
  var isLoop = target.same(source);
  var loopAllowed = options.loopAllowed(target, handleNode);
  var isGhost = target.same(ghostNode);
  var noEdge = !options.edgeType(source, target, handleNode);
  var isHandle = target.anySame(this.handleNodes);
  var isExistingTgt = target.same(this.targetNode);

  if (!active || isHandle || isGhost || noEdge || isExistingTgt || isLoop && !loopAllowed) {
    return false;
  }

  if (this.targetNode.nonempty()) {
    this.unpreview(this.targetNode);
  }

  clearTimeout(this.previewTimeout);

  var applyPreview = function applyPreview() {
    _this.targetNode = target;
    presumptiveTargets.merge(target);
    target.addClass('eh-presumptive-target');
    target.addClass('eh-target');

    _this.emit('hoverover', _this.mp(), source, target);

    if (options.preview) {
      target.addClass('eh-preview');
      ghostEles.addClass('eh-preview-active');
      sourceNode.addClass('eh-preview-active');
      target.addClass('eh-preview-active');

      _this.makePreview();

      _this.emit('previewon', _this.mp(), source, target, previewEles);
    }
  };

  if (allowHoverDelay && options.hoverDelay > 0) {
    this.previewTimeout = setTimeout(applyPreview, options.hoverDelay);
  } else {
    applyPreview();
  }

  return true;
}

function unpreview(target) {
  if (!this.active || target.anySame(this.handleNodes)) {
    return;
  }

  var ghostEles = this.ghostEles,
      previewEles = this.previewEles,
      cy = this.cy;
  var source = this.sourceNode;
  clearTimeout(this.previewTimeout);
  this.previewTimeout = null;
  source.removeClass('eh-preview-active');
  target.removeClass('eh-preview-active eh-preview eh-target eh-presumptive-target');
  ghostEles.removeClass('eh-preview-active');
  this.targetNode = cy.collection();
  this.removePreview();
  this.emit('hoverout', this.mp(), source, target);
  this.emit('previewoff', this.mp(), source, target, previewEles);
  return this;
}

function stop() {
  if (!this.active) {
    return;
  }

  var sourceNode = this.sourceNode;
  clearTimeout(this.previewTimeout);
  this.sourceNode.removeClass('eh-source');
  this.targetNode.removeClass('eh-target eh-preview eh-hover');
  this.presumptiveTargets.removeClass('eh-presumptive-target');
  this.ghostEles.remove();
  this.hide();
  this.makeEdges();
  this.clearCollections();
  this.resetGestures();
  this.enableEdgeEvents();
  this.active = false;
  this.emit('stop', this.mp(), sourceNode);
  return this;
}

/* harmony default export */ __webpack_exports__["default"] = ({
  show: show,
  hide: hide,
  start: start,
  update: update,
  preview: preview,
  unpreview: unpreview,
  stop: stop,
  snap: snap,
  canStartOn: canStartOn,
  canStartDrawModeOn: canStartDrawModeOn,
  canStartNonDrawModeOn: canStartNonDrawModeOn
});

/***/ }),

/***/ "./src/edgehandles/index.js":
/*!**********************************!*\
  !*** ./src/edgehandles/index.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _defaults__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaults */ "./src/edgehandles/defaults.js");
/* harmony import */ var _assign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assign */ "./src/assign.js");
/* harmony import */ var lodash_throttle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash.throttle */ "lodash.throttle");
/* harmony import */ var lodash_throttle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_throttle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _cy_gestures_toggle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cy-gestures-toggle */ "./src/edgehandles/cy-gestures-toggle.js");
/* harmony import */ var _cy_listeners__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cy-listeners */ "./src/edgehandles/cy-listeners.js");
/* harmony import */ var _draw_mode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./draw-mode */ "./src/edgehandles/draw-mode.js");
/* harmony import */ var _drawing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./drawing */ "./src/edgehandles/drawing.js");
/* harmony import */ var _enabling__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./enabling */ "./src/edgehandles/enabling.js");
/* harmony import */ var _gesture_lifecycle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./gesture-lifecycle */ "./src/edgehandles/gesture-lifecycle.js");
/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./listeners */ "./src/edgehandles/listeners.js");
/* harmony import */ var _edge_events_toggle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./edge-events-toggle */ "./src/edgehandles/edge-events-toggle.js");












function Edgehandles(cy, options) {
  this.cy = cy;
  this.listeners = []; // edgehandles gesture state

  this.enabled = true;
  this.drawMode = false;
  this.active = false;
  this.grabbingNode = false; // edgehandles elements

  this.handleNodes = cy.collection();
  this.clearCollections(); // mouse position

  this.mx = 0;
  this.my = 0;
  this.options = Object(_assign__WEBPACK_IMPORTED_MODULE_1__["default"])({}, _defaults__WEBPACK_IMPORTED_MODULE_0__["default"], options);
  this.saveGestureState();
  this.addListeners();
  this.throttledSnap = lodash_throttle__WEBPACK_IMPORTED_MODULE_2___default()(this.snap.bind(this), 1000 / this.options.snapFrequency);

  this.preventDefault = function (e) {
    return e.preventDefault();
  };

  var supportsPassive = false;

  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function get() {
        supportsPassive = true;
        return undefined;
      }
    });
    window.addEventListener('_', null, opts);
  } catch (err) {// empty
  }

  if (supportsPassive) {
    this.windowListenerOptions = {
      capture: true,
      passive: false
    };
  } else {
    this.windowListenerOptions = true;
  }
}

var proto = Edgehandles.prototype = {};

proto.destroy = function () {
  this.removeListeners();
};

proto.setOptions = function (options) {
  Object(_assign__WEBPACK_IMPORTED_MODULE_1__["default"])(this.options, options);
};

proto.mp = function () {
  return {
    x: this.mx,
    y: this.my
  };
};

proto.clearCollections = function () {
  var cy = this.cy;
  this.handleNode = cy.collection();
  this.previewEles = cy.collection();
  this.ghostNode = cy.collection();
  this.ghostEles = cy.collection();
  this.sourceNode = cy.collection();
  this.targetNode = cy.collection();
  this.presumptiveTargets = cy.collection();
};

var extend = function extend(obj) {
  return Object(_assign__WEBPACK_IMPORTED_MODULE_1__["default"])(proto, obj);
};

var fn = [_cy_gestures_toggle__WEBPACK_IMPORTED_MODULE_3__["default"], _cy_listeners__WEBPACK_IMPORTED_MODULE_4__["default"], _draw_mode__WEBPACK_IMPORTED_MODULE_5__["default"], _drawing__WEBPACK_IMPORTED_MODULE_6__["default"], _enabling__WEBPACK_IMPORTED_MODULE_7__["default"], _gesture_lifecycle__WEBPACK_IMPORTED_MODULE_8__["default"], _listeners__WEBPACK_IMPORTED_MODULE_9__["default"], _edge_events_toggle__WEBPACK_IMPORTED_MODULE_10__["default"]];
fn.forEach(extend);
/* harmony default export */ __webpack_exports__["default"] = (Edgehandles);

/***/ }),

/***/ "./src/edgehandles/listeners.js":
/*!**************************************!*\
  !*** ./src/edgehandles/listeners.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
  if (_typeof(selector) !== _typeof('')) {
    callback = selector;
    options = callback;
    selector = null;
  }

  if (options == null) {
    options = false;
  }

  return {
    target: target,
    event: event,
    selector: selector,
    callback: callback,
    options: options
  };
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

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  cy.emit({
    type: "eh".concat(type),
    position: position
  }, args);
  var handler = options[type];

  if (handler != null) {
    handler.apply(void 0, args);
  }

  return this;
}

/* harmony default export */ __webpack_exports__["default"] = ({
  addListener: addListener,
  addListeners: addListeners,
  removeListener: removeListener,
  removeListeners: removeListeners,
  emit: emit
});

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ "./src/core.js");
 // registers the extension on a cytoscape lib ref

var register = function register(cytoscape) {
  if (!cytoscape) {
    return;
  } // can't register if cytoscape unspecified


  cytoscape('core', 'edgehandles', _core__WEBPACK_IMPORTED_MODULE_0__["default"]); // register with cytoscape.js
};

if (typeof cytoscape !== 'undefined') {
  // expose to global cytoscape (i.e. window.cytoscape)
  register(cytoscape); // eslint-disable-line no-undef
}

/* harmony default export */ __webpack_exports__["default"] = (register);

/***/ }),

/***/ "lodash.memoize":
/*!*************************************************************************************************************************!*\
  !*** external {"commonjs":"lodash.memoize","commonjs2":"lodash.memoize","amd":"lodash.memoize","root":["_","memoize"]} ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash_memoize__;

/***/ }),

/***/ "lodash.throttle":
/*!*****************************************************************************************************************************!*\
  !*** external {"commonjs":"lodash.throttle","commonjs2":"lodash.throttle","amd":"lodash.throttle","root":["_","throttle"]} ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash_throttle__;

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jeXRvc2NhcGVFZGdlaGFuZGxlcy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vY3l0b3NjYXBlRWRnZWhhbmRsZXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY3l0b3NjYXBlRWRnZWhhbmRsZXMvLi9zcmMvYXNzaWduLmpzIiwid2VicGFjazovL2N5dG9zY2FwZUVkZ2VoYW5kbGVzLy4vc3JjL2NvcmUuanMiLCJ3ZWJwYWNrOi8vY3l0b3NjYXBlRWRnZWhhbmRsZXMvLi9zcmMvZWRnZWhhbmRsZXMvY3ktZ2VzdHVyZXMtdG9nZ2xlLmpzIiwid2VicGFjazovL2N5dG9zY2FwZUVkZ2VoYW5kbGVzLy4vc3JjL2VkZ2VoYW5kbGVzL2N5LWxpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly9jeXRvc2NhcGVFZGdlaGFuZGxlcy8uL3NyYy9lZGdlaGFuZGxlcy9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9jeXRvc2NhcGVFZGdlaGFuZGxlcy8uL3NyYy9lZGdlaGFuZGxlcy9kcmF3LW1vZGUuanMiLCJ3ZWJwYWNrOi8vY3l0b3NjYXBlRWRnZWhhbmRsZXMvLi9zcmMvZWRnZWhhbmRsZXMvZHJhd2luZy5qcyIsIndlYnBhY2s6Ly9jeXRvc2NhcGVFZGdlaGFuZGxlcy8uL3NyYy9lZGdlaGFuZGxlcy9lZGdlLWV2ZW50cy10b2dnbGUuanMiLCJ3ZWJwYWNrOi8vY3l0b3NjYXBlRWRnZWhhbmRsZXMvLi9zcmMvZWRnZWhhbmRsZXMvZW5hYmxpbmcuanMiLCJ3ZWJwYWNrOi8vY3l0b3NjYXBlRWRnZWhhbmRsZXMvLi9zcmMvZWRnZWhhbmRsZXMvZ2VzdHVyZS1saWZlY3ljbGUuanMiLCJ3ZWJwYWNrOi8vY3l0b3NjYXBlRWRnZWhhbmRsZXMvLi9zcmMvZWRnZWhhbmRsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY3l0b3NjYXBlRWRnZWhhbmRsZXMvLi9zcmMvZWRnZWhhbmRsZXMvbGlzdGVuZXJzLmpzIiwid2VicGFjazovL2N5dG9zY2FwZUVkZ2VoYW5kbGVzLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2N5dG9zY2FwZUVkZ2VoYW5kbGVzL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJsb2Rhc2gubWVtb2l6ZVwiLFwiY29tbW9uanMyXCI6XCJsb2Rhc2gubWVtb2l6ZVwiLFwiYW1kXCI6XCJsb2Rhc2gubWVtb2l6ZVwiLFwicm9vdFwiOltcIl9cIixcIm1lbW9pemVcIl19Iiwid2VicGFjazovL2N5dG9zY2FwZUVkZ2VoYW5kbGVzL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJsb2Rhc2gudGhyb3R0bGVcIixcImNvbW1vbmpzMlwiOlwibG9kYXNoLnRocm90dGxlXCIsXCJhbWRcIjpcImxvZGFzaC50aHJvdHRsZVwiLFwicm9vdFwiOltcIl9cIixcInRocm90dGxlXCJdfSJdLCJuYW1lcyI6WyJPYmplY3QiLCJhc3NpZ24iLCJiaW5kIiwidCIsInNyY3MiLCJmaWx0ZXIiLCJzcmMiLCJmb3JFYWNoIiwia2V5cyIsImsiLCJvcHRpb25zIiwiY3kiLCJoYXNPd25Qcm9wZXJ0eSIsInNlbGVjdG9yIiwiaGFuZGxlTm9kZXMiLCJFZGdlaGFuZGxlcyIsImRpc2FibGVHZXN0dXJlcyIsInNhdmVHZXN0dXJlU3RhdGUiLCJ6b29taW5nRW5hYmxlZCIsInBhbm5pbmdFbmFibGVkIiwiYm94U2VsZWN0aW9uRW5hYmxlZCIsImRpc2FibGVCcm93c2VyR2VzdHVyZXMiLCJ3bE9wdHMiLCJ3aW5kb3dMaXN0ZW5lck9wdGlvbnMiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicHJldmVudERlZmF1bHQiLCJyZXNldEdlc3R1cmVzIiwibGFzdFpvb21pbmdFbmFibGVkIiwibGFzdFBhbm5pbmdFbmFibGVkIiwibGFzdEJveFNlbGVjdGlvbkVuYWJsZWQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWRkQ3l0b3NjYXBlTGlzdGVuZXJzIiwiYWRkTGlzdGVuZXIiLCJncmFiYmluZ05vZGUiLCJlIiwic2hvdyIsInRhcmdldCIsImhpZGUiLCJub2RlIiwiYW55U2FtZSIsImhhbmRsZU5vZGUiLCJpbnRlcnNlY3Rpb24iLCJzdGFydCIsInNvdXJjZU5vZGUiLCJkcmF3TW9kZSIsInNhbWUiLCJ1cGRhdGUiLCJwb3NpdGlvbiIsInNuYXAiLCJwcmV2aWV3IiwidW5wcmV2aWV3Iiwic3RvcCIsImRlZmF1bHRzIiwiaG92ZXJEZWxheSIsInNuYXBUaHJlc2hvbGQiLCJzbmFwRnJlcXVlbmN5Iiwibm9FZGdlRXZlbnRzSW5EcmF3IiwiaGFuZGxlUGFyYW1zIiwiaGFuZGxlUG9zaXRpb24iLCJoYW5kbGVJbkRyYXdNb2RlIiwiZWRnZVR5cGUiLCJ0YXJnZXROb2RlIiwibG9vcEFsbG93ZWQiLCJub2RlTG9vcE9mZnNldCIsIm5vZGVQYXJhbXMiLCJlZGdlUGFyYW1zIiwiaSIsImdob3N0RWRnZVBhcmFtcyIsImNvbXBsZXRlIiwiYWRkZWRFbGVzIiwiY2FuY2VsIiwiY2FuY2VsbGVkVGFyZ2V0cyIsImhvdmVyb3ZlciIsImhvdmVyb3V0IiwicHJldmlld29uIiwicHJldmlld0VsZXMiLCJwcmV2aWV3b2ZmIiwiZHJhd29uIiwiZHJhd29mZiIsInRvZ2dsZURyYXdNb2RlIiwiYm9vbCIsInByZXZVbmdyYWJpZnlTdGF0ZSIsImF1dG91bmdyYWJpZnkiLCJoYW5kbGVTaG93biIsImVtaXQiLCJlbmFibGVEcmF3TW9kZSIsImRpc2FibGVEcmF3TW9kZSIsImlzQXJyYXkiLCJvYmoiLCJBcnJheSIsIm1ha2VFZGdlcyIsImFjdGl2ZSIsInByZXN1bXB0aXZlVGFyZ2V0cyIsImVtcHR5IiwicmVtb3ZlUHJldmlldyIsIm1wIiwibm9uZW1wdHkiLCJzdGFydEJhdGNoIiwicmVtb3ZlQ2xhc3MiLCJyZW1vdmVTdHlsZSIsImVuZEJhdGNoIiwicCIsInAxIiwicDIiLCJ4IiwieSIsImFkZGVkIiwiY29sbGVjdGlvbiIsImludGVyTm9kZVBhcmFtcyIsImVkZ2VQYXJhbXMyIiwiaW50ZXJOb2RlIiwiYWRkIiwiZ3JvdXAiLCJzb3VyY2VFZGdlIiwiZGF0YSIsInNvdXJjZSIsImlkIiwidGFyZ2V0RWRnZSIsIm1lcmdlIiwic3R5bGUiLCJhZGRDbGFzcyIsIm1ha2VQcmV2aWV3IiwicmVtb3ZlIiwiaCIsIm91dGVySGVpZ2h0IiwidyIsIm91dGVyV2lkdGgiLCJtb3ZlWCIsIm1vdmVZIiwiYXhlcyIsInRvTG93ZXJDYXNlIiwic3BsaXQiLCJheGlzWCIsImF4aXNZIiwiaHgiLCJoeSIsIm1ha2VIYW5kbGVzIiwiaGFuZGxlcyIsImxlbmd0aCIsImhhbmRsZSIsImdyYWJiYWJsZSIsInNlbGVjdGFibGUiLCJwdXNoIiwidXBkYXRlRWRnZSIsImdob3N0Tm9kZSIsIm14IiwibXkiLCJyZW1vdmVkIiwiZ2hvc3RFZGdlIiwiZ2hvc3RFbGVzIiwiY2xhc3NlcyIsImRpc2FibGVFZGdlRXZlbnRzIiwiZWRnZXMiLCJlbmFibGVFZGdlRXZlbnRzIiwiZW5hYmxlIiwiZW5hYmxlZCIsImRpc2FibGUiLCJzcXJ0MiIsIk1hdGgiLCJzcXJ0IiwiY2FuU3RhcnRPbiIsImlzUHJldmlldyIsImVsIiwiaXNIYW5kbGUiLCJpc0dob3N0IiwiaXNUZW1wIiwidXNlckZpbHRlciIsImluc2lkZSIsImNhblN0YXJ0RHJhd01vZGVPbiIsImNhblN0YXJ0Tm9uRHJhd01vZGVPbiIsInBvcyIsInRocm90dGxlZFNuYXAiLCJ0aHJlc2hvbGQiLCJtb3VzZVBvcyIsInJhZGl1cyIsIm4iLCJtYXgiLCJzcURpc3QiLCJ4MSIsInkxIiwieDIiLCJ5MiIsImR4IiwiZHkiLCJzcURpc3RCeVB0Iiwibm9kZVNxRGlzdCIsInNxVGhyZXNob2xkIiwiciIsImlzV2l0aGluVGhlc2hvbGQiLCJiYlNxRGlzdCIsImhhbGZXIiwiaGFsZkgiLCJueCIsIm55IiwiaW5zaWRlWEJvdW5kcyIsImluc2lkZVlCb3VuZHMiLCJkeTEiLCJkeTIiLCJtaW4iLCJkeDEiLCJkeDIiLCJjbXBCYlNxRGlzdCIsIm4xIiwibjIiLCJjbXAiLCJhbGxvd0hvdmVyRGVsYXkiLCJtb3VzZUlzSW5zaWRlIiwiaXNFaEVsZSIsIm5vZGVzQnlEaXN0Iiwibm9kZXMiLCJzb3J0Iiwic25hcHBlZCIsImlzUGFyZW50IiwiaXNDaGlsZCIsInBhcmVudCIsImlzTG9vcCIsIm5vRWRnZSIsImlzRXhpc3RpbmdUZ3QiLCJjbGVhclRpbWVvdXQiLCJwcmV2aWV3VGltZW91dCIsImFwcGx5UHJldmlldyIsInNldFRpbWVvdXQiLCJjbGVhckNvbGxlY3Rpb25zIiwibGlzdGVuZXJzIiwiYWRkTGlzdGVuZXJzIiwidGhyb3R0bGUiLCJzdXBwb3J0c1Bhc3NpdmUiLCJvcHRzIiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJ1bmRlZmluZWQiLCJlcnIiLCJjYXB0dXJlIiwicGFzc2l2ZSIsInByb3RvIiwicHJvdG90eXBlIiwiZGVzdHJveSIsInJlbW92ZUxpc3RlbmVycyIsInNldE9wdGlvbnMiLCJleHRlbmQiLCJmbiIsImN5R2VzdHVyZXNUb2dnbGUiLCJjeUxpc3RlbmVycyIsImRyYXdpbmciLCJlbmFibGluZyIsImdlc3R1cmVMaWZlY3ljbGUiLCJlZGdlRXZlbnRzIiwibCIsInJlbW92ZUxpc3RlbmVyIiwiZXZlbnQiLCJjYWxsYmFjayIsImdldExpc3RlbmVyIiwiaXNEb20iLCJFbGVtZW50IiwibDIiLCJzcGxpY2UiLCJ0eXBlIiwiYXJncyIsImhhbmRsZXIiLCJyZWdpc3RlciIsImN5dG9zY2FwZSIsImNvcmUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RB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ckIsR0FBUixFQUF5Q2tOLElBQXpDO0FBRUEsTUFBSUMsT0FBTyxHQUFHelAsT0FBTyxDQUFDdVAsSUFBRCxDQUFyQjs7QUFFQSxNQUFJRSxPQUFPLElBQUksSUFBZixFQUFxQjtBQUNuQkEsV0FBTyxNQUFQLFNBQVdELElBQVg7QUFDRDs7QUFFRCxTQUFPLElBQVA7QUFDRDs7QUFFYztBQUFFak8sYUFBVyxFQUFYQSxXQUFGO0FBQWVnTSxjQUFZLEVBQVpBLFlBQWY7QUFBNkJ3QixnQkFBYyxFQUFkQSxjQUE3QjtBQUE2Q1gsaUJBQWUsRUFBZkEsZUFBN0M7QUFBOER6SixNQUFJLEVBQUpBO0FBQTlELENBQWYsRTs7Ozs7Ozs7Ozs7O0FDbkdBO0FBQUE7Q0FFQTs7QUFDQSxJQUFJK0ssUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBVUMsU0FBVixFQUFxQjtBQUNsQyxNQUFJLENBQUNBLFNBQUwsRUFBZ0I7QUFDZDtBQUNELEdBSGlDLENBR2hDOzs7QUFFRkEsV0FBUyxDQUFDLE1BQUQsRUFBUyxhQUFULEVBQXdCQyw2Q0FBeEIsQ0FBVCxDQUxrQyxDQUtLO0FBQ3hDLENBTkQ7O0FBUUEsSUFBSSxPQUFPRCxTQUFQLEtBQXFCLFdBQXpCLEVBQXNDO0FBQUU7QUFDdENELFVBQVEsQ0FBQ0MsU0FBRCxDQUFSLENBRG9DLENBQ2hCO0FBQ3JCOztBQUVjRCx1RUFBZixFOzs7Ozs7Ozs7OztBQ2ZBLDREOzs7Ozs7Ozs7OztBQ0FBLDZEIiwiZmlsZSI6ImN5dG9zY2FwZS1lZGdlaGFuZGxlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImxvZGFzaC5tZW1vaXplXCIpLCByZXF1aXJlKFwibG9kYXNoLnRocm90dGxlXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImxvZGFzaC5tZW1vaXplXCIsIFwibG9kYXNoLnRocm90dGxlXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImN5dG9zY2FwZUVkZ2VoYW5kbGVzXCJdID0gZmFjdG9yeShyZXF1aXJlKFwibG9kYXNoLm1lbW9pemVcIiksIHJlcXVpcmUoXCJsb2Rhc2gudGhyb3R0bGVcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImN5dG9zY2FwZUVkZ2VoYW5kbGVzXCJdID0gZmFjdG9yeShyb290W1wiX1wiXVtcIm1lbW9pemVcIl0sIHJvb3RbXCJfXCJdW1widGhyb3R0bGVcIl0pO1xufSkod2luZG93LCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2xvZGFzaF9tZW1vaXplX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfbG9kYXNoX3Rocm90dGxlX18pIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8vIFNpbXBsZSwgaW50ZXJuYWwgT2JqZWN0LmFzc2lnbigpIHBvbHlmaWxsIGZvciBvcHRpb25zIG9iamVjdHMgZXRjLlxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduICE9IG51bGwgPyBPYmplY3QuYXNzaWduLmJpbmQoT2JqZWN0KSA6IGZ1bmN0aW9uICh0LCAuLi5zcmNzKSB7XG4gIHNyY3MuZmlsdGVyKHNyYyA9PiBzcmMgIT0gbnVsbCkuZm9yRWFjaChzcmMgPT4ge1xuICAgIE9iamVjdC5rZXlzKHNyYykuZm9yRWFjaChrID0+IHRba10gPSBzcmNba10pXG4gIH0pXG4gIHJldHVybiB0XG59XG4iLCJpbXBvcnQgRWRnZWhhbmRsZXMgZnJvbSAnLi9lZGdlaGFuZGxlcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgbGV0IGN5ID0gdGhpc1xuXG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2hhbmRsZU5vZGVzJykpIHtcbiAgICBvcHRpb25zLnNlbGVjdG9yID0gb3B0aW9ucy5oYW5kbGVOb2Rlc1xuICAgIGRlbGV0ZSBvcHRpb25zLmhhbmRsZU5vZGVzXG4gIH1cblxuICByZXR1cm4gbmV3IEVkZ2VoYW5kbGVzKGN5LCBvcHRpb25zKVxufVxuIiwiZnVuY3Rpb24gZGlzYWJsZUdlc3R1cmVzICgpIHtcbiAgdGhpcy5zYXZlR2VzdHVyZVN0YXRlKClcblxuICB0aGlzLmN5XG4gICAgLnpvb21pbmdFbmFibGVkKGZhbHNlKVxuICAgIC5wYW5uaW5nRW5hYmxlZChmYWxzZSlcbiAgICAuYm94U2VsZWN0aW9uRW5hYmxlZChmYWxzZSlcblxuICBpZiAodGhpcy5vcHRpb25zLmRpc2FibGVCcm93c2VyR2VzdHVyZXMpIHtcbiAgICBsZXQgd2xPcHRzID0gdGhpcy53aW5kb3dMaXN0ZW5lck9wdGlvbnNcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5wcmV2ZW50RGVmYXVsdCwgd2xPcHRzKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLnByZXZlbnREZWZhdWx0LCB3bE9wdHMpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5wcmV2ZW50RGVmYXVsdCwgd2xPcHRzKVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuZnVuY3Rpb24gcmVzZXRHZXN0dXJlcyAoKSB7XG4gIHRoaXMuY3lcbiAgICAuem9vbWluZ0VuYWJsZWQodGhpcy5sYXN0Wm9vbWluZ0VuYWJsZWQpXG4gICAgLnBhbm5pbmdFbmFibGVkKHRoaXMubGFzdFBhbm5pbmdFbmFibGVkKVxuICAgIC5ib3hTZWxlY3Rpb25FbmFibGVkKHRoaXMubGFzdEJveFNlbGVjdGlvbkVuYWJsZWQpXG5cbiAgaWYgKHRoaXMub3B0aW9ucy5kaXNhYmxlQnJvd3Nlckdlc3R1cmVzKSB7XG4gICAgbGV0IHdsT3B0cyA9IHRoaXMud2luZG93TGlzdGVuZXJPcHRpb25zXG5cbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMucHJldmVudERlZmF1bHQsIHdsT3B0cylcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5wcmV2ZW50RGVmYXVsdCwgd2xPcHRzKVxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMucHJldmVudERlZmF1bHQsIHdsT3B0cylcbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbmZ1bmN0aW9uIHNhdmVHZXN0dXJlU3RhdGUgKCkge1xuICBsZXQgeyBjeSB9ID0gdGhpc1xuXG4gIHRoaXMubGFzdFBhbm5pbmdFbmFibGVkID0gY3kucGFubmluZ0VuYWJsZWQoKVxuICB0aGlzLmxhc3Rab29taW5nRW5hYmxlZCA9IGN5Lnpvb21pbmdFbmFibGVkKClcbiAgdGhpcy5sYXN0Qm94U2VsZWN0aW9uRW5hYmxlZCA9IGN5LmJveFNlbGVjdGlvbkVuYWJsZWQoKVxuXG4gIHJldHVybiB0aGlzXG59XG5cbmV4cG9ydCBkZWZhdWx0IHsgZGlzYWJsZUdlc3R1cmVzLCByZXNldEdlc3R1cmVzLCBzYXZlR2VzdHVyZVN0YXRlIH1cbiIsImZ1bmN0aW9uIGFkZEN5dG9zY2FwZUxpc3RlbmVycyAoKSB7XG4gIGxldCB7IGN5LCBvcHRpb25zIH0gPSB0aGlzXG5cbiAgLy8gZ3JhYmJpbmcgbm9kZXNcbiAgdGhpcy5hZGRMaXN0ZW5lcihjeSwgJ2RyYWcnLCAoKSA9PiB0aGlzLmdyYWJiaW5nTm9kZSA9IHRydWUpXG4gIHRoaXMuYWRkTGlzdGVuZXIoY3ksICdmcmVlJywgKCkgPT4gdGhpcy5ncmFiYmluZ05vZGUgPSBmYWxzZSlcblxuICAvLyBzaG93IGhhbmRsZSBvbiBob3ZlclxuICB0aGlzLmFkZExpc3RlbmVyKGN5LCAnbW91c2VvdmVyJywgJ25vZGUnLCBlID0+IHtcbiAgICB0aGlzLnNob3coZS50YXJnZXQpXG4gIH0pXG5cbiAgLy8gc2hvdyBoYW5kbGUgb24gdGFwIG5vZGVcbiAgdGhpcy5hZGRMaXN0ZW5lcihjeSwgJ3RhcCcsICdub2RlJywgZSA9PiB7XG4gICAgdGhpcy5zaG93KGUudGFyZ2V0KVxuICB9KVxuXG4gIC8vIGhpZGUgaGFuZGxlIHdoZW4gYW55IG5vZGUgbW92ZWRcbiAgdGhpcy5hZGRMaXN0ZW5lcihjeSwgJ3Bvc2l0aW9uJywgJ25vZGUnLCAoKSA9PiB7XG4gICAgdGhpcy5oaWRlKClcbiAgfSlcblxuICAvLyBzdGFydCBvbiB0YXBzdGFydCBoYW5kbGVcbiAgLy8gc3RhcnQgb24gdGFwc3RhcnQgbm9kZSAoZHJhdyBtb2RlKVxuICAvLyB0b2dnbGUgb24gc291cmNlIG5vZGVcbiAgdGhpcy5hZGRMaXN0ZW5lcihjeSwgJ3RhcHN0YXJ0JywgJ25vZGUnLCBlID0+IHtcbiAgICBsZXQgbm9kZSA9IGUudGFyZ2V0XG5cbiAgICBpZiAobm9kZS5hbnlTYW1lKHRoaXMuaGFuZGxlTm9kZXMpKSB7XG4gICAgICB0aGlzLmhhbmRsZU5vZGUgPSBub2RlLmludGVyc2VjdGlvbih0aGlzLmhhbmRsZU5vZGVzKVxuICAgICAgdGhpcy5zdGFydCh0aGlzLnNvdXJjZU5vZGUpXG4gICAgfSBlbHNlIGlmICh0aGlzLmRyYXdNb2RlKSB7XG4gICAgICB0aGlzLnN0YXJ0KG5vZGUpXG4gICAgfSBlbHNlIGlmIChub2RlLnNhbWUodGhpcy5zb3VyY2VOb2RlKSkge1xuICAgICAgdGhpcy5oaWRlKClcbiAgICB9XG4gIH0pXG5cbiAgLy8gdXBkYXRlIGxpbmUgb24gZHJhZ1xuICB0aGlzLmFkZExpc3RlbmVyKGN5LCAndGFwZHJhZycsIGUgPT4ge1xuICAgIHRoaXMudXBkYXRlKGUucG9zaXRpb24pXG4gIH0pXG5cbiAgLy8gaG92ZXIgb3ZlciBwcmV2aWV3XG4gIHRoaXMuYWRkTGlzdGVuZXIoY3ksICd0YXBkcmFnb3ZlcicsICdub2RlJywgZSA9PiB7XG4gICAgLy8gdGhlbiBpZ25vcmUgZXZlbnRzIGxpa2UgbW91c2VvdmVyXG4gICAgaWYgKCFvcHRpb25zLnNuYXApIHsgdGhpcy5wcmV2aWV3KGUudGFyZ2V0KSB9XG4gIH0pXG5cbiAgLy8gaG92ZXIgb3V0IHVucHJldmlld1xuICB0aGlzLmFkZExpc3RlbmVyKGN5LCAndGFwZHJhZ291dCcsICdub2RlJywgZSA9PiB7XG4gICAgLy8gdGhlbiBrZWVwIHRoZSBwcmV2aWV3XG4gICAgaWYgKCFvcHRpb25zLnNuYXApIHsgdGhpcy51bnByZXZpZXcoZS50YXJnZXQpIH1cbiAgfSlcblxuICAvLyBzdG9wIGdlc3R1cmUgb24gdGFwZW5kXG4gIHRoaXMuYWRkTGlzdGVuZXIoY3ksICd0YXBlbmQnLCAoKSA9PiB7XG4gICAgdGhpcy5zdG9wKClcbiAgfSlcblxuICAvLyBoaWRlIGhhbmRsZSBpZiBzb3VyY2Ugbm9kZSBpcyByZW1vdmVkXG4gIHRoaXMuYWRkTGlzdGVuZXIoY3ksICdyZW1vdmUnLCBlID0+IHtcbiAgICBpZiAoZS50YXJnZXQuc2FtZSh0aGlzLnNvdXJjZU5vZGUpKSB7XG4gICAgICB0aGlzLmhpZGUoKVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gdGhpc1xufVxuXG5leHBvcnQgZGVmYXVsdCB7IGFkZEN5dG9zY2FwZUxpc3RlbmVycyB9XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuY29uc3QgZGVmYXVsdHMgPSB7XG4gIHNlbGVjdG9yOiAnbm9kZScsIC8vIHNlbGVjdG9yL2ZpbHRlciBmdW5jdGlvbiBmb3Igd2hldGhlciBlZGdlcyBjYW4gYmUgbWFkZSBmcm9tIGEgZ2l2ZW4gbm9kZVxuICBwcmV2aWV3OiB0cnVlLCAvLyB3aGV0aGVyIHRvIHNob3cgYWRkZWQgZWRnZXMgcHJldmlldyBiZWZvcmUgcmVsZWFzaW5nIHNlbGVjdGlvblxuICBob3ZlckRlbGF5OiAxNTAsIC8vIHRpbWUgc3BlbnQgaG92ZXJpbmcgb3ZlciBhIHRhcmdldCBub2RlIGJlZm9yZSBpdCBpcyBjb25zaWRlcmVkIHNlbGVjdGVkXG4gIHNuYXA6IGZhbHNlLCAvLyB3aGVuIGVuYWJsZWQsIHRoZSBlZGdlIGNhbiBiZSBkcmF3biBieSBqdXN0IG1vdmluZyBjbG9zZSB0byBhIHRhcmdldCBub2RlIChjYW4gYmUgY29uZnVzaW5nIG9uIGNvbXBvdW5kIGdyYXBocylcbiAgc25hcFRocmVzaG9sZDogNTAsIC8vIHRoZSB0YXJnZXQgbm9kZSBtdXN0IGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byB0aGlzIG1hbnkgcGl4ZWxzIGF3YXkgZnJvbSB0aGUgY3Vyc29yL2ZpbmdlclxuICBzbmFwRnJlcXVlbmN5OiAxNSwgLy8gdGhlIG51bWJlciBvZiB0aW1lcyBwZXIgc2Vjb25kIChIeikgdGhhdCBzbmFwIGNoZWNrcyBkb25lIChsb3dlciBpcyBsZXNzIGV4cGVuc2l2ZSlcbiAgbm9FZGdlRXZlbnRzSW5EcmF3OiBmYWxzZSwgLy8gc2V0IGV2ZW50czpubyB0byBlZGdlcyBkdXJpbmcgZHJhd3MsIHByZXZlbnRzIG1vdXNlb3V0cyBvbiBjb21wb3VuZHNcbiAgZGlzYWJsZUJyb3dzZXJHZXN0dXJlczogdHJ1ZSwgLy8gZHVyaW5nIGFuIGVkZ2UgZHJhd2luZyBnZXN0dXJlLCBkaXNhYmxlIGJyb3dzZXIgZ2VzdHVyZXMgc3VjaCBhcyB0d28tZmluZ2VyIHRyYWNrcGFkIHN3aXBlIGFuZCBwaW5jaC10by16b29tXG4gIGhhbmRsZVBhcmFtczogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAvLyByZXR1cm5zIGFycmF5IG9mIGVsZW1lbnRzIHRvIGJlIHBhc3NlZCB0byBjeS5hZGQoKSBmb3IgdGhlIGhhbmRsZSBub2Rlc1xuICAgIC8vIChkZWZhdWx0IGNsYXNzZXMgYXJlIGFsd2F5cyBhZGRlZCBmb3IgeW91KVxuICAgIHJldHVybiBbe31dXG4gIH0sXG4gIGhhbmRsZVBvc2l0aW9uOiBmdW5jdGlvbiAobm9kZSkge1xuICAgIHJldHVybiAnbWlkZGxlIHRvcCcgLy8gc2V0cyB0aGUgcG9zaXRpb24gb2YgdGhlIGhhbmRsZSBpbiB0aGUgZm9ybWF0IG9mIFwiWC1BWElTIFktQVhJU1wiIHN1Y2ggYXMgXCJsZWZ0IHRvcFwiLCBcIm1pZGRsZSB0b3BcIlxuICB9LFxuICBoYW5kbGVJbkRyYXdNb2RlOiBmYWxzZSwgLy8gd2hldGhlciB0byBzaG93IHRoZSBoYW5kbGUgaW4gZHJhdyBtb2RlXG4gIGVkZ2VUeXBlOiBmdW5jdGlvbiAoc291cmNlTm9kZSwgdGFyZ2V0Tm9kZSwgaGFuZGxlTm9kZSkge1xuICAgIC8vIGNhbiByZXR1cm4gJ2ZsYXQnIGZvciBmbGF0IGVkZ2VzIGJldHdlZW4gbm9kZXMgb3IgJ25vZGUnIGZvciBpbnRlcm1lZGlhdGUgbm9kZSBiZXR3ZWVuIHRoZW1cbiAgICAvLyByZXR1cm5pbmcgbnVsbC91bmRlZmluZWQgbWVhbnMgYW4gZWRnZSBjYW4ndCBiZSBhZGRlZCBiZXR3ZWVuIHRoZSB0d28gbm9kZXNcbiAgICByZXR1cm4gJ2ZsYXQnXG4gIH0sXG4gIGxvb3BBbGxvd2VkOiBmdW5jdGlvbiAobm9kZSwgaGFuZGxlTm9kZSkge1xuICAgIC8vIGZvciB0aGUgc3BlY2lmaWVkIG5vZGUsIHJldHVybiB3aGV0aGVyIGVkZ2VzIGZyb20gaXRzZWxmIHRvIGl0c2VsZiBhcmUgYWxsb3dlZFxuICAgIHJldHVybiBmYWxzZVxuICB9LFxuICBub2RlTG9vcE9mZnNldDogLTUwLCAvLyBvZmZzZXQgZm9yIGVkZ2VUeXBlOiAnbm9kZScgbG9vcHNcbiAgbm9kZVBhcmFtczogZnVuY3Rpb24gKHNvdXJjZU5vZGUsIHRhcmdldE5vZGUsIGhhbmRsZU5vZGUpIHtcbiAgICAvLyBmb3Igbm9kZSBiZXR3ZWVuIHRoZSBzcGVjaWZpZWQgc291cmNlIGFuZCB0YXJnZXRcbiAgICAvLyByZXR1cm4gZWxlbWVudCBvYmplY3QgdG8gYmUgcGFzc2VkIHRvIGN5LmFkZCgpIGZvciBpbnRlcm1lZGlhcnkgbm9kZVxuICAgIHJldHVybiB7fVxuICB9LFxuICBlZGdlUGFyYW1zOiBmdW5jdGlvbiAoc291cmNlTm9kZSwgdGFyZ2V0Tm9kZSwgaSwgaGFuZGxlTm9kZSkge1xuICAgIC8vIGZvciBlZGdlcyBiZXR3ZWVuIHRoZSBzcGVjaWZpZWQgc291cmNlIGFuZCB0YXJnZXRcbiAgICAvLyByZXR1cm4gZWxlbWVudCBvYmplY3QgdG8gYmUgcGFzc2VkIHRvIGN5LmFkZCgpIGZvciBlZGdlXG4gICAgLy8gTkI6IGkgaW5kaWNhdGVzIGVkZ2UgaW5kZXggaW4gY2FzZSBvZiBlZGdlVHlwZTogJ25vZGUnXG4gICAgcmV0dXJuIHt9XG4gIH0sXG4gIGdob3N0RWRnZVBhcmFtczogZnVuY3Rpb24gKHNvdXJjZU5vZGUsIGhhbmRsZU5vZGUpIHtcbiAgICAvLyByZXR1cm4gZWxlbWVudCBvYmplY3QgdG8gYmUgcGFzc2VkIHRvIGN5LmFkZCgpIGZvciB0aGUgZ2hvc3QgZWRnZVxuICAgIC8vIChkZWZhdWx0IGNsYXNzZXMgYXJlIGFsd2F5cyBhZGRlZCBmb3IgeW91KVxuICAgIHJldHVybiB7fVxuICB9LFxuICBzaG93OiBmdW5jdGlvbiAoc291cmNlTm9kZSwgaGFuZGxlTm9kZXMpIHtcbiAgICAvLyBmaXJlZCB3aGVuIGhhbmRsZXMgaXMgc2hvd25cbiAgfSxcbiAgaGlkZTogZnVuY3Rpb24gKHNvdXJjZU5vZGUpIHtcbiAgICAvLyBmaXJlZCB3aGVuIHRoZSBoYW5kbGVzIGlzIGhpZGRlblxuICB9LFxuICBzdGFydDogZnVuY3Rpb24gKHNvdXJjZU5vZGUsIGhhbmRsZU5vZGUpIHtcbiAgICAvLyBmaXJlZCB3aGVuIGVkZ2VoYW5kbGVzIGludGVyYWN0aW9uIHN0YXJ0cyAoZHJhZyBvbiBoYW5kbGUpXG4gIH0sXG4gIGNvbXBsZXRlOiBmdW5jdGlvbiAoc291cmNlTm9kZSwgdGFyZ2V0Tm9kZSwgYWRkZWRFbGVzKSB7XG4gICAgLy8gZmlyZWQgd2hlbiBlZGdlaGFuZGxlcyBpcyBkb25lIGFuZCBlbGVtZW50cyBhcmUgYWRkZWRcbiAgfSxcbiAgc3RvcDogZnVuY3Rpb24gKHNvdXJjZU5vZGUpIHtcbiAgICAvLyBmaXJlZCB3aGVuIGVkZ2VoYW5kbGVzIGludGVyYWN0aW9uIGlzIHN0b3BwZWQgKGVpdGhlciBjb21wbGV0ZSB3aXRoIGFkZGVkIGVkZ2VzIG9yIGluY29tcGxldGUpXG4gIH0sXG4gIGNhbmNlbDogZnVuY3Rpb24gKHNvdXJjZU5vZGUsIGNhbmNlbGxlZFRhcmdldHMpIHtcbiAgICAvLyBmaXJlZCB3aGVuIGVkZ2VoYW5kbGVzIGFyZSBjYW5jZWxsZWQgKGluY29tcGxldGUgZ2VzdHVyZSlcbiAgfSxcbiAgaG92ZXJvdmVyOiBmdW5jdGlvbiAoc291cmNlTm9kZSwgdGFyZ2V0Tm9kZSkge1xuICAgIC8vIGZpcmVkIHdoZW4gYSB0YXJnZXQgaXMgaG92ZXJlZFxuICB9LFxuICBob3Zlcm91dDogZnVuY3Rpb24gKHNvdXJjZU5vZGUsIHRhcmdldE5vZGUpIHtcbiAgICAvLyBmaXJlZCB3aGVuIGEgdGFyZ2V0IGlzbid0IGhvdmVyZWQgYW55bW9yZVxuICB9LFxuICBwcmV2aWV3b246IGZ1bmN0aW9uIChzb3VyY2VOb2RlLCB0YXJnZXROb2RlLCBwcmV2aWV3RWxlcykge1xuICAgIC8vIGZpcmVkIHdoZW4gcHJldmlldyBpcyBzaG93blxuICB9LFxuICBwcmV2aWV3b2ZmOiBmdW5jdGlvbiAoc291cmNlTm9kZSwgdGFyZ2V0Tm9kZSwgcHJldmlld0VsZXMpIHtcbiAgICAvLyBmaXJlZCB3aGVuIHByZXZpZXcgaXMgaGlkZGVuXG4gIH0sXG4gIGRyYXdvbjogZnVuY3Rpb24gKCkge1xuICAgIC8vIGZpcmVkIHdoZW4gZHJhdyBtb2RlIGVuYWJsZWRcbiAgfSxcbiAgZHJhd29mZjogZnVuY3Rpb24gKCkge1xuICAgIC8vIGZpcmVkIHdoZW4gZHJhdyBtb2RlIGRpc2FibGVkXG4gIH1cbn1cbi8qIGVzbGludC1lbmFibGUgKi9cblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdHNcbiIsImZ1bmN0aW9uIHRvZ2dsZURyYXdNb2RlIChib29sKSB7XG4gIGxldCB7IGN5LCBvcHRpb25zIH0gPSB0aGlzXG5cbiAgdGhpcy5kcmF3TW9kZSA9IGJvb2wgIT0gbnVsbCA/IGJvb2wgOiAhdGhpcy5kcmF3TW9kZVxuXG4gIGlmICh0aGlzLmRyYXdNb2RlKSB7XG4gICAgdGhpcy5wcmV2VW5ncmFiaWZ5U3RhdGUgPSBjeS5hdXRvdW5ncmFiaWZ5KClcblxuICAgIGN5LmF1dG91bmdyYWJpZnkodHJ1ZSlcblxuICAgIGlmICghb3B0aW9ucy5oYW5kbGVJbkRyYXdNb2RlICYmIHRoaXMuaGFuZGxlU2hvd24oKSkge1xuICAgICAgdGhpcy5oaWRlKClcbiAgICB9XG5cbiAgICB0aGlzLmVtaXQoJ2RyYXdvbicpXG4gIH0gZWxzZSB7XG4gICAgY3kuYXV0b3VuZ3JhYmlmeSh0aGlzLnByZXZVbmdyYWJpZnlTdGF0ZSlcblxuICAgIHRoaXMuZW1pdCgnZHJhd29mZicpXG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG5mdW5jdGlvbiBlbmFibGVEcmF3TW9kZSAoKSB7XG4gIHJldHVybiB0aGlzLnRvZ2dsZURyYXdNb2RlKHRydWUpXG59XG5cbmZ1bmN0aW9uIGRpc2FibGVEcmF3TW9kZSAoKSB7XG4gIHJldHVybiB0aGlzLnRvZ2dsZURyYXdNb2RlKGZhbHNlKVxufVxuXG5leHBvcnQgZGVmYXVsdCB7IHRvZ2dsZURyYXdNb2RlLCBlbmFibGVEcmF3TW9kZSwgZGlzYWJsZURyYXdNb2RlIH1cbiIsImltcG9ydCBhc3NpZ24gZnJvbSAnLi4vYXNzaWduJ1xuXG5jb25zdCBpc0FycmF5ID0gb2JqID0+IEFycmF5LmlzQXJyYXkgPyBBcnJheS5pc0FycmF5KG9iaikgOiBvYmogIT0gbnVsbCAmJiBvYmogaW5zdGFuY2VvZiBBcnJheVxuXG5mdW5jdGlvbiBtYWtlRWRnZXMgKHByZXZpZXcgPSBmYWxzZSkge1xuICAvLyBjYW4ndCBtYWtlIGVkZ2VzIG91dHNpZGUgb2YgcmVndWxhciBnZXN0dXJlIGxpZmVjeWNsZVxuICBpZiAoIXRoaXMuYWN0aXZlKSB7IHJldHVybiB9XG5cbiAgbGV0IHsgY3ksIG9wdGlvbnMsIHByZXN1bXB0aXZlVGFyZ2V0cywgcHJldmlld0VsZXMgfSA9IHRoaXNcblxuICAvLyBjYW4ndCBtYWtlIHByZXZpZXcgaWYgZGlzYWJsZWRcbiAgaWYgKHByZXZpZXcgJiYgIW9wdGlvbnMucHJldmlldykgeyByZXR1cm4gfVxuXG4gIGxldCB7IHNvdXJjZU5vZGUsIHRhcmdldE5vZGUsIGhhbmRsZU5vZGUgfSA9IHRoaXNcblxuICAvLyBkZXRlY3QgY2FuY2VsXG4gIGlmICghdGFyZ2V0Tm9kZSB8fCB0YXJnZXROb2RlLmVtcHR5KCkpIHtcbiAgICB0aGlzLnJlbW92ZVByZXZpZXcoKVxuICAgIHRoaXMuZW1pdCgnY2FuY2VsJywgdGhpcy5tcCgpLCBzb3VyY2VOb2RlLCBwcmVzdW1wdGl2ZVRhcmdldHMpXG4gICAgcmV0dXJuXG4gIH1cblxuICAvLyBqdXN0IHJlbW92ZSBwcmV2aWV3IGNsYXNzIGlmIHdlIGFscmVhZHkgaGF2ZSB0aGUgZWRnZXNcbiAgaWYgKCFwcmV2aWV3ICYmIHByZXZpZXdFbGVzLm5vbmVtcHR5KCkpIHtcbiAgICBjeS5zdGFydEJhdGNoKClcbiAgICBwcmV2aWV3RWxlcy5yZW1vdmVDbGFzcygnZWgtcHJldmlldycpLnJlbW92ZVN0eWxlKCdldmVudHMnKVxuICAgIGN5LmVuZEJhdGNoKClcblxuICAgIHRoaXMuZW1pdCgnY29tcGxldGUnLCB0aGlzLm1wKCksIHNvdXJjZU5vZGUsIHRhcmdldE5vZGUsIHByZXZpZXdFbGVzKVxuXG4gICAgcmV0dXJuXG4gIH1cblxuICBsZXQgZWRnZVR5cGUgPSBvcHRpb25zLmVkZ2VUeXBlKHNvdXJjZU5vZGUsIHRhcmdldE5vZGUsIGhhbmRsZU5vZGUpXG5cbiAgLy8gbXVzdCBoYXZlIGEgbm9uLWVtcHR5IGVkZ2UgdHlwZVxuICBpZiAoIWVkZ2VUeXBlKSB7IHJldHVybiB9XG5cbiAgbGV0IHBcbiAgbGV0IHAxID0gc291cmNlTm9kZS5wb3NpdGlvbigpXG4gIGxldCBwMiA9IHRhcmdldE5vZGUucG9zaXRpb24oKVxuXG4gIGlmIChzb3VyY2VOb2RlLnNhbWUodGFyZ2V0Tm9kZSkpIHtcbiAgICBwID0ge1xuICAgICAgeDogcDEueCArIG9wdGlvbnMubm9kZUxvb3BPZmZzZXQsXG4gICAgICB5OiBwMS55ICsgb3B0aW9ucy5ub2RlTG9vcE9mZnNldFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBwID0ge1xuICAgICAgeDogKHAxLnggKyBwMi54KSAvIDIsXG4gICAgICB5OiAocDEueSArIHAyLnkpIC8gMlxuICAgIH1cbiAgfVxuXG4gIGxldCBhZGRlZCA9IGN5LmNvbGxlY3Rpb24oKVxuICBsZXQgZWRnZVBhcmFtcyA9IG9wdGlvbnMuZWRnZVBhcmFtcyhzb3VyY2VOb2RlLCB0YXJnZXROb2RlLCAwLCBoYW5kbGVOb2RlKVxuXG4gIGN5LnN0YXJ0QmF0Y2goKVxuXG4gIGlmIChlZGdlVHlwZSA9PT0gJ25vZGUnKSB7XG4gICAgbGV0IGludGVyTm9kZVBhcmFtcyA9IG9wdGlvbnMubm9kZVBhcmFtcyhzb3VyY2VOb2RlLCB0YXJnZXROb2RlLCBoYW5kbGVOb2RlKVxuICAgIGxldCBlZGdlUGFyYW1zMiA9IG9wdGlvbnMuZWRnZVBhcmFtcyhzb3VyY2VOb2RlLCB0YXJnZXROb2RlLCAxLCBoYW5kbGVOb2RlKVxuXG4gICAgbGV0IGludGVyTm9kZSA9IGN5LmFkZChhc3NpZ24oe30sIGludGVyTm9kZVBhcmFtcywge1xuICAgICAgZ3JvdXA6ICdub2RlcycsXG4gICAgICBwb3NpdGlvbjogcFxuICAgIH0pKVxuXG4gICAgbGV0IHNvdXJjZUVkZ2UgPSBjeS5hZGQoYXNzaWduKHt9LCBlZGdlUGFyYW1zLCB7XG4gICAgICBncm91cDogJ2VkZ2VzJyxcbiAgICAgIGRhdGE6IGFzc2lnbih7fSwgZWRnZVBhcmFtcy5kYXRhLCB7XG4gICAgICAgIHNvdXJjZTogc291cmNlTm9kZS5pZCgpLFxuICAgICAgICB0YXJnZXQ6IGludGVyTm9kZS5pZCgpXG4gICAgICB9KVxuICAgIH0pKVxuXG4gICAgbGV0IHRhcmdldEVkZ2UgPSBjeS5hZGQoYXNzaWduKHt9LCBlZGdlUGFyYW1zMiwge1xuICAgICAgZ3JvdXA6ICdlZGdlcycsXG4gICAgICBkYXRhOiBhc3NpZ24oe30sIGVkZ2VQYXJhbXMyLmRhdGEsIHtcbiAgICAgICAgc291cmNlOiBpbnRlck5vZGUuaWQoKSxcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXROb2RlLmlkKClcbiAgICAgIH0pXG4gICAgfSkpXG5cbiAgICBhZGRlZCA9IGFkZGVkLm1lcmdlKGludGVyTm9kZSkubWVyZ2Uoc291cmNlRWRnZSkubWVyZ2UodGFyZ2V0RWRnZSlcblxuICB9IGVsc2UgeyAvLyBmbGF0XG4gICAgYWRkZWQgPSBjeS5hZGQoYXNzaWduKHt9LCBlZGdlUGFyYW1zLCB7XG4gICAgICBncm91cDogJ2VkZ2VzJyxcbiAgICAgIGRhdGE6IGFzc2lnbih7fSwgZWRnZVBhcmFtcy5kYXRhLCB7XG4gICAgICAgIHNvdXJjZTogc291cmNlTm9kZS5pZCgpLFxuICAgICAgICB0YXJnZXQ6IHRhcmdldE5vZGUuaWQoKVxuICAgICAgfSlcbiAgICB9KSlcbiAgfVxuXG4gIGlmIChwcmV2aWV3KSB7XG4gICAgYWRkZWQuc3R5bGUoJ2V2ZW50cycsICdubycpXG4gICAgYWRkZWQuYWRkQ2xhc3MoJ2VoLXByZXZpZXcnKVxuICAgIHRoaXMucHJldmlld0VsZXMgPSBhZGRlZFxuICB9XG5cbiAgY3kuZW5kQmF0Y2goKVxuXG4gIGlmICghcHJldmlldykge1xuICAgIHRoaXMuZW1pdCgnY29tcGxldGUnLCB0aGlzLm1wKCksIHNvdXJjZU5vZGUsIHRhcmdldE5vZGUsIGFkZGVkKVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuZnVuY3Rpb24gbWFrZVByZXZpZXcgKCkge1xuICB0aGlzLm1ha2VFZGdlcyh0cnVlKVxuXG4gIHJldHVybiB0aGlzXG59XG5cbmZ1bmN0aW9uIHJlbW92ZVByZXZpZXcgKCkge1xuICBpZiAodGhpcy5wcmV2aWV3RWxlcy5ub25lbXB0eSgpKSB7XG4gICAgdGhpcy5wcmV2aWV3RWxlcy5yZW1vdmUoKVxuICAgIHRoaXMucHJldmlld0VsZXMgPSB0aGlzLmN5LmNvbGxlY3Rpb24oKVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuZnVuY3Rpb24gaGFuZGxlU2hvd24gKCkge1xuICByZXR1cm4gdGhpcy5oYW5kbGVOb2Rlcy5ub25lbXB0eSgpXG59XG5cbmZ1bmN0aW9uIGhhbmRsZVBvc2l0aW9uIChub2RlKSB7XG4gIGxldCB7IG9wdGlvbnMgfSA9IHRoaXNcbiAgbGV0IGhhbmRsZVBvc2l0aW9uID0gdHlwZW9mIG9wdGlvbnMuaGFuZGxlUG9zaXRpb24gPT09IHR5cGVvZiAnJyA/ICgpID0+IG9wdGlvbnMuaGFuZGxlUG9zaXRpb24gOiBvcHRpb25zLmhhbmRsZVBvc2l0aW9uXG4gIGxldCBwID0gbm9kZS5wb3NpdGlvbigpXG4gIGxldCBoID0gbm9kZS5vdXRlckhlaWdodCgpXG4gIGxldCB3ID0gbm9kZS5vdXRlcldpZHRoKClcblxuICAvLyBzdG9yZSBob3cgbXVjaCB3ZSBzaG91bGQgbW92ZSB0aGUgaGFuZGxlIGZyb20gb3JpZ2luKHAueCwgcC55KVxuICBsZXQgbW92ZVggPSAwXG4gIGxldCBtb3ZlWSA9IDBcblxuICAvLyBncmFiIGF4ZXNcbiAgbGV0IGF4ZXMgPSBoYW5kbGVQb3NpdGlvbihub2RlKS50b0xvd2VyQ2FzZSgpLnNwbGl0KC9cXHMrLylcbiAgbGV0IGF4aXNYID0gYXhlc1swXVxuICBsZXQgYXhpc1kgPSBheGVzWzFdXG5cbiAgLy8gYmFzZWQgb24gaGFuZGxlUG9zaXRpb24gbW92ZSBsZWZ0L3JpZ2h0L3RvcC9ib3R0b20uIE1pZGRsZS9taWRkbGUgd2lsbCBqdXN0IGJlIG5vcm1hbFxuICBpZiAoYXhpc1ggPT09ICdsZWZ0Jykge1xuICAgIG1vdmVYID0gLSh3IC8gMilcbiAgfSBlbHNlIGlmIChheGlzWCA9PT0gJ3JpZ2h0Jykge1xuICAgIG1vdmVYID0gdyAvIDJcbiAgfVxuICBpZiAoYXhpc1kgPT09ICd0b3AnKSB7XG4gICAgbW92ZVkgPSAtKGggLyAyKVxuICB9IGVsc2UgaWYgKGF4aXNZID09PSAnYm90dG9tJykge1xuICAgIG1vdmVZID0gaCAvIDJcbiAgfVxuXG4gIC8vIHNldCBoYW5kbGUgeCBhbmQgeSBiYXNlZCBvbiBhZGp1c3RlZCBwb3NpdGlvbnNcbiAgbGV0IGh4ID0gcC54ICsgbW92ZVhcbiAgbGV0IGh5ID0gcC55ICsgbW92ZVlcblxuICByZXR1cm4geyB4OiBoeCwgeTogaHkgfVxufVxuXG5mdW5jdGlvbiBtYWtlSGFuZGxlcyAobm9kZSkge1xuICBsZXQgeyBvcHRpb25zLCBjeSB9ID0gdGhpc1xuXG4gIGxldCBoYW5kbGVQYXJhbXMgPSBvcHRpb25zLmhhbmRsZVBhcmFtcyhub2RlKVxuICBpZiAoIWlzQXJyYXkoaGFuZGxlUGFyYW1zKSkge1xuICAgIGhhbmRsZVBhcmFtcyA9IFtoYW5kbGVQYXJhbXNdXG4gIH1cblxuICBsZXQgaGFuZGxlcyA9IFtdXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaGFuZGxlUGFyYW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGhhbmRsZSA9IGFzc2lnbih7fSwgaGFuZGxlUGFyYW1zW2ldLCB7XG4gICAgICBncm91cDogJ25vZGVzJyxcbiAgICAgIGdyYWJiYWJsZTogZmFsc2UsXG4gICAgICBzZWxlY3RhYmxlOiBmYWxzZVxuICAgIH0pXG5cbiAgICBpZiAoIWhhbmRsZS5oYXNPd25Qcm9wZXJ0eSgncG9zaXRpb24nKSkge1xuICAgICAgaGFuZGxlLnBvc2l0aW9uID0gdGhpcy5oYW5kbGVQb3NpdGlvbihub2RlKVxuICAgIH1cblxuICAgIGhhbmRsZXMucHVzaChoYW5kbGUpXG4gIH1cblxuICBjeS5zdGFydEJhdGNoKClcbiAgdGhpcy5oaWRlKClcbiAgdGhpcy5oYW5kbGVOb2RlcyA9IGN5LmFkZChoYW5kbGVzKVxuICB0aGlzLmhhbmRsZU5vZGVzLmFkZENsYXNzKCdlaC1oYW5kbGUnKVxuICBjeS5lbmRCYXRjaCgpXG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuZnVuY3Rpb24gdXBkYXRlRWRnZSAoKSB7XG4gIGxldCB7IHNvdXJjZU5vZGUsIGdob3N0Tm9kZSB9ID0gdGhpc1xuICBsZXQgeCA9IHRoaXMubXhcbiAgbGV0IHkgPSB0aGlzLm15XG5cbiAgLy8gY2FuJ3QgZHJhdyBhIGxpbmUgd2l0aG91dCBoYXZpbmcgdGhlIHN0YXJ0aW5nIG5vZGVcbiAgaWYgKCFzb3VyY2VOb2RlKSB7IHJldHVybiB9XG5cbiAgaWYgKGdob3N0Tm9kZS5lbXB0eSgpIHx8IGdob3N0Tm9kZS5yZW1vdmVkKCkpIHtcbiAgICBsZXQgeyBoYW5kbGVOb2RlLCBvcHRpb25zLCBjeSB9ID0gdGhpc1xuICAgIGxldCBnaG9zdEVkZ2UsIGdob3N0RWxlc1xuXG4gICAgY3kuc3RhcnRCYXRjaCgpXG5cbiAgICBnaG9zdE5vZGUgPSB0aGlzLmdob3N0Tm9kZSA9IGN5LmFkZCh7XG4gICAgICBncm91cDogJ25vZGVzJyxcbiAgICAgIGNsYXNzZXM6ICdlaC1naG9zdCBlaC1naG9zdC1ub2RlJyxcbiAgICAgIHBvc2l0aW9uOiB7IHg6IHgsIHk6IHkgfVxuICAgIH0pXG5cbiAgICBnaG9zdE5vZGUuc3R5bGUoe1xuICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAnYmx1ZScsXG4gICAgICAnd2lkdGgnOiAwLjAwMDEsXG4gICAgICAnaGVpZ2h0JzogMC4wMDAxLFxuICAgICAgJ29wYWNpdHknOiAwLFxuICAgICAgJ2V2ZW50cyc6ICdubydcbiAgICB9KVxuXG4gICAgbGV0IGdob3N0RWRnZVBhcmFtcyA9IG9wdGlvbnMuZ2hvc3RFZGdlUGFyYW1zKHNvdXJjZU5vZGUsIGhhbmRsZU5vZGUpXG5cbiAgICBnaG9zdEVkZ2UgPSBjeS5hZGQoYXNzaWduKHt9LCBnaG9zdEVkZ2VQYXJhbXMsIHtcbiAgICAgIGdyb3VwOiAnZWRnZXMnLFxuICAgICAgZGF0YTogYXNzaWduKHt9LCBnaG9zdEVkZ2VQYXJhbXMuZGF0YSwge1xuICAgICAgICBzb3VyY2U6IHNvdXJjZU5vZGUuaWQoKSxcbiAgICAgICAgdGFyZ2V0OiBnaG9zdE5vZGUuaWQoKVxuICAgICAgfSlcbiAgICB9KSlcblxuICAgIGdob3N0RWRnZS5hZGRDbGFzcygnZWgtZ2hvc3QgZWgtZ2hvc3QtZWRnZScpXG4gICAgZ2hvc3RFZGdlLnN0eWxlKCdldmVudHMnLCAnbm8nKVxuXG4gICAgZ2hvc3RFbGVzID0gdGhpcy5naG9zdEVsZXMgPSBjeS5jb2xsZWN0aW9uKClcbiAgICBnaG9zdEVsZXMubWVyZ2UoZ2hvc3ROb2RlKS5tZXJnZShnaG9zdEVkZ2UpXG5cbiAgICBjeS5lbmRCYXRjaCgpXG4gIH0gZWxzZSB7XG4gICAgdGhpcy5naG9zdE5vZGUucG9zaXRpb24oeyB4LCB5IH0pXG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG1ha2VFZGdlcywgbWFrZVByZXZpZXcsIHJlbW92ZVByZXZpZXcsXG4gIHVwZGF0ZUVkZ2UsXG4gIGhhbmRsZVNob3duLCBoYW5kbGVQb3NpdGlvbiwgbWFrZUhhbmRsZXNcbn1cbiIsImZ1bmN0aW9uIGRpc2FibGVFZGdlRXZlbnRzICgpIHtcbiAgaWYgKHRoaXMub3B0aW9ucy5ub0VkZ2VFdmVudHNJbkRyYXcpIHtcbiAgICB0aGlzLmN5LmVkZ2VzKCkuc3R5bGUoJ2V2ZW50cycsICdubycpXG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG5mdW5jdGlvbiBlbmFibGVFZGdlRXZlbnRzICgpIHtcbiAgaWYgKHRoaXMub3B0aW9ucy5ub0VkZ2VFdmVudHNJbkRyYXcpIHtcbiAgICB0aGlzLmN5LmVkZ2VzKCkucmVtb3ZlU3R5bGUoJ2V2ZW50cycpXG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG5leHBvcnQgZGVmYXVsdCB7IGRpc2FibGVFZGdlRXZlbnRzLCBlbmFibGVFZGdlRXZlbnRzIH1cbiIsImZ1bmN0aW9uIGVuYWJsZSAoKSB7XG4gIHRoaXMuZW5hYmxlZCA9IHRydWVcblxuICB0aGlzLmVtaXQoJ2VuYWJsZScpXG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuZnVuY3Rpb24gZGlzYWJsZSAoKSB7XG4gIHRoaXMuZW5hYmxlZCA9IGZhbHNlXG5cbiAgdGhpcy5lbWl0KCdkaXNhYmxlJylcblxuICByZXR1cm4gdGhpc1xufVxuXG5leHBvcnQgZGVmYXVsdCB7IGVuYWJsZSwgZGlzYWJsZSB9XG4iLCJpbXBvcnQgbWVtb2l6ZSBmcm9tICdsb2Rhc2gubWVtb2l6ZSdcbmNvbnN0IHNxcnQyID0gTWF0aC5zcXJ0KDIpXG5cbmZ1bmN0aW9uIGNhblN0YXJ0T24gKG5vZGUpIHtcbiAgY29uc3QgeyBvcHRpb25zLCBwcmV2aWV3RWxlcywgZ2hvc3RFbGVzLCBoYW5kbGVOb2RlcyB9ID0gdGhpc1xuICBjb25zdCBpc1ByZXZpZXcgPSBlbCA9PiBwcmV2aWV3RWxlcy5hbnlTYW1lKGVsKVxuICBjb25zdCBpc0hhbmRsZSA9IGVsID0+IGhhbmRsZU5vZGVzLmFueVNhbWUoZWwpXG4gIGNvbnN0IGlzR2hvc3QgPSBlbCA9PiBnaG9zdEVsZXMuYW55U2FtZShlbClcbiAgY29uc3QgaXNUZW1wID0gZWwgPT4gaXNQcmV2aWV3KGVsKSB8fCBpc0hhbmRsZShlbCkgfHwgaXNHaG9zdChlbClcbiAgY29uc3QgdXNlckZpbHRlciA9IGVsID0+IGVsLmZpbHRlcihvcHRpb25zLnNlbGVjdG9yKS5ub25lbXB0eSgpXG5cbiAgY29uc3QgeyBlbmFibGVkLCBhY3RpdmUsIGdyYWJiaW5nTm9kZSB9ID0gdGhpc1xuXG4gIHJldHVybiAoXG4gICAgZW5hYmxlZCAmJiAhYWN0aXZlICYmICFncmFiYmluZ05vZGVcbiAgICAmJiBub2RlICE9IG51bGwgJiYgbm9kZS5pbnNpZGUoKSAmJiAhaXNUZW1wKG5vZGUpICYmIHVzZXJGaWx0ZXIobm9kZSlcbiAgKVxufVxuXG5mdW5jdGlvbiBjYW5TdGFydERyYXdNb2RlT24gKG5vZGUpIHtcbiAgcmV0dXJuIHRoaXMuY2FuU3RhcnRPbihub2RlKSAmJiB0aGlzLmRyYXdNb2RlXG59XG5cbmZ1bmN0aW9uIGNhblN0YXJ0Tm9uRHJhd01vZGVPbiAobm9kZSkge1xuICByZXR1cm4gdGhpcy5jYW5TdGFydE9uKG5vZGUpICYmICF0aGlzLmRyYXdNb2RlXG59XG5cbmZ1bmN0aW9uIHNob3cgKG5vZGUpIHtcbiAgbGV0IHsgb3B0aW9ucywgZHJhd01vZGUgfSA9IHRoaXNcblxuICBpZiAoIXRoaXMuY2FuU3RhcnRPbihub2RlKSB8fCAoZHJhd01vZGUgJiYgIW9wdGlvbnMuaGFuZGxlSW5EcmF3TW9kZSkgfHwgKHRoaXMuc291cmNlTm9kZSA9PT0gbm9kZSkpIHsgcmV0dXJuIH1cblxuICB0aGlzLnNvdXJjZU5vZGUgPSBub2RlXG4gIHRoaXMubWFrZUhhbmRsZXMobm9kZSlcblxuICBpZiAodGhpcy5oYW5kbGVOb2Rlcy5ub25lbXB0eSgpKSB7XG4gICAgdGhpcy5lbWl0KCdzaG93JywgdGhpcy5tcCgpLCB0aGlzLnNvdXJjZU5vZGUsIHRoaXMuaGFuZGxlTm9kZXMpXG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG5mdW5jdGlvbiBoaWRlICgpIHtcbiAgaWYgKHRoaXMuaGFuZGxlTm9kZXMubm9uZW1wdHkoKSkge1xuICAgIHRoaXMuaGFuZGxlTm9kZXMucmVtb3ZlKClcbiAgICB0aGlzLmhhbmRsZU5vZGVzID0gdGhpcy5jeS5jb2xsZWN0aW9uKClcbiAgICB0aGlzLmVtaXQoJ2hpZGUnLCB0aGlzLm1wKCksIHRoaXMuc291cmNlTm9kZSlcbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbmZ1bmN0aW9uIHN0YXJ0IChub2RlKSB7XG4gIGlmICghdGhpcy5jYW5TdGFydE9uKG5vZGUpKSB7IHJldHVybiB9XG5cbiAgdGhpcy5hY3RpdmUgPSB0cnVlXG5cbiAgdGhpcy5zb3VyY2VOb2RlID0gbm9kZVxuICB0aGlzLnNvdXJjZU5vZGUuYWRkQ2xhc3MoJ2VoLXNvdXJjZScpXG5cbiAgdGhpcy5kaXNhYmxlR2VzdHVyZXMoKVxuICB0aGlzLmRpc2FibGVFZGdlRXZlbnRzKClcblxuICB0aGlzLmVtaXQoJ3N0YXJ0JywgdGhpcy5tcCgpLCBub2RlLCB0aGlzLmhhbmRsZU5vZGUpXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZSAocG9zKSB7XG4gIGlmICghdGhpcy5hY3RpdmUpIHsgcmV0dXJuIH1cblxuICBsZXQgcCA9IHBvc1xuXG4gIHRoaXMubXggPSBwLnhcbiAgdGhpcy5teSA9IHAueVxuXG4gIHRoaXMudXBkYXRlRWRnZSgpXG4gIHRoaXMudGhyb3R0bGVkU25hcCgpXG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuZnVuY3Rpb24gc25hcCAoKSB7XG4gIGlmICghdGhpcy5hY3RpdmUgfHwgIXRoaXMub3B0aW9ucy5zbmFwKSB7IHJldHVybiBmYWxzZSB9XG5cbiAgbGV0IGN5ID0gdGhpcy5jeVxuICBsZXQgdGFyZ2V0ID0gdGhpcy50YXJnZXROb2RlXG4gIGxldCB0aHJlc2hvbGQgPSB0aGlzLm9wdGlvbnMuc25hcFRocmVzaG9sZFxuICBsZXQgbW91c2VQb3MgPSB0aGlzLm1wKClcbiAgbGV0IHsgaGFuZGxlTm9kZSwgcHJldmlld0VsZXMsIGdob3N0Tm9kZSB9ID0gdGhpc1xuXG4gIGxldCByYWRpdXMgPSBuID0+IHNxcnQyICogTWF0aC5tYXgobi5vdXRlcldpZHRoKCksIG4ub3V0ZXJIZWlnaHQoKSkvMiAvLyB3b3JzdC1jYXNlIGVuY2xvc3VyZSBvZiBiYiBieSBjaXJjbGVcbiAgbGV0IHNxRGlzdCA9ICh4MSwgeTEsIHgyLCB5MikgPT4geyBsZXQgZHggPSB4MiAtIHgxOyBsZXQgZHkgPSB5MiAtIHkxOyByZXR1cm4gZHgqZHggKyBkeSpkeTsgfVxuICBsZXQgc3FEaXN0QnlQdCA9IChwMSwgcDIpID0+IHNxRGlzdChwMS54LCBwMS55LCBwMi54LCBwMi55KVxuICBsZXQgbm9kZVNxRGlzdCA9IG4gPT4gc3FEaXN0QnlQdChuLnBvc2l0aW9uKCksIG1vdXNlUG9zKVxuXG4gIGxldCBzcVRocmVzaG9sZCA9IG4gPT4geyBsZXQgciA9IHJhZGl1cyhuKTsgbGV0IHQgPSByICsgdGhyZXNob2xkOyByZXR1cm4gdCAqIHQ7IH1cbiAgbGV0IGlzV2l0aGluVGhlc2hvbGQgPSBuID0+IG5vZGVTcURpc3QobikgPD0gc3FUaHJlc2hvbGQobilcblxuICBsZXQgYmJTcURpc3QgPSBuID0+IHtcbiAgICBsZXQgcCA9IG4ucG9zaXRpb24oKVxuICAgIGxldCBoYWxmVyA9IG4ub3V0ZXJXaWR0aCgpIC8gMlxuICAgIGxldCBoYWxmSCA9IG4ub3V0ZXJIZWlnaHQoKSAvIDJcblxuICAgIC8vIG5vZGUgYW5kIG1vdXNlIHBvc2l0aW9ucywgbGluZSBpcyBmb3JtZWQgZnJvbSBub2RlIHRvIG1vdXNlXG4gICAgbGV0IG54ID0gcC54XG4gICAgbGV0IG55ID0gcC55XG4gICAgbGV0IG14ID0gbW91c2VQb3MueFxuICAgIGxldCBteSA9IG1vdXNlUG9zLnlcblxuICAgIC8vIGJvdW5kaW5nIGJveFxuICAgIGxldCB4MSA9IG54IC0gaGFsZldcbiAgICBsZXQgeDIgPSBueCArIGhhbGZXXG4gICAgbGV0IHkxID0gbnkgLSBoYWxmSFxuICAgIGxldCB5MiA9IG55ICsgaGFsZkhcblxuICAgIGxldCBpbnNpZGVYQm91bmRzID0geDEgPD0gbXggJiYgbXggPD0geDJcbiAgICBsZXQgaW5zaWRlWUJvdW5kcyA9IHkxIDw9IG15ICYmIG15IDw9IHkyXG5cbiAgICBpZiggaW5zaWRlWEJvdW5kcyAmJiBpbnNpZGVZQm91bmRzICl7IC8vIGluc2lkZSBib3hcbiAgICAgIHJldHVybiAwXG4gICAgfSBlbHNlIGlmKCBpbnNpZGVYQm91bmRzICl7IC8vIHBlcnBlbmRpY3VsYXIgZGlzdGFuY2UgdG8gYm94LCB0b3Agb3IgYm90dG9tXG4gICAgICBsZXQgZHkxID0gbXkgLSB5MVxuICAgICAgbGV0IGR5MiA9IG15IC0geTJcblxuICAgICAgcmV0dXJuIE1hdGgubWluKGR5MSAqIGR5MSwgZHkyICogZHkyKVxuICAgIH0gZWxzZSBpZiggaW5zaWRlWUJvdW5kcyApeyAvLyBwZXJwZW5kaWN1bGFyIGRpc3RhbmNlIHRvIGJveCwgbGVmdCBvciByaWdodFxuICAgICAgbGV0IGR4MSA9IG14IC0geDFcbiAgICAgIGxldCBkeDIgPSBteCAtIHgyXG5cbiAgICAgIHJldHVybiBNYXRoLm1pbihkeDEgKiBkeDEsIGR4MiAqIGR4MilcbiAgICB9IGVsc2UgaWYoIG14IDwgeDEgJiYgbXkgPCB5MSApeyAvLyB0b3AtbGVmdCBjb3JuZXIgZGlzdGFuY2VcbiAgICAgIHJldHVybiBzcURpc3QobXgsIG15LCB4MSwgeTEpXG4gICAgfSBlbHNlIGlmKCBteCA+IHgyICYmIG15IDwgeTEgKXsgLy8gdG9wLXJpZ2h0IGNvcm5lciBkaXN0YW5jZVxuICAgICAgcmV0dXJuIHNxRGlzdChteCwgbXksIHgyLCB5MSlcbiAgICB9IGVsc2UgaWYoIG14IDwgeDEgJiYgbXkgPiB5MiApeyAvLyBib3R0b20tbGVmdCBjb3JuZXIgZGlzdGFuY2VcbiAgICAgIHJldHVybiBzcURpc3QobXgsIG15LCB4MSwgeTIpXG4gICAgfSBlbHNlIHsgLy8gYm90dG9tLXJpZ2h0IGNvcm5lciBkaXN0YW5jZVxuICAgICAgcmV0dXJuIHNxRGlzdChteCwgbXksIHgyLCB5MilcbiAgICB9XG4gIH07XG5cbiAgbGV0IGNtcEJiU3FEaXN0ID0gKG4xLCBuMikgPT4gYmJTcURpc3QobjEpIC0gYmJTcURpc3QobjIpO1xuXG4gIGxldCBjbXAgPSBjbXBCYlNxRGlzdDtcblxuICBsZXQgYWxsb3dIb3ZlckRlbGF5ID0gZmFsc2VcblxuICBsZXQgbW91c2VJc0luc2lkZSA9IG4gPT4ge1xuICAgIGxldCBtcCA9IG1vdXNlUG9zO1xuICAgIGxldCB3ID0gbi5vdXRlcldpZHRoKCk7XG4gICAgbGV0IGhhbGZXID0gdy8yO1xuICAgIGxldCBoID0gbi5vdXRlckhlaWdodCgpO1xuICAgIGxldCBoYWxmSCA9IGgvMjtcbiAgICBsZXQgcCA9IG4ucG9zaXRpb24oKTtcbiAgICBsZXQgeDEgPSBwLnggLSBoYWxmVztcbiAgICBsZXQgeDIgPSBwLnggKyBoYWxmVztcbiAgICBsZXQgeTEgPSBwLnkgLSBoYWxmSDtcbiAgICBsZXQgeTIgPSBwLnkgKyBoYWxmSDtcblxuICAgIHJldHVybiAoXG4gICAgICB4MSA8PSBtcC54ICYmIG1wLnggPD0geDJcbiAgICAgICYmIHkxIDw9IG1wLnkgJiYgbXAueSA8PSB5MlxuICAgICk7XG4gIH07XG5cbiAgbGV0IGlzRWhFbGUgPSBuID0+IG4uc2FtZShoYW5kbGVOb2RlKSB8fCBuLnNhbWUocHJldmlld0VsZXMpIHx8IG4uc2FtZShnaG9zdE5vZGUpXG5cbiAgbGV0IG5vZGVzQnlEaXN0ID0gY3kubm9kZXMobiA9PiAhaXNFaEVsZShuKSAmJiBpc1dpdGhpblRoZXNob2xkKG4pKS5zb3J0KGNtcClcbiAgbGV0IHNuYXBwZWQgPSBmYWxzZVxuXG4gIGlmICh0YXJnZXQubm9uZW1wdHkoKSAmJiAhaXNXaXRoaW5UaGVzaG9sZCh0YXJnZXQpKSB7XG4gICAgdGhpcy51bnByZXZpZXcodGFyZ2V0KVxuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlc0J5RGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGxldCBuID0gbm9kZXNCeURpc3RbaV1cblxuICAgIC8vIHNraXAgYSBwYXJlbnQgbm9kZSB3aGVuIHRoZSBtb3VzZSBpcyBpbnNpZGUgaXRcbiAgICBpZiggbi5pc1BhcmVudCgpICYmIG1vdXNlSXNJbnNpZGUobikgKXsgY29udGludWUgfVxuXG4gICAgLy8gc2tpcCBhIGNoaWxkIG5vZGUgd2hlbiB0aGUgbW91c2UgaXMgbm90IGluc2lkZSB0aGUgcGFyZW50XG4gICAgaWYoIG4uaXNDaGlsZCgpICYmICFtb3VzZUlzSW5zaWRlKG4ucGFyZW50KCkpICl7IGNvbnRpbnVlIH1cblxuICAgIGlmIChuLnNhbWUodGFyZ2V0KSB8fCB0aGlzLnByZXZpZXcobiwgYWxsb3dIb3ZlckRlbGF5KSkge1xuICAgICAgc25hcHBlZCA9IHRydWVcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHNuYXBwZWRcbn1cblxuZnVuY3Rpb24gcHJldmlldyAodGFyZ2V0LCBhbGxvd0hvdmVyRGVsYXkgPSB0cnVlKSB7XG4gIGxldCB7IG9wdGlvbnMsIHNvdXJjZU5vZGUsIGdob3N0Tm9kZSwgaGFuZGxlTm9kZSwgZ2hvc3RFbGVzLCBwcmVzdW1wdGl2ZVRhcmdldHMsIHByZXZpZXdFbGVzLCBhY3RpdmUgfSA9IHRoaXNcbiAgbGV0IHNvdXJjZSA9IHNvdXJjZU5vZGVcbiAgbGV0IGlzTG9vcCA9IHRhcmdldC5zYW1lKHNvdXJjZSlcbiAgbGV0IGxvb3BBbGxvd2VkID0gb3B0aW9ucy5sb29wQWxsb3dlZCh0YXJnZXQsIGhhbmRsZU5vZGUpXG4gIGxldCBpc0dob3N0ID0gdGFyZ2V0LnNhbWUoZ2hvc3ROb2RlKVxuICBsZXQgbm9FZGdlID0gIW9wdGlvbnMuZWRnZVR5cGUoc291cmNlLCB0YXJnZXQsIGhhbmRsZU5vZGUpXG4gIGxldCBpc0hhbmRsZSA9IHRhcmdldC5hbnlTYW1lKHRoaXMuaGFuZGxlTm9kZXMpXG4gIGxldCBpc0V4aXN0aW5nVGd0ID0gdGFyZ2V0LnNhbWUodGhpcy50YXJnZXROb2RlKVxuXG4gIGlmICghYWN0aXZlIHx8IGlzSGFuZGxlIHx8IGlzR2hvc3QgfHwgbm9FZGdlIHx8IGlzRXhpc3RpbmdUZ3QgfHwgKGlzTG9vcCAmJiAhbG9vcEFsbG93ZWQpKSB7IHJldHVybiBmYWxzZSB9XG5cbiAgaWYgKHRoaXMudGFyZ2V0Tm9kZS5ub25lbXB0eSgpKSB7XG4gICAgdGhpcy51bnByZXZpZXcodGhpcy50YXJnZXROb2RlKVxuICB9XG5cbiAgY2xlYXJUaW1lb3V0KHRoaXMucHJldmlld1RpbWVvdXQpXG5cbiAgbGV0IGFwcGx5UHJldmlldyA9ICgpID0+IHtcbiAgICB0aGlzLnRhcmdldE5vZGUgPSB0YXJnZXRcblxuICAgIHByZXN1bXB0aXZlVGFyZ2V0cy5tZXJnZSh0YXJnZXQpXG5cbiAgICB0YXJnZXQuYWRkQ2xhc3MoJ2VoLXByZXN1bXB0aXZlLXRhcmdldCcpXG4gICAgdGFyZ2V0LmFkZENsYXNzKCdlaC10YXJnZXQnKVxuXG4gICAgdGhpcy5lbWl0KCdob3Zlcm92ZXInLCB0aGlzLm1wKCksIHNvdXJjZSwgdGFyZ2V0KVxuXG4gICAgaWYgKG9wdGlvbnMucHJldmlldykge1xuICAgICAgdGFyZ2V0LmFkZENsYXNzKCdlaC1wcmV2aWV3JylcblxuICAgICAgZ2hvc3RFbGVzLmFkZENsYXNzKCdlaC1wcmV2aWV3LWFjdGl2ZScpXG4gICAgICBzb3VyY2VOb2RlLmFkZENsYXNzKCdlaC1wcmV2aWV3LWFjdGl2ZScpXG4gICAgICB0YXJnZXQuYWRkQ2xhc3MoJ2VoLXByZXZpZXctYWN0aXZlJylcblxuICAgICAgdGhpcy5tYWtlUHJldmlldygpXG5cbiAgICAgIHRoaXMuZW1pdCgncHJldmlld29uJywgdGhpcy5tcCgpLCBzb3VyY2UsIHRhcmdldCwgcHJldmlld0VsZXMpXG4gICAgfVxuICB9XG5cbiAgaWYgKGFsbG93SG92ZXJEZWxheSAmJiBvcHRpb25zLmhvdmVyRGVsYXkgPiAwKSB7XG4gICAgdGhpcy5wcmV2aWV3VGltZW91dCA9IHNldFRpbWVvdXQoYXBwbHlQcmV2aWV3LCBvcHRpb25zLmhvdmVyRGVsYXkpXG4gIH0gZWxzZSB7XG4gICAgYXBwbHlQcmV2aWV3KClcbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbmZ1bmN0aW9uIHVucHJldmlldyAodGFyZ2V0KSB7XG4gIGlmICghdGhpcy5hY3RpdmUgfHwgdGFyZ2V0LmFueVNhbWUodGhpcy5oYW5kbGVOb2RlcykpIHsgcmV0dXJuIH1cblxuICBsZXQgeyBnaG9zdEVsZXMsIHByZXZpZXdFbGVzLCBjeSB9ID0gdGhpc1xuICBsZXQgc291cmNlID0gdGhpcy5zb3VyY2VOb2RlXG5cbiAgY2xlYXJUaW1lb3V0KHRoaXMucHJldmlld1RpbWVvdXQpXG4gIHRoaXMucHJldmlld1RpbWVvdXQgPSBudWxsXG5cbiAgc291cmNlLnJlbW92ZUNsYXNzKCdlaC1wcmV2aWV3LWFjdGl2ZScpXG4gIHRhcmdldC5yZW1vdmVDbGFzcygnZWgtcHJldmlldy1hY3RpdmUgZWgtcHJldmlldyBlaC10YXJnZXQgZWgtcHJlc3VtcHRpdmUtdGFyZ2V0JylcbiAgZ2hvc3RFbGVzLnJlbW92ZUNsYXNzKCdlaC1wcmV2aWV3LWFjdGl2ZScpXG5cbiAgdGhpcy50YXJnZXROb2RlID0gY3kuY29sbGVjdGlvbigpXG5cbiAgdGhpcy5yZW1vdmVQcmV2aWV3KClcblxuICB0aGlzLmVtaXQoJ2hvdmVyb3V0JywgdGhpcy5tcCgpLCBzb3VyY2UsIHRhcmdldClcbiAgdGhpcy5lbWl0KCdwcmV2aWV3b2ZmJywgdGhpcy5tcCgpLCBzb3VyY2UsIHRhcmdldCwgcHJldmlld0VsZXMpXG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuZnVuY3Rpb24gc3RvcCAoKSB7XG4gIGlmICghdGhpcy5hY3RpdmUpIHsgcmV0dXJuIH1cblxuICBsZXQgeyBzb3VyY2VOb2RlIH0gPSB0aGlzXG5cbiAgY2xlYXJUaW1lb3V0KHRoaXMucHJldmlld1RpbWVvdXQpXG5cbiAgdGhpcy5zb3VyY2VOb2RlLnJlbW92ZUNsYXNzKCdlaC1zb3VyY2UnKVxuICB0aGlzLnRhcmdldE5vZGUucmVtb3ZlQ2xhc3MoJ2VoLXRhcmdldCBlaC1wcmV2aWV3IGVoLWhvdmVyJylcbiAgdGhpcy5wcmVzdW1wdGl2ZVRhcmdldHMucmVtb3ZlQ2xhc3MoJ2VoLXByZXN1bXB0aXZlLXRhcmdldCcpXG5cbiAgdGhpcy5naG9zdEVsZXMucmVtb3ZlKClcblxuICB0aGlzLmhpZGUoKVxuXG4gIHRoaXMubWFrZUVkZ2VzKClcblxuICB0aGlzLmNsZWFyQ29sbGVjdGlvbnMoKVxuXG4gIHRoaXMucmVzZXRHZXN0dXJlcygpXG4gIHRoaXMuZW5hYmxlRWRnZUV2ZW50cygpXG5cbiAgdGhpcy5hY3RpdmUgPSBmYWxzZVxuXG4gIHRoaXMuZW1pdCgnc3RvcCcsIHRoaXMubXAoKSwgc291cmNlTm9kZSlcblxuICByZXR1cm4gdGhpc1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHNob3csIGhpZGUsIHN0YXJ0LCB1cGRhdGUsIHByZXZpZXcsIHVucHJldmlldywgc3RvcCwgc25hcCxcbiAgY2FuU3RhcnRPbiwgY2FuU3RhcnREcmF3TW9kZU9uLCBjYW5TdGFydE5vbkRyYXdNb2RlT25cbn1cbiIsImltcG9ydCBkZWZhdWx0cyBmcm9tICcuL2RlZmF1bHRzJ1xuaW1wb3J0IGFzc2lnbiBmcm9tICcuLi9hc3NpZ24nXG5pbXBvcnQgdGhyb3R0bGUgZnJvbSAnbG9kYXNoLnRocm90dGxlJ1xuaW1wb3J0IGN5R2VzdHVyZXNUb2dnbGUgZnJvbSAnLi9jeS1nZXN0dXJlcy10b2dnbGUnXG5pbXBvcnQgY3lMaXN0ZW5lcnMgZnJvbSAnLi9jeS1saXN0ZW5lcnMnXG5pbXBvcnQgZHJhd01vZGUgZnJvbSAnLi9kcmF3LW1vZGUnXG5pbXBvcnQgZHJhd2luZyBmcm9tICcuL2RyYXdpbmcnXG5pbXBvcnQgZW5hYmxpbmcgZnJvbSAnLi9lbmFibGluZydcbmltcG9ydCBnZXN0dXJlTGlmZWN5Y2xlIGZyb20gJy4vZ2VzdHVyZS1saWZlY3ljbGUnXG5pbXBvcnQgbGlzdGVuZXJzIGZyb20gJy4vbGlzdGVuZXJzJ1xuaW1wb3J0IGVkZ2VFdmVudHMgZnJvbSAnLi9lZGdlLWV2ZW50cy10b2dnbGUnXG5cbmZ1bmN0aW9uIEVkZ2VoYW5kbGVzIChjeSwgb3B0aW9ucykge1xuICB0aGlzLmN5ID0gY3lcbiAgdGhpcy5saXN0ZW5lcnMgPSBbXVxuXG4gIC8vIGVkZ2VoYW5kbGVzIGdlc3R1cmUgc3RhdGVcbiAgdGhpcy5lbmFibGVkID0gdHJ1ZVxuICB0aGlzLmRyYXdNb2RlID0gZmFsc2VcbiAgdGhpcy5hY3RpdmUgPSBmYWxzZVxuICB0aGlzLmdyYWJiaW5nTm9kZSA9IGZhbHNlXG5cbiAgLy8gZWRnZWhhbmRsZXMgZWxlbWVudHNcbiAgdGhpcy5oYW5kbGVOb2RlcyA9IGN5LmNvbGxlY3Rpb24oKVxuICB0aGlzLmNsZWFyQ29sbGVjdGlvbnMoKVxuXG4gIC8vIG1vdXNlIHBvc2l0aW9uXG4gIHRoaXMubXggPSAwXG4gIHRoaXMubXkgPSAwXG5cbiAgdGhpcy5vcHRpb25zID0gYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucylcblxuICB0aGlzLnNhdmVHZXN0dXJlU3RhdGUoKVxuICB0aGlzLmFkZExpc3RlbmVycygpXG5cbiAgdGhpcy50aHJvdHRsZWRTbmFwID0gdGhyb3R0bGUodGhpcy5zbmFwLmJpbmQodGhpcyksIDEwMDAgLyB0aGlzLm9wdGlvbnMuc25hcEZyZXF1ZW5jeSlcblxuICB0aGlzLnByZXZlbnREZWZhdWx0ID0gZSA9PiBlLnByZXZlbnREZWZhdWx0KClcblxuICBsZXQgc3VwcG9ydHNQYXNzaXZlID0gZmFsc2VcbiAgdHJ5IHtcbiAgICBsZXQgb3B0cyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3Bhc3NpdmUnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3VwcG9ydHNQYXNzaXZlID0gdHJ1ZVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICB9XG4gICAgfSlcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdfJywgbnVsbCwgb3B0cylcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgLy8gZW1wdHlcbiAgfVxuXG4gIGlmIChzdXBwb3J0c1Bhc3NpdmUpIHtcbiAgICB0aGlzLndpbmRvd0xpc3RlbmVyT3B0aW9ucyA9IHsgY2FwdHVyZTogdHJ1ZSwgcGFzc2l2ZTogZmFsc2UgfVxuICB9IGVsc2Uge1xuICAgIHRoaXMud2luZG93TGlzdGVuZXJPcHRpb25zID0gdHJ1ZVxuICB9XG59XG5cbmxldCBwcm90byA9IEVkZ2VoYW5kbGVzLnByb3RvdHlwZSA9IHt9XG5cbnByb3RvLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucmVtb3ZlTGlzdGVuZXJzKClcbn1cblxucHJvdG8uc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIGFzc2lnbih0aGlzLm9wdGlvbnMsIG9wdGlvbnMpXG59XG5cbnByb3RvLm1wID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4geyB4OiB0aGlzLm14LCB5OiB0aGlzLm15IH1cbn1cblxucHJvdG8uY2xlYXJDb2xsZWN0aW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgbGV0IHsgY3kgfSA9IHRoaXNcblxuICB0aGlzLmhhbmRsZU5vZGUgPSBjeS5jb2xsZWN0aW9uKClcbiAgdGhpcy5wcmV2aWV3RWxlcyA9IGN5LmNvbGxlY3Rpb24oKVxuICB0aGlzLmdob3N0Tm9kZSA9IGN5LmNvbGxlY3Rpb24oKVxuICB0aGlzLmdob3N0RWxlcyA9IGN5LmNvbGxlY3Rpb24oKVxuICB0aGlzLnNvdXJjZU5vZGUgPSBjeS5jb2xsZWN0aW9uKClcbiAgdGhpcy50YXJnZXROb2RlID0gY3kuY29sbGVjdGlvbigpXG4gIHRoaXMucHJlc3VtcHRpdmVUYXJnZXRzID0gY3kuY29sbGVjdGlvbigpXG59XG5cbmxldCBleHRlbmQgPSBvYmogPT4gYXNzaWduKHByb3RvLCBvYmopXG5sZXQgZm4gPSBbXG4gIGN5R2VzdHVyZXNUb2dnbGUsXG4gIGN5TGlzdGVuZXJzLFxuICBkcmF3TW9kZSxcbiAgZHJhd2luZyxcbiAgZW5hYmxpbmcsXG4gIGdlc3R1cmVMaWZlY3ljbGUsXG4gIGxpc3RlbmVycyxcbiAgZWRnZUV2ZW50c1xuXVxuZm4uZm9yRWFjaChleHRlbmQpXG5cbmV4cG9ydCBkZWZhdWx0IEVkZ2VoYW5kbGVzXG4iLCJmdW5jdGlvbiBhZGRMaXN0ZW5lcnMgKCkge1xuICB0aGlzLmFkZEN5dG9zY2FwZUxpc3RlbmVycygpXG5cbiAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLmN5LCAnZGVzdHJveScsICgpID0+IHRoaXMuZGVzdHJveSgpKVxuXG4gIHJldHVybiB0aGlzXG59XG5cbmZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVycyAoKSB7XG4gIGZvciAobGV0IGkgPSB0aGlzLmxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGxldCBsID0gdGhpcy5saXN0ZW5lcnNbaV1cblxuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIobC50YXJnZXQsIGwuZXZlbnQsIGwuc2VsZWN0b3IsIGwuY2FsbGJhY2ssIGwub3B0aW9ucylcbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbmZ1bmN0aW9uIGdldExpc3RlbmVyICh0YXJnZXQsIGV2ZW50LCBzZWxlY3RvciwgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gdHlwZW9mICcnKSB7XG4gICAgY2FsbGJhY2sgPSBzZWxlY3RvclxuICAgIG9wdGlvbnMgPSBjYWxsYmFja1xuICAgIHNlbGVjdG9yID0gbnVsbFxuICB9XG5cbiAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgIG9wdGlvbnMgPSBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIHsgdGFyZ2V0LCBldmVudCwgc2VsZWN0b3IsIGNhbGxiYWNrLCBvcHRpb25zIH1cbn1cblxuZnVuY3Rpb24gaXNEb20gKHRhcmdldCkge1xuICByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgRWxlbWVudFxufVxuXG5mdW5jdGlvbiBhZGRMaXN0ZW5lciAodGFyZ2V0LCBldmVudCwgc2VsZWN0b3IsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gIGxldCBsID0gZ2V0TGlzdGVuZXIodGFyZ2V0LCBldmVudCwgc2VsZWN0b3IsIGNhbGxiYWNrLCBvcHRpb25zKVxuXG4gIHRoaXMubGlzdGVuZXJzLnB1c2gobClcblxuICBpZiAoaXNEb20obC50YXJnZXQpKSB7XG4gICAgbC50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihsLmV2ZW50LCBsLmNhbGxiYWNrLCBsLm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaWYgKGwuc2VsZWN0b3IpIHtcbiAgICAgIGwudGFyZ2V0LmFkZExpc3RlbmVyKGwuZXZlbnQsIGwuc2VsZWN0b3IsIGwuY2FsbGJhY2ssIGwub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgbC50YXJnZXQuYWRkTGlzdGVuZXIobC5ldmVudCwgbC5jYWxsYmFjaywgbC5vcHRpb25zKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbmZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyICh0YXJnZXQsIGV2ZW50LCBzZWxlY3RvciwgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgbGV0IGwgPSBnZXRMaXN0ZW5lcih0YXJnZXQsIGV2ZW50LCBzZWxlY3RvciwgY2FsbGJhY2ssIG9wdGlvbnMpXG5cbiAgZm9yIChsZXQgaSA9IHRoaXMubGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgbGV0IGwyID0gdGhpcy5saXN0ZW5lcnNbaV1cblxuICAgIGlmIChcbiAgICAgIGwudGFyZ2V0ID09PSBsMi50YXJnZXRcbiAgICAgICYmIGwuZXZlbnQgPT09IGwyLmV2ZW50XG4gICAgICAmJiAobC5zZWxlY3RvciA9PSBudWxsIHx8IGwuc2VsZWN0b3IgPT09IGwyLnNlbGVjdG9yKVxuICAgICAgJiYgKGwuY2FsbGJhY2sgPT0gbnVsbCB8fCBsLmNhbGxiYWNrID09PSBsMi5jYWxsYmFjaylcbiAgICApIHtcbiAgICAgIHRoaXMubGlzdGVuZXJzLnNwbGljZShpLCAxKVxuXG4gICAgICBpZiAoaXNEb20obC50YXJnZXQpKSB7XG4gICAgICAgIGwudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIobC5ldmVudCwgbC5jYWxsYmFjaywgbC5vcHRpb25zKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGwuc2VsZWN0b3IpIHtcbiAgICAgICAgICBsLnRhcmdldC5yZW1vdmVMaXN0ZW5lcihsLmV2ZW50LCBsLnNlbGVjdG9yLCBsLmNhbGxiYWNrLCBsLm9wdGlvbnMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbC50YXJnZXQucmVtb3ZlTGlzdGVuZXIobC5ldmVudCwgbC5jYWxsYmFjaywgbC5vcHRpb25zKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuZnVuY3Rpb24gZW1pdCAodHlwZSwgcG9zaXRpb24sIC4uLmFyZ3MpIHtcbiAgbGV0IHsgb3B0aW9ucywgY3kgfSA9IHRoaXNcblxuICBjeS5lbWl0KHsgdHlwZTogYGVoJHt0eXBlfWAsIHBvc2l0aW9uIH0sIGFyZ3MpXG5cbiAgbGV0IGhhbmRsZXIgPSBvcHRpb25zW3R5cGVdXG5cbiAgaWYgKGhhbmRsZXIgIT0gbnVsbCkge1xuICAgIGhhbmRsZXIoLi4uYXJncylcbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbmV4cG9ydCBkZWZhdWx0IHsgYWRkTGlzdGVuZXIsIGFkZExpc3RlbmVycywgcmVtb3ZlTGlzdGVuZXIsIHJlbW92ZUxpc3RlbmVycywgZW1pdCB9XG4iLCJpbXBvcnQgY29yZSBmcm9tICcuL2NvcmUnXG5cbi8vIHJlZ2lzdGVycyB0aGUgZXh0ZW5zaW9uIG9uIGEgY3l0b3NjYXBlIGxpYiByZWZcbmxldCByZWdpc3RlciA9IGZ1bmN0aW9uIChjeXRvc2NhcGUpIHtcbiAgaWYgKCFjeXRvc2NhcGUpIHtcbiAgICByZXR1cm5cbiAgfSAvLyBjYW4ndCByZWdpc3RlciBpZiBjeXRvc2NhcGUgdW5zcGVjaWZpZWRcblxuICBjeXRvc2NhcGUoJ2NvcmUnLCAnZWRnZWhhbmRsZXMnLCBjb3JlKSAvLyByZWdpc3RlciB3aXRoIGN5dG9zY2FwZS5qc1xufVxuXG5pZiAodHlwZW9mIGN5dG9zY2FwZSAhPT0gJ3VuZGVmaW5lZCcpIHsgLy8gZXhwb3NlIHRvIGdsb2JhbCBjeXRvc2NhcGUgKGkuZS4gd2luZG93LmN5dG9zY2FwZSlcbiAgcmVnaXN0ZXIoY3l0b3NjYXBlKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlZ2lzdGVyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfbG9kYXNoX21lbW9pemVfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfbG9kYXNoX3Rocm90dGxlX187Il0sInNvdXJjZVJvb3QiOiIifQ==