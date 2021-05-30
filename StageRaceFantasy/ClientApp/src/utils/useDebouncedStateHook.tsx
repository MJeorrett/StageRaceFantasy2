import { useEffect, useState } from 'react';

export const useDebouncedState = <T,>(initialState: T, wait: number = 500) => {
    const [timeoutState, setTimeoutState] = useState<NodeJS.Timeout>();
    const [instantState, setInstantState] = useState<T>(initialState);
    const [debouncedState, setDebouncedState] = useState<T>(initialState);

    const setState = (newValue: T) => {
        setInstantState(newValue);

        timeoutState && clearTimeout(timeoutState);

        setTimeoutState(setTimeout(() => {
            setDebouncedState(newValue);
        }, wait));
    };

    const instantReset = () => {
        setInstantState(initialState);
        setDebouncedState(initialState);
    };

    useEffect(() => () => {
        timeoutState && clearTimeout(timeoutState);
    }, []);

    return {
        instantState,
        debouncedState,
        setState,
        instantReset,
    };
};