import { warehouseSdk } from '@client/app/services/v2/warehouse';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';

export type CreateOutboundOrderBatchModel = ApiReturnType<
    typeof warehouseSdk.createOutboundOrderBatch
>;
export type OutboundDetailModel = ApiReturnType<typeof warehouseSdk.getOutboundNoticeDetailList>;
export type OutboundNewDetailModel = ApiReturnType<typeof warehouseSdk.getOutboundSevcDetail>;
export type logisticCarrierListModel = ApiReturnType<typeof warehouseSdk.pageLogisticCarrierList>;
export type WarehouseOutboundNoticeDetailVOModel =
    OutboundDetailModel['outboundNoticeDetailVOList'];
export type WarehouseLogisticInfoVOModel = OutboundDetailModel['logisticInfoVOS'];
