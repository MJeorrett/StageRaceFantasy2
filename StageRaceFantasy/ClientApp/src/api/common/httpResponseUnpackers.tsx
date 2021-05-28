import { HttpClientResponse } from './httpClient';
import { ApiListResponseModel, ApiPaginatedListResponseModel, ApiResponseModel } from './apiResponseModels';
import { ApiClientListResponse, ApiClientPaginatedListResponse, ApiClientResponse } from './apiClientResponseModels';

export function unpackApiResponseModel<TResponse, TMapped>(
    response: HttpClientResponse<ApiResponseModel<TResponse>>,
    mapper: (responseModel: TResponse) => TMapped): ApiClientResponse<TMapped> {
    if (response.isError) return response;

    try {
        return {
            ...response,
            content: mapper(response.body.content),
            message: response.body.message,
        };
    }
    catch (error) {
        console.error('error parsing api response:', error);
        throw error;
    }
}

export function unpackApiListResponseModel<TResponse, TMapped>(
    response: HttpClientResponse<ApiListResponseModel<TResponse>>,
    mapper: (responseModel: TResponse) => TMapped): ApiClientListResponse<TMapped> {
    return unpackApiResponseModel(
        response,
        content => content.map(mapper),
    );
}

export function unpackApiPaginatedListResponseModel<TResponse, TMapped>(
    response: HttpClientResponse<ApiPaginatedListResponseModel<TResponse>>,
    mapper: (responseModel: TResponse) => TMapped): ApiClientPaginatedListResponse<TMapped> {
    return unpackApiResponseModel(
        response,
        content => ({
            ...content,
            items: content.items.map(mapper),
        }));
}