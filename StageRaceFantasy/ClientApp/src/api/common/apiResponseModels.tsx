export interface ApiResponseModel<T> {
    statusCode: number,
    message: string,
    content: T,
}

export type ApiListResponseModel<T> = ApiResponseModel<T[]>;

export interface ApiPaginationQueryParams {
    'pageNumber': number,
    'pageSize': number,
}

export interface ApiPagination {
    pageNumber: number,
    pageSize: number,
    totalPages: number,
    totalCount: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean,
}

export type ApiPaginationListResponseContent<T> = ApiPagination & {
    items: T[],
}

export type ApiPaginatedListResponseModel<T> =
    ApiResponseModel<ApiPaginationListResponseContent<T>>;