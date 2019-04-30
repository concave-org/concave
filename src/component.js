import { actions } from './actions'

const template = document.createElement('template')

const createComponent = (renderFn, props = {}) => {
  let oldNode

  return (action, dispatch) => {
    switch (action.type) {
      case actions.state:
        let { h, attrs } = renderFn(action.value, props)
        template.innerHTML = h
        let node = template.content.cloneNode(true)
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
          oldNode = template.content.cloneNode(true)
        }
        break
      case actions.pipelineChange:
        oldNode = null
        break
    }
    return action
  }
}

export {
  createComponent
}
