const req = require('esm')(module, { mode: 'auto' })
const { h } = req('../src/html')

test('module exports h as a function', () => {
  expect(typeof h).toEqual('function')
})
