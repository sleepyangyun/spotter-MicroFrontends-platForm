import { VendorCentralSdk } from '@app/services/v1/vendor-central/vendor-central.sdk';
import { message } from 'antd';
import { apiPrefixPathMap } from '@app/utils/const';

const SuccessStatusCodeMap = new Set([200, 201]);
export const vendorCentralSdk = new VendorCentralSdk({
    context: new URL(apiPrefixPathMap.amazonVc, window.location.href),
    res: {
        isSuccess(res) {
            return SuccessStatusCodeMap.has(res.status);
        },
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
