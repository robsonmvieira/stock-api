import { CategoryOutput } from '@modules/categories'

export class ListCategoryOutputUseCaseDto {
  items: CategoryOutput[]
  total: number
  current_page: number
  per_page: number
}
