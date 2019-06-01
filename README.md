<p align="center">
  <img width="150px" src="logos/logo.png">
</p>

# Concave

[![CircleCI](https://circleci.com/gh/concave-org/concave.svg?style=svg)](https://circleci.com/gh/concave-org/concave)
[![NPM](https://img.shields.io/npm/v/@concave/concave.svg)](https://www.npmjs.com/package/@concave/concave)

...is a tiny JavaScript framework for building "Single Page Applications" (SPAs).

- **Declarative** - Components are powered by a ES6 template tag function to easily define templates
- **Reactive** - Components will be updated & re-rendered automatically by state changes
- **Batteries included** - State management & router are builtin without any dependencies
- **Minimal** - ~1.5 KiB minimized & gzipped dependency free ESM module

> Spreading pipelines of components to your browser like a concave lense will spread light rays.

## Links

- [Changelog](CHANGELOG.md)
- [Documentation](#Documentation)
- [CodeSandbox](https://codesandbox.io/s/github/concave-org/codesandbox-hello-world)

## Sponsors

The following sponsors help to test, build and maintain this project. Thank you very much for using your services and products to improve this project:

### BrowserStack

[![BrowserStack](logos/browserstack.png)](https://www.browserstack.com)

## Why another framework

Not everyone needs a framework that's bigger as the application code itself. Often I don't need all the features of React, Vue, Angular and so on for a specific app. Every library has it's dark corners where you struggle or need to find a hacky solution. I invented this project to find a solution that's fast enough for most use cases and provide a maintainable art of developing while beeing as small as possible. The story began with `ui = view(state)` and ended with a concave lense for pipelines.

### Use concave

- Small to medium sized applications
- Bootstraping web applications (preload real app in the background)
- Progressive Web App (PWA)

### Don't use concave

- Big sized applications with a lot of components and forms (rerendering will not be performant?)

## Package

The concave package on NPM provides CommonJS, UMD or ESM modules:

- dist/concave.cjs.js
- dist/concave.umd.js
- dist/concave.esm.js

```shell
npm i @concave/concave

yarn add @concave/concave
```

## Concept

The main concept consists of a pipeline of functions which will be controlled with actions (plain JavaScript objects). If you are familiar with functional programming concepts, then you will recognize that a pipeline in concave is mostly the same as the result of a `pipe` function in FP.

There are the following predefined factory functions which will return ready to use pipeline functions:

- `createStore` >> creates a store pipeline function
- `createRouter` >> creates a router pipeline function
- `createRenderer` >> creates a renderer pipeline function
- `createComponent` >> creates a component pipeline function

They will be composed with `createPipeline` which returns a pipeline of functions. You can also compose pipelines with `createPipeline` if you want. This could be interesting if you want to compose different parts of your application.

With `runPipeline` you start your pipeline and the first action (state) will flow through the functions.

Through all of these composed functions, actions will be passed to control your application. E.g. the `state` action - when a component receive this action, it will check if it need to update itself and will trigger a render action on the pipeline if neccessary.

This simple concept results in:

- Unidirectional action flow >> time traveling & easy debugging
- Pure components >> predictive rendering results
- Single source of truth store >> only a state reducer can modify the state

## Documentation

- [Actions](#Actions)
- [HTML](#HTML)
- [Component](#Component)
- [Pipeline](#Pipeline)
- [Store](#Store)
- [Router](#Router)
- [Render](#Render)

### Actions

Actions are just plain JavaScript objects which flow through your pipelines and control the application.

All internal and external actions are published and accessible:

```javascript
import { actions } from '@concave/concave'

// actions.state
// actions.routeTo
// actions.routeNew
// ...
```

Custom actions:

```javascript
const aCount = {
  type: 'COUNT',
  value: 3
}
```

... can be dispatched with `dispatch(...objects)` in pipeline functions:

```javascript
dispatch(aCount)
dispatch({ type: 'COUNT', value: 3 }, { type: 'COUNT', value: 4 }, ...[{}, {}])
```

### HTML

To render a component in the DOM you can define a render function with the shape `(state, props) => { h: html(template), attrs: {...} }`:

```javascript
const renderFn = (state, props) =>
  ({
    h: html
        `<div id="example">
           <p>${state.text}</p>
           <input id="${props.inputID}"/>
         </div>
        `,
    attrs: {
      example: {
        onchange: event => ({ type: 'INPUT', value: event.target.value }),
        onclick: () => console.log('clicked'),
        style: 'margin-left: 10px;'
      }
    }
  })
```

If your passed function returns an object, concave will dispatch it as action on the pipeline - every other type will be set as attribute value.
To actually use the action to modify the state you have to implement a state reducer - see [Store](#Store).

#### Composition

To create a nested tree you can compose the `html` function:

```javascript
const renderSub = (state, props) => ({ h: html`<p>I'am sub with text: ${state.text}</p>` })

const renderFn = (state, props) =>
  ({ h: html
      `<div id="${props.componentID}">
         <p>${state.text}</p>
         ${renderSub(state, {})}
       </div>
      `
  )}
```

### Component

To finally create a component you pass the defined render function to `createComponent(renderFn, props, hooks, actionReducer)`:

```javascript
const component = createComponent(
  renderFn,
  { componentID: 'hello-world' },
  { mounted: dispatch => {}},
  actionReducer
)
```

Components are first class citizens on pipelines. They will be automatically rendered on state or route changes.

**Note**: Components must have exactly one root element returned by the render function!

#### Lifecycle hooks

If you pass the lifecycle function `mounted(dispatch)` in an object to `createComponent(...)`, this function will be called when the component is inserted in the DOM. You can use it e.g. to fetch data asynchronously and display a loading spinner in the meantime.

```javascript
const renderFn = () => {...}
const props = {...}

const hooks = {
  mounted: dispatch => {
    dispatch({type: 'GET_DATA'})
  }
}

const component = createComponent(renderFn, props, hooks)
```

#### Action reducer

To allow messaging between your components or other pipeline functions you can pass a `actionReducer(action, dispatch)` to `createComponent(...)`. This function will be called with the actual action and the dispatch function. You can use e.g. to advice another component to do or inform about something.

```javascript
const renderFn = () => {...}
const props = {
  todos: [{...}, {...}, {...}]
}
const hooks = {...}

const actionReducer = (action, reducer) => {
  switch(action.type) {
    case 'ADD_TODO':
      props.todos.push(action.value) // modify locale state
      dispatch({ type: actions.rerender }) // will trigger rerendering
      break
  }
}

const component = createComponent(renderFn, props, hooks, actionReducer)
```

### Pipeline

The pipeline is the heart of concave. Through pipeline functions actions will flow to manage the state, routing and rendering. To create a pipeline you have to use the factory function `createPipeline(...pipelineFns)`:

```javascript
const helloPipe = createPipeline(component)
```

For each route of your SPA you have to create such a component pipeline that will be used after a route change. Please see the [Router](#Router) section to know how to define routes with component pipelines.

For managing the core of your app you have to define at least one base or core pipeline:

```javascript
const corePipe = createPipeline(appStore, appRouter, appRender)
```

To actually run a pipeline you have to use `runPipeline(corePipe)(initialState)` - this will start your application:

```javascript
const initialState = {
  text: 'Hello World!',
  counter: 0
}

runPipeline(corePipe)(initialState)
// const dispatch = runPipeline(corePipe)(initialState)
```

Optionally `runPipeline(...)` will return the `dispatch` function which will give you access to the applications pipeline.

#### Custom pipeline functions

If you need to react on your defined and dispatched actions you can implement your own custom pipeline functions to do something with these actions:

```javascript
const custom = (action, dispatch) => {
  switch (action.type) {
    case 'SOME_ACTION':
      // do something with action.value
      break
  }
  return action
}

const corePipe = createPipeline(appStore, appRouter, appRender, custom)
```

It's important that your function return the original action at the end, otherwise no trailing pipeline function will receive that action. Custom functions are an better approach to decouple your application logic and state.

```javascript
const logger = (action, dispatch) => {
  console.log(action)
  return action
}

const corePipe = createPipeline(logger, appStore, appRouter, appRender)
```

### Store

The builtin state management is a single source of truth store which holds just a plain JavaScript object as global state. When the pipeline runs for the first time the initial state will override the stores state. Modifications of the state can only be done with a state reducer. A store can be created with `createStore((state, action, dispatch) => action)`:

```javascript
const appStore = createStore(
    (state, action, dispatch) => {
      switch (action.type) {
        // state reducer
        case 'COUNT':
          dispatch({ 
            type: actions.state, 
            value: { ...state, counter: state.counter + 1 }
          })
          break
      }
      return action
    }
)
```

### Router

The builtin router is using the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History) for saving the actual state of a route in the browser. To create a router you have to use `createRoute(routes)`:

```javascript
import * as hello from './myHelloPipeline.js'
const helloPipe = () => hello

const routes = [
  {
    fallback: '/hello?name=test' // define a fallback route
  },
  {
    path: '/hello',
    pipe: helloPipe
  },
  {
    path:'/async',
    pipe: () => import('./somePipe.js') // e.g. code splitting with webpack/rollup dynamic import
  }
]

const appRouter = createRouter(routes)
```

To actually change a route from your application you have to dispatch the action `routeTo` with the path of the new route as value. If you want to define a new route at runtime you have to dispatch the action `routeNew` with an array of objects with the new routes:

```javascript
const routeToAction = {
  type: actions.routeTo,
  value: '/home'
}

const routeNewAction = {
  type: actions.routeNew,
  value: [
    { path: '/newroute', pipe: () => newRoutePipe },
    { path: '/newer/:route', pipe: () => newerRoutePipe }
  ]
}
```

The route and it's params will be saved on the global state object as `_route`, so you are able to access them in your components with `state._route.params` and `state._route.query`:

`/test/123?id=1`

```javascript

const routes =[
  { path: '/test/:name', pipe: () => testPipe }
]

_route: {
  path: 'test',
  params: {
    name: '123'
  },
  query: {
    id: '1'
  }
}
```

### Render

To render your components at a specific mountpoint you have to create a render pipeline function with `createRenderer(mountpoint)`:

```javascript
const mountpoint = document.getElementById('app')
const appRender = createRenderer(mountpoint)
```

All components of your defined route pipelines will now be rendered at the DOM node with the ID `app`, so you must have to define this in your `index.html` or whatever structure you have:

```html
<div id="app"></div>
```

#### Rerendering

Reactivity in concave normally relies on state changes but you can force a rerendering evaluation by dispatching the `rerender` action that is exposed by `actions`.
If your component's render function e.g. uses local state of the props, concave will not automatically rerender changes if a property changes. You have to manually dispatch the `rerender` action after changing the property which will lead to a different HTML output.

## Browser support

All modern browsers are supported - dinosaur IE11 not!
