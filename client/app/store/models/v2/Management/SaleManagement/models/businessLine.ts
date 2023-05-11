import { saleManagementLineApiSdk } from '@client/app/services/v2/management/sales';
import { ApiPaginationReturnType } from '@spotter/gmesh-api-sdk';

export type BusinessLineModel = ApiPaginationReturnType<
    typeof saleManagementLineApiSdk.lineSearchPage
>;
