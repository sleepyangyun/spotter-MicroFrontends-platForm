import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import Model from '@app/store/infra/Model';
import { reportSettingSdk } from '@app/services/v2/report/setting';
import WithPaginationUpdateFnModel from '@client/app/store/infra/WithPaginationUpdateFnModel';
import WithPrimaryUpdateFnModel from '@client/app/store/infra/WithPrimaryUpdateFnModel';

const ReportStore = Model({
    name: 'ReportStore',
    properties: {
        realtimeConfigurationList:
            WithPaginationUpdateFnModel<typeof reportSettingSdk.selectRealtimeSalesList>().model,
        configuredProductCount:
            WithPrimaryUpdateFnModel<typeof reportSettingSdk.getCompaniesAllCount>(0).model,
    },
    overridesInitWatcher: {
        updateRealtimeConfiguration: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    const getRealtimeConfigurationList = autoContextFlow(
        'realtimeConfigurationList',
        async (...args: Parameters<typeof reportSettingSdk.selectRealtimeSalesList>) => {
            const { data: response } = await reportSettingSdk.selectRealtimeSalesList(...args);
            return response;
        },
    );
    const updateRealtimeConfiguration = autoContextFlow(
        'updateRealtimeConfiguration',
        async (...args: Parameters<typeof reportSettingSdk.updateRealtimeSalesCount>) => {
            const { data: response } = await reportSettingSdk.updateRealtimeSalesCount(...args);
            return response;
        },
    );

    const getConfiguredProductCount = autoContextFlow(
        'configuredProductCount',
        async (...args: Parameters<typeof reportSettingSdk.getCompaniesAllCount>) => {
            const { data: response } = await reportSettingSdk.getCompaniesAllCount(...args);
            return response;
        },
    );

    return {
        getRealtimeConfigurationList,
        updateRealtimeConfiguration,
        getConfiguredProductCount,
    };
});

export default ReportStore;
