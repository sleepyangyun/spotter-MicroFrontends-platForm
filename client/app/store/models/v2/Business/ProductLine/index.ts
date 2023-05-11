import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { businessProductLineSdk } from '@app/services/v2/business';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';
import WithPrimaryUpdateFnModel from '@client/app/store/infra/WithPrimaryUpdateFnModel';

const BusinessProductLineStore = Model({
    name: 'BusinessProductLineStore',
    properties: {
        productLineList: WithPrimaryUpdateFnModel<typeof businessProductLineSdk.companySearch>(
            <ApiReturnType<typeof businessProductLineSdk.companySearch>>[],
        ).model,
        productLineSales: WithPrimaryUpdateFnModel<
            typeof businessProductLineSdk.productLineSalesSearch
        >(<ApiReturnType<typeof businessProductLineSdk.productLineSalesSearch>>{}).model,
    },
    overridesInitWatcher: {},
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    const getProductLineList = autoContextFlow(
        'productLineList',
        async (...args: Parameters<typeof businessProductLineSdk.companySearch>) => {
            const { data: response } = await businessProductLineSdk.companySearch(...args);
            return response;
        },
    );

    const getProductLineSales = autoContextFlow(
        'productLineSales',
        async (...args: Parameters<typeof businessProductLineSdk.productLineSalesSearch>) => {
            const { data: response } = await businessProductLineSdk.productLineSalesSearch(...args);
            return response;
        },
    );

    return {
        getProductLineList,
        getProductLineSales,
    };
});

export default BusinessProductLineStore;
