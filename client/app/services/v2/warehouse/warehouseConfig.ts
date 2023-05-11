import { SpotterStorageApiSdk } from '@spotter/gmesh-api-sdk';
import { message } from 'antd';
import { getAppBootData } from '@spotter/utils';

export const spotterOrderStorageSdk = new SpotterStorageApiSdk({
    context: new URL(getAppBootData('app').apiUrl),
    // context: new URL('gmesh-web', 'http://api-test-spt.spotterio.com'),
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
