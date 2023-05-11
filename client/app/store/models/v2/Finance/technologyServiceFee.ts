import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { technologyServiceFeeSdk } from '@app/services/v2/finance';
import WithPrimaryUpdateFnModel from '@client/app/store/infra/WithPrimaryUpdateFnModel';
import WithPaginationUpdateFnModel from '@client/app/store/infra/WithPaginationUpdateFnModel';

const TechnologyServiceFeeStore = Model({
    name: 'TechnologyServiceFeeStore',
    properties: {
        settleList: WithPaginationUpdateFnModel<typeof technologyServiceFeeSdk.querySettle>().model,
        settleDetailByQuery: WithPrimaryUpdateFnModel<typeof technologyServiceFeeSdk.queryDetail>(
            {} as any,
        ).model,
        sskuByStatus: WithPrimaryUpdateFnModel<typeof technologyServiceFeeSdk.querySkuByStatus>(
            {} as any,
        ).model,
        settleDetailByCode: WithPrimaryUpdateFnModel<
            typeof technologyServiceFeeSdk.getSettleByCode
        >({} as any).model,
    },
    overridesInitWatcher: {
        createSettle: false,
        exportSettle: false,
        revokeSettle: false,
        changeSskuStatus: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    const createSettle = autoContextFlow(
        'createSettle',
        async (...args: Parameters<typeof technologyServiceFeeSdk.createSettle>) => {
            const { data: response } = await technologyServiceFeeSdk.createSettle(...args);
            return response;
        },
    );

    const exportSettle = autoContextFlow(
        'exportSettle',
        async (...args: Parameters<typeof technologyServiceFeeSdk.exportSettle>) => {
            const { data: response } = await technologyServiceFeeSdk.exportSettle(...args);
            return response;
        },
    );

    const revokeSettle = autoContextFlow(
        'revokeSettle',
        async (...args: Parameters<typeof technologyServiceFeeSdk.revokeSettle>) => {
            const { data: response } = await technologyServiceFeeSdk.revokeSettle(...args);
            return response;
        },
    );

    const getSettleList = autoContextFlow(
        'settleList',
        async (...args: Parameters<typeof technologyServiceFeeSdk.querySettle>) => {
            const { data: response } = await technologyServiceFeeSdk.querySettle(...args);
            return response;
        },
    );

    const getSettleDetailByCode = autoContextFlow(
        'settleDetailByCode',
        async (...args: Parameters<typeof technologyServiceFeeSdk.getSettleByCode>) => {
            const { data: response } = await technologyServiceFeeSdk.getSettleByCode(...args);
            return response;
        },
    );

    const getDetailByQuery = autoContextFlow(
        'settleDetailByQuery',
        async (...args: Parameters<typeof technologyServiceFeeSdk.queryDetail>) => {
            const { data: response } = await technologyServiceFeeSdk.queryDetail(...args);
            return response;
        },
    );

    const getSskuByStatus = autoContextFlow(
        'sskuByStatusList',
        async (...args: Parameters<typeof technologyServiceFeeSdk.querySkuByStatus>) => {
            const { data: response } = await technologyServiceFeeSdk.querySkuByStatus(...args);
            return response;
        },
    );

    const changeSskuStatus = autoContextFlow(
        'changeSkuStatus',
        async (...args: Parameters<typeof technologyServiceFeeSdk.changeSkuStatus>) => {
            const { data: response } = await technologyServiceFeeSdk.changeSkuStatus(...args);
            return response;
        },
    );

    return {
        createSettle,
        exportSettle,
        revokeSettle,
        getSettleDetailByCode,
        getSskuByStatus,
        getSettleList,
        getDetailByQuery,
        changeSskuStatus,
    };
});

export default TechnologyServiceFeeStore;
