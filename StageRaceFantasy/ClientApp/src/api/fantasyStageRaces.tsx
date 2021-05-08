import { buildApiUrl, doErrorToastIfRequired, httpClient, mapHttpClientListResponse } from './common';
import { HttpClientResponse } from './common/httpClient';
import { ApiListResponse } from './models/common/apiListResponse';
import { ApiFantasyStageRaceSummary } from './models/fantasyStageRace';

export const getAllFantasyStageRaces = async (): Promise<HttpClientResponse<ApiListResponse<ApiFantasyStageRaceSummary>>> => {
    const url = buildApiUrl('api/fantasy-stage-races');
    const response = await httpClient.getRequest<ApiListResponse<ApiFantasyStageRaceSummary>>(url);
    doErrorToastIfRequired(response);
    return mapHttpClientListResponse(response, m => m);
};