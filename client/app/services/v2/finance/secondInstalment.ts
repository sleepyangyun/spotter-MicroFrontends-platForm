import { isEmpty } from 'lodash';
import { getAppBootData } from '@spotter/utils';
import { SpotterSecondPaymentApiSdk } from '@spotter/gmesh-api-sdk';
import { message, Modal } from 'antd';
import { SPT_STATUS_CODE } from '@client/app/utils/const';

export const secondInstalmentSdk = new SpotterSecondPaymentApiSdk({
    context: new URL(getAppBootData('app').apiUrl),
    res: {
        onAuthError: (error) => {
            console.error(error.data);
            window.location.assign('/login');
        },
        onOtherError: (error) => {
            if (isEmpty(error)) {
                console.log('取消请求');
                return;
            }
            if (error.data?.code === SPT_STATUS_CODE.concurrent) {
                Modal.error({
                    title: '当前有财务正在生成其它二期款，本预览单已失效',
                    onOk: () => window.location.replace('/finance/second-instalment'),
                });
            } else {
                message.error(error.data?.msg);
            }
        },
    },
});
