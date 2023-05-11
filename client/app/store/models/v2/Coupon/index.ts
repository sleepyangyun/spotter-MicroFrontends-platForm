import Model from '@app/store/infra/Model';
import WithPaginationUpdateFnModel from '@app/store/infra/WithPaginationUpdateFnModel';
import WithPrimaryUpdateFnModel from '@app/store/infra/WithPrimaryUpdateFnModel';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { couponSdk, marketingCouponSdk } from '@client/app/services/v2/marketing/coupon';
import { campaignSdk } from '@app/services/v2/campaign';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';

const CouponStore = Model({
    name: 'CouponStore',
    properties: {
        campaignDetail: WithPrimaryUpdateFnModel(
            <ApiReturnType<typeof campaignSdk.selectCampaignDetail>>{},
        ).model,
        campaignList: WithPaginationUpdateFnModel<typeof campaignSdk.selectCampaignList>().model,
        couponList: WithPaginationUpdateFnModel<typeof couponSdk.selectCouponList>().model,
        couponOperationHistoryList:
            WithPaginationUpdateFnModel<typeof couponSdk.selectCouponOperationHistoryList>().model,
    },
    overridesInitWatcher: {
        updateCoupon: false,
        cancelCoupon: false,
        batchAddCampaign: false,
        resubmitCampaign: false,
        cancelCampaign: false,
        _export: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    const getCampaignList = autoContextFlow(
        'campaignList',
        async (...args: Parameters<typeof campaignSdk.selectCampaignList>) => {
            const { data: response } = await campaignSdk.selectCampaignList(...args);

            return response;
        },
    );
    const getCampaignDetail = autoContextFlow(
        'campaignDetail',
        async (...args: Parameters<typeof campaignSdk.selectCampaignDetail>) => {
            const { data: response } = await campaignSdk.selectCampaignDetail(...args);
            return response;
        },
    );

    const getCouponList = autoContextFlow(
        'couponList',
        async (...args: Parameters<typeof couponSdk.selectCouponList>) => {
            const { data: response } = await couponSdk.selectCouponList(...args);
            return response;
        },
    );

    const getCouponOperationHistoryList = autoContextFlow(
        'couponOperationHistoryList',
        async (...args: Parameters<typeof couponSdk.selectCouponOperationHistoryList>) => {
            const { data: response } = await couponSdk.selectCouponOperationHistoryList(...args);
            return response;
        },
    );

    const _export = autoContextFlow(
        '_export',
        async (...args: Parameters<typeof marketingCouponSdk._export>) => {
            const { data: response } = await marketingCouponSdk._export(...args);
            return response;
        },
    );

    return {
        getCampaignList,
        getCouponList,
        getCouponOperationHistoryList,
        getCampaignDetail,
        _export,
    };
});

export default CouponStore;
