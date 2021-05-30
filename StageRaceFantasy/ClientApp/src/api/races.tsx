import { ApiRace } from './models';
import { Race } from '../models';
import { apiGet, apiGetList, apiGetPaginated, apiPost, apiPut } from './common/apiClient';
import { mapFromApiRaceDetails, mapFromApiRaceSummary } from '../modelMappers/race';
import { ApiPaginationQueryParams } from './common/apiResponseModels';

export const createRace = (createDto: ApiRace.CreateUpdateDto) => (
    apiPost('api/races', createDto)
);

export const updateRace = async (id: number, updateDto: ApiRace.CreateUpdateDto) => (
    apiPut(
        `api/races/${id}`,
        updateDto)
);

export const getPaginatedRaces = (paginationQueryParams: ApiPaginationQueryParams) => (
    apiGetPaginated<ApiRace.Summary, Race.Summary>(
        'api/races',
        paginationQueryParams as any,
        mapFromApiRaceSummary)
);

export const getAllRaceNames = () => (
    apiGetList<ApiRace.Name, Race.Name>('api/race-names', m => m)
);

export const getRaceById = (id: number) => (
    apiGet<ApiRace.Details, Race.Details>(
        `api/races/${id}`,
        mapFromApiRaceDetails)
);