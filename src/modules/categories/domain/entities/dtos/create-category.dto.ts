import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  description?: string | null

  @IsBoolean()
  @IsOptional()
  is_active?: boolean

  constructor(props: CreateCategoryDto) {
    this.name = props.name
    this.description = props.description
    this.is_active = props.is_active
  }
}
