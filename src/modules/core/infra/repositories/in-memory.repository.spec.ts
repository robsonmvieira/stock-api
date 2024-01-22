import { Entity, UuidVO, ValueObject } from '@modules/core'
import { InMemoryBaseRepository } from './in-memory.repository'

class FakeEntity extends Entity {
  name: string
  price: number

  get entity_id(): ValueObject {
    return this.id
  }

  toJSON(): any {
    return {
      ...this
    }
  }

  constructor(props: { id?: UuidVO; name: string; price: number }) {
    super(props.id)
    this.name = props.name
    this.price = props.price
  }
}
class InMemoryBaseRepositoryStub extends InMemoryBaseRepository<FakeEntity, UuidVO> {
  getEntity(): new (...args: any[]) => FakeEntity {
    return FakeEntity
  }
  constructor() {
    super()
  }
}
describe('InMemoryBaseRepository Unit Test', () => {
  let repo: InMemoryBaseRepositoryStub

  beforeEach(() => {
    repo = new InMemoryBaseRepositoryStub()
  })

  it('should return entity list', async () => {
    const res = await repo.findAll()

    expect(res).toEqual([])
  })

  it('should insert entity', async () => {
    const entity = new FakeEntity({ name: 'fake', price: 10 })
    await repo.insert(entity)

    const res = await repo.findAll()

    expect(res).toEqual([entity])
  })

  it('should find entity by id', async () => {
    const entity = new FakeEntity({ name: 'fake', price: 10 })
    await repo.insert(entity)

    const res = await repo.findById(entity.id)

    expect(res).toEqual(entity)
  })

  it('should update entity', async () => {
    const entity = new FakeEntity({ name: 'fake', price: 10 })
    await repo.insert(entity)

    const entityUpdated = new FakeEntity({ id: entity.id, name: 'fake2', price: 20 })
    await repo.update(entity.id, entityUpdated)

    const res = await repo.findById(entity.id)

    expect(res).toEqual(entityUpdated)
  })

  it('should delete entity', async () => {
    const entity = new FakeEntity({ name: 'fake', price: 10 })
    await repo.insert(entity)

    await repo.delete(entity.id)

    const res = await repo.findById(entity.id)

    expect(res).toEqual(null)
  })

  it('should throw error when try to delete entity that not exists', async () => {
    const entity = new FakeEntity({ name: 'fake', price: 10 })
    await repo.insert(entity)

    const id = new UuidVO()

    await expect(repo.delete(id)).rejects.toThrow()
  })

  it('should throw error when try to update entity that not exists', async () => {
    const entity = new FakeEntity({ name: 'fake', price: 10 })
    await repo.insert(entity)

    const id = new UuidVO()

    await expect(repo.update(id, entity)).rejects.toThrow()
  })
})
