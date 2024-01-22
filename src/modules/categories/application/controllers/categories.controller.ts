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
@Controller('categories')
export class CategoriesController {
  // @Inject(CreateCategoryUseCase)
  // private createCategoryUsecase: CreateCategoryUseCase

  // @Inject(DeleteCategoryUseCase)
  // private deleteCategoryUseCase: DeleteCategoryUseCase

  // @Inject(ListCategoryUseCase)
  // private listCategoryUseCase: ListCategoryUseCase

  // @Post()
  // async create(@Body() createCategoryDto: CreateCategoryDto) {
  //   return this.createCategoryUsecase.execute(createCategoryDto)
  // }
  constructor(private repo: PrismaRepository) {}

  @Get()
  findAll(@Body() inputSearch: ListCategoryInputUseCaseDto) {
    // return this.listCategoryUseCase.execute(inputSearch)
    return this.repo.category.findMany()
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
