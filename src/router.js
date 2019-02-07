import { actions } from './actions'

const createRouter = initialRoutes => {
  let currentRoute
  let currentParams
  let routes = initialRoutes

  const changePipeline = (dispatch, state = null) => {
    const { pathname, search } = document.location

    const params = {}
    const searchParams = new URLSearchParams(search)
    for (const pair of searchParams.entries()) {
      params[pair[0]] = pair[1]
    }

    const foundFallback = routes.find(r => r.fallback)
    const matchedRoute = routes.find(r => r.path && r.path === pathname)

    // only do anything when route or search params differ
    if (currentRoute !== pathname || currentParams !== search) {
      // new route in defined routes?
      if (matchedRoute) {
        currentRoute = pathname
        currentParams = search
        dispatch({
          type: actions.pipelineChange,
          value: {
            pipe: matchedRoute.pipe,
            route: { path: pathname, params },
            state: state
          }
        })
        // only dispatch route change if not already on fallback route
      } else if (foundFallback && currentRoute !== foundFallback.fallback) {
        currentRoute = foundFallback.fallback
        currentParams = null
        dispatch({ type: actions.routeTo, value: foundFallback.fallback })
      }
    }
  }

  return (action, dispatch) => {
    if (!currentRoute) {
      window.addEventListener('popstate', event => dispatch({ type: actions.routeBack, value: event.state }))
    }

    switch (action.type) {
      case actions.state:
        if (!currentRoute) changePipeline(dispatch)
        break
      case actions.routeNew:
        routes = [ ...routes, ...action.value ]
        break
      case actions.routeTo:
        changePipeline(dispatch)
        break
      case actions.routeBack:
        changePipeline(dispatch, action.value)
        break
    }
    return action
  }
}

export {
  createRouter
}
