import { SpotterSupportCertificationApiSdk } from '@spotter/gmesh-api-sdk';
import { message } from 'antd';
import { getAppBootData } from '@spotter/utils';

export enum CertificationTicketStatus {
    WAIT_PROCESSING = 0,
    IN_PROCESSING,
    FAIL,
    SUCCESS,
    DISCONTINUED,
}

export const supportCertificationSdk = new SpotterSupportCertificationApiSdk({
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
