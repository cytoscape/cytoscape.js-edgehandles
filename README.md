cytoscape-edgehandles
================================================================================
[![DOI](https://zenodo.org/badge/16078488.svg)](https://zenodo.org/badge/latestdoi/16078488)

![Preview](https://raw.githubusercontent.com/cytoscape/cytoscape.js-edgehandles/master/img/preview.png)


## Description

This extension creates handles on nodes that can be dragged to create edges between nodes.


## Dependencies

 * Cytoscape.js ^2.2.8 || ^3.0.0
 * Lodash ^4.17.0, if not using dependency management


## Usage instructions

Download the library:
 * via npm: `npm install cytoscape-edgehandles`,
 * via bower: `bower install cytoscape-edgehandles`, or
 * via direct download in the repository (probably from a tag).

`require()` the library as appropriate for your project:

CommonJS:
```js
var cytoscape = require('cytoscape');
var edgehandles = require('cytoscape-edgehandles');

edgehandles( cytoscape ); // register extension
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

var cy = cytoscape({
  container: document.getElementById('#cy'),
	/* ... */
});

// the default values of each option are outlined below:
var defaults = {
  preview: true, // whether to show added edges preview before releasing selection
  stackOrder: 4, // Controls stack order of edgehandles canvas element by setting it's z-index
  handleSize: 10, // the size of the edge handle put on nodes
  handleHitThreshold: 6, // a threshold for hit detection that makes it easier to grab the handle
  handleIcon: false, // an image to put on the handle
  handleColor: '#ff0000', // the colour of the handle and the line drawn from it
  handleLineType: 'ghost', // can be 'ghost' for real edge, 'straight' for a straight line, or 'draw' for a draw-as-you-go line
  handleLineWidth: 1, // width of handle line in pixels
  handleOutlineColor: '#000000', // the colour of the handle outline
  handleOutlineWidth: 0, // the width of the handle outline in pixels
  handleNodes: 'node', // selector/filter function for whether edges can be made from a given node
  handlePosition: 'middle top', // sets the position of the handle in the format of "X-AXIS Y-AXIS" such as "left top", "middle top"
  hoverDelay: 150, // time spend over a target node before it is considered a target selection
  cxt: false, // whether cxt events trigger edgehandles (useful on touch)
  enabled: true, // whether to start the plugin in the enabled state
  toggleOffOnLeave: false, // whether an edge is cancelled by leaving a node (true), or whether you need to go over again to cancel (false; allows multiple edges in one pass)
  edgeType: function( sourceNode, targetNode ) {
    // can return 'flat' for flat edges between nodes or 'node' for intermediate node between them
    // returning null/undefined means an edge can't be added between the two nodes
    return 'flat';
  },
  loopAllowed: function( node ) {
    // for the specified node, return whether edges from itself to itself are allowed
    return false;
  },
  nodeLoopOffset: -50, // offset for edgeType: 'node' loops
  nodeParams: function( sourceNode, targetNode ) {
    // for edges between the specified source and target
    // return element object to be passed to cy.add() for intermediary node
    return {};
  },
  edgeParams: function( sourceNode, targetNode, i ) {
    // for edges between the specified source and target
    // return element object to be passed to cy.add() for edge
    // NB: i indicates edge index in case of edgeType: 'node'
    return {};
  },
  start: function( sourceNode ) {
    // fired when edgehandles interaction starts (drag on handle)
  },
  complete: function( sourceNode, targetNodes, addedEntities ) {
    // fired when edgehandles is done and entities are added
  },
  stop: function( sourceNode ) {
    // fired when edgehandles interaction is stopped (either complete with added edges or incomplete)
  },
  cancel: function( sourceNode, renderedPosition, invalidTarget ){
    // fired when edgehandles are cancelled ( incomplete - nothing has been added ) - renderedPosition is where the edgehandle was released, invalidTarget is
        // a collection on which the handle was released, but which for other reasons (loopAllowed | edgeType) is an invalid target
  }
};

cy.edgehandles( defaults );

```

## Classes

These classes can be used for styling the graph as it interacts with the extension:

* `edgehandles-source` : The source node
* `edgehandles-target` : A target node
* `edgehandles-preview` : Preview elements (used with `options.preview: true`)
* `edgehandles-hover` : Added to nodes as they are hovered over as targets
* `edgehandles-ghost-edge` : The ghost handle line edge
* `edgehandles-presumptive-target` : A node that, during an edge drag, may become a target when released


## Events

During the course of a user's interaction with the extension, several events are generated and triggered on the corresponding elements:

On the source node:

 * `cyedgehandles.showhandle` : when the handle is shown
 * `cyedgehandles.start` : when starting to drag on the handle
 * `cyedgehandles.stop` : when the handle is released
 * `cyedgehandles.complete` : when the handle has been released and edges are created
 * `cyedgehandles.cancel` : when the handle has been released but not on a valid target. The handler receives two arguments - the renderedPosition at which the handle was released and a collection of presumptive targets. Presumptive targets are nodes that would have become targets but were, for some reason, deemed invalid. Possible reasons include `edgeType` or `loopAllowed` returning null.

On the target node:

 * `cyedgehandles.addpreview` : when a preview is shown (i.e. target selected)
 * `cyedgehandles.removepreview` : when a preview is removed (i.e. target unselected)

Example binding:

```js
cy.on('cyedgehandles.start', 'node', function(e){
	var srcNode = this;

	// ...
});
```

## Extension functions

All function can be called via `cy.edgehandles('function-name')`:

 * `cy.edgehandles('enable')` : enable the extension
 * `cy.edgehandles('disable')` : disable the extension
 * `cy.edgehandles('option', 'preview', false)` : set individual option (e.g. `'preview'`)
 * `cy.edgehandles('option', { /* options */ })` : set all options
 * `cy.edgehandles('option', 'preview')` : get option value (e.g. `'preview'`)
 * `cy.edgehandles('destroy')` : destroy the extension instance
 * `cy.edgehandles('start', 'some-node-id')` : start the handle drag state on node with specified id (e.g. `'some-node-id'`)
 * `cy.edgehandles('drawon')` : enable draw mode
 * `cy.edgehandles('drawoff')` : disable draw mode


## Publishing instructions

This project is set up to automatically be published to npm and bower.  To publish:

1. Set the version number environment variable: `export VERSION=1.2.3`
1. Publish: `gulp publish`
1. If publishing to bower for the first time, you'll need to run `bower register cytoscape-edgehandles https://github.com/cytoscape/cytoscape.js-edgehandles.git`
1. Make a release on GitHub to automatically register a new Zenodo DOI
