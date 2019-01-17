import { aState, pc, ac, rc } from './actions'

const createComponent = (renderFn, props = {}) => {
  let prevEl

  return (action, dispatch) => {
    switch (action.type) {
      case aState:
        const el = renderFn(action.value, props)
        const renderAction = !prevEl ? ac : !prevEl.isEqualNode(el) ? rc : null
        if (renderAction) dispatch({ type: renderAction, value: { el, prevEl, props } })
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
