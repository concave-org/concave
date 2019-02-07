const memoize = fn => {
  let cache = {}
  return (...args) => {
    let cacheKey = args.map(a => typeof a === 'function' ? a.toString() : JSON.stringify(a)).join()
    if (!cache[cacheKey]) {
      cache[cacheKey] = fn(...args)
    }
    return cache[cacheKey]
  }
}

const debounce = (delay, fn) => {
  let timerId
  return (...args) => {
    if (timerId) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
      fn(...args)
      timerId = null
    }, delay)
  }
}

export {
  memoize,
  debounce
}
