import { apiErrorToast } from '../../toast';
import { HttpClientResponse } from './httpClient';

const statusCodeIsOk = (statusCode: number) => {
    return statusCode >= 200 && statusCode <= 300;
};

export const doErrorToastIfRequired = (response: HttpClientResponse<unknown>): void => {
    if (response.isError) {
        apiErrorToast(response.message);
        return;
    }

    if (!statusCodeIsOk(response.statusCode)) {
        apiErrorToast(`Request failed with status ${response.statusCode}.`);
    }
};
