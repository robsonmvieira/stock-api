import { ValueObject } from './'

class StubValueObject extends ValueObject {
  constructor(readonly value: string) {
    super()
  }
}

describe('Value Object Unit Test', () => {
  it('should be equals', () => {
    const valueObject1 = new StubValueObject('Value')
    const valueObject2 = new StubValueObject('Value')
    expect(valueObject1.equals(valueObject2)).toBe(true)
  })
})
