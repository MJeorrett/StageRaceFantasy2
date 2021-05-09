import { HttpClientResponse } from '../../common/httpClient';

export interface ApiPagination {
    pageNumber: number,
    pageSize: number,
    totalPages: number,
    totalCount: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean,
}

export interface ApiPaginatedResponse<T> {
    content: {
        pageNumber: number,
        pageSize: number,
        totalPages: number,
        totalCount: number,
        hasPreviousPage: boolean,
        hasNextPage: boolean,
        items: T[],
    }
}

export function unpackApiPaginatedResponse<TResponse, TMapped>(
    response: HttpClientResponse<ApiPaginatedResponse<TResponse>>,
    mapper: (responseModel: TResponse) => TMapped): HttpClientResponse<ApiPaginatedResponse<TMapped>> {
    if (response.isError) return response;

    try {
        return {
            ...response,
            body: {
                content: {
                    ...response.body.content,
                    items: response.body.content.items.map(mapper),
                }
            },
        };
    }
    catch (error) {
        console.error('error parsing api response:', error);
        throw error;
    }
}