import { FantasyRaceTeam } from '../models';
import {  ApiClientResponse, ApiPaginationQueryParams, ApiResponseModel, buildApiUrl, doErrorToastIfRequired, httpClient, makeGetPaginated, unpackApiResponseModel } from './common';
import { ApiFantasyRaceTeam } from './models';

export const createFantasyRaceTeam = async (fantasyRaceId: number, createDto: ApiFantasyRaceTeam.CreateUpdateDto): Promise<ApiClientResponse<number>> => {
    const url = buildApiUrl(`api/fantasy-races/${fantasyRaceId}/fantasy-teams`);
    const response = await httpClient.postRequest<ApiResponseModel<number>>(url, createDto);

    doErrorToastIfRequired(response);

    return unpackApiResponseModel(response, m => m);
};

export const getPaginatedFantasyRaceTeams = async (fantasyRaceId: number, paginationQueryParams: ApiPaginationQueryParams) => (
    makeGetPaginated<ApiFantasyRaceTeam.Summary, FantasyRaceTeam.Summary>(
        `api/fantasy-races/${fantasyRaceId}/fantasy-teams`,
        m => m,
    )(paginationQueryParams)
);