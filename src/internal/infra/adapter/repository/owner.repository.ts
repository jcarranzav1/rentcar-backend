import { Injectable } from '@nestjs/common'
import { Owner } from '@prisma/client'
import { PageOptionsDto } from 'src/internal/domain/dto/pagination'
import { IOwnerRepository } from 'src/internal/domain/ports/owner'
import { PrismaService } from '../../database/prisma.service'
import { OwnerModel, UpdateOwnerModel } from '../models/owner'

@Injectable()
export class OwnerRepository implements IOwnerRepository {
  constructor(private prisma: PrismaService) {}

  async createOwner(createOwner: OwnerModel): Promise<Owner> {
    return await this.prisma.owner.create({ data: createOwner })
  }

  async updateOwner(
    email: string,
    updateOwner: UpdateOwnerModel,
  ): Promise<Owner> {
    return await this.prisma.owner.update({
      where: {
        email,
      },
      data: updateOwner,
    })
  }

  async getAllOwners({ order, take, skip }: PageOptionsDto): Promise<Owner[]> {
    return await this.prisma.owner.findMany({
      orderBy: {
        createdAt: order,
      },
      take,
      skip,
      include: {
        _count: {
          select: { cars: true },
        },
      },
    })
  }

  async getAllOwnersCount(): Promise<number> {
    return await this.prisma.owner.count()
  }

  async getOwnerByEmail(email: string): Promise<Owner> | null {
    const owner = await this.prisma.owner.findUnique({
      where: {
        email,
      },
    })

    if (owner === null) {
      return null
    }
    return owner
  }

  async getOwnerByID(id: string): Promise<Owner> | null {
    const owner = await this.prisma.owner.findUnique({
      where: {
        id,
      },
      include: {
        cars: true,
      },
    })
    if (owner === null) {
      return null
    }
    return owner
  }
}
