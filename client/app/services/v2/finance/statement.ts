import { SpotterFinanceWarehouseReconciliationApiSdk } from '@spotter/gmesh-api-sdk';
import { getAppBootData } from '@spotter/utils';
import { message } from 'antd';

export const statementSdk = new SpotterFinanceWarehouseReconciliationApiSdk({
    context: new URL(getAppBootData('app').apiUrl),
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
