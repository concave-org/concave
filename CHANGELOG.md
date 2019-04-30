# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.2.3"></a>
## [1.2.3](https://github.com/concave-org/concave/compare/v1.2.2...v1.2.3) (2019-04-30)


### Bug Fixes

* **store:** deep clone state ([d59589d](https://github.com/concave-org/concave/commit/d59589d))



<a name="1.2.2"></a>
## [1.2.2](https://github.com/concave-org/concave/compare/v1.2.1...v1.2.2) (2019-04-30)


### Bug Fixes

* **component:** revert back multiple root changes ([b09786e](https://github.com/concave-org/concave/commit/b09786e))



<a name="1.2.1"></a>
## [1.2.1](https://github.com/concave-org/concave/compare/v1.2.0...v1.2.1) (2019-04-30)


### Bug Fixes

* comparison of old and new node when using fragments ([54afdb8](https://github.com/concave-org/concave/commit/54afdb8))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/concave-org/concave/compare/v1.1.0...v1.2.0) (2019-04-29)


### Features

* **component:** allow templates with multiple roots ([5ffe1ab](https://github.com/concave-org/concave/commit/5ffe1ab))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/concave-org/concave/compare/v1.0.3...v1.1.0) (2019-04-26)


### Features

* **component:** only allow attrs passed via render function ([ab7dfba](https://github.com/concave-org/concave/commit/ab7dfba))


### BREAKING CHANGES

* **component:** moved setting of attributes completly to render function



<a name="1.0.3"></a>
## [1.0.3](https://github.com/concave-org/concave/compare/v1.0.2...v1.0.3) (2019-04-18)


### Bug Fixes

* **render:** only focus on existent element ([5d8cad9](https://github.com/concave-org/concave/commit/5d8cad9))



<a name="1.0.2"></a>
## [1.0.2](https://github.com/concave-org/concave/compare/v1.0.1...v1.0.2) (2019-04-18)


### Bug Fixes

* **render:** check if there is an active element ([e767b1a](https://github.com/concave-org/concave/commit/e767b1a))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/concave-org/concave/compare/v1.0.0...v1.0.1) (2019-04-12)


### Bug Fixes

* **router:** improved promise detection ([16bf3cd](https://github.com/concave-org/concave/commit/16bf3cd))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/concave-org/concave/compare/v0.14.2...v1.0.0) (2019-04-12)


### Bug Fixes

* rename import ([c1bfd56](https://github.com/concave-org/concave/commit/c1bfd56))


### Features

* **html:** change exported function name to html ([2e8e9c5](https://github.com/concave-org/concave/commit/2e8e9c5))


### BREAKING CHANGES

* **html:** renamed h`...`to html`...`



<a name="0.14.2"></a>
## [0.14.2](https://github.com/concave-org/concave/compare/v0.14.1...v0.14.2) (2019-04-12)



<a name="0.14.1"></a>
## [0.14.1](https://github.com/concave-org/concave/compare/v0.14.0...v0.14.1) (2019-04-12)


### Bug Fixes

* **router:** load routes from es6 import and promise ([4207bcc](https://github.com/concave-org/concave/commit/4207bcc))



<a name="0.14.0"></a>
# [0.14.0](https://github.com/concave-org/concave/compare/v0.13.0...v0.14.0) (2019-04-03)


### Bug Fixes

* **router:** default parameter must be null ([79098e2](https://github.com/concave-org/concave/commit/79098e2))


### Features

* **router:** scroll to top after route change (close [#14](https://github.com/concave-org/concave/issues/14)) ([c8830d2](https://github.com/concave-org/concave/commit/c8830d2))
* **router:** support async routes (close [#11](https://github.com/concave-org/concave/issues/11)) ([41930ff](https://github.com/concave-org/concave/commit/41930ff))



<a name="0.13.0"></a>
# [0.13.0](https://github.com/concave-org/concave/compare/v0.12.0...v0.13.0) (2019-02-21)


### Features

* **pipeline:** Return dispatch function. ([c4fadac](https://github.com/concave-org/concave/commit/c4fadac))



<a name="0.12.0"></a>
# [0.12.0](https://github.com/concave-org/concave/compare/v0.11.2...v0.12.0) (2019-02-14)


### Features

* **pipeline:** Allow multiple action dispatching. ([38a7e01](https://github.com/concave-org/concave/commit/38a7e01))



<a name="0.11.2"></a>
## [0.11.2](https://github.com/concave-org/concave/compare/v0.11.1...v0.11.2) (2019-02-11)


### Bug Fixes

* **router:** Pass search query string to function. ([5bb28b1](https://github.com/concave-org/concave/commit/5bb28b1))



<a name="0.11.1"></a>
## [0.11.1](https://github.com/concave-org/concave/compare/v0.11.0...v0.11.1) (2019-02-11)


### Bug Fixes

* **router:** Find correct route for root path. ([e277503](https://github.com/concave-org/concave/commit/e277503))



<a name="0.11.0"></a>
# [0.11.0](https://github.com/concave-org/concave/compare/v0.10.0...v0.11.0) (2019-02-10)


### Bug Fixes

* **router:** Dynamic routes are matched correctly if only one level deep. ([c340347](https://github.com/concave-org/concave/commit/c340347))


### Features

* **router:** Introduce dynamic routes with parameter matching. ([f625855](https://github.com/concave-org/concave/commit/f625855))


### BREAKING CHANGES

* **router:** state._route.params is renamed to state._route.query.



<a name="0.10.0"></a>
# [0.10.0](https://github.com/concave-org/concave/compare/v0.9.3...v0.10.0) (2019-02-07)


### Features

* **component:** Set dynamic attributes that depend on the global state. ([349fb15](https://github.com/concave-org/concave/commit/349fb15))


### BREAKING CHANGES

* **component:** A render function must now return an object with `h` and `attrs` property.



<a name="0.9.3"></a>
## [0.9.3](https://github.com/concave-org/concave/compare/v0.9.2...v0.9.3) (2019-02-07)


### Bug Fixes

* **router:** Enable routing when params will change. ([be4a63d](https://github.com/concave-org/concave/commit/be4a63d))



<a name="0.9.2"></a>
## [0.9.2](https://github.com/concave-org/concave/compare/v0.9.1...v0.9.2) (2019-02-07)



<a name="0.9.1"></a>
## [0.9.1](https://github.com/concave-org/concave/compare/v0.9.0...v0.9.1) (2019-02-06)


### Reverts

* **html:** Revert regex changes. ([5cfe447](https://github.com/concave-org/concave/commit/5cfe447))



<a name="0.9.0"></a>
# [0.9.0](https://github.com/concave-org/concave/compare/v0.8.1...v0.9.0) (2019-02-06)


### Features

* **html:** Better template compression. ([015033e](https://github.com/concave-org/concave/commit/015033e))
* **html:** Even better template compression. ([9e820e4](https://github.com/concave-org/concave/commit/9e820e4))


### Reverts

* **html:** Add regex expression. ([c09175d](https://github.com/concave-org/concave/commit/c09175d))



<a name="0.8.1"></a>
## [0.8.1](https://github.com/concave-org/concave/compare/v0.8.0...v0.8.1) (2019-02-05)


### Bug Fixes

* **router:** Change action type. ([8950af8](https://github.com/concave-org/concave/commit/8950af8))



<a name="0.8.0"></a>
# [0.8.0](https://github.com/concave-org/concave/compare/v0.7.2...v0.8.0) (2019-02-05)


### Code Refactoring

* **actions:** Default export object of actions. ([cef345f](https://github.com/concave-org/concave/commit/cef345f))


### BREAKING CHANGES

* **actions:** Actions are now exported as object and have longer names.



<a name="0.7.2"></a>
## [0.7.2](https://github.com/concave-org/concave/compare/v0.7.1...v0.7.2) (2019-02-01)


### Bug Fixes

* **render:** Add event listener with passive option. ([0d5af81](https://github.com/concave-org/concave/commit/0d5af81))



<a name="0.7.1"></a>
## [0.7.1](https://github.com/concave-org/concave/compare/v0.7.0...v0.7.1) (2019-01-29)


### Bug Fixes

* **render:** Use different element gathering method. ([574c4b1](https://github.com/concave-org/concave/commit/574c4b1))



<a name="0.7.0"></a>
# [0.7.0](https://github.com/concave-org/concave/compare/v0.6.4...v0.7.0) (2019-01-29)


### Bug Fixes

* **router:** Prevent fallback routing loop. ([c9c53a5](https://github.com/concave-org/concave/commit/c9c53a5))


### Code Refactoring

* **router:** Rename router props to params. ([988e621](https://github.com/concave-org/concave/commit/988e621))


### BREAKING CHANGES

* **router:** Please access route params at state._route.params instead of state._route.props.



<a name="0.6.4"></a>
## [0.6.4](https://github.com/concave-org/concave/compare/v0.6.3...v0.6.4) (2019-01-28)


### Bug Fixes

* **router:** Use aRouteG action to fallback. ([e90fc55](https://github.com/concave-org/concave/commit/e90fc55))



<a name="0.6.3"></a>
## [0.6.3](https://github.com/concave-org/concave/compare/v0.6.2...v0.6.3) (2019-01-28)


### Bug Fixes

* **router:** Dispatch correct path value. ([30425b7](https://github.com/concave-org/concave/commit/30425b7))



<a name="0.6.2"></a>
## [0.6.2](https://github.com/concave-org/concave/compare/v0.6.1...v0.6.2) (2019-01-28)


### Bug Fixes

* **router:** Return fallback obj instead of filtered array. ([7dad4df](https://github.com/concave-org/concave/commit/7dad4df))



<a name="0.6.1"></a>
## [0.6.1](https://github.com/concave-org/concave/compare/v0.6.0...v0.6.1) (2019-01-28)


### Bug Fixes

* **router:** Redirect browser to fallback href. ([ac14654](https://github.com/concave-org/concave/commit/ac14654))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/concave-org/concave/compare/v0.5.0...v0.6.0) (2019-01-28)


### Bug Fixes

* **render:** Only add event listener when element exists. ([3a8fbbd](https://github.com/concave-org/concave/commit/3a8fbbd))


### Features

* **router:** Consider fallback route. ([e162eb9](https://github.com/concave-org/concave/commit/e162eb9))


### BREAKING CHANGES

* **router:** Routes must be now passed as an array instead as object. Please see the README for an example!



<a name="0.5.0"></a>
# [0.5.0](https://github.com/concave-org/concave/compare/v0.4.1...v0.5.0) (2019-01-25)


### Bug Fixes

* **render:** Re-focus when value is an empty string. ([593ea01](https://github.com/concave-org/concave/commit/593ea01))


### Features

* **html:** Enable composition of render functions. ([b46e713](https://github.com/concave-org/concave/commit/b46e713))



<a name="0.4.1"></a>
## [0.4.1](https://github.com/concave-org/concave/compare/v0.4.0...v0.4.1) (2019-01-25)


### Bug Fixes

* **render:** Re-focus elements with value prop and selection-range if necessary. ([3e811bf](https://github.com/concave-org/concave/commit/3e811bf))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/concave-org/concave/compare/v0.3.2...v0.4.0) (2019-01-24)


### Bug Fixes

* **router:** Save route path & props in global state. ([acf7a16](https://github.com/concave-org/concave/commit/acf7a16))


### BREAKING CHANGES

* **router:** Renamed _props to _route object in global state.



<a name="0.3.2"></a>
## [0.3.2](https://github.com/concave-org/concave/compare/v0.3.1...v0.3.2) (2019-01-24)


### Bug Fixes

* **store:** Save router props in state. ([481fbbc](https://github.com/concave-org/concave/commit/481fbbc))



<a name="0.3.1"></a>
## [0.3.1](https://github.com/concave-org/concave/compare/v0.3.0...v0.3.1) (2019-01-23)



<a name="0.3.0"></a>
# [0.3.0](https://github.com/concave-org/concave/compare/v0.2.1...v0.3.0) (2019-01-22)


### Features

* **render:** Re-focus textfields after rendering. ([7b8c256](https://github.com/concave-org/concave/commit/7b8c256))


### Reverts

* Disable multiple action dispatching. ([88a98f6](https://github.com/concave-org/concave/commit/88a98f6))


### BREAKING CHANGES

* Event handler functions should return an object to dispatch an action.



<a name="0.2.1"></a>
## [0.2.1](https://github.com/concave-org/concave/compare/v0.2.0...v0.2.1) (2019-01-21)


### Bug Fixes

* **pipeline:** Queue multiple actions one after another. ([a3e6e94](https://github.com/concave-org/concave/commit/a3e6e94))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/concave-org/concave/compare/v0.1.1...v0.2.0) (2019-01-21)


### Features

* **pipeline:** Enable multiple action dispatching. ([6c7621a](https://github.com/concave-org/concave/commit/6c7621a))
* **render:** Enable multiple action dispatching for event handlers. ([a25602c](https://github.com/concave-org/concave/commit/a25602c))


### BREAKING CHANGES

* **render:** Event handlers must return an array of objects where the objects are actions that should be dispatched.



<a name="0.1.1"></a>
## [0.1.1](https://github.com/concave-org/concave/compare/v0.1.0...v0.1.1) (2019-01-21)


### Bug Fixes

* **render:** Only dispatch object as action if right type will be returned. ([b60156a](https://github.com/concave-org/concave/commit/b60156a))



<a name="0.1.0"></a>
# [0.1.0](https://github.com/concave-org/concave/compare/v0.0.1...v0.1.0) (2019-01-20)


### Features

* **render:** Pass events to event listener function for action dispatching. ([387259e](https://github.com/concave-org/concave/commit/387259e))



<a name="0.0.1"></a>
## 0.0.1 (2019-01-17)
