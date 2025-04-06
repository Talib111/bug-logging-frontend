export type I_LIST_TYPE<T> = {
  success: boolean
  message: string
  data: {
    docs: Array<T>
    totalDocs: number
    limit: number
    page: number
    totalPages: number
    pagingCounter: number
    hasPrevPage: boolean
    hasNextPage: boolean
    prevPage: null
    nextPage: null
  }
}
