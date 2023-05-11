import { message } from 'antd';
import { getAppBootData } from '@spotter/utils';
import { SpotterTicketVideoServiceApiSdk } from '@spotter/gmesh-api-sdk';

export const videoSdk = new SpotterTicketVideoServiceApiSdk({
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
