import { Entity, UuidVO, ValueObject } from '@modules/core'
import { CategoryFactoryValidator } from '../validators'
import { CategoryFakeBuilder } from '../tests/category-faker.builder'
import { CreateCategoryCommand } from './commands'

export type CategoryConstructorProps = {
  id?: UuidVO
  name: string
  description?: string | null
  is_active?: boolean
  created_at?: Date
  updated_at?: Date | null
}

export class Category extends Entity {
  // domain

  name: string
  description: string | null
  is_active: boolean
  // constructor
  constructor(props: CategoryConstructorProps) {
    super(props.id, props.created_at, props.updated_at)
    this.name = props.name
    this.description = props.description ?? null
    this.is_active = props.is_active ?? true
  }

  // static factory
  static create(props: CreateCategoryCommand): Category {
    const category = new Category(props)
    category.validate(['name'])
    return category
  }

  static faker() {
    return CategoryFakeBuilder
  }

  validate(fields: string[]) {
    const validator = CategoryFactoryValidator.create()
    return validator.validate(this.notification, this, fields)
  }

  changeName(name: string): void {
    this.name = name
    this.validate(['name'])
  }

  changeDescription(description: string | null): void {
    this.description = description
    this.validate(['description'])
  }

  activate(): void {
    this.is_active = true
  }

  deactivate(): void {
    this.is_active = false
  }

  toJSON() {
    return {
      id: this.id.id,
      name: this.name,
      description: this.description,
      is_active: this.is_active,
      created_at: this.created_at,
      updated_at: this.updated_at
    }
  }

  get entity_id(): ValueObject {
    return this.id
  }
}
