import { warehouseSdk } from '@client/app/services/v2/warehouse';
import { ApiPaginationReturnType, ApiReturnType } from '@spotter/gmesh-api-sdk';

export type InboundNoticeVOModel = ApiPaginationReturnType<
    typeof warehouseSdk.getInboundNoticePageList
>;

export type InboundNoticeDetailVOModel = ApiReturnType<
    typeof warehouseSdk.getInboundNoticeDetailList
>;

export type WarehouseInventoryVOModel = ApiReturnType<typeof warehouseSdk.list>[0];

export type WarehouseInventoryPageVOModal = ApiPaginationReturnType<typeof warehouseSdk.page>;

export type InboundNoticeDetailSubVOModel = InboundNoticeDetailVOModel['inboundNoticeDetailVOS'][0];
