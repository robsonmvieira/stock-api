import { ValueObject } from '../../valueObjects'
import { Entity } from '../entities'

export interface IRepository<T extends Entity, EntityId extends ValueObject> {
  insert(entity: T): Promise<void>
  findAll(): Promise<T[]>
  findById(id: EntityId): Promise<T | null>
  update(id: EntityId, entity: T): Promise<void>
  delete(id: EntityId): Promise<void>

  bulkInsert(entities: T[]): Promise<void>

  getEntity(): new (...args: any[]) => T
}
