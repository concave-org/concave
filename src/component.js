import { actions } from './actions'

const template = document.createElement('template')

const createComponent = (renderFn, props = {}) => {
  let prevEl

  return (action, dispatch) => {
    switch (action.type) {
      case actions.state:
        let { h, attrs, options = {} } = renderFn(action.value, props)
        let { rerender = true } = options
        if (!rerender && prevEl) break
        template.innerHTML = h
        let el = template.content.firstChild
        let renderAction = !prevEl ? actions.appendComponent : !prevEl.isEqualNode(el) ? actions.replaceComponent : null
        if (renderAction) {
          let toDispatch = []
          toDispatch.push({ type: renderAction, value: { el, prevEl } })
          if (props._attrs) toDispatch.push({ type: actions.setAttributes, value: props._attrs })
          if (attrs) toDispatch.push({ type: actions.setAttributes, value: attrs })
          dispatch(...toDispatch)
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
