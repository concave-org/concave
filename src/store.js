import { actions } from './actions'
import { deepCopy } from './utils'

const createStore = stateReducer => {
  let state
  let initialState

  return (action, dispatch) => {
    switch (action.type) {
      case actions.state:
        if (!initialState) initialState = deepCopy(action.value)
        state = deepCopy(action.value)
        window.history.replaceState(state, null, document.location.href)
        break
      case actions.pipelineChange:
        // needed to reset the state with a routeBack action
        if (action.value.state) state = deepCopy(action.value.state)
        state._route = deepCopy(action.value.route)
        dispatch({ type: actions.state, value: state })
        break
      case actions.routeTo:
        state = deepCopy(initialState)
        window.history.pushState(state, null, document.location.origin + action.value)
        break
    }
    stateReducer(deepCopy(state), action, dispatch)
    return action
  }
}

export {
  createStore
}
