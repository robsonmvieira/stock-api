import { Module } from '@nestjs/common'
import {
  CategoriesController,
  // CreateCategoryUseCase,
  // DeleteCategoryUseCase,
  // ICategoryRepository,
  // ListCategoryUseCase,
  PrismaCategoryRepository
} from '@modules/categories'
import { CATEGORY_PROVIDERS } from './infra/providers/category.providers'
import { PrismaRepository } from './infra/repositories/prisma.repository'
// import { DatabaseModule } from '@modules/database'

@Module({
  imports: [],
  controllers: [CategoriesController],
  providers: [
    // PrismaRepository,
    // {
    //   provide: PrismaCategoryRepository,
    //   useFactory: () => new PrismaCategoryRepository(),
    //   inject: ['PrismaRepository']
    // },
    ...Object.values(CATEGORY_PROVIDERS.REPOSITORIES),
    ...Object.values(CATEGORY_PROVIDERS.USE_CASES)

    // usecases
    // {
    //   provide: CreateCategoryUseCase,
    //   useFactory: (categoryRepo: ICategoryRepository) => {
    //     return new CreateCategoryUseCase(categoryRepo)
    //   },
    //   inject: ['CategoryRepository']
    // },
    // {
    //   provide: ListCategoryUseCase,
    //   useFactory: (categoryRepo: ICategoryRepository) => {
    //     return new ListCategoryUseCase(categoryRepo)
    //   },
    //   inject: ['CategoryRepository']
    // },
    // {
    //   provide: DeleteCategoryUseCase,
    //   useFactory: (categoryRepo: ICategoryRepository) => {
    //     return new DeleteCategoryUseCase(categoryRepo)
    //   },
    //   inject: ['CategoryRepository']
    // }
  ]
})
export class CategoriesModule {}
