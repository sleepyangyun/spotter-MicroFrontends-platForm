import Model from '@app/store/infra/Model';
import WithPaginationUpdateFnModel from '@client/app/store/infra/WithPaginationUpdateFnModel';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';
import { types } from 'mobx-state-tree';
import { bboOrderSDK, bboOrderCommonSDK } from '@client/app/services/v2/order/bboOrder';
import { deepTrim, generateAutoContextFlowWithSelf } from '@app/store/infra/utils';

const BBOOrderStore = Model({
    name: 'BBOOrderStore',
    properties: {
        orderList: WithPaginationUpdateFnModel(
            types.frozen<ApiReturnType<typeof bboOrderSDK.pageBboOrder>>(),
        ).model,
    },
    overridesInitWatcher: {
        syncOrerBbo: false,
        updateBBOInnerPackBatch: false,
        updateInnerPack: false,
        confirmBbo: false,
        bboStatistics: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    const getOrderList = autoContextFlow(
        'orderList',
        async (...args: Parameters<typeof bboOrderSDK.pageBboOrder>) => {
            const { data: response } = await bboOrderSDK.pageBboOrder(deepTrim(...args));
            return response;
        },
    );

    const postSyncOrderBbo = autoContextFlow(
        'syncOrerBbo',
        async (...args: Parameters<typeof bboOrderSDK.syncOrderBbo>) => {
            const { data: response } = await bboOrderSDK.syncOrderBbo(deepTrim(...args));
            return response;
        },
    );
    const updateBBOInnerPackBatch = autoContextFlow(
        'updateBBOInnerPackBatch',
        async (...args: Parameters<typeof bboOrderSDK.updateBboInnerPack>) => {
            const { data: response } = await bboOrderSDK.updateBboInnerPack(deepTrim(...args));
            return response;
        },
    );

    const updateInnerPack = autoContextFlow(
        'updateInnerPack',
        async (...args: Parameters<typeof bboOrderSDK.updateInnerPack>) => {
            const { data: response } = await bboOrderSDK.updateInnerPack(deepTrim(...args));
            return response;
        },
    );

    const updateConfirmBbo = autoContextFlow(
        'confirmBbo',
        async (...args: Parameters<typeof bboOrderCommonSDK.confirmBbo>) => {
            const { data: response } = await bboOrderCommonSDK.confirmBbo(deepTrim(...args));
            return response;
        },
    );

    const getBboStatistics = autoContextFlow(
        'bboStatistics',
        async (...args: Parameters<typeof bboOrderCommonSDK.bboStatistics>) => {
            const { data: response } = await bboOrderCommonSDK.bboStatistics(deepTrim(...args));
            return response;
        },
    );

    return {
        getOrderList,
        postSyncOrderBbo,
        updateBBOInnerPackBatch,
        updateInnerPack,
        updateConfirmBbo,
        getBboStatistics,
    };
});

export default BBOOrderStore;
