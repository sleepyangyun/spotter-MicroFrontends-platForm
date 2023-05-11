import { financeWarehouseSdk, financeWarehouseVasFeePriceSdk } from '@client/app/services/v2/finance';
import { ApiPaginationReturnType, ApiReturnType } from '@spotter/gmesh-api-sdk';

export type VasFeeTypeVOModel = ApiPaginationReturnType<typeof financeWarehouseSdk.pageVasFeeType>;
export type VasExcelCreateVOModel = ApiReturnType<typeof financeWarehouseSdk.excelSaveBatchVasFee>;
export type VasExcelFailInfoVOModel = VasExcelCreateVOModel['failInfos'][0];

export type QueryVasPriceModel = ApiReturnType<typeof financeWarehouseVasFeePriceSdk.queryVasPrice>
