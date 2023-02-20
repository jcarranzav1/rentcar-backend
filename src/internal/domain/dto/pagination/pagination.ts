import { Type } from 'class-transformer'
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator'
import { PageMetaDto } from './paginationResponse'

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

export class PageOptionsDto {
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 10

  get skip(): number {
    return (this.page - 1) * this.take
  }
}

export function paginationParams(
  { take, page }: PageOptionsDto,
  totalItems: number,
): PageMetaDto {
  const totalPages = Math.ceil(totalItems / take)
  const hasPreviousPage = page > 1
  const hasNextPage = page < totalPages

  return {
    take,
    page,
    totalItems,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  }
}
