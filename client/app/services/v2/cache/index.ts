import { getAppBootData } from '@spotter/utils';
import { SpotterCacheApiSdk } from '@spotter/gmesh-api-sdk';
import { message } from 'antd';

export const cacheSdk = new SpotterCacheApiSdk({
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
