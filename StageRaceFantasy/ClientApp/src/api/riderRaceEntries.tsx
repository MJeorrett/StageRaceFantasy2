import { Rider } from '../models';
import { apiDelete, apiGetList, apiGetPaginated, apiPost } from './common/apiClient';
import { ApiPaginationQueryParams } from './common/apiResponseModels';
import { ApiRider } from './models';

export type GetPaginatedRidersEnteredInRaceParams = ApiPaginationQueryParams & {
    nameFilter: string,
}

export const getPaginatedRidersEnteredInRace = (
    raceId: number,
    paginationQueryParams: GetPaginatedRidersEnteredInRaceParams) => (
    apiGetPaginated<ApiRider.Summary, Rider.Summary>(
        `api/races/${raceId}/riders`,
        {
            ...paginationQueryParams,
            raceId,
        } as any,
        m => m,
    )
);

export const getIdOfAllRidersEnteredInRace = (raceId: number) => (
    apiGetList<number, number>(
        `api/races/${raceId}/rider-ids`,
        m => m,
    )
);

export const enterRiderIntoRace = (raceId: number, riderId: number) => (
    apiPost(
        `api/races/${raceId}/riders/${riderId}`,
    )
);

export const withdrawRiderFromRace = (raceId: number, riderId: number) => (
    apiDelete(
        `api/races/${raceId}/riders/${riderId}`,
    )
);