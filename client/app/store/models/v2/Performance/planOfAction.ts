import Model from '@app/store/infra/Model';
import WithPaginationUpdateFnModel from '@app/store/infra/WithPaginationUpdateFnModel';
import WithPrimaryUpdateFnModel from '@app/store/infra/WithPrimaryUpdateFnModel';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { types } from 'mobx-state-tree';
import { ApiPaginationReturnType, ApiReturnType } from '@spotter/gmesh-api-sdk';
import { planOfActionSdk } from '@client/app/services/v2/performance/planOfAction';

export const PlanOfActionStore = Model({
    name: 'PlanOfActionStore',
    properties: {
        planOfActionList: WithPaginationUpdateFnModel(
            types.frozen<ApiPaginationReturnType<typeof planOfActionSdk.gPOASearch>>(),
        ).model,
        planOfActionDetail: WithPrimaryUpdateFnModel(
            {} as ApiReturnType<typeof planOfActionSdk.gDetail>,
        ).model,
        replyTemplate: WithPrimaryUpdateFnModel(
            {} as ApiReturnType<typeof planOfActionSdk.findTemplateById>,
        ).model,
        planOfActionReplyDetail: WithPrimaryUpdateFnModel(
            {} as ApiReturnType<typeof planOfActionSdk.gReplyDetail>,
        ).model,
    },
    overridesInitWatcher: {
        sendPlanOfActionEmail: false,
        recallPlanOfAction: false,
        createPlanOfAction: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);
    // gmeshPOA列表
    const getPlanOfActionList = autoContextFlow(
        'planOfActionList',
        async (...args: Parameters<typeof planOfActionSdk.gPOASearch>) => {
            const { data: response } = await planOfActionSdk.gPOASearch(...args);
            return response;
        },
    );

    // poa详情（gmesh）
    const getPlanOfActionDetail = autoContextFlow(
        'planOfActionDetail',
        async (...args: Parameters<typeof planOfActionSdk.gDetail>) => {
            const { data: response } = await planOfActionSdk.gDetail(...args);
            return response;
        },
    );
    //  poa客户回复详情（gmesh）
    const getPlanOfActionReplyDetail = autoContextFlow(
        'planOfActionReplyDetail',
        async (...args: Parameters<typeof planOfActionSdk.gReplyDetail>) => {
            const { data: response } = await planOfActionSdk.gReplyDetail(...args);
            return response;
        },
    );
    // gmesh发送邮件
    const sendPlanOfActionEmail = autoContextFlow(
        'sendPlanOfActionEmail',
        async (...args: Parameters<typeof planOfActionSdk.gSendPOAMail>) => {
            const { data: response } = await planOfActionSdk.gSendPOAMail(...args);
            return response;
        },
    );

    // 撤回poa
    const recallPlanOfAction = autoContextFlow(
        'recallPlanOfAction',
        async (...args: Parameters<typeof planOfActionSdk.recall>) => {
            const { data: response } = await planOfActionSdk.recall(...args);
            return response;
        },
    );
    // 新建POA(gmesh)
    const createPlanOfAction = autoContextFlow(
        'createPlanOfAction',
        async (...args: Parameters<typeof planOfActionSdk.save>) => {
            const { data: response } = await planOfActionSdk.save(...args);
            return response;
        },
    );
    // 修改Poa正文回复模版(gmesh)
    const updateReplyTemplate = autoContextFlow(
        'updateReplyTemplate',
        async (...args: Parameters<typeof planOfActionSdk.templateUpdate>) => {
            const { data: response } = await planOfActionSdk.templateUpdate(...args);
            return response;
        },
    );
    // 根据id查找模版
    const findReplyTemplateById = autoContextFlow(
        'replyTemplate',
        async (...args: Parameters<typeof planOfActionSdk.findTemplateById>) => {
            const { data: response } = await planOfActionSdk.findTemplateById(...args);
            return response;
        },
    );
    // 判断当前ticketId是否重复
    const vlidateTicketId = autoContextFlow(
        'vlidateTicketId',
        async (...args: Parameters<typeof planOfActionSdk.exist>) => {
            const { data: response } = await planOfActionSdk.exist(...args);
            return response;
        },
    );
    // 根据asin模糊查询产品，查询所有公司(gmesh)
    const searchInfoByAsin = autoContextFlow(
        'searchInfoByAsin',
        async (...args: Parameters<typeof planOfActionSdk.gAsinFuzzyPageSearch>) => {
            const { data: response } = await planOfActionSdk.gAsinFuzzyPageSearch(...args);
            return response;
        },
    );
    return {
        getPlanOfActionList,
        getPlanOfActionDetail,
        recallPlanOfAction,
        sendPlanOfActionEmail,
        createPlanOfAction,
        getPlanOfActionReplyDetail,
        updateReplyTemplate,
        findReplyTemplateById,
        vlidateTicketId,
        searchInfoByAsin,
    };
});
