import { buildApiUrl, doErrorToastIfRequired, httpClient } from './common';
import { ApiListResponse, ApiSingleObjectResponse, unpackApiListResponse, unpackApiSingleObjectResponse } from './models/common';
import { ApiFantasyStageRace } from './models';
import { FantasyStageRace } from '../models';
import { HttpClientResponse } from './common/httpClient';

export const createFantasyStageRace = async (createBookingDto: ApiFantasyStageRace.CreateUpdateDto): Promise<HttpClientResponse<FantasyStageRace.Summary>> => {
    const url = buildApiUrl('api/fantasy-stage-races');
    const response = await httpClient.postRequest<ApiSingleObjectResponse<ApiFantasyStageRace.Summary>>(url, createBookingDto);

    doErrorToastIfRequired(response);

    return unpackApiSingleObjectResponse(response, m => m);
};

export const updateFantasyStageRace = async (id: number, updateBookingDto: ApiFantasyStageRace.CreateUpdateDto): Promise<HttpClientResponse<void>> => {
    const url = buildApiUrl(`api/fantasy-stage-races/${id}`);
    const response = await httpClient.putRequest<ApiSingleObjectResponse<void>>(url, updateBookingDto);

    doErrorToastIfRequired(response);

    return unpackApiSingleObjectResponse(response, m => m);
};

export const getAllFantasyStageRaces = async (): Promise<HttpClientResponse<ApiListResponse<FantasyStageRace.Summary>>> => {
    const url = buildApiUrl('api/fantasy-stage-races');
    const response = await httpClient.getRequest<ApiListResponse<ApiFantasyStageRace.Summary>>(url);

    doErrorToastIfRequired(response);

    return unpackApiListResponse(response, m => m);
};

export const getFantasyStageRaceById = async (id: number): Promise<HttpClientResponse<FantasyStageRace.Details>> => {
    const url = buildApiUrl(`api/fantasy-stage-races/${id}`);
    const response = await httpClient.getRequest<ApiSingleObjectResponse<ApiFantasyStageRace.Details>>(url);

    doErrorToastIfRequired(response);

    return unpackApiSingleObjectResponse(response, m => m);
};