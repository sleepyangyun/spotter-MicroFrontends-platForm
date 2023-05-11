import { warehouseSdk } from '@client/app/services/v2/warehouse';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';

export type WarehouseApiPhysicalInventoryTableUploadRequest = Parameters<
    typeof warehouseSdk.physicalInventoryTableUpload
>[0];
export type InventoryTableRowModel = Exclude<
    WarehouseApiPhysicalInventoryTableUploadRequest['rowList'],
    undefined
>[number];

export type WarehouseInboundInventoryVOModel = ApiReturnType<
    typeof warehouseSdk.listInboundInventory
>[number];
