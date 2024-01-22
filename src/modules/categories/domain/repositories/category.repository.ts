import { ISearchableRepository, UuidVO } from '@modules/core'
import { Category, CategoryFilter } from '../entities'
import { CategorySearchParams, CategorySearchResult } from '../valueObjects'

export interface ICategoryRepository
  extends ISearchableRepository<Category, UuidVO, CategoryFilter, CategorySearchParams, CategorySearchResult> {}
