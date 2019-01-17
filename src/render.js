import { ac, rc, pc } from './actions'

const createRenderer = parent => {
  // TODO: Better concept is needed here
  const setAttributes = (attrs = {}, dispatch) => {
    Object.keys(attrs).forEach(id => {
      const el = document.getElementById(id)
      Object.keys(attrs[id]).forEach(attr => {
        const event = attr.startsWith('on') ? attr.substring(2) : null
        if (event && typeof attrs[id][attr] === 'object') {
          el.addEventListener(event, () => dispatch(attrs[id][attr]))
        } else if (event && typeof attrs[id][attr] === 'function') {
          el.addEventListener(event, attrs[id][attr])
        } else el.setAttribute(attr, attrs[id][attr])
      })
    })
  }

  return (action, dispatch) => {
    switch (action.type) {
      case ac:
        parent.appendChild(action.value.el)
        setAttributes(action.value.props._attrs, dispatch)
        break
      case rc:
        parent.replaceChild(action.value.el, action.value.prevEl)
        setAttributes(action.value.props._attrs, dispatch)
        break
      case pc:
        while (parent.firstChild) parent.removeChild(parent.firstChild)
        break
    }
    return action
  }
}

export {
  createRenderer
}
