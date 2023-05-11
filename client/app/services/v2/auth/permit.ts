import { getAppBootData } from '@spotter/utils';
import { SpotterPermitApiSdk } from '@spotter/gmesh-api-sdk';
import { message } from 'antd';

export const permitSdk = new SpotterPermitApiSdk({
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
