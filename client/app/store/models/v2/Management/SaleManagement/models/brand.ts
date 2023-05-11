import { saleManagementBrandApiSdk } from '@client/app/services/v2/management/sales';
import { ApiPaginationReturnType } from '@spotter/gmesh-api-sdk';

export type BrandItemModel = ApiPaginationReturnType<
    typeof saleManagementBrandApiSdk.brandSearchPageDetailed
>;
