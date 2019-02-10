function disableEdgeEvents () {
  if (this.options.noEdgeEventsInDraw) {
    this.cy.edges().style('events', 'no')
  }

  return this
}

function enableEdgeEvents () {
  if (this.options.noEdgeEventsInDraw) {
    this.cy.edges().removeStyle('events')
  }

  return this
}

export default { disableEdgeEvents, enableEdgeEvents }
