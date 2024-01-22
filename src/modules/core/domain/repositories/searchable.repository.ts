import { ValueObject, Entity, IRepository, SearchParams, SearchResult } from '@modules/core'

export interface ISearchableRepository<
  T extends Entity,
  EntityId extends ValueObject,
  Filter = string,
  SearchInput = SearchParams<Filter>,
  SearchOutput = SearchResult
> extends IRepository<T, EntityId> {
  searchableFields: string[]
  search(query: SearchInput): Promise<SearchOutput>
}
