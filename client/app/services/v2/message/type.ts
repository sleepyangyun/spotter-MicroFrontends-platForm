import { message } from 'antd';
import { SpotterMessageTypeApiSdk } from '@spotter/gmesh-api-sdk';
import { getAppBootData } from '@spotter/utils';

export const messageTypeSdk = new SpotterMessageTypeApiSdk({
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
