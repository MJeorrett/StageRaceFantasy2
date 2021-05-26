import { format } from 'date-fns';

export const formatDateString = (date: Date): string => {
    return format(date, 'do MMM yyyy');
};