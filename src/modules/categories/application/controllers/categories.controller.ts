import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  HttpStatus,
  HttpCode,
  Inject
} from '@nestjs/common'
import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  ListCategoryInputUseCaseDto,
  ListCategoryUseCase
} from '../usecases'
// import { CreateCategoryDto } from '../../domain/entities/dtos'
import { PrismaRepository } from '../../infra/repositories'
import { CreateCategoryDto } from '@modules/categories/domain'
@Controller('categories')
export class CategoriesController {
  constructor() {
    console.log('entrei no controller')
  }
  @Inject(CreateCategoryUseCase)
  private createCategoryUsecase: CreateCategoryUseCase

  @Inject(DeleteCategoryUseCase)
  private deleteCategoryUseCase: DeleteCategoryUseCase

  @Inject(ListCategoryUseCase)
  private listCategoryUseCase: ListCategoryUseCase

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.createCategoryUsecase.execute(createCategoryDto)
  }

  @Get()
  findAll(@Body() inputSearch: ListCategoryInputUseCaseDto) {
    console.log('entrei aqui no método linha 44 => ', this.listCategoryUseCase)
    return this.listCategoryUseCase.execute(inputSearch)
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string) {
    console.log(id)
    return true
  }

  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string) {
    console.log(id)
    return true
  }

  // @HttpCode(HttpStatus.NO_CONTENT)
  // @Delete(':id')
  // remove(@Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string) {
  //   return this.deleteCategoryUseCase.execute({ id })
  // }
}
