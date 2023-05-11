import { getAppBootData } from '@spotter/utils';
import { SpotterRoleApiSdk, SpotterGmeshRolesApiSdk } from '@spotter/gmesh-api-sdk';
import { message } from 'antd';

export const roleSdk = new SpotterRoleApiSdk({
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

export const roleV2Sdk = new SpotterGmeshRolesApiSdk({
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
