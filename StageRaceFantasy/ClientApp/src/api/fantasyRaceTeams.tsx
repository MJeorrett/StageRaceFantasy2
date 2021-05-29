import { FantasyRaceTeam } from '../models';
import { apiGetPaginated, apiPost } from './common/apiClient';
import { ApiPaginationQueryParams } from './common/apiResponseModels';
import { ApiFantasyRaceTeam } from './models';

export const createFantasyRaceTeam = async (createDto: ApiFantasyRaceTeam.CreateUpdateDto) => (
    apiPost('api/fantasy-teams', createDto)
);

export const getPaginatedFantasyRaceTeams = async (fantasyRaceId: number, paginationQueryParams: ApiPaginationQueryParams) => (
    apiGetPaginated<ApiFantasyRaceTeam.Summary, FantasyRaceTeam.Summary>(
        `api/fantasy-races/${fantasyRaceId}/fantasy-teams`,
        paginationQueryParams,
        m => m,
    )
);