# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
