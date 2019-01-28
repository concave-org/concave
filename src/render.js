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
        // set focus on elements with value prop
        let el = parent.querySelector(`#${id}`)
        if (el.value || el.value === '') el.focus()
        // set selection if set before
        if (selectionStart && selectionEnd) el.setSelectionRange(selectionStart, selectionEnd)
        break
      case pc:
        while (parent.firstChild) parent.removeChild(parent.firstChild)
        break
      case sa:
        Object.keys(action.value).forEach(id => {
          let el = parent.querySelector(`#${id}`)
          // only add event listener when element exists
          if (el) {
            Object.keys(action.value[id]).forEach(attr => {
              let event = attr.startsWith('on') ? attr.substring(2) : null
              if (event && typeof action.value[id][attr] === 'function') {
                el.addEventListener(event, event => {
                  let result = action.value[id][attr](event)
                  if (typeof result === 'object') dispatch(result)
                })
              } else el.setAttribute(attr, action.value[id][attr])
            })
          }
        })
        break
    }
    return action
  }
}

export {
  createRenderer
}
