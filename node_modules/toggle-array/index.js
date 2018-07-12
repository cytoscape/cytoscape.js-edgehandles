'use strict';

var isObject = require('isobject');

module.exports = function(arr, prop, idx) {
  var len = arr.length;
  var i = -1;

  while (++i < len) {
    var ele = arr[i];
    if (!isObject(ele)) continue;
    if (i === idx) {
      ele[prop] = true;
    } else {
      ele[prop] = false;
    }
  }
  return arr;
};
