const req = require('esm')(module, { mode: 'auto' })
const { actions } = req('../src/actions')

test('module exports actions as object', () => {
  expect(typeof actions).toEqual('object')
})

test('actions are strings', () => {
  expect(typeof actions.state).toEqual('string')
  expect(typeof actions.routeTo).toEqual('string')
  expect(typeof actions.routeBack).toEqual('string')
  expect(typeof actions.routeNew).toEqual('string')
  expect(typeof actions.pipelineChange).toEqual('string')
  expect(typeof actions.appendComponent).toEqual('string')
  expect(typeof actions.replaceComponent).toEqual('string')
  expect(typeof actions.setAttributes).toEqual('string')
})
