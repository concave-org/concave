const req = require('esm')(module, { mode: 'auto' })
const {
  createRouter
} = req('../src/router')

test('createRouter is a function', () => {
  expect(typeof createRouter).toEqual('function')
})
