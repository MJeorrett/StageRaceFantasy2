import { apiClient, buildApiUrl, buildApiUrlWithQueryParams, doErrorToastIfRequired, httpClient } from './common';
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

export const getPaginatedFantasyRaces = apiClient
    .makeGetPaginated<ApiFantasyRace.Summary, FantasyRace.Summary>(
        'api/fantasy-races',
        mapFromApiFantasyRaceSummary);

export const getAllFantasyRaceNames = async (): Promise<HttpClientResponse<ApiListResponse<FantasyRace.Name>>> => {
    const url = buildApiUrl('api/fantasy-race-names');
    const response = await httpClient.getRequest<ApiListResponse<ApiFantasyRace.Name>>(url);

    doErrorToastIfRequired(response);

    return unpackApiListResponse(response, m => m);
};

export const getFantasyRaceById = async (id: number): Promise<HttpClientResponse<FantasyRace.Details>> => (
    apiClient.getSingleObject<ApiFantasyRace.Details, FantasyRace.Details>(
        `api/fantasy-races/${id}`,
        mapFromApiFantasyRaceDetails)
);