const req = require('esm')(module, { mode: 'auto' })
const {
  createStore
} = req('../src/store')

test('module exports createStore as a function', () => {
  expect(typeof createStore).toEqual('function')
})
