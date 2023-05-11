import { getAppBootData } from '@spotter/utils';
import { SpotterUserApiSdk, SpotterGmeshUserApiSdk } from '@spotter/gmesh-api-sdk';

export const userSdk = new SpotterUserApiSdk({
    context: new URL(getAppBootData('app').apiUrl),
    res: {
        onAuthError: (error) => {
            console.error(error.data);
        },
        onOtherError: (error) => {
            console.log(error);
        },
    },
});

export const userV2Sdk = new SpotterGmeshUserApiSdk({
    context: new URL(getAppBootData('app').apiUrl),
    res: {
        onAuthError: (error) => {
            console.error(error.data);
        },
        onOtherError: (error) => {
            console.log(error);
        },
    },
});
