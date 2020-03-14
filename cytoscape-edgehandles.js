(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash.memoize"), require("lodash.throttle"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash.memoize", "lodash.throttle"], factory);
	else if(typeof exports === 'object')
		exports["cytoscapeEdgehandles"] = factory(require("lodash.memoize"), require("lodash.throttle"));
	else
		root["cytoscapeEdgehandles"] = factory(root["_"]["memoize"], root["_"]["throttle"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_14__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
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

  srcs.filter(function (src) {
    return src != null;
  }).forEach(function (src) {
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


var Edgehandles = __webpack_require__(10);
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

module.exports = { disableGestures: disableGestures, resetGestures: resetGestures, saveGestureState: saveGestureState };

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function addCytoscapeListeners() {
  var _this = this;

  var cy = this.cy,
      options = this.options;

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

    if (!node.same(_this.handleNode)) {
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
    if (options.snap) {
      // then ignore events like mouseover
    } else {
      _this.preview(e.target);
    }
  });

  // hover out unpreview
  this.addListener(cy, 'tapdragout', 'node', function (e) {
    if (options.snap) {
      // then keep the preview
    } else {
      _this.unpreview(e.target);
    }
  });

  // stop gesture on tapend
  this.addListener(cy, 'tapend', function () {
    _this.stop();
  });

  // hide handle if source node is removed
  this.addListener(cy, 'remove', function (e) {
    if (e.target.same(_this.sourceNode)) {
      _this.hide();
    }
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
  snap: false, // when enabled, the edge can be drawn by just moving close to a target node (can be confusing on compound graphs)
  snapThreshold: 50, // the target node must be less than or equal to this many pixels away from the cursor/finger
  snapFrequency: 15, // the number of times per second (Hz) that snap checks done (lower is less expensive)
  noEdgeEventsInDraw: false, // set events:no to edges during draws, prevents mouseouts on compounds
  disableBrowserGestures: true, // during an edge drawing gesture, disable browser gestures such as two-finger trackpad swipe and pinch-to-zoom
  handlePosition: function handlePosition(node) {
    return 'middle top'; // sets the position of the handle in the format of "X-AXIS Y-AXIS" such as "left top", "middle top"
  },
  handleClasses: function handleClasses() {
    return [];
  },
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
  nodeClasses: function nodeClasses() {
    return [];
  },
  edgeParams: function edgeParams(sourceNode, targetNode, i) {
    // for edges between the specified source and target
    // return element object to be passed to cy.add() for edge
    // NB: i indicates edge index in case of edgeType: 'node'
    return {};
  },
  edgeClasses: function edgeClasses() {
    return [];
  },
  ghostEdgeParams: function ghostEdgeParams() {
    // return element object to be passed to cy.add() for the ghost edge
    // (default classes are always added for you)
    return {};
  },
  ghostEdgeClasses: function ghostEdgeClasses() {
    return [];
  },
  ghostNodeClasses: function ghostNodeClasses() {
    return [];
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


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var assign = __webpack_require__(0);
var isString = function isString(x) {
  return (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === _typeof('');
};
var isArray = function isArray(x) {
  return (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === _typeof([]) && x.length != null;
};

function getEleJson(overrides, params, addedClasses) {
  var json = {};

  // basic values
  assign(json, params, overrides);

  // make sure params can specify data but that overrides take precedence
  assign(json.data, params.data, overrides.data);

  if (isString(params.classes)) {
    json.classes = params.classes + ' ' + addedClasses;
  } else if (isArray(params.classes)) {
    json.classes = params.classes.join(' ') + ' ' + addedClasses;
  } else {
    json.classes = addedClasses;
  }

  return json;
}

function makeEdges() {
  var preview = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var cy = this.cy,
      options = this.options,
      presumptiveTargets = this.presumptiveTargets,
      previewEles = this.previewEles,
      active = this.active;


  var source = this.sourceNode;
  var target = this.targetNode;
  var classes = preview ? ['eh-preview'] : [];
  var added = cy.collection();
  var edgeType = options.edgeType(source, target);

  // can't make edges outside of regular gesture lifecycle
  if (!active) {
    return;
  }

  // must have a non-empty edge type
  if (!edgeType) {
    return;
  }

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
    previewEles.removeClass('eh-preview').style('events', '');

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

  if (edgeType === 'node') {
    var interNode = cy.add(getEleJson({
      group: 'nodes',
      position: p
    }, options.nodeParams(source, target), classes.concat(options.nodeClasses())));

    var source2inter = cy.add(getEleJson({
      group: 'edges',
      data: {
        source: source.id(),
        target: interNode.id()
      }
    }, options.edgeParams(source, target, 0), classes.concat(options.edgeClasses())));

    var inter2target = cy.add(getEleJson({
      group: 'edges',
      data: {
        source: interNode.id(),
        target: target.id()
      }
    }, options.edgeParams(source, target, 1), classes.concat(options.edgeClasses())));

    added = added.merge(interNode).merge(source2inter).merge(inter2target);
  } else {
    // flat
    var source2target = cy.add(getEleJson({
      group: 'edges',
      data: {
        source: source.id(),
        target: target.id()
      }
    }, options.edgeParams(source, target, 0), classes.concat(options.edgeClasses())));

    added = added.merge(source2target);
  }

  if (preview) {
    this.previewEles = added;

    added.style('events', 'no');
  } else {
    added.style('events', '');

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
  if (this.handleShown()) {
    this.handleNode.remove();
  }

  return this;
}

function setHandleFor(node) {
  var _this = this;

  var options = this.options,
      cy = this.cy;


  var handlePosition = _typeof(options.handlePosition) === _typeof('') ? function () {
    return options.handlePosition;
  } : options.handlePosition;

  var p = node.position();
  var h = node.outerHeight();
  var w = node.outerWidth();

  // store how much we should move the handle from origin(p.x, p.y)
  var moveX = 0;
  var moveY = 0;

  // grab axes
  var axes = handlePosition(node).toLowerCase().split(/\s+/);
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
        classes: ['eh-handle'].concat(options.handleClasses()),
        position: pos,
        grabbable: false,
        selectable: false
      });
      console.log(_this.handleNode);

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
      my = this.my,
      options = this.options;

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
        classes: ['eh-ghost', 'eh-ghost-node'].concat(options.ghostNodeClasses()),
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

      var ghostEdgeParams = options.ghostEdgeParams();

      ghostEdge = cy.add(assign({}, ghostEdgeParams, {
        group: 'edges',
        data: assign({}, ghostEdgeParams.data, {
          source: sourceNode.id(),
          target: ghostNode.id()
        }),
        classes: ['eh-ghost', 'eh-ghost-edge'].concat(options.ghostEdgeClasses())
      }));

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


function disableEdgeEvents() {
  if (this.options.noEdgeEventsInDraw) {
    this.cy.edges().style('events', 'no');
  }

  return this;
}

function enableEdgeEvents() {
  if (this.options.noEdgeEventsInDraw) {
    this.cy.edges().style('events', '');
  }

  return this;
}

module.exports = { disableEdgeEvents: disableEdgeEvents, enableEdgeEvents: enableEdgeEvents };

/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var memoize = __webpack_require__(13);
var sqrt2 = Math.sqrt(2);

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
  this.removeHandle();

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
  this.disableEdgeEvents();

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
  this.throttledSnap();

  return this;
}

function snap() {
  if (!this.active || !this.options.snap) {
    return false;
  }

  var cy = this.cy;
  var tgt = this.targetNode;
  var threshold = this.options.snapThreshold;
  var mousePos = this.mp();
  var handleNode = this.handleNode,
      previewEles = this.previewEles,
      ghostNode = this.ghostNode;


  var radius = function radius(n) {
    return sqrt2 * Math.max(n.outerWidth(), n.outerHeight()) / 2;
  }; // worst-case enclosure of bb by circle
  var sqDist = function sqDist(x1, y1, x2, y2) {
    var dx = x2 - x1;var dy = y2 - y1;return dx * dx + dy * dy;
  };
  var sqDistByPt = function sqDistByPt(p1, p2) {
    return sqDist(p1.x, p1.y, p2.x, p2.y);
  };
  var nodeSqDist = function nodeSqDist(n) {
    return sqDistByPt(n.position(), mousePos);
  };

  var sqThreshold = function sqThreshold(n) {
    var r = radius(n);var t = r + threshold;return t * t;
  };
  var isWithinTheshold = function isWithinTheshold(n) {
    return nodeSqDist(n) <= sqThreshold(n);
  };

  var bbSqDist = function bbSqDist(n) {
    var p = n.position();
    var halfW = n.outerWidth() / 2;
    var halfH = n.outerHeight() / 2;

    // node and mouse positions, line is formed from node to mouse
    var nx = p.x;
    var ny = p.y;
    var mx = mousePos.x;
    var my = mousePos.y;

    // bounding box
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

  if (tgt.nonempty() && !isWithinTheshold(tgt)) {
    this.unpreview(tgt);
  }

  for (var i = 0; i < nodesByDist.length; i++) {
    var n = nodesByDist[i];

    // skip a parent node when the mouse is inside it
    if (n.isParent() && mouseIsInside(n)) {
      continue;
    }

    // skip a child node when the mouse is not inside the parent
    if (n.isChild() && !mouseIsInside(n.parent())) {
      continue;
    }

    if (n.same(tgt) || this.preview(n, allowHoverDelay)) {
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
      ghostEles = this.ghostEles,
      presumptiveTargets = this.presumptiveTargets,
      previewEles = this.previewEles,
      active = this.active;

  var source = sourceNode;
  var isLoop = target.same(source);
  var loopAllowed = options.loopAllowed(target);
  var isGhost = target.same(ghostNode);
  var noEdge = !options.edgeType(source, target);
  var isHandle = target.same(this.handleNode);
  var isExistingTgt = target.same(this.targetNode);

  if (!active || isHandle || isGhost || noEdge || isExistingTgt || isLoop && !loopAllowed
  // || (target.isParent())
  ) {
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
  if (!this.active || target.same(this.handleNode)) {
    return;
  }

  var previewTimeout = this.previewTimeout,
      sourceNode = this.sourceNode,
      previewEles = this.previewEles,
      ghostEles = this.ghostEles,
      cy = this.cy;

  clearTimeout(previewTimeout);
  this.previewTimeout = null;

  var source = sourceNode;

  target.removeClass('eh-preview eh-target eh-presumptive-target eh-preview-active');
  ghostEles.removeClass('eh-preview-active');
  sourceNode.removeClass('eh-preview-active');

  this.targetNode = cy.collection();

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
      ghostEles = this.ghostEles,
      presumptiveTargets = this.presumptiveTargets;


  clearTimeout(this.previewTimeout);

  sourceNode.removeClass('eh-source');
  targetNode.removeClass('eh-target eh-preview eh-hover');
  presumptiveTargets.removeClass('eh-presumptive-target');

  this.makeEdges();

  this.removeHandle();

  ghostEles.remove();

  this.clearCollections();

  this.resetGestures();
  this.enableEdgeEvents();

  this.active = false;

  this.emit('stop', this.mp(), sourceNode);

  return this;
}

module.exports = {
  show: show, hide: hide, start: start, update: update, preview: preview, unpreview: unpreview, stop: stop, snap: snap,
  canStartOn: canStartOn, canStartDrawModeOn: canStartDrawModeOn, canStartNonDrawModeOn: canStartNonDrawModeOn
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(4);
var assign = __webpack_require__(0);
var throttle = __webpack_require__(14);

var cyGesturesToggle = __webpack_require__(2);
var cyListeners = __webpack_require__(3);
var drawMode = __webpack_require__(5);
var drawing = __webpack_require__(6);
var enabling = __webpack_require__(8);
var gestureLifecycle = __webpack_require__(9);
var listeners = __webpack_require__(11);
var edgeEvents = __webpack_require__(7);

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

  this.throttledSnap = throttle(this.snap.bind(this), 1000 / options.snapFrequency);

  this.preventDefault = function (e) {
    return e.preventDefault();
  };

  var supportsPassive = false;
  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function get() {
        supportsPassive = true;
      }
    });

    window.addEventListener('test', null, opts);
  } catch (err) {}

  if (supportsPassive) {
    this.windowListenerOptions = { capture: true, passive: false };
  } else {
    this.windowListenerOptions = true;
  }
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

[cyGesturesToggle, cyListeners, drawMode, drawing, enabling, gestureLifecycle, listeners, edgeEvents].forEach(extend);

module.exports = Edgehandles;

/***/ }),
/* 11 */
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

  var handler = options[type];

  if (handler != null) {
    handler.apply(undefined, args);
  }

  return this;
}

module.exports = { addListener: addListener, addListeners: addListeners, removeListener: removeListener, removeListeners: removeListeners, emit: emit };

/***/ }),
/* 12 */
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

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmOTQ4OGRiY2RkZGM5MjFiMzM2NSIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzaWduLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9lZGdlaGFuZGxlcy9jeS1nZXN0dXJlcy10b2dnbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VkZ2VoYW5kbGVzL2N5LWxpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWRnZWhhbmRsZXMvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VkZ2VoYW5kbGVzL2RyYXctbW9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWRnZWhhbmRsZXMvZHJhd2luZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWRnZWhhbmRsZXMvZWRnZS1ldmVudHMtdG9nZ2xlLmpzIiwid2VicGFjazovLy8uL3NyYy9lZGdlaGFuZGxlcy9lbmFibGluZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWRnZWhhbmRsZXMvZ2VzdHVyZS1saWZlY3ljbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VkZ2VoYW5kbGVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9lZGdlaGFuZGxlcy9saXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwibG9kYXNoLm1lbW9pemVcIixcImNvbW1vbmpzMlwiOlwibG9kYXNoLm1lbW9pemVcIixcImFtZFwiOlwibG9kYXNoLm1lbW9pemVcIixcInJvb3RcIjpbXCJfXCIsXCJtZW1vaXplXCJdfSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImxvZGFzaC50aHJvdHRsZVwiLFwiY29tbW9uanMyXCI6XCJsb2Rhc2gudGhyb3R0bGVcIixcImFtZFwiOlwibG9kYXNoLnRocm90dGxlXCIsXCJyb290XCI6W1wiX1wiLFwidGhyb3R0bGVcIl19Il0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJPYmplY3QiLCJhc3NpZ24iLCJiaW5kIiwidGd0Iiwic3JjcyIsImZpbHRlciIsInNyYyIsImZvckVhY2giLCJrZXlzIiwiayIsIkVkZ2VoYW5kbGVzIiwicmVxdWlyZSIsIm9wdGlvbnMiLCJjeSIsImRpc2FibGVHZXN0dXJlcyIsInNhdmVHZXN0dXJlU3RhdGUiLCJ6b29taW5nRW5hYmxlZCIsInBhbm5pbmdFbmFibGVkIiwiYm94U2VsZWN0aW9uRW5hYmxlZCIsImRpc2FibGVCcm93c2VyR2VzdHVyZXMiLCJ3bE9wdHMiLCJ3aW5kb3dMaXN0ZW5lck9wdGlvbnMiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicHJldmVudERlZmF1bHQiLCJyZXNldEdlc3R1cmVzIiwibGFzdFpvb21pbmdFbmFibGVkIiwibGFzdFBhbm5pbmdFbmFibGVkIiwibGFzdEJveFNlbGVjdGlvbkVuYWJsZWQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWRkQ3l0b3NjYXBlTGlzdGVuZXJzIiwiYWRkTGlzdGVuZXIiLCJncmFiYmluZ05vZGUiLCJzaG93IiwiZSIsInRhcmdldCIsIm5vZGUiLCJzYW1lIiwiaGFuZGxlTm9kZSIsInNvdXJjZU5vZGUiLCJoaWRlIiwic3RhcnQiLCJkcmF3TW9kZSIsInVwZGF0ZSIsInBvc2l0aW9uIiwic25hcCIsInByZXZpZXciLCJ1bnByZXZpZXciLCJzdG9wIiwiZGVmYXVsdHMiLCJob3ZlckRlbGF5IiwiaGFuZGxlTm9kZXMiLCJzbmFwVGhyZXNob2xkIiwic25hcEZyZXF1ZW5jeSIsIm5vRWRnZUV2ZW50c0luRHJhdyIsImhhbmRsZVBvc2l0aW9uIiwiaGFuZGxlQ2xhc3NlcyIsImhhbmRsZUluRHJhd01vZGUiLCJlZGdlVHlwZSIsInRhcmdldE5vZGUiLCJsb29wQWxsb3dlZCIsIm5vZGVMb29wT2Zmc2V0Iiwibm9kZVBhcmFtcyIsIm5vZGVDbGFzc2VzIiwiZWRnZVBhcmFtcyIsImkiLCJlZGdlQ2xhc3NlcyIsImdob3N0RWRnZVBhcmFtcyIsImdob3N0RWRnZUNsYXNzZXMiLCJnaG9zdE5vZGVDbGFzc2VzIiwiY29tcGxldGUiLCJhZGRlZEVsZXMiLCJjYW5jZWwiLCJjYW5jZWxsZWRUYXJnZXRzIiwiaG92ZXJvdmVyIiwiaG92ZXJvdXQiLCJwcmV2aWV3b24iLCJwcmV2aWV3RWxlcyIsInByZXZpZXdvZmYiLCJkcmF3b24iLCJkcmF3b2ZmIiwidG9nZ2xlRHJhd01vZGUiLCJib29sIiwicHJldlVuZ3JhYmlmeVN0YXRlIiwiYXV0b3VuZ3JhYmlmeSIsImhhbmRsZVNob3duIiwiZW1pdCIsImVuYWJsZURyYXdNb2RlIiwiZGlzYWJsZURyYXdNb2RlIiwiaXNTdHJpbmciLCJ4IiwiaXNBcnJheSIsImxlbmd0aCIsImdldEVsZUpzb24iLCJvdmVycmlkZXMiLCJwYXJhbXMiLCJhZGRlZENsYXNzZXMiLCJqc29uIiwiZGF0YSIsImNsYXNzZXMiLCJqb2luIiwibWFrZUVkZ2VzIiwicHJlc3VtcHRpdmVUYXJnZXRzIiwiYWN0aXZlIiwic291cmNlIiwiYWRkZWQiLCJjb2xsZWN0aW9uIiwic2l6ZSIsInJlbW92ZSIsIm1wIiwicmVtb3ZlQ2xhc3MiLCJzdHlsZSIsInAxIiwicDIiLCJwIiwieSIsImludGVyTm9kZSIsImFkZCIsImdyb3VwIiwiY29uY2F0Iiwic291cmNlMmludGVyIiwiaWQiLCJpbnRlcjJ0YXJnZXQiLCJtZXJnZSIsInNvdXJjZTJ0YXJnZXQiLCJtYWtlUHJldmlldyIsInByZXZpZXdTaG93biIsIm5vbmVtcHR5IiwiaW5zaWRlIiwicmVtb3ZlUHJldmlldyIsInJlbW92ZUhhbmRsZSIsInNldEhhbmRsZUZvciIsImgiLCJvdXRlckhlaWdodCIsInciLCJvdXRlcldpZHRoIiwibW92ZVgiLCJtb3ZlWSIsImF4ZXMiLCJ0b0xvd2VyQ2FzZSIsInNwbGl0IiwiYXhpc1giLCJheGlzWSIsImh4IiwiaHkiLCJwb3MiLCJiYXRjaCIsImdyYWJiYWJsZSIsInNlbGVjdGFibGUiLCJjb25zb2xlIiwibG9nIiwidXBkYXRlRWRnZSIsImdob3N0Tm9kZSIsIm14IiwibXkiLCJnaG9zdEVkZ2UiLCJnaG9zdEVsZXMiLCJyZW1vdmVkIiwiZGlzYWJsZUVkZ2VFdmVudHMiLCJlZGdlcyIsImVuYWJsZUVkZ2VFdmVudHMiLCJlbmFibGUiLCJlbmFibGVkIiwiZGlzYWJsZSIsIm1lbW9pemUiLCJzcXJ0MiIsIk1hdGgiLCJzcXJ0IiwiY2FuU3RhcnRPbiIsImlzUHJldmlldyIsImFueVNhbWUiLCJlbCIsImlzR2hvc3QiLCJ1c2VyRmlsdGVyIiwiaXNIYW5kbGUiLCJpc1RlbXAiLCJjYW5TdGFydERyYXdNb2RlT24iLCJjYW5TdGFydE5vbkRyYXdNb2RlT24iLCJocCIsImFkZENsYXNzIiwidGhyb3R0bGVkU25hcCIsInRocmVzaG9sZCIsIm1vdXNlUG9zIiwicmFkaXVzIiwibWF4IiwibiIsInNxRGlzdCIsIngxIiwieTEiLCJ4MiIsInkyIiwiZHgiLCJkeSIsInNxRGlzdEJ5UHQiLCJub2RlU3FEaXN0Iiwic3FUaHJlc2hvbGQiLCJyIiwidCIsImlzV2l0aGluVGhlc2hvbGQiLCJiYlNxRGlzdCIsImhhbGZXIiwiaGFsZkgiLCJueCIsIm55IiwiaW5zaWRlWEJvdW5kcyIsImluc2lkZVlCb3VuZHMiLCJkeTEiLCJkeTIiLCJtaW4iLCJkeDEiLCJkeDIiLCJjbXBCYlNxRGlzdCIsIm4xIiwibjIiLCJjbXAiLCJhbGxvd0hvdmVyRGVsYXkiLCJtb3VzZUlzSW5zaWRlIiwiaXNFaEVsZSIsIm5vZGVzQnlEaXN0Iiwibm9kZXMiLCJzb3J0Iiwic25hcHBlZCIsImlzUGFyZW50IiwiaXNDaGlsZCIsInBhcmVudCIsImlzTG9vcCIsIm5vRWRnZSIsImlzRXhpc3RpbmdUZ3QiLCJjbGVhclRpbWVvdXQiLCJwcmV2aWV3VGltZW91dCIsImFwcGx5UHJldmlldyIsInNldFRpbWVvdXQiLCJjbGVhckNvbGxlY3Rpb25zIiwidGhyb3R0bGUiLCJjeUdlc3R1cmVzVG9nZ2xlIiwiY3lMaXN0ZW5lcnMiLCJkcmF3aW5nIiwiZW5hYmxpbmciLCJnZXN0dXJlTGlmZWN5Y2xlIiwibGlzdGVuZXJzIiwiZWRnZUV2ZW50cyIsImhyIiwiYWRkTGlzdGVuZXJzIiwic3VwcG9ydHNQYXNzaXZlIiwib3B0cyIsImRlZmluZVByb3BlcnR5IiwiZ2V0IiwiZXJyIiwiY2FwdHVyZSIsInBhc3NpdmUiLCJwcm90byIsInByb3RvdHlwZSIsImV4dGVuZCIsIm9iaiIsImRlc3Ryb3kiLCJyZW1vdmVMaXN0ZW5lcnMiLCJzZXRPcHRpb25zIiwibCIsInJlbW92ZUxpc3RlbmVyIiwiZXZlbnQiLCJzZWxlY3RvciIsImNhbGxiYWNrIiwiZ2V0TGlzdGVuZXIiLCJpc0RvbSIsIkVsZW1lbnQiLCJwdXNoIiwibDIiLCJzcGxpY2UiLCJ0eXBlIiwiYXJncyIsImhhbmRsZXIiLCJpbXBsIiwicmVnaXN0ZXIiLCJjeXRvc2NhcGUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUNoRUE7O0FBRUFBLE9BQU9DLE9BQVAsR0FBaUJDLE9BQU9DLE1BQVAsSUFB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O0FBRUQvUSxPQUFPQyxPQUFQLEdBQWlCLEVBQUVnQyx3QkFBRixFQUFlbU4sMEJBQWYsRUFBNkJnQiw4QkFBN0IsRUFBNkNILGdDQUE3QyxFQUE4RHpLLFVBQTlELEVBQWpCLEM7Ozs7Ozs7OztBQ25HQSxJQUFNeUwsT0FBTyxtQkFBQXBRLENBQVEsQ0FBUixDQUFiOztBQUVBO0FBQ0EsSUFBSXFRLFdBQVcsU0FBWEEsUUFBVyxDQUFVQyxTQUFWLEVBQXFCO0FBQ2xDLE1BQUksQ0FBQ0EsU0FBTCxFQUFnQjtBQUFFO0FBQVMsR0FETyxDQUNOOztBQUU1QkEsWUFBVyxNQUFYLEVBQW1CLGFBQW5CLEVBQWtDRixJQUFsQyxFQUhrQyxDQUdRO0FBQzNDLENBSkQ7O0FBTUEsSUFBSSxPQUFPRSxTQUFQLEtBQXFCLFdBQXpCLEVBQXNDO0FBQUU7QUFDdENELFdBQVVDLFNBQVYsRUFEb0MsQ0FDYjtBQUN4Qjs7QUFFRG5SLE9BQU9DLE9BQVAsR0FBaUJpUixRQUFqQixDOzs7Ozs7QUNiQSxnRDs7Ozs7O0FDQUEsZ0QiLCJmaWxlIjoiY3l0b3NjYXBlLWVkZ2VoYW5kbGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwibG9kYXNoLm1lbW9pemVcIiksIHJlcXVpcmUoXCJsb2Rhc2gudGhyb3R0bGVcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wibG9kYXNoLm1lbW9pemVcIiwgXCJsb2Rhc2gudGhyb3R0bGVcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiY3l0b3NjYXBlRWRnZWhhbmRsZXNcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJsb2Rhc2gubWVtb2l6ZVwiKSwgcmVxdWlyZShcImxvZGFzaC50aHJvdHRsZVwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiY3l0b3NjYXBlRWRnZWhhbmRsZXNcIl0gPSBmYWN0b3J5KHJvb3RbXCJfXCJdW1wibWVtb2l6ZVwiXSwgcm9vdFtcIl9cIl1bXCJ0aHJvdHRsZVwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzEzX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTRfXykge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmOTQ4OGRiY2RkZGM5MjFiMzM2NSIsIi8vIFNpbXBsZSwgaW50ZXJuYWwgT2JqZWN0LmFzc2lnbigpIHBvbHlmaWxsIGZvciBvcHRpb25zIG9iamVjdHMgZXRjLlxuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24gIT0gbnVsbCA/IE9iamVjdC5hc3NpZ24uYmluZCggT2JqZWN0ICkgOiBmdW5jdGlvbiggdGd0LCAuLi5zcmNzICl7XG4gIHNyY3MuZmlsdGVyKCBzcmMgPT4gc3JjICE9IG51bGwgKS5mb3JFYWNoKCBzcmMgPT4ge1xuICAgIE9iamVjdC5rZXlzKCBzcmMgKS5mb3JFYWNoKCBrID0+IHRndFtrXSA9IHNyY1trXSApO1xuICB9ICk7XG5cbiAgcmV0dXJuIHRndDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzaWduLmpzIiwiY29uc3QgRWRnZWhhbmRsZXMgPSByZXF1aXJlKCcuL2VkZ2VoYW5kbGVzJyk7XG5jb25zdCBhc3NpZ24gPSByZXF1aXJlKCcuL2Fzc2lnbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCBvcHRpb25zICl7XG4gIGxldCBjeSA9IHRoaXM7XG5cbiAgcmV0dXJuIG5ldyBFZGdlaGFuZGxlcyggYXNzaWduKHsgY3kgfSwgb3B0aW9ucykgKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29yZS5qcyIsImZ1bmN0aW9uIGRpc2FibGVHZXN0dXJlcygpe1xuICB0aGlzLnNhdmVHZXN0dXJlU3RhdGUoKTtcblxuICAoIHRoaXMuY3lcbiAgICAuem9vbWluZ0VuYWJsZWQoIGZhbHNlIClcbiAgICAucGFubmluZ0VuYWJsZWQoIGZhbHNlIClcbiAgICAuYm94U2VsZWN0aW9uRW5hYmxlZCggZmFsc2UgKVxuICApO1xuXG4gIGlmKCB0aGlzLm9wdGlvbnMuZGlzYWJsZUJyb3dzZXJHZXN0dXJlcyApe1xuICAgIGxldCB3bE9wdHMgPSB0aGlzLndpbmRvd0xpc3RlbmVyT3B0aW9ucztcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5wcmV2ZW50RGVmYXVsdCwgd2xPcHRzKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5wcmV2ZW50RGVmYXVsdCwgd2xPcHRzKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLnByZXZlbnREZWZhdWx0LCB3bE9wdHMpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIHJlc2V0R2VzdHVyZXMoKXtcbiAgKCB0aGlzLmN5XG4gICAgLnpvb21pbmdFbmFibGVkKCB0aGlzLmxhc3Rab29taW5nRW5hYmxlZCApXG4gICAgLnBhbm5pbmdFbmFibGVkKCB0aGlzLmxhc3RQYW5uaW5nRW5hYmxlZCApXG4gICAgLmJveFNlbGVjdGlvbkVuYWJsZWQoIHRoaXMubGFzdEJveFNlbGVjdGlvbkVuYWJsZWQgKVxuICApO1xuXG4gIGlmKCB0aGlzLm9wdGlvbnMuZGlzYWJsZUJyb3dzZXJHZXN0dXJlcyApe1xuICAgIGxldCB3bE9wdHMgPSB0aGlzLndpbmRvd0xpc3RlbmVyT3B0aW9ucztcblxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5wcmV2ZW50RGVmYXVsdCwgd2xPcHRzKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5wcmV2ZW50RGVmYXVsdCwgd2xPcHRzKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLnByZXZlbnREZWZhdWx0LCB3bE9wdHMpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIHNhdmVHZXN0dXJlU3RhdGUoKXtcbiAgbGV0IHsgY3kgfSA9IHRoaXM7XG5cbiAgdGhpcy5sYXN0UGFubmluZ0VuYWJsZWQgPSBjeS5wYW5uaW5nRW5hYmxlZCgpO1xuICB0aGlzLmxhc3Rab29taW5nRW5hYmxlZCA9IGN5Lnpvb21pbmdFbmFibGVkKCk7XG4gIHRoaXMubGFzdEJveFNlbGVjdGlvbkVuYWJsZWQgPSBjeS5ib3hTZWxlY3Rpb25FbmFibGVkKCk7XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBkaXNhYmxlR2VzdHVyZXMsIHJlc2V0R2VzdHVyZXMsIHNhdmVHZXN0dXJlU3RhdGUgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lZGdlaGFuZGxlcy9jeS1nZXN0dXJlcy10b2dnbGUuanMiLCJmdW5jdGlvbiBhZGRDeXRvc2NhcGVMaXN0ZW5lcnMoKXtcbiAgbGV0IHsgY3ksIG9wdGlvbnMgfSA9IHRoaXM7XG5cbiAgLy8gZ3JhYmJpbmcgbm9kZXNcbiAgdGhpcy5hZGRMaXN0ZW5lciggY3ksICdkcmFnJywgKCkgPT4gdGhpcy5ncmFiYmluZ05vZGUgPSB0cnVlICk7XG4gIHRoaXMuYWRkTGlzdGVuZXIoIGN5LCAnZnJlZScsICgpID0+IHRoaXMuZ3JhYmJpbmdOb2RlID0gZmFsc2UgKTtcblxuICAvLyBzaG93IGhhbmRsZSBvbiBob3ZlclxuICB0aGlzLmFkZExpc3RlbmVyKCBjeSwgJ21vdXNlb3ZlcicsICdub2RlJywgZSA9PiB7XG4gICAgdGhpcy5zaG93KCBlLnRhcmdldCApO1xuICB9ICk7XG5cbiAgLy8gaGlkZSBoYW5kbGUgb24gdGFwIGhhbmRsZVxuICB0aGlzLmFkZExpc3RlbmVyKCBjeSwgJ3RhcCcsICdub2RlJywgZSA9PiB7XG4gICAgbGV0IG5vZGUgPSBlLnRhcmdldDtcblxuICAgIGlmKCAhbm9kZS5zYW1lKCB0aGlzLmhhbmRsZU5vZGUgKSApe1xuICAgICAgdGhpcy5zaG93KCBub2RlICk7XG4gICAgfVxuICB9ICk7XG5cbiAgLy8gaGlkZSBoYW5kbGUgd2hlbiBzb3VyY2Ugbm9kZSBtb3ZlZFxuICB0aGlzLmFkZExpc3RlbmVyKCBjeSwgJ3Bvc2l0aW9uJywgJ25vZGUnLCBlID0+IHtcbiAgICBpZiggZS50YXJnZXQuc2FtZSggdGhpcy5zb3VyY2VOb2RlICkgKXtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cbiAgfSApO1xuXG4gIC8vIHN0YXJ0IG9uIHRhcHN0YXJ0IGhhbmRsZVxuICAvLyBzdGFydCBvbiB0YXBzdGFydCBub2RlIChkcmF3IG1vZGUpXG4gIC8vIHRvZ2dsZSBvbiBzb3VyY2Ugbm9kZVxuICB0aGlzLmFkZExpc3RlbmVyKCBjeSwgJ3RhcHN0YXJ0JywgJ25vZGUnLCBlID0+IHtcbiAgICBsZXQgbm9kZSA9IGUudGFyZ2V0O1xuXG4gICAgaWYoIG5vZGUuc2FtZSggdGhpcy5oYW5kbGVOb2RlICkgKXtcbiAgICAgIHRoaXMuc3RhcnQoIHRoaXMuc291cmNlTm9kZSApO1xuICAgIH0gZWxzZSBpZiggdGhpcy5kcmF3TW9kZSApe1xuICAgICAgdGhpcy5zdGFydCggbm9kZSApO1xuICAgIH0gZWxzZSBpZiggbm9kZS5zYW1lKCB0aGlzLnNvdXJjZU5vZGUgKSApe1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICB9ICk7XG5cbiAgLy8gdXBkYXRlIGxpbmUgb24gZHJhZ1xuICB0aGlzLmFkZExpc3RlbmVyKCBjeSwgJ3RhcGRyYWcnLCBlID0+IHtcbiAgICB0aGlzLnVwZGF0ZSggZS5wb3NpdGlvbiApO1xuICB9ICk7XG5cbiAgLy8gaG92ZXIgb3ZlciBwcmV2aWV3XG4gIHRoaXMuYWRkTGlzdGVuZXIoIGN5LCAndGFwZHJhZ292ZXInLCAnbm9kZScsIGUgPT4ge1xuICAgIGlmKCBvcHRpb25zLnNuYXAgKXtcbiAgICAgIC8vIHRoZW4gaWdub3JlIGV2ZW50cyBsaWtlIG1vdXNlb3ZlclxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByZXZpZXcoIGUudGFyZ2V0ICk7XG4gICAgfVxuICB9ICk7XG5cbiAgLy8gaG92ZXIgb3V0IHVucHJldmlld1xuICB0aGlzLmFkZExpc3RlbmVyKCBjeSwgJ3RhcGRyYWdvdXQnLCAnbm9kZScsIGUgPT4ge1xuICAgIGlmKCBvcHRpb25zLnNuYXAgKXtcbiAgICAgIC8vIHRoZW4ga2VlcCB0aGUgcHJldmlld1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVucHJldmlldyggZS50YXJnZXQgKTtcbiAgICB9XG4gIH0gKTtcblxuICAvLyBzdG9wIGdlc3R1cmUgb24gdGFwZW5kXG4gIHRoaXMuYWRkTGlzdGVuZXIoIGN5LCAndGFwZW5kJywgKCkgPT4ge1xuICAgIHRoaXMuc3RvcCgpO1xuICB9ICk7XG5cbiAgLy8gaGlkZSBoYW5kbGUgaWYgc291cmNlIG5vZGUgaXMgcmVtb3ZlZFxuICB0aGlzLmFkZExpc3RlbmVyKCBjeSwgJ3JlbW92ZScsIGUgPT4ge1xuICAgIGlmKCBlLnRhcmdldC5zYW1lKCB0aGlzLnNvdXJjZU5vZGUgKSApe1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICB9ICk7XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBhZGRDeXRvc2NhcGVMaXN0ZW5lcnMgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lZGdlaGFuZGxlcy9jeS1saXN0ZW5lcnMuanMiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xubGV0IGRlZmF1bHRzID0ge1xuICBwcmV2aWV3OiB0cnVlLCAvLyB3aGV0aGVyIHRvIHNob3cgYWRkZWQgZWRnZXMgcHJldmlldyBiZWZvcmUgcmVsZWFzaW5nIHNlbGVjdGlvblxuICBob3ZlckRlbGF5OiAxNTAsIC8vIHRpbWUgc3BlbnQgaG92ZXJpbmcgb3ZlciBhIHRhcmdldCBub2RlIGJlZm9yZSBpdCBpcyBjb25zaWRlcmVkIHNlbGVjdGVkXG4gIGhhbmRsZU5vZGVzOiAnbm9kZScsIC8vIHNlbGVjdG9yL2ZpbHRlciBmdW5jdGlvbiBmb3Igd2hldGhlciBlZGdlcyBjYW4gYmUgbWFkZSBmcm9tIGEgZ2l2ZW4gbm9kZVxuICBzbmFwOiBmYWxzZSwgLy8gd2hlbiBlbmFibGVkLCB0aGUgZWRnZSBjYW4gYmUgZHJhd24gYnkganVzdCBtb3ZpbmcgY2xvc2UgdG8gYSB0YXJnZXQgbm9kZSAoY2FuIGJlIGNvbmZ1c2luZyBvbiBjb21wb3VuZCBncmFwaHMpXG4gIHNuYXBUaHJlc2hvbGQ6IDUwLCAvLyB0aGUgdGFyZ2V0IG5vZGUgbXVzdCBiZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhpcyBtYW55IHBpeGVscyBhd2F5IGZyb20gdGhlIGN1cnNvci9maW5nZXJcbiAgc25hcEZyZXF1ZW5jeTogMTUsIC8vIHRoZSBudW1iZXIgb2YgdGltZXMgcGVyIHNlY29uZCAoSHopIHRoYXQgc25hcCBjaGVja3MgZG9uZSAobG93ZXIgaXMgbGVzcyBleHBlbnNpdmUpXG4gIG5vRWRnZUV2ZW50c0luRHJhdzogZmFsc2UsIC8vIHNldCBldmVudHM6bm8gdG8gZWRnZXMgZHVyaW5nIGRyYXdzLCBwcmV2ZW50cyBtb3VzZW91dHMgb24gY29tcG91bmRzXG4gIGRpc2FibGVCcm93c2VyR2VzdHVyZXM6IHRydWUsIC8vIGR1cmluZyBhbiBlZGdlIGRyYXdpbmcgZ2VzdHVyZSwgZGlzYWJsZSBicm93c2VyIGdlc3R1cmVzIHN1Y2ggYXMgdHdvLWZpbmdlciB0cmFja3BhZCBzd2lwZSBhbmQgcGluY2gtdG8tem9vbVxuICBoYW5kbGVQb3NpdGlvbjogZnVuY3Rpb24oIG5vZGUgKXtcbiAgICByZXR1cm4gJ21pZGRsZSB0b3AnOyAvLyBzZXRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgaGFuZGxlIGluIHRoZSBmb3JtYXQgb2YgXCJYLUFYSVMgWS1BWElTXCIgc3VjaCBhcyBcImxlZnQgdG9wXCIsIFwibWlkZGxlIHRvcFwiXG4gIH0sXG4gIGhhbmRsZUNsYXNzZXM6IGZ1bmN0aW9uKCApIHtcbiAgICByZXR1cm4gW107XG4gIH0sXG4gIGhhbmRsZUluRHJhd01vZGU6IGZhbHNlLCAvLyB3aGV0aGVyIHRvIHNob3cgdGhlIGhhbmRsZSBpbiBkcmF3IG1vZGVcbiAgZWRnZVR5cGU6IGZ1bmN0aW9uKCBzb3VyY2VOb2RlLCB0YXJnZXROb2RlICl7XG4gICAgLy8gY2FuIHJldHVybiAnZmxhdCcgZm9yIGZsYXQgZWRnZXMgYmV0d2VlbiBub2RlcyBvciAnbm9kZScgZm9yIGludGVybWVkaWF0ZSBub2RlIGJldHdlZW4gdGhlbVxuICAgIC8vIHJldHVybmluZyBudWxsL3VuZGVmaW5lZCBtZWFucyBhbiBlZGdlIGNhbid0IGJlIGFkZGVkIGJldHdlZW4gdGhlIHR3byBub2Rlc1xuICAgIHJldHVybiAnZmxhdCc7XG4gIH0sXG4gIGxvb3BBbGxvd2VkOiBmdW5jdGlvbiggbm9kZSApe1xuICAgIC8vIGZvciB0aGUgc3BlY2lmaWVkIG5vZGUsIHJldHVybiB3aGV0aGVyIGVkZ2VzIGZyb20gaXRzZWxmIHRvIGl0c2VsZiBhcmUgYWxsb3dlZFxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcbiAgbm9kZUxvb3BPZmZzZXQ6IC01MCwgLy8gb2Zmc2V0IGZvciBlZGdlVHlwZTogJ25vZGUnIGxvb3BzXG4gIG5vZGVQYXJhbXM6IGZ1bmN0aW9uKCBzb3VyY2VOb2RlLCB0YXJnZXROb2RlICl7XG4gICAgLy8gZm9yIGVkZ2VzIGJldHdlZW4gdGhlIHNwZWNpZmllZCBzb3VyY2UgYW5kIHRhcmdldFxuICAgIC8vIHJldHVybiBlbGVtZW50IG9iamVjdCB0byBiZSBwYXNzZWQgdG8gY3kuYWRkKCkgZm9yIGludGVybWVkaWFyeSBub2RlXG4gICAgcmV0dXJuIHt9O1xuICB9LFxuICBub2RlQ2xhc3NlczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBbXTtcbiAgfSxcbiAgZWRnZVBhcmFtczogZnVuY3Rpb24oIHNvdXJjZU5vZGUsIHRhcmdldE5vZGUsIGkgKXtcbiAgICAvLyBmb3IgZWRnZXMgYmV0d2VlbiB0aGUgc3BlY2lmaWVkIHNvdXJjZSBhbmQgdGFyZ2V0XG4gICAgLy8gcmV0dXJuIGVsZW1lbnQgb2JqZWN0IHRvIGJlIHBhc3NlZCB0byBjeS5hZGQoKSBmb3IgZWRnZVxuICAgIC8vIE5COiBpIGluZGljYXRlcyBlZGdlIGluZGV4IGluIGNhc2Ugb2YgZWRnZVR5cGU6ICdub2RlJ1xuICAgIHJldHVybiB7fTtcbiAgfSxcbiAgZWRnZUNsYXNzZXM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gW107XG4gIH0sXG4gIGdob3N0RWRnZVBhcmFtczogZnVuY3Rpb24oKXtcbiAgICAvLyByZXR1cm4gZWxlbWVudCBvYmplY3QgdG8gYmUgcGFzc2VkIHRvIGN5LmFkZCgpIGZvciB0aGUgZ2hvc3QgZWRnZVxuICAgIC8vIChkZWZhdWx0IGNsYXNzZXMgYXJlIGFsd2F5cyBhZGRlZCBmb3IgeW91KVxuICAgIHJldHVybiB7fTtcbiAgfSxcbiAgZ2hvc3RFZGdlQ2xhc3NlczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBbXTtcbiAgfSxcbiAgZ2hvc3ROb2RlQ2xhc3NlczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBbXTtcbiAgfSxcbiAgc2hvdzogZnVuY3Rpb24oIHNvdXJjZU5vZGUgKXtcbiAgICAvLyBmaXJlZCB3aGVuIGhhbmRsZSBpcyBzaG93blxuICB9LFxuICBoaWRlOiBmdW5jdGlvbiggc291cmNlTm9kZSApe1xuICAgIC8vIGZpcmVkIHdoZW4gdGhlIGhhbmRsZSBpcyBoaWRkZW5cbiAgfSxcbiAgc3RhcnQ6IGZ1bmN0aW9uKCBzb3VyY2VOb2RlICl7XG4gICAgLy8gZmlyZWQgd2hlbiBlZGdlaGFuZGxlcyBpbnRlcmFjdGlvbiBzdGFydHMgKGRyYWcgb24gaGFuZGxlKVxuICB9LFxuICBjb21wbGV0ZTogZnVuY3Rpb24oIHNvdXJjZU5vZGUsIHRhcmdldE5vZGUsIGFkZGVkRWxlcyApe1xuICAgIC8vIGZpcmVkIHdoZW4gZWRnZWhhbmRsZXMgaXMgZG9uZSBhbmQgZWxlbWVudHMgYXJlIGFkZGVkXG4gIH0sXG4gIHN0b3A6IGZ1bmN0aW9uKCBzb3VyY2VOb2RlICl7XG4gICAgLy8gZmlyZWQgd2hlbiBlZGdlaGFuZGxlcyBpbnRlcmFjdGlvbiBpcyBzdG9wcGVkIChlaXRoZXIgY29tcGxldGUgd2l0aCBhZGRlZCBlZGdlcyBvciBpbmNvbXBsZXRlKVxuICB9LFxuICBjYW5jZWw6IGZ1bmN0aW9uKCBzb3VyY2VOb2RlLCBjYW5jZWxsZWRUYXJnZXRzICl7XG4gICAgLy8gZmlyZWQgd2hlbiBlZGdlaGFuZGxlcyBhcmUgY2FuY2VsbGVkIChpbmNvbXBsZXRlIGdlc3R1cmUpXG4gIH0sXG4gIGhvdmVyb3ZlcjogZnVuY3Rpb24oIHNvdXJjZU5vZGUsIHRhcmdldE5vZGUgKXtcbiAgICAvLyBmaXJlZCB3aGVuIGEgdGFyZ2V0IGlzIGhvdmVyZWRcbiAgfSxcbiAgaG92ZXJvdXQ6IGZ1bmN0aW9uKCBzb3VyY2VOb2RlLCB0YXJnZXROb2RlICl7XG4gICAgLy8gZmlyZWQgd2hlbiBhIHRhcmdldCBpc24ndCBob3ZlcmVkIGFueW1vcmVcbiAgfSxcbiAgcHJldmlld29uOiBmdW5jdGlvbiggc291cmNlTm9kZSwgdGFyZ2V0Tm9kZSwgcHJldmlld0VsZXMgKXtcbiAgICAvLyBmaXJlZCB3aGVuIHByZXZpZXcgaXMgc2hvd25cbiAgfSxcbiAgcHJldmlld29mZjogZnVuY3Rpb24oIHNvdXJjZU5vZGUsIHRhcmdldE5vZGUsIHByZXZpZXdFbGVzICl7XG4gICAgLy8gZmlyZWQgd2hlbiBwcmV2aWV3IGlzIGhpZGRlblxuICB9LFxuICBkcmF3b246IGZ1bmN0aW9uKCl7XG4gICAgLy8gZmlyZWQgd2hlbiBkcmF3IG1vZGUgZW5hYmxlZFxuICB9LFxuICBkcmF3b2ZmOiBmdW5jdGlvbigpe1xuICAgIC8vIGZpcmVkIHdoZW4gZHJhdyBtb2RlIGRpc2FibGVkXG4gIH1cbn07XG4vKiBlc2xpbnQtZW5hYmxlICovXG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZWRnZWhhbmRsZXMvZGVmYXVsdHMuanMiLCJmdW5jdGlvbiB0b2dnbGVEcmF3TW9kZSggYm9vbCApe1xuICBsZXQgeyBjeSwgb3B0aW9ucyB9ID0gdGhpcztcblxuICB0aGlzLmRyYXdNb2RlID0gYm9vbCAhPSBudWxsID8gYm9vbCA6ICF0aGlzLmRyYXdNb2RlO1xuXG4gIGlmKCB0aGlzLmRyYXdNb2RlICl7XG4gICAgdGhpcy5wcmV2VW5ncmFiaWZ5U3RhdGUgPSBjeS5hdXRvdW5ncmFiaWZ5KCk7XG5cbiAgICBjeS5hdXRvdW5ncmFiaWZ5KCB0cnVlICk7XG5cbiAgICBpZiggIW9wdGlvbnMuaGFuZGxlSW5EcmF3TW9kZSAmJiB0aGlzLmhhbmRsZVNob3duKCkgKXtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIHRoaXMuZW1pdCgnZHJhd29uJyk7XG4gIH0gZWxzZSB7XG4gICAgY3kuYXV0b3VuZ3JhYmlmeSggdGhpcy5wcmV2VW5ncmFiaWZ5U3RhdGUgKTtcblxuICAgIHRoaXMuZW1pdCgnZHJhd29mZicpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIGVuYWJsZURyYXdNb2RlKCl7XG4gIHJldHVybiB0aGlzLnRvZ2dsZURyYXdNb2RlKCB0cnVlICk7XG59XG5cbmZ1bmN0aW9uIGRpc2FibGVEcmF3TW9kZSgpe1xuICByZXR1cm4gdGhpcy50b2dnbGVEcmF3TW9kZSggZmFsc2UgKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IHRvZ2dsZURyYXdNb2RlLCBlbmFibGVEcmF3TW9kZSwgZGlzYWJsZURyYXdNb2RlIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZWRnZWhhbmRsZXMvZHJhdy1tb2RlLmpzIiwiY29uc3QgYXNzaWduID0gcmVxdWlyZSgnLi4vYXNzaWduJyk7XG5jb25zdCBpc1N0cmluZyA9IHggPT4gdHlwZW9mIHggPT09IHR5cGVvZiAnJztcbmNvbnN0IGlzQXJyYXkgPSB4ID0+IHR5cGVvZiB4ID09PSB0eXBlb2YgW10gJiYgeC5sZW5ndGggIT0gbnVsbDtcblxuZnVuY3Rpb24gZ2V0RWxlSnNvbiggb3ZlcnJpZGVzLCBwYXJhbXMsIGFkZGVkQ2xhc3NlcyApe1xuICBsZXQganNvbiA9IHt9O1xuXG4gIC8vIGJhc2ljIHZhbHVlc1xuICBhc3NpZ24oIGpzb24sIHBhcmFtcywgb3ZlcnJpZGVzICk7XG5cbiAgLy8gbWFrZSBzdXJlIHBhcmFtcyBjYW4gc3BlY2lmeSBkYXRhIGJ1dCB0aGF0IG92ZXJyaWRlcyB0YWtlIHByZWNlZGVuY2VcbiAgYXNzaWduKCBqc29uLmRhdGEsIHBhcmFtcy5kYXRhLCBvdmVycmlkZXMuZGF0YSApO1xuXG4gIGlmKCBpc1N0cmluZyhwYXJhbXMuY2xhc3NlcykgKXtcbiAgICBqc29uLmNsYXNzZXMgPSBwYXJhbXMuY2xhc3NlcyArICcgJyArIGFkZGVkQ2xhc3NlcztcbiAgfSBlbHNlIGlmKCBpc0FycmF5KHBhcmFtcy5jbGFzc2VzKSApe1xuICAgIGpzb24uY2xhc3NlcyA9IHBhcmFtcy5jbGFzc2VzLmpvaW4oJyAnKSArICcgJyArIGFkZGVkQ2xhc3NlcztcbiAgfSBlbHNlIHtcbiAgICBqc29uLmNsYXNzZXMgPSBhZGRlZENsYXNzZXM7XG4gIH1cblxuICByZXR1cm4ganNvbjtcbn1cblxuZnVuY3Rpb24gbWFrZUVkZ2VzKCBwcmV2aWV3ID0gZmFsc2UgKSB7XG4gIGxldCB7IGN5LCBvcHRpb25zLCBwcmVzdW1wdGl2ZVRhcmdldHMsIHByZXZpZXdFbGVzLCBhY3RpdmUgfSA9IHRoaXM7XG5cbiAgbGV0IHNvdXJjZSA9IHRoaXMuc291cmNlTm9kZTtcbiAgbGV0IHRhcmdldCA9IHRoaXMudGFyZ2V0Tm9kZTtcbiAgbGV0IGNsYXNzZXMgPSBwcmV2aWV3ID8gWydlaC1wcmV2aWV3J10gOiBbXTtcbiAgbGV0IGFkZGVkID0gY3kuY29sbGVjdGlvbigpO1xuICBsZXQgZWRnZVR5cGUgPSBvcHRpb25zLmVkZ2VUeXBlKCBzb3VyY2UsIHRhcmdldCApO1xuXG4gIC8vIGNhbid0IG1ha2UgZWRnZXMgb3V0c2lkZSBvZiByZWd1bGFyIGdlc3R1cmUgbGlmZWN5Y2xlXG4gIGlmKCAhYWN0aXZlICl7IHJldHVybjsgfVxuXG4gIC8vIG11c3QgaGF2ZSBhIG5vbi1lbXB0eSBlZGdlIHR5cGVcbiAgaWYoICFlZGdlVHlwZSApeyByZXR1cm47IH1cblxuICAvLyBjYW4ndCBtYWtlIHByZXZpZXcgaWYgZGlzYWJsZWRcbiAgaWYoIHByZXZpZXcgJiYgIW9wdGlvbnMucHJldmlldyApeyByZXR1cm47IH1cblxuICAvLyBkZXRlY3QgY2FuY2VsXG4gIGlmKCAhdGFyZ2V0IHx8IHRhcmdldC5zaXplKCkgPT09IDAgKXtcbiAgICBwcmV2aWV3RWxlcy5yZW1vdmUoKTtcblxuICAgIHRoaXMuZW1pdCggJ2NhbmNlbCcsIHRoaXMubXAoKSwgc291cmNlLCBwcmVzdW1wdGl2ZVRhcmdldHMgKTtcblxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIGp1c3QgcmVtb3ZlIHByZXZpZXcgY2xhc3MgaWYgd2UgYWxyZWFkeSBoYXZlIHRoZSBlZGdlc1xuICBpZiggIXByZXZpZXcgJiYgb3B0aW9ucy5wcmV2aWV3ICkge1xuICAgIHByZXZpZXdFbGVzLnJlbW92ZUNsYXNzKCdlaC1wcmV2aWV3Jykuc3R5bGUoJ2V2ZW50cycsICcnKTtcblxuICAgIHRoaXMuZW1pdCggJ2NvbXBsZXRlJywgdGhpcy5tcCgpLCBzb3VyY2UsIHRhcmdldCwgcHJldmlld0VsZXMgKTtcblxuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBwMSA9IHNvdXJjZS5wb3NpdGlvbigpO1xuICBsZXQgcDIgPSB0YXJnZXQucG9zaXRpb24oKTtcblxuICBsZXQgcDtcbiAgaWYoIHNvdXJjZS5zYW1lKCB0YXJnZXQgKSApIHtcbiAgICBwID0ge1xuICAgICAgeDogcDEueCArIG9wdGlvbnMubm9kZUxvb3BPZmZzZXQsXG4gICAgICB5OiBwMS55ICsgb3B0aW9ucy5ub2RlTG9vcE9mZnNldFxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgcCA9IHtcbiAgICAgIHg6ICggcDEueCArIHAyLnggKSAvIDIsXG4gICAgICB5OiAoIHAxLnkgKyBwMi55ICkgLyAyXG4gICAgfTtcbiAgfVxuXG4gIGlmKCBlZGdlVHlwZSA9PT0gJ25vZGUnICl7XG4gICAgbGV0IGludGVyTm9kZSA9IGN5LmFkZChcbiAgICAgIGdldEVsZUpzb24oXG4gICAgICAgIHtcbiAgICAgICAgICBncm91cDogJ25vZGVzJyxcbiAgICAgICAgICBwb3NpdGlvbjogcFxuICAgICAgICB9LFxuICAgICAgICBvcHRpb25zLm5vZGVQYXJhbXMoIHNvdXJjZSwgdGFyZ2V0ICksXG4gICAgICAgIGNsYXNzZXMuY29uY2F0KG9wdGlvbnMubm9kZUNsYXNzZXMoKSlcbiAgICAgIClcbiAgICApO1xuXG4gICAgbGV0IHNvdXJjZTJpbnRlciA9IGN5LmFkZChcbiAgICAgIGdldEVsZUpzb24oXG4gICAgICAgIHtcbiAgICAgICAgICBncm91cDogJ2VkZ2VzJyxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBzb3VyY2U6IHNvdXJjZS5pZCgpLFxuICAgICAgICAgICAgdGFyZ2V0OiBpbnRlck5vZGUuaWQoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW9ucy5lZGdlUGFyYW1zKCBzb3VyY2UsIHRhcmdldCwgMCApLFxuICAgICAgICBjbGFzc2VzLmNvbmNhdChvcHRpb25zLmVkZ2VDbGFzc2VzKCkpXG4gICAgICApXG4gICAgKTtcblxuICAgIGxldCBpbnRlcjJ0YXJnZXQgPSBjeS5hZGQoXG4gICAgICBnZXRFbGVKc29uKFxuICAgICAgICB7XG4gICAgICAgICAgZ3JvdXA6ICdlZGdlcycsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgc291cmNlOiBpbnRlck5vZGUuaWQoKSxcbiAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0LmlkKClcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9wdGlvbnMuZWRnZVBhcmFtcyggc291cmNlLCB0YXJnZXQsIDEgKSxcbiAgICAgICAgY2xhc3Nlcy5jb25jYXQob3B0aW9ucy5lZGdlQ2xhc3NlcygpKVxuICAgICAgKVxuICAgICk7XG5cbiAgICBhZGRlZCA9IGFkZGVkLm1lcmdlKCBpbnRlck5vZGUgKS5tZXJnZSggc291cmNlMmludGVyICkubWVyZ2UoIGludGVyMnRhcmdldCApO1xuICB9IGVsc2UgeyAvLyBmbGF0XG4gICAgbGV0IHNvdXJjZTJ0YXJnZXQgPSBjeS5hZGQoXG4gICAgICBnZXRFbGVKc29uKFxuICAgICAgICB7XG4gICAgICAgICAgZ3JvdXA6ICdlZGdlcycsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgc291cmNlOiBzb3VyY2UuaWQoKSxcbiAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0LmlkKClcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9wdGlvbnMuZWRnZVBhcmFtcyggc291cmNlLCB0YXJnZXQsIDAgKSxcbiAgICAgICAgY2xhc3Nlcy5jb25jYXQob3B0aW9ucy5lZGdlQ2xhc3NlcygpKVxuICAgICAgKVxuICAgICk7XG5cbiAgICBhZGRlZCA9IGFkZGVkLm1lcmdlKCBzb3VyY2UydGFyZ2V0ICk7XG4gIH1cblxuICBpZiggcHJldmlldyApIHtcbiAgICB0aGlzLnByZXZpZXdFbGVzID0gYWRkZWQ7XG5cbiAgICBhZGRlZC5zdHlsZSgnZXZlbnRzJywgJ25vJyk7XG4gIH0gZWxzZSB7XG4gICAgYWRkZWQuc3R5bGUoJ2V2ZW50cycsICcnKTtcblxuICAgIHRoaXMuZW1pdCggJ2NvbXBsZXRlJywgdGhpcy5tcCgpLCBzb3VyY2UsIHRhcmdldCwgYWRkZWQgKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBtYWtlUHJldmlldygpIHtcbiAgdGhpcy5tYWtlRWRnZXMoIHRydWUgKTtcblxuICByZXR1cm4gdGhpcztcbn1cblxuZnVuY3Rpb24gcHJldmlld1Nob3duKCl7XG4gIHJldHVybiB0aGlzLnByZXZpZXdFbGVzLm5vbmVtcHR5KCkgJiYgdGhpcy5wcmV2aWV3RWxlcy5pbnNpZGUoKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlUHJldmlldygpIHtcbiAgaWYoIHRoaXMucHJldmlld1Nob3duKCkgKXtcbiAgICB0aGlzLnByZXZpZXdFbGVzLnJlbW92ZSgpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVNob3duKCl7XG4gIHJldHVybiB0aGlzLmhhbmRsZU5vZGUubm9uZW1wdHkoKSAmJiB0aGlzLmhhbmRsZU5vZGUuaW5zaWRlKCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUhhbmRsZSgpe1xuICBpZiggdGhpcy5oYW5kbGVTaG93bigpICl7XG4gICAgdGhpcy5oYW5kbGVOb2RlLnJlbW92ZSgpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIHNldEhhbmRsZUZvciggbm9kZSApe1xuICBsZXQgeyBvcHRpb25zLCBjeSB9ID0gdGhpcztcblxuICBsZXQgaGFuZGxlUG9zaXRpb24gPSB0eXBlb2Ygb3B0aW9ucy5oYW5kbGVQb3NpdGlvbiA9PT0gdHlwZW9mICcnID8gKCkgPT4gb3B0aW9ucy5oYW5kbGVQb3NpdGlvbiA6IG9wdGlvbnMuaGFuZGxlUG9zaXRpb247XG5cbiAgbGV0IHAgPSBub2RlLnBvc2l0aW9uKCk7XG4gIGxldCBoID0gbm9kZS5vdXRlckhlaWdodCgpO1xuICBsZXQgdyA9IG5vZGUub3V0ZXJXaWR0aCgpO1xuXG4gIC8vIHN0b3JlIGhvdyBtdWNoIHdlIHNob3VsZCBtb3ZlIHRoZSBoYW5kbGUgZnJvbSBvcmlnaW4ocC54LCBwLnkpXG4gIGxldCBtb3ZlWCA9IDA7XG4gIGxldCBtb3ZlWSA9IDA7XG5cbiAgLy8gZ3JhYiBheGVzXG4gIGxldCBheGVzID0gaGFuZGxlUG9zaXRpb24oIG5vZGUgKS50b0xvd2VyQ2FzZSgpLnNwbGl0KC9cXHMrLyk7XG4gIGxldCBheGlzWCA9IGF4ZXNbMF07XG4gIGxldCBheGlzWSA9IGF4ZXNbMV07XG5cbiAgLy8gYmFzZWQgb24gaGFuZGxlUG9zaXRpb24gbW92ZSBsZWZ0L3JpZ2h0L3RvcC9ib3R0b20uIE1pZGRsZS9taWRkbGUgd2lsbCBqdXN0IGJlIG5vcm1hbFxuICBpZiggYXhpc1ggPT09ICdsZWZ0JyApe1xuICAgIG1vdmVYID0gLSh3IC8gMik7XG4gIH0gZWxzZSBpZiggYXhpc1ggPT09ICdyaWdodCcgKXtcbiAgICBtb3ZlWCA9IHcgLyAyO1xuICB9IGlmKCBheGlzWSA9PT0gJ3RvcCcgKXtcbiAgICBtb3ZlWSA9IC0oaCAvIDIpO1xuICB9IGVsc2UgaWYoIGF4aXNZID09PSAnYm90dG9tJyApe1xuICAgIG1vdmVZID0gaCAvIDI7XG4gIH1cblxuICAvLyBzZXQgaGFuZGxlIHggYW5kIHkgYmFzZWQgb24gYWRqdXN0ZWQgcG9zaXRpb25zXG4gIGxldCBoeCA9IHRoaXMuaHggPSBwLnggKyBtb3ZlWDtcbiAgbGV0IGh5ID0gdGhpcy5oeSA9IHAueSArIG1vdmVZO1xuICBsZXQgcG9zID0geyB4OiBoeCwgeTogaHkgfTtcblxuICBpZiggdGhpcy5oYW5kbGVTaG93bigpICl7XG4gICAgdGhpcy5oYW5kbGVOb2RlLnBvc2l0aW9uKCBwb3MgKTtcbiAgfSBlbHNlIHtcbiAgICBjeS5iYXRjaCggKCkgPT4ge1xuICAgICAgdGhpcy5oYW5kbGVOb2RlID0gY3kuYWRkKHtcbiAgICAgICAgY2xhc3NlczogWydlaC1oYW5kbGUnXS5jb25jYXQob3B0aW9ucy5oYW5kbGVDbGFzc2VzKCkpLFxuICAgICAgICBwb3NpdGlvbjogcG9zLFxuICAgICAgICBncmFiYmFibGU6IGZhbHNlLFxuICAgICAgICBzZWxlY3RhYmxlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmhhbmRsZU5vZGUpO1xuICAgICAgXG4gICAgICB0aGlzLmhhbmRsZU5vZGUuc3R5bGUoJ3otaW5kZXgnLCA5MDA3MTk5MjU0NzQwOTkxKTtcbiAgICB9ICk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn1cblxuZnVuY3Rpb24gdXBkYXRlRWRnZSgpIHtcbiAgbGV0IHsgc291cmNlTm9kZSwgZ2hvc3ROb2RlLCBjeSwgbXgsIG15LCBvcHRpb25zIH0gPSB0aGlzO1xuICBsZXQgeCA9IG14O1xuICBsZXQgeSA9IG15O1xuICBsZXQgZ2hvc3RFZGdlLCBnaG9zdEVsZXM7XG5cbiAgLy8gY2FuJ3QgZHJhdyBhIGxpbmUgd2l0aG91dCBoYXZpbmcgdGhlIHN0YXJ0aW5nIG5vZGVcbiAgaWYoICFzb3VyY2VOb2RlICl7IHJldHVybjsgfVxuXG4gIGlmKCAhZ2hvc3ROb2RlIHx8IGdob3N0Tm9kZS5sZW5ndGggPT09IDAgfHwgZ2hvc3ROb2RlLnJlbW92ZWQoKSApIHtcbiAgICBnaG9zdEVsZXMgPSB0aGlzLmdob3N0RWxlcyA9IGN5LmNvbGxlY3Rpb24oKTtcblxuICAgIGN5LmJhdGNoKCAoKSA9PiB7XG4gICAgICBnaG9zdE5vZGUgPSB0aGlzLmdob3N0Tm9kZSA9IGN5LmFkZCgge1xuICAgICAgICBncm91cDogJ25vZGVzJyxcbiAgICAgICAgY2xhc3NlczogWydlaC1naG9zdCcsICdlaC1naG9zdC1ub2RlJ10uY29uY2F0KG9wdGlvbnMuZ2hvc3ROb2RlQ2xhc3NlcygpKSxcbiAgICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgICB4OiAwLFxuICAgICAgICAgIHk6IDBcbiAgICAgICAgfVxuICAgICAgfSApO1xuXG4gICAgICBnaG9zdE5vZGUuc3R5bGUoe1xuICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6ICdibHVlJyxcbiAgICAgICAgJ3dpZHRoJzogMC4wMDAxLFxuICAgICAgICAnaGVpZ2h0JzogMC4wMDAxLFxuICAgICAgICAnb3BhY2l0eSc6IDAsXG4gICAgICAgICdldmVudHMnOiAnbm8nXG4gICAgICB9KTtcblxuICAgICAgbGV0IGdob3N0RWRnZVBhcmFtcyA9IG9wdGlvbnMuZ2hvc3RFZGdlUGFyYW1zKCk7XG5cbiAgICAgIGdob3N0RWRnZSA9IGN5LmFkZCggYXNzaWduKHt9LCBnaG9zdEVkZ2VQYXJhbXMsIHtcbiAgICAgICAgZ3JvdXA6ICdlZGdlcycsXG4gICAgICAgIGRhdGE6IGFzc2lnbih7fSwgZ2hvc3RFZGdlUGFyYW1zLmRhdGEsIHtcbiAgICAgICAgICBzb3VyY2U6IHNvdXJjZU5vZGUuaWQoKSxcbiAgICAgICAgICB0YXJnZXQ6IGdob3N0Tm9kZS5pZCgpXG4gICAgICAgIH0pLFxuICAgICAgICBjbGFzc2VzOiBbJ2VoLWdob3N0JywgJ2VoLWdob3N0LWVkZ2UnXS5jb25jYXQob3B0aW9ucy5naG9zdEVkZ2VDbGFzc2VzKCkpXG4gICAgICB9KSApO1xuXG4gICAgICBnaG9zdEVkZ2Uuc3R5bGUoe1xuICAgICAgICAnZXZlbnRzJzogJ25vJ1xuICAgICAgfSk7XG4gICAgfSApO1xuXG4gICAgZ2hvc3RFbGVzLm1lcmdlKCBnaG9zdE5vZGUgKS5tZXJnZSggZ2hvc3RFZGdlICk7XG4gIH1cblxuICBnaG9zdE5vZGUucG9zaXRpb24oeyB4LCB5IH0pO1xuXG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWFrZUVkZ2VzLCBtYWtlUHJldmlldywgcmVtb3ZlUHJldmlldywgcHJldmlld1Nob3duLFxuICB1cGRhdGVFZGdlLFxuICBoYW5kbGVTaG93biwgc2V0SGFuZGxlRm9yLCByZW1vdmVIYW5kbGVcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZWRnZWhhbmRsZXMvZHJhd2luZy5qcyIsImZ1bmN0aW9uIGRpc2FibGVFZGdlRXZlbnRzKCl7XG4gIGlmKCB0aGlzLm9wdGlvbnMubm9FZGdlRXZlbnRzSW5EcmF3ICl7XG4gICAgdGhpcy5jeS5lZGdlcygpLnN0eWxlKCdldmVudHMnLCAnbm8nKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBlbmFibGVFZGdlRXZlbnRzKCl7XG4gIGlmKCB0aGlzLm9wdGlvbnMubm9FZGdlRXZlbnRzSW5EcmF3ICl7XG4gICAgdGhpcy5jeS5lZGdlcygpLnN0eWxlKCdldmVudHMnLCAnJyk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IGRpc2FibGVFZGdlRXZlbnRzLCBlbmFibGVFZGdlRXZlbnRzIH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VkZ2VoYW5kbGVzL2VkZ2UtZXZlbnRzLXRvZ2dsZS5qcyIsImZ1bmN0aW9uIGVuYWJsZSgpe1xuICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuXG4gIHRoaXMuZW1pdCgnZW5hYmxlJyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIGRpc2FibGUoKXtcbiAgdGhpcy5lbmFibGVkID0gZmFsc2U7XG5cbiAgdGhpcy5lbWl0KCdkaXNhYmxlJyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBlbmFibGUsIGRpc2FibGUgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lZGdlaGFuZGxlcy9lbmFibGluZy5qcyIsImNvbnN0IG1lbW9pemUgPSByZXF1aXJlKCdsb2Rhc2gubWVtb2l6ZScpO1xuY29uc3Qgc3FydDIgPSBNYXRoLnNxcnQoMik7XG5cbmZ1bmN0aW9uIGNhblN0YXJ0T24oIG5vZGUgKXtcbiAgY29uc3QgeyBvcHRpb25zLCBwcmV2aWV3RWxlcywgZ2hvc3RFbGVzLCBoYW5kbGVOb2RlIH0gPSB0aGlzO1xuICBjb25zdCBpc1ByZXZpZXcgPSBlbCA9PiBwcmV2aWV3RWxlcy5hbnlTYW1lKGVsKTtcbiAgY29uc3QgaXNHaG9zdCA9IGVsID0+IGdob3N0RWxlcy5hbnlTYW1lKGVsKTtcbiAgY29uc3QgdXNlckZpbHRlciA9IGVsID0+IGVsLmZpbHRlciggb3B0aW9ucy5oYW5kbGVOb2RlcyApLmxlbmd0aCA+IDA7XG4gIGNvbnN0IGlzSGFuZGxlID0gZWwgPT4gaGFuZGxlTm9kZS5zYW1lKGVsKTtcbiAgY29uc3QgaXNUZW1wID0gZWwgPT4gaXNQcmV2aWV3KGVsKSB8fCBpc0hhbmRsZShlbCkgfHwgaXNHaG9zdChlbCk7XG5cbiAgY29uc3QgeyBlbmFibGVkLCBhY3RpdmUsIGdyYWJiaW5nTm9kZSB9ID0gdGhpcztcblxuICByZXR1cm4gKFxuICAgIGVuYWJsZWQgJiYgIWFjdGl2ZSAmJiAhZ3JhYmJpbmdOb2RlXG4gICAgJiYgKCBub2RlID09IG51bGwgfHwgKCFpc1RlbXAobm9kZSkgJiYgdXNlckZpbHRlcihub2RlKSkgKVxuICApO1xufVxuXG5mdW5jdGlvbiBjYW5TdGFydERyYXdNb2RlT24oIG5vZGUgKXtcbiAgcmV0dXJuIHRoaXMuY2FuU3RhcnRPbiggbm9kZSApICYmIHRoaXMuZHJhd01vZGU7XG59XG5cbmZ1bmN0aW9uIGNhblN0YXJ0Tm9uRHJhd01vZGVPbiggbm9kZSApe1xuICByZXR1cm4gdGhpcy5jYW5TdGFydE9uKCBub2RlICkgJiYgIXRoaXMuZHJhd01vZGU7XG59XG5cbmZ1bmN0aW9uIHNob3coIG5vZGUgKXtcbiAgbGV0IHsgb3B0aW9ucywgZHJhd01vZGUgfSA9IHRoaXM7XG5cbiAgaWYoICF0aGlzLmNhblN0YXJ0T24obm9kZSkgfHwgKCBkcmF3TW9kZSAmJiAhb3B0aW9ucy5oYW5kbGVJbkRyYXdNb2RlICkgKXsgcmV0dXJuOyB9XG5cbiAgdGhpcy5zb3VyY2VOb2RlID0gbm9kZTtcblxuICB0aGlzLnNldEhhbmRsZUZvciggbm9kZSApO1xuXG4gIHRoaXMuZW1pdCggJ3Nob3cnLCB0aGlzLmhwKCksIHRoaXMuc291cmNlTm9kZSApO1xuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBoaWRlKCl7XG4gIHRoaXMucmVtb3ZlSGFuZGxlKCk7XG5cbiAgdGhpcy5lbWl0KCAnaGlkZScsIHRoaXMuaHAoKSwgdGhpcy5zb3VyY2VOb2RlICk7XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0KCBub2RlICl7XG4gIGlmKCAhdGhpcy5jYW5TdGFydE9uKG5vZGUpICl7IHJldHVybjsgfVxuXG4gIHRoaXMuYWN0aXZlID0gdHJ1ZTtcblxuICB0aGlzLnNvdXJjZU5vZGUgPSBub2RlO1xuICB0aGlzLnNvdXJjZU5vZGUuYWRkQ2xhc3MoJ2VoLXNvdXJjZScpO1xuXG4gIHRoaXMuZGlzYWJsZUdlc3R1cmVzKCk7XG4gIHRoaXMuZGlzYWJsZUVkZ2VFdmVudHMoKTtcblxuICB0aGlzLmVtaXQoICdzdGFydCcsIHRoaXMuaHAoKSwgbm9kZSApO1xufVxuXG5mdW5jdGlvbiB1cGRhdGUoIHBvcyApe1xuICBpZiggIXRoaXMuYWN0aXZlICl7IHJldHVybjsgfVxuXG4gIGxldCBwID0gcG9zO1xuXG4gIHRoaXMubXggPSBwLng7XG4gIHRoaXMubXkgPSBwLnk7XG5cbiAgdGhpcy51cGRhdGVFZGdlKCk7XG4gIHRoaXMudGhyb3R0bGVkU25hcCgpO1xuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBzbmFwKCl7XG4gIGlmKCAhdGhpcy5hY3RpdmUgfHwgIXRoaXMub3B0aW9ucy5zbmFwICl7IHJldHVybiBmYWxzZTsgfVxuXG4gIGxldCBjeSA9IHRoaXMuY3k7XG4gIGxldCB0Z3QgPSB0aGlzLnRhcmdldE5vZGU7XG4gIGxldCB0aHJlc2hvbGQgPSB0aGlzLm9wdGlvbnMuc25hcFRocmVzaG9sZDtcbiAgbGV0IG1vdXNlUG9zID0gdGhpcy5tcCgpO1xuICBsZXQgeyBoYW5kbGVOb2RlLCBwcmV2aWV3RWxlcywgZ2hvc3ROb2RlIH0gPSB0aGlzO1xuXG4gIGxldCByYWRpdXMgPSBuID0+IHNxcnQyICogTWF0aC5tYXgobi5vdXRlcldpZHRoKCksIG4ub3V0ZXJIZWlnaHQoKSkvMjsgLy8gd29yc3QtY2FzZSBlbmNsb3N1cmUgb2YgYmIgYnkgY2lyY2xlXG4gIGxldCBzcURpc3QgPSAoeDEsIHkxLCB4MiwgeTIpID0+IHsgbGV0IGR4ID0geDIgLSB4MTsgbGV0IGR5ID0geTIgLSB5MTsgcmV0dXJuIGR4KmR4ICsgZHkqZHk7IH07XG4gIGxldCBzcURpc3RCeVB0ID0gKHAxLCBwMikgPT4gc3FEaXN0KHAxLngsIHAxLnksIHAyLngsIHAyLnkpO1xuICBsZXQgbm9kZVNxRGlzdCA9IG4gPT4gc3FEaXN0QnlQdChuLnBvc2l0aW9uKCksIG1vdXNlUG9zKTtcblxuICBsZXQgc3FUaHJlc2hvbGQgPSBuID0+IHsgbGV0IHIgPSByYWRpdXMobik7IGxldCB0ID0gciArIHRocmVzaG9sZDsgcmV0dXJuIHQgKiB0OyB9O1xuICBsZXQgaXNXaXRoaW5UaGVzaG9sZCA9IG4gPT4gbm9kZVNxRGlzdChuKSA8PSBzcVRocmVzaG9sZChuKTtcblxuICBsZXQgYmJTcURpc3QgPSBuID0+IHtcbiAgICBsZXQgcCA9IG4ucG9zaXRpb24oKTtcbiAgICBsZXQgaGFsZlcgPSBuLm91dGVyV2lkdGgoKSAvIDI7XG4gICAgbGV0IGhhbGZIID0gbi5vdXRlckhlaWdodCgpIC8gMjtcblxuICAgIC8vIG5vZGUgYW5kIG1vdXNlIHBvc2l0aW9ucywgbGluZSBpcyBmb3JtZWQgZnJvbSBub2RlIHRvIG1vdXNlXG4gICAgbGV0IG54ID0gcC54O1xuICAgIGxldCBueSA9IHAueTtcbiAgICBsZXQgbXggPSBtb3VzZVBvcy54O1xuICAgIGxldCBteSA9IG1vdXNlUG9zLnk7XG5cbiAgICAvLyBib3VuZGluZyBib3hcbiAgICBsZXQgeDEgPSBueCAtIGhhbGZXO1xuICAgIGxldCB4MiA9IG54ICsgaGFsZlc7XG4gICAgbGV0IHkxID0gbnkgLSBoYWxmSDtcbiAgICBsZXQgeTIgPSBueSArIGhhbGZIO1xuXG4gICAgbGV0IGluc2lkZVhCb3VuZHMgPSB4MSA8PSBteCAmJiBteCA8PSB4MjtcbiAgICBsZXQgaW5zaWRlWUJvdW5kcyA9IHkxIDw9IG15ICYmIG15IDw9IHkyO1xuXG4gICAgaWYoIGluc2lkZVhCb3VuZHMgJiYgaW5zaWRlWUJvdW5kcyApeyAvLyBpbnNpZGUgYm94XG4gICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2UgaWYoIGluc2lkZVhCb3VuZHMgKXsgLy8gcGVycGVuZGljdWxhciBkaXN0YW5jZSB0byBib3gsIHRvcCBvciBib3R0b21cbiAgICAgIGxldCBkeTEgPSBteSAtIHkxO1xuICAgICAgbGV0IGR5MiA9IG15IC0geTI7XG5cbiAgICAgIHJldHVybiBNYXRoLm1pbihkeTEgKiBkeTEsIGR5MiAqIGR5Mik7XG4gICAgfSBlbHNlIGlmKCBpbnNpZGVZQm91bmRzICl7IC8vIHBlcnBlbmRpY3VsYXIgZGlzdGFuY2UgdG8gYm94LCBsZWZ0IG9yIHJpZ2h0XG4gICAgICBsZXQgZHgxID0gbXggLSB4MTtcbiAgICAgIGxldCBkeDIgPSBteCAtIHgyO1xuXG4gICAgICByZXR1cm4gTWF0aC5taW4oZHgxICogZHgxLCBkeDIgKiBkeDIpO1xuICAgIH0gZWxzZSBpZiggbXggPCB4MSAmJiBteSA8IHkxICl7IC8vIHRvcC1sZWZ0IGNvcm5lciBkaXN0YW5jZVxuICAgICAgcmV0dXJuIHNxRGlzdChteCwgbXksIHgxLCB5MSk7XG4gICAgfSBlbHNlIGlmKCBteCA+IHgyICYmIG15IDwgeTEgKXsgLy8gdG9wLXJpZ2h0IGNvcm5lciBkaXN0YW5jZVxuICAgICAgcmV0dXJuIHNxRGlzdChteCwgbXksIHgyLCB5MSk7XG4gICAgfSBlbHNlIGlmKCBteCA8IHgxICYmIG15ID4geTIgKXsgLy8gYm90dG9tLWxlZnQgY29ybmVyIGRpc3RhbmNlXG4gICAgICByZXR1cm4gc3FEaXN0KG14LCBteSwgeDEsIHkyKTtcbiAgICB9IGVsc2UgeyAvLyBib3R0b20tcmlnaHQgY29ybmVyIGRpc3RhbmNlXG4gICAgICByZXR1cm4gc3FEaXN0KG14LCBteSwgeDIsIHkyKTtcbiAgICB9XG4gIH07XG5cbiAgbGV0IGNtcEJiU3FEaXN0ID0gKG4xLCBuMikgPT4gYmJTcURpc3QobjEpIC0gYmJTcURpc3QobjIpO1xuXG4gIGxldCBjbXAgPSBjbXBCYlNxRGlzdDtcblxuICBsZXQgYWxsb3dIb3ZlckRlbGF5ID0gZmFsc2U7XG5cbiAgbGV0IG1vdXNlSXNJbnNpZGUgPSBuID0+IHtcbiAgICBsZXQgbXAgPSBtb3VzZVBvcztcbiAgICBsZXQgdyA9IG4ub3V0ZXJXaWR0aCgpO1xuICAgIGxldCBoYWxmVyA9IHcvMjtcbiAgICBsZXQgaCA9IG4ub3V0ZXJIZWlnaHQoKTtcbiAgICBsZXQgaGFsZkggPSBoLzI7XG4gICAgbGV0IHAgPSBuLnBvc2l0aW9uKCk7XG4gICAgbGV0IHgxID0gcC54IC0gaGFsZlc7XG4gICAgbGV0IHgyID0gcC54ICsgaGFsZlc7XG4gICAgbGV0IHkxID0gcC55IC0gaGFsZkg7XG4gICAgbGV0IHkyID0gcC55ICsgaGFsZkg7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICAgeDEgPD0gbXAueCAmJiBtcC54IDw9IHgyXG4gICAgICAmJiB5MSA8PSBtcC55ICYmIG1wLnkgPD0geTJcbiAgICApO1xuICB9O1xuXG4gIGxldCBpc0VoRWxlID0gbiA9PiBuLnNhbWUoaGFuZGxlTm9kZSkgfHwgbi5zYW1lKHByZXZpZXdFbGVzKSB8fCBuLnNhbWUoZ2hvc3ROb2RlKTtcblxuICBsZXQgbm9kZXNCeURpc3QgPSBjeS5ub2RlcyhuID0+ICFpc0VoRWxlKG4pICYmIGlzV2l0aGluVGhlc2hvbGQobikpLnNvcnQoY21wKTtcbiAgbGV0IHNuYXBwZWQgPSBmYWxzZTtcblxuICBpZiggdGd0Lm5vbmVtcHR5KCkgJiYgIWlzV2l0aGluVGhlc2hvbGQodGd0KSApe1xuICAgIHRoaXMudW5wcmV2aWV3KHRndCk7XG4gIH1cblxuICBmb3IobGV0IGkgPSAwOyBpIDwgbm9kZXNCeURpc3QubGVuZ3RoOyBpKyspe1xuICAgIGxldCBuID0gbm9kZXNCeURpc3RbaV07XG5cbiAgICAvLyBza2lwIGEgcGFyZW50IG5vZGUgd2hlbiB0aGUgbW91c2UgaXMgaW5zaWRlIGl0XG4gICAgaWYoIG4uaXNQYXJlbnQoKSAmJiBtb3VzZUlzSW5zaWRlKG4pICl7IGNvbnRpbnVlOyB9XG5cbiAgICAvLyBza2lwIGEgY2hpbGQgbm9kZSB3aGVuIHRoZSBtb3VzZSBpcyBub3QgaW5zaWRlIHRoZSBwYXJlbnRcbiAgICBpZiggbi5pc0NoaWxkKCkgJiYgIW1vdXNlSXNJbnNpZGUobi5wYXJlbnQoKSkgKXsgY29udGludWU7IH1cblxuICAgIGlmKCBuLnNhbWUodGd0KSB8fCB0aGlzLnByZXZpZXcobiwgYWxsb3dIb3ZlckRlbGF5KSApe1xuICAgICAgc25hcHBlZCA9IHRydWU7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc25hcHBlZDtcbn1cblxuZnVuY3Rpb24gcHJldmlldyggdGFyZ2V0LCBhbGxvd0hvdmVyRGVsYXkgPSB0cnVlICl7XG4gIGxldCB7IG9wdGlvbnMsIHNvdXJjZU5vZGUsIGdob3N0Tm9kZSwgZ2hvc3RFbGVzLCBwcmVzdW1wdGl2ZVRhcmdldHMsIHByZXZpZXdFbGVzLCBhY3RpdmUgfSA9IHRoaXM7XG4gIGxldCBzb3VyY2UgPSBzb3VyY2VOb2RlO1xuICBsZXQgaXNMb29wID0gdGFyZ2V0LnNhbWUoIHNvdXJjZSApO1xuICBsZXQgbG9vcEFsbG93ZWQgPSBvcHRpb25zLmxvb3BBbGxvd2VkKCB0YXJnZXQgKTtcbiAgbGV0IGlzR2hvc3QgPSB0YXJnZXQuc2FtZSggZ2hvc3ROb2RlICk7XG4gIGxldCBub0VkZ2UgPSAhb3B0aW9ucy5lZGdlVHlwZSggc291cmNlLCB0YXJnZXQgKTtcbiAgbGV0IGlzSGFuZGxlID0gdGFyZ2V0LnNhbWUoIHRoaXMuaGFuZGxlTm9kZSApO1xuICBsZXQgaXNFeGlzdGluZ1RndCA9IHRhcmdldC5zYW1lKCB0aGlzLnRhcmdldE5vZGUgKTtcblxuICBpZihcbiAgICAhYWN0aXZlIHx8IGlzSGFuZGxlIHx8IGlzR2hvc3QgfHwgbm9FZGdlIHx8IGlzRXhpc3RpbmdUZ3RcbiAgICB8fCAoaXNMb29wICYmICFsb29wQWxsb3dlZClcbiAgICAvLyB8fCAodGFyZ2V0LmlzUGFyZW50KCkpXG4gICl7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gIGlmKCB0aGlzLnRhcmdldE5vZGUubm9uZW1wdHkoKSApe1xuICAgIHRoaXMudW5wcmV2aWV3KCB0aGlzLnRhcmdldE5vZGUgKTtcbiAgfVxuXG4gIGNsZWFyVGltZW91dCggdGhpcy5wcmV2aWV3VGltZW91dCApO1xuXG4gIGxldCBhcHBseVByZXZpZXcgPSAoKSA9PiB7XG4gICAgdGhpcy50YXJnZXROb2RlID0gdGFyZ2V0O1xuXG4gICAgcHJlc3VtcHRpdmVUYXJnZXRzLm1lcmdlKCB0YXJnZXQgKTtcblxuICAgIHRhcmdldC5hZGRDbGFzcygnZWgtcHJlc3VtcHRpdmUtdGFyZ2V0Jyk7XG4gICAgdGFyZ2V0LmFkZENsYXNzKCdlaC10YXJnZXQnKTtcblxuICAgIHRoaXMuZW1pdCggJ2hvdmVyb3ZlcicsIHRoaXMubXAoKSwgc291cmNlLCB0YXJnZXQgKTtcblxuICAgIGlmKCBvcHRpb25zLnByZXZpZXcgKXtcbiAgICAgIHRhcmdldC5hZGRDbGFzcygnZWgtcHJldmlldycpO1xuXG4gICAgICBnaG9zdEVsZXMuYWRkQ2xhc3MoJ2VoLXByZXZpZXctYWN0aXZlJyk7XG4gICAgICBzb3VyY2VOb2RlLmFkZENsYXNzKCdlaC1wcmV2aWV3LWFjdGl2ZScpO1xuICAgICAgdGFyZ2V0LmFkZENsYXNzKCdlaC1wcmV2aWV3LWFjdGl2ZScpO1xuXG4gICAgICB0aGlzLm1ha2VQcmV2aWV3KCk7XG5cbiAgICAgIHRoaXMuZW1pdCggJ3ByZXZpZXdvbicsIHRoaXMubXAoKSwgc291cmNlLCB0YXJnZXQsIHByZXZpZXdFbGVzICk7XG4gICAgfVxuICB9O1xuXG4gIGlmKCBhbGxvd0hvdmVyRGVsYXkgJiYgb3B0aW9ucy5ob3ZlckRlbGF5ID4gMCApe1xuICAgIHRoaXMucHJldmlld1RpbWVvdXQgPSBzZXRUaW1lb3V0KCBhcHBseVByZXZpZXcsIG9wdGlvbnMuaG92ZXJEZWxheSApO1xuICB9IGVsc2Uge1xuICAgIGFwcGx5UHJldmlldygpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHVucHJldmlldyggdGFyZ2V0ICkge1xuICBpZiggIXRoaXMuYWN0aXZlIHx8IHRhcmdldC5zYW1lKCB0aGlzLmhhbmRsZU5vZGUgKSApeyByZXR1cm47IH1cblxuICBsZXQgeyBwcmV2aWV3VGltZW91dCwgc291cmNlTm9kZSwgcHJldmlld0VsZXMsIGdob3N0RWxlcywgY3kgfSA9IHRoaXM7XG4gIGNsZWFyVGltZW91dCggcHJldmlld1RpbWVvdXQgKTtcbiAgdGhpcy5wcmV2aWV3VGltZW91dCA9IG51bGw7XG5cbiAgbGV0IHNvdXJjZSA9IHNvdXJjZU5vZGU7XG5cbiAgdGFyZ2V0LnJlbW92ZUNsYXNzKCdlaC1wcmV2aWV3IGVoLXRhcmdldCBlaC1wcmVzdW1wdGl2ZS10YXJnZXQgZWgtcHJldmlldy1hY3RpdmUnKTtcbiAgZ2hvc3RFbGVzLnJlbW92ZUNsYXNzKCdlaC1wcmV2aWV3LWFjdGl2ZScpO1xuICBzb3VyY2VOb2RlLnJlbW92ZUNsYXNzKCdlaC1wcmV2aWV3LWFjdGl2ZScpO1xuXG4gIHRoaXMudGFyZ2V0Tm9kZSA9IGN5LmNvbGxlY3Rpb24oKTtcblxuICB0aGlzLnJlbW92ZVByZXZpZXcoIHNvdXJjZSwgdGFyZ2V0ICk7XG5cbiAgdGhpcy5lbWl0KCAnaG92ZXJvdXQnLCB0aGlzLm1wKCksIHNvdXJjZSwgdGFyZ2V0ICk7XG4gIHRoaXMuZW1pdCggJ3ByZXZpZXdvZmYnLCB0aGlzLm1wKCksIHNvdXJjZSwgdGFyZ2V0LCBwcmV2aWV3RWxlcyApO1xuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBzdG9wKCl7XG4gIGlmKCAhdGhpcy5hY3RpdmUgKXsgcmV0dXJuOyB9XG5cbiAgbGV0IHsgc291cmNlTm9kZSwgdGFyZ2V0Tm9kZSwgZ2hvc3RFbGVzLCBwcmVzdW1wdGl2ZVRhcmdldHMgfSA9IHRoaXM7XG5cbiAgY2xlYXJUaW1lb3V0KCB0aGlzLnByZXZpZXdUaW1lb3V0ICk7XG5cbiAgc291cmNlTm9kZS5yZW1vdmVDbGFzcygnZWgtc291cmNlJyk7XG4gIHRhcmdldE5vZGUucmVtb3ZlQ2xhc3MoJ2VoLXRhcmdldCBlaC1wcmV2aWV3IGVoLWhvdmVyJyk7XG4gIHByZXN1bXB0aXZlVGFyZ2V0cy5yZW1vdmVDbGFzcygnZWgtcHJlc3VtcHRpdmUtdGFyZ2V0Jyk7XG5cbiAgdGhpcy5tYWtlRWRnZXMoKTtcblxuICB0aGlzLnJlbW92ZUhhbmRsZSgpO1xuXG4gIGdob3N0RWxlcy5yZW1vdmUoKTtcblxuICB0aGlzLmNsZWFyQ29sbGVjdGlvbnMoKTtcblxuICB0aGlzLnJlc2V0R2VzdHVyZXMoKTtcbiAgdGhpcy5lbmFibGVFZGdlRXZlbnRzKCk7XG5cbiAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcblxuICB0aGlzLmVtaXQoICdzdG9wJywgdGhpcy5tcCgpLCBzb3VyY2VOb2RlICk7XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzaG93LCBoaWRlLCBzdGFydCwgdXBkYXRlLCBwcmV2aWV3LCB1bnByZXZpZXcsIHN0b3AsIHNuYXAsXG4gIGNhblN0YXJ0T24sIGNhblN0YXJ0RHJhd01vZGVPbiwgY2FuU3RhcnROb25EcmF3TW9kZU9uXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VkZ2VoYW5kbGVzL2dlc3R1cmUtbGlmZWN5Y2xlLmpzIiwiY29uc3QgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5jb25zdCBhc3NpZ24gPSByZXF1aXJlKCcuLi9hc3NpZ24nKTtcbmNvbnN0IHRocm90dGxlID0gcmVxdWlyZSgnbG9kYXNoLnRocm90dGxlJyk7XG5cbmNvbnN0IGN5R2VzdHVyZXNUb2dnbGUgPSByZXF1aXJlKCcuL2N5LWdlc3R1cmVzLXRvZ2dsZScpO1xuY29uc3QgY3lMaXN0ZW5lcnMgPSByZXF1aXJlKCcuL2N5LWxpc3RlbmVycycpO1xuY29uc3QgZHJhd01vZGUgPSByZXF1aXJlKCcuL2RyYXctbW9kZScpO1xuY29uc3QgZHJhd2luZyA9IHJlcXVpcmUoJy4vZHJhd2luZycpO1xuY29uc3QgZW5hYmxpbmcgPSByZXF1aXJlKCcuL2VuYWJsaW5nJyk7XG5jb25zdCBnZXN0dXJlTGlmZWN5Y2xlID0gcmVxdWlyZSgnLi9nZXN0dXJlLWxpZmVjeWNsZScpO1xuY29uc3QgbGlzdGVuZXJzID0gcmVxdWlyZSgnLi9saXN0ZW5lcnMnKTtcbmNvbnN0IGVkZ2VFdmVudHMgPSByZXF1aXJlKCcuL2VkZ2UtZXZlbnRzLXRvZ2dsZScpO1xuXG5mdW5jdGlvbiBFZGdlaGFuZGxlcyggb3B0aW9ucyApe1xuICBsZXQgY3kgPSBvcHRpb25zLmN5O1xuXG4gIHRoaXMuY3kgPSBjeTtcbiAgdGhpcy5saXN0ZW5lcnMgPSBbXTtcblxuICAvLyBlZGdlaGFuZGxlcyBnZXN0dXJlIHN0YXRlXG4gIHRoaXMuZW5hYmxlZCA9IHRydWU7XG4gIHRoaXMuZHJhd01vZGUgPSBmYWxzZTtcbiAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgdGhpcy5ncmFiYmluZ05vZGUgPSBmYWxzZTtcblxuICAvLyBlZGdlaGFuZGxlcyBlbGVtZW50c1xuICB0aGlzLmhhbmRsZU5vZGUgPSBjeS5jb2xsZWN0aW9uKCk7XG4gIHRoaXMuY2xlYXJDb2xsZWN0aW9ucygpO1xuXG4gIC8vIGhhbmRsZVxuICB0aGlzLmh4ID0gMDtcbiAgdGhpcy5oeSA9IDA7XG4gIHRoaXMuaHIgPSAwO1xuXG4gIC8vIG1vdXNlIHBvc2l0aW9uXG4gIHRoaXMubXggPSAwO1xuICB0aGlzLm15ID0gMDtcblxuICB0aGlzLm9wdGlvbnMgPSBhc3NpZ24oIHt9LCBkZWZhdWx0cywgb3B0aW9ucyApO1xuXG4gIHRoaXMuc2F2ZUdlc3R1cmVTdGF0ZSgpO1xuICB0aGlzLmFkZExpc3RlbmVycygpO1xuXG4gIHRoaXMudGhyb3R0bGVkU25hcCA9IHRocm90dGxlKCB0aGlzLnNuYXAuYmluZCh0aGlzKSwgMTAwMC9vcHRpb25zLnNuYXBGcmVxdWVuY3kgKTtcblxuICB0aGlzLnByZXZlbnREZWZhdWx0ID0gZSA9PiBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgbGV0IHN1cHBvcnRzUGFzc2l2ZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIGxldCBvcHRzID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KCB7fSwgJ3Bhc3NpdmUnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHN1cHBvcnRzUGFzc2l2ZSA9IHRydWU7XG4gICAgICB9XG4gICAgfSApO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICd0ZXN0JywgbnVsbCwgb3B0cyApO1xuICB9IGNhdGNoKCBlcnIgKXt9XG5cbiAgaWYoIHN1cHBvcnRzUGFzc2l2ZSApe1xuICAgIHRoaXMud2luZG93TGlzdGVuZXJPcHRpb25zID0geyBjYXB0dXJlOiB0cnVlLCBwYXNzaXZlOiBmYWxzZSB9O1xuICB9IGVsc2Uge1xuICAgIHRoaXMud2luZG93TGlzdGVuZXJPcHRpb25zID0gdHJ1ZTtcbiAgfVxufVxuXG5sZXQgcHJvdG8gPSBFZGdlaGFuZGxlcy5wcm90b3R5cGUgPSB7fTtcbmxldCBleHRlbmQgPSBvYmogPT4gYXNzaWduKCBwcm90bywgb2JqICk7XG5cbnByb3RvLmRlc3Ryb3kgPSBmdW5jdGlvbigpe1xuICB0aGlzLnJlbW92ZUxpc3RlbmVycygpO1xufTtcblxucHJvdG8uc2V0T3B0aW9ucyA9IGZ1bmN0aW9uKCBvcHRpb25zICl7XG4gIGFzc2lnbiggdGhpcy5vcHRpb25zLCBvcHRpb25zICk7XG59O1xuXG5wcm90by5tcCA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB7IHg6IHRoaXMubXgsIHk6IHRoaXMubXkgfTtcbn07XG5cbnByb3RvLmhwID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHsgeDogdGhpcy5oeCwgeTogdGhpcy5oeSB9O1xufTtcblxucHJvdG8uY2xlYXJDb2xsZWN0aW9ucyA9IGZ1bmN0aW9uKCl7XG4gIGxldCB7IGN5IH0gPSB0aGlzO1xuXG4gIHRoaXMucHJldmlld0VsZXMgPSBjeS5jb2xsZWN0aW9uKCk7XG4gIHRoaXMuZ2hvc3RFbGVzID0gY3kuY29sbGVjdGlvbigpO1xuICB0aGlzLmdob3N0Tm9kZSA9IGN5LmNvbGxlY3Rpb24oKTtcbiAgdGhpcy5zb3VyY2VOb2RlID0gY3kuY29sbGVjdGlvbigpO1xuICB0aGlzLnRhcmdldE5vZGUgPSBjeS5jb2xsZWN0aW9uKCk7XG4gIHRoaXMucHJlc3VtcHRpdmVUYXJnZXRzID0gY3kuY29sbGVjdGlvbigpO1xufTtcblxuW1xuICBjeUdlc3R1cmVzVG9nZ2xlLFxuICBjeUxpc3RlbmVycyxcbiAgZHJhd01vZGUsXG4gIGRyYXdpbmcsXG4gIGVuYWJsaW5nLFxuICBnZXN0dXJlTGlmZWN5Y2xlLFxuICBsaXN0ZW5lcnMsXG4gIGVkZ2VFdmVudHNcbl0uZm9yRWFjaCggZXh0ZW5kICk7XG5cbm1vZHVsZS5leHBvcnRzID0gRWRnZWhhbmRsZXM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZWRnZWhhbmRsZXMvaW5kZXguanMiLCJmdW5jdGlvbiBhZGRMaXN0ZW5lcnMoKXtcbiAgdGhpcy5hZGRDeXRvc2NhcGVMaXN0ZW5lcnMoKTtcblxuICB0aGlzLmFkZExpc3RlbmVyKCB0aGlzLmN5LCAnZGVzdHJveScsICgpID0+IHRoaXMuZGVzdHJveSgpICk7XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVycygpe1xuICBmb3IoIGxldCBpID0gdGhpcy5saXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0gKXtcbiAgICBsZXQgbCA9IHRoaXMubGlzdGVuZXJzW2ldO1xuXG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lciggbC50YXJnZXQsIGwuZXZlbnQsIGwuc2VsZWN0b3IsIGwuY2FsbGJhY2ssIGwub3B0aW9ucyApO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIGdldExpc3RlbmVyKCB0YXJnZXQsIGV2ZW50LCBzZWxlY3RvciwgY2FsbGJhY2ssIG9wdGlvbnMgKXtcbiAgaWYoIHR5cGVvZiBzZWxlY3RvciAhPT0gdHlwZW9mICcnICl7XG4gICAgY2FsbGJhY2sgPSBzZWxlY3RvcjtcbiAgICBvcHRpb25zID0gY2FsbGJhY2s7XG4gICAgc2VsZWN0b3IgPSBudWxsO1xuICB9XG5cbiAgaWYoIG9wdGlvbnMgPT0gbnVsbCApe1xuICAgIG9wdGlvbnMgPSBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB7IHRhcmdldCwgZXZlbnQsIHNlbGVjdG9yLCBjYWxsYmFjaywgb3B0aW9ucyB9O1xufVxuXG5mdW5jdGlvbiBpc0RvbSggdGFyZ2V0ICl7XG4gIHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBFbGVtZW50O1xufVxuXG5mdW5jdGlvbiBhZGRMaXN0ZW5lciggdGFyZ2V0LCBldmVudCwgc2VsZWN0b3IsIGNhbGxiYWNrLCBvcHRpb25zICl7XG4gIGxldCBsID0gZ2V0TGlzdGVuZXIoIHRhcmdldCwgZXZlbnQsIHNlbGVjdG9yLCBjYWxsYmFjaywgb3B0aW9ucyApO1xuXG4gIHRoaXMubGlzdGVuZXJzLnB1c2goIGwgKTtcblxuICBpZiggaXNEb20oIGwudGFyZ2V0ICkgKXtcbiAgICBsLnRhcmdldC5hZGRFdmVudExpc3RlbmVyKCBsLmV2ZW50LCBsLmNhbGxiYWNrLCBsLm9wdGlvbnMgKTtcbiAgfSBlbHNlIHtcbiAgICBpZiggbC5zZWxlY3RvciApe1xuICAgICAgbC50YXJnZXQuYWRkTGlzdGVuZXIoIGwuZXZlbnQsIGwuc2VsZWN0b3IsIGwuY2FsbGJhY2ssIGwub3B0aW9ucyApO1xuICAgIH0gZWxzZSB7XG4gICAgICBsLnRhcmdldC5hZGRMaXN0ZW5lciggbC5ldmVudCwgbC5jYWxsYmFjaywgbC5vcHRpb25zICk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKCB0YXJnZXQsIGV2ZW50LCBzZWxlY3RvciwgY2FsbGJhY2ssIG9wdGlvbnMgKXtcbiAgbGV0IGwgPSBnZXRMaXN0ZW5lciggdGFyZ2V0LCBldmVudCwgc2VsZWN0b3IsIGNhbGxiYWNrLCBvcHRpb25zICk7XG5cbiAgZm9yKCBsZXQgaSA9IHRoaXMubGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tICl7XG4gICAgbGV0IGwyID0gdGhpcy5saXN0ZW5lcnNbaV07XG5cbiAgICBpZihcbiAgICAgIGwudGFyZ2V0ID09PSBsMi50YXJnZXRcbiAgICAgICYmIGwuZXZlbnQgPT09IGwyLmV2ZW50XG4gICAgICAmJiAoIGwuc2VsZWN0b3IgPT0gbnVsbCB8fCBsLnNlbGVjdG9yID09PSBsMi5zZWxlY3RvciApXG4gICAgICAmJiAoIGwuY2FsbGJhY2sgPT0gbnVsbCB8fCBsLmNhbGxiYWNrID09PSBsMi5jYWxsYmFjayApXG4gICAgKXtcbiAgICAgIHRoaXMubGlzdGVuZXJzLnNwbGljZSggaSwgMSApO1xuXG4gICAgICBpZiggaXNEb20oIGwudGFyZ2V0ICkgKXtcbiAgICAgICAgbC50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lciggbC5ldmVudCwgbC5jYWxsYmFjaywgbC5vcHRpb25zICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiggbC5zZWxlY3RvciApe1xuICAgICAgICAgIGwudGFyZ2V0LnJlbW92ZUxpc3RlbmVyKCBsLmV2ZW50LCBsLnNlbGVjdG9yLCBsLmNhbGxiYWNrLCBsLm9wdGlvbnMgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsLnRhcmdldC5yZW1vdmVMaXN0ZW5lciggbC5ldmVudCwgbC5jYWxsYmFjaywgbC5vcHRpb25zICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIGVtaXQoIHR5cGUsIHBvc2l0aW9uLCAuLi5hcmdzICl7XG4gIGxldCB7IG9wdGlvbnMsIGN5IH0gPSB0aGlzO1xuXG4gIGN5LmVtaXQoIHsgdHlwZTogYGVoJHt0eXBlfWAsIHBvc2l0aW9uIH0sIGFyZ3MgKTtcblxuICBsZXQgaGFuZGxlciA9IG9wdGlvbnNbIHR5cGUgXTtcblxuICBpZiggaGFuZGxlciAhPSBudWxsICl7XG4gICAgaGFuZGxlciggLi4uYXJncyApO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBhZGRMaXN0ZW5lciwgYWRkTGlzdGVuZXJzLCByZW1vdmVMaXN0ZW5lciwgcmVtb3ZlTGlzdGVuZXJzLCBlbWl0IH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZWRnZWhhbmRsZXMvbGlzdGVuZXJzLmpzIiwiY29uc3QgaW1wbCA9IHJlcXVpcmUoJy4vY29yZScpO1xuXG4vLyByZWdpc3RlcnMgdGhlIGV4dGVuc2lvbiBvbiBhIGN5dG9zY2FwZSBsaWIgcmVmXG5sZXQgcmVnaXN0ZXIgPSBmdW5jdGlvbiggY3l0b3NjYXBlICl7XG4gIGlmKCAhY3l0b3NjYXBlICl7IHJldHVybjsgfSAvLyBjYW4ndCByZWdpc3RlciBpZiBjeXRvc2NhcGUgdW5zcGVjaWZpZWRcblxuICBjeXRvc2NhcGUoICdjb3JlJywgJ2VkZ2VoYW5kbGVzJywgaW1wbCApOyAvLyByZWdpc3RlciB3aXRoIGN5dG9zY2FwZS5qc1xufTtcblxuaWYoIHR5cGVvZiBjeXRvc2NhcGUgIT09ICd1bmRlZmluZWQnICl7IC8vIGV4cG9zZSB0byBnbG9iYWwgY3l0b3NjYXBlIChpLmUuIHdpbmRvdy5jeXRvc2NhcGUpXG4gIHJlZ2lzdGVyKCBjeXRvc2NhcGUgKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlZ2lzdGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzEzX187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImxvZGFzaC5tZW1vaXplXCIsXCJjb21tb25qczJcIjpcImxvZGFzaC5tZW1vaXplXCIsXCJhbWRcIjpcImxvZGFzaC5tZW1vaXplXCIsXCJyb290XCI6W1wiX1wiLFwibWVtb2l6ZVwiXX1cbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xNF9fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJsb2Rhc2gudGhyb3R0bGVcIixcImNvbW1vbmpzMlwiOlwibG9kYXNoLnRocm90dGxlXCIsXCJhbWRcIjpcImxvZGFzaC50aHJvdHRsZVwiLFwicm9vdFwiOltcIl9cIixcInRocm90dGxlXCJdfVxuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==