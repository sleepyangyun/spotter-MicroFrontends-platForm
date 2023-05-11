import { SpotterSpotterInvoiceApiSdk } from '@spotter/gmesh-api-sdk';
import { getAppBootData } from '@spotter/utils';
import { message } from 'antd';

export const spotterInvoiceSdk = new SpotterSpotterInvoiceApiSdk({
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
