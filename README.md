cytoscape-edgehandles
================================================================================

[![DOI](https://zenodo.org/badge/16078488.svg)](https://zenodo.org/badge/latestdoi/16078488)

![Preview](https://raw.githubusercontent.com/cytoscape/cytoscape.js-edgehandles/master/img/preview.png)

## Description


This extension creates handles on nodes that can be dragged to create edges between nodes ([demo](https://cytoscape.github.io/cytoscape.js-edgehandles/), [snapping demo](https://cytoscape.github.io/cytoscape.js-edgehandles/demo-snap.html), [compound demo](https://cytoscape.github.io/cytoscape.js-edgehandles/demo-compound.html), [compound snapping demo](https://cytoscape.github.io/cytoscape.js-edgehandles/demo-compound-snap.html))


## Dependencies

 * Cytoscape.js ^3.2.0


## Usage instructions

Download the library:
 * via npm: `npm install cytoscape-edgehandles`,
 * via bower: `bower install cytoscape-edgehandles`, or
 * via direct download in the repository (probably from a tag).

Import the library as appropriate for your project:

ES import:

```js
import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';

cytoscape.use( edgehandles );
```

CommonJS require:

```js
let cytoscape = require('cytoscape');
let edgehandles = require('cytoscape-edgehandles');

cytoscape.use( edgehandles ); // register extension
```

AMD:

```js
require(['cytoscape', 'cytoscape-edgehandles'], function( cytoscape, edgehandles ){
  edgehandles( cytoscape ); // register extension
});
```

Plain HTML/JS has the extension registered for you automatically, because no `require()` is needed.



## Initialisation

You initialise the extension on the Cytoscape instance:

```js

let cy = cytoscape({
  container: document.getElementById('#cy'),
	/* ... */
});

// the default values of each option are outlined below:
let defaults = {
  preview: true, // whether to show added edges preview before releasing selection
  hoverDelay: 150, // time spent hovering over a target node before it is considered selected
  handleNodes: 'node', // selector/filter function for whether edges can be made from a given node
  snap: false, // when enabled, the edge can be drawn by just moving close to a target node
  snapThreshold: 50, // the target node must be less than or equal to this many pixels away from the cursor/finger
  snapFrequency: 15, // the number of times per second (Hz) that snap checks done (lower is less expensive)
  noEdgeEventsInDraw: false, // set events:no to edges during draws, prevents mouseouts on compounds
  disableBrowserGestures: true, // during an edge drawing gesture, disable browser gestures such as two-finger trackpad swipe and pinch-to-zoom
  handlePosition: function( node ){
    return 'middle top'; // sets the position of the handle in the format of "X-AXIS Y-AXIS" such as "left top", "middle top"
  },
  handleInDrawMode: false, // whether to show the handle in draw mode
  edgeType: function( sourceNode, targetNode ){
    // can return 'flat' for flat edges between nodes or 'node' for intermediate node between them
    // returning null/undefined means an edge can't be added between the two nodes
    return 'flat';
  },
  loopAllowed: function( node ){
    // for the specified node, return whether edges from itself to itself are allowed
    return false;
  },
  nodeLoopOffset: -50, // offset for edgeType: 'node' loops
  nodeParams: function( sourceNode, targetNode ){
    // for edges between the specified source and target
    // return element object to be passed to cy.add() for intermediary node
    return {};
  },
  edgeParams: function( sourceNode, targetNode, i ){
    // for edges between the specified source and target
    // return element object to be passed to cy.add() for edge
    // NB: i indicates edge index in case of edgeType: 'node'
    return {};
  },
  ghostEdgeParams: function(){
    // return element object to be passed to cy.add() for the ghost edge
    // (default classes are always added for you)
    return {};
  },
  show: function( sourceNode ){
    // fired when handle is shown
  },
  hide: function( sourceNode ){
    // fired when the handle is hidden
  },
  start: function( sourceNode ){
    // fired when edgehandles interaction starts (drag on handle)
  },
  complete: function( sourceNode, targetNode, addedEles ){
    // fired when edgehandles is done and elements are added
  },
  stop: function( sourceNode ){
    // fired when edgehandles interaction is stopped (either complete with added edges or incomplete)
  },
  cancel: function( sourceNode, cancelledTargets ){
    // fired when edgehandles are cancelled (incomplete gesture)
  },
  hoverover: function( sourceNode, targetNode ){
    // fired when a target is hovered
  },
  hoverout: function( sourceNode, targetNode ){
    // fired when a target isn't hovered anymore
  },
  previewon: function( sourceNode, targetNode, previewEles ){
    // fired when preview is shown
  },
  previewoff: function( sourceNode, targetNode, previewEles ){
    // fired when preview is hidden
  },
  drawon: function(){
    // fired when draw mode enabled
  },
  drawoff: function(){
    // fired when draw mode disabled
  }
};

let eh = cy.edgehandles( defaults );

```


## API

The object returned by `cy.edgehandles()` has several functions available on it:

* `start( sourceNode )` : manually start the gesture (as if the handle were already held)
* `stop()` : manually completes or cancels the gesture
* `hide()` : remove the handle node from the graph
* `disable()` : disables edgehandles behaviour
* `enable()` : enables edgehandles behaviour
* `enableDrawMode()` : turn on draw mode (the entire node body acts like the handle)
* `disableDrawMode()` : turn off draw mode
* `destroy()` : remove edgehandles behaviour


## Classes

These classes can be used for styling the graph as it interacts with the extension:

* `eh-handle` : The handle node
* `eh-source` : The source node
* `eh-target` : A target node
* `eh-preview` : Preview elements (used with `options.preview: true`)
* `eh-hover` : Added to nodes as they are hovered over as targets
* `eh-ghost-node` : The ghost node (target)
* `eh-ghost-edge` : The ghost handle line edge
* `eh-ghost` : A ghost element
* `eh-presumptive-target` : A node that, during an edge drag, may become a target when released
* `eh-preview-active` : Applied to the source, target, and ghost edge when the preview is active


## Events

During the course of a user's interaction with the extension, several events are generated and triggered on the core.  Each event callback has a number of extra parameters, and certain events have associated positions.

* `ehshow` : when the handle is shown
  * `(event, sourceNode)`
  * `event.position` : handle position
* `ehhide` : when the handle is hidden
  * `(event, sourceNode)`
  * `event.position` : handle position
* `ehstart` : when the edge creation gesture starts
  * `(event, sourceNode)`
  * `event.position` : handle position
* `ehcomplete` : when the edge creation gesture is successfully completed
  * `(event, sourceNode, targetNode, addedEles)`
  * `event.position` : cursor/finger position
* `ehstop` : when the edge creation gesture is stopped (either successfully completed or cancelled)
  * `(event, sourceNode)`
  * `event.position` : cursor/finger position
* `ehcancel` : when the edge creation gesture is cancelled
  * `(event, sourceNode, cancelledTargets)`
  * `event.position` : cursor/finger position
* `ehhoverover` : when hovering over a target
  * `(event, sourceNode, targetNode)`
  * `event.position` : cursor/finger position
* `ehhoverout` : when leaving a target node
  * `(event, sourceNode, targetNode)`
  * `event.position` : cursor/finger position
* `ehpreviewon` : when a preview is shown
  * `(event, sourceNode, targetNode, previewEles)`
  * `event.position` : cursor/finger position
* `ehpreviewoff` : when the preview is removed
  * `(event, sourceNode, targetNode, previewEles)`
  * `event.position` : cursor/finger position
* `ehdrawon` : when draw mode is enabled
  * `(event)`
* `ehdrawoff` : when draw mode is disabled
  * `(event)`

Example binding:

```js
cy.on('ehcomplete', (event, sourceNode, targetNode, addedEles) => {
	let { position } = event;

  // ...
});
```

## Build targets

* `npm run test` : Run Mocha tests in `./test`
* `npm run build` : Build `./src/**` into `cytoscape-edgehandles.js`
* `npm run watch` : Automatically build on changes with live reloading (N.b. you must already have an HTTP server running)
* `npm run dev` : Automatically build on changes with live reloading with webpack dev server
* `npm run lint` : Run eslint on the source

N.b. all builds use babel, so modern ES features can be used in the `src`.


## Publishing instructions

This project is set up to automatically be published to npm and bower.  To publish:

1. Build the extension : `npm run build:release`
1. Commit the build : `git commit -am "Build for release"`
1. Bump the version number and tag: `npm version major|minor|patch`
1. Push to origin: `git push && git push --tags`
1. Publish to npm: `npm publish .`
1. If publishing to bower for the first time, you'll need to run `bower register cytoscape-edgehandles https://github.com/cytoscape&#x2F;edgehandles.git`a
1. [Make a new release](https://github.com/cytoscape/cytoscape.js-edgehandles/releases/new) for Zenodo.
