import { Entity, ValueObject, SearchParams, SearchResult, ISearchableRepository, SortDirection } from '@modules/core'
import { InMemoryBaseRepository } from './in-memory.repository'
export abstract class InMemoryBaseSearchableRepository<T extends Entity, EntityId extends ValueObject, Filter = string>
  extends InMemoryBaseRepository<T, EntityId>
  implements ISearchableRepository<T, EntityId, Filter>
{
  searchableFields: string[] = []
  async search(query: SearchParams<Filter>): Promise<SearchResult<T>> {
    const filtered = await this.applySearchFilter(this.items, query.filter)
    const sorted = this.applySorting(filtered, query.sort, query.sort_dir)
    const paginated = this.applyPagination(sorted, query.page, query.per_page)
    return new SearchResult({
      items: paginated,
      total: filtered.length,
      current_page: query.page,
      per_page: query.per_page
    })
  }

  protected abstract applySearchFilter(collection: T[], conditional: Filter | null): Promise<T[]>

  protected applyPagination(items: T[], page: SearchParams['page'], per_page: SearchParams['per_page']): T[] {
    const start = (page - 1) * per_page
    const end = start + per_page
    return items.slice(start, end)
  }

  protected applySorting(
    items: T[],
    sort: string | null,
    sort_dir: SortDirection,
    custom_getter?: (sort: string, items: T) => any
  ): T[] {
    if (!sort || !this.searchableFields.includes(sort)) return items

    return [...items].sort((a, b) => {
      // @ts-ignore
      const aValue = custom_getter ? custom_getter(sort, a) : a[sort]
      // @ts-ignore
      const bValue = custom_getter ? custom_getter(sort, b) : b[sort]

      if (aValue < bValue) return sort_dir === 'asc' ? -1 : 1
      if (aValue > bValue) return sort_dir === 'asc' ? 1 : -1
      return 0
    })
  }
}
