import { spotterShipmentSdk } from '@app/services/v2/logistics';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';

export type SpotterShipmentDetailModel = ApiReturnType<typeof spotterShipmentSdk.orderDetail>;

export type SptShipmentDetailProductListModel = SpotterShipmentDetailModel['orderItemVOList'][0];
