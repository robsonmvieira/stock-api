import { Entity } from '../domain'
import { BaseException } from './base.exception'

export class EntityNotFoundException extends BaseException {
  constructor(id: string | any, entityClasse: new (...args: any[]) => Entity) {
    const idString = Array.isArray(id) ? id.join(',') : id
    super(`Entity ${entityClasse.name} with id ${idString} not found`)
    this.name = this.constructor.name
  }
}
