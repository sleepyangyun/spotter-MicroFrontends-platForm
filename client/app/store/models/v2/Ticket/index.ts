import Model from '@app/store/infra/Model';
import WithPaginationUpdateFnModel from '@app/store/infra/WithPaginationUpdateFnModel';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { supportCertificationSdk, supportSdk } from '@app/services/v2/support'; // 新版本
import { catalogSdk } from '@app/services/v2/items/productPackagingCertification';
import WithPrimaryUpdateFnModel from '@app/store/infra/WithPrimaryUpdateFnModel';
import { aPlusContentSdk } from '@app/services/v2/items/aPlusContent';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';

export const TicketStore = Model({
    name: 'TicketStore',
    properties: {
        ticketList: WithPaginationUpdateFnModel<typeof supportSdk.getPageWithParams>().model,
        todoTicketList:
            WithPaginationUpdateFnModel<typeof supportSdk.getConsultingTicketDivertMe>().model,
        ticketCategoryList: WithPrimaryUpdateFnModel(
            <ApiReturnType<typeof supportSdk.getTicketCategoryList>>[],
        ).model,
        ticket: WithPrimaryUpdateFnModel(<ApiReturnType<typeof supportSdk.getConsultingTicket>>{})
            .model,
        aPlusContentList:
            WithPaginationUpdateFnModel<typeof aPlusContentSdk.pageAPlusTicket>().model,
        aPlusListDiverted: WithPaginationUpdateFnModel<typeof aPlusContentSdk.pageDiverted>().model,
        certificationTicketConfigList: WithPrimaryUpdateFnModel<
            typeof supportCertificationSdk.getCertificationTicketConfig
        >([]).model,
    },
    overridesInitWatcher: {
        createTicket: false,
        addSupportTicketComment: false,
        transferTicket: false,
        createTicketCategory: false,
        deleteTicketCategory: false,
        updateTicketCategory: false,
        updateTicketStatus: false,
        updateTicketProcessorStatus: false,
        transferCertificationTicketListUsers: false,
        updateTicketNote: false,
        getAplusContentList: false,
        updateAplusProcessUser: false,
        getListTicketNo: false,
        getAplusContentDetail: false,
        submitAplusFirstAudit: false,
        divertAplusTicket: false,
        acceptAplusTicket: false,
        getAPlusTicketConfig: false,
        amazonAudit: false,
        addOrUpdateCertificationConfig: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    const getTicketList = autoContextFlow(
        'ticketList',
        async (...args: Parameters<typeof supportSdk.getPageWithParams>) => {
            const { data: res } = await supportSdk.getPageWithParams(...args);
            return res;
        },
    );

    const getTicket = autoContextFlow(
        'ticket',
        async (...args: Parameters<typeof supportSdk.getConsultingTicket>) => {
            const { data: res } = await supportSdk.getConsultingTicket(...args);
            return res;
        },
    );

    const getTicketCategoryList = autoContextFlow(
        'ticketCategoryList',
        async (...args: Parameters<typeof supportSdk.getTicketCategoryList>) => {
            const { data: res } = await supportSdk.getTicketCategoryList(...args);
            return res;
        },
    );

    const addSupportTicketComment = autoContextFlow(
        'addSupportTicketComment',
        async (...args: Parameters<typeof supportSdk.comment>) => {
            const { data: res } = await supportSdk.comment(...args);
            return res;
        },
    );

    const getTodoTicketList = autoContextFlow(
        'todoTicketList',
        async (...args: Parameters<typeof supportSdk.getConsultingTicketDivertMe>) => {
            const { data: res } = await supportSdk.getConsultingTicketDivertMe(...args);
            return res;
        },
    );

    const transferTicket = autoContextFlow(
        'transferTicket',
        async (...args: Parameters<typeof supportSdk.divertConsultingTicket>) => {
            const { data: res } = await supportSdk.divertConsultingTicket(...args);
            return res;
        },
    );

    const createTicketCategory = autoContextFlow(
        'createTicketCategory',
        async (...args: Parameters<typeof supportSdk.addTicketCategory>) => {
            const { data: res } = await supportSdk.addTicketCategory(...args);
            return res;
        },
    );

    const deleteTicketCategory = autoContextFlow(
        'deleteTicketCategory',
        async (...args: Parameters<typeof supportSdk.deleteById>) => {
            const { data: res } = await supportSdk.deleteById(...args);
            return res;
        },
    );

    const updateTicketCategory = autoContextFlow(
        'updateTicketCategory',
        async (...args: Parameters<typeof supportSdk.updateById>) => {
            const { data: res } = await supportSdk.updateById(...args);
            return res;
        },
    );

    const updateTicketProcessorStatus = autoContextFlow(
        'updateTicketProcessorStatus',
        async (...args: Parameters<typeof supportSdk.accept>) => {
            const { data: res } = await supportSdk.accept(...args);
            return res;
        },
    );

    const updateTicketStatus = autoContextFlow(
        'updateTicketStatus',
        async (...args: Parameters<typeof supportSdk.confirm>) => {
            const { data: res } = await supportSdk.confirm(...args);
            return res;
        },
    );
    // 认证类工单-全部工单
    const getAllCertificationTicketList = autoContextFlow(
        'certificationTicketList',
        async (...args: Parameters<typeof supportCertificationSdk.list>) => {
            const { data: res } = await supportCertificationSdk.list(...args);
            return res;
        },
    );
    // 认证类工单-工单详情
    const getCertificationTicketDetail = autoContextFlow(
        'certificationTicketDetail',
        async (...args: Parameters<typeof supportCertificationSdk.detail>) => {
            const { data: res } = await supportCertificationSdk.detail(...args);
            return res;
        },
    );
    // 认证类工单-工单需我受理
    const getMyCertificationTicketList = autoContextFlow(
        'myCertificationTicketList',
        async (...args: Parameters<typeof supportCertificationSdk.listMe>) => {
            const { data: res } = await supportCertificationSdk.listMe(...args);
            return res;
        },
    );

    // 添加认证类工单配置
    const addOrUpdateCertificationConfig = autoContextFlow(
        'addOrUpdateCertificationConfig',
        async (
            ...args: Parameters<typeof supportCertificationSdk.addOrUpdateCertificationConfig>
        ) => {
            const { data: res } = await supportCertificationSdk.addOrUpdateCertificationConfig(
                ...args,
            );
            return res;
        },
    );

    // 获取认证类工单配置列表
    const getCertificationTicketConfigList = autoContextFlow(
        'certificationTicketConfigList',
        async (
            ...args: Parameters<typeof supportCertificationSdk.getCertificationTicketConfig>
        ) => {
            const { data: res } = await supportCertificationSdk.getCertificationTicketConfig(
                ...args,
            );
            return res;
        },
    );

    // 产品包装认证-产品线列表
    const getProductPackageList = autoContextFlow(
        'myCertificationTicketList',
        async (...args: Parameters<typeof catalogSdk.packageLineList>) => {
            const { data: res } = await catalogSdk.packageLineList(...args);
            return res;
        },
    );
    // 产品包装认证-转移
    const transferCertificationTicketListUsers = autoContextFlow(
        'transferCertificationTicketListUsers',
        async (...args: Parameters<typeof supportCertificationSdk.transferUsers>) => {
            const { data: res } = await supportCertificationSdk.transferUsers(...args);
            return res;
        },
    );
    // 产品包装认证提交Gmesh审核
    const submitGmeshReview = autoContextFlow(
        'submitGmeshReview',
        async (...args: Parameters<typeof supportCertificationSdk.approveStepOne>) => {
            const { data: res } = await supportCertificationSdk.approveStepOne(...args);
            return res;
        },
    );
    // 产品包装认证提交Gmesh审核
    const submitAmazonReview = autoContextFlow(
        'submitAmazonReview',
        async (...args: Parameters<typeof supportCertificationSdk.approveStepTwo>) => {
            const { data: res } = await supportCertificationSdk.approveStepTwo(...args);
            return res;
        },
    );
    // 受理产品包装认证
    const acceptCertificationTicket = autoContextFlow(
        'acceptCertificationTicket',
        async (...args: Parameters<typeof supportCertificationSdk.accept>) => {
            const { data: res } = await supportCertificationSdk.accept(...args);
            return res;
        },
    );

    const updateTicketNote = autoContextFlow(
        'updateTicketNote',
        async (...args: Parameters<typeof supportSdk.remark>) => {
            const { data: res } = await supportSdk.remark(...args);
            return res;
        },
    );

    // A+内容 工单列表
    const getAplusContentList = autoContextFlow(
        'aPlusContentList',
        async (...args: Parameters<typeof aPlusContentSdk.pageAPlusTicket>) => {
            const { data: res } = await aPlusContentSdk.pageAPlusTicket(...args);
            return res;
        },
    );

    // 获取A+工单配置
    const getAPlusTicketConfig = autoContextFlow(
        'getAPlusTicketConfig',
        async (...args: Parameters<typeof aPlusContentSdk.getAPlusTicketConfig>) => {
            const { data: res } = await aPlusContentSdk.getAPlusTicketConfig(...args);
            return res;
        },
    );

    // A+工单处理人配置
    const updateAplusProcessUser = autoContextFlow(
        'updateAplusProcessUser',
        async (...args: Parameters<typeof aPlusContentSdk.addOrUpdateAPlusConfig>) => {
            const { data: res } = await aPlusContentSdk.addOrUpdateAPlusConfig(...args);
            return res;
        },
    );

    // 获取工单编号列表
    const getListTicketNo = autoContextFlow(
        'listTicketNo',
        async (...args: Parameters<typeof aPlusContentSdk.listTicketNo>) => {
            const { data: res } = await aPlusContentSdk.listTicketNo(...args);
            return res;
        },
    );

    // 获取A+工单列表中我待办的
    const getMyTodoTicketList = autoContextFlow(
        'aPlusListDiverted',
        async (...args: Parameters<typeof aPlusContentSdk.pageDiverted>) => {
            const { data: res } = await aPlusContentSdk.pageDiverted(...args);
            return res;
        },
    );

    // 获取A+工单详情
    const getAplusContentDetail = autoContextFlow(
        'getAplusContentDetail',
        async (...args: Parameters<typeof aPlusContentSdk.getAPlusTicketDetail>) => {
            const { data: res } = await aPlusContentSdk.getAPlusTicketDetail(...args);
            return res;
        },
    );

    // A+初审提交
    const submitAplusFirstAudit = autoContextFlow(
        'submitAplusFirstAudit',
        async (...args: Parameters<typeof aPlusContentSdk.firstAudit>) => {
            const { data: res } = await aPlusContentSdk.firstAudit(...args);
            return res;
        },
    );

    // A+工单亚马逊审核提交
    const amazonAudit = autoContextFlow(
        'amazonAudit',
        async (...args: Parameters<typeof aPlusContentSdk.amazonAudit>) => {
            const { data: res } = await aPlusContentSdk.amazonAudit(...args);
            return res;
        },
    );

    // A+工单转移
    const divertAplusTicket = autoContextFlow(
        'divertAplusTicket',
        async (...args: Parameters<typeof aPlusContentSdk.divert>) => {
            const { data: res } = await aPlusContentSdk.divert(...args);
            return res;
        },
    );

    // A+工单接受
    const acceptAplusTicket = autoContextFlow(
        'acceptAplusTicket',
        async (...args: Parameters<typeof aPlusContentSdk.accept>) => {
            const { data: res } = await aPlusContentSdk.accept(...args);
            return res;
        },
    );

    return {
        getTicketList,
        getTicket,
        getTicketCategoryList,
        addSupportTicketComment,
        getTodoTicketList,
        transferTicket,
        createTicketCategory,
        deleteTicketCategory,
        updateTicketCategory,
        updateTicketStatus,
        updateTicketProcessorStatus,
        getAllCertificationTicketList,
        getCertificationTicketDetail,
        getMyCertificationTicketList,
        getProductPackageList,
        transferCertificationTicketListUsers,
        submitGmeshReview,
        submitAmazonReview,
        acceptCertificationTicket,
        updateTicketNote,
        getAplusContentList,
        updateAplusProcessUser,
        getListTicketNo,
        getMyTodoTicketList,
        getAplusContentDetail,
        submitAplusFirstAudit,
        amazonAudit,
        divertAplusTicket,
        acceptAplusTicket,
        getAPlusTicketConfig,
        getCertificationTicketConfigList,
        addOrUpdateCertificationConfig,
    };
});
