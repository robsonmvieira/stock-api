import { UuidException } from '../exceptions/uuid.exception'
import { UuidVO } from './uuid.vo'

describe('UUID Value Object Unit Tests', () => {
  it('should throw UuidException', () => {
    expect(() => {
      new UuidVO('123e4567-e89b-12d3-a456-42661417xxxxx')
    }).toThrow(new UuidException('Invalid uuid'))
  })

  it('should create a valid uuid', () => {
    const uuid = UuidVO.create()
    expect(uuid.validate()).toBe(true)
  })

  it('should receive a valid uuid', () => {
    const validUuid = '123e4567-e89b-12d3-a456-426614174000'
    const uuid = new UuidVO(validUuid)
    expect(uuid.validate()).toBe(true)
  })
})
