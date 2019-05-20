import { actions } from './actions'

const createRenderer = parent => {
  return (action, dispatch) => {
    switch (action.type) {
      case actions.appendComponent:
        parent.appendChild(action.value.node)
        // notify component
        dispatch({ type: actions.mounted, value: action.value.node })
        break
      case actions.replaceComponent:
        // get actual focused element
        let { id, selectionStart, selectionEnd } = document.activeElement
        parent.replaceChild(action.value.node, action.value.oldNode)
        // set focus on elements with value prop
        if (id) {
          let el = document.getElementById(id)
          if (el.value || el.value === '') el.focus()
          // set selection if set before
          if (selectionStart && selectionEnd) el.setSelectionRange(selectionStart, selectionEnd)
        }
        break
      case actions.pipelineChange:
        while (parent.firstChild) parent.removeChild(parent.firstChild)
        break
      case actions.setAttributes:
        Object.keys(action.value).forEach(id => {
          let el = document.getElementById(id)
          // only add event listener when element exists
          if (el) {
            Object.keys(action.value[id]).forEach(attr => {
              let event = attr.startsWith('on') ? attr.substring(2) : null
              if (event && typeof action.value[id][attr] === 'function') {
                el.addEventListener(event, event => {
                  let result = action.value[id][attr](event, dispatch)
                  if (typeof result === 'object') dispatch(result)
                }, { passive: true })
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
