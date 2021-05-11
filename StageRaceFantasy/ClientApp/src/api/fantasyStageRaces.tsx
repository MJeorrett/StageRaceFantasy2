import { buildApiUrl, buildApiUrlWithQueryParams, doErrorToastIfRequired, httpClient } from './common';
import { ApiPaginatedListResponse, ApiPaginationQueryParams, ApiSingleObjectResponse, unpackApiPaginatedListResponse, unpackApiSingleObjectResponse } from './models/common';
import { ApiFantasyStageRace } from './models';
import { FantasyStageRace } from '../models';
import { HttpClientResponse } from './common/httpClient';
import { mapFromApiFantasyStageRaceDetails, mapFromApiFantasyStageRaceSummary } from '../modelMappers/fantasyStageRace';

export const createFantasyStageRace = async (createBookingDto: ApiFantasyStageRace.CreateUpdateDto): Promise<HttpClientResponse<FantasyStageRace.Summary>> => {
    const url = buildApiUrl('api/fantasy-stage-races');
    const response = await httpClient.postRequest<ApiSingleObjectResponse<ApiFantasyStageRace.Summary>>(url, createBookingDto);

    doErrorToastIfRequired(response);

    return unpackApiSingleObjectResponse(response, mapFromApiFantasyStageRaceSummary);
};

export const updateFantasyStageRace = async (id: number, updateBookingDto: ApiFantasyStageRace.CreateUpdateDto): Promise<HttpClientResponse<void>> => {
    const url = buildApiUrl(`api/fantasy-stage-races/${id}`);
    const response = await httpClient.putRequest<ApiSingleObjectResponse<void>>(url, updateBookingDto);

    doErrorToastIfRequired(response);

    return unpackApiSingleObjectResponse(response, m => m);
};

export const getPaginatedFantasyStageRaces = async (paginationQueryParams: ApiPaginationQueryParams): Promise<HttpClientResponse<ApiPaginatedListResponse<FantasyStageRace.Summary>>> => {
    const url = buildApiUrlWithQueryParams('api/fantasy-stage-races', paginationQueryParams);
    const response = await httpClient.getRequest<ApiPaginatedListResponse<ApiFantasyStageRace.Summary>>(url);

    doErrorToastIfRequired(response);

    return unpackApiPaginatedListResponse(response, mapFromApiFantasyStageRaceSummary);
};

export const getFantasyStageRaceById = async (id: number): Promise<HttpClientResponse<FantasyStageRace.Details>> => {
    const url = buildApiUrl(`api/fantasy-stage-races/${id}`);
    const response = await httpClient.getRequest<ApiSingleObjectResponse<ApiFantasyStageRace.Details>>(url);

    doErrorToastIfRequired(response);

    return unpackApiSingleObjectResponse(response, mapFromApiFantasyStageRaceDetails);
};