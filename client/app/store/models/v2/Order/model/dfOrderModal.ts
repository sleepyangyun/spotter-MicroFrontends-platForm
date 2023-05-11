import { dfOrderSdk, dfOrderSdk1 } from '@client/app/services/v2/order/dfOrder';

import { ApiPaginationReturnType, ApiReturnType } from '@spotter/gmesh-api-sdk';

export type OrderDfOrderAmzDfItemVOModel = ApiPaginationReturnType<typeof dfOrderSdk1.pageDfOrder>;

export type DfExceptionOrderModel = ApiReturnType<typeof dfOrderSdk.listDfOrder>;
