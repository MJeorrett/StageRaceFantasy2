import { Rider } from '../models';
import { apiGet, apiPut, makeApiGetPaginated } from './common/apiClient';
import { buildApiUrl } from './common/buildApiUrl';
import { doErrorToastIfRequired } from './common/doErrorToastIfRequired';
import { httpPost } from './common/httpClient';
import { unpackApiResponseModel } from './common/httpResponseUnpackers';
import { ApiResponseModel } from './common/apiResponseModels';
import { ApiClientResponse } from './common/apiClientResponseModels';
import { ApiRider } from './models';

export const createRider = async (createDto: ApiRider.CreateUpdateDto): Promise<ApiClientResponse<number>> => {
    const url = buildApiUrl('api/riders');
    const response = await httpPost<ApiResponseModel<number>>(url, createDto);

    doErrorToastIfRequired(response);

    return unpackApiResponseModel(response, m => m);
};

export const updateRider = async (id: number, updateDto: ApiRider.CreateUpdateDto) => (
    apiPut(`api/riders/${id}`, updateDto)
);

export const getPaginatedRiders = makeApiGetPaginated<ApiRider.Summary, Rider.Summary>(
    'api/riders',
    m => m
);

export const getRiderById = (id: number) => (
    apiGet<ApiRider.Summary, Rider.Summary>(
        `api/riders/${id}`,
        m => m)
);