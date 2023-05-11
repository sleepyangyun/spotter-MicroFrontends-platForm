import { invoiceSdk } from '@client/app/services/v2/finance/invoice';
import { ApiPaginationReturnType } from '@spotter/gmesh-api-sdk';

export type invoiceListByAsnModel = ApiPaginationReturnType<typeof invoiceSdk.getPOInvoiceASNPage>;
