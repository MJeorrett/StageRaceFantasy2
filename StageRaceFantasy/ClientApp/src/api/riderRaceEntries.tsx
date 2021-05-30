import { apiDelete, apiGetList, apiPost } from './common/apiClient';

export const getAllEnteredRiderIdsForRace = (fantasyRaceId: number) => (
    apiGetList<number, number>(
        `api/fantasy-races/${fantasyRaceId}/rider-entries`,
        m => m,
    )
);

export const enterRiderIntoRace = (fantasyRaceId: number, riderId: number) => (
    apiPost(
        `api/fantasy-races/${fantasyRaceId}/rider-entries/${riderId}`,
    )
);

export const withdrawRiderFromRace = (fantasyRaceId: number, riderId: number) => (
    apiDelete(
        `api/fantasy-races/${fantasyRaceId}/rider-entries/${riderId}`,
    )
);