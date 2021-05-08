import { ApiListResponse } from '../models/common/apiListResponse';
import { ApiPaginatedResponse } from '../models/common/apiPaginatedResponse';
import { HttpClientResponse } from './httpClient';

export interface ApiStandardResponse<T> {
    message: string,
    content: T,
    statusCode: number,
}

export function mapHttpClientResponse<TResponse, TMapped>(
    response: HttpClientResponse<ApiStandardResponse<TResponse>>,
    mapper: (responseModel: TResponse) => TMapped): HttpClientResponse<TMapped> {
    if (response.isError) return response;

    try {
        return {
            ...response,
            content: mapper(response.content.content)
        };
    }
    catch (error) {
        console.error('error parsing api response:', error);
        throw error;
    }
}

export function mapHttpClientListResponse<TResponse, TMapped>(
    response: HttpClientResponse<ApiListResponse<TResponse>>,
    mapper: (responseModel: TResponse) => TMapped): HttpClientResponse<ApiListResponse<TMapped>> {
    if (response.isError) return response;

    try {
        return {
            ...response,
            content: {
                content: response.content.content.map(mapper),
                message: response.content.message,
            }
        };
    }
    catch (error) {
        console.error('error parsing api response:', error);
        throw error;
    }
}

export function mapHttpClientPaginatedResponse<TResponse, TMapped>(
    response: HttpClientResponse<ApiPaginatedResponse<TResponse>>,
    mapper: (responseModel: TResponse) => TMapped): HttpClientResponse<ApiPaginatedResponse<TMapped>> {
    if (response.isError) return response;

    try {
        return {
            ...response,
            content: {
                content: {
                    ...response.content.content,
                    items: response.content.content.items.map(mapper),
                }
            },
        };
    }
    catch (error) {
        console.error('error parsing api response:', error);
        throw error;
    }
}