import { buildApiUrl, buildApiUrlWithQueryParams, doErrorToastIfRequired, httpClient } from './common';
import { ApiPaginatedListResponse, ApiPaginationQueryParams, ApiSingleObjectResponse, unpackApiPaginatedListResponse, unpackApiSingleObjectResponse } from './models/common';
import { ApiFantasyRace } from './models';
import { FantasyRace } from '../models';
import { HttpClientResponse } from './common/httpClient';
import { mapFromApiFantasyRaceDetails, mapFromApiFantasyRaceSummary } from '../modelMappers/fantasyRace';

export const createFantasyRace = async (createDto: ApiFantasyRace.CreateUpdateDto): Promise<HttpClientResponse<FantasyRace.Summary>> => {
    const url = buildApiUrl('api/fantasy-races');
    const response = await httpClient.postRequest<ApiSingleObjectResponse<ApiFantasyRace.Summary>>(url, createDto);

    doErrorToastIfRequired(response);

    return unpackApiSingleObjectResponse(response, mapFromApiFantasyRaceSummary);
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

export const getFantasyRaceById = async (id: number): Promise<HttpClientResponse<FantasyRace.Details>> => {
    const url = buildApiUrl(`api/fantasy-races/${id}`);
    const response = await httpClient.getRequest<ApiSingleObjectResponse<ApiFantasyRace.Details>>(url);

    doErrorToastIfRequired(response);

    return unpackApiSingleObjectResponse(response, mapFromApiFantasyRaceDetails);
};