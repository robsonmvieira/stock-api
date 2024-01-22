import { InMemoryCategoryRepository, Category } from '@modules/categories'
import { DeleteCategoryUseCase } from '.'

describe('Delete Category Usecase Unit Test', () => {
  let deleteCategoryUsecase: DeleteCategoryUseCase
  let repo: InMemoryCategoryRepository

  beforeEach(() => {
    repo = new InMemoryCategoryRepository()
    deleteCategoryUsecase = new DeleteCategoryUseCase(repo)
  })
  it('should throw when not exists id', async () => {
    const id = 'not-exists-id'
    const input = { id }
    const deleteUseCase = new DeleteCategoryUseCase(repo)

    await expect(deleteUseCase.execute(input)).rejects.toThrow()
  })

  it('should delete a category', async () => {
    const cat = Category.faker().aCategory().build()
    await repo.insert(cat)
    const input = { id: cat.id.id }
    await deleteCategoryUsecase.execute(input)

    expect(repo.items.length).toBe(0)
  })
})
