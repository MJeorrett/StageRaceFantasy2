import { useCallback } from 'react';
import { ApiPaginationQueryParams, getPaginatedRiders } from '../api';
import { useDebouncedState } from '../utils/useDebouncedStateHook';

export const useGetPaginatedRiders = (
    getPaginatedRidersRequest: typeof getPaginatedRiders = getPaginatedRiders,
    wait: number = 500) => {
    const {
        instantState: nameFilterValue,
        debouncedState: nameFilterDebounced,
        setState: setNameFilter,
        instantReset: clearNameFilter,
    } = useDebouncedState('', wait);

    const getRidersRequest = useCallback((queryParams: ApiPaginationQueryParams) =>
        getPaginatedRidersRequest({
            ...queryParams,
            nameFilter: nameFilterDebounced
        }), [nameFilterDebounced]);

    return {
        getRidersRequest,
        nameFilterValue,
        setNameFilter,
        clearNameFilter
    };
};