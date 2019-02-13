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

  if (options.hasOwnProperty('handleNodes')) {
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
  }); // hide handle when source node moved

  this.addListener(cy, 'position', 'node', function (e) {
    if (e.target.same(_this.sourceNode)) {
      _this.hide();
    }
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
    _this.preview(e.target);
  }); // hover out unpreview

  this.addListener(cy, 'tapdragout', 'node', function (e) {
    if (options.snap && e.target.same(_this.targetNode)) {// then keep the preview
    } else {
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
    return [];
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
  /* eslint-enable */

};
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

function removeHandles() {
  if (this.handleNodes.nonempty()) {
    this.handleNodes.remove();
    this.handleNodes = this.cy.collection();
  }

  return this;
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
  this.removeHandles();
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
  makeHandles: makeHandles,
  removeHandles: removeHandles
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

  if (!this.canStartOn(node) || drawMode && !options.handleInDrawMode) {
    return;
  }

  this.sourceNode = node;
  this.makeHandles(node);
  this.emit('show', this.mp(), node, this.handleNodes);
  return this;
}

function hide() {
  this.removeHandles();
  this.emit('hide', this.mp(), this.sourceNode);
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

  var sqThreshold = function sqThreshold(n) {
    var r = getRadius(n);
    var t = r + threshold;
    return t * t;
  };

  var mousePos = this.mp();

  var sqDist = function sqDist(p1, p2) {
    return (p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y);
  };

  var getRadius = function getRadius(n) {
    return (n.outerWidth() + n.outerHeight()) / 4;
  };

  var nodeSqDist = lodash_memoize__WEBPACK_IMPORTED_MODULE_0___default()(function (n) {
    return sqDist(n.position(), mousePos);
  }, function (n) {
    return n.id();
  });

  var isWithinTheshold = function isWithinTheshold(n) {
    return nodeSqDist(n) <= sqThreshold(n);
  };

  var cmpSqDist = function cmpSqDist(n1, n2) {
    return nodeSqDist(n1) - nodeSqDist(n2);
  };

  var allowHoverDelay = false;
  var nodesByDist = cy.nodes(isWithinTheshold).sort(cmpSqDist);
  var snapped = false;

  if (target.nonempty() && !isWithinTheshold(target)) {
    this.unpreview(target);
  }

  for (var i = 0; i < nodesByDist.length; i++) {
    var n = nodesByDist[i];

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
  this.removeHandles();
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
  this.throttledSnap = lodash_throttle__WEBPACK_IMPORTED_MODULE_2___default()(this.snap.bind(this), 1000 / options.snapFrequency);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jeXRvc2NhcGVFZGdlaGFuZGxlcy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vY3l0b3NjYXBlRWRnZWhhbmRsZXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY3l0b3NjYXBlRWRnZWhhbmRsZXMvLi9zcmMvYXNzaWduLmpzIiwid2VicGFjazovL2N5dG9zY2FwZUVkZ2VoYW5kbGVzLy4vc3JjL2NvcmUuanMiLCJ3ZWJwYWNrOi8vY3l0b3NjYXBlRWRnZWhhbmRsZXMvLi9zcmMvZWRnZWhhbmRsZXMvY3ktZ2VzdHVyZXMtdG9nZ2xlLmpzIiwid2VicGFjazovL2N5dG9zY2FwZUVkZ2VoYW5kbGVzLy4vc3JjL2VkZ2VoYW5kbGVzL2N5LWxpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly9jeXRvc2NhcGVFZGdlaGFuZGxlcy8uL3NyYy9lZGdlaGFuZGxlcy9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9jeXRvc2NhcGVFZGdlaGFuZGxlcy8uL3NyYy9lZGdlaGFuZGxlcy9kcmF3LW1vZGUuanMiLCJ3ZWJwYWNrOi8vY3l0b3NjYXBlRWRnZWhhbmRsZXMvLi9zcmMvZWRnZWhhbmRsZXMvZHJhd2luZy5qcyIsIndlYnBhY2s6Ly9jeXRvc2NhcGVFZGdlaGFuZGxlcy8uL3NyYy9lZGdlaGFuZGxlcy9lZGdlLWV2ZW50cy10b2dnbGUuanMiLCJ3ZWJwYWNrOi8vY3l0b3NjYXBlRWRnZWhhbmRsZXMvLi9zcmMvZWRnZWhhbmRsZXMvZW5hYmxpbmcuanMiLCJ3ZWJwYWNrOi8vY3l0b3NjYXBlRWRnZWhhbmRsZXMvLi9zcmMvZWRnZWhhbmRsZXMvZ2VzdHVyZS1saWZlY3ljbGUuanMiLCJ3ZWJwYWNrOi8vY3l0b3NjYXBlRWRnZWhhbmRsZXMvLi9zcmMvZWRnZWhhbmRsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY3l0b3NjYXBlRWRnZWhhbmRsZXMvLi9zcmMvZWRnZWhhbmRsZXMvbGlzdGVuZXJzLmpzIiwid2VicGFjazovL2N5dG9zY2FwZUVkZ2VoYW5kbGVzLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2N5dG9zY2FwZUVkZ2VoYW5kbGVzL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJsb2Rhc2gubWVtb2l6ZVwiLFwiY29tbW9uanMyXCI6XCJsb2Rhc2gubWVtb2l6ZVwiLFwiYW1kXCI6XCJsb2Rhc2gubWVtb2l6ZVwiLFwicm9vdFwiOltcIl9cIixcIm1lbW9pemVcIl19Iiwid2VicGFjazovL2N5dG9zY2FwZUVkZ2VoYW5kbGVzL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJsb2Rhc2gudGhyb3R0bGVcIixcImNvbW1vbmpzMlwiOlwibG9kYXNoLnRocm90dGxlXCIsXCJhbWRcIjpcImxvZGFzaC50aHJvdHRsZVwiLFwicm9vdFwiOltcIl9cIixcInRocm90dGxlXCJdfSJdLCJuYW1lcyI6WyJPYmplY3QiLCJhc3NpZ24iLCJiaW5kIiwidCIsInNyY3MiLCJmaWx0ZXIiLCJzcmMiLCJmb3JFYWNoIiwia2V5cyIsImsiLCJvcHRpb25zIiwiY3kiLCJoYXNPd25Qcm9wZXJ0eSIsInNlbGVjdG9yIiwiaGFuZGxlTm9kZXMiLCJFZGdlaGFuZGxlcyIsImRpc2FibGVHZXN0dXJlcyIsInNhdmVHZXN0dXJlU3RhdGUiLCJ6b29taW5nRW5hYmxlZCIsInBhbm5pbmdFbmFibGVkIiwiYm94U2VsZWN0aW9uRW5hYmxlZCIsImRpc2FibGVCcm93c2VyR2VzdHVyZXMiLCJ3bE9wdHMiLCJ3aW5kb3dMaXN0ZW5lck9wdGlvbnMiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicHJldmVudERlZmF1bHQiLCJyZXNldEdlc3R1cmVzIiwibGFzdFpvb21pbmdFbmFibGVkIiwibGFzdFBhbm5pbmdFbmFibGVkIiwibGFzdEJveFNlbGVjdGlvbkVuYWJsZWQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWRkQ3l0b3NjYXBlTGlzdGVuZXJzIiwiYWRkTGlzdGVuZXIiLCJncmFiYmluZ05vZGUiLCJlIiwic2hvdyIsInRhcmdldCIsInNhbWUiLCJzb3VyY2VOb2RlIiwiaGlkZSIsIm5vZGUiLCJhbnlTYW1lIiwiaGFuZGxlTm9kZSIsImludGVyc2VjdGlvbiIsInN0YXJ0IiwiZHJhd01vZGUiLCJ1cGRhdGUiLCJwb3NpdGlvbiIsInByZXZpZXciLCJzbmFwIiwidGFyZ2V0Tm9kZSIsInVucHJldmlldyIsInN0b3AiLCJkZWZhdWx0cyIsImhvdmVyRGVsYXkiLCJzbmFwVGhyZXNob2xkIiwic25hcEZyZXF1ZW5jeSIsIm5vRWRnZUV2ZW50c0luRHJhdyIsImhhbmRsZVBhcmFtcyIsImhhbmRsZVBvc2l0aW9uIiwiaGFuZGxlSW5EcmF3TW9kZSIsImVkZ2VUeXBlIiwibG9vcEFsbG93ZWQiLCJub2RlTG9vcE9mZnNldCIsIm5vZGVQYXJhbXMiLCJlZGdlUGFyYW1zIiwiaSIsImdob3N0RWRnZVBhcmFtcyIsImNvbXBsZXRlIiwiYWRkZWRFbGVzIiwiY2FuY2VsIiwiY2FuY2VsbGVkVGFyZ2V0cyIsImhvdmVyb3ZlciIsImhvdmVyb3V0IiwicHJldmlld29uIiwicHJldmlld0VsZXMiLCJwcmV2aWV3b2ZmIiwiZHJhd29uIiwiZHJhd29mZiIsInRvZ2dsZURyYXdNb2RlIiwiYm9vbCIsInByZXZVbmdyYWJpZnlTdGF0ZSIsImF1dG91bmdyYWJpZnkiLCJoYW5kbGVTaG93biIsImVtaXQiLCJlbmFibGVEcmF3TW9kZSIsImRpc2FibGVEcmF3TW9kZSIsImlzQXJyYXkiLCJvYmoiLCJBcnJheSIsIm1ha2VFZGdlcyIsImFjdGl2ZSIsInByZXN1bXB0aXZlVGFyZ2V0cyIsImVtcHR5IiwicmVtb3ZlUHJldmlldyIsIm1wIiwibm9uZW1wdHkiLCJzdGFydEJhdGNoIiwicmVtb3ZlQ2xhc3MiLCJyZW1vdmVTdHlsZSIsImVuZEJhdGNoIiwicCIsInAxIiwicDIiLCJ4IiwieSIsImFkZGVkIiwiY29sbGVjdGlvbiIsImludGVyTm9kZVBhcmFtcyIsImVkZ2VQYXJhbXMyIiwiaW50ZXJOb2RlIiwiYWRkIiwiZ3JvdXAiLCJzb3VyY2VFZGdlIiwiZGF0YSIsInNvdXJjZSIsImlkIiwidGFyZ2V0RWRnZSIsIm1lcmdlIiwic3R5bGUiLCJhZGRDbGFzcyIsIm1ha2VQcmV2aWV3IiwicmVtb3ZlIiwicmVtb3ZlSGFuZGxlcyIsImgiLCJvdXRlckhlaWdodCIsInciLCJvdXRlcldpZHRoIiwibW92ZVgiLCJtb3ZlWSIsImF4ZXMiLCJ0b0xvd2VyQ2FzZSIsInNwbGl0IiwiYXhpc1giLCJheGlzWSIsImh4IiwiaHkiLCJtYWtlSGFuZGxlcyIsImhhbmRsZXMiLCJsZW5ndGgiLCJoYW5kbGUiLCJncmFiYmFibGUiLCJzZWxlY3RhYmxlIiwicHVzaCIsInVwZGF0ZUVkZ2UiLCJnaG9zdE5vZGUiLCJteCIsIm15IiwicmVtb3ZlZCIsImdob3N0RWRnZSIsImdob3N0RWxlcyIsImNsYXNzZXMiLCJkaXNhYmxlRWRnZUV2ZW50cyIsImVkZ2VzIiwiZW5hYmxlRWRnZUV2ZW50cyIsImVuYWJsZSIsImVuYWJsZWQiLCJkaXNhYmxlIiwiY2FuU3RhcnRPbiIsImlzUHJldmlldyIsImVsIiwiaXNIYW5kbGUiLCJpc0dob3N0IiwiaXNUZW1wIiwidXNlckZpbHRlciIsImluc2lkZSIsImNhblN0YXJ0RHJhd01vZGVPbiIsImNhblN0YXJ0Tm9uRHJhd01vZGVPbiIsInBvcyIsInRocm90dGxlZFNuYXAiLCJ0aHJlc2hvbGQiLCJzcVRocmVzaG9sZCIsIm4iLCJyIiwiZ2V0UmFkaXVzIiwibW91c2VQb3MiLCJzcURpc3QiLCJub2RlU3FEaXN0IiwibWVtb2l6ZSIsImlzV2l0aGluVGhlc2hvbGQiLCJjbXBTcURpc3QiLCJuMSIsIm4yIiwiYWxsb3dIb3ZlckRlbGF5Iiwibm9kZXNCeURpc3QiLCJub2RlcyIsInNvcnQiLCJzbmFwcGVkIiwiaXNMb29wIiwibm9FZGdlIiwiaXNFeGlzdGluZ1RndCIsImNsZWFyVGltZW91dCIsInByZXZpZXdUaW1lb3V0IiwiYXBwbHlQcmV2aWV3Iiwic2V0VGltZW91dCIsImNsZWFyQ29sbGVjdGlvbnMiLCJsaXN0ZW5lcnMiLCJhZGRMaXN0ZW5lcnMiLCJ0aHJvdHRsZSIsInN1cHBvcnRzUGFzc2l2ZSIsIm9wdHMiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsInVuZGVmaW5lZCIsImVyciIsImNhcHR1cmUiLCJwYXNzaXZlIiwicHJvdG8iLCJwcm90b3R5cGUiLCJkZXN0cm95IiwicmVtb3ZlTGlzdGVuZXJzIiwic2V0T3B0aW9ucyIsImV4dGVuZCIsImZuIiwiY3lHZXN0dXJlc1RvZ2dsZSIsImN5TGlzdGVuZXJzIiwiZHJhd2luZyIsImVuYWJsaW5nIiwiZ2VzdHVyZUxpZmVjeWNsZSIsImVkZ2VFdmVudHMiLCJsIiwicmVtb3ZlTGlzdGVuZXIiLCJldmVudCIsImNhbGxiYWNrIiwiZ2V0TGlzdGVuZXIiLCJpc0RvbSIsIkVsZW1lbnQiLCJsMiIsInNwbGljZSIsInR5cGUiLCJhcmdzIiwiaGFuZGxlciIsInJlZ2lzdGVyIiwiY3l0b3NjYXBlIiwiY29yZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxl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QUQsQ0FBUixDQURvQyxDQUNoQjtBQUNyQjs7QUFFY0QsdUVBQWYsRTs7Ozs7Ozs7Ozs7QUNmQSw0RDs7Ozs7Ozs7Ozs7QUNBQSw2RCIsImZpbGUiOiJjeXRvc2NhcGUtZWRnZWhhbmRsZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJsb2Rhc2gubWVtb2l6ZVwiKSwgcmVxdWlyZShcImxvZGFzaC50aHJvdHRsZVwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJsb2Rhc2gubWVtb2l6ZVwiLCBcImxvZGFzaC50aHJvdHRsZVwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJjeXRvc2NhcGVFZGdlaGFuZGxlc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImxvZGFzaC5tZW1vaXplXCIpLCByZXF1aXJlKFwibG9kYXNoLnRocm90dGxlXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJjeXRvc2NhcGVFZGdlaGFuZGxlc1wiXSA9IGZhY3Rvcnkocm9vdFtcIl9cIl1bXCJtZW1vaXplXCJdLCByb290W1wiX1wiXVtcInRocm90dGxlXCJdKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9sb2Rhc2hfbWVtb2l6ZV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2xvZGFzaF90aHJvdHRsZV9fKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvLyBTaW1wbGUsIGludGVybmFsIE9iamVjdC5hc3NpZ24oKSBwb2x5ZmlsbCBmb3Igb3B0aW9ucyBvYmplY3RzIGV0Yy5cblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbiAhPSBudWxsID8gT2JqZWN0LmFzc2lnbi5iaW5kKE9iamVjdCkgOiBmdW5jdGlvbiAodCwgLi4uc3Jjcykge1xuICBzcmNzLmZpbHRlcihzcmMgPT4gc3JjICE9IG51bGwpLmZvckVhY2goc3JjID0+IHtcbiAgICBPYmplY3Qua2V5cyhzcmMpLmZvckVhY2goayA9PiB0W2tdID0gc3JjW2tdKVxuICB9KVxuICByZXR1cm4gdFxufVxuIiwiaW1wb3J0IEVkZ2VoYW5kbGVzIGZyb20gJy4vZWRnZWhhbmRsZXMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIGxldCBjeSA9IHRoaXNcblxuICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnaGFuZGxlTm9kZXMnKSkge1xuICAgIG9wdGlvbnMuc2VsZWN0b3IgPSBvcHRpb25zLmhhbmRsZU5vZGVzXG4gICAgZGVsZXRlIG9wdGlvbnMuaGFuZGxlTm9kZXNcbiAgfVxuXG4gIHJldHVybiBuZXcgRWRnZWhhbmRsZXMoY3ksIG9wdGlvbnMpXG59XG4iLCJmdW5jdGlvbiBkaXNhYmxlR2VzdHVyZXMgKCkge1xuICB0aGlzLnNhdmVHZXN0dXJlU3RhdGUoKVxuXG4gIHRoaXMuY3lcbiAgICAuem9vbWluZ0VuYWJsZWQoZmFsc2UpXG4gICAgLnBhbm5pbmdFbmFibGVkKGZhbHNlKVxuICAgIC5ib3hTZWxlY3Rpb25FbmFibGVkKGZhbHNlKVxuXG4gIGlmICh0aGlzLm9wdGlvbnMuZGlzYWJsZUJyb3dzZXJHZXN0dXJlcykge1xuICAgIGxldCB3bE9wdHMgPSB0aGlzLndpbmRvd0xpc3RlbmVyT3B0aW9uc1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLnByZXZlbnREZWZhdWx0LCB3bE9wdHMpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMucHJldmVudERlZmF1bHQsIHdsT3B0cylcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLnByZXZlbnREZWZhdWx0LCB3bE9wdHMpXG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG5mdW5jdGlvbiByZXNldEdlc3R1cmVzICgpIHtcbiAgdGhpcy5jeVxuICAgIC56b29taW5nRW5hYmxlZCh0aGlzLmxhc3Rab29taW5nRW5hYmxlZClcbiAgICAucGFubmluZ0VuYWJsZWQodGhpcy5sYXN0UGFubmluZ0VuYWJsZWQpXG4gICAgLmJveFNlbGVjdGlvbkVuYWJsZWQodGhpcy5sYXN0Qm94U2VsZWN0aW9uRW5hYmxlZClcblxuICBpZiAodGhpcy5vcHRpb25zLmRpc2FibGVCcm93c2VyR2VzdHVyZXMpIHtcbiAgICBsZXQgd2xPcHRzID0gdGhpcy53aW5kb3dMaXN0ZW5lck9wdGlvbnNcblxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5wcmV2ZW50RGVmYXVsdCwgd2xPcHRzKVxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLnByZXZlbnREZWZhdWx0LCB3bE9wdHMpXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5wcmV2ZW50RGVmYXVsdCwgd2xPcHRzKVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuZnVuY3Rpb24gc2F2ZUdlc3R1cmVTdGF0ZSAoKSB7XG4gIGxldCB7IGN5IH0gPSB0aGlzXG5cbiAgdGhpcy5sYXN0UGFubmluZ0VuYWJsZWQgPSBjeS5wYW5uaW5nRW5hYmxlZCgpXG4gIHRoaXMubGFzdFpvb21pbmdFbmFibGVkID0gY3kuem9vbWluZ0VuYWJsZWQoKVxuICB0aGlzLmxhc3RCb3hTZWxlY3Rpb25FbmFibGVkID0gY3kuYm94U2VsZWN0aW9uRW5hYmxlZCgpXG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuZXhwb3J0IGRlZmF1bHQgeyBkaXNhYmxlR2VzdHVyZXMsIHJlc2V0R2VzdHVyZXMsIHNhdmVHZXN0dXJlU3RhdGUgfVxuIiwiZnVuY3Rpb24gYWRkQ3l0b3NjYXBlTGlzdGVuZXJzICgpIHtcbiAgbGV0IHsgY3ksIG9wdGlvbnMgfSA9IHRoaXNcblxuICAvLyBncmFiYmluZyBub2Rlc1xuICB0aGlzLmFkZExpc3RlbmVyKGN5LCAnZHJhZycsICgpID0+IHRoaXMuZ3JhYmJpbmdOb2RlID0gdHJ1ZSlcbiAgdGhpcy5hZGRMaXN0ZW5lcihjeSwgJ2ZyZWUnLCAoKSA9PiB0aGlzLmdyYWJiaW5nTm9kZSA9IGZhbHNlKVxuXG4gIC8vIHNob3cgaGFuZGxlIG9uIGhvdmVyXG4gIHRoaXMuYWRkTGlzdGVuZXIoY3ksICdtb3VzZW92ZXInLCAnbm9kZScsIGUgPT4ge1xuICAgIHRoaXMuc2hvdyhlLnRhcmdldClcbiAgfSlcblxuICAvLyBzaG93IGhhbmRsZSBvbiB0YXAgbm9kZVxuICB0aGlzLmFkZExpc3RlbmVyKGN5LCAndGFwJywgJ25vZGUnLCBlID0+IHtcbiAgICB0aGlzLnNob3coZS50YXJnZXQpXG4gIH0pXG5cbiAgLy8gaGlkZSBoYW5kbGUgd2hlbiBzb3VyY2Ugbm9kZSBtb3ZlZFxuICB0aGlzLmFkZExpc3RlbmVyKGN5LCAncG9zaXRpb24nLCAnbm9kZScsIGUgPT4ge1xuICAgIGlmIChlLnRhcmdldC5zYW1lKHRoaXMuc291cmNlTm9kZSkpIHtcbiAgICAgIHRoaXMuaGlkZSgpXG4gICAgfVxuICB9KVxuXG4gIC8vIHN0YXJ0IG9uIHRhcHN0YXJ0IGhhbmRsZVxuICAvLyBzdGFydCBvbiB0YXBzdGFydCBub2RlIChkcmF3IG1vZGUpXG4gIC8vIHRvZ2dsZSBvbiBzb3VyY2Ugbm9kZVxuICB0aGlzLmFkZExpc3RlbmVyKGN5LCAndGFwc3RhcnQnLCAnbm9kZScsIGUgPT4ge1xuICAgIGxldCBub2RlID0gZS50YXJnZXRcblxuICAgIGlmIChub2RlLmFueVNhbWUodGhpcy5oYW5kbGVOb2RlcykpIHtcbiAgICAgIHRoaXMuaGFuZGxlTm9kZSA9IG5vZGUuaW50ZXJzZWN0aW9uKHRoaXMuaGFuZGxlTm9kZXMpXG4gICAgICB0aGlzLnN0YXJ0KHRoaXMuc291cmNlTm9kZSlcbiAgICB9IGVsc2UgaWYgKHRoaXMuZHJhd01vZGUpIHtcbiAgICAgIHRoaXMuc3RhcnQobm9kZSlcbiAgICB9IGVsc2UgaWYgKG5vZGUuc2FtZSh0aGlzLnNvdXJjZU5vZGUpKSB7XG4gICAgICB0aGlzLmhpZGUoKVxuICAgIH1cbiAgfSlcblxuICAvLyB1cGRhdGUgbGluZSBvbiBkcmFnXG4gIHRoaXMuYWRkTGlzdGVuZXIoY3ksICd0YXBkcmFnJywgZSA9PiB7XG4gICAgdGhpcy51cGRhdGUoZS5wb3NpdGlvbilcbiAgfSlcblxuICAvLyBob3ZlciBvdmVyIHByZXZpZXdcbiAgdGhpcy5hZGRMaXN0ZW5lcihjeSwgJ3RhcGRyYWdvdmVyJywgJ25vZGUnLCBlID0+IHtcbiAgICB0aGlzLnByZXZpZXcoZS50YXJnZXQpXG4gIH0pXG5cbiAgLy8gaG92ZXIgb3V0IHVucHJldmlld1xuICB0aGlzLmFkZExpc3RlbmVyKGN5LCAndGFwZHJhZ291dCcsICdub2RlJywgZSA9PiB7XG4gICAgaWYgKG9wdGlvbnMuc25hcCAmJiBlLnRhcmdldC5zYW1lKHRoaXMudGFyZ2V0Tm9kZSkpIHtcbiAgICAgIC8vIHRoZW4ga2VlcCB0aGUgcHJldmlld1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVucHJldmlldyhlLnRhcmdldClcbiAgICB9XG4gIH0pXG5cbiAgLy8gc3RvcCBnZXN0dXJlIG9uIHRhcGVuZFxuICB0aGlzLmFkZExpc3RlbmVyKGN5LCAndGFwZW5kJywgKCkgPT4ge1xuICAgIHRoaXMuc3RvcCgpXG4gIH0pXG5cbiAgLy8gaGlkZSBoYW5kbGUgaWYgc291cmNlIG5vZGUgaXMgcmVtb3ZlZFxuICB0aGlzLmFkZExpc3RlbmVyKGN5LCAncmVtb3ZlJywgZSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LnNhbWUodGhpcy5zb3VyY2VOb2RlKSkge1xuICAgICAgdGhpcy5oaWRlKClcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuZXhwb3J0IGRlZmF1bHQgeyBhZGRDeXRvc2NhcGVMaXN0ZW5lcnMgfVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmNvbnN0IGRlZmF1bHRzID0ge1xuICBzZWxlY3RvcjogJ25vZGUnLCAvLyBzZWxlY3Rvci9maWx0ZXIgZnVuY3Rpb24gZm9yIHdoZXRoZXIgZWRnZXMgY2FuIGJlIG1hZGUgZnJvbSBhIGdpdmVuIG5vZGVcbiAgcHJldmlldzogdHJ1ZSwgLy8gd2hldGhlciB0byBzaG93IGFkZGVkIGVkZ2VzIHByZXZpZXcgYmVmb3JlIHJlbGVhc2luZyBzZWxlY3Rpb25cbiAgaG92ZXJEZWxheTogMTUwLCAvLyB0aW1lIHNwZW50IGhvdmVyaW5nIG92ZXIgYSB0YXJnZXQgbm9kZSBiZWZvcmUgaXQgaXMgY29uc2lkZXJlZCBzZWxlY3RlZFxuICBzbmFwOiBmYWxzZSwgLy8gd2hlbiBlbmFibGVkLCB0aGUgZWRnZSBjYW4gYmUgZHJhd24gYnkganVzdCBtb3ZpbmcgY2xvc2UgdG8gYSB0YXJnZXQgbm9kZSAoY2FuIGJlIGNvbmZ1c2luZyBvbiBjb21wb3VuZCBncmFwaHMpXG4gIHNuYXBUaHJlc2hvbGQ6IDUwLCAvLyB0aGUgdGFyZ2V0IG5vZGUgbXVzdCBiZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhpcyBtYW55IHBpeGVscyBhd2F5IGZyb20gdGhlIGN1cnNvci9maW5nZXJcbiAgc25hcEZyZXF1ZW5jeTogMTUsIC8vIHRoZSBudW1iZXIgb2YgdGltZXMgcGVyIHNlY29uZCAoSHopIHRoYXQgc25hcCBjaGVja3MgZG9uZSAobG93ZXIgaXMgbGVzcyBleHBlbnNpdmUpXG4gIG5vRWRnZUV2ZW50c0luRHJhdzogZmFsc2UsIC8vIHNldCBldmVudHM6bm8gdG8gZWRnZXMgZHVyaW5nIGRyYXdzLCBwcmV2ZW50cyBtb3VzZW91dHMgb24gY29tcG91bmRzXG4gIGRpc2FibGVCcm93c2VyR2VzdHVyZXM6IHRydWUsIC8vIGR1cmluZyBhbiBlZGdlIGRyYXdpbmcgZ2VzdHVyZSwgZGlzYWJsZSBicm93c2VyIGdlc3R1cmVzIHN1Y2ggYXMgdHdvLWZpbmdlciB0cmFja3BhZCBzd2lwZSBhbmQgcGluY2gtdG8tem9vbVxuICBoYW5kbGVQYXJhbXM6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgLy8gcmV0dXJucyBhcnJheSBvZiBlbGVtZW50cyB0byBiZSBwYXNzZWQgdG8gY3kuYWRkKCkgZm9yIHRoZSBoYW5kbGUgbm9kZXNcbiAgICAvLyAoZGVmYXVsdCBjbGFzc2VzIGFyZSBhbHdheXMgYWRkZWQgZm9yIHlvdSlcbiAgICByZXR1cm4gW11cbiAgfSxcbiAgaGFuZGxlUG9zaXRpb246IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgcmV0dXJuICdtaWRkbGUgdG9wJyAvLyBzZXRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgaGFuZGxlIGluIHRoZSBmb3JtYXQgb2YgXCJYLUFYSVMgWS1BWElTXCIgc3VjaCBhcyBcImxlZnQgdG9wXCIsIFwibWlkZGxlIHRvcFwiXG4gIH0sXG4gIGhhbmRsZUluRHJhd01vZGU6IGZhbHNlLCAvLyB3aGV0aGVyIHRvIHNob3cgdGhlIGhhbmRsZSBpbiBkcmF3IG1vZGVcbiAgZWRnZVR5cGU6IGZ1bmN0aW9uIChzb3VyY2VOb2RlLCB0YXJnZXROb2RlLCBoYW5kbGVOb2RlKSB7XG4gICAgLy8gY2FuIHJldHVybiAnZmxhdCcgZm9yIGZsYXQgZWRnZXMgYmV0d2VlbiBub2RlcyBvciAnbm9kZScgZm9yIGludGVybWVkaWF0ZSBub2RlIGJldHdlZW4gdGhlbVxuICAgIC8vIHJldHVybmluZyBudWxsL3VuZGVmaW5lZCBtZWFucyBhbiBlZGdlIGNhbid0IGJlIGFkZGVkIGJldHdlZW4gdGhlIHR3byBub2Rlc1xuICAgIHJldHVybiAnZmxhdCdcbiAgfSxcbiAgbG9vcEFsbG93ZWQ6IGZ1bmN0aW9uIChub2RlLCBoYW5kbGVOb2RlKSB7XG4gICAgLy8gZm9yIHRoZSBzcGVjaWZpZWQgbm9kZSwgcmV0dXJuIHdoZXRoZXIgZWRnZXMgZnJvbSBpdHNlbGYgdG8gaXRzZWxmIGFyZSBhbGxvd2VkXG4gICAgcmV0dXJuIGZhbHNlXG4gIH0sXG4gIG5vZGVMb29wT2Zmc2V0OiAtNTAsIC8vIG9mZnNldCBmb3IgZWRnZVR5cGU6ICdub2RlJyBsb29wc1xuICBub2RlUGFyYW1zOiBmdW5jdGlvbiAoc291cmNlTm9kZSwgdGFyZ2V0Tm9kZSwgaGFuZGxlTm9kZSkge1xuICAgIC8vIGZvciBub2RlIGJldHdlZW4gdGhlIHNwZWNpZmllZCBzb3VyY2UgYW5kIHRhcmdldFxuICAgIC8vIHJldHVybiBlbGVtZW50IG9iamVjdCB0byBiZSBwYXNzZWQgdG8gY3kuYWRkKCkgZm9yIGludGVybWVkaWFyeSBub2RlXG4gICAgcmV0dXJuIHt9XG4gIH0sXG4gIGVkZ2VQYXJhbXM6IGZ1bmN0aW9uIChzb3VyY2VOb2RlLCB0YXJnZXROb2RlLCBpLCBoYW5kbGVOb2RlKSB7XG4gICAgLy8gZm9yIGVkZ2VzIGJldHdlZW4gdGhlIHNwZWNpZmllZCBzb3VyY2UgYW5kIHRhcmdldFxuICAgIC8vIHJldHVybiBlbGVtZW50IG9iamVjdCB0byBiZSBwYXNzZWQgdG8gY3kuYWRkKCkgZm9yIGVkZ2VcbiAgICAvLyBOQjogaSBpbmRpY2F0ZXMgZWRnZSBpbmRleCBpbiBjYXNlIG9mIGVkZ2VUeXBlOiAnbm9kZSdcbiAgICByZXR1cm4ge31cbiAgfSxcbiAgZ2hvc3RFZGdlUGFyYW1zOiBmdW5jdGlvbiAoc291cmNlTm9kZSwgaGFuZGxlTm9kZSkge1xuICAgIC8vIHJldHVybiBlbGVtZW50IG9iamVjdCB0byBiZSBwYXNzZWQgdG8gY3kuYWRkKCkgZm9yIHRoZSBnaG9zdCBlZGdlXG4gICAgLy8gKGRlZmF1bHQgY2xhc3NlcyBhcmUgYWx3YXlzIGFkZGVkIGZvciB5b3UpXG4gICAgcmV0dXJuIHt9XG4gIH0sXG4gIHNob3c6IGZ1bmN0aW9uIChzb3VyY2VOb2RlLCBoYW5kbGVOb2Rlcykge1xuICAgIC8vIGZpcmVkIHdoZW4gaGFuZGxlcyBpcyBzaG93blxuICB9LFxuICBoaWRlOiBmdW5jdGlvbiAoc291cmNlTm9kZSkge1xuICAgIC8vIGZpcmVkIHdoZW4gdGhlIGhhbmRsZXMgaXMgaGlkZGVuXG4gIH0sXG4gIHN0YXJ0OiBmdW5jdGlvbiAoc291cmNlTm9kZSwgaGFuZGxlTm9kZSkge1xuICAgIC8vIGZpcmVkIHdoZW4gZWRnZWhhbmRsZXMgaW50ZXJhY3Rpb24gc3RhcnRzIChkcmFnIG9uIGhhbmRsZSlcbiAgfSxcbiAgY29tcGxldGU6IGZ1bmN0aW9uIChzb3VyY2VOb2RlLCB0YXJnZXROb2RlLCBhZGRlZEVsZXMpIHtcbiAgICAvLyBmaXJlZCB3aGVuIGVkZ2VoYW5kbGVzIGlzIGRvbmUgYW5kIGVsZW1lbnRzIGFyZSBhZGRlZFxuICB9LFxuICBzdG9wOiBmdW5jdGlvbiAoc291cmNlTm9kZSkge1xuICAgIC8vIGZpcmVkIHdoZW4gZWRnZWhhbmRsZXMgaW50ZXJhY3Rpb24gaXMgc3RvcHBlZCAoZWl0aGVyIGNvbXBsZXRlIHdpdGggYWRkZWQgZWRnZXMgb3IgaW5jb21wbGV0ZSlcbiAgfSxcbiAgY2FuY2VsOiBmdW5jdGlvbiAoc291cmNlTm9kZSwgY2FuY2VsbGVkVGFyZ2V0cykge1xuICAgIC8vIGZpcmVkIHdoZW4gZWRnZWhhbmRsZXMgYXJlIGNhbmNlbGxlZCAoaW5jb21wbGV0ZSBnZXN0dXJlKVxuICB9LFxuICBob3Zlcm92ZXI6IGZ1bmN0aW9uIChzb3VyY2VOb2RlLCB0YXJnZXROb2RlKSB7XG4gICAgLy8gZmlyZWQgd2hlbiBhIHRhcmdldCBpcyBob3ZlcmVkXG4gIH0sXG4gIGhvdmVyb3V0OiBmdW5jdGlvbiAoc291cmNlTm9kZSwgdGFyZ2V0Tm9kZSkge1xuICAgIC8vIGZpcmVkIHdoZW4gYSB0YXJnZXQgaXNuJ3QgaG92ZXJlZCBhbnltb3JlXG4gIH0sXG4gIHByZXZpZXdvbjogZnVuY3Rpb24gKHNvdXJjZU5vZGUsIHRhcmdldE5vZGUsIHByZXZpZXdFbGVzKSB7XG4gICAgLy8gZmlyZWQgd2hlbiBwcmV2aWV3IGlzIHNob3duXG4gIH0sXG4gIHByZXZpZXdvZmY6IGZ1bmN0aW9uIChzb3VyY2VOb2RlLCB0YXJnZXROb2RlLCBwcmV2aWV3RWxlcykge1xuICAgIC8vIGZpcmVkIHdoZW4gcHJldmlldyBpcyBoaWRkZW5cbiAgfSxcbiAgZHJhd29uOiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gZmlyZWQgd2hlbiBkcmF3IG1vZGUgZW5hYmxlZFxuICB9LFxuICBkcmF3b2ZmOiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gZmlyZWQgd2hlbiBkcmF3IG1vZGUgZGlzYWJsZWRcbiAgfVxufVxuLyogZXNsaW50LWVuYWJsZSAqL1xuXG5leHBvcnQgZGVmYXVsdCBkZWZhdWx0c1xuIiwiZnVuY3Rpb24gdG9nZ2xlRHJhd01vZGUgKGJvb2wpIHtcbiAgbGV0IHsgY3ksIG9wdGlvbnMgfSA9IHRoaXNcblxuICB0aGlzLmRyYXdNb2RlID0gYm9vbCAhPSBudWxsID8gYm9vbCA6ICF0aGlzLmRyYXdNb2RlXG5cbiAgaWYgKHRoaXMuZHJhd01vZGUpIHtcbiAgICB0aGlzLnByZXZVbmdyYWJpZnlTdGF0ZSA9IGN5LmF1dG91bmdyYWJpZnkoKVxuXG4gICAgY3kuYXV0b3VuZ3JhYmlmeSh0cnVlKVxuXG4gICAgaWYgKCFvcHRpb25zLmhhbmRsZUluRHJhd01vZGUgJiYgdGhpcy5oYW5kbGVTaG93bigpKSB7XG4gICAgICB0aGlzLmhpZGUoKVxuICAgIH1cblxuICAgIHRoaXMuZW1pdCgnZHJhd29uJylcbiAgfSBlbHNlIHtcbiAgICBjeS5hdXRvdW5ncmFiaWZ5KHRoaXMucHJldlVuZ3JhYmlmeVN0YXRlKVxuXG4gICAgdGhpcy5lbWl0KCdkcmF3b2ZmJylcbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbmZ1bmN0aW9uIGVuYWJsZURyYXdNb2RlICgpIHtcbiAgcmV0dXJuIHRoaXMudG9nZ2xlRHJhd01vZGUodHJ1ZSlcbn1cblxuZnVuY3Rpb24gZGlzYWJsZURyYXdNb2RlICgpIHtcbiAgcmV0dXJuIHRoaXMudG9nZ2xlRHJhd01vZGUoZmFsc2UpXG59XG5cbmV4cG9ydCBkZWZhdWx0IHsgdG9nZ2xlRHJhd01vZGUsIGVuYWJsZURyYXdNb2RlLCBkaXNhYmxlRHJhd01vZGUgfVxuIiwiaW1wb3J0IGFzc2lnbiBmcm9tICcuLi9hc3NpZ24nXG5cbmNvbnN0IGlzQXJyYXkgPSBvYmogPT4gQXJyYXkuaXNBcnJheSA/IEFycmF5LmlzQXJyYXkob2JqKSA6IG9iaiAhPSBudWxsICYmIG9iaiBpbnN0YW5jZW9mIEFycmF5XG5cbmZ1bmN0aW9uIG1ha2VFZGdlcyAocHJldmlldyA9IGZhbHNlKSB7XG4gIC8vIGNhbid0IG1ha2UgZWRnZXMgb3V0c2lkZSBvZiByZWd1bGFyIGdlc3R1cmUgbGlmZWN5Y2xlXG4gIGlmICghdGhpcy5hY3RpdmUpIHsgcmV0dXJuIH1cblxuICBsZXQgeyBjeSwgb3B0aW9ucywgcHJlc3VtcHRpdmVUYXJnZXRzLCBwcmV2aWV3RWxlcyB9ID0gdGhpc1xuXG4gIC8vIGNhbid0IG1ha2UgcHJldmlldyBpZiBkaXNhYmxlZFxuICBpZiAocHJldmlldyAmJiAhb3B0aW9ucy5wcmV2aWV3KSB7IHJldHVybiB9XG5cbiAgbGV0IHsgc291cmNlTm9kZSwgdGFyZ2V0Tm9kZSwgaGFuZGxlTm9kZSB9ID0gdGhpc1xuXG4gIC8vIGRldGVjdCBjYW5jZWxcbiAgaWYgKCF0YXJnZXROb2RlIHx8IHRhcmdldE5vZGUuZW1wdHkoKSkge1xuICAgIHRoaXMucmVtb3ZlUHJldmlldygpXG5cbiAgICB0aGlzLmVtaXQoJ2NhbmNlbCcsIHRoaXMubXAoKSwgc291cmNlTm9kZSwgcHJlc3VtcHRpdmVUYXJnZXRzKVxuXG4gICAgcmV0dXJuXG4gIH1cblxuICAvLyBqdXN0IHJlbW92ZSBwcmV2aWV3IGNsYXNzIGlmIHdlIGFscmVhZHkgaGF2ZSB0aGUgZWRnZXNcbiAgaWYgKCFwcmV2aWV3ICYmIHByZXZpZXdFbGVzLm5vbmVtcHR5KCkpIHtcbiAgICBjeS5zdGFydEJhdGNoKClcbiAgICBwcmV2aWV3RWxlcy5yZW1vdmVDbGFzcygnZWgtcHJldmlldycpLnJlbW92ZVN0eWxlKCdldmVudHMnKVxuICAgIGN5LmVuZEJhdGNoKClcblxuICAgIHRoaXMuZW1pdCgnY29tcGxldGUnLCB0aGlzLm1wKCksIHNvdXJjZU5vZGUsIHRhcmdldE5vZGUsIHByZXZpZXdFbGVzKVxuXG4gICAgcmV0dXJuXG4gIH1cblxuICBsZXQgZWRnZVR5cGUgPSBvcHRpb25zLmVkZ2VUeXBlKHNvdXJjZU5vZGUsIHRhcmdldE5vZGUsIGhhbmRsZU5vZGUpXG5cbiAgLy8gbXVzdCBoYXZlIGEgbm9uLWVtcHR5IGVkZ2UgdHlwZVxuICBpZiAoIWVkZ2VUeXBlKSB7IHJldHVybiB9XG5cbiAgbGV0IHBcbiAgbGV0IHAxID0gc291cmNlTm9kZS5wb3NpdGlvbigpXG4gIGxldCBwMiA9IHRhcmdldE5vZGUucG9zaXRpb24oKVxuXG4gIGlmIChzb3VyY2VOb2RlLnNhbWUodGFyZ2V0Tm9kZSkpIHtcbiAgICBwID0ge1xuICAgICAgeDogcDEueCArIG9wdGlvbnMubm9kZUxvb3BPZmZzZXQsXG4gICAgICB5OiBwMS55ICsgb3B0aW9ucy5ub2RlTG9vcE9mZnNldFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBwID0ge1xuICAgICAgeDogKHAxLnggKyBwMi54KSAvIDIsXG4gICAgICB5OiAocDEueSArIHAyLnkpIC8gMlxuICAgIH1cbiAgfVxuXG4gIGxldCBhZGRlZCA9IGN5LmNvbGxlY3Rpb24oKVxuICBsZXQgZWRnZVBhcmFtcyA9IG9wdGlvbnMuZWRnZVBhcmFtcyhzb3VyY2VOb2RlLCB0YXJnZXROb2RlLCAwLCBoYW5kbGVOb2RlKVxuXG4gIGN5LnN0YXJ0QmF0Y2goKVxuXG4gIGlmIChlZGdlVHlwZSA9PT0gJ25vZGUnKSB7XG4gICAgbGV0IGludGVyTm9kZVBhcmFtcyA9IG9wdGlvbnMubm9kZVBhcmFtcyhzb3VyY2VOb2RlLCB0YXJnZXROb2RlLCBoYW5kbGVOb2RlKVxuICAgIGxldCBlZGdlUGFyYW1zMiA9IG9wdGlvbnMuZWRnZVBhcmFtcyhzb3VyY2VOb2RlLCB0YXJnZXROb2RlLCAxLCBoYW5kbGVOb2RlKVxuXG4gICAgbGV0IGludGVyTm9kZSA9IGN5LmFkZChhc3NpZ24oe30sIGludGVyTm9kZVBhcmFtcywge1xuICAgICAgZ3JvdXA6ICdub2RlcycsXG4gICAgICBwb3NpdGlvbjogcFxuICAgIH0pKVxuXG4gICAgbGV0IHNvdXJjZUVkZ2UgPSBjeS5hZGQoYXNzaWduKHt9LCBlZGdlUGFyYW1zLCB7XG4gICAgICBncm91cDogJ2VkZ2VzJyxcbiAgICAgIGRhdGE6IGFzc2lnbih7fSwgZWRnZVBhcmFtcy5kYXRhLCB7XG4gICAgICAgIHNvdXJjZTogc291cmNlTm9kZS5pZCgpLFxuICAgICAgICB0YXJnZXQ6IGludGVyTm9kZS5pZCgpXG4gICAgICB9KVxuICAgIH0pKVxuXG4gICAgbGV0IHRhcmdldEVkZ2UgPSBjeS5hZGQoYXNzaWduKHt9LCBlZGdlUGFyYW1zMiwge1xuICAgICAgZ3JvdXA6ICdlZGdlcycsXG4gICAgICBkYXRhOiBhc3NpZ24oe30sIGVkZ2VQYXJhbXMyLmRhdGEsIHtcbiAgICAgICAgc291cmNlOiBpbnRlck5vZGUuaWQoKSxcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXROb2RlLmlkKClcbiAgICAgIH0pXG4gICAgfSkpXG5cbiAgICBhZGRlZCA9IGFkZGVkLm1lcmdlKGludGVyTm9kZSkubWVyZ2Uoc291cmNlRWRnZSkubWVyZ2UodGFyZ2V0RWRnZSlcblxuICB9IGVsc2UgeyAvLyBmbGF0XG4gICAgYWRkZWQgPSBjeS5hZGQoYXNzaWduKHt9LCBlZGdlUGFyYW1zLCB7XG4gICAgICBncm91cDogJ2VkZ2VzJyxcbiAgICAgIGRhdGE6IGFzc2lnbih7fSwgZWRnZVBhcmFtcy5kYXRhLCB7XG4gICAgICAgIHNvdXJjZTogc291cmNlTm9kZS5pZCgpLFxuICAgICAgICB0YXJnZXQ6IHRhcmdldE5vZGUuaWQoKVxuICAgICAgfSlcbiAgICB9KSlcbiAgfVxuXG4gIGlmIChwcmV2aWV3KSB7XG4gICAgYWRkZWQuc3R5bGUoJ2V2ZW50cycsICdubycpXG4gICAgYWRkZWQuYWRkQ2xhc3MoJ2VoLXByZXZpZXcnKVxuICAgIHRoaXMucHJldmlld0VsZXMgPSBhZGRlZFxuICB9XG5cbiAgY3kuZW5kQmF0Y2goKVxuXG4gIGlmICghcHJldmlldykge1xuICAgIHRoaXMuZW1pdCgnY29tcGxldGUnLCB0aGlzLm1wKCksIHNvdXJjZU5vZGUsIHRhcmdldE5vZGUsIGFkZGVkKVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuZnVuY3Rpb24gbWFrZVByZXZpZXcgKCkge1xuICB0aGlzLm1ha2VFZGdlcyh0cnVlKVxuXG4gIHJldHVybiB0aGlzXG59XG5cbmZ1bmN0aW9uIHJlbW92ZVByZXZpZXcgKCkge1xuICBpZiAodGhpcy5wcmV2aWV3RWxlcy5ub25lbXB0eSgpKSB7XG4gICAgdGhpcy5wcmV2aWV3RWxlcy5yZW1vdmUoKVxuICAgIHRoaXMucHJldmlld0VsZXMgPSB0aGlzLmN5LmNvbGxlY3Rpb24oKVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuZnVuY3Rpb24gaGFuZGxlU2hvd24gKCkge1xuICByZXR1cm4gdGhpcy5oYW5kbGVOb2Rlcy5ub25lbXB0eSgpXG59XG5cbmZ1bmN0aW9uIHJlbW92ZUhhbmRsZXMgKCkge1xuICBpZiAodGhpcy5oYW5kbGVOb2Rlcy5ub25lbXB0eSgpKSB7XG4gICAgdGhpcy5oYW5kbGVOb2Rlcy5yZW1vdmUoKVxuICAgIHRoaXMuaGFuZGxlTm9kZXMgPSB0aGlzLmN5LmNvbGxlY3Rpb24oKVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuZnVuY3Rpb24gaGFuZGxlUG9zaXRpb24gKG5vZGUpIHtcbiAgbGV0IHsgb3B0aW9ucyB9ID0gdGhpc1xuICBsZXQgaGFuZGxlUG9zaXRpb24gPSB0eXBlb2Ygb3B0aW9ucy5oYW5kbGVQb3NpdGlvbiA9PT0gdHlwZW9mICcnID8gKCkgPT4gb3B0aW9ucy5oYW5kbGVQb3NpdGlvbiA6IG9wdGlvbnMuaGFuZGxlUG9zaXRpb25cbiAgbGV0IHAgPSBub2RlLnBvc2l0aW9uKClcbiAgbGV0IGggPSBub2RlLm91dGVySGVpZ2h0KClcbiAgbGV0IHcgPSBub2RlLm91dGVyV2lkdGgoKVxuXG4gIC8vIHN0b3JlIGhvdyBtdWNoIHdlIHNob3VsZCBtb3ZlIHRoZSBoYW5kbGUgZnJvbSBvcmlnaW4ocC54LCBwLnkpXG4gIGxldCBtb3ZlWCA9IDBcbiAgbGV0IG1vdmVZID0gMFxuXG4gIC8vIGdyYWIgYXhlc1xuICBsZXQgYXhlcyA9IGhhbmRsZVBvc2l0aW9uKG5vZGUpLnRvTG93ZXJDYXNlKCkuc3BsaXQoL1xccysvKVxuICBsZXQgYXhpc1ggPSBheGVzWzBdXG4gIGxldCBheGlzWSA9IGF4ZXNbMV1cblxuICAvLyBiYXNlZCBvbiBoYW5kbGVQb3NpdGlvbiBtb3ZlIGxlZnQvcmlnaHQvdG9wL2JvdHRvbS4gTWlkZGxlL21pZGRsZSB3aWxsIGp1c3QgYmUgbm9ybWFsXG4gIGlmIChheGlzWCA9PT0gJ2xlZnQnKSB7XG4gICAgbW92ZVggPSAtKHcgLyAyKVxuICB9IGVsc2UgaWYgKGF4aXNYID09PSAncmlnaHQnKSB7XG4gICAgbW92ZVggPSB3IC8gMlxuICB9XG4gIGlmIChheGlzWSA9PT0gJ3RvcCcpIHtcbiAgICBtb3ZlWSA9IC0oaCAvIDIpXG4gIH0gZWxzZSBpZiAoYXhpc1kgPT09ICdib3R0b20nKSB7XG4gICAgbW92ZVkgPSBoIC8gMlxuICB9XG5cbiAgLy8gc2V0IGhhbmRsZSB4IGFuZCB5IGJhc2VkIG9uIGFkanVzdGVkIHBvc2l0aW9uc1xuICBsZXQgaHggPSBwLnggKyBtb3ZlWFxuICBsZXQgaHkgPSBwLnkgKyBtb3ZlWVxuXG4gIHJldHVybiB7IHg6IGh4LCB5OiBoeSB9XG59XG5cbmZ1bmN0aW9uIG1ha2VIYW5kbGVzIChub2RlKSB7XG4gIGxldCB7IG9wdGlvbnMsIGN5IH0gPSB0aGlzXG5cbiAgbGV0IGhhbmRsZVBhcmFtcyA9IG9wdGlvbnMuaGFuZGxlUGFyYW1zKG5vZGUpXG4gIGlmICghaXNBcnJheShoYW5kbGVQYXJhbXMpKSB7XG4gICAgaGFuZGxlUGFyYW1zID0gW2hhbmRsZVBhcmFtc11cbiAgfVxuXG4gIGxldCBoYW5kbGVzID0gW11cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBoYW5kbGVQYXJhbXMubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgaGFuZGxlID0gYXNzaWduKHt9LCBoYW5kbGVQYXJhbXNbaV0sIHtcbiAgICAgIGdyb3VwOiAnbm9kZXMnLFxuICAgICAgZ3JhYmJhYmxlOiBmYWxzZSxcbiAgICAgIHNlbGVjdGFibGU6IGZhbHNlXG4gICAgfSlcblxuICAgIGlmICghaGFuZGxlLmhhc093blByb3BlcnR5KCdwb3NpdGlvbicpKSB7XG4gICAgICBoYW5kbGUucG9zaXRpb24gPSB0aGlzLmhhbmRsZVBvc2l0aW9uKG5vZGUpXG4gICAgfVxuXG4gICAgaGFuZGxlcy5wdXNoKGhhbmRsZSlcbiAgfVxuXG4gIGN5LnN0YXJ0QmF0Y2goKVxuICB0aGlzLnJlbW92ZUhhbmRsZXMoKVxuICB0aGlzLmhhbmRsZU5vZGVzID0gY3kuYWRkKGhhbmRsZXMpXG4gIHRoaXMuaGFuZGxlTm9kZXMuYWRkQ2xhc3MoJ2VoLWhhbmRsZScpXG4gIGN5LmVuZEJhdGNoKClcblxuICByZXR1cm4gdGhpc1xufVxuXG5mdW5jdGlvbiB1cGRhdGVFZGdlICgpIHtcbiAgbGV0IHsgc291cmNlTm9kZSwgZ2hvc3ROb2RlIH0gPSB0aGlzXG4gIGxldCB4ID0gdGhpcy5teFxuICBsZXQgeSA9IHRoaXMubXlcblxuICAvLyBjYW4ndCBkcmF3IGEgbGluZSB3aXRob3V0IGhhdmluZyB0aGUgc3RhcnRpbmcgbm9kZVxuICBpZiAoIXNvdXJjZU5vZGUpIHsgcmV0dXJuIH1cblxuICBpZiAoZ2hvc3ROb2RlLmVtcHR5KCkgfHwgZ2hvc3ROb2RlLnJlbW92ZWQoKSkge1xuICAgIGxldCB7IGhhbmRsZU5vZGUsIG9wdGlvbnMsIGN5IH0gPSB0aGlzXG4gICAgbGV0IGdob3N0RWRnZSwgZ2hvc3RFbGVzXG5cbiAgICBjeS5zdGFydEJhdGNoKClcblxuICAgIGdob3N0Tm9kZSA9IHRoaXMuZ2hvc3ROb2RlID0gY3kuYWRkKHtcbiAgICAgIGdyb3VwOiAnbm9kZXMnLFxuICAgICAgY2xhc3NlczogJ2VoLWdob3N0IGVoLWdob3N0LW5vZGUnLFxuICAgICAgcG9zaXRpb246IHsgeDogeCwgeTogeSB9XG4gICAgfSlcblxuICAgIGdob3N0Tm9kZS5zdHlsZSh7XG4gICAgICAnYmFja2dyb3VuZC1jb2xvcic6ICdibHVlJyxcbiAgICAgICd3aWR0aCc6IDAuMDAwMSxcbiAgICAgICdoZWlnaHQnOiAwLjAwMDEsXG4gICAgICAnb3BhY2l0eSc6IDAsXG4gICAgICAnZXZlbnRzJzogJ25vJ1xuICAgIH0pXG5cbiAgICBsZXQgZ2hvc3RFZGdlUGFyYW1zID0gb3B0aW9ucy5naG9zdEVkZ2VQYXJhbXMoc291cmNlTm9kZSwgaGFuZGxlTm9kZSlcblxuICAgIGdob3N0RWRnZSA9IGN5LmFkZChhc3NpZ24oe30sIGdob3N0RWRnZVBhcmFtcywge1xuICAgICAgZ3JvdXA6ICdlZGdlcycsXG4gICAgICBkYXRhOiBhc3NpZ24oe30sIGdob3N0RWRnZVBhcmFtcy5kYXRhLCB7XG4gICAgICAgIHNvdXJjZTogc291cmNlTm9kZS5pZCgpLFxuICAgICAgICB0YXJnZXQ6IGdob3N0Tm9kZS5pZCgpXG4gICAgICB9KVxuICAgIH0pKVxuXG4gICAgZ2hvc3RFZGdlLmFkZENsYXNzKCdlaC1naG9zdCBlaC1naG9zdC1lZGdlJylcbiAgICBnaG9zdEVkZ2Uuc3R5bGUoJ2V2ZW50cycsICdubycpXG5cbiAgICBnaG9zdEVsZXMgPSB0aGlzLmdob3N0RWxlcyA9IGN5LmNvbGxlY3Rpb24oKVxuICAgIGdob3N0RWxlcy5tZXJnZShnaG9zdE5vZGUpLm1lcmdlKGdob3N0RWRnZSlcblxuICAgIGN5LmVuZEJhdGNoKClcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmdob3N0Tm9kZS5wb3NpdGlvbih7IHgsIHkgfSlcbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbWFrZUVkZ2VzLCBtYWtlUHJldmlldywgcmVtb3ZlUHJldmlldyxcbiAgdXBkYXRlRWRnZSxcbiAgaGFuZGxlU2hvd24sIGhhbmRsZVBvc2l0aW9uLCBtYWtlSGFuZGxlcywgcmVtb3ZlSGFuZGxlc1xufVxuIiwiZnVuY3Rpb24gZGlzYWJsZUVkZ2VFdmVudHMgKCkge1xuICBpZiAodGhpcy5vcHRpb25zLm5vRWRnZUV2ZW50c0luRHJhdykge1xuICAgIHRoaXMuY3kuZWRnZXMoKS5zdHlsZSgnZXZlbnRzJywgJ25vJylcbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbmZ1bmN0aW9uIGVuYWJsZUVkZ2VFdmVudHMgKCkge1xuICBpZiAodGhpcy5vcHRpb25zLm5vRWRnZUV2ZW50c0luRHJhdykge1xuICAgIHRoaXMuY3kuZWRnZXMoKS5yZW1vdmVTdHlsZSgnZXZlbnRzJylcbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbmV4cG9ydCBkZWZhdWx0IHsgZGlzYWJsZUVkZ2VFdmVudHMsIGVuYWJsZUVkZ2VFdmVudHMgfVxuIiwiZnVuY3Rpb24gZW5hYmxlICgpIHtcbiAgdGhpcy5lbmFibGVkID0gdHJ1ZVxuXG4gIHRoaXMuZW1pdCgnZW5hYmxlJylcblxuICByZXR1cm4gdGhpc1xufVxuXG5mdW5jdGlvbiBkaXNhYmxlICgpIHtcbiAgdGhpcy5lbmFibGVkID0gZmFsc2VcblxuICB0aGlzLmVtaXQoJ2Rpc2FibGUnKVxuXG4gIHJldHVybiB0aGlzXG59XG5cbmV4cG9ydCBkZWZhdWx0IHsgZW5hYmxlLCBkaXNhYmxlIH1cbiIsImltcG9ydCBtZW1vaXplIGZyb20gJ2xvZGFzaC5tZW1vaXplJ1xuXG5mdW5jdGlvbiBjYW5TdGFydE9uIChub2RlKSB7XG4gIGNvbnN0IHsgb3B0aW9ucywgcHJldmlld0VsZXMsIGdob3N0RWxlcywgaGFuZGxlTm9kZXMgfSA9IHRoaXNcbiAgY29uc3QgaXNQcmV2aWV3ID0gZWwgPT4gcHJldmlld0VsZXMuYW55U2FtZShlbClcbiAgY29uc3QgaXNIYW5kbGUgPSBlbCA9PiBoYW5kbGVOb2Rlcy5hbnlTYW1lKGVsKVxuICBjb25zdCBpc0dob3N0ID0gZWwgPT4gZ2hvc3RFbGVzLmFueVNhbWUoZWwpXG4gIGNvbnN0IGlzVGVtcCA9IGVsID0+IGlzUHJldmlldyhlbCkgfHwgaXNIYW5kbGUoZWwpIHx8IGlzR2hvc3QoZWwpXG4gIGNvbnN0IHVzZXJGaWx0ZXIgPSBlbCA9PiBlbC5maWx0ZXIob3B0aW9ucy5zZWxlY3Rvcikubm9uZW1wdHkoKVxuXG4gIGNvbnN0IHsgZW5hYmxlZCwgYWN0aXZlLCBncmFiYmluZ05vZGUgfSA9IHRoaXNcblxuICByZXR1cm4gKFxuICAgIGVuYWJsZWQgJiYgIWFjdGl2ZSAmJiAhZ3JhYmJpbmdOb2RlXG4gICAgJiYgbm9kZSAhPSBudWxsICYmIG5vZGUuaW5zaWRlKCkgJiYgIWlzVGVtcChub2RlKSAmJiB1c2VyRmlsdGVyKG5vZGUpXG4gIClcbn1cblxuZnVuY3Rpb24gY2FuU3RhcnREcmF3TW9kZU9uIChub2RlKSB7XG4gIHJldHVybiB0aGlzLmNhblN0YXJ0T24obm9kZSkgJiYgdGhpcy5kcmF3TW9kZVxufVxuXG5mdW5jdGlvbiBjYW5TdGFydE5vbkRyYXdNb2RlT24gKG5vZGUpIHtcbiAgcmV0dXJuIHRoaXMuY2FuU3RhcnRPbihub2RlKSAmJiAhdGhpcy5kcmF3TW9kZVxufVxuXG5mdW5jdGlvbiBzaG93IChub2RlKSB7XG4gIGxldCB7IG9wdGlvbnMsIGRyYXdNb2RlIH0gPSB0aGlzXG5cbiAgaWYgKCF0aGlzLmNhblN0YXJ0T24obm9kZSkgfHwgKGRyYXdNb2RlICYmICFvcHRpb25zLmhhbmRsZUluRHJhd01vZGUpKSB7IHJldHVybiB9XG5cbiAgdGhpcy5zb3VyY2VOb2RlID0gbm9kZVxuXG4gIHRoaXMubWFrZUhhbmRsZXMobm9kZSlcblxuICB0aGlzLmVtaXQoJ3Nob3cnLCB0aGlzLm1wKCksIG5vZGUsIHRoaXMuaGFuZGxlTm9kZXMpXG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuZnVuY3Rpb24gaGlkZSAoKSB7XG4gIHRoaXMucmVtb3ZlSGFuZGxlcygpXG5cbiAgdGhpcy5lbWl0KCdoaWRlJywgdGhpcy5tcCgpLCB0aGlzLnNvdXJjZU5vZGUpXG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuZnVuY3Rpb24gc3RhcnQgKG5vZGUpIHtcbiAgaWYgKCF0aGlzLmNhblN0YXJ0T24obm9kZSkpIHsgcmV0dXJuIH1cblxuICB0aGlzLmFjdGl2ZSA9IHRydWVcblxuICB0aGlzLnNvdXJjZU5vZGUgPSBub2RlXG4gIHRoaXMuc291cmNlTm9kZS5hZGRDbGFzcygnZWgtc291cmNlJylcblxuICB0aGlzLmRpc2FibGVHZXN0dXJlcygpXG4gIHRoaXMuZGlzYWJsZUVkZ2VFdmVudHMoKVxuXG4gIHRoaXMuZW1pdCgnc3RhcnQnLCB0aGlzLm1wKCksIG5vZGUsIHRoaXMuaGFuZGxlTm9kZSlcbn1cblxuZnVuY3Rpb24gdXBkYXRlIChwb3MpIHtcbiAgaWYgKCF0aGlzLmFjdGl2ZSkgeyByZXR1cm4gfVxuXG4gIGxldCBwID0gcG9zXG5cbiAgdGhpcy5teCA9IHAueFxuICB0aGlzLm15ID0gcC55XG5cbiAgdGhpcy51cGRhdGVFZGdlKClcbiAgdGhpcy50aHJvdHRsZWRTbmFwKClcblxuICByZXR1cm4gdGhpc1xufVxuXG5mdW5jdGlvbiBzbmFwICgpIHtcbiAgaWYgKCF0aGlzLmFjdGl2ZSB8fCAhdGhpcy5vcHRpb25zLnNuYXApIHsgcmV0dXJuIGZhbHNlIH1cblxuICBsZXQgY3kgPSB0aGlzLmN5XG4gIGxldCB0YXJnZXQgPSB0aGlzLnRhcmdldE5vZGVcbiAgbGV0IHRocmVzaG9sZCA9IHRoaXMub3B0aW9ucy5zbmFwVGhyZXNob2xkXG4gIGxldCBzcVRocmVzaG9sZCA9IG4gPT4ge1xuICAgIGxldCByID0gZ2V0UmFkaXVzKG4pXG4gICAgbGV0IHQgPSByICsgdGhyZXNob2xkXG4gICAgcmV0dXJuIHQgKiB0XG4gIH1cbiAgbGV0IG1vdXNlUG9zID0gdGhpcy5tcCgpXG4gIGxldCBzcURpc3QgPSAocDEsIHAyKSA9PiAocDIueCAtIHAxLngpICogKHAyLnggLSBwMS54KSArIChwMi55IC0gcDEueSkgKiAocDIueSAtIHAxLnkpXG4gIGxldCBnZXRSYWRpdXMgPSBuID0+IChuLm91dGVyV2lkdGgoKSArIG4ub3V0ZXJIZWlnaHQoKSkgLyA0XG4gIGxldCBub2RlU3FEaXN0ID0gbWVtb2l6ZShuID0+IHNxRGlzdChuLnBvc2l0aW9uKCksIG1vdXNlUG9zKSwgbiA9PiBuLmlkKCkpXG4gIGxldCBpc1dpdGhpblRoZXNob2xkID0gbiA9PiBub2RlU3FEaXN0KG4pIDw9IHNxVGhyZXNob2xkKG4pXG4gIGxldCBjbXBTcURpc3QgPSAobjEsIG4yKSA9PiBub2RlU3FEaXN0KG4xKSAtIG5vZGVTcURpc3QobjIpXG4gIGxldCBhbGxvd0hvdmVyRGVsYXkgPSBmYWxzZVxuXG4gIGxldCBub2Rlc0J5RGlzdCA9IGN5Lm5vZGVzKGlzV2l0aGluVGhlc2hvbGQpLnNvcnQoY21wU3FEaXN0KVxuICBsZXQgc25hcHBlZCA9IGZhbHNlXG5cbiAgaWYgKHRhcmdldC5ub25lbXB0eSgpICYmICFpc1dpdGhpblRoZXNob2xkKHRhcmdldCkpIHtcbiAgICB0aGlzLnVucHJldmlldyh0YXJnZXQpXG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzQnlEaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IG4gPSBub2Rlc0J5RGlzdFtpXVxuXG4gICAgaWYgKG4uc2FtZSh0YXJnZXQpIHx8IHRoaXMucHJldmlldyhuLCBhbGxvd0hvdmVyRGVsYXkpKSB7XG4gICAgICBzbmFwcGVkID0gdHJ1ZVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc25hcHBlZFxufVxuXG5mdW5jdGlvbiBwcmV2aWV3ICh0YXJnZXQsIGFsbG93SG92ZXJEZWxheSA9IHRydWUpIHtcbiAgbGV0IHsgb3B0aW9ucywgc291cmNlTm9kZSwgZ2hvc3ROb2RlLCBoYW5kbGVOb2RlLCBnaG9zdEVsZXMsIHByZXN1bXB0aXZlVGFyZ2V0cywgcHJldmlld0VsZXMsIGFjdGl2ZSB9ID0gdGhpc1xuICBsZXQgc291cmNlID0gc291cmNlTm9kZVxuICBsZXQgaXNMb29wID0gdGFyZ2V0LnNhbWUoc291cmNlKVxuICBsZXQgbG9vcEFsbG93ZWQgPSBvcHRpb25zLmxvb3BBbGxvd2VkKHRhcmdldCwgaGFuZGxlTm9kZSlcbiAgbGV0IGlzR2hvc3QgPSB0YXJnZXQuc2FtZShnaG9zdE5vZGUpXG4gIGxldCBub0VkZ2UgPSAhb3B0aW9ucy5lZGdlVHlwZShzb3VyY2UsIHRhcmdldCwgaGFuZGxlTm9kZSlcbiAgbGV0IGlzSGFuZGxlID0gdGFyZ2V0LmFueVNhbWUodGhpcy5oYW5kbGVOb2RlcylcbiAgbGV0IGlzRXhpc3RpbmdUZ3QgPSB0YXJnZXQuc2FtZSh0aGlzLnRhcmdldE5vZGUpXG5cbiAgaWYgKCFhY3RpdmUgfHwgaXNIYW5kbGUgfHwgaXNHaG9zdCB8fCBub0VkZ2UgfHwgaXNFeGlzdGluZ1RndCB8fCAoaXNMb29wICYmICFsb29wQWxsb3dlZCkpIHsgcmV0dXJuIGZhbHNlIH1cblxuICBpZiAodGhpcy50YXJnZXROb2RlLm5vbmVtcHR5KCkpIHtcbiAgICB0aGlzLnVucHJldmlldyh0aGlzLnRhcmdldE5vZGUpXG4gIH1cblxuICBjbGVhclRpbWVvdXQodGhpcy5wcmV2aWV3VGltZW91dClcblxuICBsZXQgYXBwbHlQcmV2aWV3ID0gKCkgPT4ge1xuICAgIHRoaXMudGFyZ2V0Tm9kZSA9IHRhcmdldFxuXG4gICAgcHJlc3VtcHRpdmVUYXJnZXRzLm1lcmdlKHRhcmdldClcblxuICAgIHRhcmdldC5hZGRDbGFzcygnZWgtcHJlc3VtcHRpdmUtdGFyZ2V0JylcbiAgICB0YXJnZXQuYWRkQ2xhc3MoJ2VoLXRhcmdldCcpXG5cbiAgICB0aGlzLmVtaXQoJ2hvdmVyb3ZlcicsIHRoaXMubXAoKSwgc291cmNlLCB0YXJnZXQpXG5cbiAgICBpZiAob3B0aW9ucy5wcmV2aWV3KSB7XG4gICAgICB0YXJnZXQuYWRkQ2xhc3MoJ2VoLXByZXZpZXcnKVxuXG4gICAgICBnaG9zdEVsZXMuYWRkQ2xhc3MoJ2VoLXByZXZpZXctYWN0aXZlJylcbiAgICAgIHNvdXJjZU5vZGUuYWRkQ2xhc3MoJ2VoLXByZXZpZXctYWN0aXZlJylcbiAgICAgIHRhcmdldC5hZGRDbGFzcygnZWgtcHJldmlldy1hY3RpdmUnKVxuXG4gICAgICB0aGlzLm1ha2VQcmV2aWV3KClcblxuICAgICAgdGhpcy5lbWl0KCdwcmV2aWV3b24nLCB0aGlzLm1wKCksIHNvdXJjZSwgdGFyZ2V0LCBwcmV2aWV3RWxlcylcbiAgICB9XG4gIH1cblxuICBpZiAoYWxsb3dIb3ZlckRlbGF5ICYmIG9wdGlvbnMuaG92ZXJEZWxheSA+IDApIHtcbiAgICB0aGlzLnByZXZpZXdUaW1lb3V0ID0gc2V0VGltZW91dChhcHBseVByZXZpZXcsIG9wdGlvbnMuaG92ZXJEZWxheSlcbiAgfSBlbHNlIHtcbiAgICBhcHBseVByZXZpZXcoKVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuZnVuY3Rpb24gdW5wcmV2aWV3ICh0YXJnZXQpIHtcbiAgaWYgKCF0aGlzLmFjdGl2ZSB8fCB0YXJnZXQuYW55U2FtZSh0aGlzLmhhbmRsZU5vZGVzKSkgeyByZXR1cm4gfVxuXG4gIGxldCB7IGdob3N0RWxlcywgcHJldmlld0VsZXMsIGN5IH0gPSB0aGlzXG4gIGxldCBzb3VyY2UgPSB0aGlzLnNvdXJjZU5vZGVcblxuICBjbGVhclRpbWVvdXQodGhpcy5wcmV2aWV3VGltZW91dClcbiAgdGhpcy5wcmV2aWV3VGltZW91dCA9IG51bGxcblxuICBzb3VyY2UucmVtb3ZlQ2xhc3MoJ2VoLXByZXZpZXctYWN0aXZlJylcbiAgdGFyZ2V0LnJlbW92ZUNsYXNzKCdlaC1wcmV2aWV3LWFjdGl2ZSBlaC1wcmV2aWV3IGVoLXRhcmdldCBlaC1wcmVzdW1wdGl2ZS10YXJnZXQnKVxuICBnaG9zdEVsZXMucmVtb3ZlQ2xhc3MoJ2VoLXByZXZpZXctYWN0aXZlJylcblxuICB0aGlzLnRhcmdldE5vZGUgPSBjeS5jb2xsZWN0aW9uKClcblxuICB0aGlzLnJlbW92ZVByZXZpZXcoKVxuXG4gIHRoaXMuZW1pdCgnaG92ZXJvdXQnLCB0aGlzLm1wKCksIHNvdXJjZSwgdGFyZ2V0KVxuICB0aGlzLmVtaXQoJ3ByZXZpZXdvZmYnLCB0aGlzLm1wKCksIHNvdXJjZSwgdGFyZ2V0LCBwcmV2aWV3RWxlcylcblxuICByZXR1cm4gdGhpc1xufVxuXG5mdW5jdGlvbiBzdG9wICgpIHtcbiAgaWYgKCF0aGlzLmFjdGl2ZSkgeyByZXR1cm4gfVxuXG4gIGxldCB7IHNvdXJjZU5vZGUgfSA9IHRoaXNcblxuICBjbGVhclRpbWVvdXQodGhpcy5wcmV2aWV3VGltZW91dClcblxuICB0aGlzLnNvdXJjZU5vZGUucmVtb3ZlQ2xhc3MoJ2VoLXNvdXJjZScpXG4gIHRoaXMudGFyZ2V0Tm9kZS5yZW1vdmVDbGFzcygnZWgtdGFyZ2V0IGVoLXByZXZpZXcgZWgtaG92ZXInKVxuICB0aGlzLnByZXN1bXB0aXZlVGFyZ2V0cy5yZW1vdmVDbGFzcygnZWgtcHJlc3VtcHRpdmUtdGFyZ2V0JylcblxuICB0aGlzLmdob3N0RWxlcy5yZW1vdmUoKVxuXG4gIHRoaXMucmVtb3ZlSGFuZGxlcygpXG5cbiAgdGhpcy5tYWtlRWRnZXMoKVxuXG4gIHRoaXMuY2xlYXJDb2xsZWN0aW9ucygpXG5cbiAgdGhpcy5yZXNldEdlc3R1cmVzKClcbiAgdGhpcy5lbmFibGVFZGdlRXZlbnRzKClcblxuICB0aGlzLmFjdGl2ZSA9IGZhbHNlXG5cbiAgdGhpcy5lbWl0KCdzdG9wJywgdGhpcy5tcCgpLCBzb3VyY2VOb2RlKVxuXG4gIHJldHVybiB0aGlzXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc2hvdywgaGlkZSwgc3RhcnQsIHVwZGF0ZSwgcHJldmlldywgdW5wcmV2aWV3LCBzdG9wLCBzbmFwLFxuICBjYW5TdGFydE9uLCBjYW5TdGFydERyYXdNb2RlT24sIGNhblN0YXJ0Tm9uRHJhd01vZGVPblxufVxuIiwiaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vZGVmYXVsdHMnXG5pbXBvcnQgYXNzaWduIGZyb20gJy4uL2Fzc2lnbidcbmltcG9ydCB0aHJvdHRsZSBmcm9tICdsb2Rhc2gudGhyb3R0bGUnXG5pbXBvcnQgY3lHZXN0dXJlc1RvZ2dsZSBmcm9tICcuL2N5LWdlc3R1cmVzLXRvZ2dsZSdcbmltcG9ydCBjeUxpc3RlbmVycyBmcm9tICcuL2N5LWxpc3RlbmVycydcbmltcG9ydCBkcmF3TW9kZSBmcm9tICcuL2RyYXctbW9kZSdcbmltcG9ydCBkcmF3aW5nIGZyb20gJy4vZHJhd2luZydcbmltcG9ydCBlbmFibGluZyBmcm9tICcuL2VuYWJsaW5nJ1xuaW1wb3J0IGdlc3R1cmVMaWZlY3ljbGUgZnJvbSAnLi9nZXN0dXJlLWxpZmVjeWNsZSdcbmltcG9ydCBsaXN0ZW5lcnMgZnJvbSAnLi9saXN0ZW5lcnMnXG5pbXBvcnQgZWRnZUV2ZW50cyBmcm9tICcuL2VkZ2UtZXZlbnRzLXRvZ2dsZSdcblxuZnVuY3Rpb24gRWRnZWhhbmRsZXMgKGN5LCBvcHRpb25zKSB7XG4gIHRoaXMuY3kgPSBjeVxuICB0aGlzLmxpc3RlbmVycyA9IFtdXG5cbiAgLy8gZWRnZWhhbmRsZXMgZ2VzdHVyZSBzdGF0ZVxuICB0aGlzLmVuYWJsZWQgPSB0cnVlXG4gIHRoaXMuZHJhd01vZGUgPSBmYWxzZVxuICB0aGlzLmFjdGl2ZSA9IGZhbHNlXG4gIHRoaXMuZ3JhYmJpbmdOb2RlID0gZmFsc2VcblxuICAvLyBlZGdlaGFuZGxlcyBlbGVtZW50c1xuICB0aGlzLmhhbmRsZU5vZGVzID0gY3kuY29sbGVjdGlvbigpXG4gIHRoaXMuY2xlYXJDb2xsZWN0aW9ucygpXG5cbiAgLy8gbW91c2UgcG9zaXRpb25cbiAgdGhpcy5teCA9IDBcbiAgdGhpcy5teSA9IDBcblxuICB0aGlzLm9wdGlvbnMgPSBhc3NpZ24oe30sIGRlZmF1bHRzLCBvcHRpb25zKVxuXG4gIHRoaXMuc2F2ZUdlc3R1cmVTdGF0ZSgpXG4gIHRoaXMuYWRkTGlzdGVuZXJzKClcblxuICB0aGlzLnRocm90dGxlZFNuYXAgPSB0aHJvdHRsZSh0aGlzLnNuYXAuYmluZCh0aGlzKSwgMTAwMCAvIG9wdGlvbnMuc25hcEZyZXF1ZW5jeSlcblxuICB0aGlzLnByZXZlbnREZWZhdWx0ID0gZSA9PiBlLnByZXZlbnREZWZhdWx0KClcblxuICBsZXQgc3VwcG9ydHNQYXNzaXZlID0gZmFsc2VcbiAgdHJ5IHtcbiAgICBsZXQgb3B0cyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3Bhc3NpdmUnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3VwcG9ydHNQYXNzaXZlID0gdHJ1ZVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICB9XG4gICAgfSlcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdfJywgbnVsbCwgb3B0cylcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgLy8gZW1wdHlcbiAgfVxuXG4gIGlmIChzdXBwb3J0c1Bhc3NpdmUpIHtcbiAgICB0aGlzLndpbmRvd0xpc3RlbmVyT3B0aW9ucyA9IHsgY2FwdHVyZTogdHJ1ZSwgcGFzc2l2ZTogZmFsc2UgfVxuICB9IGVsc2Uge1xuICAgIHRoaXMud2luZG93TGlzdGVuZXJPcHRpb25zID0gdHJ1ZVxuICB9XG59XG5cbmxldCBwcm90byA9IEVkZ2VoYW5kbGVzLnByb3RvdHlwZSA9IHt9XG5cbnByb3RvLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucmVtb3ZlTGlzdGVuZXJzKClcbn1cblxucHJvdG8uc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIGFzc2lnbih0aGlzLm9wdGlvbnMsIG9wdGlvbnMpXG59XG5cbnByb3RvLm1wID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4geyB4OiB0aGlzLm14LCB5OiB0aGlzLm15IH1cbn1cblxucHJvdG8uY2xlYXJDb2xsZWN0aW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgbGV0IHsgY3kgfSA9IHRoaXNcblxuICB0aGlzLmhhbmRsZU5vZGUgPSBjeS5jb2xsZWN0aW9uKClcbiAgdGhpcy5wcmV2aWV3RWxlcyA9IGN5LmNvbGxlY3Rpb24oKVxuICB0aGlzLmdob3N0Tm9kZSA9IGN5LmNvbGxlY3Rpb24oKVxuICB0aGlzLmdob3N0RWxlcyA9IGN5LmNvbGxlY3Rpb24oKVxuICB0aGlzLnNvdXJjZU5vZGUgPSBjeS5jb2xsZWN0aW9uKClcbiAgdGhpcy50YXJnZXROb2RlID0gY3kuY29sbGVjdGlvbigpXG4gIHRoaXMucHJlc3VtcHRpdmVUYXJnZXRzID0gY3kuY29sbGVjdGlvbigpXG59XG5cbmxldCBleHRlbmQgPSBvYmogPT4gYXNzaWduKHByb3RvLCBvYmopXG5sZXQgZm4gPSBbXG4gIGN5R2VzdHVyZXNUb2dnbGUsXG4gIGN5TGlzdGVuZXJzLFxuICBkcmF3TW9kZSxcbiAgZHJhd2luZyxcbiAgZW5hYmxpbmcsXG4gIGdlc3R1cmVMaWZlY3ljbGUsXG4gIGxpc3RlbmVycyxcbiAgZWRnZUV2ZW50c1xuXVxuZm4uZm9yRWFjaChleHRlbmQpXG5cbmV4cG9ydCBkZWZhdWx0IEVkZ2VoYW5kbGVzXG4iLCJmdW5jdGlvbiBhZGRMaXN0ZW5lcnMgKCkge1xuICB0aGlzLmFkZEN5dG9zY2FwZUxpc3RlbmVycygpXG5cbiAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLmN5LCAnZGVzdHJveScsICgpID0+IHRoaXMuZGVzdHJveSgpKVxuXG4gIHJldHVybiB0aGlzXG59XG5cbmZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVycyAoKSB7XG4gIGZvciAobGV0IGkgPSB0aGlzLmxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGxldCBsID0gdGhpcy5saXN0ZW5lcnNbaV1cblxuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIobC50YXJnZXQsIGwuZXZlbnQsIGwuc2VsZWN0b3IsIGwuY2FsbGJhY2ssIGwub3B0aW9ucylcbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbmZ1bmN0aW9uIGdldExpc3RlbmVyICh0YXJnZXQsIGV2ZW50LCBzZWxlY3RvciwgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gdHlwZW9mICcnKSB7XG4gICAgY2FsbGJhY2sgPSBzZWxlY3RvclxuICAgIG9wdGlvbnMgPSBjYWxsYmFja1xuICAgIHNlbGVjdG9yID0gbnVsbFxuICB9XG5cbiAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgIG9wdGlvbnMgPSBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIHsgdGFyZ2V0LCBldmVudCwgc2VsZWN0b3IsIGNhbGxiYWNrLCBvcHRpb25zIH1cbn1cblxuZnVuY3Rpb24gaXNEb20gKHRhcmdldCkge1xuICByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgRWxlbWVudFxufVxuXG5mdW5jdGlvbiBhZGRMaXN0ZW5lciAodGFyZ2V0LCBldmVudCwgc2VsZWN0b3IsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gIGxldCBsID0gZ2V0TGlzdGVuZXIodGFyZ2V0LCBldmVudCwgc2VsZWN0b3IsIGNhbGxiYWNrLCBvcHRpb25zKVxuXG4gIHRoaXMubGlzdGVuZXJzLnB1c2gobClcblxuICBpZiAoaXNEb20obC50YXJnZXQpKSB7XG4gICAgbC50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihsLmV2ZW50LCBsLmNhbGxiYWNrLCBsLm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaWYgKGwuc2VsZWN0b3IpIHtcbiAgICAgIGwudGFyZ2V0LmFkZExpc3RlbmVyKGwuZXZlbnQsIGwuc2VsZWN0b3IsIGwuY2FsbGJhY2ssIGwub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgbC50YXJnZXQuYWRkTGlzdGVuZXIobC5ldmVudCwgbC5jYWxsYmFjaywgbC5vcHRpb25zKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbmZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyICh0YXJnZXQsIGV2ZW50LCBzZWxlY3RvciwgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgbGV0IGwgPSBnZXRMaXN0ZW5lcih0YXJnZXQsIGV2ZW50LCBzZWxlY3RvciwgY2FsbGJhY2ssIG9wdGlvbnMpXG5cbiAgZm9yIChsZXQgaSA9IHRoaXMubGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgbGV0IGwyID0gdGhpcy5saXN0ZW5lcnNbaV1cblxuICAgIGlmIChcbiAgICAgIGwudGFyZ2V0ID09PSBsMi50YXJnZXRcbiAgICAgICYmIGwuZXZlbnQgPT09IGwyLmV2ZW50XG4gICAgICAmJiAobC5zZWxlY3RvciA9PSBudWxsIHx8IGwuc2VsZWN0b3IgPT09IGwyLnNlbGVjdG9yKVxuICAgICAgJiYgKGwuY2FsbGJhY2sgPT0gbnVsbCB8fCBsLmNhbGxiYWNrID09PSBsMi5jYWxsYmFjaylcbiAgICApIHtcbiAgICAgIHRoaXMubGlzdGVuZXJzLnNwbGljZShpLCAxKVxuXG4gICAgICBpZiAoaXNEb20obC50YXJnZXQpKSB7XG4gICAgICAgIGwudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIobC5ldmVudCwgbC5jYWxsYmFjaywgbC5vcHRpb25zKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGwuc2VsZWN0b3IpIHtcbiAgICAgICAgICBsLnRhcmdldC5yZW1vdmVMaXN0ZW5lcihsLmV2ZW50LCBsLnNlbGVjdG9yLCBsLmNhbGxiYWNrLCBsLm9wdGlvbnMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbC50YXJnZXQucmVtb3ZlTGlzdGVuZXIobC5ldmVudCwgbC5jYWxsYmFjaywgbC5vcHRpb25zKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuZnVuY3Rpb24gZW1pdCAodHlwZSwgcG9zaXRpb24sIC4uLmFyZ3MpIHtcbiAgbGV0IHsgb3B0aW9ucywgY3kgfSA9IHRoaXNcblxuICBjeS5lbWl0KHsgdHlwZTogYGVoJHt0eXBlfWAsIHBvc2l0aW9uIH0sIGFyZ3MpXG5cbiAgbGV0IGhhbmRsZXIgPSBvcHRpb25zW3R5cGVdXG5cbiAgaWYgKGhhbmRsZXIgIT0gbnVsbCkge1xuICAgIGhhbmRsZXIoLi4uYXJncylcbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbmV4cG9ydCBkZWZhdWx0IHsgYWRkTGlzdGVuZXIsIGFkZExpc3RlbmVycywgcmVtb3ZlTGlzdGVuZXIsIHJlbW92ZUxpc3RlbmVycywgZW1pdCB9XG4iLCJpbXBvcnQgY29yZSBmcm9tICcuL2NvcmUnXG5cbi8vIHJlZ2lzdGVycyB0aGUgZXh0ZW5zaW9uIG9uIGEgY3l0b3NjYXBlIGxpYiByZWZcbmxldCByZWdpc3RlciA9IGZ1bmN0aW9uIChjeXRvc2NhcGUpIHtcbiAgaWYgKCFjeXRvc2NhcGUpIHtcbiAgICByZXR1cm5cbiAgfSAvLyBjYW4ndCByZWdpc3RlciBpZiBjeXRvc2NhcGUgdW5zcGVjaWZpZWRcblxuICBjeXRvc2NhcGUoJ2NvcmUnLCAnZWRnZWhhbmRsZXMnLCBjb3JlKSAvLyByZWdpc3RlciB3aXRoIGN5dG9zY2FwZS5qc1xufVxuXG5pZiAodHlwZW9mIGN5dG9zY2FwZSAhPT0gJ3VuZGVmaW5lZCcpIHsgLy8gZXhwb3NlIHRvIGdsb2JhbCBjeXRvc2NhcGUgKGkuZS4gd2luZG93LmN5dG9zY2FwZSlcbiAgcmVnaXN0ZXIoY3l0b3NjYXBlKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlZ2lzdGVyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfbG9kYXNoX21lbW9pemVfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfbG9kYXNoX3Rocm90dGxlX187Il0sInNvdXJjZVJvb3QiOiIifQ==