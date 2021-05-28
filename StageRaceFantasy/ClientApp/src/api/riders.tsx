import { HttpClientResponse } from '.';
import { Rider } from '../models';
import { buildApiUrl, httpClient, doErrorToastIfRequired, ApiResponseModel, unpackApiResponseModel, ApiClientResponse, put, makeGetPaginated, basicGet } from './common';
import { ApiRider } from './models';

export const createRider = async (createDto: ApiRider.CreateUpdateDto): Promise<ApiClientResponse<number>> => {
    const url = buildApiUrl('api/riders');
    const response = await httpClient.postRequest<ApiResponseModel<number>>(url, createDto);

    doErrorToastIfRequired(response);

    return unpackApiResponseModel(response, m => m);
};

export const updateRider = async (id: number, updateDto: ApiRider.CreateUpdateDto) => (
    put(`api/riders/${id}`, updateDto)
);

export const getPaginatedRiders = makeGetPaginated<ApiRider.Summary, Rider.Summary>(
    'api/riders',
    m => m
);

export const getRiderById = (id: number) => (
    basicGet<ApiRider.Summary, Rider.Summary>(
        `api/riders/${id}`,
        m => m)
);