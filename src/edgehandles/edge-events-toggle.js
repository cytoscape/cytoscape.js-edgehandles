function disableEdgeEvents(){
  if( this.options.noEdgeEventsInDraw ){
    this.cy.edges().style('events', 'no');
  }

  return this;
}

function enableEdgeEvents(){
  if( this.options.noEdgeEventsInDraw ){
    this.cy.edges().style('events', '');
  }

  return this;
}

module.exports = { disableEdgeEvents, enableEdgeEvents };