import { getAppBootData } from '@spotter/utils';
import { SpotterValidateApiSdk } from '@spotter/gmesh-api-sdk';

export const validateSdk = new SpotterValidateApiSdk({
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
