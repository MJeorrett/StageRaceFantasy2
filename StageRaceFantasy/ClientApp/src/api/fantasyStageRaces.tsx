import { ApiStandardResponse, buildApiUrl, doErrorToastIfRequired, httpClient, mapHttpClientListResponse, mapHttpClientResponse } from './common';
import { ApiListResponse } from './models/common';
import { ApiFantasyStageRace } from './models';
import { FantasyStageRace } from '../models';
import { HttpClientResponse } from './common/httpClient';

export const createFantasyStageRace = async (createBookingDto: ApiFantasyStageRace.CreateUpdateDto): Promise<HttpClientResponse<FantasyStageRace.Summary>> => {
    const url = buildApiUrl('api/fantasy-stage-races');
    const response = await httpClient.postRequest<ApiStandardResponse<ApiFantasyStageRace.Summary>>(url, createBookingDto);

    doErrorToastIfRequired(response);

    return mapHttpClientResponse(response, m => m);
};

export const updateFantasyStageRace = async (id: number, updateBookingDto: ApiFantasyStageRace.CreateUpdateDto): Promise<HttpClientResponse<void>> => {
    const url = buildApiUrl(`api/fantasy-stage-races/${id}`);
    const response = await httpClient.putRequest<ApiStandardResponse<void>>(url, updateBookingDto);

    doErrorToastIfRequired(response);

    return mapHttpClientResponse(response, m => m);
};

export const getAllFantasyStageRaces = async (): Promise<HttpClientResponse<ApiListResponse<FantasyStageRace.Summary>>> => {
    const url = buildApiUrl('api/fantasy-stage-races');
    const response = await httpClient.getRequest<ApiListResponse<ApiFantasyStageRace.Summary>>(url);

    doErrorToastIfRequired(response);

    return mapHttpClientListResponse(response, m => m);
};

export const getFantasyStageRaceById = async (id: number): Promise<HttpClientResponse<FantasyStageRace.Details>> => {
    const url = buildApiUrl(`api/fantasy-stage-races/${id}`);
    const response = await httpClient.getRequest<ApiStandardResponse<ApiFantasyStageRace.Details>>(url);

    doErrorToastIfRequired(response);

    return mapHttpClientResponse(response, m => m);
};