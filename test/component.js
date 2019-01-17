const req = require('esm')(module, { mode: 'auto' })
const {
  createComponent
} = req('../src/component')

test('createComponent is a function', () => {
  expect(typeof createComponent).toEqual('function')
})
