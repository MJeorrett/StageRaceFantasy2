import { HttpClientResponse } from '../../common/httpClient';

export interface ApiListResponse<T> {
    content: T[],
}

export function unpackApiListResponse<TResponse, TMapped>(
    response: HttpClientResponse<ApiListResponse<TResponse>>,
    mapper: (responseModel: TResponse) => TMapped): HttpClientResponse<ApiListResponse<TMapped>> {
    if (response.isError) return response;

    try {
        return {
            ...response,
            body: {
                content: response.body.content.map(mapper),
            }
        };
    }
    catch (error) {
        console.error('error parsing api response:', error);
        throw error;
    }
}