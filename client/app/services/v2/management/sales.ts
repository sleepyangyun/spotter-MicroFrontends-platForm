import {
    SpotterSaleManagementTargetApiSdk,
    SpotterSaleManagementBrandApiSdk,
    SpotterSaleManagementCompanyApiSdk,
    SpotterSaleManagementLineApiSdk,
} from '@spotter/gmesh-api-sdk';
import { getAppBootData } from '@spotter/utils';
import { message } from 'antd';

export const saleManagementTargetApiSdk = new SpotterSaleManagementTargetApiSdk({
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

export const saleManagementBrandApiSdk = new SpotterSaleManagementBrandApiSdk({
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

export const saleManagementCompanyApiSdk = new SpotterSaleManagementCompanyApiSdk({
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

export const saleManagementLineApiSdk = new SpotterSaleManagementLineApiSdk({
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
