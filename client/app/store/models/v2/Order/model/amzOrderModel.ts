import { amzOrderSdk } from '@app/services/v2/order/amzOrder';
import { ApiPaginationReturnType, ApiReturnType } from '@spotter/gmesh-api-sdk';

export type PageVOOrderOrderAmzVOModel = ApiPaginationReturnType<typeof amzOrderSdk.pageOrder>;
export type AmzOrderPoAmzOrderStatisticsVOModel = ApiReturnType<typeof amzOrderSdk.getStatistics>;
