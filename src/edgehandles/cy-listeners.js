function addCytoscapeListeners(){
  let { cy, options } = this;

  // grabbing nodes
  this.addListener( cy, 'drag', () => this.grabbingNode = true );
  this.addListener( cy, 'free', () => this.grabbingNode = false );

  // show handle on hover
  this.addListener( cy, 'mouseover', 'node', e => {
    this.show( e.target );
  } );

  // hide handle on tap handle
  this.addListener( cy, 'tap', 'node', e => {
    let node = e.target;

    if( !node.same( this.handleNode ) ){
      this.show( node );
    }
  } );

  if ( options.hideHandleOnSourceNodeMove ){
    // hide handle when source node moved
    this.addListener( cy, 'position', 'node', e => {
      if( e.target.same( this.sourceNode ) ){
        this.hide();
      }
    } );
  }

  // start on tapstart handle
  // start on tapstart node (draw mode)
  // toggle on source node
  this.addListener( cy, 'tapstart', 'node', e => {
    let node = e.target;

    if( node.same( this.handleNode ) ){
      this.start( this.sourceNode );
    } else if( this.drawMode ){
      this.start( node );
    } else if( node.same( this.sourceNode ) ){
      this.hide();
    }
  } );

  // update line on drag
  this.addListener( cy, 'tapdrag', e => {
    this.update( e.position );
  } );

  // hover over preview
  this.addListener( cy, 'tapdragover', 'node', e => {
    if( options.snap ){
      // then ignore events like mouseover
    } else {
      this.preview( e.target );
    }
  } );

  // hover out unpreview
  this.addListener( cy, 'tapdragout', 'node', e => {
    if( options.snap ){
      // then keep the preview
    } else {
      this.unpreview( e.target );
    }
  } );

  // stop gesture on tapend
  this.addListener( cy, 'tapend', () => {
    this.stop();
  } );

  // hide handle if source node is removed
  this.addListener( cy, 'remove', e => {
    if( e.target.same( this.sourceNode ) ){
      this.hide();
    }
  } );

  return this;
}

module.exports = { addCytoscapeListeners };
