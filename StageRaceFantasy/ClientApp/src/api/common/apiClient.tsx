import { doErrorToastIfRequired } from './doErrorToastIfRequired';
import { buildApiUrl, buildApiUrlWithQueryParams } from './buildApiUrl';
import { unpackApiListResponseModel, unpackApiPaginatedListResponseModel, unpackApiResponseModel } from './httpResponseUnpackers';
import { ApiListResponseModel, ApiPaginatedListResponseModel, ApiPaginationQueryParams, ApiResponseModel } from './apiResponseModels';
import { ApiClientListResponse, ApiClientPaginatedListResponse, ApiClientResponse } from './apiClientResponseModels';
import { httpGet, httpPut } from './httpClient';

export const apiGet = async <TApiResponse, TResponse>(path: string, mapper: (apiModel: TApiResponse) => TResponse): Promise<ApiClientResponse<TResponse>> => {
    const url = buildApiUrl(path);
    const response = await httpGet<ApiResponseModel<TApiResponse>>(url);

    doErrorToastIfRequired(response);

    return unpackApiResponseModel(response, mapper);
};

export const apiGetList = async <TApiResponse, TResponse>(path: string, mapper: (apiModel: TApiResponse) => TResponse): Promise<ApiClientListResponse<TResponse>> => {
    const url = buildApiUrl(path);
    const response = await httpGet<ApiListResponseModel<TApiResponse>>(url);

    doErrorToastIfRequired(response);

    return unpackApiListResponseModel(response, mapper);
};

export const makeApiGetList = <TApiResponse, TResponse>(path: string, mapper: (apiModel: TApiResponse) => TResponse) => async (): Promise<ApiClientListResponse<TResponse>> => {
    const url = buildApiUrl(path);
    const response = await httpGet<ApiListResponseModel<TApiResponse>>(url);

    doErrorToastIfRequired(response);

    return unpackApiListResponseModel(response, mapper);
};

export const makeApiGetPaginated = <TApiResponse, TResponse>(path: string, mapper: (apiModel: TApiResponse) => TResponse) => async (paginationQueryParams: ApiPaginationQueryParams): Promise<ApiClientPaginatedListResponse<TResponse>> => {
    const url = buildApiUrlWithQueryParams(path, paginationQueryParams);
    const response = await httpGet<ApiPaginatedListResponseModel<TApiResponse>>(url);

    doErrorToastIfRequired(response);

    return unpackApiPaginatedListResponseModel(response, mapper);
};

export const apiPut = async <TDto,>(path: string, dto: TDto): Promise<ApiClientResponse<void>> => {
    const url = buildApiUrl(path);
    const response = await httpPut<ApiResponseModel<void>>(url, dto);

    doErrorToastIfRequired(response);

    return unpackApiResponseModel(response, m => m);
};