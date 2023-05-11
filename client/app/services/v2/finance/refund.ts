import {
    SpotterAccountPaymentApiSdk,
    SpotterAmazonReturnApiSdk,
    SpotterAmazonShortageMissedApiSdk,
} from '@spotter/gmesh-api-sdk';
import { message } from 'antd';
import { getAppBootData } from '@spotter/utils';

export const SpotterAccountPaymentSdk = new SpotterAccountPaymentApiSdk({
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

export const SpotterAmazonReturnSdk = new SpotterAmazonReturnApiSdk({
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

export const SpotterAmazonShortageMissedSdk = new SpotterAmazonShortageMissedApiSdk({
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
