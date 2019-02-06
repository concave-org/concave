const h = (literals, ...substitutions) => {
  // join arrays for easier usage in app e.g. list rendering
  return String
    .raw(literals, ...substitutions.map(x => Array.isArray(x) ? x.join('') : x))
    .replace(/\s+\n/g, '')
}

export {
  h
}
