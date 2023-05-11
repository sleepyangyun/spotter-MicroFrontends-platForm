import { SpotterFinanceOtherApiSdk } from '@spotter/gmesh-api-sdk';
import { getAppBootData } from '@spotter/utils';
import { message } from 'antd';

export const otherFinanceSdk = new SpotterFinanceOtherApiSdk({
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
