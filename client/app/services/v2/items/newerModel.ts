import { SpotterCatalogTicketNewermodelApiSdk } from '@spotter/gmesh-api-sdk';
import { message } from 'antd';
import { getAppBootData } from '@spotter/utils';

export enum NewerModelStatus {
    PENDING = 1,
    AMAZON_REVIEW,
    SUCCESS,
    FAIL,
}
export const newerModelSdk = new SpotterCatalogTicketNewermodelApiSdk({
    context: new URL(getAppBootData('app').apiUrl),
    res: {
        onAuthError: (error) => {
            console.error(error);
            window.location.assign('/login');
        },
        onOtherError: (error) => {
            message.error(error.data.msg);
            console.error(error);
        },
    },
});
