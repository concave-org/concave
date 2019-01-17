const req = require('esm')(module, { mode: 'auto' })
const {
  createPipeline
} = req('../src/pipeline')

test('createPipeline is a function', () => {
  expect(typeof createPipeline).toEqual('function')
})
