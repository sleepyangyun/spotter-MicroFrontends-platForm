import { otherFinanceSdk } from '@client/app/services/v2/finance/otherFee';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';

export type RefundModel = ApiReturnType<typeof otherFinanceSdk.undeliveredList>[0];
