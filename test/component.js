const req = require('esm')(module, { mode: 'auto' })
const {
  createComponent
} = req('../src/component')

test('module exports createComponent as a function', () => {
  expect(typeof createComponent).toEqual('function')
})

test('createComponent should return function', () => {
  expect(typeof createComponent(() => 1, {})).toEqual('function')
})
