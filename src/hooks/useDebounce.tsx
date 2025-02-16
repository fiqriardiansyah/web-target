/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";

export function useDebounce(value?: string, delay = 500, action = (_val?: string) => { }) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
            action(value); // Execute action with the debounced value
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay, action]);

    return debouncedValue;
}
