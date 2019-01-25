import { aState, pc, ac, rc, sa } from './actions'

const createComponent = (renderFn, props = {}) => {
  let prevEl

  return (action, dispatch) => {
    switch (action.type) {
      case aState:
        let h = renderFn(action.value, props)
        let template = document.createElement('template')
        template.innerHTML = h
        let el = template.content.firstChild
        let renderAction = !prevEl ? ac : !prevEl.isEqualNode(el) ? rc : null
        if (renderAction) {
          dispatch({ type: renderAction, value: { el, prevEl, props } })
          if (props._attrs) dispatch({ type: sa, value: props._attrs })
        }
        prevEl = el
        break
      case pc:
        prevEl = null
        break
    }
    return action
  }
}

export {
  createComponent
}
