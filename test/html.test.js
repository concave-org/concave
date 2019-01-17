const req = require('esm')(module, { mode: 'auto' })
const { h } = req('../src/html')

test('h is a function', () => {
  expect(typeof h).toEqual('function')
})
