import { SpotterGmeshPromotionCodeApiSdk } from '@spotter/gmesh-api-sdk';
import { message } from 'antd';
import { getAppBootData } from '@spotter/utils';

export const promoCodeSdk = new SpotterGmeshPromotionCodeApiSdk({
    context: new URL(getAppBootData('app').apiUrl),
    res: {
        onAuthError: () => {
            window.location.assign('/login');
        },
        onOtherError: (error) => {
            error?.data?.msg && message.error(error.data.msg);
        },
    },
});
