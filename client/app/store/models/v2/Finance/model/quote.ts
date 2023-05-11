import { financeQuotedPriceSdk } from '@client/app/services/v2/finance';
import { ApiPaginationReturnType, ApiReturnType } from '@spotter/gmesh-api-sdk';

export type quotePriceModel = ApiPaginationReturnType<typeof financeQuotedPriceSdk.pageQuotedPrice>;
export type feeWarehouseQuotedPriceVOModel = ApiReturnType<
    typeof financeQuotedPriceSdk.quotedPriceDetail
>;

export type WarehouseFeeWarehouseQuotedPriceVOModel = ApiReturnType<
    typeof financeQuotedPriceSdk.quotedPriceTry
>;
