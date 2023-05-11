import { secondInstalmentSdk } from '@client/app/services/v2/finance';
import { ApiPaginationReturnType, ApiReturnType } from '@spotter/gmesh-api-sdk';

export type FinanceSecondPaymentVOModel = ApiPaginationReturnType<
    typeof secondInstalmentSdk.queryPaymentPage
>;

export type FinanceSecondPaymentDetailVOModel = ApiReturnType<
    typeof secondInstalmentSdk.queryDetailByPaymentCode
>;

export type SecondPaymentPreviewVOModel = ApiReturnType<typeof secondInstalmentSdk.preview>;
export type PageVOFinanceSecondPaymentUnsettlementVOModel = ApiPaginationReturnType<
    typeof secondInstalmentSdk.queryUnsettlementPage
>;
export type SecondPaymentStatusDetailModel = ApiReturnType<
    typeof secondInstalmentSdk.querySettleDetail
>;

// export type ResponseResultStringModel = ApiReturnType<
//     typeof secondInstalmentSdk.exportDetailByPaymentCode
// >;
