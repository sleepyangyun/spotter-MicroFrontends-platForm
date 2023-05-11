import { ApiReturnType } from '@spotter/gmesh-api-sdk';
import { itemsOfferSdk } from '@app/services/v2/items';

export type OfferDetailModel = ApiReturnType<typeof itemsOfferSdk.getOfferDetail>;
export type OfferItemInfoModel = OfferDetailModel['amazonInfo'];
