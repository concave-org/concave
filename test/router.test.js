const req = require('esm')(module, { mode: 'auto' })
const {
  createRouter
} = req('../src/router')

test('module exports createRouter as a function', () => {
  expect(typeof createRouter).toEqual('function')
})
