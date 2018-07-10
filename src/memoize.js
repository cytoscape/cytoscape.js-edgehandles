function memoize(fn, getKey){
  let cache = {};

  return function(arg){
    let key = getKey(arg);
    let cachedVal = cache[key];

    if( cachedVal == null ){
      cachedVal = cache[key] = fn(arg);
    }

    return cachedVal;
  };
}

module.exports = memoize;