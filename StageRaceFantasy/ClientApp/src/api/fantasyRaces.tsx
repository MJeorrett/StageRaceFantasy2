import { ApiFantasyRace } from './models';
import { FantasyRace } from '../models';
import { apiGet, apiGetList, apiGetPaginated, apiPost, apiPut } from './common/apiClient';
import { mapFromApiFantasyRaceDetails, mapFromApiFantasyRaceSummary } from '../modelMappers/fantasyRace';
import { ApiPaginationQueryParams } from './common/apiResponseModels';

export const createFantasyRace = (createDto: ApiFantasyRace.CreateUpdateDto) => (
    apiPost('api/fantasy-races', createDto)
);

export const updateFantasyRace = async (id: number, updateDto: ApiFantasyRace.CreateUpdateDto) => (
    apiPut(
        `api/fantasy-races/${id}`,
        updateDto)
);

export const getPaginatedFantasyRaces = (paginationQueryParams: ApiPaginationQueryParams) => (
    apiGetPaginated<ApiFantasyRace.Summary, FantasyRace.Summary>(
        'api/fantasy-races',
        paginationQueryParams,
        mapFromApiFantasyRaceSummary)
);

export const getAllFantasyRaceNames = () => (
    apiGetList<ApiFantasyRace.Name, FantasyRace.Name>('api/fantasy-race-names', m => m)
);

export const getFantasyRaceById = (id: number) => (
    apiGet<ApiFantasyRace.Details, FantasyRace.Details>(
        `api/fantasy-races/${id}`,
        mapFromApiFantasyRaceDetails)
);