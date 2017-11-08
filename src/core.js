const Edgehandles = require('./edgehandles');
const assign = require('./assign');

module.exports = function( options ){
  let cy = this;

  return new Edgehandles( assign({ cy }, options) );
};
