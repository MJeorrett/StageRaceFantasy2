import { Rider } from '../models';
import { apiGet, apiGetPaginated, apiPost, apiPut } from './common/apiClient';
import { ApiPaginationQueryParams } from './common/apiResponseModels';
import { BuildApiUrlQueryParams } from './common/buildApiUrl';
import { ApiRider } from './models';

export const createRider = async (createDto: ApiRider.CreateUpdateDto) => (
    apiPost('api/riders', createDto)
);

export const updateRider = async (id: number, updateDto: ApiRider.CreateUpdateDto) => (
    apiPut(`api/riders/${id}`, updateDto)
);

export type GetPaginatedRidersParams = ApiPaginationQueryParams & {
    nameFilter: string,
}

export const getPaginatedRiders = (paginationQueryParams: GetPaginatedRidersParams) => (
    apiGetPaginated<ApiRider.Summary, Rider.Summary>(
        'api/riders',
        paginationQueryParams as any,
        m => m)
);

export const getRiderById = (id: number) => (
    apiGet<ApiRider.Summary, Rider.Summary>(
        `api/riders/${id}`,
        m => m)
);