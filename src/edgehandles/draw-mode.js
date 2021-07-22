function toggleDrawMode( bool ){
  let { cy } = this;

  this.drawMode = bool != null ? bool : !this.drawMode;

  if( this.drawMode ){
    this.prevUngrabifyState = cy.autoungrabify();

    cy.autoungrabify( true );

    this.emit('drawon');
  } else {
    cy.autoungrabify( this.prevUngrabifyState );

    this.emit('drawoff');
  }

  return this;
}

function enableDrawMode(){
  return this.toggleDrawMode( true );
}

function disableDrawMode(){
  return this.toggleDrawMode( false );
}

module.exports = { toggleDrawMode, enableDrawMode, disableDrawMode };
