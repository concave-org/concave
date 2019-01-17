const req = require('esm')(module, { mode: 'auto' })
const {
  aState,
  aRouteG,
  aRouteN,
  pc,
  rb,
  ac,
  rc
} = req('../src/actions')

test('actions are numbers', () => {
  expect(typeof aState).toEqual('number')
  expect(typeof aRouteG).toEqual('number')
  expect(typeof aRouteN).toEqual('number')
  expect(typeof pc).toEqual('number')
  expect(typeof rb).toEqual('number')
  expect(typeof ac).toEqual('number')
  expect(typeof rc).toEqual('number')
})
