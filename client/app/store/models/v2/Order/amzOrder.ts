import Model from '@app/store/infra/Model';
import WithPrimaryUpdateFnModel from '@app/store/infra/WithPrimaryUpdateFnModel';
import WithPaginationUpdateFnModel from '@app/store/infra/WithPaginationUpdateFnModel';
import { types } from 'mobx-state-tree';
import { deepTrim, generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { amzOrderSdk } from '@client/app/services/v2/order/amzOrder';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';
import { AmzOrderPoAmzOrderStatisticsVOModel } from './model/amzOrderModel';

const AmzOrderStore = Model({
    name: 'AmzOrderStore',
    properties: {
        orderList: WithPaginationUpdateFnModel(
            types.frozen<ApiReturnType<typeof amzOrderSdk.pageOrder>>(),
        ).model,
        orderStatistics: WithPrimaryUpdateFnModel(<AmzOrderPoAmzOrderStatisticsVOModel>{}).model,
    },
    overridesInitWatcher: {
        initShipment: false,
        confirmOrder: false,
        updateInnerPack: false,
        exportExcel: false,
        updateFrd: false,
        editStorage: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);
    const getOrderList = autoContextFlow(
        'orderList',
        async (...args: Parameters<typeof amzOrderSdk.pageOrder>) => {
            const { data: response } = await amzOrderSdk.pageOrder(deepTrim(...args));
            return response;
        },
    );

    const getOrderStatistics = autoContextFlow(
        'orderStatistics',
        async (...args: Parameters<typeof amzOrderSdk.getStatistics>) => {
            const { data: response } = await amzOrderSdk.getStatistics(deepTrim(...args));
            return response;
        },
    );

    const initShipment = autoContextFlow(
        'initShipment',
        async (...args: Parameters<typeof amzOrderSdk.initShipment>) => {
            const { data: response } = await amzOrderSdk.initShipment(deepTrim(...args));
            return response;
        },
    );

    const confirmOrder = autoContextFlow(
        'confirmOrder',
        async (...args: Parameters<typeof amzOrderSdk.confirmOrder>) => {
            const { data: response } = await amzOrderSdk.confirmOrder(deepTrim(...args));
            return response;
        },
    );

    const updateInnerPack = autoContextFlow(
        'updateInnerPack',
        async (...args: Parameters<typeof amzOrderSdk.updateInnerPack>) => {
            const { data: response } = await amzOrderSdk.updateInnerPack(...args);
            return response;
        },
    );

    const exportExcel = autoContextFlow(
        'exportExcel',
        async (...args: Parameters<typeof amzOrderSdk._export>) => {
            const { data: response } = await amzOrderSdk._export(...args);
            return response;
        },
    );

    const updateFrd = autoContextFlow(
        'updateFrd',
        async (...args: Parameters<typeof amzOrderSdk.updateFrd>) => {
            const { data: response } = await amzOrderSdk.updateFrd(...args);
            return response;
        },
    );

    const editStorage = autoContextFlow(
        'editStorage',
        async (...args: Parameters<typeof amzOrderSdk.editStorage>) => {
            const { data: response } = await amzOrderSdk.editStorage(...args);
            return response;
        },
    );

    return {
        getOrderList,
        getOrderStatistics,
        initShipment,
        confirmOrder,
        updateInnerPack,
        exportExcel,
        updateFrd,
        editStorage,
    };
});

export default AmzOrderStore;
