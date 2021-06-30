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
  canConnect: function canConnect(sourceNode, targetNode) {
    // determines if the can the source node connect to the target node
    return true;
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
  ghostEdgeParams: function ghostEdgeParams() {
    // return element object to be passed to cy.add() for the ghost edge
    // (default classes are always added for you)
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
  var classes = preview ? 'eh-preview' : '';
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
    }, options.nodeParams(source, target), classes));

    var source2inter = cy.add(getEleJson({
      group: 'edges',
      data: {
        source: source.id(),
        target: interNode.id()
      }
    }, options.edgeParams(source, target, 0), classes));

    var inter2target = cy.add(getEleJson({
      group: 'edges',
      data: {
        source: interNode.id(),
        target: target.id()
      }
    }, options.edgeParams(source, target, 1), classes));

    added = added.merge(interNode).merge(source2inter).merge(inter2target);
  } else {
    // flat
    var source2target = cy.add(getEleJson({
      group: 'edges',
      data: {
        source: source.id(),
        target: target.id()
      }
    }, options.edgeParams(source, target, 0), classes));

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
        classes: 'eh-handle',
        position: pos,
        grabbable: false,
        selectable: false
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

      var ghostEdgeParams = options.ghostEdgeParams();

      ghostEdge = cy.add(assign({}, ghostEdgeParams, {
        group: 'edges',
        data: assign({}, ghostEdgeParams.data, {
          source: sourceNode.id(),
          target: ghostNode.id()
        }),
        classes: 'eh-ghost eh-ghost-edge'
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
  var isWithinThreshold = function isWithinThreshold(n) {
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
    return !isEhEle(n) && isWithinThreshold(n);
  }).sort(cmp);
  var snapped = false;

  if (tgt.nonempty() && !isWithinThreshold(tgt)) {
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

  if (!active || isHandle || isGhost || noEdge || isExistingTgt || isLoop && !loopAllowed || !options.canConnect(source, target)) {
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

  sourceNode.removeClass('eh-source eh-preview-active');
  targetNode.removeClass('eh-target eh-preview eh-hover eh-preview-active');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkOGRhMzY3NGYwYjUwMTg5NTgxYSIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzaWduLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9lZGdlaGFuZGxlcy9jeS1nZXN0dXJlcy10b2dnbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VkZ2VoYW5kbGVzL2N5LWxpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWRnZWhhbmRsZXMvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VkZ2VoYW5kbGVzL2RyYXctbW9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWRnZWhhbmRsZXMvZHJhd2luZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWRnZWhhbmRsZXMvZWRnZS1ldmVudHMtdG9nZ2xlLmpzIiwid2VicGFjazovLy8uL3NyYy9lZGdlaGFuZGxlcy9lbmFibGluZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWRnZWhhbmRsZXMvZ2VzdHVyZS1saWZlY3ljbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VkZ2VoYW5kbGVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9lZGdlaGFuZGxlcy9saXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwibG9kYXNoLm1lbW9pemVcIixcImNvbW1vbmpzMlwiOlwibG9kYXNoLm1lbW9pemVcIixcImFtZFwiOlwibG9kYXNoLm1lbW9pemVcIixcInJvb3RcIjpbXCJfXCIsXCJtZW1vaXplXCJdfSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImxvZGFzaC50aHJvdHRsZVwiLFwiY29tbW9uanMyXCI6XCJsb2Rhc2gudGhyb3R0bGVcIixcImFtZFwiOlwibG9kYXNoLnRocm90dGxlXCIsXCJyb290XCI6W1wiX1wiLFwidGhyb3R0bGVcIl19Il0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJPYmplY3QiLCJhc3NpZ24iLCJiaW5kIiwidGd0Iiwic3JjcyIsImZpbHRlciIsInNyYyIsImZvckVhY2giLCJrZXlzIiwiayIsIkVkZ2VoYW5kbGVzIiwicmVxdWlyZSIsIm9wdGlvbnMiLCJjeSIsImRpc2FibGVHZXN0dXJlcyIsInNhdmVHZXN0dXJlU3RhdGUiLCJ6b29taW5nRW5hYmxlZCIsInBhbm5pbmdFbmFibGVkIiwiYm94U2VsZWN0aW9uRW5hYmxlZCIsImRpc2FibGVCcm93c2VyR2VzdHVyZXMiLCJ3bE9wdHMiLCJ3aW5kb3dMaXN0ZW5lck9wdGlvbnMiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicHJldmVudERlZmF1bHQiLCJyZXNldEdlc3R1cmVzIiwibGFzdFpvb21pbmdFbmFibGVkIiwibGFzdFBhbm5pbmdFbmFibGVkIiwibGFzdEJveFNlbGVjdGlvbkVuYWJsZWQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWRkQ3l0b3NjYXBlTGlzdGVuZXJzIiwiYWRkTGlzdGVuZXIiLCJncmFiYmluZ05vZGUiLCJzaG93IiwiZSIsInRhcmdldCIsIm5vZGUiLCJzYW1lIiwiaGFuZGxlTm9kZSIsInNvdXJjZU5vZGUiLCJoaWRlIiwic3RhcnQiLCJkcmF3TW9kZSIsInVwZGF0ZSIsInBvc2l0aW9uIiwic25hcCIsInByZXZpZXciLCJ1bnByZXZpZXciLCJzdG9wIiwiZGVmYXVsdHMiLCJob3ZlckRlbGF5IiwiaGFuZGxlTm9kZXMiLCJzbmFwVGhyZXNob2xkIiwic25hcEZyZXF1ZW5jeSIsIm5vRWRnZUV2ZW50c0luRHJhdyIsImhhbmRsZVBvc2l0aW9uIiwiaGFuZGxlSW5EcmF3TW9kZSIsImVkZ2VUeXBlIiwidGFyZ2V0Tm9kZSIsImxvb3BBbGxvd2VkIiwiY2FuQ29ubmVjdCIsIm5vZGVMb29wT2Zmc2V0Iiwibm9kZVBhcmFtcyIsImVkZ2VQYXJhbXMiLCJpIiwiZ2hvc3RFZGdlUGFyYW1zIiwiY29tcGxldGUiLCJhZGRlZEVsZXMiLCJjYW5jZWwiLCJjYW5jZWxsZWRUYXJnZXRzIiwiaG92ZXJvdmVyIiwiaG92ZXJvdXQiLCJwcmV2aWV3b24iLCJwcmV2aWV3RWxlcyIsInByZXZpZXdvZmYiLCJkcmF3b24iLCJkcmF3b2ZmIiwidG9nZ2xlRHJhd01vZGUiLCJib29sIiwicHJldlVuZ3JhYmlmeVN0YXRlIiwiYXV0b3VuZ3JhYmlmeSIsImhhbmRsZVNob3duIiwiZW1pdCIsImVuYWJsZURyYXdNb2RlIiwiZGlzYWJsZURyYXdNb2RlIiwiaXNTdHJpbmciLCJ4IiwiaXNBcnJheSIsImxlbmd0aCIsImdldEVsZUpzb24iLCJvdmVycmlkZXMiLCJwYXJhbXMiLCJhZGRlZENsYXNzZXMiLCJqc29uIiwiZGF0YSIsImNsYXNzZXMiLCJqb2luIiwibWFrZUVkZ2VzIiwicHJlc3VtcHRpdmVUYXJnZXRzIiwiYWN0aXZlIiwic291cmNlIiwiYWRkZWQiLCJjb2xsZWN0aW9uIiwic2l6ZSIsInJlbW92ZSIsIm1wIiwicmVtb3ZlQ2xhc3MiLCJzdHlsZSIsInAxIiwicDIiLCJwIiwieSIsImludGVyTm9kZSIsImFkZCIsImdyb3VwIiwic291cmNlMmludGVyIiwiaWQiLCJpbnRlcjJ0YXJnZXQiLCJtZXJnZSIsInNvdXJjZTJ0YXJnZXQiLCJtYWtlUHJldmlldyIsInByZXZpZXdTaG93biIsIm5vbmVtcHR5IiwiaW5zaWRlIiwicmVtb3ZlUHJldmlldyIsInJlbW92ZUhhbmRsZSIsInNldEhhbmRsZUZvciIsImgiLCJvdXRlckhlaWdodCIsInciLCJvdXRlcldpZHRoIiwibW92ZVgiLCJtb3ZlWSIsImF4ZXMiLCJ0b0xvd2VyQ2FzZSIsInNwbGl0IiwiYXhpc1giLCJheGlzWSIsImh4IiwiaHkiLCJwb3MiLCJiYXRjaCIsImdyYWJiYWJsZSIsInNlbGVjdGFibGUiLCJ1cGRhdGVFZGdlIiwiZ2hvc3ROb2RlIiwibXgiLCJteSIsImdob3N0RWRnZSIsImdob3N0RWxlcyIsInJlbW92ZWQiLCJkaXNhYmxlRWRnZUV2ZW50cyIsImVkZ2VzIiwiZW5hYmxlRWRnZUV2ZW50cyIsImVuYWJsZSIsImVuYWJsZWQiLCJkaXNhYmxlIiwibWVtb2l6ZSIsInNxcnQyIiwiTWF0aCIsInNxcnQiLCJjYW5TdGFydE9uIiwiaXNQcmV2aWV3IiwiYW55U2FtZSIsImVsIiwiaXNHaG9zdCIsInVzZXJGaWx0ZXIiLCJpc0hhbmRsZSIsImlzVGVtcCIsImNhblN0YXJ0RHJhd01vZGVPbiIsImNhblN0YXJ0Tm9uRHJhd01vZGVPbiIsImhwIiwiYWRkQ2xhc3MiLCJ0aHJvdHRsZWRTbmFwIiwidGhyZXNob2xkIiwibW91c2VQb3MiLCJyYWRpdXMiLCJtYXgiLCJuIiwic3FEaXN0IiwieDEiLCJ5MSIsIngyIiwieTIiLCJkeCIsImR5Iiwic3FEaXN0QnlQdCIsIm5vZGVTcURpc3QiLCJzcVRocmVzaG9sZCIsInIiLCJ0IiwiaXNXaXRoaW5UaHJlc2hvbGQiLCJiYlNxRGlzdCIsImhhbGZXIiwiaGFsZkgiLCJueCIsIm55IiwiaW5zaWRlWEJvdW5kcyIsImluc2lkZVlCb3VuZHMiLCJkeTEiLCJkeTIiLCJtaW4iLCJkeDEiLCJkeDIiLCJjbXBCYlNxRGlzdCIsIm4xIiwibjIiLCJjbXAiLCJhbGxvd0hvdmVyRGVsYXkiLCJtb3VzZUlzSW5zaWRlIiwiaXNFaEVsZSIsIm5vZGVzQnlEaXN0Iiwibm9kZXMiLCJzb3J0Iiwic25hcHBlZCIsImlzUGFyZW50IiwiaXNDaGlsZCIsInBhcmVudCIsImlzTG9vcCIsIm5vRWRnZSIsImlzRXhpc3RpbmdUZ3QiLCJjbGVhclRpbWVvdXQiLCJwcmV2aWV3VGltZW91dCIsImFwcGx5UHJldmlldyIsInNldFRpbWVvdXQiLCJjbGVhckNvbGxlY3Rpb25zIiwidGhyb3R0bGUiLCJjeUdlc3R1cmVzVG9nZ2xlIiwiY3lMaXN0ZW5lcnMiLCJkcmF3aW5nIiwiZW5hYmxpbmciLCJnZXN0dXJlTGlmZWN5Y2xlIiwibGlzdGVuZXJzIiwiZWRnZUV2ZW50cyIsImhyIiwiYWRkTGlzdGVuZXJzIiwic3VwcG9ydHNQYXNzaXZlIiwib3B0cyIsImRlZmluZVByb3BlcnR5IiwiZ2V0IiwiZXJyIiwiY2FwdHVyZSIsInBhc3NpdmUiLCJwcm90byIsInByb3RvdHlwZSIsImV4dGVuZCIsIm9iaiIsImRlc3Ryb3kiLCJyZW1vdmVMaXN0ZW5lcnMiLCJzZXRPcHRpb25zIiwibCIsInJlbW92ZUxpc3RlbmVyIiwiZXZlbnQiLCJzZWxlY3RvciIsImNhbGxiYWNrIiwiZ2V0TGlzdGVuZXIiLCJpc0RvbSIsIkVsZW1lbnQiLCJwdXNoIiwibDIiLCJzcGxpY2UiLCJ0eXBlIiwiYXJncyIsImhhbmRsZXIiLCJpbXBsIiwicmVnaXN0ZXIiLCJjeXRvc2NhcGUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUNoRUE7O0FBRUFBLE9BQU9DLE9BQVAsR0FBaUJDLE9BQU9DLE1BQVAsSUFBaUIsSUFBakIsR0FBd0JELE9BQU9DLE1BQVAsQ0FBY0MsSUFBZCxDQUFvQkYsTUFBcEIsQ0FBeEIsR0FBdUQsVUFBVUcsR0FBVixFQUF3QjtBQUFBLG9DQUFOQyxJ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UDtBQUNEOztBQUVELFNBQVNzRSxJQUFULENBQWVtTCxJQUFmLEVBQXFCek4sUUFBckIsRUFBd0M7QUFBQSxNQUNoQ2hDLE9BRGdDLEdBQ2hCLElBRGdCLENBQ2hDQSxPQURnQztBQUFBLE1BQ3ZCQyxFQUR1QixHQUNoQixJQURnQixDQUN2QkEsRUFEdUI7O0FBQUEsb0NBQU55UCxJQUFNO0FBQU5BLFFBQU07QUFBQTs7QUFHdEN6UCxLQUFHcUUsSUFBSCxDQUFTLEVBQUVtTCxhQUFXQSxJQUFiLEVBQXFCek4sa0JBQXJCLEVBQVQsRUFBMEMwTixJQUExQzs7QUFFQSxNQUFJQyxVQUFVM1AsUUFBU3lQLElBQVQsQ0FBZDs7QUFFQSxNQUFJRSxXQUFXLElBQWYsRUFBcUI7QUFDbkJBLDZCQUFZRCxJQUFaO0FBQ0Q7O0FBRUQsU0FBTyxJQUFQO0FBQ0Q7O0FBRUR4USxPQUFPQyxPQUFQLEdBQWlCLEVBQUVnQyx3QkFBRixFQUFlNE0sMEJBQWYsRUFBNkJnQiw4QkFBN0IsRUFBNkNILGdDQUE3QyxFQUE4RHRLLFVBQTlELEVBQWpCLEM7Ozs7Ozs7OztBQ25HQSxJQUFNc0wsT0FBTyxtQkFBQTdQLENBQVEsQ0FBUixDQUFiOztBQUVBO0FBQ0EsSUFBSThQLFdBQVcsU0FBWEEsUUFBVyxDQUFVQyxTQUFWLEVBQXFCO0FBQ2xDLE1BQUksQ0FBQ0EsU0FBTCxFQUFnQjtBQUFFO0FBQVMsR0FETyxDQUNOOztBQUU1QkEsWUFBVyxNQUFYLEVBQW1CLGFBQW5CLEVBQWtDRixJQUFsQyxFQUhrQyxDQUdRO0FBQzNDLENBSkQ7O0FBTUEsSUFBSSxPQUFPRSxTQUFQLEtBQXFCLFdBQXpCLEVBQXNDO0FBQUU7QUFDdENELFdBQVVDLFNBQVYsRUFEb0MsQ0FDYjtBQUN4Qjs7QUFFRDVRLE9BQU9DLE9BQVAsR0FBaUIwUSxRQUFqQixDOzs7Ozs7QUNiQSxnRDs7Ozs7O0FDQUEsZ0QiLCJmaWxlIjoiY3l0b3NjYXBlLWVkZ2VoYW5kbGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwibG9kYXNoLm1lbW9pemVcIiksIHJlcXVpcmUoXCJsb2Rhc2gudGhyb3R0bGVcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wibG9kYXNoLm1lbW9pemVcIiwgXCJsb2Rhc2gudGhyb3R0bGVcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiY3l0b3NjYXBlRWRnZWhhbmRsZXNcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJsb2Rhc2gubWVtb2l6ZVwiKSwgcmVxdWlyZShcImxvZGFzaC50aHJvdHRsZVwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiY3l0b3NjYXBlRWRnZWhhbmRsZXNcIl0gPSBmYWN0b3J5KHJvb3RbXCJfXCJdW1wibWVtb2l6ZVwiXSwgcm9vdFtcIl9cIl1bXCJ0aHJvdHRsZVwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzEzX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTRfXykge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkOGRhMzY3NGYwYjUwMTg5NTgxYSIsIi8vIFNpbXBsZSwgaW50ZXJuYWwgT2JqZWN0LmFzc2lnbigpIHBvbHlmaWxsIGZvciBvcHRpb25zIG9iamVjdHMgZXRjLlxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduICE9IG51bGwgPyBPYmplY3QuYXNzaWduLmJpbmQoIE9iamVjdCApIDogZnVuY3Rpb24oIHRndCwgLi4uc3JjcyApe1xyXG4gIHNyY3MuZmlsdGVyKCBzcmMgPT4gc3JjICE9IG51bGwgKS5mb3JFYWNoKCBzcmMgPT4ge1xyXG4gICAgT2JqZWN0LmtleXMoIHNyYyApLmZvckVhY2goIGsgPT4gdGd0W2tdID0gc3JjW2tdICk7XHJcbiAgfSApO1xyXG5cclxuICByZXR1cm4gdGd0O1xyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzaWduLmpzIiwiY29uc3QgRWRnZWhhbmRsZXMgPSByZXF1aXJlKCcuL2VkZ2VoYW5kbGVzJyk7XHJcbmNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJy4vYXNzaWduJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCBvcHRpb25zICl7XHJcbiAgbGV0IGN5ID0gdGhpcztcclxuXHJcbiAgcmV0dXJuIG5ldyBFZGdlaGFuZGxlcyggYXNzaWduKHsgY3kgfSwgb3B0aW9ucykgKTtcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvcmUuanMiLCJmdW5jdGlvbiBkaXNhYmxlR2VzdHVyZXMoKXtcclxuICB0aGlzLnNhdmVHZXN0dXJlU3RhdGUoKTtcclxuXHJcbiAgKCB0aGlzLmN5XHJcbiAgICAuem9vbWluZ0VuYWJsZWQoIGZhbHNlIClcclxuICAgIC5wYW5uaW5nRW5hYmxlZCggZmFsc2UgKVxyXG4gICAgLmJveFNlbGVjdGlvbkVuYWJsZWQoIGZhbHNlIClcclxuICApO1xyXG5cclxuICBpZiggdGhpcy5vcHRpb25zLmRpc2FibGVCcm93c2VyR2VzdHVyZXMgKXtcclxuICAgIGxldCB3bE9wdHMgPSB0aGlzLndpbmRvd0xpc3RlbmVyT3B0aW9ucztcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMucHJldmVudERlZmF1bHQsIHdsT3B0cyk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5wcmV2ZW50RGVmYXVsdCwgd2xPcHRzKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMucHJldmVudERlZmF1bHQsIHdsT3B0cyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpcztcclxufVxyXG5cclxuZnVuY3Rpb24gcmVzZXRHZXN0dXJlcygpe1xyXG4gICggdGhpcy5jeVxyXG4gICAgLnpvb21pbmdFbmFibGVkKCB0aGlzLmxhc3Rab29taW5nRW5hYmxlZCApXHJcbiAgICAucGFubmluZ0VuYWJsZWQoIHRoaXMubGFzdFBhbm5pbmdFbmFibGVkIClcclxuICAgIC5ib3hTZWxlY3Rpb25FbmFibGVkKCB0aGlzLmxhc3RCb3hTZWxlY3Rpb25FbmFibGVkIClcclxuICApO1xyXG5cclxuICBpZiggdGhpcy5vcHRpb25zLmRpc2FibGVCcm93c2VyR2VzdHVyZXMgKXtcclxuICAgIGxldCB3bE9wdHMgPSB0aGlzLndpbmRvd0xpc3RlbmVyT3B0aW9ucztcclxuXHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMucHJldmVudERlZmF1bHQsIHdsT3B0cyk7XHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5wcmV2ZW50RGVmYXVsdCwgd2xPcHRzKTtcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMucHJldmVudERlZmF1bHQsIHdsT3B0cyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpcztcclxufVxyXG5cclxuZnVuY3Rpb24gc2F2ZUdlc3R1cmVTdGF0ZSgpe1xyXG4gIGxldCB7IGN5IH0gPSB0aGlzO1xyXG5cclxuICB0aGlzLmxhc3RQYW5uaW5nRW5hYmxlZCA9IGN5LnBhbm5pbmdFbmFibGVkKCk7XHJcbiAgdGhpcy5sYXN0Wm9vbWluZ0VuYWJsZWQgPSBjeS56b29taW5nRW5hYmxlZCgpO1xyXG4gIHRoaXMubGFzdEJveFNlbGVjdGlvbkVuYWJsZWQgPSBjeS5ib3hTZWxlY3Rpb25FbmFibGVkKCk7XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHsgZGlzYWJsZUdlc3R1cmVzLCByZXNldEdlc3R1cmVzLCBzYXZlR2VzdHVyZVN0YXRlIH07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lZGdlaGFuZGxlcy9jeS1nZXN0dXJlcy10b2dnbGUuanMiLCJmdW5jdGlvbiBhZGRDeXRvc2NhcGVMaXN0ZW5lcnMoKXtcclxuICBsZXQgeyBjeSwgb3B0aW9ucyB9ID0gdGhpcztcclxuXHJcbiAgLy8gZ3JhYmJpbmcgbm9kZXNcclxuICB0aGlzLmFkZExpc3RlbmVyKCBjeSwgJ2RyYWcnLCAoKSA9PiB0aGlzLmdyYWJiaW5nTm9kZSA9IHRydWUgKTtcclxuICB0aGlzLmFkZExpc3RlbmVyKCBjeSwgJ2ZyZWUnLCAoKSA9PiB0aGlzLmdyYWJiaW5nTm9kZSA9IGZhbHNlICk7XHJcblxyXG4gIC8vIHNob3cgaGFuZGxlIG9uIGhvdmVyXHJcbiAgdGhpcy5hZGRMaXN0ZW5lciggY3ksICdtb3VzZW92ZXInLCAnbm9kZScsIGUgPT4ge1xyXG4gICAgdGhpcy5zaG93KCBlLnRhcmdldCApO1xyXG4gIH0gKTtcclxuXHJcbiAgLy8gaGlkZSBoYW5kbGUgb24gdGFwIGhhbmRsZVxyXG4gIHRoaXMuYWRkTGlzdGVuZXIoIGN5LCAndGFwJywgJ25vZGUnLCBlID0+IHtcclxuICAgIGxldCBub2RlID0gZS50YXJnZXQ7XHJcblxyXG4gICAgaWYoICFub2RlLnNhbWUoIHRoaXMuaGFuZGxlTm9kZSApICl7XHJcbiAgICAgIHRoaXMuc2hvdyggbm9kZSApO1xyXG4gICAgfVxyXG4gIH0gKTtcclxuXHJcbiAgLy8gaGlkZSBoYW5kbGUgd2hlbiBzb3VyY2Ugbm9kZSBtb3ZlZFxyXG4gIHRoaXMuYWRkTGlzdGVuZXIoIGN5LCAncG9zaXRpb24nLCAnbm9kZScsIGUgPT4ge1xyXG4gICAgaWYoIGUudGFyZ2V0LnNhbWUoIHRoaXMuc291cmNlTm9kZSApICl7XHJcbiAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgfVxyXG4gIH0gKTtcclxuXHJcbiAgLy8gc3RhcnQgb24gdGFwc3RhcnQgaGFuZGxlXHJcbiAgLy8gc3RhcnQgb24gdGFwc3RhcnQgbm9kZSAoZHJhdyBtb2RlKVxyXG4gIC8vIHRvZ2dsZSBvbiBzb3VyY2Ugbm9kZVxyXG4gIHRoaXMuYWRkTGlzdGVuZXIoIGN5LCAndGFwc3RhcnQnLCAnbm9kZScsIGUgPT4ge1xyXG4gICAgbGV0IG5vZGUgPSBlLnRhcmdldDtcclxuXHJcbiAgICBpZiggbm9kZS5zYW1lKCB0aGlzLmhhbmRsZU5vZGUgKSApe1xyXG4gICAgICB0aGlzLnN0YXJ0KCB0aGlzLnNvdXJjZU5vZGUgKTtcclxuICAgIH0gZWxzZSBpZiggdGhpcy5kcmF3TW9kZSApe1xyXG4gICAgICB0aGlzLnN0YXJ0KCBub2RlICk7XHJcbiAgICB9IGVsc2UgaWYoIG5vZGUuc2FtZSggdGhpcy5zb3VyY2VOb2RlICkgKXtcclxuICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICB9XHJcbiAgfSApO1xyXG5cclxuICAvLyB1cGRhdGUgbGluZSBvbiBkcmFnXHJcbiAgdGhpcy5hZGRMaXN0ZW5lciggY3ksICd0YXBkcmFnJywgZSA9PiB7XHJcbiAgICB0aGlzLnVwZGF0ZSggZS5wb3NpdGlvbiApO1xyXG4gIH0gKTtcclxuXHJcbiAgLy8gaG92ZXIgb3ZlciBwcmV2aWV3XHJcbiAgdGhpcy5hZGRMaXN0ZW5lciggY3ksICd0YXBkcmFnb3ZlcicsICdub2RlJywgZSA9PiB7XHJcbiAgICBpZiggb3B0aW9ucy5zbmFwICl7XHJcbiAgICAgIC8vIHRoZW4gaWdub3JlIGV2ZW50cyBsaWtlIG1vdXNlb3ZlclxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wcmV2aWV3KCBlLnRhcmdldCApO1xyXG4gICAgfVxyXG4gIH0gKTtcclxuXHJcbiAgLy8gaG92ZXIgb3V0IHVucHJldmlld1xyXG4gIHRoaXMuYWRkTGlzdGVuZXIoIGN5LCAndGFwZHJhZ291dCcsICdub2RlJywgZSA9PiB7XHJcbiAgICBpZiggb3B0aW9ucy5zbmFwICl7XHJcbiAgICAgIC8vIHRoZW4ga2VlcCB0aGUgcHJldmlld1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy51bnByZXZpZXcoIGUudGFyZ2V0ICk7XHJcbiAgICB9XHJcbiAgfSApO1xyXG5cclxuICAvLyBzdG9wIGdlc3R1cmUgb24gdGFwZW5kXHJcbiAgdGhpcy5hZGRMaXN0ZW5lciggY3ksICd0YXBlbmQnLCAoKSA9PiB7XHJcbiAgICB0aGlzLnN0b3AoKTtcclxuICB9ICk7XHJcblxyXG4gIC8vIGhpZGUgaGFuZGxlIGlmIHNvdXJjZSBub2RlIGlzIHJlbW92ZWRcclxuICB0aGlzLmFkZExpc3RlbmVyKCBjeSwgJ3JlbW92ZScsIGUgPT4ge1xyXG4gICAgaWYoIGUudGFyZ2V0LnNhbWUoIHRoaXMuc291cmNlTm9kZSApICl7XHJcbiAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgfVxyXG4gIH0gKTtcclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0geyBhZGRDeXRvc2NhcGVMaXN0ZW5lcnMgfTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VkZ2VoYW5kbGVzL2N5LWxpc3RlbmVycy5qcyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXHJcbmxldCBkZWZhdWx0cyA9IHtcclxuICBwcmV2aWV3OiB0cnVlLCAvLyB3aGV0aGVyIHRvIHNob3cgYWRkZWQgZWRnZXMgcHJldmlldyBiZWZvcmUgcmVsZWFzaW5nIHNlbGVjdGlvblxyXG4gIGhvdmVyRGVsYXk6IDE1MCwgLy8gdGltZSBzcGVudCBob3ZlcmluZyBvdmVyIGEgdGFyZ2V0IG5vZGUgYmVmb3JlIGl0IGlzIGNvbnNpZGVyZWQgc2VsZWN0ZWRcclxuICBoYW5kbGVOb2RlczogJ25vZGUnLCAvLyBzZWxlY3Rvci9maWx0ZXIgZnVuY3Rpb24gZm9yIHdoZXRoZXIgZWRnZXMgY2FuIGJlIG1hZGUgZnJvbSBhIGdpdmVuIG5vZGVcclxuICBzbmFwOiBmYWxzZSwgLy8gd2hlbiBlbmFibGVkLCB0aGUgZWRnZSBjYW4gYmUgZHJhd24gYnkganVzdCBtb3ZpbmcgY2xvc2UgdG8gYSB0YXJnZXQgbm9kZSAoY2FuIGJlIGNvbmZ1c2luZyBvbiBjb21wb3VuZCBncmFwaHMpXHJcbiAgc25hcFRocmVzaG9sZDogNTAsIC8vIHRoZSB0YXJnZXQgbm9kZSBtdXN0IGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byB0aGlzIG1hbnkgcGl4ZWxzIGF3YXkgZnJvbSB0aGUgY3Vyc29yL2ZpbmdlclxyXG4gIHNuYXBGcmVxdWVuY3k6IDE1LCAvLyB0aGUgbnVtYmVyIG9mIHRpbWVzIHBlciBzZWNvbmQgKEh6KSB0aGF0IHNuYXAgY2hlY2tzIGRvbmUgKGxvd2VyIGlzIGxlc3MgZXhwZW5zaXZlKVxyXG4gIG5vRWRnZUV2ZW50c0luRHJhdzogZmFsc2UsIC8vIHNldCBldmVudHM6bm8gdG8gZWRnZXMgZHVyaW5nIGRyYXdzLCBwcmV2ZW50cyBtb3VzZW91dHMgb24gY29tcG91bmRzXHJcbiAgZGlzYWJsZUJyb3dzZXJHZXN0dXJlczogdHJ1ZSwgLy8gZHVyaW5nIGFuIGVkZ2UgZHJhd2luZyBnZXN0dXJlLCBkaXNhYmxlIGJyb3dzZXIgZ2VzdHVyZXMgc3VjaCBhcyB0d28tZmluZ2VyIHRyYWNrcGFkIHN3aXBlIGFuZCBwaW5jaC10by16b29tXHJcbiAgaGFuZGxlUG9zaXRpb246IGZ1bmN0aW9uKCBub2RlICl7XHJcbiAgICByZXR1cm4gJ21pZGRsZSB0b3AnOyAvLyBzZXRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgaGFuZGxlIGluIHRoZSBmb3JtYXQgb2YgXCJYLUFYSVMgWS1BWElTXCIgc3VjaCBhcyBcImxlZnQgdG9wXCIsIFwibWlkZGxlIHRvcFwiXHJcbiAgfSxcclxuICBoYW5kbGVJbkRyYXdNb2RlOiBmYWxzZSwgLy8gd2hldGhlciB0byBzaG93IHRoZSBoYW5kbGUgaW4gZHJhdyBtb2RlXHJcbiAgZWRnZVR5cGU6IGZ1bmN0aW9uKCBzb3VyY2VOb2RlLCB0YXJnZXROb2RlICl7XHJcbiAgICAvLyBjYW4gcmV0dXJuICdmbGF0JyBmb3IgZmxhdCBlZGdlcyBiZXR3ZWVuIG5vZGVzIG9yICdub2RlJyBmb3IgaW50ZXJtZWRpYXRlIG5vZGUgYmV0d2VlbiB0aGVtXHJcbiAgICAvLyByZXR1cm5pbmcgbnVsbC91bmRlZmluZWQgbWVhbnMgYW4gZWRnZSBjYW4ndCBiZSBhZGRlZCBiZXR3ZWVuIHRoZSB0d28gbm9kZXNcclxuICAgIHJldHVybiAnZmxhdCc7XHJcbiAgfSxcclxuICBsb29wQWxsb3dlZDogZnVuY3Rpb24oIG5vZGUgKXtcclxuICAgIC8vIGZvciB0aGUgc3BlY2lmaWVkIG5vZGUsIHJldHVybiB3aGV0aGVyIGVkZ2VzIGZyb20gaXRzZWxmIHRvIGl0c2VsZiBhcmUgYWxsb3dlZFxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0sXHJcbiAgY2FuQ29ubmVjdDogZnVuY3Rpb24gY2FuQ29ubmVjdChzb3VyY2VOb2RlLCB0YXJnZXROb2RlKSB7XHJcbiAgICAvLyBkZXRlcm1pbmVzIGlmIHRoZSBjYW4gdGhlIHNvdXJjZSBub2RlIGNvbm5lY3QgdG8gdGhlIHRhcmdldCBub2RlXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9LFxyXG4gIG5vZGVMb29wT2Zmc2V0OiAtNTAsIC8vIG9mZnNldCBmb3IgZWRnZVR5cGU6ICdub2RlJyBsb29wc1xyXG4gIG5vZGVQYXJhbXM6IGZ1bmN0aW9uKCBzb3VyY2VOb2RlLCB0YXJnZXROb2RlICl7XHJcbiAgICAvLyBmb3IgZWRnZXMgYmV0d2VlbiB0aGUgc3BlY2lmaWVkIHNvdXJjZSBhbmQgdGFyZ2V0XHJcbiAgICAvLyByZXR1cm4gZWxlbWVudCBvYmplY3QgdG8gYmUgcGFzc2VkIHRvIGN5LmFkZCgpIGZvciBpbnRlcm1lZGlhcnkgbm9kZVxyXG4gICAgcmV0dXJuIHt9O1xyXG4gIH0sXHJcbiAgZWRnZVBhcmFtczogZnVuY3Rpb24oIHNvdXJjZU5vZGUsIHRhcmdldE5vZGUsIGkgKXtcclxuICAgIC8vIGZvciBlZGdlcyBiZXR3ZWVuIHRoZSBzcGVjaWZpZWQgc291cmNlIGFuZCB0YXJnZXRcclxuICAgIC8vIHJldHVybiBlbGVtZW50IG9iamVjdCB0byBiZSBwYXNzZWQgdG8gY3kuYWRkKCkgZm9yIGVkZ2VcclxuICAgIC8vIE5COiBpIGluZGljYXRlcyBlZGdlIGluZGV4IGluIGNhc2Ugb2YgZWRnZVR5cGU6ICdub2RlJ1xyXG4gICAgcmV0dXJuIHt9O1xyXG4gIH0sXHJcbiAgZ2hvc3RFZGdlUGFyYW1zOiBmdW5jdGlvbigpe1xyXG4gICAgLy8gcmV0dXJuIGVsZW1lbnQgb2JqZWN0IHRvIGJlIHBhc3NlZCB0byBjeS5hZGQoKSBmb3IgdGhlIGdob3N0IGVkZ2VcclxuICAgIC8vIChkZWZhdWx0IGNsYXNzZXMgYXJlIGFsd2F5cyBhZGRlZCBmb3IgeW91KVxyXG4gICAgcmV0dXJuIHt9O1xyXG4gIH0sXHJcbiAgc2hvdzogZnVuY3Rpb24oIHNvdXJjZU5vZGUgKXtcclxuICAgIC8vIGZpcmVkIHdoZW4gaGFuZGxlIGlzIHNob3duXHJcbiAgfSxcclxuICBoaWRlOiBmdW5jdGlvbiggc291cmNlTm9kZSApe1xyXG4gICAgLy8gZmlyZWQgd2hlbiB0aGUgaGFuZGxlIGlzIGhpZGRlblxyXG4gIH0sXHJcbiAgc3RhcnQ6IGZ1bmN0aW9uKCBzb3VyY2VOb2RlICl7XHJcbiAgICAvLyBmaXJlZCB3aGVuIGVkZ2VoYW5kbGVzIGludGVyYWN0aW9uIHN0YXJ0cyAoZHJhZyBvbiBoYW5kbGUpXHJcbiAgfSxcclxuICBjb21wbGV0ZTogZnVuY3Rpb24oIHNvdXJjZU5vZGUsIHRhcmdldE5vZGUsIGFkZGVkRWxlcyApe1xyXG4gICAgLy8gZmlyZWQgd2hlbiBlZGdlaGFuZGxlcyBpcyBkb25lIGFuZCBlbGVtZW50cyBhcmUgYWRkZWRcclxuICB9LFxyXG4gIHN0b3A6IGZ1bmN0aW9uKCBzb3VyY2VOb2RlICl7XHJcbiAgICAvLyBmaXJlZCB3aGVuIGVkZ2VoYW5kbGVzIGludGVyYWN0aW9uIGlzIHN0b3BwZWQgKGVpdGhlciBjb21wbGV0ZSB3aXRoIGFkZGVkIGVkZ2VzIG9yIGluY29tcGxldGUpXHJcbiAgfSxcclxuICBjYW5jZWw6IGZ1bmN0aW9uKCBzb3VyY2VOb2RlLCBjYW5jZWxsZWRUYXJnZXRzICl7XHJcbiAgICAvLyBmaXJlZCB3aGVuIGVkZ2VoYW5kbGVzIGFyZSBjYW5jZWxsZWQgKGluY29tcGxldGUgZ2VzdHVyZSlcclxuICB9LFxyXG4gIGhvdmVyb3ZlcjogZnVuY3Rpb24oIHNvdXJjZU5vZGUsIHRhcmdldE5vZGUgKXtcclxuICAgIC8vIGZpcmVkIHdoZW4gYSB0YXJnZXQgaXMgaG92ZXJlZFxyXG4gIH0sXHJcbiAgaG92ZXJvdXQ6IGZ1bmN0aW9uKCBzb3VyY2VOb2RlLCB0YXJnZXROb2RlICl7XHJcbiAgICAvLyBmaXJlZCB3aGVuIGEgdGFyZ2V0IGlzbid0IGhvdmVyZWQgYW55bW9yZVxyXG4gIH0sXHJcbiAgcHJldmlld29uOiBmdW5jdGlvbiggc291cmNlTm9kZSwgdGFyZ2V0Tm9kZSwgcHJldmlld0VsZXMgKXtcclxuICAgIC8vIGZpcmVkIHdoZW4gcHJldmlldyBpcyBzaG93blxyXG4gIH0sXHJcbiAgcHJldmlld29mZjogZnVuY3Rpb24oIHNvdXJjZU5vZGUsIHRhcmdldE5vZGUsIHByZXZpZXdFbGVzICl7XHJcbiAgICAvLyBmaXJlZCB3aGVuIHByZXZpZXcgaXMgaGlkZGVuXHJcbiAgfSxcclxuICBkcmF3b246IGZ1bmN0aW9uKCl7XHJcbiAgICAvLyBmaXJlZCB3aGVuIGRyYXcgbW9kZSBlbmFibGVkXHJcbiAgfSxcclxuICBkcmF3b2ZmOiBmdW5jdGlvbigpe1xyXG4gICAgLy8gZmlyZWQgd2hlbiBkcmF3IG1vZGUgZGlzYWJsZWRcclxuICB9XHJcbn07XHJcbi8qIGVzbGludC1lbmFibGUgKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lZGdlaGFuZGxlcy9kZWZhdWx0cy5qcyIsImZ1bmN0aW9uIHRvZ2dsZURyYXdNb2RlKCBib29sICl7XHJcbiAgbGV0IHsgY3ksIG9wdGlvbnMgfSA9IHRoaXM7XHJcblxyXG4gIHRoaXMuZHJhd01vZGUgPSBib29sICE9IG51bGwgPyBib29sIDogIXRoaXMuZHJhd01vZGU7XHJcblxyXG4gIGlmKCB0aGlzLmRyYXdNb2RlICl7XHJcbiAgICB0aGlzLnByZXZVbmdyYWJpZnlTdGF0ZSA9IGN5LmF1dG91bmdyYWJpZnkoKTtcclxuXHJcbiAgICBjeS5hdXRvdW5ncmFiaWZ5KCB0cnVlICk7XHJcblxyXG4gICAgaWYoICFvcHRpb25zLmhhbmRsZUluRHJhd01vZGUgJiYgdGhpcy5oYW5kbGVTaG93bigpICl7XHJcbiAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZW1pdCgnZHJhd29uJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGN5LmF1dG91bmdyYWJpZnkoIHRoaXMucHJldlVuZ3JhYmlmeVN0YXRlICk7XHJcblxyXG4gICAgdGhpcy5lbWl0KCdkcmF3b2ZmJyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpcztcclxufVxyXG5cclxuZnVuY3Rpb24gZW5hYmxlRHJhd01vZGUoKXtcclxuICByZXR1cm4gdGhpcy50b2dnbGVEcmF3TW9kZSggdHJ1ZSApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNhYmxlRHJhd01vZGUoKXtcclxuICByZXR1cm4gdGhpcy50b2dnbGVEcmF3TW9kZSggZmFsc2UgKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7IHRvZ2dsZURyYXdNb2RlLCBlbmFibGVEcmF3TW9kZSwgZGlzYWJsZURyYXdNb2RlIH07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lZGdlaGFuZGxlcy9kcmF3LW1vZGUuanMiLCJjb25zdCBhc3NpZ24gPSByZXF1aXJlKCcuLi9hc3NpZ24nKTtcclxuY29uc3QgaXNTdHJpbmcgPSB4ID0+IHR5cGVvZiB4ID09PSB0eXBlb2YgJyc7XHJcbmNvbnN0IGlzQXJyYXkgPSB4ID0+IHR5cGVvZiB4ID09PSB0eXBlb2YgW10gJiYgeC5sZW5ndGggIT0gbnVsbDtcclxuXHJcbmZ1bmN0aW9uIGdldEVsZUpzb24oIG92ZXJyaWRlcywgcGFyYW1zLCBhZGRlZENsYXNzZXMgKXtcclxuICBsZXQganNvbiA9IHt9O1xyXG5cclxuICAvLyBiYXNpYyB2YWx1ZXNcclxuICBhc3NpZ24oIGpzb24sIHBhcmFtcywgb3ZlcnJpZGVzICk7XHJcblxyXG4gIC8vIG1ha2Ugc3VyZSBwYXJhbXMgY2FuIHNwZWNpZnkgZGF0YSBidXQgdGhhdCBvdmVycmlkZXMgdGFrZSBwcmVjZWRlbmNlXHJcbiAgYXNzaWduKCBqc29uLmRhdGEsIHBhcmFtcy5kYXRhLCBvdmVycmlkZXMuZGF0YSApO1xyXG5cclxuICBpZiggaXNTdHJpbmcocGFyYW1zLmNsYXNzZXMpICl7XHJcbiAgICBqc29uLmNsYXNzZXMgPSBwYXJhbXMuY2xhc3NlcyArICcgJyArIGFkZGVkQ2xhc3NlcztcclxuICB9IGVsc2UgaWYoIGlzQXJyYXkocGFyYW1zLmNsYXNzZXMpICl7XHJcbiAgICBqc29uLmNsYXNzZXMgPSBwYXJhbXMuY2xhc3Nlcy5qb2luKCcgJykgKyAnICcgKyBhZGRlZENsYXNzZXM7XHJcbiAgfSBlbHNlIHtcclxuICAgIGpzb24uY2xhc3NlcyA9IGFkZGVkQ2xhc3NlcztcclxuICB9XHJcblxyXG4gIHJldHVybiBqc29uO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYWtlRWRnZXMoIHByZXZpZXcgPSBmYWxzZSApIHtcclxuICBsZXQgeyBjeSwgb3B0aW9ucywgcHJlc3VtcHRpdmVUYXJnZXRzLCBwcmV2aWV3RWxlcywgYWN0aXZlIH0gPSB0aGlzO1xyXG5cclxuICBsZXQgc291cmNlID0gdGhpcy5zb3VyY2VOb2RlO1xyXG4gIGxldCB0YXJnZXQgPSB0aGlzLnRhcmdldE5vZGU7XHJcbiAgbGV0IGNsYXNzZXMgPSBwcmV2aWV3ID8gJ2VoLXByZXZpZXcnIDogJyc7XHJcbiAgbGV0IGFkZGVkID0gY3kuY29sbGVjdGlvbigpO1xyXG4gIGxldCBlZGdlVHlwZSA9IG9wdGlvbnMuZWRnZVR5cGUoIHNvdXJjZSwgdGFyZ2V0ICk7XHJcblxyXG4gIC8vIGNhbid0IG1ha2UgZWRnZXMgb3V0c2lkZSBvZiByZWd1bGFyIGdlc3R1cmUgbGlmZWN5Y2xlXHJcbiAgaWYoICFhY3RpdmUgKXsgcmV0dXJuOyB9XHJcblxyXG4gIC8vIG11c3QgaGF2ZSBhIG5vbi1lbXB0eSBlZGdlIHR5cGVcclxuICBpZiggIWVkZ2VUeXBlICl7IHJldHVybjsgfVxyXG5cclxuICAvLyBjYW4ndCBtYWtlIHByZXZpZXcgaWYgZGlzYWJsZWRcclxuICBpZiggcHJldmlldyAmJiAhb3B0aW9ucy5wcmV2aWV3ICl7IHJldHVybjsgfVxyXG5cclxuICAvLyBkZXRlY3QgY2FuY2VsXHJcbiAgaWYoICF0YXJnZXQgfHwgdGFyZ2V0LnNpemUoKSA9PT0gMCApe1xyXG4gICAgcHJldmlld0VsZXMucmVtb3ZlKCk7XHJcblxyXG4gICAgdGhpcy5lbWl0KCAnY2FuY2VsJywgdGhpcy5tcCgpLCBzb3VyY2UsIHByZXN1bXB0aXZlVGFyZ2V0cyApO1xyXG5cclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIC8vIGp1c3QgcmVtb3ZlIHByZXZpZXcgY2xhc3MgaWYgd2UgYWxyZWFkeSBoYXZlIHRoZSBlZGdlc1xyXG4gIGlmKCAhcHJldmlldyAmJiBvcHRpb25zLnByZXZpZXcgKSB7XHJcbiAgICBwcmV2aWV3RWxlcy5yZW1vdmVDbGFzcygnZWgtcHJldmlldycpLnN0eWxlKCdldmVudHMnLCAnJyk7XHJcblxyXG4gICAgdGhpcy5lbWl0KCAnY29tcGxldGUnLCB0aGlzLm1wKCksIHNvdXJjZSwgdGFyZ2V0LCBwcmV2aWV3RWxlcyApO1xyXG5cclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGxldCBwMSA9IHNvdXJjZS5wb3NpdGlvbigpO1xyXG4gIGxldCBwMiA9IHRhcmdldC5wb3NpdGlvbigpO1xyXG5cclxuICBsZXQgcDtcclxuICBpZiggc291cmNlLnNhbWUoIHRhcmdldCApICkge1xyXG4gICAgcCA9IHtcclxuICAgICAgeDogcDEueCArIG9wdGlvbnMubm9kZUxvb3BPZmZzZXQsXHJcbiAgICAgIHk6IHAxLnkgKyBvcHRpb25zLm5vZGVMb29wT2Zmc2V0XHJcbiAgICB9O1xyXG4gIH0gZWxzZSB7XHJcbiAgICBwID0ge1xyXG4gICAgICB4OiAoIHAxLnggKyBwMi54ICkgLyAyLFxyXG4gICAgICB5OiAoIHAxLnkgKyBwMi55ICkgLyAyXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgaWYoIGVkZ2VUeXBlID09PSAnbm9kZScgKXtcclxuICAgIGxldCBpbnRlck5vZGUgPSBjeS5hZGQoXHJcbiAgICAgIGdldEVsZUpzb24oXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZ3JvdXA6ICdub2RlcycsXHJcbiAgICAgICAgICBwb3NpdGlvbjogcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3B0aW9ucy5ub2RlUGFyYW1zKCBzb3VyY2UsIHRhcmdldCApLFxyXG4gICAgICAgIGNsYXNzZXNcclxuICAgICAgKVxyXG4gICAgKTtcclxuXHJcbiAgICBsZXQgc291cmNlMmludGVyID0gY3kuYWRkKFxyXG4gICAgICBnZXRFbGVKc29uKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGdyb3VwOiAnZWRnZXMnLFxyXG4gICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBzb3VyY2U6IHNvdXJjZS5pZCgpLFxyXG4gICAgICAgICAgICB0YXJnZXQ6IGludGVyTm9kZS5pZCgpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvcHRpb25zLmVkZ2VQYXJhbXMoIHNvdXJjZSwgdGFyZ2V0LCAwICksXHJcbiAgICAgICAgY2xhc3Nlc1xyXG4gICAgICApXHJcbiAgICApO1xyXG5cclxuICAgIGxldCBpbnRlcjJ0YXJnZXQgPSBjeS5hZGQoXHJcbiAgICAgIGdldEVsZUpzb24oXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZ3JvdXA6ICdlZGdlcycsXHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHNvdXJjZTogaW50ZXJOb2RlLmlkKCksXHJcbiAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0LmlkKClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG9wdGlvbnMuZWRnZVBhcmFtcyggc291cmNlLCB0YXJnZXQsIDEgKSxcclxuICAgICAgICBjbGFzc2VzXHJcbiAgICAgIClcclxuICAgICk7XHJcblxyXG4gICAgYWRkZWQgPSBhZGRlZC5tZXJnZSggaW50ZXJOb2RlICkubWVyZ2UoIHNvdXJjZTJpbnRlciApLm1lcmdlKCBpbnRlcjJ0YXJnZXQgKTtcclxuICB9IGVsc2UgeyAvLyBmbGF0XHJcbiAgICBsZXQgc291cmNlMnRhcmdldCA9IGN5LmFkZChcclxuICAgICAgZ2V0RWxlSnNvbihcclxuICAgICAgICB7XHJcbiAgICAgICAgICBncm91cDogJ2VkZ2VzJyxcclxuICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgc291cmNlOiBzb3VyY2UuaWQoKSxcclxuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQuaWQoKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3B0aW9ucy5lZGdlUGFyYW1zKCBzb3VyY2UsIHRhcmdldCwgMCApLFxyXG4gICAgICAgIGNsYXNzZXNcclxuICAgICAgKVxyXG4gICAgKTtcclxuXHJcbiAgICBhZGRlZCA9IGFkZGVkLm1lcmdlKCBzb3VyY2UydGFyZ2V0ICk7XHJcbiAgfVxyXG5cclxuICBpZiggcHJldmlldyApIHtcclxuICAgIHRoaXMucHJldmlld0VsZXMgPSBhZGRlZDtcclxuXHJcbiAgICBhZGRlZC5zdHlsZSgnZXZlbnRzJywgJ25vJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGFkZGVkLnN0eWxlKCdldmVudHMnLCAnJyk7XHJcblxyXG4gICAgdGhpcy5lbWl0KCAnY29tcGxldGUnLCB0aGlzLm1wKCksIHNvdXJjZSwgdGFyZ2V0LCBhZGRlZCApO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1ha2VQcmV2aWV3KCkge1xyXG4gIHRoaXMubWFrZUVkZ2VzKCB0cnVlICk7XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwcmV2aWV3U2hvd24oKXtcclxuICByZXR1cm4gdGhpcy5wcmV2aWV3RWxlcy5ub25lbXB0eSgpICYmIHRoaXMucHJldmlld0VsZXMuaW5zaWRlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZVByZXZpZXcoKSB7XHJcbiAgaWYoIHRoaXMucHJldmlld1Nob3duKCkgKXtcclxuICAgIHRoaXMucHJldmlld0VsZXMucmVtb3ZlKCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpcztcclxufVxyXG5cclxuZnVuY3Rpb24gaGFuZGxlU2hvd24oKXtcclxuICByZXR1cm4gdGhpcy5oYW5kbGVOb2RlLm5vbmVtcHR5KCkgJiYgdGhpcy5oYW5kbGVOb2RlLmluc2lkZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVIYW5kbGUoKXtcclxuICBpZiggdGhpcy5oYW5kbGVTaG93bigpICl7XHJcbiAgICB0aGlzLmhhbmRsZU5vZGUucmVtb3ZlKCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpcztcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0SGFuZGxlRm9yKCBub2RlICl7XHJcbiAgbGV0IHsgb3B0aW9ucywgY3kgfSA9IHRoaXM7XHJcblxyXG4gIGxldCBoYW5kbGVQb3NpdGlvbiA9IHR5cGVvZiBvcHRpb25zLmhhbmRsZVBvc2l0aW9uID09PSB0eXBlb2YgJycgPyAoKSA9PiBvcHRpb25zLmhhbmRsZVBvc2l0aW9uIDogb3B0aW9ucy5oYW5kbGVQb3NpdGlvbjtcclxuXHJcbiAgbGV0IHAgPSBub2RlLnBvc2l0aW9uKCk7XHJcbiAgbGV0IGggPSBub2RlLm91dGVySGVpZ2h0KCk7XHJcbiAgbGV0IHcgPSBub2RlLm91dGVyV2lkdGgoKTtcclxuXHJcbiAgLy8gc3RvcmUgaG93IG11Y2ggd2Ugc2hvdWxkIG1vdmUgdGhlIGhhbmRsZSBmcm9tIG9yaWdpbihwLngsIHAueSlcclxuICBsZXQgbW92ZVggPSAwO1xyXG4gIGxldCBtb3ZlWSA9IDA7XHJcblxyXG4gIC8vIGdyYWIgYXhlc1xyXG4gIGxldCBheGVzID0gaGFuZGxlUG9zaXRpb24oIG5vZGUgKS50b0xvd2VyQ2FzZSgpLnNwbGl0KC9cXHMrLyk7XHJcbiAgbGV0IGF4aXNYID0gYXhlc1swXTtcclxuICBsZXQgYXhpc1kgPSBheGVzWzFdO1xyXG5cclxuICAvLyBiYXNlZCBvbiBoYW5kbGVQb3NpdGlvbiBtb3ZlIGxlZnQvcmlnaHQvdG9wL2JvdHRvbS4gTWlkZGxlL21pZGRsZSB3aWxsIGp1c3QgYmUgbm9ybWFsXHJcbiAgaWYoIGF4aXNYID09PSAnbGVmdCcgKXtcclxuICAgIG1vdmVYID0gLSh3IC8gMik7XHJcbiAgfSBlbHNlIGlmKCBheGlzWCA9PT0gJ3JpZ2h0JyApe1xyXG4gICAgbW92ZVggPSB3IC8gMjtcclxuICB9IGlmKCBheGlzWSA9PT0gJ3RvcCcgKXtcclxuICAgIG1vdmVZID0gLShoIC8gMik7XHJcbiAgfSBlbHNlIGlmKCBheGlzWSA9PT0gJ2JvdHRvbScgKXtcclxuICAgIG1vdmVZID0gaCAvIDI7XHJcbiAgfVxyXG5cclxuICAvLyBzZXQgaGFuZGxlIHggYW5kIHkgYmFzZWQgb24gYWRqdXN0ZWQgcG9zaXRpb25zXHJcbiAgbGV0IGh4ID0gdGhpcy5oeCA9IHAueCArIG1vdmVYO1xyXG4gIGxldCBoeSA9IHRoaXMuaHkgPSBwLnkgKyBtb3ZlWTtcclxuICBsZXQgcG9zID0geyB4OiBoeCwgeTogaHkgfTtcclxuXHJcbiAgaWYoIHRoaXMuaGFuZGxlU2hvd24oKSApe1xyXG4gICAgdGhpcy5oYW5kbGVOb2RlLnBvc2l0aW9uKCBwb3MgKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY3kuYmF0Y2goICgpID0+IHtcclxuICAgICAgdGhpcy5oYW5kbGVOb2RlID0gY3kuYWRkKHtcclxuICAgICAgICBjbGFzc2VzOiAnZWgtaGFuZGxlJyxcclxuICAgICAgICBwb3NpdGlvbjogcG9zLFxyXG4gICAgICAgIGdyYWJiYWJsZTogZmFsc2UsXHJcbiAgICAgICAgc2VsZWN0YWJsZTogZmFsc2VcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLmhhbmRsZU5vZGUuc3R5bGUoJ3otaW5kZXgnLCA5MDA3MTk5MjU0NzQwOTkxKTtcclxuICAgIH0gKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVFZGdlKCkge1xyXG4gIGxldCB7IHNvdXJjZU5vZGUsIGdob3N0Tm9kZSwgY3ksIG14LCBteSwgb3B0aW9ucyB9ID0gdGhpcztcclxuICBsZXQgeCA9IG14O1xyXG4gIGxldCB5ID0gbXk7XHJcbiAgbGV0IGdob3N0RWRnZSwgZ2hvc3RFbGVzO1xyXG5cclxuICAvLyBjYW4ndCBkcmF3IGEgbGluZSB3aXRob3V0IGhhdmluZyB0aGUgc3RhcnRpbmcgbm9kZVxyXG4gIGlmKCAhc291cmNlTm9kZSApeyByZXR1cm47IH1cclxuXHJcbiAgaWYoICFnaG9zdE5vZGUgfHwgZ2hvc3ROb2RlLmxlbmd0aCA9PT0gMCB8fCBnaG9zdE5vZGUucmVtb3ZlZCgpICkge1xyXG4gICAgZ2hvc3RFbGVzID0gdGhpcy5naG9zdEVsZXMgPSBjeS5jb2xsZWN0aW9uKCk7XHJcblxyXG4gICAgY3kuYmF0Y2goICgpID0+IHtcclxuICAgICAgZ2hvc3ROb2RlID0gdGhpcy5naG9zdE5vZGUgPSBjeS5hZGQoIHtcclxuICAgICAgICBncm91cDogJ25vZGVzJyxcclxuICAgICAgICBjbGFzc2VzOiAnZWgtZ2hvc3QgZWgtZ2hvc3Qtbm9kZScsXHJcbiAgICAgICAgcG9zaXRpb246IHtcclxuICAgICAgICAgIHg6IDAsXHJcbiAgICAgICAgICB5OiAwXHJcbiAgICAgICAgfVxyXG4gICAgICB9ICk7XHJcblxyXG4gICAgICBnaG9zdE5vZGUuc3R5bGUoe1xyXG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogJ2JsdWUnLFxyXG4gICAgICAgICd3aWR0aCc6IDAuMDAwMSxcclxuICAgICAgICAnaGVpZ2h0JzogMC4wMDAxLFxyXG4gICAgICAgICdvcGFjaXR5JzogMCxcclxuICAgICAgICAnZXZlbnRzJzogJ25vJ1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGxldCBnaG9zdEVkZ2VQYXJhbXMgPSBvcHRpb25zLmdob3N0RWRnZVBhcmFtcygpO1xyXG5cclxuICAgICAgZ2hvc3RFZGdlID0gY3kuYWRkKCBhc3NpZ24oe30sIGdob3N0RWRnZVBhcmFtcywge1xyXG4gICAgICAgIGdyb3VwOiAnZWRnZXMnLFxyXG4gICAgICAgIGRhdGE6IGFzc2lnbih7fSwgZ2hvc3RFZGdlUGFyYW1zLmRhdGEsIHtcclxuICAgICAgICAgIHNvdXJjZTogc291cmNlTm9kZS5pZCgpLFxyXG4gICAgICAgICAgdGFyZ2V0OiBnaG9zdE5vZGUuaWQoKVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGNsYXNzZXM6ICdlaC1naG9zdCBlaC1naG9zdC1lZGdlJ1xyXG4gICAgICB9KSApO1xyXG5cclxuICAgICAgZ2hvc3RFZGdlLnN0eWxlKHtcclxuICAgICAgICAnZXZlbnRzJzogJ25vJ1xyXG4gICAgICB9KTtcclxuICAgIH0gKTtcclxuXHJcbiAgICBnaG9zdEVsZXMubWVyZ2UoIGdob3N0Tm9kZSApLm1lcmdlKCBnaG9zdEVkZ2UgKTtcclxuICB9XHJcblxyXG4gIGdob3N0Tm9kZS5wb3NpdGlvbih7IHgsIHkgfSk7XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBtYWtlRWRnZXMsIG1ha2VQcmV2aWV3LCByZW1vdmVQcmV2aWV3LCBwcmV2aWV3U2hvd24sXHJcbiAgdXBkYXRlRWRnZSxcclxuICBoYW5kbGVTaG93biwgc2V0SGFuZGxlRm9yLCByZW1vdmVIYW5kbGVcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VkZ2VoYW5kbGVzL2RyYXdpbmcuanMiLCJmdW5jdGlvbiBkaXNhYmxlRWRnZUV2ZW50cygpe1xyXG4gIGlmKCB0aGlzLm9wdGlvbnMubm9FZGdlRXZlbnRzSW5EcmF3ICl7XHJcbiAgICB0aGlzLmN5LmVkZ2VzKCkuc3R5bGUoJ2V2ZW50cycsICdubycpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGVuYWJsZUVkZ2VFdmVudHMoKXtcclxuICBpZiggdGhpcy5vcHRpb25zLm5vRWRnZUV2ZW50c0luRHJhdyApe1xyXG4gICAgdGhpcy5jeS5lZGdlcygpLnN0eWxlKCdldmVudHMnLCAnJyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpcztcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7IGRpc2FibGVFZGdlRXZlbnRzLCBlbmFibGVFZGdlRXZlbnRzIH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VkZ2VoYW5kbGVzL2VkZ2UtZXZlbnRzLXRvZ2dsZS5qcyIsImZ1bmN0aW9uIGVuYWJsZSgpe1xyXG4gIHRoaXMuZW5hYmxlZCA9IHRydWU7XHJcblxyXG4gIHRoaXMuZW1pdCgnZW5hYmxlJyk7XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNhYmxlKCl7XHJcbiAgdGhpcy5lbmFibGVkID0gZmFsc2U7XHJcblxyXG4gIHRoaXMuZW1pdCgnZGlzYWJsZScpO1xyXG5cclxuICByZXR1cm4gdGhpcztcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7IGVuYWJsZSwgZGlzYWJsZSB9O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZWRnZWhhbmRsZXMvZW5hYmxpbmcuanMiLCJjb25zdCBtZW1vaXplID0gcmVxdWlyZSgnbG9kYXNoLm1lbW9pemUnKTtcclxuY29uc3Qgc3FydDIgPSBNYXRoLnNxcnQoMik7XHJcblxyXG5mdW5jdGlvbiBjYW5TdGFydE9uKCBub2RlICl7XHJcbiAgY29uc3QgeyBvcHRpb25zLCBwcmV2aWV3RWxlcywgZ2hvc3RFbGVzLCBoYW5kbGVOb2RlIH0gPSB0aGlzO1xyXG4gIGNvbnN0IGlzUHJldmlldyA9IGVsID0+IHByZXZpZXdFbGVzLmFueVNhbWUoZWwpO1xyXG4gIGNvbnN0IGlzR2hvc3QgPSBlbCA9PiBnaG9zdEVsZXMuYW55U2FtZShlbCk7XHJcbiAgY29uc3QgdXNlckZpbHRlciA9IGVsID0+IGVsLmZpbHRlciggb3B0aW9ucy5oYW5kbGVOb2RlcyApLmxlbmd0aCA+IDA7XHJcbiAgY29uc3QgaXNIYW5kbGUgPSBlbCA9PiBoYW5kbGVOb2RlLnNhbWUoZWwpO1xyXG4gIGNvbnN0IGlzVGVtcCA9IGVsID0+IGlzUHJldmlldyhlbCkgfHwgaXNIYW5kbGUoZWwpIHx8IGlzR2hvc3QoZWwpO1xyXG5cclxuICBjb25zdCB7IGVuYWJsZWQsIGFjdGl2ZSwgZ3JhYmJpbmdOb2RlIH0gPSB0aGlzO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgZW5hYmxlZCAmJiAhYWN0aXZlICYmICFncmFiYmluZ05vZGVcclxuICAgICYmICggbm9kZSA9PSBudWxsIHx8ICghaXNUZW1wKG5vZGUpICYmIHVzZXJGaWx0ZXIobm9kZSkpIClcclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjYW5TdGFydERyYXdNb2RlT24oIG5vZGUgKXtcclxuICByZXR1cm4gdGhpcy5jYW5TdGFydE9uKCBub2RlICkgJiYgdGhpcy5kcmF3TW9kZTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2FuU3RhcnROb25EcmF3TW9kZU9uKCBub2RlICl7XHJcbiAgcmV0dXJuIHRoaXMuY2FuU3RhcnRPbiggbm9kZSApICYmICF0aGlzLmRyYXdNb2RlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93KCBub2RlICl7XHJcbiAgbGV0IHsgb3B0aW9ucywgZHJhd01vZGUgfSA9IHRoaXM7XHJcblxyXG4gIGlmKCAhdGhpcy5jYW5TdGFydE9uKG5vZGUpIHx8ICggZHJhd01vZGUgJiYgIW9wdGlvbnMuaGFuZGxlSW5EcmF3TW9kZSApICl7IHJldHVybjsgfVxyXG5cclxuICB0aGlzLnNvdXJjZU5vZGUgPSBub2RlO1xyXG5cclxuICB0aGlzLnNldEhhbmRsZUZvciggbm9kZSApO1xyXG5cclxuICB0aGlzLmVtaXQoICdzaG93JywgdGhpcy5ocCgpLCB0aGlzLnNvdXJjZU5vZGUgKTtcclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZGUoKXtcclxuICB0aGlzLnJlbW92ZUhhbmRsZSgpO1xyXG5cclxuICB0aGlzLmVtaXQoICdoaWRlJywgdGhpcy5ocCgpLCB0aGlzLnNvdXJjZU5vZGUgKTtcclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0YXJ0KCBub2RlICl7XHJcbiAgaWYoICF0aGlzLmNhblN0YXJ0T24obm9kZSkgKXsgcmV0dXJuOyB9XHJcblxyXG4gIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgdGhpcy5zb3VyY2VOb2RlID0gbm9kZTtcclxuICB0aGlzLnNvdXJjZU5vZGUuYWRkQ2xhc3MoJ2VoLXNvdXJjZScpO1xyXG5cclxuICB0aGlzLmRpc2FibGVHZXN0dXJlcygpO1xyXG4gIHRoaXMuZGlzYWJsZUVkZ2VFdmVudHMoKTtcclxuXHJcbiAgdGhpcy5lbWl0KCAnc3RhcnQnLCB0aGlzLmhwKCksIG5vZGUgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlKCBwb3MgKXtcclxuICBpZiggIXRoaXMuYWN0aXZlICl7IHJldHVybjsgfVxyXG5cclxuICBsZXQgcCA9IHBvcztcclxuXHJcbiAgdGhpcy5teCA9IHAueDtcclxuICB0aGlzLm15ID0gcC55O1xyXG5cclxuICB0aGlzLnVwZGF0ZUVkZ2UoKTtcclxuICB0aGlzLnRocm90dGxlZFNuYXAoKTtcclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNuYXAoKXtcclxuICBpZiggIXRoaXMuYWN0aXZlIHx8ICF0aGlzLm9wdGlvbnMuc25hcCApeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcbiAgbGV0IGN5ID0gdGhpcy5jeTtcclxuICBsZXQgdGd0ID0gdGhpcy50YXJnZXROb2RlO1xyXG4gIGxldCB0aHJlc2hvbGQgPSB0aGlzLm9wdGlvbnMuc25hcFRocmVzaG9sZDtcclxuICBsZXQgbW91c2VQb3MgPSB0aGlzLm1wKCk7XHJcbiAgbGV0IHsgaGFuZGxlTm9kZSwgcHJldmlld0VsZXMsIGdob3N0Tm9kZSB9ID0gdGhpcztcclxuXHJcbiAgbGV0IHJhZGl1cyA9IG4gPT4gc3FydDIgKiBNYXRoLm1heChuLm91dGVyV2lkdGgoKSwgbi5vdXRlckhlaWdodCgpKS8yOyAvLyB3b3JzdC1jYXNlIGVuY2xvc3VyZSBvZiBiYiBieSBjaXJjbGVcclxuICBsZXQgc3FEaXN0ID0gKHgxLCB5MSwgeDIsIHkyKSA9PiB7IGxldCBkeCA9IHgyIC0geDE7IGxldCBkeSA9IHkyIC0geTE7IHJldHVybiBkeCpkeCArIGR5KmR5OyB9O1xyXG4gIGxldCBzcURpc3RCeVB0ID0gKHAxLCBwMikgPT4gc3FEaXN0KHAxLngsIHAxLnksIHAyLngsIHAyLnkpO1xyXG4gIGxldCBub2RlU3FEaXN0ID0gbiA9PiBzcURpc3RCeVB0KG4ucG9zaXRpb24oKSwgbW91c2VQb3MpO1xyXG5cclxuICBsZXQgc3FUaHJlc2hvbGQgPSBuID0+IHsgbGV0IHIgPSByYWRpdXMobik7IGxldCB0ID0gciArIHRocmVzaG9sZDsgcmV0dXJuIHQgKiB0OyB9O1xyXG4gIGxldCBpc1dpdGhpblRocmVzaG9sZCA9IG4gPT4gbm9kZVNxRGlzdChuKSA8PSBzcVRocmVzaG9sZChuKTtcclxuXHJcbiAgbGV0IGJiU3FEaXN0ID0gbiA9PiB7XHJcbiAgICBsZXQgcCA9IG4ucG9zaXRpb24oKTtcclxuICAgIGxldCBoYWxmVyA9IG4ub3V0ZXJXaWR0aCgpIC8gMjtcclxuICAgIGxldCBoYWxmSCA9IG4ub3V0ZXJIZWlnaHQoKSAvIDI7XHJcblxyXG4gICAgLy8gbm9kZSBhbmQgbW91c2UgcG9zaXRpb25zLCBsaW5lIGlzIGZvcm1lZCBmcm9tIG5vZGUgdG8gbW91c2VcclxuICAgIGxldCBueCA9IHAueDtcclxuICAgIGxldCBueSA9IHAueTtcclxuICAgIGxldCBteCA9IG1vdXNlUG9zLng7XHJcbiAgICBsZXQgbXkgPSBtb3VzZVBvcy55O1xyXG5cclxuICAgIC8vIGJvdW5kaW5nIGJveFxyXG4gICAgbGV0IHgxID0gbnggLSBoYWxmVztcclxuICAgIGxldCB4MiA9IG54ICsgaGFsZlc7XHJcbiAgICBsZXQgeTEgPSBueSAtIGhhbGZIO1xyXG4gICAgbGV0IHkyID0gbnkgKyBoYWxmSDtcclxuXHJcbiAgICBsZXQgaW5zaWRlWEJvdW5kcyA9IHgxIDw9IG14ICYmIG14IDw9IHgyO1xyXG4gICAgbGV0IGluc2lkZVlCb3VuZHMgPSB5MSA8PSBteSAmJiBteSA8PSB5MjtcclxuXHJcbiAgICBpZiggaW5zaWRlWEJvdW5kcyAmJiBpbnNpZGVZQm91bmRzICl7IC8vIGluc2lkZSBib3hcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9IGVsc2UgaWYoIGluc2lkZVhCb3VuZHMgKXsgLy8gcGVycGVuZGljdWxhciBkaXN0YW5jZSB0byBib3gsIHRvcCBvciBib3R0b21cclxuICAgICAgbGV0IGR5MSA9IG15IC0geTE7XHJcbiAgICAgIGxldCBkeTIgPSBteSAtIHkyO1xyXG5cclxuICAgICAgcmV0dXJuIE1hdGgubWluKGR5MSAqIGR5MSwgZHkyICogZHkyKTtcclxuICAgIH0gZWxzZSBpZiggaW5zaWRlWUJvdW5kcyApeyAvLyBwZXJwZW5kaWN1bGFyIGRpc3RhbmNlIHRvIGJveCwgbGVmdCBvciByaWdodFxyXG4gICAgICBsZXQgZHgxID0gbXggLSB4MTtcclxuICAgICAgbGV0IGR4MiA9IG14IC0geDI7XHJcblxyXG4gICAgICByZXR1cm4gTWF0aC5taW4oZHgxICogZHgxLCBkeDIgKiBkeDIpO1xyXG4gICAgfSBlbHNlIGlmKCBteCA8IHgxICYmIG15IDwgeTEgKXsgLy8gdG9wLWxlZnQgY29ybmVyIGRpc3RhbmNlXHJcbiAgICAgIHJldHVybiBzcURpc3QobXgsIG15LCB4MSwgeTEpO1xyXG4gICAgfSBlbHNlIGlmKCBteCA+IHgyICYmIG15IDwgeTEgKXsgLy8gdG9wLXJpZ2h0IGNvcm5lciBkaXN0YW5jZVxyXG4gICAgICByZXR1cm4gc3FEaXN0KG14LCBteSwgeDIsIHkxKTtcclxuICAgIH0gZWxzZSBpZiggbXggPCB4MSAmJiBteSA+IHkyICl7IC8vIGJvdHRvbS1sZWZ0IGNvcm5lciBkaXN0YW5jZVxyXG4gICAgICByZXR1cm4gc3FEaXN0KG14LCBteSwgeDEsIHkyKTtcclxuICAgIH0gZWxzZSB7IC8vIGJvdHRvbS1yaWdodCBjb3JuZXIgZGlzdGFuY2VcclxuICAgICAgcmV0dXJuIHNxRGlzdChteCwgbXksIHgyLCB5Mik7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgbGV0IGNtcEJiU3FEaXN0ID0gKG4xLCBuMikgPT4gYmJTcURpc3QobjEpIC0gYmJTcURpc3QobjIpO1xyXG5cclxuICBsZXQgY21wID0gY21wQmJTcURpc3Q7XHJcblxyXG4gIGxldCBhbGxvd0hvdmVyRGVsYXkgPSBmYWxzZTtcclxuXHJcbiAgbGV0IG1vdXNlSXNJbnNpZGUgPSBuID0+IHtcclxuICAgIGxldCBtcCA9IG1vdXNlUG9zO1xyXG4gICAgbGV0IHcgPSBuLm91dGVyV2lkdGgoKTtcclxuICAgIGxldCBoYWxmVyA9IHcvMjtcclxuICAgIGxldCBoID0gbi5vdXRlckhlaWdodCgpO1xyXG4gICAgbGV0IGhhbGZIID0gaC8yO1xyXG4gICAgbGV0IHAgPSBuLnBvc2l0aW9uKCk7XHJcbiAgICBsZXQgeDEgPSBwLnggLSBoYWxmVztcclxuICAgIGxldCB4MiA9IHAueCArIGhhbGZXO1xyXG4gICAgbGV0IHkxID0gcC55IC0gaGFsZkg7XHJcbiAgICBsZXQgeTIgPSBwLnkgKyBoYWxmSDtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgICB4MSA8PSBtcC54ICYmIG1wLnggPD0geDJcclxuICAgICAgJiYgeTEgPD0gbXAueSAmJiBtcC55IDw9IHkyXHJcbiAgICApO1xyXG4gIH07XHJcblxyXG4gIGxldCBpc0VoRWxlID0gbiA9PiBuLnNhbWUoaGFuZGxlTm9kZSkgfHwgbi5zYW1lKHByZXZpZXdFbGVzKSB8fCBuLnNhbWUoZ2hvc3ROb2RlKTtcclxuXHJcbiAgbGV0IG5vZGVzQnlEaXN0ID0gY3kubm9kZXMobiA9PiAhaXNFaEVsZShuKSAmJiBpc1dpdGhpblRocmVzaG9sZChuKSkuc29ydChjbXApO1xyXG4gIGxldCBzbmFwcGVkID0gZmFsc2U7XHJcblxyXG4gIGlmKCB0Z3Qubm9uZW1wdHkoKSAmJiAhaXNXaXRoaW5UaHJlc2hvbGQodGd0KSApe1xyXG4gICAgdGhpcy51bnByZXZpZXcodGd0KTtcclxuICB9XHJcblxyXG4gIGZvcihsZXQgaSA9IDA7IGkgPCBub2Rlc0J5RGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICBsZXQgbiA9IG5vZGVzQnlEaXN0W2ldO1xyXG5cclxuICAgIC8vIHNraXAgYSBwYXJlbnQgbm9kZSB3aGVuIHRoZSBtb3VzZSBpcyBpbnNpZGUgaXRcclxuICAgIGlmKCBuLmlzUGFyZW50KCkgJiYgbW91c2VJc0luc2lkZShuKSApeyBjb250aW51ZTsgfVxyXG5cclxuICAgIC8vIHNraXAgYSBjaGlsZCBub2RlIHdoZW4gdGhlIG1vdXNlIGlzIG5vdCBpbnNpZGUgdGhlIHBhcmVudFxyXG4gICAgaWYoIG4uaXNDaGlsZCgpICYmICFtb3VzZUlzSW5zaWRlKG4ucGFyZW50KCkpICl7IGNvbnRpbnVlOyB9XHJcblxyXG4gICAgaWYoIG4uc2FtZSh0Z3QpIHx8IHRoaXMucHJldmlldyhuLCBhbGxvd0hvdmVyRGVsYXkpICl7XHJcbiAgICAgIHNuYXBwZWQgPSB0cnVlO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBzbmFwcGVkO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwcmV2aWV3KCB0YXJnZXQsIGFsbG93SG92ZXJEZWxheSA9IHRydWUgKXtcclxuICBsZXQgeyBvcHRpb25zLCBzb3VyY2VOb2RlLCBnaG9zdE5vZGUsIGdob3N0RWxlcywgcHJlc3VtcHRpdmVUYXJnZXRzLCBwcmV2aWV3RWxlcywgYWN0aXZlIH0gPSB0aGlzO1xyXG4gIGxldCBzb3VyY2UgPSBzb3VyY2VOb2RlO1xyXG4gIGxldCBpc0xvb3AgPSB0YXJnZXQuc2FtZSggc291cmNlICk7XHJcbiAgbGV0IGxvb3BBbGxvd2VkID0gb3B0aW9ucy5sb29wQWxsb3dlZCggdGFyZ2V0ICk7XHJcbiAgbGV0IGlzR2hvc3QgPSB0YXJnZXQuc2FtZSggZ2hvc3ROb2RlICk7XHJcbiAgbGV0IG5vRWRnZSA9ICFvcHRpb25zLmVkZ2VUeXBlKCBzb3VyY2UsIHRhcmdldCApO1xyXG4gIGxldCBpc0hhbmRsZSA9IHRhcmdldC5zYW1lKCB0aGlzLmhhbmRsZU5vZGUgKTtcclxuICBsZXQgaXNFeGlzdGluZ1RndCA9IHRhcmdldC5zYW1lKCB0aGlzLnRhcmdldE5vZGUgKTtcclxuXHJcbiAgaWYoIWFjdGl2ZSB8fCBpc0hhbmRsZSB8fCBpc0dob3N0IHx8IG5vRWRnZSB8fCBpc0V4aXN0aW5nVGd0IHx8IChpc0xvb3AgJiYgIWxvb3BBbGxvd2VkKSB8fCAoIW9wdGlvbnMuY2FuQ29ubmVjdChzb3VyY2UsIHRhcmdldCkpKXtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGlmKCB0aGlzLnRhcmdldE5vZGUubm9uZW1wdHkoKSApe1xyXG4gICAgdGhpcy51bnByZXZpZXcoIHRoaXMudGFyZ2V0Tm9kZSApO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJUaW1lb3V0KCB0aGlzLnByZXZpZXdUaW1lb3V0ICk7XHJcblxyXG4gIGxldCBhcHBseVByZXZpZXcgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnRhcmdldE5vZGUgPSB0YXJnZXQ7XHJcblxyXG4gICAgcHJlc3VtcHRpdmVUYXJnZXRzLm1lcmdlKCB0YXJnZXQgKTtcclxuXHJcbiAgICB0YXJnZXQuYWRkQ2xhc3MoJ2VoLXByZXN1bXB0aXZlLXRhcmdldCcpO1xyXG4gICAgdGFyZ2V0LmFkZENsYXNzKCdlaC10YXJnZXQnKTtcclxuXHJcbiAgICB0aGlzLmVtaXQoICdob3Zlcm92ZXInLCB0aGlzLm1wKCksIHNvdXJjZSwgdGFyZ2V0ICk7XHJcblxyXG4gICAgaWYoIG9wdGlvbnMucHJldmlldyApe1xyXG4gICAgICB0YXJnZXQuYWRkQ2xhc3MoJ2VoLXByZXZpZXcnKTtcclxuXHJcbiAgICAgIGdob3N0RWxlcy5hZGRDbGFzcygnZWgtcHJldmlldy1hY3RpdmUnKTtcclxuICAgICAgc291cmNlTm9kZS5hZGRDbGFzcygnZWgtcHJldmlldy1hY3RpdmUnKTtcclxuICAgICAgdGFyZ2V0LmFkZENsYXNzKCdlaC1wcmV2aWV3LWFjdGl2ZScpO1xyXG5cclxuICAgICAgdGhpcy5tYWtlUHJldmlldygpO1xyXG5cclxuICAgICAgdGhpcy5lbWl0KCAncHJldmlld29uJywgdGhpcy5tcCgpLCBzb3VyY2UsIHRhcmdldCwgcHJldmlld0VsZXMgKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBpZiggYWxsb3dIb3ZlckRlbGF5ICYmIG9wdGlvbnMuaG92ZXJEZWxheSA+IDAgKXtcclxuICAgIHRoaXMucHJldmlld1RpbWVvdXQgPSBzZXRUaW1lb3V0KCBhcHBseVByZXZpZXcsIG9wdGlvbnMuaG92ZXJEZWxheSApO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhcHBseVByZXZpZXcoKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1bnByZXZpZXcoIHRhcmdldCApIHtcclxuICBpZiggIXRoaXMuYWN0aXZlIHx8IHRhcmdldC5zYW1lKCB0aGlzLmhhbmRsZU5vZGUgKSApeyByZXR1cm47IH1cclxuXHJcbiAgbGV0IHsgcHJldmlld1RpbWVvdXQsIHNvdXJjZU5vZGUsIHByZXZpZXdFbGVzLCBnaG9zdEVsZXMsIGN5IH0gPSB0aGlzO1xyXG4gIGNsZWFyVGltZW91dCggcHJldmlld1RpbWVvdXQgKTtcclxuICB0aGlzLnByZXZpZXdUaW1lb3V0ID0gbnVsbDtcclxuXHJcbiAgbGV0IHNvdXJjZSA9IHNvdXJjZU5vZGU7XHJcblxyXG4gIHRhcmdldC5yZW1vdmVDbGFzcygnZWgtcHJldmlldyBlaC10YXJnZXQgZWgtcHJlc3VtcHRpdmUtdGFyZ2V0IGVoLXByZXZpZXctYWN0aXZlJyk7XHJcbiAgZ2hvc3RFbGVzLnJlbW92ZUNsYXNzKCdlaC1wcmV2aWV3LWFjdGl2ZScpO1xyXG4gIHNvdXJjZU5vZGUucmVtb3ZlQ2xhc3MoJ2VoLXByZXZpZXctYWN0aXZlJyk7XHJcblxyXG4gIHRoaXMudGFyZ2V0Tm9kZSA9IGN5LmNvbGxlY3Rpb24oKTtcclxuXHJcbiAgdGhpcy5yZW1vdmVQcmV2aWV3KCBzb3VyY2UsIHRhcmdldCApO1xyXG5cclxuICB0aGlzLmVtaXQoICdob3Zlcm91dCcsIHRoaXMubXAoKSwgc291cmNlLCB0YXJnZXQgKTtcclxuICB0aGlzLmVtaXQoICdwcmV2aWV3b2ZmJywgdGhpcy5tcCgpLCBzb3VyY2UsIHRhcmdldCwgcHJldmlld0VsZXMgKTtcclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0b3AoKXtcclxuICBpZiggIXRoaXMuYWN0aXZlICl7IHJldHVybjsgfVxyXG5cclxuICBsZXQgeyBzb3VyY2VOb2RlLCB0YXJnZXROb2RlLCBnaG9zdEVsZXMsIHByZXN1bXB0aXZlVGFyZ2V0cyB9ID0gdGhpcztcclxuXHJcbiAgY2xlYXJUaW1lb3V0KCB0aGlzLnByZXZpZXdUaW1lb3V0ICk7XHJcblxyXG4gIHNvdXJjZU5vZGUucmVtb3ZlQ2xhc3MoJ2VoLXNvdXJjZSBlaC1wcmV2aWV3LWFjdGl2ZScpO1xyXG4gIHRhcmdldE5vZGUucmVtb3ZlQ2xhc3MoJ2VoLXRhcmdldCBlaC1wcmV2aWV3IGVoLWhvdmVyIGVoLXByZXZpZXctYWN0aXZlJyk7XHJcbiAgcHJlc3VtcHRpdmVUYXJnZXRzLnJlbW92ZUNsYXNzKCdlaC1wcmVzdW1wdGl2ZS10YXJnZXQnKTtcclxuXHJcbiAgdGhpcy5tYWtlRWRnZXMoKTtcclxuXHJcbiAgdGhpcy5yZW1vdmVIYW5kbGUoKTtcclxuXHJcbiAgZ2hvc3RFbGVzLnJlbW92ZSgpO1xyXG5cclxuICB0aGlzLmNsZWFyQ29sbGVjdGlvbnMoKTtcclxuXHJcbiAgdGhpcy5yZXNldEdlc3R1cmVzKCk7XHJcbiAgdGhpcy5lbmFibGVFZGdlRXZlbnRzKCk7XHJcblxyXG4gIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gIHRoaXMuZW1pdCggJ3N0b3AnLCB0aGlzLm1wKCksIHNvdXJjZU5vZGUgKTtcclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIHNob3csIGhpZGUsIHN0YXJ0LCB1cGRhdGUsIHByZXZpZXcsIHVucHJldmlldywgc3RvcCwgc25hcCxcclxuICBjYW5TdGFydE9uLCBjYW5TdGFydERyYXdNb2RlT24sIGNhblN0YXJ0Tm9uRHJhd01vZGVPblxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZWRnZWhhbmRsZXMvZ2VzdHVyZS1saWZlY3ljbGUuanMiLCJjb25zdCBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcclxuY29uc3QgYXNzaWduID0gcmVxdWlyZSgnLi4vYXNzaWduJyk7XHJcbmNvbnN0IHRocm90dGxlID0gcmVxdWlyZSgnbG9kYXNoLnRocm90dGxlJyk7XHJcblxyXG5jb25zdCBjeUdlc3R1cmVzVG9nZ2xlID0gcmVxdWlyZSgnLi9jeS1nZXN0dXJlcy10b2dnbGUnKTtcclxuY29uc3QgY3lMaXN0ZW5lcnMgPSByZXF1aXJlKCcuL2N5LWxpc3RlbmVycycpO1xyXG5jb25zdCBkcmF3TW9kZSA9IHJlcXVpcmUoJy4vZHJhdy1tb2RlJyk7XHJcbmNvbnN0IGRyYXdpbmcgPSByZXF1aXJlKCcuL2RyYXdpbmcnKTtcclxuY29uc3QgZW5hYmxpbmcgPSByZXF1aXJlKCcuL2VuYWJsaW5nJyk7XHJcbmNvbnN0IGdlc3R1cmVMaWZlY3ljbGUgPSByZXF1aXJlKCcuL2dlc3R1cmUtbGlmZWN5Y2xlJyk7XHJcbmNvbnN0IGxpc3RlbmVycyA9IHJlcXVpcmUoJy4vbGlzdGVuZXJzJyk7XHJcbmNvbnN0IGVkZ2VFdmVudHMgPSByZXF1aXJlKCcuL2VkZ2UtZXZlbnRzLXRvZ2dsZScpO1xyXG5cclxuZnVuY3Rpb24gRWRnZWhhbmRsZXMoIG9wdGlvbnMgKXtcclxuICBsZXQgY3kgPSBvcHRpb25zLmN5O1xyXG5cclxuICB0aGlzLmN5ID0gY3k7XHJcbiAgdGhpcy5saXN0ZW5lcnMgPSBbXTtcclxuXHJcbiAgLy8gZWRnZWhhbmRsZXMgZ2VzdHVyZSBzdGF0ZVxyXG4gIHRoaXMuZW5hYmxlZCA9IHRydWU7XHJcbiAgdGhpcy5kcmF3TW9kZSA9IGZhbHNlO1xyXG4gIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgdGhpcy5ncmFiYmluZ05vZGUgPSBmYWxzZTtcclxuXHJcbiAgLy8gZWRnZWhhbmRsZXMgZWxlbWVudHNcclxuICB0aGlzLmhhbmRsZU5vZGUgPSBjeS5jb2xsZWN0aW9uKCk7XHJcbiAgdGhpcy5jbGVhckNvbGxlY3Rpb25zKCk7XHJcblxyXG4gIC8vIGhhbmRsZVxyXG4gIHRoaXMuaHggPSAwO1xyXG4gIHRoaXMuaHkgPSAwO1xyXG4gIHRoaXMuaHIgPSAwO1xyXG5cclxuICAvLyBtb3VzZSBwb3NpdGlvblxyXG4gIHRoaXMubXggPSAwO1xyXG4gIHRoaXMubXkgPSAwO1xyXG5cclxuICB0aGlzLm9wdGlvbnMgPSBhc3NpZ24oIHt9LCBkZWZhdWx0cywgb3B0aW9ucyApO1xyXG5cclxuICB0aGlzLnNhdmVHZXN0dXJlU3RhdGUoKTtcclxuICB0aGlzLmFkZExpc3RlbmVycygpO1xyXG5cclxuICB0aGlzLnRocm90dGxlZFNuYXAgPSB0aHJvdHRsZSggdGhpcy5zbmFwLmJpbmQodGhpcyksIDEwMDAvb3B0aW9ucy5zbmFwRnJlcXVlbmN5ICk7XHJcblxyXG4gIHRoaXMucHJldmVudERlZmF1bHQgPSBlID0+IGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgbGV0IHN1cHBvcnRzUGFzc2l2ZSA9IGZhbHNlO1xyXG4gIHRyeSB7XHJcbiAgICBsZXQgb3B0cyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSgge30sICdwYXNzaXZlJywge1xyXG4gICAgICBnZXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgc3VwcG9ydHNQYXNzaXZlID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSApO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAndGVzdCcsIG51bGwsIG9wdHMgKTtcclxuICB9IGNhdGNoKCBlcnIgKXt9XHJcblxyXG4gIGlmKCBzdXBwb3J0c1Bhc3NpdmUgKXtcclxuICAgIHRoaXMud2luZG93TGlzdGVuZXJPcHRpb25zID0geyBjYXB0dXJlOiB0cnVlLCBwYXNzaXZlOiBmYWxzZSB9O1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aGlzLndpbmRvd0xpc3RlbmVyT3B0aW9ucyA9IHRydWU7XHJcbiAgfVxyXG59XHJcblxyXG5sZXQgcHJvdG8gPSBFZGdlaGFuZGxlcy5wcm90b3R5cGUgPSB7fTtcclxubGV0IGV4dGVuZCA9IG9iaiA9PiBhc3NpZ24oIHByb3RvLCBvYmogKTtcclxuXHJcbnByb3RvLmRlc3Ryb3kgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMucmVtb3ZlTGlzdGVuZXJzKCk7XHJcbn07XHJcblxyXG5wcm90by5zZXRPcHRpb25zID0gZnVuY3Rpb24oIG9wdGlvbnMgKXtcclxuICBhc3NpZ24oIHRoaXMub3B0aW9ucywgb3B0aW9ucyApO1xyXG59O1xyXG5cclxucHJvdG8ubXAgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB7IHg6IHRoaXMubXgsIHk6IHRoaXMubXkgfTtcclxufTtcclxuXHJcbnByb3RvLmhwID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4geyB4OiB0aGlzLmh4LCB5OiB0aGlzLmh5IH07XHJcbn07XHJcblxyXG5wcm90by5jbGVhckNvbGxlY3Rpb25zID0gZnVuY3Rpb24oKXtcclxuICBsZXQgeyBjeSB9ID0gdGhpcztcclxuXHJcbiAgdGhpcy5wcmV2aWV3RWxlcyA9IGN5LmNvbGxlY3Rpb24oKTtcclxuICB0aGlzLmdob3N0RWxlcyA9IGN5LmNvbGxlY3Rpb24oKTtcclxuICB0aGlzLmdob3N0Tm9kZSA9IGN5LmNvbGxlY3Rpb24oKTtcclxuICB0aGlzLnNvdXJjZU5vZGUgPSBjeS5jb2xsZWN0aW9uKCk7XHJcbiAgdGhpcy50YXJnZXROb2RlID0gY3kuY29sbGVjdGlvbigpO1xyXG4gIHRoaXMucHJlc3VtcHRpdmVUYXJnZXRzID0gY3kuY29sbGVjdGlvbigpO1xyXG59O1xyXG5cclxuW1xyXG4gIGN5R2VzdHVyZXNUb2dnbGUsXHJcbiAgY3lMaXN0ZW5lcnMsXHJcbiAgZHJhd01vZGUsXHJcbiAgZHJhd2luZyxcclxuICBlbmFibGluZyxcclxuICBnZXN0dXJlTGlmZWN5Y2xlLFxyXG4gIGxpc3RlbmVycyxcclxuICBlZGdlRXZlbnRzXHJcbl0uZm9yRWFjaCggZXh0ZW5kICk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEVkZ2VoYW5kbGVzO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZWRnZWhhbmRsZXMvaW5kZXguanMiLCJmdW5jdGlvbiBhZGRMaXN0ZW5lcnMoKXtcclxuICB0aGlzLmFkZEN5dG9zY2FwZUxpc3RlbmVycygpO1xyXG5cclxuICB0aGlzLmFkZExpc3RlbmVyKCB0aGlzLmN5LCAnZGVzdHJveScsICgpID0+IHRoaXMuZGVzdHJveSgpICk7XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVMaXN0ZW5lcnMoKXtcclxuICBmb3IoIGxldCBpID0gdGhpcy5saXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0gKXtcclxuICAgIGxldCBsID0gdGhpcy5saXN0ZW5lcnNbaV07XHJcblxyXG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lciggbC50YXJnZXQsIGwuZXZlbnQsIGwuc2VsZWN0b3IsIGwuY2FsbGJhY2ssIGwub3B0aW9ucyApO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldExpc3RlbmVyKCB0YXJnZXQsIGV2ZW50LCBzZWxlY3RvciwgY2FsbGJhY2ssIG9wdGlvbnMgKXtcclxuICBpZiggdHlwZW9mIHNlbGVjdG9yICE9PSB0eXBlb2YgJycgKXtcclxuICAgIGNhbGxiYWNrID0gc2VsZWN0b3I7XHJcbiAgICBvcHRpb25zID0gY2FsbGJhY2s7XHJcbiAgICBzZWxlY3RvciA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBpZiggb3B0aW9ucyA9PSBudWxsICl7XHJcbiAgICBvcHRpb25zID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZXR1cm4geyB0YXJnZXQsIGV2ZW50LCBzZWxlY3RvciwgY2FsbGJhY2ssIG9wdGlvbnMgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNEb20oIHRhcmdldCApe1xyXG4gIHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRMaXN0ZW5lciggdGFyZ2V0LCBldmVudCwgc2VsZWN0b3IsIGNhbGxiYWNrLCBvcHRpb25zICl7XHJcbiAgbGV0IGwgPSBnZXRMaXN0ZW5lciggdGFyZ2V0LCBldmVudCwgc2VsZWN0b3IsIGNhbGxiYWNrLCBvcHRpb25zICk7XHJcblxyXG4gIHRoaXMubGlzdGVuZXJzLnB1c2goIGwgKTtcclxuXHJcbiAgaWYoIGlzRG9tKCBsLnRhcmdldCApICl7XHJcbiAgICBsLnRhcmdldC5hZGRFdmVudExpc3RlbmVyKCBsLmV2ZW50LCBsLmNhbGxiYWNrLCBsLm9wdGlvbnMgKTtcclxuICB9IGVsc2Uge1xyXG4gICAgaWYoIGwuc2VsZWN0b3IgKXtcclxuICAgICAgbC50YXJnZXQuYWRkTGlzdGVuZXIoIGwuZXZlbnQsIGwuc2VsZWN0b3IsIGwuY2FsbGJhY2ssIGwub3B0aW9ucyApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbC50YXJnZXQuYWRkTGlzdGVuZXIoIGwuZXZlbnQsIGwuY2FsbGJhY2ssIGwub3B0aW9ucyApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKCB0YXJnZXQsIGV2ZW50LCBzZWxlY3RvciwgY2FsbGJhY2ssIG9wdGlvbnMgKXtcclxuICBsZXQgbCA9IGdldExpc3RlbmVyKCB0YXJnZXQsIGV2ZW50LCBzZWxlY3RvciwgY2FsbGJhY2ssIG9wdGlvbnMgKTtcclxuXHJcbiAgZm9yKCBsZXQgaSA9IHRoaXMubGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tICl7XHJcbiAgICBsZXQgbDIgPSB0aGlzLmxpc3RlbmVyc1tpXTtcclxuXHJcbiAgICBpZihcclxuICAgICAgbC50YXJnZXQgPT09IGwyLnRhcmdldFxyXG4gICAgICAmJiBsLmV2ZW50ID09PSBsMi5ldmVudFxyXG4gICAgICAmJiAoIGwuc2VsZWN0b3IgPT0gbnVsbCB8fCBsLnNlbGVjdG9yID09PSBsMi5zZWxlY3RvciApXHJcbiAgICAgICYmICggbC5jYWxsYmFjayA9PSBudWxsIHx8IGwuY2FsbGJhY2sgPT09IGwyLmNhbGxiYWNrIClcclxuICAgICl7XHJcbiAgICAgIHRoaXMubGlzdGVuZXJzLnNwbGljZSggaSwgMSApO1xyXG5cclxuICAgICAgaWYoIGlzRG9tKCBsLnRhcmdldCApICl7XHJcbiAgICAgICAgbC50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lciggbC5ldmVudCwgbC5jYWxsYmFjaywgbC5vcHRpb25zICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYoIGwuc2VsZWN0b3IgKXtcclxuICAgICAgICAgIGwudGFyZ2V0LnJlbW92ZUxpc3RlbmVyKCBsLmV2ZW50LCBsLnNlbGVjdG9yLCBsLmNhbGxiYWNrLCBsLm9wdGlvbnMgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbC50YXJnZXQucmVtb3ZlTGlzdGVuZXIoIGwuZXZlbnQsIGwuY2FsbGJhY2ssIGwub3B0aW9ucyApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpcztcclxufVxyXG5cclxuZnVuY3Rpb24gZW1pdCggdHlwZSwgcG9zaXRpb24sIC4uLmFyZ3MgKXtcclxuICBsZXQgeyBvcHRpb25zLCBjeSB9ID0gdGhpcztcclxuXHJcbiAgY3kuZW1pdCggeyB0eXBlOiBgZWgke3R5cGV9YCwgcG9zaXRpb24gfSwgYXJncyApO1xyXG5cclxuICBsZXQgaGFuZGxlciA9IG9wdGlvbnNbIHR5cGUgXTtcclxuXHJcbiAgaWYoIGhhbmRsZXIgIT0gbnVsbCApe1xyXG4gICAgaGFuZGxlciggLi4uYXJncyApO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0geyBhZGRMaXN0ZW5lciwgYWRkTGlzdGVuZXJzLCByZW1vdmVMaXN0ZW5lciwgcmVtb3ZlTGlzdGVuZXJzLCBlbWl0IH07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lZGdlaGFuZGxlcy9saXN0ZW5lcnMuanMiLCJjb25zdCBpbXBsID0gcmVxdWlyZSgnLi9jb3JlJyk7XHJcblxyXG4vLyByZWdpc3RlcnMgdGhlIGV4dGVuc2lvbiBvbiBhIGN5dG9zY2FwZSBsaWIgcmVmXHJcbmxldCByZWdpc3RlciA9IGZ1bmN0aW9uKCBjeXRvc2NhcGUgKXtcclxuICBpZiggIWN5dG9zY2FwZSApeyByZXR1cm47IH0gLy8gY2FuJ3QgcmVnaXN0ZXIgaWYgY3l0b3NjYXBlIHVuc3BlY2lmaWVkXHJcblxyXG4gIGN5dG9zY2FwZSggJ2NvcmUnLCAnZWRnZWhhbmRsZXMnLCBpbXBsICk7IC8vIHJlZ2lzdGVyIHdpdGggY3l0b3NjYXBlLmpzXHJcbn07XHJcblxyXG5pZiggdHlwZW9mIGN5dG9zY2FwZSAhPT0gJ3VuZGVmaW5lZCcgKXsgLy8gZXhwb3NlIHRvIGdsb2JhbCBjeXRvc2NhcGUgKGkuZS4gd2luZG93LmN5dG9zY2FwZSlcclxuICByZWdpc3RlciggY3l0b3NjYXBlICk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByZWdpc3RlcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzEzX187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImxvZGFzaC5tZW1vaXplXCIsXCJjb21tb25qczJcIjpcImxvZGFzaC5tZW1vaXplXCIsXCJhbWRcIjpcImxvZGFzaC5tZW1vaXplXCIsXCJyb290XCI6W1wiX1wiLFwibWVtb2l6ZVwiXX1cbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xNF9fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJsb2Rhc2gudGhyb3R0bGVcIixcImNvbW1vbmpzMlwiOlwibG9kYXNoLnRocm90dGxlXCIsXCJhbWRcIjpcImxvZGFzaC50aHJvdHRsZVwiLFwicm9vdFwiOltcIl9cIixcInRocm90dGxlXCJdfVxuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==