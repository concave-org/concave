import { actions } from './actions'

const RESOURCE_REGEX = /([^/]+)/g

const createRouter = initialRoutes => {
  let currentRoute
  let currentQuery
  let routes = initialRoutes

  // TODO: optimize code for bundle size
  const getMatchedRoute = path => {
    const pathRescources = path.match(RESOURCE_REGEX) || []

    const preparedRoutes = routes
      .map(r => ({ ...r, resources: r.path.match(RESOURCE_REGEX) || [] }))
      .filter(r => r.resources.length === pathRescources.length)
      .map(r => ({ ...r, params: r.resources.reduce((acc, cur, idx) => cur !== pathRescources[idx] ? { ...acc, [cur]: pathRescources[idx] } : acc, {}) }))

    for (let route of preparedRoutes) {
      let calcPath = pathRescources
        .map((pr, idx) => pr === route.resources[idx] ? pr : route.resources[idx])
        .join('/')
      if (`/${calcPath}` === route.path) return route
    }
  }

  const changePipeline = (dispatch, state = null) => {
    const { pathname, search } = document.location

    const query = {}
    const searchParams = new URLSearchParams(search)
    for (const pair of searchParams.entries()) {
      query[pair[0]] = pair[1]
    }

    const foundFallback = routes.find(r => r.fallback)
    // const matchedRoute = routes.find(r => r.path && r.path === pathname)

    const matchedRoute = getMatchedRoute(pathname)

    // only do anything when route or search params differ
    if (currentRoute !== pathname || currentQuery !== search) {
      // new route in defined routes?
      if (matchedRoute) {
        currentRoute = pathname
        currentQuery = search
        dispatch({
          type: actions.pipelineChange,
          value: {
            pipe: matchedRoute.pipe,
            route: { path: pathname, params: matchedRoute.params, query },
            state: state
          }
        })
        // only dispatch route change if not already on fallback route
      } else if (foundFallback && currentRoute !== foundFallback.fallback) {
        currentRoute = foundFallback.fallback
        currentQuery = null
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
