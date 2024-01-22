import { FieldsErrors } from '@modules/shared'
import { BaseException } from './base.exception'

export class ValidationException extends BaseException {}

export class EntityValidationError extends Error {
  constructor(
    public error: FieldsErrors[],
    message = 'Entity Validation Exception'
  ) {
    super(message)
  }

  count() {
    return Object.keys(this.error).length
  }
}
