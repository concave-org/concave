const req = require('esm')(module, { mode: 'auto' })
const {
  createRenderer
} = req('../src/render')

test('createRenderer is a function', () => {
  expect(typeof createRenderer).toEqual('function')
})
