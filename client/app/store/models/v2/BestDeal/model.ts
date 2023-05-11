import { bestDealSdk } from '@client/app/services/v2/marketing/bestDeal';
import { ApiReturnType, ApiPaginationReturnType } from '@spotter/gmesh-api-sdk';

export type BestDealDetailModel = ApiReturnType<typeof bestDealSdk.detailByPromotionId>;
export type BestDealProductModel = ApiPaginationReturnType<
    typeof bestDealSdk.submittedProductPageList
>;
