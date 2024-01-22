import { ICategoryRepository } from '@modules/categories/domain'
import { IUseCase, UuidVO } from '@modules/core'
import { DeleteCategoryInputDto, DeleteCategoryOutputDto } from '.'

export class DeleteCategoryUseCase implements IUseCase<DeleteCategoryInputDto, DeleteCategoryOutputDto> {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(args: DeleteCategoryInputDto): Promise<DeleteCategoryOutputDto> {
    const uuid = new UuidVO(args.id)
    await this.categoryRepository.delete(uuid)
  }
}
