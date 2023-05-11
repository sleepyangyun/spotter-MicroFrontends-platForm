import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import {
    inboxTaskServiceSdk,
    messageInboxDailySdk,
    messageTemplateSdk,
    messageTypeSdk,
    messageVarSdk,
} from '@client/app/services/v2/message';
import { sendMessageSdk } from '@client/app/services/v2/message/sendMessage';
import { snapshotSdk } from '@client/app/services/v2/message/snapshot';
import WithPaginationUpdateFnModel from '@client/app/store/infra/WithPaginationUpdateFnModel';
import WithPrimaryUpdateFnModel from '@client/app/store/infra/WithPrimaryUpdateFnModel';
import { ApiPaginationReturnType } from '@spotter/gmesh-api-sdk';
import { types } from 'mobx-state-tree';
import { TemplateDetailModel } from './Models/Template';
import { MessageTypeTreeVOModel } from './Models/Type';
import { MessageVarDetailModel } from './Models/Variable';

export const MessageStore = Model({
    name: 'messageStore',
    properties: {
        variableList: WithPrimaryUpdateFnModel<typeof messageVarSdk.query>([]).model,
        variableDetail: WithPrimaryUpdateFnModel({} as MessageVarDetailModel).model,
        messageTypeList: WithPrimaryUpdateFnModel([] as MessageTypeTreeVOModel).model,
        templateDetail: WithPrimaryUpdateFnModel({} as TemplateDetailModel).model,
        templateList: WithPaginationUpdateFnModel(
            types.frozen<ApiPaginationReturnType<typeof messageTemplateSdk.queryPage>>(),
        ).model,
        messagePageList: WithPaginationUpdateFnModel(
            types.frozen<ApiPaginationReturnType<typeof inboxTaskServiceSdk.queryPage>>(),
        ).model,
    },
    overridesInitWatcher: {
        createVar: false,
        templateDetail: false,
        messageTypeList: false,
        variableList: false,
        createTemplate: false,
        changeStatus: false,
        checkTemplate: false,
        copyTemplate: false,
        submitAudit: false,
        templateList: false,
        messagePageList: false,
        cancelTimingSend: false,
        messageDetail: false,
        sendMessage: false,
        updateVar: false,
        previewMessage: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);
    const selfContextFlow = generateAutoContextFlowWithSelf(self, false);

    // 删除变量
    const deleteVariable = autoContextFlow(
        'delVariable',
        async (...args: Parameters<typeof messageVarSdk._delete>) => {
            const { data: res } = await messageVarSdk._delete(...args);
            return res;
        },
    );

    // 创建变量
    const createVariable = autoContextFlow(
        'createVar',
        async (...args: Parameters<typeof messageVarSdk.create>) => {
            const { data: res } = await messageVarSdk.create(...args);
            return res;
        },
    );

    // 查询变量
    const queryVariable = autoContextFlow(
        'variableList',
        async (...args: Parameters<typeof messageVarSdk.query>) => {
            const { data: res } = await messageVarSdk.query(...args);
            return res;
        },
    );

    // 分页查询变量
    const queryVariablePage = autoContextFlow(
        'queryVarPage',
        async (...args: Parameters<typeof messageVarSdk.queryPage>) => {
            const { data: res } = await messageVarSdk.queryPage(...args);
            return res;
        },
    );

    // 更新变量
    const updateVariable = autoContextFlow(
        'updateVar',
        async (...args: Parameters<typeof messageVarSdk.update>) => {
            const { data: res } = await messageVarSdk.update(...args);
            return res;
        },
    );

    // 根据id获取变量详情
    const getVariableDetail = autoContextFlow(
        'variableDetail',
        async (...args: Parameters<typeof messageVarSdk.queryById>) => {
            const { data: res } = await messageVarSdk.queryById(...args);
            return res;
        },
    );

    // 创建模板
    const createTemplate = autoContextFlow(
        'createTemplate',
        async (...args: Parameters<typeof messageTemplateSdk.create>) => {
            const { data: res } = await messageTemplateSdk.create(...args);
            return res;
        },
    );

    // 更新模板
    const updateTemplate = autoContextFlow(
        'updateTemplate',
        async (...args: Parameters<typeof messageTemplateSdk.update>) => {
            const { data: res } = await messageTemplateSdk.update(...args);
            return res;
        },
    );

    // 删除模板
    const deleteTemplate = autoContextFlow(
        'delTemplate',
        async (...args: Parameters<typeof messageTemplateSdk._delete>) => {
            const { data: res } = await messageTemplateSdk._delete(...args);
            return res;
        },
    );

    // 审核模板
    const checkTemplate = autoContextFlow(
        'checkTemplate',
        async (...args: Parameters<typeof messageTemplateSdk.audit>) => {
            const { data: res } = await messageTemplateSdk.audit(...args);
            return res;
        },
    );

    // 启用禁用模板
    const updateTemplateStatus = autoContextFlow(
        'changeStatus',
        async (...args: Parameters<typeof messageTemplateSdk.enable>) => {
            const { data: res } = await messageTemplateSdk.enable(...args);
            return res;
        },
    );

    // 模板复制
    const copyTemplate = autoContextFlow(
        'copyTemplate',
        async (...args: Parameters<typeof messageTemplateSdk.copy>) => {
            const { data: res } = await messageTemplateSdk.copy(...args);
            return res;
        },
    );

    // 分页查询模板
    const queryPageTemplate = autoContextFlow(
        'templateList',
        async (...args: Parameters<typeof messageTemplateSdk.queryPage>) => {
            const { data: res } = await messageTemplateSdk.queryPage(...args);
            return res;
        },
    );

    // 获取模板详情
    const getTemplateDetail = autoContextFlow(
        'templateDetail',
        async (...args: Parameters<typeof messageTemplateSdk.detail>) => {
            const { data: res } = await messageTemplateSdk.detail(...args);
            return res;
        },
    );

    // 消息类型分页查询
    const getPageMessageType = autoContextFlow(
        'messageTypePage',
        async (...args: Parameters<typeof messageTypeSdk.queryPage>) => {
            const { data: res } = await messageTypeSdk.queryPage(...args);
            return res;
        },
    );

    // 消息类型查询
    const getMessageType = autoContextFlow(
        'messageTypeList',
        async (...args: Parameters<typeof messageTypeSdk.query>) => {
            const { data: res } = await messageTypeSdk.query(...args);
            return res;
        },
    );

    // 消息类型删除
    const deleteMessageType = selfContextFlow(
        'delMessageType',
        async (...args: Parameters<typeof messageTypeSdk._delete>) => {
            const { data: res } = await messageTypeSdk._delete(...args);
            return res;
        },
    );

    // 消息类型创建
    const createMessageType = selfContextFlow(
        'createMessageType',
        async (...args: Parameters<typeof messageTypeSdk.create>) => {
            const { data: res } = await messageTypeSdk.create(...args);
            return res;
        },
    );

    // 消息类型更新
    const updateMessageType = selfContextFlow(
        'updateMessageType',
        async (...args: Parameters<typeof messageTypeSdk.update>) => {
            const { data: res } = await messageTypeSdk.update(...args);
            return res;
        },
    );

    // 试发一封
    const trySendMessage = selfContextFlow(
        'trySendMessage',
        async (...args: Parameters<typeof sendMessageSdk.trySendInboxAsync>) => {
            const { data: res } = await sendMessageSdk.trySendInboxAsync(...args);
            return res;
        },
    );

    // 预览
    const previewMessage = selfContextFlow(
        'previewMessage',
        async (...args: Parameters<typeof messageInboxDailySdk.trySendPreview>) => {
            const { data: res } = await messageInboxDailySdk.trySendPreview(...args);
            return res;
        },
    );

    // 预览详情更新
    const previewMessageDetail = selfContextFlow(
        'previewMessageDetail',
        async (...args: Parameters<typeof messageInboxDailySdk.trySendPreviewDetail>) => {
            const { data: res } = await messageInboxDailySdk.trySendPreviewDetail(...args);
            return res;
        },
    );

    // 普通发送站内行
    const sendMessage = selfContextFlow(
        'sendMessage',
        async (...args: Parameters<typeof sendMessageSdk.sendCommonInboxAsync>) => {
            const { data: res } = await sendMessageSdk.sendCommonInboxAsync(...args);
            return res;
        },
    );

    // 定时发送站内信
    const sendTimingMessage = selfContextFlow(
        'sendTimingMessage',
        async (...args: Parameters<typeof sendMessageSdk.sendTimingInboxAsync>) => {
            const { data: res } = await sendMessageSdk.sendTimingInboxAsync(...args);
            return res;
        },
    );

    // 提交审核
    const submitAudit = selfContextFlow(
        'submitAudit',
        async (...args: Parameters<typeof messageTemplateSdk.submit>) => {
            const { data: res } = await messageTemplateSdk.submit(...args);
            return res;
        },
    );

    // 消息任务分页查询
    const queryMessagePage = selfContextFlow(
        'messagePageList',
        async (...args: Parameters<typeof inboxTaskServiceSdk.queryPage>) => {
            const { data: res } = await inboxTaskServiceSdk.queryPage(...args);
            return res;
        },
    );

    // 取消定时发送
    const cancelTimingSend = selfContextFlow(
        'cancelTimingSend',
        async (...args: Parameters<typeof inboxTaskServiceSdk.cancelSend>) => {
            const { data: res } = await inboxTaskServiceSdk.cancelSend(...args);
            return res;
        },
    );

    // 获取消息详情、
    const getMessageDetail = selfContextFlow(
        'messageDetail',
        async (...args: Parameters<typeof snapshotSdk.queryDetail>) => {
            const { data: res } = await snapshotSdk.queryDetail(...args);
            return res;
        },
    );

    return {
        deleteVariable,
        createVariable,
        queryVariable,
        queryVariablePage,
        updateVariable,
        getVariableDetail,
        createTemplate,
        updateTemplate,
        deleteTemplate,
        checkTemplate,
        updateTemplateStatus,
        copyTemplate,
        queryPageTemplate,
        getTemplateDetail,
        getPageMessageType,
        getMessageType,
        deleteMessageType,
        createMessageType,
        updateMessageType,
        trySendMessage,
        sendMessage,
        sendTimingMessage,
        submitAudit,
        previewMessage,
        queryMessagePage,
        cancelTimingSend,
        getMessageDetail,
        previewMessageDetail,
    };
});
