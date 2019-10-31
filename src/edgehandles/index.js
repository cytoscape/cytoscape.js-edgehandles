import defaults from './defaults'
import assign from '../assign'
import throttle from 'lodash.throttle'
import cyGesturesToggle from './cy-gestures-toggle'
import cyListeners from './cy-listeners'
import drawMode from './draw-mode'
import drawing from './drawing'
import enabling from './enabling'
import gestureLifecycle from './gesture-lifecycle'
import listeners from './listeners'
import edgeEvents from './edge-events-toggle'

function Edgehandles (cy, options) {
  this.cy = cy
  this.listeners = []

  // edgehandles gesture state
  this.enabled = true
  this.drawMode = false
  this.active = false
  this.grabbingNode = false

  // edgehandles elements
  this.handleNodes = cy.collection()
  this.clearCollections()

  // mouse position
  this.mx = 0
  this.my = 0

  this.options = assign({}, defaults, options)

  this.saveGestureState()
  this.addListeners()

  this.throttledSnap = throttle(this.snap.bind(this), 1000 / this.options.snapFrequency)

  this.preventDefault = e => e.preventDefault()

  let supportsPassive = false
  try {
    let opts = Object.defineProperty({}, 'passive', {
      get: function () {
        supportsPassive = true
        return undefined
      }
    })

    window.addEventListener('_', null, opts)
  } catch (err) {
    // empty
  }

  if (supportsPassive) {
    this.windowListenerOptions = { capture: true, passive: false }
  } else {
    this.windowListenerOptions = true
  }
}

let proto = Edgehandles.prototype = {}

proto.destroy = function () {
  this.removeListeners()
}

proto.setOptions = function (options) {
  assign(this.options, options)
}

proto.mp = function () {
  return { x: this.mx, y: this.my }
}

proto.clearCollections = function () {
  let { cy } = this

  this.handleNode = cy.collection()
  this.previewEles = cy.collection()
  this.ghostNode = cy.collection()
  this.ghostEles = cy.collection()
  this.sourceNode = cy.collection()
  this.targetNode = cy.collection()
  this.presumptiveTargets = cy.collection()
}

let extend = obj => assign(proto, obj)
let fn = [
  cyGesturesToggle,
  cyListeners,
  drawMode,
  drawing,
  enabling,
  gestureLifecycle,
  listeners,
  edgeEvents
]
fn.forEach(extend)

export default Edgehandles
