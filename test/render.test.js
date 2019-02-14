const req = require('esm')(module, { mode: 'auto' })
const {
  createRenderer
} = req('../src/render')

test('module exports createRenderer as a function', () => {
  expect(typeof createRenderer).toEqual('function')
})
