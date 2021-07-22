function addCytoscapeListeners(){
  let { cy, options } = this;

  // grabbing nodes
  this.addListener( cy, 'drag', () => this.grabbingNode = true );
  this.addListener( cy, 'free', () => this.grabbingNode = false );

  // start on tapstart handle
  // start on tapstart node (draw mode)
  // toggle on source node
  this.addListener( cy, 'tapstart', 'node', e => {
    let node = e.target;

    if( this.drawMode ){
      this.start( node );
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

  return this;
}

module.exports = { addCytoscapeListeners };
