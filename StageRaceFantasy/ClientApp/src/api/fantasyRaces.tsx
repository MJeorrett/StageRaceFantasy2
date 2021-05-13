import { buildApiUrl, buildApiUrlWithQueryParams, doErrorToastIfRequired, httpClient } from './common';
import { ApiListResponse, ApiPaginatedListResponse, ApiPaginationQueryParams, ApiSingleObjectResponse, unpackApiListResponse, unpackApiPaginatedListResponse, unpackApiSingleObjectResponse } from './models/common';
import { ApiFantasyRace } from './models';
import { FantasyRace } from '../models';
import { HttpClientResponse } from './common/httpClient';
import { mapFromApiFantasyRaceDetails, mapFromApiFantasyRaceSummary } from '../modelMappers/fantasyRace';

export const createFantasyRace = async (createDto: ApiFantasyRace.CreateUpdateDto): Promise<HttpClientResponse<number>> => {
    const url = buildApiUrl('api/fantasy-races');
    const response = await httpClient.postRequest<ApiSingleObjectResponse<number>>(url, createDto);

    doErrorToastIfRequired(response);

    return unpackApiSingleObjectResponse(response, m => m);
};

export const updateFantasyRace = async (id: number, updateDto: ApiFantasyRace.CreateUpdateDto): Promise<HttpClientResponse<void>> => {
    const url = buildApiUrl(`api/fantasy-races/${id}`);
    const response = await httpClient.putRequest<ApiSingleObjectResponse<void>>(url, updateDto);

    doErrorToastIfRequired(response);

    return unpackApiSingleObjectResponse(response, m => m);
};

export const getPaginatedFantasyRaces = async (paginationQueryParams: ApiPaginationQueryParams): Promise<HttpClientResponse<ApiPaginatedListResponse<FantasyRace.Summary>>> => {
    const url = buildApiUrlWithQueryParams('api/fantasy-races', paginationQueryParams);
    const response = await httpClient.getRequest<ApiPaginatedListResponse<ApiFantasyRace.Summary>>(url);

    doErrorToastIfRequired(response);

    return unpackApiPaginatedListResponse(response, mapFromApiFantasyRaceSummary);
};

export const getAllFantasyRaceNames = async (): Promise<HttpClientResponse<ApiListResponse<FantasyRace.Name>>> => {
    const url = buildApiUrl('api/fantasy-race-names');
    const response = await httpClient.getRequest<ApiListResponse<ApiFantasyRace.Name>>(url);

    doErrorToastIfRequired(response);

    return unpackApiListResponse(response, m => m);
};

export const getFantasyRaceById = async (id: number): Promise<HttpClientResponse<FantasyRace.Details>> => {
    const url = buildApiUrl(`api/fantasy-races/${id}`);
    const response = await httpClient.getRequest<ApiSingleObjectResponse<ApiFantasyRace.Details>>(url);

    doErrorToastIfRequired(response);

    return unpackApiSingleObjectResponse(response, mapFromApiFantasyRaceDetails);
};