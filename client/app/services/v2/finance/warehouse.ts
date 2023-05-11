import { getAppBootData } from '@spotter/utils';
import {
    SpotterFinanceWarehouseApiSdk,
    SpotterFinanceWarehouseVasFeePriceApiSdk,
} from '@spotter/gmesh-api-sdk';
import { message } from 'antd';

export const financeWarehouseSdk = new SpotterFinanceWarehouseApiSdk({
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

export const financeWarehouseVasFeePriceSdk = new SpotterFinanceWarehouseVasFeePriceApiSdk({
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
