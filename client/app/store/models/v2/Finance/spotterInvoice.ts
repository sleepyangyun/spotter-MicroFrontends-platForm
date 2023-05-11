import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import WithPaginationUpdateFnModel from '@app/store/infra/WithPaginationUpdateFnModel';
import WithPrimaryUpdateFnModel from '@client/app/store/infra/WithPrimaryUpdateFnModel';
import { spotterInvoiceSdk } from '@client/app/services/v2/finance/spotterInvoice';

export const SpotterInvoiceStore = Model({
    name: 'SpotterInvoiceStore',
    properties: {
        invoiceList: WithPaginationUpdateFnModel<typeof spotterInvoiceSdk.invoiceList>().model,
        invoiceDetail: WithPrimaryUpdateFnModel<typeof spotterInvoiceSdk.invoiceDetailList>(
            {} as any,
        ).model,
    },
    overridesInitWatcher: {
        invoiceDetail: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    const getInvoiceList = autoContextFlow(
        'invoiceList',
        async (...args: Parameters<typeof spotterInvoiceSdk.invoiceList>) => {
            const { data: response } = await spotterInvoiceSdk.invoiceList(...args);
            return response;
        },
    );

    const getInvoiceDetail = autoContextFlow(
        'invoiceDetail',
        async (...args: Parameters<typeof spotterInvoiceSdk.invoiceDetailList>) => {
            const { data: res } = await spotterInvoiceSdk.invoiceDetailList(...args);
            return res;
        },
    );

    // 批量导出发票
    const batchExportInvoice = autoContextFlow(
        'batchExportInvoice',
        async (...args: Parameters<typeof spotterInvoiceSdk.batchExportInvoice>) => {
            const { data: res } = await spotterInvoiceSdk.batchExportInvoice(...args);
            return res;
        },
    );

    return {
        getInvoiceList,
        getInvoiceDetail,
        batchExportInvoice,
    };
});
