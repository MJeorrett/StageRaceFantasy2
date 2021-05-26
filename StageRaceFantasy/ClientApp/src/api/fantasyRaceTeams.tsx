import { FantasyRaceTeam } from '../models';
import { buildApiUrl, buildApiUrlWithQueryParams, doErrorToastIfRequired, httpClient } from './common';
import { HttpClientResponse } from './common/httpClient';
import { ApiFantasyRaceTeam } from './models';
import { ApiPaginatedListResponse, ApiPaginationQueryParams, ApiSingleObjectResponse, unpackApiPaginatedListResponse, unpackApiSingleObjectResponse } from './models/common';

export const createFantasyRaceTeam = async (fantasyRaceId: number, createDto: ApiFantasyRaceTeam.CreateUpdateDto): Promise<HttpClientResponse<number>> => {
    const url = buildApiUrl(`api/fantasy-races/${fantasyRaceId}/fantasy-teams`);
    const response = await httpClient.postRequest<ApiSingleObjectResponse<number>>(url, createDto);

    doErrorToastIfRequired(response);

    return unpackApiSingleObjectResponse(response, m => m);
};

export interface GetPaginatedFantasyRaceTeamsParams extends ApiPaginationQueryParams {
    fantasyRaceId: number,
}

export const getPaginatedFantasyRaceTeams = async (fantasyRaceId: number, paginationQueryParams: ApiPaginationQueryParams): Promise<HttpClientResponse<ApiPaginatedListResponse<FantasyRaceTeam.Summary>>> => {
    const url = buildApiUrlWithQueryParams(`api/fantasy-races/${fantasyRaceId}/fantasy-teams`, paginationQueryParams);
    const response = await httpClient.getRequest<ApiPaginatedListResponse<ApiFantasyRaceTeam.Summary>>(url);

    doErrorToastIfRequired(response);

    return unpackApiPaginatedListResponse(response, m => m);
};