import { HttpClientResponse } from '../../common/httpClient';

export interface ApiPagination {
    pageNumber: number,
    pageSize: number,
    totalPages: number,
    totalCount: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean,
}

export interface ApiPaginatedListResponse<T> {
    content: ApiPagination & {
        items: T[],
    }
}

export function unpackApiPaginatedListResponse<TResponse, TMapped>(
    response: HttpClientResponse<ApiPaginatedListResponse<TResponse>>,
    mapper: (responseModel: TResponse) => TMapped): HttpClientResponse<ApiPaginatedListResponse<TMapped>> {
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