export interface PageMetaDto {
  take: number
  page: number
  totalItems: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export interface PageDto<T> {
  data: T[]
  meta: PageMetaDto
}
