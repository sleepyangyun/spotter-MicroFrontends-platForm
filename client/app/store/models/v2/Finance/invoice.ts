import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { invoiceSdk } from '@client/app/services/v2/finance/invoice';
import WithPaginationUpdateFnModel from '@app/store/infra/WithPaginationUpdateFnModel';
import WithPrimaryUpdateFnModel from '@client/app/store/infra/WithPrimaryUpdateFnModel';

export const AmzInvoiceStore = Model({
    name: 'AmzInvoiceStore',
    properties: {
        invoiceList: WithPaginationUpdateFnModel<typeof invoiceSdk.getPOInvoicePage>().model,
        invoiceListByAsn: WithPaginationUpdateFnModel<typeof invoiceSdk.getPOInvoicePage>().model,
        invoiceDetail: WithPrimaryUpdateFnModel<typeof invoiceSdk.detail>({} as any).model,
        unboundInvoiceCount: WithPrimaryUpdateFnModel<typeof invoiceSdk.countAsn>(0).model,
        expectedPaymentList:
            WithPaginationUpdateFnModel<typeof invoiceSdk.getPOInvoiceDueDateGroupPage>().model,
        // unboundInvoiceList: WithPaginationUpdateFnModel<typeof >
    },
    overridesInitWatcher: {
        invoiceBindAsn: false,
        ignoreInvoice: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    const getInvoiceList = autoContextFlow(
        'invoiceList',
        async (...args: Parameters<typeof invoiceSdk.getPOInvoicePage>) => {
            const { data: response } = await invoiceSdk.getPOInvoicePage(...args);
            return response;
        },
    );

    const getInvoiceListByAsn = autoContextFlow(
        'invoiceListByAsn',
        async (...args: Parameters<typeof invoiceSdk.getPOInvoiceASNPage>) => {
            const { data: response } = await invoiceSdk.getPOInvoiceASNPage(...args);
            return response;
        },
    );

    const getInvoiceDetail = autoContextFlow(
        'invoiceDetail',
        async (...args: Parameters<typeof invoiceSdk.detail>) => {
            const { data: res } = await invoiceSdk.detail(...args);
            return res;
        },
    );

    const getUnboundInvoiceCount = autoContextFlow(
        'unboundInvoiceCount',
        async (...args: Parameters<typeof invoiceSdk.countAsn>) => {
            const { data: res } = await invoiceSdk.countAsn(...args);
            return res;
        },
    );

    const getPOInvoiceDueDateGroupPage = autoContextFlow(
        'expectedPaymentList',
        async (...args: Parameters<typeof invoiceSdk.getPOInvoiceDueDateGroupPage>) => {
            const { data: res } = await invoiceSdk.getPOInvoiceDueDateGroupPage(...args);
            return res;
        },
    );

    const invoiceBindAsn = autoContextFlow(
        'invoiceBindAsn',
        async (...args: Parameters<typeof invoiceSdk.bindASN>) => {
            const { data: res } = await invoiceSdk.bindASN(...args);
            return res;
        },
    );

    const ignoreInvoice = autoContextFlow(
        'ignoreInvoice',
        async (...args: Parameters<typeof invoiceSdk.ignore>) => {
            const { data: res } = await invoiceSdk.ignore(...args);
            return res;
        },
    );

    const getPOInvoiceASNPage = autoContextFlow(
        'getPOInvoiceASNPage',
        async (...args: Parameters<typeof invoiceSdk.getPOInvoiceASNPage>) => {
            const { data: res } = await invoiceSdk.getPOInvoiceASNPage(...args);
            return res;
        },
    );

    // syncInvoice
    const syncInvoice = autoContextFlow(
        'syncInvoice',
        async (...args: Parameters<typeof invoiceSdk.syncInvoice>) => {
            const { data: res } = await invoiceSdk.syncInvoice(...args);
            return res;
        },
    );

    const getMissingDetailList = autoContextFlow(
        'financePOInvoiceMissingDetail',
        async (...args: Parameters<typeof invoiceSdk.getFinancePOInvoiceMissingDetail>) => {
            const { data: res } = await invoiceSdk.getFinancePOInvoiceMissingDetail(...args);
            return res;
        },
    );

    const postMissingDetailRemark = autoContextFlow(
        'markMissing',
        async (...args: Parameters<typeof invoiceSdk.markFinancePOInvoiceMissingDetail>) => {
            const { data: res } = await invoiceSdk.markFinancePOInvoiceMissingDetail(...args);
            return res;
        },
    );

    // 未备注的数量
    const noMarkInvoiceCount = autoContextFlow(
        'noMarkInvoiceCount',
        async (...args: Parameters<typeof invoiceSdk.noMarkInvoiceCount>) => {
            const { data: res } = await invoiceSdk.noMarkInvoiceCount(...args);
            return res;
        },
    );

    // 未开票asin数量
    const noCreateAsinCount = autoContextFlow(
        'noCreateAsinCount',
        async (...args: Parameters<typeof invoiceSdk.noCreateAsinCount>) => {
            const { data: res } = await invoiceSdk.noCreateAsinCount(...args);
            return res;
        },
    );

    // 未备注的missing发票数量
    const missingDetailNoMarkInvoiceCount = autoContextFlow(
        'missingDetailNoMarkInvoiceCount',
        async (...args: Parameters<typeof invoiceSdk.missingDetailNoMarkInvoiceCount>) => {
            const { data: res } = await invoiceSdk.missingDetailNoMarkInvoiceCount(...args);
            return res;
        },
    );

    return {
        getInvoiceList,
        getInvoiceListByAsn,
        getInvoiceDetail,
        getUnboundInvoiceCount,
        getPOInvoiceDueDateGroupPage,
        invoiceBindAsn,
        ignoreInvoice,
        getPOInvoiceASNPage,
        syncInvoice,
        getMissingDetailList,
        postMissingDetailRemark,
        noMarkInvoiceCount,
        noCreateAsinCount,
        missingDetailNoMarkInvoiceCount,
    };
});
