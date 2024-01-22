import { IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { Category } from '../entities'

export class CategoryValidatorRules {
  @IsNotEmpty({ groups: ['name'] })
  @IsString({ groups: ['name'], message: 'the value should be a stringXX' })
  @MaxLength(255, { groups: ['name'] })
  name: string

  // @IsOptional()
  // @IsString()
  // description: string

  // @IsOptional()
  // @IsBoolean()
  // isActive: boolean

  // @IsOptional()
  // @IsDate()
  // createdAt: Date

  // @IsOptional()
  // @IsDate()
  // updatedAt: Date
  constructor(entity: Category) {
    Object.assign(this, entity)
  }
}
