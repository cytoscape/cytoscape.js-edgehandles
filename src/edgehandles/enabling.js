function enable(){
  this.enabled = true;

  this.emit('enable');

  return this;
}

function disable(){
  this.enabled = false;

  this.emit('disable');

  return this;
}

module.exports = { enable, disable };
