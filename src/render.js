import { ac, rc, pc, sa } from './actions'

const createRenderer = parent => {
  return (action, dispatch) => {
    switch (action.type) {
      case ac:
        parent.appendChild(action.value.el)
        break
      case rc:
        // get actual focused element
        let { id, selectionStart, selectionEnd } = document.activeElement
        parent.replaceChild(action.value.el, action.value.prevEl)
        // set focus on text & textarea
        let el = parent.querySelector(`#${id}`)
        if (el && (el.type === 'text' || el.type === 'textarea')) {
          el.focus()
          el.setSelectionRange(selectionStart, selectionEnd)
        }
        break
      case pc:
        while (parent.firstChild) parent.removeChild(parent.firstChild)
        break
      case sa:
        Object.keys(action.value).forEach(id => {
          let el = parent.querySelector(`#${id}`)
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
