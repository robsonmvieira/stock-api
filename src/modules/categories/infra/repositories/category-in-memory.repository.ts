import { InMemoryBaseSearchableRepository, SortDirection, UuidVO } from '@modules/core'
import { Category, CategoryFilter, ICategoryRepository } from '@modules/categories'

export class InMemoryCategoryRepository
  extends InMemoryBaseSearchableRepository<Category, UuidVO>
  implements ICategoryRepository
{
  searchableFields: string[] = ['name', 'description', 'created_at']
  protected async applySearchFilter(collection: Category[], conditional: CategoryFilter): Promise<Category[]> {
    if (!conditional) return collection
    return collection.filter((item) => {
      return (
        item.name.toLocaleLowerCase().includes(conditional) ||
        item.description.toLocaleLowerCase().includes(conditional)
      )
    })
  }
  getEntity(): new (...args: any[]) => Category {
    return Category
  }
  protected applySorting(items: Category[], sort: string, sort_dir: SortDirection): Category[] {
    return sort ? super.applySorting(items, sort, sort_dir) : super.applySorting(items, 'created_at', 'desc')
  }
}
