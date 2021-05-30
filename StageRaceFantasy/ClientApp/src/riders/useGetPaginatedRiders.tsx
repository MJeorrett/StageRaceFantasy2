import { useCallback } from 'react';
import { ApiPaginationQueryParams, getPaginatedRiders } from '../api';
import { useDebouncedState } from '../utils/useDebouncedStateHook';

export const useGetPaginatedRiders = () => {
    const {
        instantState: nameFilterValue,
        debouncedState: nameFilterDebounced,
        setState: setNameFilter,
        instantReset: clearNameFilter,
    } = useDebouncedState('');
    
    const getRidersRequest = useCallback((queryParams: ApiPaginationQueryParams) =>
        getPaginatedRiders({
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