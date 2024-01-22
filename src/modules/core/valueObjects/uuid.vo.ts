import { UuidException } from '../exceptions/uuid.exception'
import { ValueObject } from './value-object'
import { v4 as uuidv4, validate as uuidValidate } from 'uuid'

export class UuidVO extends ValueObject {
  readonly id: string
  constructor(value?: string) {
    super()
    this.id = value || uuidv4()
    this.validate()
  }

  public static create(): UuidVO {
    return new UuidVO(uuidv4())
  }

  public validate(): boolean {
    const isValid = uuidValidate(this.id)

    if (!isValid) {
      throw new UuidException('Invalid uuid')
    }
    return isValid
  }

  toString(): string {
    return this.id
  }
}
