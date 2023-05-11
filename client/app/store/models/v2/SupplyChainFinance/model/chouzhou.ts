import { ApiPaginationReturnType, ApiReturnType } from '@spotter/gmesh-api-sdk';
import { spotterAccountSdk } from '@app/services/v2/business/svcAccount';
import { chouzhouLoanSdk } from '@client/app/services/v2/supplyChainFinance';

export type ChouZhouListVOModel = ApiPaginationReturnType<typeof spotterAccountSdk.list>;

export type ChouZhouDetailVOModel = ApiReturnType<typeof spotterAccountSdk.detail>;

export type ChouZhouLoanInfoVOModel = ApiReturnType<typeof chouzhouLoanSdk.info>;
