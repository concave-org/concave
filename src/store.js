import { actions } from './actions'

const createStore = stateReducer => {
  let state
  let initialState

  return (action, dispatch) => {
    switch (action.type) {
      case actions.state:
        if (!initialState) initialState = action.value
        state = action.value
        window.history.replaceState(state, null, document.location.href)
        break
      case actions.pipelineChange:
        // needed to reset the state with a routeBack action
        if (action.value.state) state = action.value.state
        state._route = action.value.route
        dispatch({ type: actions.state, value: JSON.parse(JSON.stringify(state)) })
        break
      case actions.routeTo:
        state = initialState
        window.history.pushState(state, null, document.location.origin + action.value)
        break
    }
    stateReducer(JSON.parse(JSON.stringify(state)), action, dispatch)
    return action
  }
}

export {
  createStore
}
