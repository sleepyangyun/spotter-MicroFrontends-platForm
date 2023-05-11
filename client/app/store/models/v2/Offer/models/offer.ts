import { itemsOfferSdk } from '@client/app/services/v2/items';
import { ApiPaginationReturnType } from '@spotter/gmesh-api-sdk';

export type CatalogOfferOfferItemListVOModel = ApiPaginationReturnType<
    typeof itemsOfferSdk.getActiveOfferList
>;
