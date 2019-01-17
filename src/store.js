import { aState, pc, aRouteG } from './actions'

const createStore = stateReducer => {
  let state
  let initialState

  return (action, dispatch) => {
    switch (action.type) {
      case aState:
        if (!initialState) initialState = action.value
        state = action.value
        window.history.replaceState(action.value, null, document.location)
        break
      case pc:
        if (action.value.state) state = action.value.state
        dispatch({ type: aState, value: state })
        break
      case aRouteG:
        state = initialState
        window.history.pushState(state, null, document.location.origin + action.value)
        break
    }
    stateReducer({ ...state }, action, dispatch)
    return action
  }
}

export {
  createStore
}
