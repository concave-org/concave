import { ac, rc, pc, sa } from './actions'

const createRenderer = parent => {
  return (action, dispatch) => {
    switch (action.type) {
      case ac:
        parent.appendChild(action.value.el)
        break
      case rc:
        parent.replaceChild(action.value.el, action.value.prevEl)
        break
      case pc:
        while (parent.firstChild) parent.removeChild(parent.firstChild)
        break
      case sa:
        Object.keys(action.value).forEach(id => {
          let el = document.getElementById(id)
          Object.keys(action.value[id]).forEach(attr => {
            let event = attr.startsWith('on') ? attr.substring(2) : null
            if (event && typeof action.value[id][attr] === 'function') {
              el.addEventListener(event, event => {
                let result = action.value[id][attr](event)
                if (typeof result === 'object') dispatch(result)
              })
            } else el.setAttribute(attr, action.value[id][attr])
          })
        })
        break
    }
    return action
  }
}

export {
  createRenderer
}
