const req = require('esm')(module, { mode: 'auto' })
const {
  createStore
} = req('../src/store')

test('createStore is a function', () => {
  expect(typeof createStore).toEqual('function')
})
