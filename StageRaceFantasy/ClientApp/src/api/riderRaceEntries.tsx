import { apiDelete, apiGetList, apiPost } from './common/apiClient';

export const getAllEnteredRiderIdsForRace = (raceId: number) => (
    apiGetList<number, number>(
        `api/races/${raceId}/rider-entries`,
        m => m,
    )
);

export const enterRiderIntoRace = (raceId: number, riderId: number) => (
    apiPost(
        `api/races/${raceId}/rider-entries/${riderId}`,
    )
);

export const withdrawRiderFromRace = (raceId: number, riderId: number) => (
    apiDelete(
        `api/races/${raceId}/rider-entries/${riderId}`,
    )
);