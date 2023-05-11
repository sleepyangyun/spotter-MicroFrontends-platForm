import {
    financeQuotedPriceSdk,
    firstInstalmentSdk,
    secondInstalmentSdk,
} from '@client/app/services/v2/finance';
import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import WithPrimaryUpdateFnModel from '@app/store/infra/WithPrimaryUpdateFnModel';
import WithPaginationUpdateFnModel from '@client/app/store/infra/WithPaginationUpdateFnModel';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';
import {
    financeWarehouseSdk,
    financeWarehouseVasFeePriceSdk,
} from '@client/app/services/v2/finance/warehouse';
import { financeOperateSdk } from '@client/app/services/v2/finance/operate';
import {
    FinanceFirstPaymentVOModel,
    FinanceSecondPaymentVOModel,
    FirstPaymentPreviewVOModel,
    ResponseResultStringModel,
    SecondPaymentPreviewVOModel,
    SecondPaymentStatusDetailModel,
} from './model';

export const FinanceStore = Model({
    name: 'FinanceStore',
    properties: {
        // 一期款
        preBillingRangeInfo: WithPrimaryUpdateFnModel({} as Partial<FinanceFirstPaymentVOModel>)
            .model,
        lastSecondInstalment: WithPrimaryUpdateFnModel({} as Partial<FinanceSecondPaymentVOModel>)
            .model,
        previewData: WithPrimaryUpdateFnModel({} as Partial<FirstPaymentPreviewVOModel>).model,
        advanceBillUrlData: WithPrimaryUpdateFnModel({} as ResponseResultStringModel).model,

        warehouseList:
            WithPaginationUpdateFnModel<typeof financeWarehouseSdk.pageSettlement>().model,
        warehouseDetail: WithPrimaryUpdateFnModel(
            <ApiReturnType<typeof financeWarehouseSdk.getWarehouseFeeSettlement>>{},
        ).model,

        // 二期款
        secondInstalmentPreviewData: WithPrimaryUpdateFnModel(
            {} as Partial<SecondPaymentPreviewVOModel>,
        ).model,
        secondInstalmentStatusDetail: WithPrimaryUpdateFnModel({} as SecondPaymentStatusDetailModel)
            .model,
        vasFeeTypeArray: WithPrimaryUpdateFnModel(
            <ApiReturnType<typeof financeWarehouseSdk.vasFeeTypes>>[],
        ).model,
        quotedPriceList:
            WithPaginationUpdateFnModel<typeof financeQuotedPriceSdk.pageQuotedPrice>().model,
    },
    overridesInitWatcher: {
        // 一期款
        createBill: false,
        reverseBill: false,

        warehouseList: false,
        fulfillmentDetail: false,
        reverseSettlement: false,
        exportSettlement: false,
        pageStorageFee: false,
        pageFulfillmentFee: false,
        pageVasFee: false,
        createSettlement: false,
        createVasFee: false,
        modifyVasFee: false,

        // 二期款
        createSecondPayment: false,
        reverseSecondPayment: false,
        exportSecondPaymentDetail: false,
        exportSecondPaymentPreview: false,

        // 海外仓
        tryQuotePrice: false,
        timeCheckStatus: false,
        createQuotePrice: false,
        fulfillmentMiss: false,
        storageMiss: false,
        vasMiss: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);
    const pageSettlement = autoContextFlow(
        'warehouseList',
        async (...args: Parameters<typeof financeWarehouseSdk.pageSettlement>) => {
            const { data: res } = await financeWarehouseSdk.pageSettlement(...args);
            return res;
        },
    );

    const getWarehouseFeeSettlement = autoContextFlow(
        'warehouseDetail',
        async (...args: Parameters<typeof financeWarehouseSdk.getWarehouseFeeSettlement>) => {
            const { data: res } = await financeWarehouseSdk.getWarehouseFeeSettlement(...args);
            return res;
        },
    );

    const reverseSettlement = autoContextFlow(
        'reverseSettlement',
        async (...args: Parameters<typeof financeWarehouseSdk.reverseSettlement>) => {
            const { data: res } = await financeWarehouseSdk.reverseSettlement(...args);
            return res;
        },
    );

    const exportSettlement = autoContextFlow(
        'exportSettlement',
        async (...args: Parameters<typeof financeWarehouseSdk.exportSettlement>) => {
            const { data: res } = await financeWarehouseSdk.exportSettlement(...args);
            return res;
        },
    );

    // 一次性提货费分页
    const pageFulfillmentFee = autoContextFlow(
        'pageFulfillmentFee',
        async (...args: Parameters<typeof financeWarehouseSdk.pageFulfillmentFee>) => {
            const { data: res } = await financeWarehouseSdk.pageFulfillmentFee(...args);
            return res;
        },
    );

    // 超期仓储费分页
    const pageStorageFee = autoContextFlow(
        'pageStorageFee',
        async (...args: Parameters<typeof financeWarehouseSdk.pageStorageFee>) => {
            const { data: res } = await financeWarehouseSdk.pageStorageFee(...args);
            return res;
        },
    );

    // 附加服务费分页
    const pageVasFee = autoContextFlow(
        'pageVasFee',
        async (...args: Parameters<typeof financeWarehouseSdk.pageVasFee>) => {
            const { data: res } = await financeWarehouseSdk.pageVasFee(...args);
            return res;
        },
    );

    // 导出VAS费用
    const exportVasFee = autoContextFlow(
        'exportVasFee',
        async (...args: Parameters<typeof financeWarehouseSdk.exportVasFee>) => {
            const { data: res } = await financeWarehouseSdk.exportVasFee(...args);
            return res;
        },
    );

    // 生成结算单
    const createSettlement = autoContextFlow(
        'createSettlement',
        async (...args: Parameters<typeof financeWarehouseSdk.createSettlement>) => {
            const { data: res } = await financeWarehouseSdk.createSettlement(...args);
            return res;
        },
    );

    // 创建附加服务费
    const createVasFee = autoContextFlow(
        'createVasFee',
        async (...args: Parameters<typeof financeWarehouseSdk.createVasFee>) => {
            const { data: res } = await financeWarehouseSdk.createVasFee(...args);
            return res;
        },
    );

    // 修改附加服务费
    const modifyVasFee = autoContextFlow(
        'modifyVasFee',
        async (...args: Parameters<typeof financeWarehouseSdk.modifyVasFee>) => {
            const { data: res } = await financeWarehouseSdk.modifyVasFee(...args);
            return res;
        },
    );

    // 查询vas价格配置
    const queryVasPrice = autoContextFlow(
        'queryVasPrice',
        async (...args: Parameters<typeof financeWarehouseVasFeePriceSdk.queryVasPrice>) => {
            const { data: res } = await financeWarehouseVasFeePriceSdk.queryVasPrice(...args);
            return res;
        },
    );

    // 更新vas价格配置
    const updateVasPrice = autoContextFlow(
        'updateVasPrice',
        async (...args: Parameters<typeof financeWarehouseVasFeePriceSdk.updateVasPrice>) => {
            const { data: res } = await financeWarehouseVasFeePriceSdk.updateVasPrice(...args);
            return res;
        },
    );

    return {
        // 查询指定公司最后一次一期款
        getPreBillingRangeByCompanyId: autoContextFlow(
            'preBillingRangeInfo',
            async (...args: Parameters<typeof firstInstalmentSdk.queryLastPaymentCode>) => {
                const res = await firstInstalmentSdk.queryLastPaymentCode(...args);
                return res.data;
            },
        ),
        // 预览一期款
        getPreviewData: autoContextFlow(
            'previewData',
            async (...args: Parameters<typeof firstInstalmentSdk.preview>) => {
                const res = await firstInstalmentSdk.preview(...args);
                return res.data;
            },
        ),
        // 生成一期款
        create: autoContextFlow(
            'createBill',
            async (...args: Parameters<typeof firstInstalmentSdk.create>) => {
                const res = await firstInstalmentSdk.create(...args);
                return res.data;
            },
        ),
        // 导出一期款详情
        exportDetailByPaymentCode: autoContextFlow(
            'advanceBillUrlData',
            async (...args: Parameters<typeof firstInstalmentSdk.exportDetailByPaymentCode>) => {
                const res = await firstInstalmentSdk.exportDetailByPaymentCode(...args);
                return res.data;
            },
        ),
        // 导出预览的一期款
        exportPreview: autoContextFlow(
            'advanceBillUrlData',
            async (...args: Parameters<typeof firstInstalmentSdk.exportPreview>) => {
                const res = await firstInstalmentSdk.exportPreview(...args);
                return res.data;
            },
        ),
        // 撤销一期款
        reverse: autoContextFlow(
            'reverseBill',
            async (...args: Parameters<typeof firstInstalmentSdk.reverse>) => {
                const res = await firstInstalmentSdk.reverse(...args);
                return res.data;
            },
        ),
        // 撤销二期款
        reverseSecondInstalment: autoContextFlow(
            'reverseSecondPayment',
            async (...args: Parameters<typeof secondInstalmentSdk.reverse>) => {
                const res = await secondInstalmentSdk.reverse(...args);
                return res.data;
            },
        ),
        // 导出二期款预览
        exportSecondInstalmentPreview: autoContextFlow(
            'exportSecondPaymentPreview',
            async (...args: Parameters<typeof secondInstalmentSdk.exportPreview>) => {
                const res = await secondInstalmentSdk.exportPreview(...args);
                return res.data;
            },
        ),
        // 导出二期款详情
        exportSecondInstalmentDetail: autoContextFlow(
            'exportSecondPaymentDetail',
            async (...args: Parameters<typeof secondInstalmentSdk.exportDetailByPaymentCode>) => {
                const res = await secondInstalmentSdk.exportDetailByPaymentCode(...args);
                return res.data;
            },
        ),
        // 查询指定公司最后一次二期款
        getLastSecondInstalment: autoContextFlow(
            'lastSecondInstalment',
            async (...args: Parameters<typeof secondInstalmentSdk.queryLastPayment>) => {
                const res = await secondInstalmentSdk.queryLastPayment(...args);
                return res.data;
            },
        ),
        // 预览二期款
        getSecondInstalmentPreviewData: autoContextFlow(
            'secondInstalmentPreviewData',
            async (...args: Parameters<typeof secondInstalmentSdk.preview>) => {
                const res = await secondInstalmentSdk.preview(...args);
                return res.data;
            },
        ),
        // 生成二期款
        createSecondInstalment: autoContextFlow(
            'createSecondPayment',
            async (...args: Parameters<typeof secondInstalmentSdk.create>) => {
                const res = await secondInstalmentSdk.create(...args);
                return res.data;
            },
        ),
        // 二期款结算进度详情
        getSecondInstalmentStatusDetail: autoContextFlow(
            'secondInstalmentStatusDetail',
            async (...args: Parameters<typeof secondInstalmentSdk.querySettleDetail>) => {
                const res = await secondInstalmentSdk.querySettleDetail(...args);
                return res.data;
            },
        ),
        // 一次性提货费遗漏查询
        getFulfillmentMiss: autoContextFlow(
            'fulfillmentMiss',
            async (...args: Parameters<typeof financeWarehouseSdk.listMissingFulfillmentFee>) => {
                const res = await financeWarehouseSdk.listMissingFulfillmentFee(...args);
                return res.data;
            },
        ),
        // 仓储费遗漏查询
        getStorageMiss: autoContextFlow(
            'storageMiss',
            async (...args: Parameters<typeof financeWarehouseSdk.listMissingStorageFee>) => {
                const res = await financeWarehouseSdk.listMissingStorageFee(...args);
                return res.data;
            },
        ),
        // 附加服务费遗漏查询
        getVasMiss: autoContextFlow(
            'vasMiss',
            async (...args: Parameters<typeof financeWarehouseSdk.listMissingVasFee>) => {
                const res = await financeWarehouseSdk.listMissingVasFee(...args);
                return res.data;
            },
        ),
        // 创建 Vas 费用类型
        createVasFeeType: autoContextFlow(
            'vasFeeType',
            async (...args: Parameters<typeof financeWarehouseSdk.createVasFeeType>) => {
                const res = await financeWarehouseSdk.createVasFeeType(...args);
                return res.data;
            },
        ),
        // 删除 Vas 费用类型
        deleteVasFeeType: autoContextFlow(
            'delVasFeeType',
            async (...args: Parameters<typeof financeWarehouseSdk.deleteVasFeeType>) => {
                const res = await financeWarehouseSdk.deleteVasFeeType(...args);
                return res.data;
            },
        ),
        // 修改 VAS 费用类型
        saveVasFeeType: autoContextFlow(
            'editVasFeeType',
            async (...args: Parameters<typeof financeWarehouseSdk.updateVasFeeType>) => {
                const res = await financeWarehouseSdk.updateVasFeeType(...args);
                return res.data;
            },
        ),
        // 分页查询 VAS 费用类型列表
        pageVasFeeType: autoContextFlow(
            'vasFeeTypeList',
            async (...args: Parameters<typeof financeWarehouseSdk.pageVasFeeType>) => {
                const res = await financeWarehouseSdk.pageVasFeeType(...args);
                return res.data;
            },
        ),
        // 查询 VAS 费用类型列表 （不带分页的版本）
        getVasFeeTypeList: autoContextFlow(
            'vasFeeTypeArray',
            async (...args: Parameters<typeof financeWarehouseSdk.vasFeeTypes>) => {
                const res = await financeWarehouseSdk.vasFeeTypes(...args);
                return res.data;
            },
        ),
        // 批量缇娜家附加服务费
        saveVasBatch: autoContextFlow(
            'saveVasBatch',
            async (...args: Parameters<typeof financeWarehouseSdk.saveBatchVasFee>) => {
                const res = await financeWarehouseSdk.saveBatchVasFee(...args);
                return res.data;
            },
        ),
        // 用 Excel 批量添加附加服务费 (new)
        excelSaveVasBatch: autoContextFlow(
            'saveExcelBatch',
            async (...args: Parameters<typeof financeWarehouseSdk.excelSaveBatchVasFee>) => {
                const { data } = await financeWarehouseSdk.excelSaveBatchVasFee(...args);
                return data;
            },
        ),
        // 分页查询海外仓报价
        pageQuotedPrice: autoContextFlow(
            'quotedPrice',
            async (...args: Parameters<typeof financeQuotedPriceSdk.pageQuotedPrice>) => {
                const { data } = await financeQuotedPriceSdk.pageQuotedPrice(...args);
                return data;
            },
        ),
        // 创建海外仓储报价
        createQuotedPrice: autoContextFlow(
            'createQuotePrice',
            async (...args: Parameters<typeof financeQuotedPriceSdk.createQuotedPrice>) => {
                const { data } = await financeQuotedPriceSdk.createQuotedPrice(...args);
                return data;
            },
        ),
        // 删除海外仓储报价
        deleteQuotedPrice: autoContextFlow(
            'deleteQuotePrice',
            async (...args: Parameters<typeof financeQuotedPriceSdk.deleteQuotedPrice>) => {
                const { data } = await financeQuotedPriceSdk.deleteQuotedPrice(...args);
                return data;
            },
        ),
        // 海外仓储报价详情
        getQuotedPriceDetail: autoContextFlow(
            'quotePriceDetail',
            async (...args: Parameters<typeof financeQuotedPriceSdk.quotedPriceDetail>) => {
                const { data } = await financeQuotedPriceSdk.quotedPriceDetail(...args);
                return data;
            },
        ),
        // 海外仓储报价试算
        tryQuotedPrice: autoContextFlow(
            'tryQuotePrice',
            async (...args: Parameters<typeof financeQuotedPriceSdk.quotedPriceTry>) => {
                const { data } = await financeQuotedPriceSdk.quotedPriceTry(...args);
                return data;
            },
        ),
        // 更新海外仓储报价
        updateQuotePrice: autoContextFlow(
            'updateQuotePrice',
            async (...args: Parameters<typeof financeQuotedPriceSdk.updateQuotedPrice>) => {
                const { data } = await financeQuotedPriceSdk.updateQuotedPrice(...args);
                return data;
            },
        ),
        // 库存核对检查的最新时间（该时间点之前的库存快照都是准确的）
        getInventorTimeCheckStatus: autoContextFlow(
            'timeCheckStatus',
            async (...args: Parameters<typeof financeWarehouseSdk.inventoryCheckTime>) => {
                const { data } = await financeWarehouseSdk.inventoryCheckTime(...args);
                return data;
            },
        ),
        // 库存核对检查的最新时间（该时间点之前的库存快照都是准确的）
        queryLog: autoContextFlow(
            'queryLog',
            async (...args: Parameters<typeof financeOperateSdk.queryLog>) => {
                const { data } = await financeOperateSdk.queryLog(...args);
                return data;
            },
        ),
        pageSettlement,
        getWarehouseFeeSettlement,
        reverseSettlement,
        exportSettlement,
        pageFulfillmentFee,
        pageStorageFee,
        pageVasFee,
        createVasFee,
        modifyVasFee,
        createSettlement,
        exportVasFee,
        queryVasPrice,
        updateVasPrice,
    };
});
