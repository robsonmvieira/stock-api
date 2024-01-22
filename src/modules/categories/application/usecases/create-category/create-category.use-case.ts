import { IUseCase } from '@modules/core'
import { Category, CategoryMapper, ICategoryRepository } from '@modules/categories'
import { CreateCategoryInput, CreateCategoryOutput } from './dtos'

export class CreateCategoryUseCase implements IUseCase<CreateCategoryInput, CreateCategoryOutput> {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(input: CreateCategoryInput): Promise<CreateCategoryOutput> {
    const category = Category.create(input)
    await this.categoryRepository.insert(category)

    return CategoryMapper.toJSON(category)
  }
}
