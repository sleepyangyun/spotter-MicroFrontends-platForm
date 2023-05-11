import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { financeMonthReconciliationSdk } from '@client/app/services/v2/finance/reconciliation';

export const MonthReconciliationStore = Model({
    name: 'MonthReconciliationStore',
    properties: {
        // invoiceList: WithPaginationUpdateFnModel<typeof invoiceSdk.getPOInvoicePage>().model,
    },
    overridesInitWatcher: {
        createMonthRecon: false,
        exportReconProp: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    // 导出月度对账单
    const exportRecon = autoContextFlow(
        'exportReconProp',
        async (...args: Parameters<typeof financeMonthReconciliationSdk._export>) => {
            const { data: response } = await financeMonthReconciliationSdk._export(...args);
            return response;
        },
    );

    // 修改对账单状态
    const changeStatus = autoContextFlow(
        'changeStatus',
        async (...args: Parameters<typeof financeMonthReconciliationSdk.changeStatus>) => {
            const { data: response } = await financeMonthReconciliationSdk.changeStatus(...args);
            return response;
        },
    );

    // 创建月度对账单
    const createMonthRecon = autoContextFlow(
        'createMonthRecon',
        async (...args: Parameters<typeof financeMonthReconciliationSdk.create>) => {
            const { data: response } = await financeMonthReconciliationSdk.create(...args);
            return response;
        },
    );

    // 生成付款明细
    const genPayment = autoContextFlow(
        'genPayment',
        async (...args: Parameters<typeof financeMonthReconciliationSdk.genPayment>) => {
            const { data: response } = await financeMonthReconciliationSdk.genPayment(...args);
            return response;
        },
    );

    // 预览月度对账单
    const preview = autoContextFlow(
        'preview',
        async (...args: Parameters<typeof financeMonthReconciliationSdk.preview>) => {
            const { data: response } = await financeMonthReconciliationSdk.preview(...args);
            return response;
        },
    );

    // 获取月度对账单详情
    const queryDetail = autoContextFlow(
        'queryDetail',
        async (...args: Parameters<typeof financeMonthReconciliationSdk.queryDetail>) => {
            const { data: response } = await financeMonthReconciliationSdk.queryDetail(...args);
            return response;
        },
    );

    // 分页查询月度对账单
    const queryPage = autoContextFlow(
        'queryPage',
        async (...args: Parameters<typeof financeMonthReconciliationSdk.queryPage>) => {
            const { data: response } = await financeMonthReconciliationSdk.queryPage(...args);
            return response;
        },
    );

    // 撤销月度对账单
    const revoke = autoContextFlow(
        'revoke',
        async (...args: Parameters<typeof financeMonthReconciliationSdk.revoke>) => {
            const { data: response } = await financeMonthReconciliationSdk.revoke(...args);
            return response;
        },
    );

    // 撤销月度对账单
    const getLast = autoContextFlow(
        'getLast',
        async (...args: Parameters<typeof financeMonthReconciliationSdk.getLast>) => {
            const { data: response } = await financeMonthReconciliationSdk.getLast(...args);
            return response;
        },
    );

    // 撤销月度对账单
    const checkRepeat = autoContextFlow(
        'checkRepeat',
        async (...args: Parameters<typeof financeMonthReconciliationSdk.checkRepeat>) => {
            const { data: response } = await financeMonthReconciliationSdk.checkRepeat(...args);
            return response;
        },
    );

    return {
        exportRecon,
        changeStatus,
        createMonthRecon,
        genPayment,
        preview,
        queryDetail,
        queryPage,
        revoke,
        checkRepeat,
        getLast,
    };
});
