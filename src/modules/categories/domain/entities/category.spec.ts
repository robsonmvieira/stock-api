import { UuidVO } from '@modules/core'
import { Category } from './'

describe('Category Entity Unit Test', () => {
  it('should be defined', () => {
    const category = Category.faker().aCategory().build()

    expect(category).toBeDefined()
  })

  it('should be able to change name', () => {
    const category = Category.faker().aCategory().build()

    category.changeName('Category Test 2')

    expect(category.name).toBe('Category Test 2')
  })

  it('should be able to change description', () => {
    const category = Category.faker().aCategory().withDescription('some description').build()

    category.changeDescription('description uptdated')

    expect(category.description).toBe('description uptdated')
  })

  it('should be able to change is_active', () => {
    const category = Category.faker().aCategory().build()

    category.deactivate()

    expect(category.is_active).toBeFalsy()
  })

  it('should be able create a new category with UuidVO and created_at', () => {
    const uuid = new UuidVO()
    const category = Category.faker().aCategory().withUuid(uuid).withCreatedAt(new Date()).build()
    category.activate()
    expect(category.id).toEqual(uuid)
  })
})
