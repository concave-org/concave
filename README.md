<p align="center">
  <img width="150px" src="logo.png">
</p>

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) 
[![Build Status](https://travis-ci.org/concave-org/concave.svg?branch=master)](https://travis-ci.org/concave-org/concave)
[![Coverage Status](https://coveralls.io/repos/github/concave-org/concave/badge.svg?branch=master)](https://coveralls.io/github/concave-org/concave?branch=master)


Concave is a tiny JavaScript library for building web applications (SPAs).

- **Declarative** - Components are powered by a ES6 template tag function to easily define templates.
- **Reactive** - Components will be updated & rerendered automatically by state changes.
- **Minimal** - <1KB minimized & gzipped dependency free ESM module.
- **Batteries included** - State management & routing is builtin without any dependencies.
- **Agnostic** - Store, router and rendering can be exchanged with a custom implementation.

## Why "concave"?

It's simple: You create straight forward pipelines of components and concave will spread them in your browser - like a concave lense will spread light rays that hit it straight.

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

Concave is implemented in a functional style vanilla JavaScript.

The main concept consits of a pipeline of functions which will be controlled with actions.
There are the following predefined factory function which will return ready to use pipeline functions: `createStore`, `createRouter` & `createRenderer`. These can be used on a pipeline you will create with `createPipeline` and run with `runPipeline`.
Components are also just functions and be created with `createComponent`.

Through all of these functions actions will be passed to control your application. E.g. the `aState` action - when a component receive this action, it will check if it need to update and will trigger a render action on the pipeline if neccessary.

These simple concepts result in:

- Unidirectional action flow >> time traveling & easy debugging
- Pure components >> predictive rendering results

## Documentation

### Actions

Actions are just plain JavaScript objects

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

### Pipeline
> TODO

### HTML
> TODO

### Component
> TODO

### Store
> TODO

### Router
> TODO

### Render
> TODO

## Restrictions

To keep the library as simple and small as possible there are the following restrictions:

* Component templates must have exactly one root .
* No DOM diffing or intelligent algorithm are used in favor of code size - your components will be completly rerendered.
* Browser have to support promises & async/await syntax.
* Your hoster must be able to redirect path calls (SPA routing).

## Roadmap

* Optional style inlining package (@concave/inline-style)


---

### Example

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
