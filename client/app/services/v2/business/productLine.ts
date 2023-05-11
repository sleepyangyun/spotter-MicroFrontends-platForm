import { SpotterProductLineApiSdk } from '@spotter/gmesh-api-sdk';
import { message } from 'antd';
import { getAppBootData } from '@spotter/utils';

export const businessProductLineSdk = new SpotterProductLineApiSdk({
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
