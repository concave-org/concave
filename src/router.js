import { actions } from './actions'

const RESOURCE_REGEX = /([^/]+)/g

const createRouter = initialRoutes => {
  let currentRoute
  let currentQuery
  let routes = initialRoutes

  const getRoute = (path, search) => {
    const query = {}
    const searchParams = new URLSearchParams(search)
    for (const pair of searchParams.entries()) {
      query[pair[0]] = pair[1]
    }

    const pathRescources = path.match(RESOURCE_REGEX) || []

    const preparedRoutes = routes
      .filter(r => r.path)
      .map(r => ({ ...r, resources: r.path.match(RESOURCE_REGEX) || [] }))
      .filter(r => r.resources.length === pathRescources.length)

    for (let route of preparedRoutes) {
      let calcPath = pathRescources
        .map((pr, idx) => pr === route.resources[idx] ? `${pr}` : route.resources[idx][0] === ':' ? `${route.resources[idx]}` : '')
        .join('/')
      if (`/${calcPath}` === route.path) {
        return {
          ...route,
          params: route.resources.reduce((acc, cur, idx) => cur !== pathRescources[idx] ? { ...acc, [cur.substring(1)]: pathRescources[idx] } : acc, {}),
          query
        }
      }
    }
    return null
  }

  const getPipelineChange = (state = {}) => {
    const { pathname, search } = document.location

    const fallbackRoute = routes.find(r => r.fallback)
    const matchedRoute = getRoute(pathname, search)

    // only do anything when route or search params differ
    if (currentRoute !== pathname || currentQuery !== search) {
      // new route in defined routes?
      if (matchedRoute) {
        currentRoute = pathname
        currentQuery = search
        return {
          type: actions.pipelineChange,
          value: {
            pipe: matchedRoute.pipe,
            route: {
              params: matchedRoute.params,
              query: matchedRoute.query
            },
            state: state
          }
        }
        // only dispatch route change if not already on fallback route
      } else if (fallbackRoute && currentRoute !== fallbackRoute.fallback) {
        currentRoute = fallbackRoute.fallback
        currentQuery = null
        return { type: actions.routeTo, value: fallbackRoute.fallback }
      }
    }
    return {}
  }

  return (action, dispatch) => {
    if (!currentRoute) {
      window.addEventListener('popstate', event => dispatch({ type: actions.routeBack, value: event.state }))
    }

    switch (action.type) {
      case actions.state:
        if (!currentRoute) dispatch(getPipelineChange())
        break
      case actions.routeNew:
        routes = [ ...routes, ...action.value ]
        break
      case actions.routeTo:
        dispatch(getPipelineChange())
        break
      case actions.routeBack:
        dispatch(getPipelineChange(action.value))
        break
    }
    return action
  }
}

export {
  createRouter
}
