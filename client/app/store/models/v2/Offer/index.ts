import Model from '@app/store/infra/Model';
import WithPaginationUpdateFnModel from '@app/store/infra/WithPaginationUpdateFnModel';
import WithPrimaryUpdateFnModel from '@app/store/infra/WithPrimaryUpdateFnModel';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import {
    itemsOfferCategorySdk,
    itemsOfferSdk,
    itemsOfferTemplateSdk,
} from '@app/services/v2/items';
import { types } from 'mobx-state-tree';
import { ApiReturnType, ApiPaginationReturnType } from '@spotter/gmesh-api-sdk';

const OfferStore = Model({
    name: 'OfferStore',
    properties: {
        offerList: WithPaginationUpdateFnModel(
            types.frozen<ApiPaginationReturnType<typeof itemsOfferSdk.getOfferList>>(),
        ).model,
        activeOfferList:
            WithPaginationUpdateFnModel<typeof itemsOfferSdk.getActiveOfferList>().model,
        offerDetail: WithPrimaryUpdateFnModel(
            {} as ApiReturnType<typeof itemsOfferSdk.getOfferDetail>,
        ).model,
        offerHistoryDetail: WithPrimaryUpdateFnModel(
            {} as ApiReturnType<typeof itemsOfferSdk.historyDetail>,
        ).model,
        offerCategoryDetail: WithPrimaryUpdateFnModel(
            {} as ApiReturnType<typeof itemsOfferCategorySdk.getCategoryDetail>,
        ).model,
        offerHistoryList: WithPaginationUpdateFnModel(
            types.frozen<ApiPaginationReturnType<typeof itemsOfferSdk.historyList>>(),
        ).model,
        offerTemplateList: WithPaginationUpdateFnModel(
            types.frozen<ApiPaginationReturnType<typeof itemsOfferTemplateSdk.getTemplateList>>(),
        ).model,
        offerTemplateFileDownloadUrl: WithPrimaryUpdateFnModel('').model,
        totalOfferTemplateCount: WithPrimaryUpdateFnModel(0).model,
    },
    overridesInitWatcher: {
        deleteOffer: false,
        syncOfferTemplate: false,
        syncOffer: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    const deleteOffer = autoContextFlow(
        'deleteOffer',
        async (...args: Parameters<typeof itemsOfferSdk.deleteOffer>) => {
            const { data: response } = await itemsOfferSdk.deleteOffer(...args);
            return response;
        },
    );

    const getOfferDetail = autoContextFlow(
        'offerDetail',
        async (...args: Parameters<typeof itemsOfferSdk.getOfferDetail>) => {
            const { data: response } = await itemsOfferSdk.getOfferDetail(...args);
            return response;
        },
    );

    const getOfferList = autoContextFlow(
        'offerList',
        async (...args: Parameters<typeof itemsOfferSdk.getOfferList>) => {
            const { data: response } = await itemsOfferSdk.getOfferList(...args);
            return response;
        },
    );

    const getActiveOfferList = autoContextFlow(
        'activeOfferList',
        async (...args: Parameters<typeof itemsOfferSdk.getActiveOfferList>) => {
            const { data: response } = await itemsOfferSdk.getActiveOfferList(...args);
            return response;
        },
    );

    const getOfferHistoryDetail = autoContextFlow(
        'offerHistoryDetail',
        async (...args: Parameters<typeof itemsOfferSdk.historyDetail>) => {
            const { data: response } = await itemsOfferSdk.historyDetail(...args);
            return response;
        },
    );

    const getOfferHistoryList = autoContextFlow(
        'offerHistoryList',
        async (...args: Parameters<typeof itemsOfferSdk.historyList>) => {
            const { data: response } = await itemsOfferSdk.historyList(...args);
            return response;
        },
    );

    const syncOffer = autoContextFlow(
        'syncOffer',
        async (...args: Parameters<typeof itemsOfferSdk.syncOffer>) => {
            const { data: response } = await itemsOfferSdk.syncOffer(...args);
            return response;
        },
    );

    const getOfferTemplateFileDownloadUrl = autoContextFlow(
        'offerTemplateFileDownloadUrl',
        async (...args: Parameters<typeof itemsOfferTemplateSdk.getTemplateFilePath>) => {
            const { data: response } = await itemsOfferTemplateSdk.getTemplateFilePath(...args);
            return response;
        },
    );

    const getOfferTotalOfferTemplateCount = autoContextFlow(
        'totalOfferTemplateCount',
        async (...args: Parameters<typeof itemsOfferTemplateSdk.getTemplateTotalCount>) => {
            const { data: response } = await itemsOfferTemplateSdk.getTemplateTotalCount(...args);
            return response;
        },
    );

    const getOfferTemplateList = autoContextFlow(
        'offerTemplateList',
        async (...args: Parameters<typeof itemsOfferTemplateSdk.getTemplateList>) => {
            const { data: response } = await itemsOfferTemplateSdk.getTemplateList(...args);
            return response;
        },
    );

    const syncOfferTemplate = autoContextFlow(
        'syncOfferTemplate',
        async (...args: Parameters<typeof itemsOfferTemplateSdk.syncTemplate>) => {
            const { data: response } = await itemsOfferTemplateSdk.syncTemplate(...args);
            return response;
        },
    );

    const getOfferCategoryDetail = autoContextFlow(
        'offerCategoryDetail',
        async (...args: Parameters<typeof itemsOfferCategorySdk.getCategoryDetail>) => {
            const { data: response } = await itemsOfferCategorySdk.getCategoryDetail(...args);
            return response;
        },
    );

    return {
        deleteOffer,
        getOfferDetail,
        getActiveOfferList,
        getOfferList,
        getOfferHistoryDetail,
        getOfferHistoryList,
        getOfferTemplateFileDownloadUrl,
        getOfferTemplateList,
        syncOfferTemplate,
        syncOffer,
        getOfferTotalOfferTemplateCount,
        getOfferCategoryDetail,
    };
});

export default OfferStore;
