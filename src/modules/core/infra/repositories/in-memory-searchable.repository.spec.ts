import { Entity, UuidVO, ValueObject } from '@modules/core'
import { InMemoryBaseSearchableRepository } from './in-memory-searchable.repository'

class StubEntity extends Entity {
  get entity_id(): ValueObject {
    return this.entity_id
  }
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description
    }
  }
  constructor(
    public name: string,
    public description: string
  ) {
    super()
  }
}
class InMemorySearchableRepositoryStub extends InMemoryBaseSearchableRepository<StubEntity, UuidVO> {
  searchableFields = ['name', 'description']
  async applySearchFilter(collection: StubEntity[], conditional: string | null): Promise<StubEntity[]> {
    if (!conditional) return collection
    return collection.filter(item => {
      return (
        item.name.toLocaleLowerCase().includes(conditional) ||
        item.description.toLocaleLowerCase().includes(conditional)
      )
    })
  }
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity
  }
  constructor() {
    super()
  }
}

// const spyFilterMethod = jest.spyOn(InMemorySearchableRepositoryStub.prototype, 'applySearchFilter');
describe('InMemorySearchableRepository Unit Tests', () => {
  let repo: InMemorySearchableRepositoryStub

  beforeEach(() => {
    repo = new InMemorySearchableRepositoryStub()
  })
  it('should filters items that matched if conditional', async () => {
    const items = [
      new StubEntity('fake', 'fake description 1 london'),
      new StubEntity('fake', 'fake description 2 paris'),
      new StubEntity('fake', 'fake description 3 Rio de Janeiro')
    ]
    const res = await repo.applySearchFilter(items, 'london')
    expect(res).toEqual([items[0]])
  })

  it('should returns empty array when does not match conditional clausure ', async () => {
    const items = [
      new StubEntity('fake', 'fake description 1 london'),
      new StubEntity('fake', 'fake description 2 paris'),
      new StubEntity('fake', 'fake description 3 Rio de Janeiro')
    ]
    const res = await repo.applySearchFilter(items, 'Lisbon')
    expect(res).toEqual([])
  })

  it('should filters items that matched if conditional', async () => {
    const items = [
      new StubEntity('fake', 'fake description 1 london'),
      new StubEntity('fake', 'fake description 2 paris'),
      new StubEntity('fake', 'fake description 3 Rio de Janeiro')
    ]
    const res = await repo.applySearchFilter(items, 'fake description')
    expect(res).toEqual(items)
  })

  it('should not call filter when invalid conditional is provided', async () => {
    const items = [
      new StubEntity('fake', 'fake description 1 london'),
      new StubEntity('fake', 'fake description 2 paris'),
      new StubEntity('fake', 'fake description 3 Rio de Janeiro')
    ]
    const spyFilterMethod = jest.spyOn(items, 'filter')
    await repo.applySearchFilter(items, null)
    expect(spyFilterMethod).not.toHaveBeenCalled()
  })

  it('should apply sort items', async () => {
    const items = [
      new StubEntity('fake', 'fake description London'),
      new StubEntity('fake', 'fake description Paris'),
      new StubEntity('fake', 'fake description Rio de Janeiro'),
      new StubEntity('fake', 'fake description Amsterdam')
    ]
    const res = repo['applySorting'](items, 'description', 'asc')
    expect(res[0].description).toBe('fake description Amsterdam')
  })
})
