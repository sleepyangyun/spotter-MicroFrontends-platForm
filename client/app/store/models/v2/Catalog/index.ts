import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { catalogSdk } from '@app/services/v2/items/productPackagingCertification';
import { variationSdk, newerModelSdk } from '@app/services/v2/items';
import WithPaginationUpdateFnModel from '@app/store/infra/WithPaginationUpdateFnModel';
import WithPrimaryUpdateFnModel from '@app/store/infra/WithPrimaryUpdateFnModel';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';

export const CatalogStore = Model({
    name: 'CatalogStore',
    properties: {
        myCertificationTicketList:
            WithPaginationUpdateFnModel<typeof catalogSdk.packageLineList>().model,

        variationDetail: WithPrimaryUpdateFnModel(
            <ApiReturnType<typeof variationSdk.getVariationTicketDetail>>{},
        ).model,
        newerModelDetail: WithPrimaryUpdateFnModel(
            <ApiReturnType<typeof newerModelSdk.getNewerModelTicketDetail>>{},
        ).model,
    },
    overridesInitWatcher: {
        transferVariationUsers: false,
        transferNewerModelUsers: false,
        getVariationLikeCaseId: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    // 产品包装认证-产品线列表
    const getProductPackageList = autoContextFlow(
        'myCertificationTicketList',
        async (...args: Parameters<typeof catalogSdk.packageLineList>) => {
            const { data: res } = await catalogSdk.packageLineList(...args);
            return res;
        },
    );
    // 不需要认证
    const deny = autoContextFlow(
        'myCertificationTicketList',
        async (...args: Parameters<typeof catalogSdk.deny>) => {
            const { data: res } = await catalogSdk.deny(...args);
            return res;
        },
    );

    // variation工单接受
    const acceptVariation = autoContextFlow(
        'acceptVariation',
        async (...args: Parameters<typeof variationSdk.accept>) => {
            const { data: res } = await variationSdk.accept(...args);
            return res;
        },
    );
    // 新增或更新工单配置
    const addOrUpdateVariationConfig = autoContextFlow(
        'addOrUpdateVariationConfig',
        async (...args: Parameters<typeof variationSdk.addOrUpdateTicketConfig>) => {
            const { data: res } = await variationSdk.addOrUpdateTicketConfig(...args);
            return res;
        },
    );

    // variation工单Amazon审核
    const amazonAuditAboutVariation = autoContextFlow(
        'amazonAuditAboutVariation',
        async (...args: Parameters<typeof variationSdk.amazonAudit>) => {
            const { data: res } = await variationSdk.amazonAudit(...args);
            return res;
        },
    );
    // variation工单转移
    const transferVariationUsers = autoContextFlow(
        'transferVariationUsers',
        async (...args: Parameters<typeof variationSdk.divert>) => {
            const { data: res } = await variationSdk.divert(...args);
            return res;
        },
    );
    // variation工单初审
    const firstAuditAboutVariation = autoContextFlow(
        'firstAuditAboutVariation',
        async (...args: Parameters<typeof variationSdk.firstAudit>) => {
            const { data: res } = await variationSdk.firstAudit(...args);
            return res;
        },
    );
    // variation工单需我受理
    const getMyVariationList = autoContextFlow(
        'myVariationList',
        async (...args: Parameters<typeof variationSdk.getDivertedPage>) => {
            const { data: res } = await variationSdk.getDivertedPage(...args);
            return res;
        },
    );
    // variation工单列表
    const getVariationList = autoContextFlow(
        'variationList',
        async (...args: Parameters<typeof variationSdk.getPageWithParams>) => {
            const { data: res } = await variationSdk.getPageWithParams(...args);
            return res;
        },
    );
    // 获取Variation工单配置
    const getVariationConfig = autoContextFlow(
        'variationConfig',
        async (...args: Parameters<typeof variationSdk.getVariationTicketConfig>) => {
            const { data: res } = await variationSdk.getVariationTicketConfig(...args);
            return res;
        },
    );
    // variation工单详情
    const getVariationDetail = autoContextFlow(
        'variationDetail',
        async (...args: Parameters<typeof variationSdk.getVariationTicketDetail>) => {
            const { data: res } = await variationSdk.getVariationTicketDetail(...args);
            return res;
        },
    );
    // variation 上传附件
    const uploadAttachmentAboutVariation = autoContextFlow(
        'uploadAttachmentAboutVariation',
        async (...args: Parameters<typeof variationSdk.uploadAttachment>) => {
            const { data: res } = await variationSdk.uploadAttachment(...args);
            return res;
        },
    );

    // NewerModel工单接受
    const acceptNewerModel = autoContextFlow(
        'acceptNewerModel',
        async (...args: Parameters<typeof newerModelSdk.accept>) => {
            const { data: res } = await newerModelSdk.accept(...args);
            return res;
        },
    );
    // NewerModel新增或更新工单配置
    const addOrUpdateNewerModelConfig = autoContextFlow(
        'addOrUpdateNewerModelConfig',
        async (...args: Parameters<typeof newerModelSdk.addOrUpdateTicketConfig>) => {
            const { data: res } = await newerModelSdk.addOrUpdateTicketConfig(...args);
            return res;
        },
    );

    // NewerModel工单Amazon审核
    const amazonAuditAboutNewerModel = autoContextFlow(
        'amazonAuditAboutNewerModel',
        async (...args: Parameters<typeof newerModelSdk.amazonAudit>) => {
            const { data: res } = await newerModelSdk.amazonAudit(...args);
            return res;
        },
    );
    // NewerModel工单转移
    const transferNewerModelUsers = autoContextFlow(
        'transferNewerModelUsers',
        async (...args: Parameters<typeof newerModelSdk.divert>) => {
            const { data: res } = await newerModelSdk.divert(...args);
            return res;
        },
    );
    // NewerModel工单初审
    const firstAuditAboutNewerModel = autoContextFlow(
        'firstAuditAboutNewerModel',
        async (...args: Parameters<typeof newerModelSdk.firstAudit>) => {
            const { data: res } = await newerModelSdk.firstAudit(...args);
            return res;
        },
    );
    // NewerModel工单需我受理
    const getMyNewerModelList = autoContextFlow(
        'myNewerModelList',
        async (...args: Parameters<typeof newerModelSdk.getDivertedPage>) => {
            const { data: res } = await newerModelSdk.getDivertedPage(...args);
            return res;
        },
    );
    // NewerModel工单列表
    const getNewerModelList = autoContextFlow(
        'newerModelList',
        async (...args: Parameters<typeof newerModelSdk.getPageWithParams>) => {
            const { data: res } = await newerModelSdk.getPageWithParams(...args);
            return res;
        },
    );
    // 获取NewerModel工单配置
    const getNewerModelConfig = autoContextFlow(
        'NewerModelConfig',
        async (...args: Parameters<typeof newerModelSdk.getNewerModelTicketConfig>) => {
            const { data: res } = await newerModelSdk.getNewerModelTicketConfig(...args);
            return res;
        },
    );
    // NewerModel工单详情
    const getNewerModelDetail = autoContextFlow(
        'newerModelDetail',
        async (...args: Parameters<typeof newerModelSdk.getNewerModelTicketDetail>) => {
            const { data: res } = await newerModelSdk.getNewerModelTicketDetail(...args);
            return res;
        },
    );
    // NewerModel 上传附件
    const uploadAttachmentAboutNewerModel = autoContextFlow(
        'uploadAttachmentAboutNewerModel',
        async (...args: Parameters<typeof newerModelSdk.uploadAttachment>) => {
            const { data: res } = await newerModelSdk.uploadAttachment(...args);
            return res;
        },
    );
    // Variation的CaseId列表
    const getVariationLikeCaseId = autoContextFlow(
        'getVariationLikeCaseId',
        async (...args: Parameters<typeof variationSdk.getLikeCaseId>) => {
            const { data: res } = await variationSdk.getLikeCaseId(...args);
            return res;
        },
    );
    // Variation工单编号列表
    const getVariationLikeTicketNo = autoContextFlow(
        'getVariationLikeTicketNo',
        async (...args: Parameters<typeof variationSdk.getLikeTicketNo>) => {
            const { data: res } = await variationSdk.getLikeTicketNo(...args);
            return res;
        },
    );
    // NewerModel的CaseId列表
    const getNewerModelLikeCaseId = autoContextFlow(
        'getNewerModelLikeCaseId',
        async (...args: Parameters<typeof newerModelSdk.getLikeCaseId>) => {
            const { data: res } = await newerModelSdk.getLikeCaseId(...args);
            return res;
        },
    );
    // NewerModel工单编号列表
    const getNewerModelLikeTicketNo = autoContextFlow(
        'getNewerModelLikeTicketNo',
        async (...args: Parameters<typeof newerModelSdk.getLikeTicketNo>) => {
            const { data: res } = await newerModelSdk.getLikeTicketNo(...args);
            return res;
        },
    );

    return {
        getProductPackageList,
        deny,
        acceptVariation,
        addOrUpdateVariationConfig,
        amazonAuditAboutVariation,
        transferVariationUsers,
        firstAuditAboutVariation,
        getMyVariationList,
        getVariationList,
        getVariationConfig,
        getVariationDetail,
        uploadAttachmentAboutVariation,
        acceptNewerModel,
        addOrUpdateNewerModelConfig,
        amazonAuditAboutNewerModel,
        transferNewerModelUsers,
        firstAuditAboutNewerModel,
        getMyNewerModelList,
        getNewerModelList,
        getNewerModelConfig,
        getNewerModelDetail,
        uploadAttachmentAboutNewerModel,
        getVariationLikeCaseId,
        getVariationLikeTicketNo,
        getNewerModelLikeCaseId,
        getNewerModelLikeTicketNo,
    };
});
