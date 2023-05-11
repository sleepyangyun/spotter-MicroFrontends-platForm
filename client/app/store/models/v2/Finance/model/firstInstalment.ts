import { firstInstalmentSdk } from '@client/app/services/v2/finance';
import { ApiPaginationReturnType, ApiReturnType } from '@spotter/gmesh-api-sdk';

export type FinanceAdvanceBillVOModel = ApiPaginationReturnType<
    typeof firstInstalmentSdk.queryPage
>;

export type FinanceFirstPaymentVOModel = ApiPaginationReturnType<typeof firstInstalmentSdk.query>;

export type FinanceFirstPaymentDetailVOModel = ApiReturnType<
    typeof firstInstalmentSdk.queryDetailByPaymentCode
>;

export type FirstPaymentPreviewVOModel = ApiReturnType<typeof firstInstalmentSdk.queryPreview>;

export type ResponseResultStringModel = ApiReturnType<
    typeof firstInstalmentSdk.exportDetailByPaymentCode
>;
