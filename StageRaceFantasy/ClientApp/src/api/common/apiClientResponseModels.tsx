import { ApiPaginationListResponseContent } from './apiResponseModels';

export interface ApiClientSuccessResponse<T> {
    isError: false,
    statusCode: number,
    content: T,
    message: string,
}

export interface ApiClientFailureResponse {
    isError: true,
    statusCode?: number,
    message: string,
}

export type ApiClientResponse<T> = ApiClientSuccessResponse<T> | ApiClientFailureResponse;

export type ApiClientListResponse<T> = ApiClientResponse<T[]>;

export type ApiClientPaginatedListResponse<T> = ApiClientResponse<ApiPaginationListResponseContent<T>>;