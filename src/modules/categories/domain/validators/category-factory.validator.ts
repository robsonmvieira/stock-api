import { CategoryValidator } from './category.validator'

export class CategoryFactoryValidator {
  static create() {
    return new CategoryValidator()
  }
}
