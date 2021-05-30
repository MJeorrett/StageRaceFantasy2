import { useCallback, useState } from 'react';
import { debounce } from '@material-ui/core';

export const useDebouncedState = <T,>(initialState: T, wait: number = 500) => {
    const [instantState, setInstantState] = useState<T>(initialState);
    const [debouncedState, setDebouncedState] = useState<T>(initialState);
    const debouncedSetDebouncedState = useCallback(debounce(setDebouncedState, wait), []);

    const setState = (newValue: T) => {
        setInstantState(newValue);
        debouncedSetDebouncedState(newValue);
    };

    const instantReset = () => {
        setInstantState(initialState);
        setDebouncedState(initialState);
    };

    return {
        instantState,
        debouncedState,
        setState,
        instantReset,
    };
};