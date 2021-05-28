import { httpClient } from '..';
import { doErrorToastIfRequired } from '../doErrorToastIfRequired';
import { buildApiUrl, buildApiUrlWithQueryParams } from './buildApiUrl';
import { unpackApiListResponseModel, unpackApiPaginatedListResponseModel, unpackApiResponseModel } from './httpResponseUnpackers';
import { ApiListResponseModel, ApiPaginatedListResponseModel, ApiPaginationQueryParams, ApiResponseModel } from './models';
import { ApiClientListResponse, ApiClientPaginatedListResponse, ApiClientResponse } from './responses';

export const basicGet = async <TApiResponse, TResponse>(path: string, mapper: (apiModel: TApiResponse) => TResponse): Promise<ApiClientResponse<TResponse>> => {
    const url = buildApiUrl(path);
    const response = await httpClient.getRequest<ApiResponseModel<TApiResponse>>(url);

    doErrorToastIfRequired(response);

    return unpackApiResponseModel(response, mapper);
};

export const makeGetList = <TApiResponse, TResponse>(path: string, mapper: (apiModel: TApiResponse) => TResponse) => async (): Promise<ApiClientListResponse<TResponse>> => {
    const url = buildApiUrl(path);
    const response = await httpClient.getRequest<ApiListResponseModel<TApiResponse>>(url);

    doErrorToastIfRequired(response);

    return unpackApiListResponseModel(response, mapper);
};

export const makeGetPaginated = <TApiResponse, TResponse>(path: string, mapper: (apiModel: TApiResponse) => TResponse) => async (paginationQueryParams: ApiPaginationQueryParams): Promise<ApiClientPaginatedListResponse<TResponse>> => {
    const url = buildApiUrlWithQueryParams(path, paginationQueryParams);
    const response = await httpClient.getRequest<ApiPaginatedListResponseModel<TApiResponse>>(url);

    doErrorToastIfRequired(response);

    return unpackApiPaginatedListResponseModel(response, mapper);
};

export const put = async <TDto,>(path: string, dto: TDto): Promise<ApiClientResponse<void>> => {
    const url = buildApiUrl(path);
    const response = await httpClient.putRequest<ApiResponseModel<void>>(url, dto);

    doErrorToastIfRequired(response);

    return unpackApiResponseModel(response, m => m);
};

export * from './models';
export * from './responses';
export * from './httpResponseUnpackers';