import { warehouseSdk } from '@client/app/services/v2/warehouse';
import { ApiPaginationReturnType } from '@spotter/gmesh-api-sdk';

// TODO 改ApiPaginationReturnType & url
export type LogisticianVOModel = ApiPaginationReturnType<
    typeof warehouseSdk.pageLogisticCarrierList
>;
