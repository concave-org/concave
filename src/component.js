import { actions } from './actions'

const template = document.createElement('template')

const createComponent = (renderFn, props = {}) => {
  let prevEl

  return (action, dispatch) => {
    switch (action.type) {
      case actions.state:
        let { h, attrs } = renderFn(action.value, props)
        let template = document.createElement('template')
        template.innerHTML = h
        let el = template.content.firstChild
        let renderAction = !prevEl ? actions.appendComponent : !prevEl.isEqualNode(el) ? actions.replaceComponent : null
        if (renderAction) {
          dispatch({ type: renderAction, value: { el, prevEl } })
          // static attributes
          if (props._attrs) dispatch({ type: actions.setAttributes, value: props._attrs })
          // dynamic attributes - only known at RUNTIME!
          if (attrs) dispatch({ type: actions.setAttributes, value: attrs })
        }
        prevEl = el
        break
      case actions.pipelineChange:
        prevEl = null
        break
    }
    return action
  }
}

export {
  createComponent
}
