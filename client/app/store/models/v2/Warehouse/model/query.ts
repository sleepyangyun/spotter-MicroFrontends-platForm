import { warehouseSdk } from '@client/app/services/v2/warehouse';
import { ApiPaginationReturnType } from '@spotter/gmesh-api-sdk';

export type WarehouseSummaryVOModel = ApiPaginationReturnType<
    typeof warehouseSdk.pageInventorySummary
>;

export type ChangeListVOModel = ApiPaginationReturnType<typeof warehouseSdk.inventoryChangeDetail>;

export type ModifyListVOModel = ApiPaginationReturnType<
    typeof warehouseSdk.getInventoryChangeMessagePageList
>;
