import { amzLogisticsSdk } from '@client/app/services/v2/logistics/amzLogistics';
import { ApiPaginationReturnType, ApiReturnType } from '@spotter/gmesh-api-sdk';

export type DfShipmentDetailModal = ApiReturnType<typeof amzLogisticsSdk.getDetails>;
export type DfShipmentListItemVoModal = ApiPaginationReturnType<
    typeof amzLogisticsSdk.getShipmentList
>;
