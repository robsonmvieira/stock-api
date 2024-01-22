import { BaseValidatorFields } from '@modules/core/domain'
import { Notification } from '@modules/shared'
import { CategoryValidatorRules } from './category-validator-rules.validator'

export class CategoryValidator extends BaseValidatorFields {
  validate(notification: Notification, data: any, fields: string[]): boolean {
    const newFields = fields.length ? fields : ['name']
    return super.validate(notification, new CategoryValidatorRules(data), newFields)
  }
}
