import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { UpdateOwnerDto } from '../domain/dto/owner/owner'
import {
  IOwnerResponse,
  omitPassword,
} from '../domain/dto/owner/owner.response'
import {
  PageOptionsDto,
  paginationParams,
} from '../domain/dto/pagination/pagination'
import { PageDto } from '../domain/dto/pagination/paginationResponse'
import { IOwnerRepository } from '../domain/ports/owner'

export interface IOwnerService {
  getAllOwners: (
    pageOptionsDto: PageOptionsDto,
  ) => Promise<PageDto<IOwnerResponse>>

  getOwnerByID: (id: string) => Promise<IOwnerResponse>

  updateOwner: (
    email: string,
    updateOwnerDto: UpdateOwnerDto,
  ) => Promise<IOwnerResponse>
}

@Injectable()
export class OwnerService implements IOwnerService {
  constructor(
    @Inject('IOwnerRepository')
    private readonly ownerRepository: IOwnerRepository,
  ) {}

  async getAllOwners(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<IOwnerResponse>> {
    try {
      const [owners, totalOwners] = await Promise.all([
        this.ownerRepository.getAllOwners(pageOptionsDto),
        this.ownerRepository.getAllOwnersCount(),
      ])
      const ownersWithoutPassowrd = owners.map((owner) => omitPassword(owner))
      const pageMeta = paginationParams(pageOptionsDto, totalOwners)

      return {
        data: ownersWithoutPassowrd,
        meta: pageMeta,
      }
    } catch (err) {
      throw err
    }
  }
  async getOwnerByID(id: string): Promise<IOwnerResponse> {
    try {
      const owner = await this.ownerRepository.getOwnerByID(id)
      if (owner === null) {
        throw new NotFoundException('The owner not exist')
      }

      return omitPassword(owner)
    } catch (err) {
      throw err
    }
  }

  async updateOwner(
    email: string,
    updateOwnerDto: UpdateOwnerDto,
  ): Promise<IOwnerResponse> {
    try {
      const owner = await this.ownerRepository.updateOwner(
        email,
        updateOwnerDto,
      )
      return omitPassword(owner)
    } catch (err) {
      throw err
    }
  }
}
