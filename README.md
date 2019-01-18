<p align="center">
  <img width="150px" src="logo.png">
</p>

# Concave

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/concave-org/concave/blob/master/LICENSE)
[![NPM](https://img.shields.io/npm/v/@concave/concave.svg)](https://www.npmjs.com/package/@concave/concave)
[![Build Status](https://travis-ci.org/concave-org/concave.svg?branch=master)](https://travis-ci.org/concave-org/concave)
[![Greenkeeper badge](https://badges.greenkeeper.io/concave-org/concave.svg)](https://greenkeeper.io/)

...is a tiny JavaScript library for building web applications (SPAs).

- **Declarative** - Components are powered by a ES6 template tag function to easily define templates.
- **Reactive** - Components will be updated & rerendered automatically by state changes.
- **Minimal** - <1KiB minimized & gzipped dependency free ESM module.
- **Batteries included** - State management & routing is builtin without any dependencies.
- **Agnostic** - Store, router and rendering can be exchanged with a custom implementation.

> Spreading pipelines of components to your browser like a concave lense will spread light rays.

## Links

- [Examples](https://github.com/concave-org/examples)
- [Documentation](#Documentation)
- [Roadmap](#Roadmap)

## Why another library

Not everyone needs a library that's bigger as the application code itself. Often I don't need all the features of React, Vue, Angular and so on for a specific app. Every library has it's dark corners where you struggle or need to find a hacky solution. I invented this project to find a solution that's fast enough for most use cases and provide a maintainable art of developing while beeing as small as possible. The story began with `ui = view(state)` and ended with a concave lense for pipelines.

### Use concave

- Small to medium sized applications
- Bootstraping web applications
- Progressive Web App (PWA)

### Don't use concave

- Big sized applications with a lot of components and forms

## Package

The concave package on NPM provides CommonJS, UMD or ESM modules:

- dist/concave.cjs.js
- dist/concave.umd.js
- dist/concave.esm.js

```shell
npm i @concave/concave

yarn add @concave/concave
```

## Concepts

Concave is implemented in a functional style with vanilla JavaScript.

The main concept consits of a pipeline of functions which will be controlled with actions.
There are the following predefined factory functions which will return ready to use pipeline functions: `createStore`, `createRouter` & `createRenderer`. These can be used on a pipeline you will create with `createPipeline` and run with `runPipeline`.
Components are also just functions and will be created with `createComponent`.

Through all of these functions actions will be passed to control your application. E.g. the `aState` action - when a component receive this action, it will check if it need to update and will trigger a render action on the pipeline if neccessary.

These simple concepts result in:

- Unidirectional action flow >> time traveling & easy debugging
- Pure components >> predictive rendering results
- Single source of truth store >> only a state reducer can modify the state

## Documentation

### Actions

Actions are just plain JavaScript objects which flow through your pipelines and control the application.

```javascript
const aCount = {
  type: 'COUNT',
  value: 3
}
```

and can be dispatched, when the function is available

```javascript
dispatch(aCount)
dispatch({ type: 'COUNT', value: 3 })
```

### HTML

To render a component in the DOM you can define a render function with the shape `(state, props) => h(template)`:

```javascript
const renderFn = (state, props) => h
`<div id="${props.componentID}">
   <p>${state.text}</p>
  </div>`
```

This is standard ES6 (template literals).

### Component

To finally create a component you pass the defined render function to `createComponent(renderFn, props)`:

```javascript
const component = createComponent(renderFn, { componentID: 'hello-world' })
```

Components are first class citizens on pipelines. They will be automatically rendered on state or route changes.

#### HTML events

To be able to react on HTML events e.g. click you have to pass a special property `_attrs` in your props. You can pass a function or object as event handler:

##### function

```javascript
const props = {
  componentID: 'hello-world',
  _attrs: {
    'hello-world': {
      onclick: event => console.log(event)
    }
  }
}
```

##### object

```javascript
const props = {
  componentID: 'hello-world',
  _attrs: {
    'hello-world': {
      onclick: {
        type: 'COUNT',
        value: 1
      }
    }
  }
}
```

Passing an object means dispatching an action that is defined with the object.

### Pipeline

The pipeline is the heart of concave. Through pipeline functions actions will flow to manage the state, routing and rendering. To create a pipeline you have to use the factory function `createPipeline(...pipelineFns)`:

```javascript
const helloPipe = createPipeline(component)
```

For each route of your SPA you have create such a component pipeline that will be used after a route change. Please see the [Router](#Router) section to know how to define routes with component pipelines.

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
```

### Store

The builtin state management is a single source of truth store which holds just a plain JavaScript object as global state. When the pipeline runs for the first time the initial state will override the stores state. Modifications of the state can only be done with a state reducer. A store can be created with `createStore((state, action, dispatch) => action)`:

```javascript
const appStore = createStore(
    (state, action, dispatch) => {
      switch (action.type) {
        // state reducer
        case 'COUNT':
          dispatch({ type: aState, value: { ...state, counter: state.counter + 1 } })
          break
      }
      return action
    }
)
```

### Router

The builtin router is using the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History) for saving the actual state of a route in the browser. To create a router you have to use `createRoute(routes)`:

```javascript
const routes = {
  '/': helloPipe
}

const appRouter = createRouter(routes)
```

To actually change a route from your application you have to dispatch the action `aRouteG` (action route go) with the path of the new route as value. If you want to define a new route at runtime you have to dispatch the action `aRouteN` (action route new) with an object of the new routes as value:

```javascript
const routeGoAction = {
  type: aRouteG,
  value: '/home'
}

const routeNewAction = {
  type: aRouteN,
  value: {
    '/newroute': newRoutePipe,
    '/newerroute': newerRoutePipe
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
<div id="app"/>
```

## Restrictions

To keep the library as simple and small as possible there are the following restrictions:

- Component templates must have exactly one root.
- No DOM diffing or intelligent algorithm are used in favor of code size - your components will be completly rerendered.
- Browser have to support promises & async/await syntax.
- No error handling at all
- Your hoster must be able to redirect path calls (SPA routing).

## Roadmap

- Optional style inlining package (@concave/inline-style)

---

## Example

```javascript
import {
  runPipeline,
  createStore,
  createRouter,
  createRenderer,
  createPipeline,
  aState
} from 'concave'

const hello = createComponent((state, props) =>
  h`
    <div id="${props.componentID}">
      <p>${state.text}</p>
    </div>
  `,
  { componentID: 'hello-world' }
)

const helloPipe = createPipeline(hello)

const appStore = createStore(
    (state, action, dispatch) => {
      switch (action.type) {
        // ...dispatch aState here with new state
      }
      return action
    }
)

const appRouter = createRouter({
  '/': helloPipe
})

const appRender = createRenderer(document.getElementById('app'))
const corePipe = createPipeline(appStore, appRouter, appRender)
const initialState = {
  text: 'Hello World'
}

runPipeline(corePipe)(initialState)
```
