import { HttpClientResponse } from '../../common/httpClient';

export interface ApiSingleObjectResponse<T> {
    message: string,
    content: T,
}

export function unpackApiSingleObjectResponse<TResponse, TMapped>(
    response: HttpClientResponse<ApiSingleObjectResponse<TResponse>>,
    mapper: (responseModel: TResponse) => TMapped): HttpClientResponse<TMapped> {
    if (response.isError) return response;

    try {
        return {
            ...response,
            body: mapper(response.body.content),
        };
    }
    catch (error) {
        console.error('error parsing api response:', error);
        throw error;
    }
}