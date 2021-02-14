const index = require('./index')

describe('Tests for index.js file', () => {
  test('Should export an object', () => {
    expect(index).toBeInstanceOf(Object)
  })

  test('Should have the property \'Server\'', () => {
    expect(index).toHaveProperty('Server')
  })

  test('Should have the property \'Request\'', () => {
    expect(index).toHaveProperty('Request')
  })

  test('Should have the property \'Response\'', () => {
    expect(index).toHaveProperty('Response')
  })
})
