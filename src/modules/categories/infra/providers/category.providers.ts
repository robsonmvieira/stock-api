import { ICategoryRepository } from '@modules/categories/domain'
import { PrismaCategoryRepository } from '../repositories'

import { CreateCategoryUseCase, DeleteCategoryUseCase, ListCategoryUseCase } from '@modules/categories/application'

export const REPOSITORIES = {
  CATEGORY_REPOSITORY: {
    provide: 'CategoryRepository',
    useClass: PrismaCategoryRepository
  }
  // CATEGORY_PRISMA_REPOSITORY: {
  //   provide: PrismaCategoryRepository,
  //   useFactory: (prismaRep: PrismaRepository) => new PrismaCategoryRepository(prismaRep),
  //   inject: ['PrismaRepository']
  // }
  // REPOSITORY_BASE: {
  //   provide: 'PrismaRepository',
  //   useClass: PrismaRepository
  // }
}
export const USE_CASES = {
  CREATE_CATEGORY_USE_CASE: {
    provide: CreateCategoryUseCase,
    useFactory: (categoryRepo: ICategoryRepository) => {
      return new CreateCategoryUseCase(categoryRepo)
    },
    inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide]
  },
  LIST_CATEGORY_USE_CASE: {
    provide: ListCategoryUseCase,
    useFactory: (categoryRepo: ICategoryRepository) => {
      return new ListCategoryUseCase(categoryRepo)
    },
    inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide]
  },
  DELETE_CATEGORY_USE_CASE: {
    provide: DeleteCategoryUseCase,
    useFactory: (categoryRepo: ICategoryRepository) => {
      return new DeleteCategoryUseCase(categoryRepo)
    },
    inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide]
  }
}
export const CATEGORY_PROVIDERS = {
  REPOSITORIES,
  USE_CASES
}
