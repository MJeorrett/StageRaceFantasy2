import { ApiFantasyRace } from './models';
import { FantasyRace } from '../models';
import { buildApiUrl } from './common/buildApiUrl';
import { ApiResponseModel } from './common/apiResponseModels';
import { httpPost } from './common/httpClient';
import { ApiClientListResponse, ApiClientResponse } from './common/apiClientResponseModels';
import { doErrorToastIfRequired } from './common/doErrorToastIfRequired';
import { unpackApiResponseModel } from './common/httpResponseUnpackers';
import { apiGet, apiGetList, apiPut, makeApiGetPaginated } from './common/apiClient';
import { mapFromApiFantasyRaceDetails, mapFromApiFantasyRaceSummary } from '../modelMappers/fantasyRace';

export const createFantasyRace = async (createDto: ApiFantasyRace.CreateUpdateDto): Promise<ApiClientResponse<number>> => {
    const url = buildApiUrl('api/fantasy-races');
    const response = await httpPost<ApiResponseModel<number>>(url, createDto);

    doErrorToastIfRequired(response);

    return unpackApiResponseModel(response, m => m);
};

export const updateFantasyRace = async (id: number, updateDto: ApiFantasyRace.CreateUpdateDto): Promise<ApiClientResponse<void>> => (
    apiPut(
        `api/fantasy-races/${id}`,
        updateDto)
);

export const getPaginatedFantasyRaces = makeApiGetPaginated<ApiFantasyRace.Summary, FantasyRace.Summary>(
    'api/fantasy-races',
    mapFromApiFantasyRaceSummary);

export const getAllFantasyRaceNames = async (): Promise<ApiClientListResponse<FantasyRace.Name>> => {
    return apiGetList<ApiFantasyRace.Name, FantasyRace.Name>('api/fantasy-race-names', m => m);
};

export const getFantasyRaceById = async (id: number): Promise<ApiClientResponse<FantasyRace.Details>> => {
    return apiGet<ApiFantasyRace.Details, FantasyRace.Details>(
        `api/fantasy-races/${id}`,
        mapFromApiFantasyRaceDetails);
};