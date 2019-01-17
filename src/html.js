const h = (literals, ...substitutions) => {
  let template = document.createElement('template')
  template.innerHTML = String
    // join arrays for easier usage in app
    .raw(literals, ...substitutions.map(x => Array.isArray(x) ? x.join('') : x))
    .replace(/\n\s+/g, '')
  return template.content.firstChild
}

export {
  h
}
