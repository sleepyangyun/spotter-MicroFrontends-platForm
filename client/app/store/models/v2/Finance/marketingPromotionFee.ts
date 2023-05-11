import WithPrimaryUpdateFnModel from '@app/store/infra/WithPrimaryUpdateFnModel';
import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { financeMarketingPromotionSdk } from '@app/services/v2/finance/marketingPromotionFee';
import { ApiReturnType, ApiPaginationReturnType } from '@spotter/gmesh-api-sdk';
import WithPaginationUpdateFnModel from '@client/app/store/infra/WithPaginationUpdateFnModel';
import { types } from 'mobx-state-tree';

const MarketingPromotionFeeStore = Model({
    name: 'MarketingPromotionFeeStore',
    properties: {
        settleDetailByCode: WithPrimaryUpdateFnModel(
            <ApiReturnType<typeof financeMarketingPromotionSdk.getSettleByCode>>{},
        ).model,
        previewSettleDetail: WithPrimaryUpdateFnModel(
            <ApiReturnType<typeof financeMarketingPromotionSdk.preview>>{},
        ).model,
        querySettleList: WithPaginationUpdateFnModel(
            types.frozen<
                ApiPaginationReturnType<typeof financeMarketingPromotionSdk.querySettle>
            >(),
        ).model,
        couponSettlePageList: WithPaginationUpdateFnModel(
            types.frozen<
                ApiPaginationReturnType<typeof financeMarketingPromotionSdk.queryCoupon>
            >(),
        ).model,
        promotionSettlePageList: WithPaginationUpdateFnModel(
            types.frozen<
                ApiPaginationReturnType<typeof financeMarketingPromotionSdk.queryPromotion>
            >(),
        ).model,
        checkCouponDataCompleteList: WithPrimaryUpdateFnModel(
            <ApiReturnType<typeof financeMarketingPromotionSdk.checkCouponDataComplete>>[],
        ).model,
    },
    overridesInitWatcher: {
        createSettle: false,
        exportSettle: false,
        revokeSettle: false,
        updateCouponData: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    const checkCouponDataComplete = autoContextFlow(
        'checkCouponDataCompleteList',
        async (
            ...args: Parameters<typeof financeMarketingPromotionSdk.checkCouponDataComplete>
        ) => {
            const { data: response } = await financeMarketingPromotionSdk.checkCouponDataComplete(
                ...args,
            );
            return response;
        },
    );

    const createSettle = autoContextFlow(
        'createSettle',
        async (...args: Parameters<typeof financeMarketingPromotionSdk.createSettle>) => {
            const { data: response } = await financeMarketingPromotionSdk.createSettle(...args);
            return response;
        },
    );

    const exportSettle = autoContextFlow(
        'exportSettle',
        async (...args: Parameters<typeof financeMarketingPromotionSdk.exportSettle>) => {
            const { data: response } = await financeMarketingPromotionSdk.exportSettle(...args);
            return response;
        },
    );

    const getSettleDetailByCode = autoContextFlow(
        'settleDetailByCode',
        async (...args: Parameters<typeof financeMarketingPromotionSdk.getSettleByCode>) => {
            const { data: response } = await financeMarketingPromotionSdk.getSettleByCode(...args);
            return response;
        },
    );

    const getPreviewSettleDetail = autoContextFlow(
        'previewSettleDetail',
        async (...args: Parameters<typeof financeMarketingPromotionSdk.preview>) => {
            const { data: response } = await financeMarketingPromotionSdk.preview(...args);
            return response;
        },
    );
    const getCouponSettlePageList = autoContextFlow(
        'couponSettlePageList',
        async (...args: Parameters<typeof financeMarketingPromotionSdk.queryCoupon>) => {
            const { data: response } = await financeMarketingPromotionSdk.queryCoupon(...args);
            return response;
        },
    );

    const getPromotionSettlePageList = autoContextFlow(
        'promotionSettlePageList',
        async (...args: Parameters<typeof financeMarketingPromotionSdk.queryPromotion>) => {
            const { data: response } = await financeMarketingPromotionSdk.queryPromotion(...args);
            return response;
        },
    );

    const getQuerySettleList = autoContextFlow(
        'querySettleList',
        async (...args: Parameters<typeof financeMarketingPromotionSdk.querySettle>) => {
            const { data: response } = await financeMarketingPromotionSdk.querySettle(...args);
            return response;
        },
    );

    const revokeSettle = autoContextFlow(
        'revokeSettle',
        async (...args: Parameters<typeof financeMarketingPromotionSdk.revokeSettle>) => {
            const { data: response } = await financeMarketingPromotionSdk.revokeSettle(...args);
            return response;
        },
    );

    const updateCouponData = autoContextFlow(
        'updateCouponData',
        async (...args: Parameters<typeof financeMarketingPromotionSdk.updateCouponData>) => {
            const { data: response } = await financeMarketingPromotionSdk.updateCouponData(...args);
            return response;
        },
    );

    return {
        checkCouponDataComplete,
        createSettle,
        exportSettle,
        getSettleDetailByCode,
        getPreviewSettleDetail,
        getQuerySettleList,
        revokeSettle,
        updateCouponData,
        getCouponSettlePageList,
        getPromotionSettlePageList,
    };
});

export default MarketingPromotionFeeStore;
