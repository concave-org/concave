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

    const foundFallback = routes.find(r => r.fallback)
    // TODO: match route params?
    const matchedRoutes = routes.find(r => r.path && r.path === pathname)

    if (matchedRoutes) {
      currentRoute = pathname
      dispatch({
        type: pc,
        value: {
          pipe: matchedRoutes.pipe,
          route: { path: pathname, props: params },
          state: state
        }
      })
    } else if (foundFallback) {
      currentRoute = foundFallback.fallback
      dispatch({ type: aRouteG, value: foundFallback.fallback })
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
        routes = [ ...routes, ...action.value ]
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
