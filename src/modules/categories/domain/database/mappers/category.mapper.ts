import { UuidVO } from '@modules/core'
import { Category, CategoryOutput } from '../../entities'
import { CategoryModel } from '../../entities/category.model'

export class CategoryMapper {
  static toJSON(category: Category): CategoryOutput {
    return {
      id: category.id.id,
      name: category.name,
      description: category.description,
      is_active: category.is_active,
      created_at: category.created_at,
      updated_at: category.updated_at
    }
  }

  static toEntity(category: CategoryModel): Category {
    return new Category({
      id: new UuidVO(category.id),
      name: category.name,
      description: category.description,
      is_active: category.isActive,
      created_at: category.createdAt,
      updated_at: category.updatedAt
    })
  }
  static toModel(category: Category): CategoryModel {
    return {
      id: category.id.id,
      name: category.name,
      description: category.description,
      isActive: category.is_active,
      createdAt: category.created_at,
      updatedAt: category.updated_at
    }
  }
}
