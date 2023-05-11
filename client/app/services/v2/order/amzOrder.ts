import { SpotterAmzOrderGmeshApiSdk } from '@spotter/gmesh-api-sdk';
import { message } from 'antd';
import { getAppBootData } from '@spotter/utils';

export const amzOrderSdk = new SpotterAmzOrderGmeshApiSdk({
    context: new URL(getAppBootData('app').apiUrl),
    res: {
        onAuthError: (error) => {
            console.error(error.data);
            window.location.assign('/login');
        },
        onOtherError: (error) => {
            console.log(error);
            message.error(error.data.msg);
        },
    },
});
