import { actions } from './actions'

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

    const foundFallback = routes.find(r => r.fallback)
    // TODO: match route params?
    const matchedRoutes = routes.find(r => r.path && r.path === pathname)

    if (matchedRoutes) {
      currentRoute = pathname
      dispatch({
        type: actions.pipelineChange,
        value: {
          pipe: matchedRoutes.pipe,
          route: { path: pathname, params },
          state: state
        }
      })
    // only dispatch route change if not already on fallback route
    } else if (foundFallback && currentRoute !== foundFallback.fallback) {
      currentRoute = foundFallback.fallback
      dispatch({ type: actions.routeTo, value: foundFallback.fallback })
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
      case actions.appendComponent:
        changePipeline(dispatch)
        break
      case actions.replaceComponent:
        changePipeline(dispatch, action.value)
        break
    }
    return action
  }
}

export {
  createRouter
}
