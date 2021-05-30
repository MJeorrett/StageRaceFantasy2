import { doErrorToastIfRequired } from './doErrorToastIfRequired';
import { buildApiUrl, BuildApiUrlQueryParams } from './buildApiUrl';
import { unpackApiListResponseModel, unpackApiPaginatedListResponseModel, unpackApiResponseModel } from './httpResponseUnpackers';
import { ApiListResponseModel, ApiPaginatedListResponseModel, ApiPaginationQueryParams, ApiResponseModel } from './apiResponseModels';
import { ApiClientListResponse, ApiClientPaginatedListResponse, ApiClientResponse } from './apiClientResponseModels';
import { httpDelete, httpGet, httpPost, httpPut } from './httpClient';

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

export const apiGetPaginated = async <TApiResponse, TResponse>(
    path: string,
    queryParams: ApiPaginationQueryParams & BuildApiUrlQueryParams,
    mapper: (apiModel: TApiResponse) => TResponse): Promise<ApiClientPaginatedListResponse<TResponse>> => {
    const url = buildApiUrl(path, queryParams);
    const response = await httpGet<ApiPaginatedListResponseModel<TApiResponse>>(url);

    doErrorToastIfRequired(response);

    return unpackApiPaginatedListResponseModel(response, mapper);
};

export const apiPost = async <TDto,>(path: string, dto?: TDto): Promise<ApiClientResponse<number>> => {
    const url = buildApiUrl(path);
    const response = await httpPost<ApiResponseModel<number>>(url, dto);

    doErrorToastIfRequired(response);

    return unpackApiResponseModel(response, m => m);
};

export const apiPut = async <TDto,>(path: string, dto: TDto): Promise<ApiClientResponse<void>> => {
    const url = buildApiUrl(path);
    const response = await httpPut<ApiResponseModel<void>>(url, dto);

    doErrorToastIfRequired(response);

    return unpackApiResponseModel(response, m => m);
};

export const apiDelete = async (path: string): Promise<ApiClientResponse<void>> => {
    const url = buildApiUrl(path);
    const response = await httpDelete<ApiResponseModel<void>>(url);

    doErrorToastIfRequired(response);

    return unpackApiResponseModel(response, m => m);
};