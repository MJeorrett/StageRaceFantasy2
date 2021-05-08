import { ApiStandardResponse, buildApiUrl, doErrorToastIfRequired, httpClient, mapHttpClientListResponse, mapHttpClientResponse } from './common';
import { HttpClientResponse } from './common/httpClient';
import { ApiListResponse } from './models/common/apiListResponse';
import { ApiFantasyStageRace } from './models';
import { FantasyStageRace } from '../models';

export const createFantasyStageRace = async (createBookingDto: ApiFantasyStageRace.CreateDto): Promise<HttpClientResponse<FantasyStageRace.Summary>> => {
    const url = buildApiUrl('api/fantasy-stage-races');
    const response = await httpClient.postRequest<ApiStandardResponse<ApiFantasyStageRace.Summary>>(url, createBookingDto);

    doErrorToastIfRequired(response);

    return mapHttpClientResponse(response, m => m);
};

export const getAllFantasyStageRaces = async (): Promise<HttpClientResponse<ApiListResponse<FantasyStageRace.Summary>>> => {
    const url = buildApiUrl('api/fantasy-stage-races');
    const response = await httpClient.getRequest<ApiListResponse<ApiFantasyStageRace.Summary>>(url);
    doErrorToastIfRequired(response);
    return mapHttpClientListResponse(response, m => m);
};