import Axios, { AxiosError } from 'axios';
import authService from '../../components/api-authorization/AuthorizeService';

export interface HttpClientSuccessResponse<T> {
    isError: false,
    statusCode: number,
    body: T,
}

export interface HttpClientFailureResponse {
    isError: true,
    statusCode?: number,
    message: string,
}

export type HttpClientResponse<T> = HttpClientSuccessResponse<T> | HttpClientFailureResponse;

function isAxiosError(error: unknown): error is AxiosError {
    return (error as AxiosError).isAxiosError !== undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleError<T>(url: string, error: any): HttpClientResponse<T> {
    if (isAxiosError(error)) {
        if (error.response) {
            const message = `Request to ${url} failed with status ${error.response.status}.`;
            console.error(message);
            console.error('Error details:', error.response.data);
            return {
                isError: true,
                statusCode: error.response.status,
                message,
            };
        } else if (error.request) {
            const message = `Request to ${url} failed, no response received.`;
            console.error(message);
            console.error('Request:', error.request);
            return {
                isError: true,
                message,
            };
        } else {
            const message = `Request failed with unknown error: ${error.message}`;
            console.error(message);
            return {
                isError: true,
                message,
            };
        }
    }
    console.error(`Unknown error occurred making request to ${url}.`);
    console.error('Error config: ', error.config);
    throw error;
}

const buildDefaultHeaders = async () => {
    // placeholder this is where we would add e.g. auth token.
    const token = await authService.getAccessToken();
    const headers = {
        'Authorization': token ? `Bearer ${token}` : undefined,
    };

    return headers;
};

export async function httpGet<TResponse>(url: string): Promise<HttpClientResponse<TResponse>> {
    try {
        const response = await Axios.get(url,
            {
                headers: await buildDefaultHeaders(),
            });

        const responseData = response.data as TResponse;

        return {
            isError: false,
            statusCode: response.status,
            body: responseData,
        };
    }
    catch (error) {
        return handleError<TResponse>(url, error);
    }
}
export async function httpPost<TResponse>(url: string, payload?: unknown): Promise<HttpClientResponse<TResponse>> {
    try {

        const response = await Axios.post(url, payload,
            {
                headers: await buildDefaultHeaders(),
            });

        const responseData = response.data as TResponse;

        return {
            isError: false,
            statusCode: response.status,
            body: responseData,
        };
    }
    catch (error) {
        return handleError<TResponse>(url, error);
    }
}

export async function httpPut<TResponse>(url: string, payload?: unknown): Promise<HttpClientResponse<TResponse>> {
    try {

        const response = await Axios.put(url, payload,
            {
                headers: await buildDefaultHeaders(),
            });

        const responseData = response.data as TResponse;

        return {
            isError: false,
            statusCode: response.status,
            body: responseData,
        };
    }
    catch (error) {
        return handleError<TResponse>(url, error);
    }
}

export async function httpPatch<TResponse>(url: string, payload?: unknown): Promise<HttpClientResponse<TResponse>> {
    try {

        const response = await Axios.patch(url, payload,
            {
                headers: await buildDefaultHeaders(),
            });

        const responseData = response.data as TResponse;

        return {
            isError: false,
            statusCode: response.status,
            body: responseData,
        };
    }
    catch (error) {
        return handleError<TResponse>(url, error);
    }
}

export async function httpDelete<TResponse>(url: string): Promise<HttpClientResponse<TResponse>> {
    try {

        const response = await Axios.delete(url,
            {
                headers: await buildDefaultHeaders(),
            });

        const responseData = response.data as TResponse;

        return {
            isError: false,
            statusCode: response.status,
            body: responseData,
        };
    }
    catch (error) {
        return handleError<TResponse>(url, error);
    }
}