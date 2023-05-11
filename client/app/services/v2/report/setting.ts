import { getAppBootData } from '@spotter/utils';
import { SpotterReportSettingsApiSdk } from '@spotter/gmesh-api-sdk';
import { message } from 'antd';

export const reportSettingSdk = new SpotterReportSettingsApiSdk({
    context: new URL(getAppBootData('app').apiUrl),
    // context: new URL('', 'http://api-test-wms.spotterio.com/gmesh-web'),
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
