import { getAppBootData } from '@spotter/utils';
import {
    SpotterVendorApiSdk,
    SpotterVendorCategoryApiSdk,
    SpotterCategoryApiSdk,
    SpotterAccountApiSdk,
} from '@spotter/gmesh-api-sdk';
import { message } from 'antd';

// export enum ProductPackagingCertification {
//     PENDING_CERTIFICATION = 0,
//     UNDER_REVIEW,
//     CERTIFIED,
// }
export const spotterVendorSdk = new SpotterVendorApiSdk({
    context: new URL(getAppBootData('app').apiUrl),
    // context: new URL('gmesh-web','http://api-test-account.spotterio.com/'),
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
export const spotterVendorCategorySdk = new SpotterVendorCategoryApiSdk({
    context: new URL(getAppBootData('app').apiUrl),
    // context: new URL('gmesh-web','http://api-test-account.spotterio.com/'),
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

export const spotterCategorySdk = new SpotterCategoryApiSdk({
    context: new URL(getAppBootData('app').apiUrl),
    // context: new URL('gmesh-web','http://api-test-account.spotterio.com/'),
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

export const spotterAccountSdk = new SpotterAccountApiSdk({
    context: new URL(getAppBootData('app').apiUrl),
    // context: new URL('gmesh-web','http://api-test-account.spotterio.com/'),
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
