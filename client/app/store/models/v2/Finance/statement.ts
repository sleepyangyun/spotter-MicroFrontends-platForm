import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { statementSdk } from '@client/app/services/v2/finance/statement';
import WithPaginationUpdateFnModel from '@client/app/store/infra/WithPaginationUpdateFnModel';
import WithPrimaryUpdateFnModel from '@client/app/store/infra/WithPrimaryUpdateFnModel';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';

export const WarehouseStatementStore = Model({
    name: 'WarehouseStatementStore',
    properties: {
        reconList: WithPaginationUpdateFnModel<typeof statementSdk.pageReconciliation>().model,
        warehouseCount: WithPrimaryUpdateFnModel(<ApiReturnType<typeof statementSdk.countReconciliation>>{}).model,
    },
    overridesInitWatcher: {
        auditReconciliation: false,
        exportReconciliation: false,
        deleteReconciliation: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    // 创建海外仓费用对账单分页查询
    const getReconList = autoContextFlow(
        'reconList',
        async (...args: Parameters<typeof statementSdk.pageReconciliation>) => {
            const { data: response } = await statementSdk.pageReconciliation(...args);
            return response;
        },
    );

    const companyReconciliationGroup = autoContextFlow(
        'companyReconciliationGroup',
        async (...args: Parameters<typeof statementSdk.companyReconciliationGroup>) => {
            const { data: response } = await statementSdk.companyReconciliationGroup(...args);
            return response;
        },
    );

    // 批量审核海外仓费用对账单
    const auditReconciliation = autoContextFlow(
        'auditReconciliation',
        async (...args: Parameters<typeof statementSdk.auditReconciliation>) => {
            const { data: response } = await statementSdk.auditReconciliation(...args);
            return response;
        },
    );

    // 批量审核海外仓费用对账单
    const batchAuditReconciliation = autoContextFlow(
        'batchAuditReconciliation',
        async (...args: Parameters<typeof statementSdk.batchAuditReconciliation>) => {
            const { data: response } = await statementSdk.batchAuditReconciliation(...args);
            return response;
        },
    );
    
    // 查询海外仓对账单的某个状态下的数量
    const countReconciliation = autoContextFlow(
        'warehouseCount',
        async (...args: Parameters<typeof statementSdk.countReconciliation>) => {
            const { data: response } = await statementSdk.countReconciliation(...args);
            return response;
        },
    );

        
    // 仓库费用对账单详情
    const detailReconciliation = autoContextFlow(
        'detailReconciliation',
        async (...args: Parameters<typeof statementSdk.detailReconciliation>) => {
            const { data: response } = await statementSdk.detailReconciliation(...args);
            return response;
        },
    );

    // 海外仓费用对账单生成前的预览
    const previewReconciliation = autoContextFlow(
        'previewReconciliation',
        async (...args: Parameters<typeof statementSdk.previewReconciliation>) => {
            const { data: response } = await statementSdk.previewReconciliation(...args);
            return response;
        },
    );

    // 创建海外仓费用对账单
    const createReconciliation = autoContextFlow(
        'createReconciliation',
        async (...args: Parameters<typeof statementSdk.createReconciliation>) => {
            const { data: response } = await statementSdk.createReconciliation(...args);
            return response;
        },
    );

    // 导出海外仓费用对账单excel
    const exportReconciliation = autoContextFlow(
        'exportReconciliation',
        async (...args: Parameters<typeof statementSdk.exportReconciliation>) => {
            const { data: response } = await statementSdk.exportReconciliation(...args);
            return response;
        },
    );

    // 撤销海外仓费用对账单
    const deleteReconciliation = autoContextFlow(
        'deleteReconciliation',
        async (...args: Parameters<typeof statementSdk.deleteReconciliation>) => {
            const { data: response } = await statementSdk.deleteReconciliation(...args);
            return response;
        },
    );

    // 对账单创建者列表（财务经理+财务助理+财务会计）
    const reconCreatorList = autoContextFlow(
        'reconCreatorList',
        async (...args: Parameters<typeof statementSdk.reconCreatorList>) => {
            const { data: response } = await statementSdk.reconCreatorList(...args);
            return response;
        },
    );


    return {
        getReconList,
        companyReconciliationGroup,
        batchAuditReconciliation,
        countReconciliation,
        detailReconciliation,
        previewReconciliation,
        createReconciliation,
        exportReconciliation,
        deleteReconciliation,
        auditReconciliation,
        reconCreatorList
    };
});
