import { getAppBootData } from '@spotter/utils';
import { SpotterWarehouseApiSdk } from '@spotter/gmesh-api-sdk';
import { message } from 'antd';

export const warehouseSdk = new SpotterWarehouseApiSdk({
    context: new URL(getAppBootData('app').apiUrl),
    // context: new URL('', 'http://127.0.0.1:4523/m1/662116-0-default'),
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
