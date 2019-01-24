import { aState, aRouteN, aRouteG, rb, pc } from './actions'

const createRouter = initialRoutes => {
  let currentRoute
  let routes = initialRoutes

  const changePipeline = (dispatch, state) => {
    const { pathname, search } = document.location

    const params = {}
    const searchParams = new URLSearchParams(search)
    for (const pair of searchParams.entries()) {
      params[pair[0]] = pair[1]
    }

    if (routes[pathname]) {
      currentRoute = pathname
      dispatch({
        type: pc,
        value: {
          pipe: routes[pathname],
          route: { path: pathname, props: params },
          state: state
        }
      })
    }
  }

  return (action, dispatch) => {
    if (!currentRoute) {
      window.addEventListener('popstate', event => dispatch({ type: rb, value: event.state }))
    }

    switch (action.type) {
      case aState:
        if (!currentRoute) changePipeline(dispatch)
        break
      case aRouteN:
        routes = { ...routes, ...action.value }
        break
      case aRouteG:
        changePipeline(dispatch)
        break
      case rb:
        changePipeline(dispatch, action.value)
        break
    }
    return action
  }
}

export {
  createRouter
}
