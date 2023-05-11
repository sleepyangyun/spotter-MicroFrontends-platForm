import { bornToRunOrderSdk } from '@client/app/services/v2/order/bornToRunOrder';
import { ApiPaginationReturnType, ApiReturnType } from '@spotter/gmesh-api-sdk';

export type bornToRunOrderListModel = ApiPaginationReturnType<typeof bornToRunOrderSdk.page>;
export type bornToRunOrderDetailModel = ApiReturnType<typeof bornToRunOrderSdk.detail>;
export type btrDetailOfferSKUVOListModel = bornToRunOrderDetailModel['btrDetailOfferSKUVOList'][0];
export type activeOfferListModel = ApiReturnType<typeof bornToRunOrderSdk.listActiveAll>;
export type activeOfferListItemModel = activeOfferListModel['data'][0];

// BtrOrderSdk.next
export type BtrBTRAffirmDetailOfferVOModel = ApiReturnType<typeof bornToRunOrderSdk.next>[0];
export type btrDetailSKUVOListModel = BtrBTRAffirmDetailOfferVOModel['btrDetailSKUVOList'][0];
