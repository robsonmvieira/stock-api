import { Module } from '@nestjs/common'
import { CategoriesModule } from './modules/categories/categories.module'
// import { DatabaseModule } from './modules/database/database.module'
import { PrismaRepository } from './app.service'

@Module({
  imports: [CategoriesModule],
  providers: [PrismaRepository],
  exports: [PrismaRepository]
})
export class AppModule {}
