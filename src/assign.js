// Simple, internal Object.assign() polyfill for options objects etc.

export default Object.assign != null ? Object.assign.bind(Object) : function (t, ...srcs) {
  srcs.filter(src => src != null).forEach(src => {
    Object.keys(src).forEach(k => t[k] = src[k])
  })
  return t
}
