import { message } from 'antd';
import { SpotterOrderBtrApiSdk } from '@spotter/gmesh-api-sdk';
import { getAppBootData } from '@spotter/utils';

export const bornToRunOrderSdk = new SpotterOrderBtrApiSdk({
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
