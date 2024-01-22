import { UuidVO } from '@modules/core'

import { Category, CategoryMapper, CategorySearchParams, CategorySearchResult, ICategoryRepository } from '../../domain'
import { Inject, Injectable } from '@nestjs/common'
import { PrismaRepository } from './prisma.repository'

Injectable()
export class PrismaCategoryRepository implements ICategoryRepository {
  @Inject(PrismaRepository)
  private repo: PrismaRepository

  searchableFields: string[]
  async search(query: CategorySearchParams): Promise<CategorySearchResult> {
    console.log('linha 18 => ', this.repo)
    const offset = query.page - 1
    const limit = query.per_page
    const items = await this.repo.client.category.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        [query.sort]: query.sort_dir
      },

      where: {
        name: {
          contains: query.filter
        }
      }
    })
    const collection = items.map(item => CategoryMapper.toEntity(item))
    // const collection = []
    return new CategorySearchResult({
      items: collection,
      total: collection.length,
      current_page: query.page,
      per_page: query.per_page
    })
  }
  async insert(entity: Category): Promise<void> {
    const toPersist = CategoryMapper.toModel(entity)
    await this.repo.category.create({
      data: toPersist
    })
    return
  }
  async findAll(): Promise<Category[]> {
    const collection = await this.repo.client.category.findMany()
    return collection.map(item => CategoryMapper.toEntity(item))
    return
  }
  async findById(id: UuidVO): Promise<Category> {
    const item = await this._get(id)
    if (!item) {
      return null
    }
    return item
  }
  async update(id: UuidVO, entity: Category): Promise<void> {
    const hasEntity = await this._get(id)
    if (!hasEntity) {
      throw new Error('Entity not found')
    }
    const toPersist = CategoryMapper.toModel(entity)
    await this.repo.client.category.update({
      where: { id: hasEntity.id.id },
      data: toPersist
    })
    return
  }
  async delete(id: UuidVO): Promise<void> {
    const hasEntity = await this._get(id)
    if (!hasEntity) {
      throw new Error('Entity not found')
    }
    await this.repo.client.category.delete({ where: { id: hasEntity.id.id } })
    return
  }
  async bulkInsert(entities: Category[]): Promise<void> {
    const toPersist = entities.map(item => CategoryMapper.toModel(item))
    await this.repo.client.category.createMany({ data: toPersist })
    return
  }
  getEntity(): new (...args: any[]) => Category {
    return Category
  }

  private async _get(id: UuidVO): Promise<Category> {
    const uuid = id instanceof UuidVO ? id.id : id
    const result = await this.repo.client.category.findUnique({ where: { id: uuid } })
    return typeof result === 'undefined' ? null : CategoryMapper.toEntity(result)
    return
  }
}
