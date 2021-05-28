import config from '../../../config';
import { ApiPaginationQueryParams } from './models';

export const buildApiUrl = (path: string): string => `${config.apiBaseUrl}/${path}`;

export const buildApiUrlWithQueryParams = (
    path: string,
    { pageNumber, pageSize }: ApiPaginationQueryParams,
) => {
    const queryParameters = [
        `pageNumber=${pageNumber}`,
        `pageSize=${pageSize}`
    ];

    return buildApiUrl(`${path}?${queryParameters.join('&')}`);
};
