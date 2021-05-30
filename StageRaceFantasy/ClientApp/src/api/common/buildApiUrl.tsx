import config from '../../config';

export type BuildApiUrlQueryParams = {
    [key: string]: string,
}

export const buildApiUrl = (
    path: string,
    queryParams?: BuildApiUrlQueryParams,
): string => {
    let _path = path;

    if (queryParams) {
        const queryParamUrl = Object.keys(queryParams)
            .map(paramName => `${paramName}=${queryParams[paramName]}`)
            .join('&');

        _path += `?${queryParamUrl}`;
    }

    return `${config.apiBaseUrl}/${_path}`;
};
