import { actions } from './actions'

const template = document.createElement('template')

const createComponent = (renderFn, props = {}, hooks = {}, actionReducer) => {
  let oldNode

  return (action, dispatch) => {
    switch (action.type) {
      case actions.state:
        let { h, attrs } = renderFn(action.value, props)
        template.innerHTML = h
        let node = template.content.firstChild
        let renderAction = !oldNode
          ? actions.appendComponent
          : !oldNode.isEqualNode(node)
            ? actions.replaceComponent
            : null
        if (renderAction) {
          let toDispatch = []
          toDispatch.push({ type: renderAction, value: { node, oldNode } })
          if (attrs) toDispatch.push({ type: actions.setAttributes, value: attrs })
          dispatch(...toDispatch)
          oldNode = node
        }
        break
      case actions.pipelineChange:
        oldNode = null
        break
      case actions.mounted:
        if (hooks.mounted && oldNode === action.value) hooks.mounted(dispatch)
        break
    }
    if (actionReducer) actionReducer(action, dispatch)
    return action
  }
}

export {
  createComponent
}
