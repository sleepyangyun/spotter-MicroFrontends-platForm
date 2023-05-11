import { ApiReturnType } from '@spotter/gmesh-api-sdk';
import {
    SpotterAccountPaymentSdk,
    SpotterAmazonReturnSdk,
    SpotterAmazonShortageMissedSdk,
} from '@app/services/v2/finance';
import { ApiPaginationReturnType } from '@spotter/gmesh-api-sdk/lib/type';

export type SettlementDetailModel = ApiReturnType<typeof SpotterAccountPaymentSdk.detail>;
export type RefundDetailListModel = SettlementDetailModel['returnDetails'];
export type RefundDetailModel = ApiReturnType<
    typeof SpotterAmazonReturnSdk.nonSettlementDetails
>[0];
export type ShortageMissedDetailsListModel = SettlementDetailModel['shortageMissedDetails'];
export type ShortageMissedDetailsModel = ApiReturnType<
    typeof SpotterAmazonShortageMissedSdk.nonSettlementDetails
>[0];
export type SettlementRecordListModel = ApiPaginationReturnType<
    typeof SpotterAccountPaymentSdk.summary
>;
