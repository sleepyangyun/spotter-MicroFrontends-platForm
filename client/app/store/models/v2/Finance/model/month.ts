import { financeMonthReconciliationSdk } from '@client/app/services/v2/finance/reconciliation';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';

export type PreviewDetailModel = ApiReturnType<typeof financeMonthReconciliationSdk.preview>;
