export type SuccessResponse<T> = { status: 'success'; data: T }
export type PaginateResponse<T> = { items: T[]; totalItems: number }
