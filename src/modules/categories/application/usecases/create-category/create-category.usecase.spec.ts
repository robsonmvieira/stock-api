import { InMemoryCategoryRepository, Category } from '@modules/categories'
import { CreateCategoryUseCase } from './create-category.use-case'

describe('Create Category Usecase Unit Test', () => {
  let createCategoryUsecase: CreateCategoryUseCase
  let repo: InMemoryCategoryRepository

  beforeEach(() => {
    repo = new InMemoryCategoryRepository()
    createCategoryUsecase = new CreateCategoryUseCase(repo)
  })

  it('should create a new category', async () => {
    const fixName = 'Category 1'
    const cat = Category.faker().aCategory().withName(fixName).build()
    await createCategoryUsecase.execute(cat)

    expect(cat.id).toBeDefined()
    expect(cat.name).toBe(fixName)
    expect(cat.description).toBe(cat.description)
  })
})
