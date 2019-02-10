import core from './core'

// registers the extension on a cytoscape lib ref
let register = function (cytoscape) {
  if (!cytoscape) {
    return
  } // can't register if cytoscape unspecified

  cytoscape('core', 'edgehandles', core) // register with cytoscape.js
}

if (typeof cytoscape !== 'undefined') { // expose to global cytoscape (i.e. window.cytoscape)
  register(cytoscape) // eslint-disable-line no-undef
}

export default register
