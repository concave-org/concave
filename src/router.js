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

    const pathResources = path.match(RESOURCE_REGEX) || []

    const preparedRoutes = routes
      .filter(r => r.path)
      .map(r => ({ ...r, resources: r.path.match(RESOURCE_REGEX) || [] }))
      .filter(r => r.resources.length === pathResources.length)

    for (let route of preparedRoutes) {
      let calcPath = pathResources
        .map((pr, idx) => pr === route.resources[idx] ? `${pr}` : route.resources[idx][0] === ':' ? `${route.resources[idx]}` : '')
        .join('/')
      if (`/${calcPath}` === route.path) {
        return {
          ...route,
          params: route.resources.reduce((acc, cur, idx) => cur !== pathResources[idx] ? { ...acc, [cur.substring(1)]: pathResources[idx] } : acc, {}),
          query
        }
      }
    }
    return null
  }

  const changePipeline = async (dispatch, state) => {
    const { pathname, search } = document.location

    const fallbackRoute = routes.find(r => r.fallback)
    const matchedRoute = getRoute(pathname, search)

    // only do anything when route or search params differ
    if (currentRoute !== pathname || currentQuery !== search) {
      // new route in defined routes?
      if (matchedRoute) {
        currentRoute = pathname
        currentQuery = search

        let _module = await matchedRoute.pipe

        dispatch({
          type: actions.pipelineChange,
          value: {
            pipe: _module.default,
            route: {
              params: matchedRoute.params,
              query: matchedRoute.query
            },
            state: state
          }
        })

        // only dispatch route change if not already on fallback route
      } else if (fallbackRoute && currentRoute !== fallbackRoute.fallback) {
        currentRoute = fallbackRoute.fallback
        currentQuery = null
        dispatch({ type: actions.routeTo, value: fallbackRoute.fallback })
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
        window.scrollTo(0, 0)
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
