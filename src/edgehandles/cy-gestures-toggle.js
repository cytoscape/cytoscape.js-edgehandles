function disableGestures(){
  this.saveGestureState();

  ( this.cy
    .zoomingEnabled( false )
    .panningEnabled( false )
    .boxSelectionEnabled( false )
  );

  return this;
}

function resetGestures(){
  ( this.cy
    .zoomingEnabled( this.lastZoomingEnabled )
    .panningEnabled( this.lastPanningEnabled )
    .boxSelectionEnabled( this.lastBoxSelectionEnabled )
  );

  return this;
}

function saveGestureState(){
  let { cy } = this;

  this.lastPanningEnabled = cy.panningEnabled();
  this.lastZoomingEnabled = cy.zoomingEnabled();
  this.lastBoxSelectionEnabled = cy.boxSelectionEnabled();

  return this;
}

module.exports = { disableGestures, resetGestures, saveGestureState };
