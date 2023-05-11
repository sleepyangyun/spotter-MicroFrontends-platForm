import { SpotterCatalogTicketVariationApiSdk } from '@spotter/gmesh-api-sdk';
import { message } from 'antd';
import { getAppBootData } from '@spotter/utils';

export enum VariationStatus {
    PENDING = 1,
    AMAZON_REVIEW,
    SUCCESS,
    FAIL,
}
export const variationSdk = new SpotterCatalogTicketVariationApiSdk({
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
