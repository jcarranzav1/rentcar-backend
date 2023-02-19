import { Owner } from '@prisma/client'
import { UpdateOwnerModel } from 'src/internal/infra/adapter/models/owner'
import { CreateUserModel } from 'src/internal/infra/adapter/models/user'
import { PageOptionsDto } from '../dto/pagination/pagination'

export interface IOwnerRepository {
  createOwner: (user: CreateUserModel) => Promise<Owner>
  getAllOwners: (pageOptionsDto: PageOptionsDto) => Promise<Owner[]>
  getAllOwnersCount: () => Promise<number>
  getOwnerByEmail: (email: string) => Promise<Owner> | null
  getOwnerByID: (id: string) => Promise<Owner> | null
  updateOwner: (email: string, user: UpdateOwnerModel) => Promise<Owner>
}
