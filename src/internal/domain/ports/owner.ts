import { Owner } from '@prisma/client'
import {
  OwnerModel,
  UpdateOwnerModel,
} from 'src/internal/infra/adapter/models/owner'
import { PageOptionsDto } from '../dto/pagination'

export interface IOwnerRepository {
  createOwner: (owner: OwnerModel) => Promise<Owner>
  getAllOwners: (pageOptionsDto: PageOptionsDto) => Promise<Owner[]>
  getAllOwnersCount: () => Promise<number>
  getOwnerByEmail: (email: string) => Promise<Owner> | null
  getOwnerByID: (id: string) => Promise<Owner> | null
  updateOwner: (email: string, owner: UpdateOwnerModel) => Promise<Owner>
}
