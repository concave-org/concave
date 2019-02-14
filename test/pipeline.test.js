const req = require('esm')(module, { mode: 'auto' })
const {
  createPipeline
} = req('../src/pipeline')

test('module exports createPipeline as a function', () => {
  expect(typeof createPipeline).toEqual('function')
})
