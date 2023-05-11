import Model from '@app/store/infra/Model';
import WithPaginationUpdateFnModel from '@app/store/infra/WithPaginationUpdateFnModel';
import { types } from 'mobx-state-tree';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { businessAgreementSdk } from '@app/services/v2/business/agreement';
import { ApiPaginationReturnType, ApiReturnType } from '@spotter/gmesh-api-sdk';
import WithPrimaryUpdateFnModel from '@client/app/store/infra/WithPrimaryUpdateFnModel';

const BusinessAgreementStore = Model({
    name: 'BusinessAgreementStore',
    properties: {
        agreementSummaryList: WithPaginationUpdateFnModel(
            types.frozen<ApiPaginationReturnType<typeof businessAgreementSdk.agreementSummary>>(),
        ).model,
        auditTodoStatistics: WithPrimaryUpdateFnModel<
            typeof businessAgreementSdk.auditTodoStatistics
        >(<ApiReturnType<typeof businessAgreementSdk.auditTodoStatistics>>{}).model,
        productSummary: WithPrimaryUpdateFnModel<typeof businessAgreementSdk.productSummary>(
            <ApiReturnType<typeof businessAgreementSdk.productSummary>>{},
        ).model,
        storageAgreementDetail: WithPrimaryUpdateFnModel<
            typeof businessAgreementSdk.storageAgreementDetail
        >(<ApiReturnType<typeof businessAgreementSdk.storageAgreementDetail>>{}).model,
        operatingAuditTodoPageList: WithPaginationUpdateFnModel(
            types.frozen<
                ApiPaginationReturnType<typeof businessAgreementSdk.operatingAuditTodos>
            >(),
        ).model,
        vcAgreementDetail: WithPrimaryUpdateFnModel<typeof businessAgreementSdk.vcAgreementDetail>(
            <ApiReturnType<typeof businessAgreementSdk.vcAgreementDetail>>{},
        ).model,
        vcAuditDetail: WithPrimaryUpdateFnModel<typeof businessAgreementSdk.vcAuditDetail>(
            <ApiReturnType<typeof businessAgreementSdk.vcAuditDetail>>{},
        ).model,
        msrpAdjustTodoPageList: WithPaginationUpdateFnModel(
            types.frozen<ApiPaginationReturnType<typeof businessAgreementSdk.msrpAdjustTodos>>(),
        ).model,
        // getAuditFinishPageList: WithPaginationUpdateFnModel(
        //     types.frozen<ApiPaginationReturnType<typeof businessAgreementSdk.auditFinish>>(),
        // ).model,
    },
    overridesInitWatcher: {
        vcActualQuotationCal: false,
        vcActualQuotationCalSave: false,
        vcFirstApproval: false,
        vcMsrpAdjustApproval: false,
        vcResetAssignee: false,
        vcSecondApproval: false,
        vcSpotterOfferCalSave: false,
        vcThirdApproval: false,
        operatingReject: false,
        updateNeedBatchNo: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);
    // 协议概览（gmesh）
    const getAgreementSummaryList = autoContextFlow(
        'agreementSummaryList',
        async (...args: Parameters<typeof businessAgreementSdk.agreementSummary>) => {
            const { data: response } = await businessAgreementSdk.agreementSummary(...args);
            return response;
        },
    );
    // 获取待办统计
    const getAuditTodoStatistics = autoContextFlow(
        'auditTodoStatistics',
        async (...args: Parameters<typeof businessAgreementSdk.auditTodoStatistics>) => {
            const { data: response } = await businessAgreementSdk.auditTodoStatistics(...args);
            return response;
        },
    );
    // 产品关联报价协议列表
    const getProductSummaryList = autoContextFlow(
        'productSummary',
        async (...args: Parameters<typeof businessAgreementSdk.productSummary>) => {
            const { data: response } = await businessAgreementSdk.productSummary(...args);
            return response;
        },
    );
    // 仓储报价协议详情
    const getStorageAgreementDetail = autoContextFlow(
        'storageAgreementDetail',
        async (...args: Parameters<typeof businessAgreementSdk.storageAgreementDetail>) => {
            const { data: response } = await businessAgreementSdk.storageAgreementDetail(...args);
            return response;
        },
    );
    // 获取待审核vc报价列表(一二三级审核)
    const getOperatingAuditTodoPageList = autoContextFlow(
        'operatingAuditTodoPageList',
        async (...args: Parameters<typeof businessAgreementSdk.operatingAuditTodos>) => {
            const { data: response } = await businessAgreementSdk.operatingAuditTodos(...args);
            return response;
        },
    );
    // VC协议审核-亚马逊实际报价计算,不存储
    const vcActualQuotationCal = autoContextFlow(
        'vcActualQuotationCal',
        async (...args: Parameters<typeof businessAgreementSdk.vcActualQuotationCal>) => {
            const { data: response } = await businessAgreementSdk.vcActualQuotationCal(...args);
            return response;
        },
    );
    // VC协议审核-亚马逊实际报价计算并更新结果
    const vcActualQuotationCalSave = autoContextFlow(
        'vcActualQuotationCalSave',
        async (...args: Parameters<typeof businessAgreementSdk.vcActualQuotationCalSave>) => {
            const { data: response } = await businessAgreementSdk.vcActualQuotationCalSave(...args);
            return response;
        },
    );
    // VC报价协议详情
    const getVcAgreementDetail = autoContextFlow(
        'vcAgreementDetail',
        async (...args: Parameters<typeof businessAgreementSdk.vcAgreementDetail>) => {
            const { data: response } = await businessAgreementSdk.vcAgreementDetail(...args);
            return response;
        },
    );
    // VC报价审核详情
    const getVcAuditDetail = autoContextFlow(
        'vcAuditDetail',
        async (...args: Parameters<typeof businessAgreementSdk.vcAuditDetail>) => {
            const { data: response } = await businessAgreementSdk.vcAuditDetail(...args);
            return response;
        },
    );
    //  VC报价审核不通过(一二三级+调价)
    const operatingReject = autoContextFlow(
        'operatingReject',
        async (...args: Parameters<typeof businessAgreementSdk.operatingReject>) => {
            const { data: response } = await businessAgreementSdk.operatingReject(...args);
            return response;
        },
    );
    // VC报价一级审核通过
    const vcFirstApproval = autoContextFlow(
        'vcFirstApproval',
        async (...args: Parameters<typeof businessAgreementSdk.vcFirstApproval>) => {
            const { data: response } = await businessAgreementSdk.vcFirstApproval(...args);
            return response;
        },
    );
    // VC报价调价通过
    const vcMsrpAdjustApproval = autoContextFlow(
        'vcMsrpAdjustApproval',
        async (...args: Parameters<typeof businessAgreementSdk.vcMsrpAdjustApproval>) => {
            const { data: response } = await businessAgreementSdk.vcMsrpAdjustApproval(...args);
            return response;
        },
    );
    // 重新指定任务处理人
    const vcResetAssignee = autoContextFlow(
        'vcResetAssignee',
        async (...args: Parameters<typeof businessAgreementSdk.vcResetAssignee>) => {
            const { data: response } = await businessAgreementSdk.vcResetAssignee(...args);
            return response;
        },
    );
    // VC报价二级审核通过
    const vcSecondApproval = autoContextFlow(
        'vcSecondApproval',
        async (...args: Parameters<typeof businessAgreementSdk.vcSecondApproval>) => {
            const { data: response } = await businessAgreementSdk.vcSecondApproval(...args);
            return response;
        },
    );
    // VC协议审核-Spotter VC报价计算并更新结果
    const vcSpotterOfferCalSave = autoContextFlow(
        'vcSpotterOfferCalSave',
        async (...args: Parameters<typeof businessAgreementSdk.vcSpotterOfferCalSave>) => {
            const { data: response } = await businessAgreementSdk.vcSpotterOfferCalSave(...args);
            return response;
        },
    );
    // VC报价三级审核通过
    const vcThirdApproval = autoContextFlow(
        'vcThirdApproval',
        async (...args: Parameters<typeof businessAgreementSdk.vcThirdApproval>) => {
            const { data: response } = await businessAgreementSdk.vcThirdApproval(...args);
            return response;
        },
    );
    // VC协议审核-获取待调价VC协议列表
    const getMsrpAdjustTodoPageList = autoContextFlow(
        'msrpAdjustTodoPageList',
        async (...args: Parameters<typeof businessAgreementSdk.msrpAdjustTodos>) => {
            const { data: response } = await businessAgreementSdk.msrpAdjustTodos(...args);
            return response;
        },
    );
    //  VC协议审核-已审核报价协议列表
    const getAuditFinishPageList = autoContextFlow(
        'auditFinishPageList',
        async (...args: Parameters<typeof businessAgreementSdk.auditFinish>) => {
            const { data: response } = await businessAgreementSdk.auditFinish(...args);
            return response;
        },
    );
    // VC协议审核-批量拒绝（1，2，3级审核）
    const batchReject = autoContextFlow(
        'batchReject',
        async (...args: Parameters<typeof businessAgreementSdk.vcFirstBatchReject>) => {
            const { data: response } = await businessAgreementSdk.vcFirstBatchReject(...args);
            return response;
        },
    );
    // VC报价一级审核批量通过
    const firstBatchApproval = autoContextFlow(
        'firstBatchApproval',
        async (...args: Parameters<typeof businessAgreementSdk.vcFirstBatchApproval>) => {
            const { data: response } = await businessAgreementSdk.vcFirstBatchApproval(...args);
            return response;
        },
    );
    //  VC报价二级审核批量通过
    const secondBatchApproval = autoContextFlow(
        'secondBatchApproval',
        async (...args: Parameters<typeof businessAgreementSdk.vcSecondBatchApproval>) => {
            const { data: response } = await businessAgreementSdk.vcSecondBatchApproval(...args);
            return response;
        },
    );
    //  VC报价二级审核批量通过
    const thirdBatchApproval = autoContextFlow(
        'thirdBatchApproval',
        async (...args: Parameters<typeof businessAgreementSdk.vcThirdBatchApproval>) => {
            const { data: response } = await businessAgreementSdk.vcThirdBatchApproval(...args);
            return response;
        },
    );
    // VC协议审核-待客户确认报价协议列表
    const auditToBeConfirm = autoContextFlow(
        'auditToBeConfirm',
        async (...args: Parameters<typeof businessAgreementSdk.auditToBeConfirm>) => {
            const { data: response } = await businessAgreementSdk.auditToBeConfirm(...args);
            return response;
        },
    );

    // 修改报价协议生效时间
    const updateActiveTime = autoContextFlow(
        'updateActiveTime',
        async (...args: Parameters<typeof businessAgreementSdk.updateActiveTime>) => {
            const { data: response } = await businessAgreementSdk.updateActiveTime(...args);
            return response;
        },
    );

    // VC报价调价批量通过
    const adjustBatchApproval = autoContextFlow(
        'adjustBatchApproval',
        async (...args: Parameters<typeof businessAgreementSdk.vcMsrpAdjustBatchApproval>) => {
            const { data: response } = await businessAgreementSdk.vcMsrpAdjustBatchApproval(
                ...args,
            );
            return response;
        },
    );

    // VC协议审核-修改是否需要提供有效期
    const updateNeedBatchNo = autoContextFlow(
        'updateNeedBatchNo',
        async (...args: Parameters<typeof businessAgreementSdk.updateNeedBatchNo>) => {
            const { data: response } = await businessAgreementSdk.updateNeedBatchNo(...args);
            return response;
        },
    );
    return {
        getAgreementSummaryList,
        getAuditTodoStatistics,
        getProductSummaryList,
        getStorageAgreementDetail,
        getOperatingAuditTodoPageList,
        vcActualQuotationCal,
        vcActualQuotationCalSave,
        getVcAgreementDetail,
        getVcAuditDetail,
        vcFirstApproval,
        vcMsrpAdjustApproval,
        vcResetAssignee,
        vcSecondApproval,
        vcSpotterOfferCalSave,
        vcThirdApproval,
        getMsrpAdjustTodoPageList,
        getAuditFinishPageList,
        operatingReject,
        batchReject,
        firstBatchApproval,
        secondBatchApproval,
        thirdBatchApproval,
        auditToBeConfirm,
        updateActiveTime,
        adjustBatchApproval,
        updateNeedBatchNo,
    };
});

export default BusinessAgreementStore;
