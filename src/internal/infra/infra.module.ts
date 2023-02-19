import { Module } from '@nestjs/common'
import { OwnerRepository } from './adapter/repository/owner.repository'
import { UserRepository } from './adapter/repository/user.repository'
import { PrismaService } from './database/prisma.service'

@Module({
  providers: [
    PrismaService,
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IOwnerRepository', useClass: OwnerRepository },
  ],
  exports: [
    PrismaService,
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IOwnerRepository', useClass: OwnerRepository },
  ],
})
export default class InfraModule {}
