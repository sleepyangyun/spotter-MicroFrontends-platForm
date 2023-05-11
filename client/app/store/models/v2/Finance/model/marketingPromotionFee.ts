import { financeMarketingPromotionSdk } from '@client/app/services/v2/finance/marketingPromotionFee';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';

export type FinanceServeServeFeeSettleVOModel = ApiReturnType<
    typeof financeMarketingPromotionSdk.preview
>;
