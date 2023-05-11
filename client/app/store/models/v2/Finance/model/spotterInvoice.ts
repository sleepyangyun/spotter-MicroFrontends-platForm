import { spotterInvoiceSdk } from '@client/app/services/v2/finance/spotterInvoice';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';

export type SpotterInvoiceDetailModel = ApiReturnType<typeof spotterInvoiceSdk.invoiceDetailList>;
