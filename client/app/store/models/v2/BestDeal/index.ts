import Model from '@app/store/infra/Model';
import { deepTrim, generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { bestDealSdk } from '@app/services/v2/marketing/bestDeal';
import WithPrimaryUpdateFnModel from '@client/app/store/infra/WithPrimaryUpdateFnModel';
import { ApiPaginationReturnType, ApiReturnType } from '@spotter/gmesh-api-sdk';
import WithPaginationUpdateFnModel from '@client/app/store/infra/WithPaginationUpdateFnModel';
import { types } from 'mobx-state-tree';

const BestDealStore = Model({
    name: 'BestDealStore',
    properties: {
        bestDealDetail: WithPrimaryUpdateFnModel(
            <ApiReturnType<typeof bestDealSdk.detailByPromotionId>>{},
        ).model,
        bestDealDetailByAmz: WithPrimaryUpdateFnModel(
            <ApiReturnType<typeof bestDealSdk.detailByAmazonPromotionId>>{},
        ).model,
        bestDealList: WithPaginationUpdateFnModel(
            types.frozen(<ApiPaginationReturnType<typeof bestDealSdk.list>>{}),
        ).model,
        productFeedbackList: WithPaginationUpdateFnModel(
            types.frozen(<ApiPaginationReturnType<typeof bestDealSdk.productFeedbackList>>{}),
        ).model,
        submittedProductPageList: WithPaginationUpdateFnModel(
            types.frozen(<ApiPaginationReturnType<typeof bestDealSdk.submittedProductPageList>>{}),
        ).model,
        unSubmitProductPageList: WithPaginationUpdateFnModel(
            types.frozen(<ApiPaginationReturnType<typeof bestDealSdk.unSubmitProductPageList>>{}),
        ).model,
        unusualProductPageList: WithPaginationUpdateFnModel(
            types.frozen(<ApiPaginationReturnType<typeof bestDealSdk.unusualProductPageList>>{}),
        ).model,
        latestFailUploadProductList: WithPrimaryUpdateFnModel(
            <ApiReturnType<typeof bestDealSdk.latestFailUploadProductList>>[],
        ).model,
        operationHistory: WithPaginationUpdateFnModel(
            types.frozen(<ApiPaginationReturnType<typeof bestDealSdk.operationHistory>>{}),
        ).model,
        operationHistoryDetail: WithPrimaryUpdateFnModel<typeof bestDealSdk.operationHistoryDetail>(
            <ApiReturnType<typeof bestDealSdk.operationHistoryDetail>>{},
        ).model,
    },
    overridesInitWatcher: {
        createBestDeal: false,
        addProductFeedback: false,
        cancelBestDeal: false,
        productShift: false,
        activityShift: false,
        productUpdate: false,
        shiftBestDeal: false,
        updateBestDeal: false,
        productAddRemark: false,
        productAddAgreementId: false,
        validation: false,
        productApply: false,
        productDelete: false,
        checkBestDealTimeRange: false,
        _export: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    const createBestDeal = autoContextFlow(
        'createBestDeal',
        async (...args: Parameters<typeof bestDealSdk.add>) => {
            const { data: response } = await bestDealSdk.add(...args);
            return response;
        },
    );

    const addProductFeedback = autoContextFlow(
        'addProductFeedback',
        async (...args: Parameters<typeof bestDealSdk.addProductFeedback>) => {
            const { data: response } = await bestDealSdk.addProductFeedback(...args);
            return response;
        },
    );

    const cancelBestDeal = autoContextFlow(
        'cancelBestDeal',
        async (...args: Parameters<typeof bestDealSdk.cancel>) => {
            const { data: response } = await bestDealSdk.cancel(...args);
            return response;
        },
    );

    const getBestDealDetailByAmz = autoContextFlow(
        'bestDealDetailByAmz',
        async (...args: Parameters<typeof bestDealSdk.detailByAmazonPromotionId>) => {
            const { data: response } = await bestDealSdk.detailByAmazonPromotionId(...args);
            return response;
        },
    );

    const getBestDealDetail = autoContextFlow(
        'bestDealDetail',
        async (...args: Parameters<typeof bestDealSdk.detailByPromotionId>) => {
            const { data: response } = await bestDealSdk.detailByPromotionId(...args);
            return response;
        },
    );

    const getBestDealList = autoContextFlow(
        'bestDealList',
        async (...args: Parameters<typeof bestDealSdk.list>) => {
            const { data: response } = await bestDealSdk.list(deepTrim(...args));
            return response;
        },
    );

    const getProductFeedbackList = autoContextFlow(
        'productFeedbackList',
        async (...args: Parameters<typeof bestDealSdk.productFeedbackList>) => {
            const { data: response } = await bestDealSdk.productFeedbackList(...args);
            return response;
        },
    );

    const productShift = autoContextFlow(
        'productShift',
        async (...args: Parameters<typeof bestDealSdk.productShift>) => {
            const { data: response } = await bestDealSdk.productShift(...args);
            return response;
        },
    );
    const activityShift = autoContextFlow(
        'activityShift',
        async (...args: Parameters<typeof bestDealSdk.shift>) => {
            const { data: response } = await bestDealSdk.shift(...args);
            return response;
        },
    );

    const productUpdate = autoContextFlow(
        'productUpdate',
        async (...args: Parameters<typeof bestDealSdk.productUpdate>) => {
            const { data: response } = await bestDealSdk.productUpdate(...args);
            return response;
        },
    );

    const shiftBestDeal = autoContextFlow(
        'shiftBestDeal',
        async (...args: Parameters<typeof bestDealSdk.shift>) => {
            const { data: response } = await bestDealSdk.shift(...args);
            return response;
        },
    );

    const getSubmittedProductPageList = autoContextFlow(
        'submittedProductPageList',
        async (...args: Parameters<typeof bestDealSdk.submittedProductPageList>) => {
            const { data: response } = await bestDealSdk.submittedProductPageList(
                deepTrim(...args),
            );
            return response;
        },
    );

    const getUnSubmitProductPageList = autoContextFlow(
        'unSubmitProductPageList',
        async (...args: Parameters<typeof bestDealSdk.unSubmitProductPageList>) => {
            const { data: response } = await bestDealSdk.unSubmitProductPageList(deepTrim(...args));
            return response;
        },
    );

    const getUnusualProductPageList = autoContextFlow(
        'unusualProductPageList',
        async (...args: Parameters<typeof bestDealSdk.unusualProductPageList>) => {
            const { data: response } = await bestDealSdk.unusualProductPageList(deepTrim(...args));
            return response;
        },
    );

    const updateBestDeal = autoContextFlow(
        'updateBestDeal',
        async (...args: Parameters<typeof bestDealSdk.update>) => {
            const { data: response } = await bestDealSdk.update(...args);
            return response;
        },
    );

    const getLatestFailUploadProductList = autoContextFlow(
        'latestFailUploadProductList',
        async (...args: Parameters<typeof bestDealSdk.latestFailUploadProductList>) => {
            const { data: response } = await bestDealSdk.latestFailUploadProductList(...args);
            return response;
        },
    );

    const productAddRemark = autoContextFlow(
        'productAddRemark',
        async (...args: Parameters<typeof bestDealSdk.productAddRemark>) => {
            const { data: response } = await bestDealSdk.productAddRemark(...args);
            return response;
        },
    );

    const productAddAgreementId = autoContextFlow(
        'productAddAgreementId',
        async (...args: Parameters<typeof bestDealSdk.productAddAgreementId>) => {
            const { data: response } = await bestDealSdk.productAddAgreementId(...args);
            return response;
        },
    );

    const validate = autoContextFlow(
        'validation',
        async (...args: Parameters<typeof bestDealSdk.validation>) => {
            const { data: response } = await bestDealSdk.validation(...args);
            return response;
        },
    );

    const productApply = autoContextFlow(
        'productApply',
        async (...args: Parameters<typeof bestDealSdk.productApply>) => {
            const { data: response } = await bestDealSdk.productApply(...args);
            return response;
        },
    );

    const productDelete = autoContextFlow(
        'productDelete',
        async (...args: Parameters<typeof bestDealSdk.productDelete>) => {
            const { data: response } = await bestDealSdk.productDelete(...args);
            return response;
        },
    );

    const checkBestDealTimeRange = autoContextFlow(
        'checkBestDealTimeRange',
        async (...args: Parameters<typeof bestDealSdk.checkProductIsActiveInExpectTimeRange>) => {
            const { data: response } = await bestDealSdk.checkProductIsActiveInExpectTimeRange(
                ...args,
            );
            return response;
        },
    );

    const getOperationHistory = autoContextFlow(
        'operationHistory',
        async (...args: Parameters<typeof bestDealSdk.operationHistory>) => {
            const { data: response } = await bestDealSdk.operationHistory(...args);
            return response;
        },
    );

    const getOperationHistoryDetail = autoContextFlow(
        'operationHistoryDetail',
        async (...args: Parameters<typeof bestDealSdk.operationHistoryDetail>) => {
            const { data: response } = await bestDealSdk.operationHistoryDetail(...args);
            return response;
        },
    );

    const _export = autoContextFlow(
        '_export',
        async (...args: Parameters<typeof bestDealSdk._export>) => {
            const { data: response } = await bestDealSdk._export(...args);
            return response;
        },
    );

    return {
        createBestDeal,
        addProductFeedback,
        cancelBestDeal,
        getBestDealDetail,
        getBestDealDetailByAmz,
        getBestDealList,
        getProductFeedbackList,
        productShift,
        activityShift,
        productUpdate,
        shiftBestDeal,
        getSubmittedProductPageList,
        getUnSubmitProductPageList,
        getUnusualProductPageList,
        updateBestDeal,
        getLatestFailUploadProductList,
        productAddRemark,
        productAddAgreementId,
        validate,
        productApply,
        productDelete,
        checkBestDealTimeRange,
        getOperationHistory,
        getOperationHistoryDetail,
        _export,
    };
});

export default BestDealStore;
