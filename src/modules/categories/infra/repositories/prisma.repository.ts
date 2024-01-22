import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
@Injectable()
export class PrismaRepository extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  public client: PrismaClient

  async onModuleInit() {
    await this.$connect()
  }

  // onModuleInit() {
  //   return this.$connect()
  // }
  onModuleDestroy() {
    return this.$disconnect()
  }
}
