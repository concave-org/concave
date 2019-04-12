const req = require('esm')(module, { mode: 'auto' })
const { html } = req('../src/html')

test('module exports h as a function', () => {
  expect(typeof html).toEqual('function')
})
