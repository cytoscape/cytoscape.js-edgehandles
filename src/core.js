const Edgehandles = require('./edgehandles');
const assign = require('./assign');

module.exports = function( options ){
  let cy = this;

  if ( options.hasOwnProperty('handleNodes') )
  {
    options.selector = options.handleNodes;
    delete options.handleNodes;
  }

  return new Edgehandles( assign({ cy }, options) );
};
