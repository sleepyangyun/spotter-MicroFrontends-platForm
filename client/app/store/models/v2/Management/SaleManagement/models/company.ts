import { saleManagementCompanyApiSdk } from '@client/app/services/v2/management/sales';
import { ApiPaginationReturnType } from '@spotter/gmesh-api-sdk';

export type CompanyItemModel = ApiPaginationReturnType<
    typeof saleManagementCompanyApiSdk.companySearchPageDetailed
>;
