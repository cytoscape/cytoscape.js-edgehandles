import Edgehandles from './edgehandles'

export default function (options) {
  let cy = this

  if (options.hasOwnProperty('handleNodes')) {
    options.selector = options.handleNodes
    delete options.handleNodes
  }

  return new Edgehandles(cy, options)
}
