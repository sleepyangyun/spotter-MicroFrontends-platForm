import { getAppBootData } from '@spotter/utils';
import { SpotterOrgApiSdk } from '@spotter/gmesh-api-sdk';
import { message } from 'antd';

export const orgSdk = new SpotterOrgApiSdk({
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
