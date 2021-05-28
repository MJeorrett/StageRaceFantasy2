import { ApiClientListResponse, ApiClientResponse, ApiListResponseModel, ApiResponseModel, basicGet, buildApiUrl, doErrorToastIfRequired, httpClient, makeGetPaginated, put, unpackApiListResponseModel, unpackApiResponseModel } from './common';
import { ApiFantasyRace } from './models';
import { FantasyRace } from '../models';
import { mapFromApiFantasyRaceDetails, mapFromApiFantasyRaceSummary } from '../modelMappers/fantasyRace';

export const createFantasyRace = async (createDto: ApiFantasyRace.CreateUpdateDto): Promise<ApiClientResponse<number>> => {
    const url = buildApiUrl('api/fantasy-races');
    const response = await httpClient.postRequest<ApiResponseModel<number>>(url, createDto);

    doErrorToastIfRequired(response);

    return unpackApiResponseModel(response, m => m);
};

export const updateFantasyRace = async (id: number, updateDto: ApiFantasyRace.CreateUpdateDto): Promise<ApiClientResponse<void>> => (
    put(
        `api/fantasy-races/${id}`,
        updateDto)
);

export const getPaginatedFantasyRaces = makeGetPaginated<ApiFantasyRace.Summary, FantasyRace.Summary>(
    'api/fantasy-races',
    mapFromApiFantasyRaceSummary);

export const getAllFantasyRaceNames = async (): Promise<ApiClientListResponse<FantasyRace.Name>> => {
    const url = buildApiUrl('api/fantasy-race-names');
    const response = await httpClient.getRequest<ApiListResponseModel<ApiFantasyRace.Name>>(url);

    doErrorToastIfRequired(response);

    return unpackApiListResponseModel(response, m => m);
};

export const getFantasyRaceById = async (id: number): Promise<ApiClientResponse<FantasyRace.Details>> => (
    basicGet<ApiFantasyRace.Details, FantasyRace.Details>(
        `api/fantasy-races/${id}`,
        mapFromApiFantasyRaceDetails)
);