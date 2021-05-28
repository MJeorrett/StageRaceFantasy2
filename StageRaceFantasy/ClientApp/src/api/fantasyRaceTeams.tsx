import { FantasyRaceTeam } from '../models';
import { makeApiGetPaginated } from './common/apiClient';
import { buildApiUrl } from './common/buildApiUrl';
import { doErrorToastIfRequired } from './common/doErrorToastIfRequired';
import { httpPost } from './common/httpClient';
import { unpackApiResponseModel } from './common/httpResponseUnpackers';
import { ApiPaginationQueryParams, ApiResponseModel } from './common/apiResponseModels';
import { ApiClientResponse } from './common/apiClientResponseModels';
import { ApiFantasyRaceTeam } from './models';

export const createFantasyRaceTeam = async (fantasyRaceId: number, createDto: ApiFantasyRaceTeam.CreateUpdateDto): Promise<ApiClientResponse<number>> => {
    const url = buildApiUrl(`api/fantasy-races/${fantasyRaceId}/fantasy-teams`);
    const response = await httpPost<ApiResponseModel<number>>(url, createDto);

    doErrorToastIfRequired(response);

    return unpackApiResponseModel(response, m => m);
};

export const getPaginatedFantasyRaceTeams = async (fantasyRaceId: number, paginationQueryParams: ApiPaginationQueryParams) => (
    makeApiGetPaginated<ApiFantasyRaceTeam.Summary, FantasyRaceTeam.Summary>(
        `api/fantasy-races/${fantasyRaceId}/fantasy-teams`,
        m => m,
    )(paginationQueryParams)
);