import { Entity, EntityNotFoundException, IRepository, ValueObject } from '@modules/core'

export abstract class InMemoryBaseRepository<T extends Entity, EntityId extends ValueObject>
  implements IRepository<T, EntityId>
{
  items: T[] = []
  async insert(entity: T): Promise<void> {
    this.items.push(entity)
  }
  async findAll(): Promise<T[]> {
    return this.items
  }
  async findById(id: EntityId): Promise<T> {
    return this._get(id)
  }
  async update(id: EntityId, entity: T): Promise<void> {
    const index = await this._getOrFail(id)
    this.items[index] = entity
  }
  async delete(id: EntityId): Promise<void> {
    const index = await this._getOrFail(id)
    this.items.splice(index, 1)
  }
  async bulkInsert(entities: T[]): Promise<void> {
    this.items.push(...entities)
  }
  abstract getEntity(): new (...args: any[]) => T

  protected async _get(id: EntityId): Promise<T> {
    const result = this.items.find((item) => item.entity_id.equals(id))

    return typeof result === 'undefined' ? null : result
  }

  protected async _getOrFail(id: EntityId): Promise<number> {
    const index = this.items.findIndex((item) => item.entity_id.equals(id))
    if (index === -1) throw new EntityNotFoundException(id, this.getEntity())
    return index
  }
}
