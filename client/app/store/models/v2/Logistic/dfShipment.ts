import Model from '@app/store/infra/Model';
import { deepTrim, generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import WithPrimaryUpdateFnModel from '@client/app/store/infra/WithPrimaryUpdateFnModel';
import { amzLogisticsSdk } from '@client/app/services/v2/logistics/amzLogistics';
import { downloadFileFromUrl } from '@spotter/utils';
import { message } from 'antd';
import { DfShipmentDetailModal } from './model';

export const DfShipmentStore = Model({
    name: 'DfShipmentStore',
    properties: {
        dfDetail: WithPrimaryUpdateFnModel(<DfShipmentDetailModal>{}).model,
    },
    overridesInitWatcher: {
        dfList: false,
        shippingLabelMark: false,
        exportDfListMark: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    return {
        /** DF物流详情 */
        getDfDetail: autoContextFlow(
            'dfDetail',
            async (...[req, ...args]: Parameters<typeof amzLogisticsSdk.getDetails>) => {
                const { data: response } = await amzLogisticsSdk.getDetails(deepTrim(req), ...args);
                return response;
            },
        ),
        /** DF物流列表 */
        getDfList: autoContextFlow(
            'dfList',
            async (...[req, ...args]: Parameters<typeof amzLogisticsSdk.getShipmentList>) => {
                const { data: response } = await amzLogisticsSdk.getShipmentList(
                    deepTrim(req),
                    ...args,
                );
                return response;
            },
        ),
        /** 下载df shipping label */
        getShippingLabel: autoContextFlow(
            'shippingLabelMark',
            async (...[req, ...args]: Parameters<typeof amzLogisticsSdk.getShippingLabel>) => {
                const { data: response } = await amzLogisticsSdk.getShippingLabel(
                    deepTrim(req),
                    ...args,
                );
                if (response.data) {
                    downloadFileFromUrl(response.data);
                    message.success('下载成功');
                } else if (response.code === 200 && !response.data) {
                    message.error(response.msg);
                }
                return response;
            },
        ),
        /** 导出dfList */
        exportDfList: autoContextFlow(
            'exportDfListMark',
            async (...[req, ...args]: Parameters<typeof amzLogisticsSdk.exportDfShipment>) => {
                const { data: response } = await amzLogisticsSdk.exportDfShipment(
                    deepTrim(req),
                    ...args,
                );
                if (response.data) {
                    downloadFileFromUrl(response.data);
                    message.success('下载成功');
                } else if (response.code === 200 && !response.data) {
                    message.error(response.msg);
                }
                return response;
            },
        ),
    };
});
