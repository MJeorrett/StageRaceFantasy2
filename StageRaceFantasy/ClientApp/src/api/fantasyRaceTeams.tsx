import { FantasyRaceTeam } from '../models';
import { apiClient, buildApiUrl, buildApiUrlWithQueryParams, doErrorToastIfRequired, httpClient } from './common';
import { HttpClientResponse } from './common/httpClient';
import { ApiFantasyRaceTeam } from './models';
import { ApiPaginatedListResponse, ApiPaginationQueryParams, ApiSingleObjectResponse, unpackApiPaginatedListResponse, unpackApiSingleObjectResponse } from './models/common';

export const createFantasyRaceTeam = async (fantasyRaceId: number, createDto: ApiFantasyRaceTeam.CreateUpdateDto): Promise<HttpClientResponse<number>> => {
    const url = buildApiUrl(`api/fantasy-races/${fantasyRaceId}/fantasy-teams`);
    const response = await httpClient.postRequest<ApiSingleObjectResponse<number>>(url, createDto);

    doErrorToastIfRequired(response);

    return unpackApiSingleObjectResponse(response, m => m);
};

export const getPaginatedFantasyRaceTeams = async (fantasyRaceId: number, paginationQueryParams: ApiPaginationQueryParams) => (
    apiClient.makeGetPaginated<ApiFantasyRaceTeam.Summary, FantasyRaceTeam.Summary>(
        `api/fantasy-races/${fantasyRaceId}/fantasy-teams`,
        m => m,
    )(paginationQueryParams)
);