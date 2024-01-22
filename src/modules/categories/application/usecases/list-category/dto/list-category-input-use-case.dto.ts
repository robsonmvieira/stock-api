import { CategoryFilter } from '@modules/categories/domain'
import { SortDirection } from '@modules/core'

export class ListCategoryInputUseCaseDto {
  page?: number
  per_page?: number
  sort?: string | null
  sort_dir?: SortDirection | null
  filter?: CategoryFilter | null
}
