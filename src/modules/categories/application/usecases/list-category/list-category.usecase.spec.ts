import { InMemoryCategoryRepository, Category } from '@modules/categories'
import { ListCategoryUseCase } from '.'

describe('List Category UseCase Unit Tests', () => {
  let useCase: ListCategoryUseCase
  let repo: InMemoryCategoryRepository

  beforeEach(() => {
    repo = new InMemoryCategoryRepository()
    useCase = new ListCategoryUseCase(repo)
  })

  it('should list categories when no params is provide', async () => {
    const categories = Category.faker().theCategories(20).build()
    await repo.bulkInsert(categories)
    const res = await useCase.execute({})
    expect(res.items.length).toBe(15)
  })
})
