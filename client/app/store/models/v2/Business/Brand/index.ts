import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { businessBrandSdk } from '@app/services/v2/business/brand';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';
import WithPrimaryUpdateFnModel from '@client/app/store/infra/WithPrimaryUpdateFnModel';

const BusinessBrandStore = Model({
    name: 'BusinessBrandStore',
    properties: {
        brandList: WithPrimaryUpdateFnModel<typeof businessBrandSdk.companySearch>(
            <ApiReturnType<typeof businessBrandSdk.companySearch>>[],
        ).model,
        companySummary: WithPrimaryUpdateFnModel<typeof businessBrandSdk.companySummary>(
            <ApiReturnType<typeof businessBrandSdk.companySummary>>{},
        ).model,
        brandSales: WithPrimaryUpdateFnModel<typeof businessBrandSdk.brandSalesSearch>(
            <ApiReturnType<typeof businessBrandSdk.brandSalesSearch>>{},
        ).model,
        brandSearchList: WithPrimaryUpdateFnModel<typeof businessBrandSdk.gmeshSearchBrandList>(
            <ApiReturnType<typeof businessBrandSdk.gmeshSearchBrandList>>[],
        ).model,
    },
    overridesInitWatcher: {},
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    const getBrandList = autoContextFlow(
        'brandList',
        async (...args: Parameters<typeof businessBrandSdk.companySearch>) => {
            const { data: response } = await businessBrandSdk.companySearch(...args);
            return response;
        },
    );

    const getBrandSales = autoContextFlow(
        'brandSales',
        async (...args: Parameters<typeof businessBrandSdk.brandSalesSearch>) => {
            const { data: response } = await businessBrandSdk.brandSalesSearch(...args);
            return response;
        },
    );

    const getCompanySummary = autoContextFlow(
        'companySummary',
        async (...args: Parameters<typeof businessBrandSdk.companySummary>) => {
            const { data: response } = await businessBrandSdk.companySummary(...args);
            return response;
        },
    );

    const getBrandSearchList = autoContextFlow(
        'brandSearchList',
        async (...args: Parameters<typeof businessBrandSdk.gmeshSearchBrandList>) => {
            const { data: response } = await businessBrandSdk.gmeshSearchBrandList(...args);
            return response;
        },
    );

    return {
        getBrandList,
        getBrandSales,
        getCompanySummary,
        getBrandSearchList,
    };
});

export default BusinessBrandStore;
