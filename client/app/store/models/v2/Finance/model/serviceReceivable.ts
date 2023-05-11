import { financeMarketingPromotionSdk } from '@client/app/services/v2/finance/marketingPromotionFee';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';

export type PreviewModel = ApiReturnType<typeof financeMarketingPromotionSdk.preview>;
