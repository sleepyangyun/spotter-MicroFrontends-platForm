import Model from '@app/store/infra/Model';
import WithPaginationUpdateFnModel from '@app/store/infra/WithPaginationUpdateFnModel';
import WithPrimaryUpdateFnModel from '@app/store/infra/WithPrimaryUpdateFnModel';
import { types } from 'mobx-state-tree';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { lightningDealSdk } from '@client/app/services/v2/marketing/lightningDeal';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';

const LightningDealStore = Model({
    name: 'LightningDealStore',
    properties: {
        lightningDealPage: WithPaginationUpdateFnModel(
            types.frozen<ApiReturnType<typeof lightningDealSdk.findLightningDealPage>>(),
        ).model,
        lightningDealOperationRecordPage: WithPaginationUpdateFnModel(
            types.frozen<
                ApiReturnType<typeof lightningDealSdk.findLightningDealOperationRecordPage>
            >(),
        ).model,
        lightningDealDetail: WithPrimaryUpdateFnModel(
            {} as ApiReturnType<typeof lightningDealSdk.findLightningDealById>,
        ).model,
    },
    overridesInitWatcher: {
        _export: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    const getLightningDealDetail = autoContextFlow(
        'lightningDealDetail',
        async (...args: Parameters<typeof lightningDealSdk.findLightningDealById>) => {
            const { data: response } = await lightningDealSdk.findLightningDealById(...args);
            return response;
        },
    );

    const getLightningDealOperationRecordPage = autoContextFlow(
        'lightningDealOperationRecordPage',
        async (
            ...args: Parameters<typeof lightningDealSdk.findLightningDealOperationRecordPage>
        ) => {
            const { data: response } = await lightningDealSdk.findLightningDealOperationRecordPage(
                ...args,
            );
            return response;
        },
    );

    const getLightningDealPage = autoContextFlow(
        'lightningDealPage',
        async (...args: Parameters<typeof lightningDealSdk.findLightningDealPage>) => {
            const { data: response } = await lightningDealSdk.findLightningDealPage(...args);
            return response;
        },
    );

    const _export = autoContextFlow(
        '_export',
        async (...args: Parameters<typeof lightningDealSdk._export>) => {
            const { data: response } = await lightningDealSdk._export(...args);
            return response;
        },
    );

    return {
        getLightningDealDetail,
        getLightningDealOperationRecordPage,
        getLightningDealPage,
        _export,
    };
});

export default LightningDealStore;
