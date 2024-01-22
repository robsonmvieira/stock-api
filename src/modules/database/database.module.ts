import { Module } from '@nestjs/common'
import { PrismaRepository } from './repository'

@Module({
  imports: [],
  providers: [PrismaRepository],
  exports: [PrismaRepository]
})
export class DatabaseModule {}
