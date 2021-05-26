import { buildApiUrlWithQueryParams, httpClient, doErrorToastIfRequired, buildApiUrl } from '.';
import { HttpClientResponse } from '..';
import { ApiPaginatedListResponse, ApiPaginationQueryParams, ApiSingleObjectResponse, unpackApiPaginatedListResponse, unpackApiSingleObjectResponse } from '../models/common';

export const makeGetPaginated = <TApiResponse, TResponse>(path: string, mapper: (apiModel: TApiResponse) => TResponse) => async (paginationQueryParams: ApiPaginationQueryParams): Promise<HttpClientResponse<ApiPaginatedListResponse<TResponse>>> => {
    const url = buildApiUrlWithQueryParams(path, paginationQueryParams);
    const response = await httpClient.getRequest<ApiPaginatedListResponse<TApiResponse>>(url);

    doErrorToastIfRequired(response);

    return unpackApiPaginatedListResponse(response, mapper);
};

export const getSingleObject = async <TApiResponse, TResponse>(path: string, mapper: (apiModel: TApiResponse) => TResponse): Promise<HttpClientResponse<TResponse>> => {
    const url = buildApiUrl(path);
    const response = await httpClient.getRequest<ApiSingleObjectResponse<TApiResponse>>(url);

    doErrorToastIfRequired(response);

    return unpackApiSingleObjectResponse(response, mapper);
};

export const put = async <TDto,>(path: string, dto: TDto): Promise<HttpClientResponse<void>> => {
    const url = buildApiUrl(path);
    const response = await httpClient.putRequest<ApiSingleObjectResponse<void>>(url, dto);

    doErrorToastIfRequired(response);

    return unpackApiSingleObjectResponse(response, m => m);
};