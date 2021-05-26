import { HttpClientResponse } from '.';
import { Rider } from '../models';
import { buildApiUrl, httpClient, doErrorToastIfRequired, apiClient } from './common';
import { ApiRider } from './models';
import { ApiSingleObjectResponse, unpackApiSingleObjectResponse } from './models/common';

export const createRider = async (createDto: ApiRider.CreateUpdateDto): Promise<HttpClientResponse<number>> => {
    const url = buildApiUrl('api/riders');
    const response = await httpClient.postRequest<ApiSingleObjectResponse<number>>(url, createDto);

    doErrorToastIfRequired(response);

    return unpackApiSingleObjectResponse(response, m => m);
};

export const getPaginatedRiders = apiClient
    .makeGetPaginated<ApiRider.Summary, Rider.Summary>(
        'api/riders',
        m => m
    );

export const getRiderById = (id: number) => (
    apiClient.getSingleObject<ApiRider.Summary, Rider.Summary>(
        `api/riders/${id}`,
        m => m)
);