import { FantasyTeam } from '../models';
import { apiGet, apiGetPaginated, apiPost } from './common/apiClient';
import { ApiPaginationQueryParams } from './common/apiResponseModels';
import { ApiFantasyTeam } from './models';

export const createFantasyTeam = async (createDto: ApiFantasyTeam.CreateUpdateDto) => (
    apiPost('api/fantasy-teams', createDto)
);

export const getFantasyTeamById = async (fantasyTeamId: number) => (
    apiGet<ApiFantasyTeam.Details, FantasyTeam.Details>(`api/fantasy-teams/${fantasyTeamId}`, m => m)
);

export const getPaginatedFantasyTeams = async (fantasyRaceId: number, paginationQueryParams: ApiPaginationQueryParams) => (
    apiGetPaginated<ApiFantasyTeam.Summary, FantasyTeam.Summary>(
        `api/fantasy-races/${fantasyRaceId}/fantasy-teams`,
        paginationQueryParams,
        m => m,
    )
);