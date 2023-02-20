import { Module } from '@nestjs/common'
import { CarsRepository } from './adapter/repository/cars.repository'
import { OwnerRepository } from './adapter/repository/owner.repository'
import { UserRepository } from './adapter/repository/user.repository'
import { PrismaService } from './database/prisma.service'

@Module({
  providers: [
    PrismaService,
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IOwnerRepository', useClass: OwnerRepository },
    { provide: 'ICarsRepository', useClass: CarsRepository },
  ],
  exports: [
    PrismaService,
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IOwnerRepository', useClass: OwnerRepository },
    { provide: 'ICarsRepository', useClass: CarsRepository },
  ],
})
export default class InfraModule {}
