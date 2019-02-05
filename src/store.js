import actions from './actions'

export default stateReducer => {
  let state
  let initialState

  return (action, dispatch) => {
    switch (action.type) {
      case actions.state:
        if (!initialState) initialState = action.value
        state = action.value
        window.history.replaceState(action.value, null, document.location)
        break
      case actions.pipelineChange:
        if (action.value.state) state = action.value.state
        state._route = action.value.route
        dispatch({ type: actions.state, value: state })
        break
      case actions.routeTo:
        state = initialState
        window.history.pushState(state, null, document.location.origin + action.value)
        break
    }
    stateReducer({ ...state }, action, dispatch)
    return action
  }
}
