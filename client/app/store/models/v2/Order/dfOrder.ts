// TODO df all api
import Model from '@app/store/infra/Model';
import WithPrimaryUpdateFnModel from '@app/store/infra/WithPrimaryUpdateFnModel';
import { deepTrim, generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { dfOrderSdk, dfOrderSdk1 } from '@client/app/services/v2/order/dfOrder';
import { downloadFileFromUrl } from '@spotter/utils';
import { message } from 'antd';
import { DfExceptionOrderModel, OrderDfOrderAmzDfItemVOModel } from './model';

export const DfOrderStore = Model({
    name: 'DfOrderStore',
    properties: {
        getOrderListRes: WithPrimaryUpdateFnModel(<OrderDfOrderAmzDfItemVOModel>{}).model,
        listDfOrderRes: WithPrimaryUpdateFnModel(<DfExceptionOrderModel>{}).model,
        dfOrderListExportMark: WithPrimaryUpdateFnModel(<{ data: string }>{}).model,
    },
    overridesInitWatcher: {
        cancelMark: false,
        confirmOrderAmzDfMark: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    return {
        /** df提交 */
        confirmOrderAmzDf: autoContextFlow(
            'confirmOrderAmzDfMark',
            async (...[req, ...args]: Parameters<typeof dfOrderSdk.confirmOrderAmzDf>) => {
                const { data: response } = await dfOrderSdk.confirmOrderAmzDf(
                    deepTrim(req),
                    ...args,
                );
                return response;
            },
        ),
        /** DF取消 */
        cancelOrderAmzDf: autoContextFlow(
            'cancelMark',
            async (...[req, ...args]: Parameters<typeof dfOrderSdk.cancelOrderAmzDf>) => {
                const { data: response } = await dfOrderSdk.cancelOrderAmzDf(
                    deepTrim(req),
                    ...args,
                );
                return response;
            },
        ),
        /** DF导出 */
        dfOrderListExport: autoContextFlow(
            'dfOrderListExportMark',
            async (...[req, ...args]: Parameters<typeof dfOrderSdk1.exportDfOrder>) => {
                const { data: response } = await dfOrderSdk1.exportDfOrder(deepTrim(req), ...args);
                if (response.data) {
                    downloadFileFromUrl(response.data);
                    message.success('操作成功');
                } else if (response.code === 200 && !response.data) {
                    message.error(response.msg);
                }
                return response;
            },
        ),
        /** 异常订单List */
        listDfOrder: autoContextFlow(
            'listDfOrderRes',
            async (...[req, ...args]: Parameters<typeof dfOrderSdk.listDfOrder>) => {
                const { data: response } = await dfOrderSdk.listDfOrder(deepTrim(req), ...args);
                return response;
            },
        ),
        /** 已确认订单List */
        getOrderList: autoContextFlow(
            'getOrderListRes',
            async (...[req, ...args]: Parameters<typeof dfOrderSdk1.pageDfOrder>) => {
                const { data: response } = await dfOrderSdk1.pageDfOrder(deepTrim(req), ...args);
                return response;
            },
        ),
    };
});
