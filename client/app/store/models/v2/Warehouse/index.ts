import Model from '@app/store/infra/Model';
import { deepTrim, generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import WithPaginationUpdateFnModel from '@client/app/store/infra/WithPaginationUpdateFnModel';
import { warehouseSdk } from '@client/app/services/v2/warehouse';
import WithPrimaryUpdateFnModel from '@app/store/infra/WithPrimaryUpdateFnModel';
import { AmazonCountryAndStateVOModel } from '@spotter/gmesh-api-sdk';
import { storageApiSdk } from '@app/services/v2/storage';
import { roleSdk } from '@client/app/services/v2/auth/role';
import {
    CreateOutboundOrderBatchModel,
    InboundNoticeDetailVOModel,
    InboundNoticeVOModel,
    OutboundDetailModel,
    OutboundNewDetailModel,
    WarehouseInventoryVOModel,
} from './model';
import { StorageModel } from './model/config';

export const WarehouseStore = Model({
    name: 'WarehouseStore',
    properties: {
        storageList: WithPrimaryUpdateFnModel<typeof storageApiSdk.getStorageList>([]).model,
        storagePageList: WithPaginationUpdateFnModel<typeof storageApiSdk.getStoragePage>().model,
        storageVcAccountList: WithPrimaryUpdateFnModel<
            typeof storageApiSdk.getStorageVcAccountList
        >([]).model,
        inboundDetail: WithPrimaryUpdateFnModel({} as Partial<InboundNoticeDetailVOModel>).model,
        inboundList: WithPrimaryUpdateFnModel({} as Partial<InboundNoticeVOModel>).model,
        outboundList:
            WithPaginationUpdateFnModel<typeof warehouseSdk.getOutboundNoticePageList>().model,
        inboundDetailList: WithPrimaryUpdateFnModel([] as WarehouseInventoryVOModel[]).model,
        outboundNoticeDetail: WithPrimaryUpdateFnModel({} as OutboundDetailModel).model,
        outboundPickDetail: WithPrimaryUpdateFnModel({} as OutboundDetailModel).model,
        createOutboundOrderBatchRes: WithPrimaryUpdateFnModel([] as CreateOutboundOrderBatchModel)
            .model,
        logisticCarrierList: WithPaginationUpdateFnModel().model,
        amazonAreas: WithPrimaryUpdateFnModel({} as AmazonCountryAndStateVOModel).model,
        storageDetail: WithPrimaryUpdateFnModel({} as StorageModel).model,
        outboundFileUploadRes: WithPrimaryUpdateFnModel<typeof warehouseSdk.outboundFileUpload>([])
            .model,
        outboundNewDetail: WithPrimaryUpdateFnModel({} as OutboundNewDetailModel).model,
        approvePage: WithPaginationUpdateFnModel<typeof warehouseSdk.approvePage>().model,
        exportOutboundRes: WithPrimaryUpdateFnModel<typeof warehouseSdk.exportOutbound>('').model,
        exportInboundRes: WithPrimaryUpdateFnModel<typeof warehouseSdk.exportInbound>('').model,
        list: WithPrimaryUpdateFnModel<typeof warehouseSdk.list>([]).model,
        replaceLabelPageList:
            WithPaginationUpdateFnModel<typeof warehouseSdk.listReplaceLabelPage>().model,
        warehouseCompanyList: WithPrimaryUpdateFnModel([] as any[]).model,
        listStorageBySsku: WithPrimaryUpdateFnModel([] as any[]).model,
        storageListV2: WithPrimaryUpdateFnModel([] as any[]).model,
        getReportDetailPage:
            WithPaginationUpdateFnModel<typeof warehouseSdk.getReportDetailPage>().model,
        exportSevcReport: WithPrimaryUpdateFnModel<typeof warehouseSdk.exportSevcReport>('').model,
    },
    overridesInitWatcher: {
        updateStorageByCode: false,
        storageVcAccountList: false,
        storageBindVendorCode: false,
        storagePageList: false,
        storageDetail: false,
        saveStorage: false,
        amazonAreas: false,
        updateStorageBindVendorCode: false,
        exportExceedDetail: false,
        outboundList: false,
        logisticCarrierList: false,
        addOutboundNotice: false,
        moveWarehouse: false,
        outboundNoticeDetailListUpdate: false,
        outboundBatchUpdateMark: false,
        bindWarehouse: false,
        withdrawOutbound: false,
        updateOutboundPick: false,
        confirmUnshipped: false,
        updateApproveTransfer: false,
        createInbound: false,
        getListInboundInventory: false,
        listFuzzyProduct: false,
        addReplaceLabel: false,
        replaceLabelPageList: false,
        exportReplaceLabelFor: false,
        getReplaceLabelInfo: false,
        accept: false,
        closeReplaceLabel: false,
        getListUsersAll: false,
        sptList: false,
        outboundCancel: false,
        getDiscardGoodsPageList: false,
        getReplaceLabelPageList: false,
        exportDiscardGoodsFor: false,
        addDiscardGoods: false,
        getDiscardGoodsInfo: false,
        closeDiscardGoods: false,
        finishDiscardGoods: false,
        getStaffServicePageList: false,
        exportStaffServiceFor: false,
        getStaffServiceInfo: false,
        addStaffService: false,
        closeStaffService: false,
        finishStaffService: false,
        getOrderInterceptionPageList: false,
        exportOrderInterceptionFor: false,
        getOrderInterceptionInfo: false,
        addOrderInterception: false,
        closeOrderInterception: false,
        finishOrderInterception: false,
        searchOutboundOrder: false,
        productList: false,
        getPhysicalInventoryPageList: false,
        exportPhysicalInventoryFor: false,
        getPhysicalInventoryInfo: false,
        addPhysicalInventory: false,
        closePhysicalInventory: false,
        finishPhysicalInventory: false,
        physicalInventoryTableDownload: false,
        physicalInventoryTableUpload: false,
        listProduct: false,
        getShipmentFeePage: false,
        exportshipmentFeeFor: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    /** 条件查询仓库信息列表 */
    const getStorageList = autoContextFlow(
        'storageList',
        async (...[req, ...args]: Parameters<typeof storageApiSdk.getStorageList>) => {
            const { data: res } = await storageApiSdk.getStorageList(deepTrim(req), ...args);
            return res;
        },
    );
    /** 分页条件查询仓库信息 */
    const getStoragePageList = autoContextFlow(
        'storagePageList',
        async (...[req, ...args]: Parameters<typeof storageApiSdk.getStoragePage>) => {
            const { data: res } = await storageApiSdk.getStoragePage(deepTrim(req), ...args);
            return res;
        },
    );

    /** 根据仓库编码修改仓库配置 */
    const updateStorageByCode = autoContextFlow(
        'updateStorageByCode',
        async (...[req, ...args]: Parameters<typeof storageApiSdk.updateStorageByCode>) => {
            const { data: res } = await storageApiSdk.updateStorageByCode(deepTrim(req), ...args);
            return res;
        },
    );

    /** 查询仓库关联VC账号及VendorCode信息 */
    const getStorageVcAccountList = autoContextFlow(
        'storageVcAccountList',
        async (...[req, ...args]: Parameters<typeof storageApiSdk.getStorageVcAccountList>) => {
            const { data: res } = await storageApiSdk.getStorageVcAccountList(
                deepTrim(req),
                ...args,
            );
            return res;
        },
    );

    /** 新增仓库关联VC账号信息 */
    const storageBindVendorCode = autoContextFlow(
        'storageBindVendorCode',
        async (...[req, ...args]: Parameters<typeof storageApiSdk.storageBindVendorCode>) => {
            const { data: res } = await storageApiSdk.storageBindVendorCode(deepTrim(req), ...args);
            return res;
        },
    );

    // TODO：下期改接口
    const exportExceedDetailFile = autoContextFlow(
        'exportExceedDetail',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.exportExceedDetailFile>) => {
            const { data: res } = await warehouseSdk.exportExceedDetailFile(deepTrim(req), ...args);
            return res;
        },
    );

    /** 已入库详情 Modal形式 */
    const getInboundDetail = autoContextFlow(
        'inboundDetail',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.getInboundNoticeDetailList>) => {
            const { data: res } = await warehouseSdk.getInboundNoticeDetailList(
                deepTrim(req),
                ...args,
            );
            return res;
        },
    );

    // 出库通知单列表分页
    const getOutboundNoticePageList = autoContextFlow(
        'outboundList',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.getOutboundNoticePageList>) => {
            const { data: res } = await warehouseSdk.getOutboundNoticePageList(
                deepTrim(req),
                ...args,
            );
            return res;
        },
    );

    /** 已入库详情 List形式 */
    const getInboundDetailList = autoContextFlow(
        'inboundDetailList',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.list>) => {
            const { data: res } = await warehouseSdk.list(deepTrim(req), ...args);
            return res;
        },
    );

    const getInboundNoticePageList = autoContextFlow(
        'inboundList',
        async (...args: Parameters<typeof warehouseSdk.getInboundNoticePageList>) => {
            const { data: res } = await warehouseSdk.getInboundNoticePageList(...args);
            return res;
        },
    );

    // 出库通知单详情
    const getOutboundNoticeDetailList = autoContextFlow(
        'outboundNoticeDetail',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.getOutboundNoticeDetailList>) => {
            const { data: res } = await warehouseSdk.getOutboundNoticeDetailList(
                deepTrim(req),
                ...args,
            );
            return res;
        },
    );

    // 确认未发货数量
    const confirmUnshippedQuantity = autoContextFlow(
        'confirmUnshipped',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.confirmUnshippedQuantity>) => {
            const { data: res } = await warehouseSdk.confirmUnshippedQuantity(
                deepTrim(req),
                ...args,
            );
            return res;
        },
    );

    // 出库通知单详情
    const getOutboundNewDetail = autoContextFlow(
        'outboundNewDetail',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.getOutboundSevcDetail>) => {
            const { data: res } = await warehouseSdk.getOutboundSevcDetail(deepTrim(req), ...args);
            return res;
        },
    );

    const getOutboundPick = autoContextFlow(
        'outboundPickDetail',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.getOutboundNoticeDetailList>) => {
            const { data: res } = await warehouseSdk.getOutboundNoticeDetailList(
                deepTrim(req),
                ...args,
            );
            return res;
        },
    );
    const updateOutboundPick = autoContextFlow(
        'updateOutboundPick',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.outboundPickUp>) => {
            const { data: res } = await warehouseSdk.outboundPickUp(deepTrim(req), ...args);
            return res;
        },
    );
    /** 入库导出 */
    const exportInbound = autoContextFlow(
        'exportInboundRes',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.exportInbound>) => {
            const { data: res } = await warehouseSdk.exportInbound(deepTrim(req), ...args);
            return res;
        },
    );
    /** 出库导出 */
    const exportOutbound = autoContextFlow(
        'exportOutboundRes',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.exportOutbound>) => {
            const { data: res } = await warehouseSdk.exportOutbound(deepTrim(req), ...args);
            return res;
        },
    );
    // 撤回出库通知单
    const withdrawOutbound = autoContextFlow(
        'withdrawOutbound',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.outboundWithdraw>) => {
            const { data: res } = await warehouseSdk.outboundWithdraw(deepTrim(req), ...args);
            return res;
        },
    );
    // 出库通知单发货
    const outboundNoticeDetailListUpdate = autoContextFlow(
        'outboundNoticeDetailListUpdate',
        async (
            ...[req, ...args]: Parameters<typeof warehouseSdk.outboundNoticeDetailListUpdate>
        ) => {
            const { data: res } = await warehouseSdk.outboundNoticeDetailListUpdate(
                deepTrim(req),
                ...args,
            );
            return res;
        },
    );
    /** 出库通知单批量发货 */
    const outboundBatchUpdate = autoContextFlow(
        'outboundBatchUpdateMark',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.batchUpdateOutbound>) => {
            const { data: res } = await warehouseSdk.batchUpdateOutbound(deepTrim(req), ...args);
            return res;
        },
    );

    // 添加销售出库
    const addOutboundNotice = autoContextFlow(
        'addOutboundNotice',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.addOutboundNotice>) => {
            const { data: res } = await warehouseSdk.addOutboundNotice(deepTrim(req), ...args);
            return res;
        },
    );

    // 移仓
    const moveWarehouse = autoContextFlow(
        'moveWarehouse',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.moveWarehouse>) => {
            const { data: res } = await warehouseSdk.moveWarehouse(deepTrim(req), ...args);
            return res;
        },
    );

    // 获取物流商分页列表
    const pageLogisticCarrierList = autoContextFlow(
        'logisticCarrierList',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.pageLogisticCarrierList>) => {
            const { data: res } = await warehouseSdk.pageLogisticCarrierList(
                deepTrim(req),
                ...args,
            );
            return res;
        },
    );

    // 批量上传出库单
    const createOutboundOrderBatch = autoContextFlow(
        'createOutboundOrderBatchRes',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.createOutboundOrderBatch>) => {
            const { data: res } = await warehouseSdk.createOutboundOrderBatch(
                deepTrim(req),
                ...args,
            );
            return res;
        },
    );

    const addWarehouse = autoContextFlow(
        'saveStorage',
        async (...[req, ...args]: Parameters<typeof storageApiSdk.saveStorage>) => {
            const { data: res } = await storageApiSdk.saveStorage(deepTrim(req), ...args);
            return res;
        },
    );

    const getAmazonArea = autoContextFlow(
        'amazonAreas',
        async (...[req, ...args]: Parameters<typeof storageApiSdk.getAmazonCountryAndStateVO>) => {
            const { data: res } = await storageApiSdk.getAmazonCountryAndStateVO(
                deepTrim(req),
                ...args,
            );
            return res;
        },
    );

    const getStorageDetail = autoContextFlow(
        'storageDetail',
        async (...[req, ...args]: Parameters<typeof storageApiSdk.getStorageDetail>) => {
            const { data: res } = await storageApiSdk.getStorageDetail(deepTrim(req), ...args);
            return res;
        },
    );

    // 公司绑定仓库
    const companyBindWarehouse = autoContextFlow(
        'bindWarehouse',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.bind>) => {
            const { data: res } = await warehouseSdk.bind(deepTrim(req), ...args);
            return res;
        },
    );

    /** 批量导入 */
    const outboundFileUpload = autoContextFlow(
        'outboundFileUploadRes',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.outboundFileUpload>) => {
            const { data: res } = await warehouseSdk.outboundFileUpload(deepTrim(req), ...args);
            return res;
        },
    );

    /** gmesh查询仓库审批列表 */
    const getApprovePage = autoContextFlow(
        'approvePage',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.approvePage>) => {
            const { data: res } = await warehouseSdk.approvePage(deepTrim(req), ...args);
            return res;
        },
    );

    /** 添加入库通知单 */
    const createInbound = autoContextFlow(
        'createInbound',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.createInbound>) => {
            const { data: res } = await warehouseSdk.createInbound(deepTrim(req), ...args);
            return res;
        },
    );
    /** 公司仓库绑定联动 */
    const getWarehouseCompanyList = autoContextFlow(
        'warehouseCompanyList',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.companyList>) => {
            const { data: res } = await warehouseSdk.companyList(deepTrim(req), ...args);
            return res;
        },
    );

    const updateApproveTransfer = autoContextFlow(
        'approveTransfer',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.approveTransfer>) => {
            const { data: res } = await warehouseSdk.approveTransfer(deepTrim(req), ...args);
            return res;
        },
    );

    /** 库存列表 */
    const getListInboundInventory = autoContextFlow(
        'getListInboundInventory',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.listInboundInventory>) => {
            const { data: res } = await warehouseSdk.listInboundInventory(deepTrim(req), ...args);
            return res;
        },
    );

    const getApproveDetail = autoContextFlow(
        'approveDetail',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.approveDetail>) => {
            const { data: res } = await warehouseSdk.approveDetail(deepTrim(req), ...args);
            return res;
        },
    );

    /** 模糊查询产品信息 */
    const getFuzzyProduct = autoContextFlow(
        'listFuzzyProduct',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.listFuzzyProduct>) => {
            const { data: res } = await warehouseSdk.listFuzzyProduct(deepTrim(req), ...args);
            return res;
        },
    );
    /** 仓库筛选列表V2 */
    const getStorageListV2 = autoContextFlow(
        'storageListV2',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.storageList>) => {
            const { data: res } = await warehouseSdk.storageList(deepTrim(req), ...args);
            return res;
        },
    );

    const updateApproveStorageConfig = autoContextFlow(
        'approveStorageConfig',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.approveStorageConfig>) => {
            const { data: res } = await warehouseSdk.approveStorageConfig(deepTrim(req), ...args);
            return res;
        },
    );

    const getListUsersAll = autoContextFlow(
        'listUsers',
        async (...[req, ...args]: Parameters<typeof roleSdk.listUsers>) => {
            const { data: response } = await roleSdk.listUsers(deepTrim(req), ...args);
            return response;
        },
    );

    /** 新建更换标签 */
    const addReplaceLabel = autoContextFlow(
        'addReplaceLabel',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.addReplaceLabel>) => {
            const { data: res } = await warehouseSdk.addReplaceLabel(deepTrim(req), ...args);
            return res;
        },
    );

    /** 更换标签列表 */
    const getReplaceLabelPageList = autoContextFlow(
        'getReplaceLabelPageList',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.listReplaceLabelPage>) => {
            const { data: res } = await warehouseSdk.listReplaceLabelPage(deepTrim(req), ...args);
            return res;
        },
    );

    /** 更换标签导出Excel */
    const exportReplaceLabelFor = autoContextFlow(
        'exportReplaceLabelFor',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.exportReplaceLabelFor>) => {
            const { data: res } = await warehouseSdk.exportReplaceLabelFor(deepTrim(req), ...args);
            return res;
        },
    );

    /** 更换标签详情 */
    const getReplaceLabelInfo = autoContextFlow(
        'getReplaceLabelInfo',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.getReplaceLabelInfo>) => {
            const { data: res } = await warehouseSdk.getReplaceLabelInfo(deepTrim(req), ...args);
            return res;
        },
    );

    /** 受理/不受理增值服务单 */
    const accept = autoContextFlow(
        'accept',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.accept>) => {
            const { data: res } = await warehouseSdk.accept(deepTrim(req), ...args);
            return res;
        },
    );

    /** 完成提交更换标签 */
    const finishReplaceLabel = autoContextFlow(
        'finishReplaceLabel',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.finishReplaceLabel>) => {
            const { data: res } = await warehouseSdk.finishReplaceLabel(deepTrim(req), ...args);
            return res;
        },
    );

    /** 更换标签关单 */
    const closeReplaceLabel = autoContextFlow(
        'closeReplaceLabel',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.closeReplaceLabel>) => {
            const { data: res } = await warehouseSdk.closeReplaceLabel(deepTrim(req), ...args);
            return res;
        },
    );

    /** SPT查询当前公司的仓库 */
    const sptList = autoContextFlow(
        'sptList',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.sptList>) => {
            const { data: res } = await warehouseSdk.sptList(deepTrim(req), ...args);
            return res;
        },
    );

    /** 弃货处理导出Excel */
    const exportDiscardGoodsFor = autoContextFlow(
        'exportDiscardGoodsFor',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.exportDiscardGoodsFor>) => {
            const { data: res } = await warehouseSdk.exportDiscardGoodsFor(deepTrim(req), ...args);
            return res;
        },
    );

    /** 弃货处理 列表 */
    const getDiscardGoodsPageList = autoContextFlow(
        'getDiscardGoodsPageList',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.listDiscardGoodsPage>) => {
            const { data: res } = await warehouseSdk.listDiscardGoodsPage(deepTrim(req), ...args);
            return res;
        },
    );

    /** 弃货处理 提交 */
    const addDiscardGoods = autoContextFlow(
        'addDiscardGoods',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.addDiscardGoods>) => {
            const { data: res } = await warehouseSdk.addDiscardGoods(deepTrim(req), ...args);
            return res;
        },
    );

    /** 弃货处理 详情 */
    const getDiscardGoodsInfo = autoContextFlow(
        'getDiscardGoodsInfo',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.getDiscardGoodsInfo>) => {
            const { data: res } = await warehouseSdk.getDiscardGoodsInfo(deepTrim(req), ...args);
            return res;
        },
    );

    /** 弃货处理 关单 */
    const closeDiscardGoods = autoContextFlow(
        'closeDiscardGoods',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.closeDiscardGoods>) => {
            const { data: res } = await warehouseSdk.closeDiscardGoods(deepTrim(req), ...args);
            return res;
        },
    );
    /** 弃货处理 完成 */
    const finishDiscardGoods = autoContextFlow(
        'finishDiscardGoods',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.finishDiscardGoods>) => {
            const { data: res } = await warehouseSdk.finishDiscardGoods(deepTrim(req), ...args);
            return res;
        },
    );

    /** 人工服务 列表 */
    const getStaffServicePageList = autoContextFlow(
        'getStaffServicePageList',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.listStaffServicePage>) => {
            const { data: res } = await warehouseSdk.listStaffServicePage(deepTrim(req), ...args);
            return res;
        },
    );

    /** 人工服务 导出excel */
    const exportStaffServiceFor = autoContextFlow(
        'exportStaffServiceFor',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.exportStaffServiceFor>) => {
            const { data: res } = await warehouseSdk.exportStaffServiceFor(deepTrim(req), ...args);
            return res;
        },
    );

    /** 人工服务 查看详情 */
    const getStaffServiceInfo = autoContextFlow(
        'getStaffServiceInfo',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.getStaffServiceInfo>) => {
            const { data: res } = await warehouseSdk.getStaffServiceInfo(deepTrim(req), ...args);
            return res;
        },
    );

    /** 人工服务 提交 */
    const addStaffService = autoContextFlow(
        'addStaffService',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.addStaffService>) => {
            const { data: res } = await warehouseSdk.addStaffService(deepTrim(req), ...args);
            return res;
        },
    );

    /** 人工服务 关单 */
    const closeStaffService = autoContextFlow(
        'closeStaffService',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.closeStaffService>) => {
            const { data: res } = await warehouseSdk.closeStaffService(deepTrim(req), ...args);
            return res;
        },
    );

    /** 人工服务 完成 */
    const finishStaffService = autoContextFlow(
        'finishStaffService',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.finishStaffService>) => {
            const { data: res } = await warehouseSdk.finishStaffService(deepTrim(req), ...args);
            return res;
        },
    );

    /** 订单拦截 列表 */
    const getOrderInterceptionPageList = autoContextFlow(
        'getOrderInterceptionPageList',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.listOrderInterceptionPage>) => {
            const { data: res } = await warehouseSdk.listOrderInterceptionPage(
                deepTrim(req),
                ...args,
            );
            return res;
        },
    );

    /** 订单拦截 导出excel */
    const exportOrderInterceptionFor = autoContextFlow(
        'exportOrderInterceptionFor',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.exportOrderInterceptionFor>) => {
            const { data: res } = await warehouseSdk.exportOrderInterceptionFor(
                deepTrim(req),
                ...args,
            );
            return res;
        },
    );

    /** 订单拦截 查看详情 */
    const getOrderInterceptionInfo = autoContextFlow(
        'getOrderInterceptionInfo',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.getOrderInterceptionInfo>) => {
            const { data: res } = await warehouseSdk.getOrderInterceptionInfo(
                deepTrim(req),
                ...args,
            );
            return res;
        },
    );

    /** 订单拦截 提交 */
    const addOrderInterception = autoContextFlow(
        'addOrderInterception',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.addOrderInterception>) => {
            const { data: res } = await warehouseSdk.addOrderInterception(deepTrim(req), ...args);
            return res;
        },
    );

    /** 订单拦截 关单 */
    const closeOrderInterception = autoContextFlow(
        'closeOrderInterception',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.closeOrderInterception>) => {
            const { data: res } = await warehouseSdk.closeOrderInterception(deepTrim(req), ...args);
            return res;
        },
    );

    /** 订单拦截 完成 */
    const finishOrderInterception = autoContextFlow(
        'finishOrderInterception',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.finishOrderInterception>) => {
            const { data: res } = await warehouseSdk.finishOrderInterception(
                deepTrim(req),
                ...args,
            );
            return res;
        },
    );

    /** 订单拦截 添加订单 查询出库通知单 */
    const searchOutboundOrder = autoContextFlow(
        'searchOutboundOrder',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.searchOutboundOrder>) => {
            const { data: res } = await warehouseSdk.searchOutboundOrder(deepTrim(req), ...args);
            return res;
        },
    );

    /** 订单拦截 详情 贴标数量 分页查询出库单的商品 */
    const productList = autoContextFlow(
        'productList',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.productList>) => {
            const { data: res } = await warehouseSdk.productList(deepTrim(req), ...args);
            return res;
        },
    );

    /** 商品盘点 列表 */
    const getPhysicalInventoryPageList = autoContextFlow(
        'getPhysicalInventoryPageList',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.listPhysicalInventoryPage>) => {
            const { data: res } = await warehouseSdk.listPhysicalInventoryPage(
                deepTrim(req),
                ...args,
            );
            return res;
        },
    );

    /** 商品盘点 导出excel */
    const exportPhysicalInventoryFor = autoContextFlow(
        'exportPhysicalInventoryFor',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.exportPhysicalInventoryFor>) => {
            const { data: res } = await warehouseSdk.exportPhysicalInventoryFor(
                deepTrim(req),
                ...args,
            );
            return res;
        },
    );

    /** 商品盘点 查看详情 */
    const getPhysicalInventoryInfo = autoContextFlow(
        'getPhysicalInventoryInfo',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.getPhysicalInventoryInfo>) => {
            const { data: res } = await warehouseSdk.getPhysicalInventoryInfo(
                deepTrim(req),
                ...args,
            );
            return res;
        },
    );

    /** 商品盘点 提交 */
    const addPhysicalInventory = autoContextFlow(
        'addPhysicalInventory',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.addPhysicalInventory>) => {
            const { data: res } = await warehouseSdk.addPhysicalInventory(deepTrim(req), ...args);
            return res;
        },
    );

    /** 商品盘点 关单 */
    const closePhysicalInventory = autoContextFlow(
        'closePhysicalInventory',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.closePhysicalInventory>) => {
            const { data: res } = await warehouseSdk.closePhysicalInventory(deepTrim(req), ...args);
            return res;
        },
    );

    /** 商品盘点 完成 */
    const finishPhysicalInventory = autoContextFlow(
        'finishPhysicalInventory',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.finishPhysicalInventory>) => {
            const { data: res } = await warehouseSdk.finishPhysicalInventory(
                deepTrim(req),
                ...args,
            );
            return res;
        },
    );

    /** 商品盘点单下载 */
    const physicalInventoryTableDownload = autoContextFlow(
        'physicalInventoryTableDownload',
        async (
            ...[req, ...args]: Parameters<typeof warehouseSdk.physicalInventoryTableDownload>
        ) => {
            const { data: res } = await warehouseSdk.physicalInventoryTableDownload(
                deepTrim(req),
                ...args,
            );
            return res;
        },
    );

    /** 商品盘点单上传 */
    const physicalInventoryTableUpload = autoContextFlow(
        'physicalInventoryTableUpload',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.physicalInventoryTableUpload>) => {
            const { data: res } = await warehouseSdk.physicalInventoryTableUpload(
                deepTrim(req),
                ...args,
            );
            return res;
        },
    );
    /** 库存产品列表 */
    const listProduct = autoContextFlow(
        'listProduct',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.listProduct>) => {
            const { data: res } = await warehouseSdk.listProduct(deepTrim(req), ...args);
            return res;
        },
    );

    /** 物流费用 列表 */
    const getShipmentFeePage = autoContextFlow(
        'getShipmentFeePage',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.listShipmentFeePage>) => {
            const { data: res } = await warehouseSdk.listShipmentFeePage(deepTrim(req), ...args);
            return res;
        },
    );

    /** 物流费用 导出excel */
    const exportshipmentFeeFor = autoContextFlow(
        'exportshipmentFeeFor',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.exportshipmentFeeFor>) => {
            const { data: res } = await warehouseSdk.exportshipmentFeeFor(deepTrim(req), ...args);
            return res;
        },
    );

    /** 【物流费用】设置出库单物流费用 */
    const setShipmentFee = autoContextFlow(
        'setShipmentFee',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.setShipmentFee>) => {
            const { data: res } = await warehouseSdk.setShipmentFee(deepTrim(req), ...args);
            return res;
        },
    );

    /** 自动分配库存 */
    const getAutoAllocateInventory = autoContextFlow(
        'autoAllocateInventory',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.autoAllocateInventory>) => {
            const { data: res } = await warehouseSdk.autoAllocateInventory(deepTrim(req), ...args);
            return res;
        },
    );

    /** 出库通知单批量捡货 */
    const updateOutboundBatchPickUp = autoContextFlow(
        'outboundBatchPickUp',
        async (...[req, ...args]: Parameters<typeof warehouseSdk.outboundBatchPickUp>) => {
            const { data: res } = await warehouseSdk.outboundBatchPickUp(deepTrim(req), ...args);
            return res;
        },
    );

    const postMoveTransitArea = autoContextFlow(
        'moveTransitArea',
        async (...args: Parameters<typeof warehouseSdk.moveTransitArea>) => {
            const { data: res } = await warehouseSdk.moveTransitArea(...args);
            return res;
        },
    );

    /** 出库通知单取消 */
    const postOutboundCancel = autoContextFlow(
        'outboundCancel',
        async (...args: Parameters<typeof warehouseSdk.cancelOutbound>) => {
            const { data: res } = await warehouseSdk.cancelOutbound(...args);
            return res;
        },
    );

    /** SEVC的报告模块输出出库明细 */
    const getGetReportDetailPage = autoContextFlow(
        'getReportDetailPage',
        async (...args: Parameters<typeof warehouseSdk.getReportDetailPage>) => {
            const { data: res } = await warehouseSdk.getReportDetailPage(...args);
            return res;
        },
    );

    /** SEVC的报告模块输出出库明细导出 */
    const getExportSevcReport = autoContextFlow(
        'exportSevcReport',
        async (...args: Parameters<typeof warehouseSdk.exportSevcReport>) => {
            const { data: res } = await warehouseSdk.exportSevcReport(...args);
            return res;
        },
    );

    /** 查含有这个ssku的仓库list */
    const getListStorageBySsku = autoContextFlow(
        'listStorageBySsku',
        async (...args: Parameters<typeof warehouseSdk.listStorageBySsku>) => {
            const { data: res } = await warehouseSdk.listStorageBySsku(...args);
            return res;
        },
    );

    return {
        getStoragePageList,
        getStorageList,
        updateStorageByCode,
        getStorageVcAccountList,
        storageBindVendorCode,
        addWarehouse,
        getAmazonArea,
        getStorageDetail,
        exportExceedDetailFile,
        getInboundDetail,
        getOutboundNoticePageList,
        getOutboundNoticeDetailList,
        confirmUnshippedQuantity,
        getOutboundPick,
        updateOutboundPick,
        withdrawOutbound,
        exportInbound,
        exportOutbound,
        getInboundDetailList,
        getOutboundNewDetail,
        outboundNoticeDetailListUpdate,
        outboundBatchUpdate,
        addOutboundNotice,
        moveWarehouse,
        pageLogisticCarrierList,
        createOutboundOrderBatch,
        outboundFileUpload,
        getApprovePage,
        updateApproveTransfer,
        getApproveDetail,
        updateApproveStorageConfig,
        companyBindWarehouse,
        getListUsersAll,
        createInbound,
        getListInboundInventory,
        getFuzzyProduct,
        addReplaceLabel,
        getReplaceLabelPageList,
        exportReplaceLabelFor,
        getReplaceLabelInfo,
        accept,
        finishReplaceLabel,
        closeReplaceLabel,
        getWarehouseCompanyList,
        getStorageListV2,
        sptList,
        getInboundNoticePageList,
        getDiscardGoodsPageList,
        exportDiscardGoodsFor,
        addDiscardGoods,
        getDiscardGoodsInfo,
        closeDiscardGoods,
        finishDiscardGoods,
        getStaffServicePageList,
        exportStaffServiceFor,
        getStaffServiceInfo,
        addStaffService,
        closeStaffService,
        finishStaffService,
        getOrderInterceptionPageList,
        exportOrderInterceptionFor,
        getOrderInterceptionInfo,
        addOrderInterception,
        closeOrderInterception,
        finishOrderInterception,
        searchOutboundOrder,
        productList,
        getPhysicalInventoryPageList,
        exportPhysicalInventoryFor,
        getPhysicalInventoryInfo,
        addPhysicalInventory,
        closePhysicalInventory,
        finishPhysicalInventory,
        physicalInventoryTableDownload,
        physicalInventoryTableUpload,
        listProduct,
        exportshipmentFeeFor,
        getShipmentFeePage,
        setShipmentFee,
        getAutoAllocateInventory,
        updateOutboundBatchPickUp,
        postMoveTransitArea,
        postOutboundCancel,
        getGetReportDetailPage,
        getExportSevcReport,
        getListStorageBySsku,
    };
});
