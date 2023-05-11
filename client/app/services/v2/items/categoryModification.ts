import { message } from 'antd';

import { getAppBootData } from '@spotter/utils';
import { SpotterGmeshListingCategoryApiSdk } from '@spotter/gmesh-api-sdk';

export const categoryModificationSdk = new SpotterGmeshListingCategoryApiSdk({
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
