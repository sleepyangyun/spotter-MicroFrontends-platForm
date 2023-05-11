import WithPrimaryUpdateFnModel from '@app/store/infra/WithPrimaryUpdateFnModel';
import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { ApiReturnType, ApiPaginationReturnType } from '@spotter/gmesh-api-sdk';
import WithPaginationUpdateFnModel from '@client/app/store/infra/WithPaginationUpdateFnModel';
import { types } from 'mobx-state-tree';
import { financePenaltySdk } from '@app/services/v2/finance/penalty';

const PenaltyStore = Model({
    name: 'PenaltyStore',
    properties: {
        settleDetailByCode: WithPrimaryUpdateFnModel(
            <ApiReturnType<typeof financePenaltySdk.getSettleByCode>>{},
        ).model,
        previewSettleDetail: WithPrimaryUpdateFnModel(
            <ApiReturnType<typeof financePenaltySdk.previewSettle>>{},
        ).model,
        penaltyAsinList: WithPaginationUpdateFnModel(
            types.frozen<ApiPaginationReturnType<typeof financePenaltySdk.queryAsinFee>>(),
        ).model,
        penaltyDetailList: WithPaginationUpdateFnModel(
            types.frozen<ApiPaginationReturnType<typeof financePenaltySdk.queryFee>>(),
        ).model,
        penaltySettlePageList: WithPaginationUpdateFnModel(
            types.frozen<ApiPaginationReturnType<typeof financePenaltySdk.querySettle>>(),
        ).model,
        penaltySettleStatusDetail: WithPrimaryUpdateFnModel<
            typeof financePenaltySdk.querySettleStatus
        >({} as any).model,
        asinListOfAmzOrder: WithPrimaryUpdateFnModel<typeof financePenaltySdk.getAsin>([]).model,
    },
    overridesInitWatcher: {
        changeStatus: false,
        createSettle: false,
        exportSettle: false,
        revokeSettle: false,
        updateAsinBatch: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    const getAsinListOfAmzOrder = autoContextFlow(
        'asinListOfAmzOrder',
        async (...args: Parameters<typeof financePenaltySdk.getAsin>) => {
            const { data: response } = await financePenaltySdk.getAsin(...args);
            return response;
        },
    );

    const getSettleDetailByCode = autoContextFlow(
        'settleDetailByCode',
        async (...args: Parameters<typeof financePenaltySdk.getSettleByCode>) => {
            const { data: response } = await financePenaltySdk.getSettleByCode(...args);
            return response;
        },
    );

    const getPreviewSettleDetail = autoContextFlow(
        'previewSettleDetail',
        async (...args: Parameters<typeof financePenaltySdk.previewSettle>) => {
            const { data: response } = await financePenaltySdk.previewSettle(...args);
            return response;
        },
    );

    const getPenaltyAsinList = autoContextFlow(
        'penaltyAsinList',
        async (...args: Parameters<typeof financePenaltySdk.queryAsinFee>) => {
            const { data: response } = await financePenaltySdk.queryAsinFee(...args);
            return response;
        },
    );

    const getPenaltyDetailList = autoContextFlow(
        'penaltyDetailList',
        async (...args: Parameters<typeof financePenaltySdk.queryFee>) => {
            const { data: response } = await financePenaltySdk.queryFee(...args);
            return response;
        },
    );

    const getPenaltySettlePageList = autoContextFlow(
        'penaltySettlePageList',
        async (...args: Parameters<typeof financePenaltySdk.querySettle>) => {
            const { data: response } = await financePenaltySdk.querySettle(...args);
            return response;
        },
    );

    const getPenaltySettleStatusDetail = autoContextFlow(
        'penaltySettleStatusDetail',
        async (...args: Parameters<typeof financePenaltySdk.querySettleStatus>) => {
            const { data: response } = await financePenaltySdk.querySettleStatus(...args);
            return response;
        },
    );

    const changeStatus = autoContextFlow(
        'changeStatus',
        async (...args: Parameters<typeof financePenaltySdk.changeStatus>) => {
            const { data: response } = await financePenaltySdk.changeStatus(...args);
            return response;
        },
    );

    const createSettle = autoContextFlow(
        'createSettle',
        async (...args: Parameters<typeof financePenaltySdk.createSettle>) => {
            const { data: response } = await financePenaltySdk.createSettle(...args);
            return response;
        },
    );

    const exportSettle = autoContextFlow(
        'exportSettle',
        async (...args: Parameters<typeof financePenaltySdk.exportSettle>) => {
            const { data: response } = await financePenaltySdk.exportSettle(...args);
            return response;
        },
    );

    const revokeSettle = autoContextFlow(
        'revokeSettle',
        async (...args: Parameters<typeof financePenaltySdk.revokeSettle>) => {
            const { data: response } = await financePenaltySdk.revokeSettle(...args);
            return response;
        },
    );

    const updateAsinBatch = autoContextFlow(
        'updateAsinBatch',
        async (...args: Parameters<typeof financePenaltySdk.updateAsinBatch>) => {
            const { data: response } = await financePenaltySdk.updateAsinBatch(...args);
            return response;
        },
    );

    return {
        getSettleDetailByCode,
        getPreviewSettleDetail,
        getPenaltyAsinList,
        getPenaltyDetailList,
        getPenaltySettlePageList,
        getPenaltySettleStatusDetail,
        changeStatus,
        createSettle,
        exportSettle,
        revokeSettle,
        updateAsinBatch,
        getAsinListOfAmzOrder,
    };
});

export default PenaltyStore;
