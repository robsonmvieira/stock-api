import { Category, CategoryMapper, ICategoryRepository } from '@modules/categories/domain'
import { IUseCase, SearchParams, SearchResult, UuidVO } from '@modules/core'
import { ListCategoryInputUseCaseDto, ListCategoryOutputUseCaseDto } from '.'

export class ListCategoryUseCase implements IUseCase<ListCategoryInputUseCaseDto, ListCategoryOutputUseCaseDto> {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(args: ListCategoryInputUseCaseDto): Promise<ListCategoryOutputUseCaseDto> {
    const searchParams = new SearchParams(args)
    const result = await this.categoryRepository.search(searchParams)

    return this.serealizers(result.items, result)
  }

  private serealizers(items: Category[], metaData: SearchResult<Category>): ListCategoryOutputUseCaseDto {
    const collection = items.map((cat) => CategoryMapper.toJSON(cat))
    const result = {
      items: collection,
      total: metaData.total,
      current_page: metaData.current_page,
      per_page: metaData.per_page,
      last_page: metaData.last_page
    }
    return result
  }
}
