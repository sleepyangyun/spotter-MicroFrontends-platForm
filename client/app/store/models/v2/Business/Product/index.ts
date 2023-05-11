import Model from '@app/store/infra/Model';
import WithPaginationUpdateFnModel from '@app/store/infra/WithPaginationUpdateFnModel';
import { types } from 'mobx-state-tree';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { businessProductSdk } from '@app/services/v2/business';
import { ApiPaginationReturnType, ApiReturnType } from '@spotter/gmesh-api-sdk';
import WithPrimaryUpdateFnModel from '@client/app/store/infra/WithPrimaryUpdateFnModel';

const BusinessProductStore = Model({
    name: 'BusinessProductStore',
    properties: {
        productDetail: WithPrimaryUpdateFnModel<typeof businessProductSdk.gDetail>(
            <ApiReturnType<typeof businessProductSdk.gDetail>>{},
        ).model,
        productSummaryPage: WithPaginationUpdateFnModel(
            types.frozen<ApiPaginationReturnType<typeof businessProductSdk.summary>>(),
        ).model,
        productListBysSKU: WithPaginationUpdateFnModel(
            types.frozen<
                ApiPaginationReturnType<typeof businessProductSdk.gFuzzyVcValidPageSearch>
            >(),
        ).model,
        validSskuListSearch: WithPaginationUpdateFnModel(
            types.frozen<
                ApiPaginationReturnType<typeof businessProductSdk.gFuzzyVcValidPageSearch>
            >(),
        ).model,
        actualDetail: WithPrimaryUpdateFnModel<typeof businessProductSdk.gActualDetail>(
            <ApiReturnType<typeof businessProductSdk.gActualDetail>>{},
        ).model,
        companySskuList:
            WithPaginationUpdateFnModel<typeof businessProductSdk.gCompanySskuFuzzySearch>().model,
    },
    overridesInitWatcher: {
        needBatchNoModify: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    const getProductDetail = autoContextFlow(
        'productDetail',
        async (...args: Parameters<typeof businessProductSdk.gDetail>) => {
            const { data: response } = await businessProductSdk.gDetail(...args);
            return response;
        },
    );

    const getProductSummaryPage = autoContextFlow(
        'productSummaryPage',
        async (...args: Parameters<typeof businessProductSdk.summary>) => {
            const { data: response } = await businessProductSdk.summary(...args);
            return response;
        },
    );

    const needBatchNoModify = autoContextFlow(
        'needBatchNoModify',
        async (...args: Parameters<typeof businessProductSdk.needBatchNoModify>) => {
            const { data: response } = await businessProductSdk.needBatchNoModify(...args);
            return response;
        },
    );

    const getProductListByMatchSsku = autoContextFlow(
        'productListBysSKU',
        async (...args: Parameters<typeof businessProductSdk.gFuzzyVcValidPageSearch>) => {
            const { data: response } = await businessProductSdk.gFuzzyVcValidPageSearch(...args);
            return response;
        },
    );

    const getActualDetail = autoContextFlow(
        'actualDetail',
        async (...args: Parameters<typeof businessProductSdk.gActualDetail>) => {
            const { data: response } = await businessProductSdk.gActualDetail(...args);
            return response;
        },
    );

    const getCompanySskuList = autoContextFlow(
        'companySskuList',
        async (...args: Parameters<typeof businessProductSdk.gCompanySskuFuzzySearch>) => {
            const { data: response } = await businessProductSdk.gCompanySskuFuzzySearch(...args);
            return response;
        },
    );

    return {
        getProductDetail,
        getProductSummaryPage,
        needBatchNoModify,
        getProductListByMatchSsku,
        getActualDetail,
        getCompanySskuList,
    };
});

export default BusinessProductStore;
