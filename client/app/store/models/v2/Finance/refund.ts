import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import {
    SpotterAccountPaymentSdk,
    SpotterAmazonReturnSdk,
    SpotterAmazonShortageMissedSdk,
} from '@app/services/v2/finance';
import WithPrimaryUpdateFnModel from '@client/app/store/infra/WithPrimaryUpdateFnModel';
import {
    RefundDetailListModel,
    ShortageMissedDetailsListModel,
} from '@app/services/v2/finance/refund.model';

const RefundStore = Model({
    name: 'RefundStore',
    properties: {
        selectedReturns: WithPrimaryUpdateFnModel([] as RefundDetailListModel).model,
        returnDetails: WithPrimaryUpdateFnModel([] as RefundDetailListModel).model,
        lostStockDetails: WithPrimaryUpdateFnModel([] as ShortageMissedDetailsListModel).model,
    },
    overridesInitWatcher: {
        detail: false,
        sptShipmentOrderRelation: false,
        queryReturnDetails: false,
        queryLostStockDetails: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);
    // 根据款项id获取结算详情
    const detail = autoContextFlow(
        'detail',
        async (...args: Parameters<typeof SpotterAccountPaymentSdk.detail>) => {
            const { data: response } = await SpotterAccountPaymentSdk.detail(...args);
            return response;
        },
    );
    // 导出结算记录（excel）
    const exportExcel = autoContextFlow(
        'exportExcel',
        async (...args: Parameters<typeof SpotterAccountPaymentSdk.exportExcel>) => {
            const { data: response } = await SpotterAccountPaymentSdk.exportExcel(...args);
            return response;
        },
    );
    // 应付采购货款结算
    const settlement = autoContextFlow(
        'settlement',
        async (...args: Parameters<typeof SpotterAccountPaymentSdk.settlement>) => {
            const { data: response } = await SpotterAccountPaymentSdk.settlement(...args);
            return response;
        },
    );
    // 获取结算信息概览
    const summary = autoContextFlow(
        'summary',
        async (...args: Parameters<typeof SpotterAccountPaymentSdk.summary>) => {
            const { data: response } = await SpotterAccountPaymentSdk.summary(...args);
            return response;
        },
    );
    // 指定id撤销结算
    const undo = autoContextFlow(
        'summary',
        async (...args: Parameters<typeof SpotterAccountPaymentSdk.undo>) => {
            const { data: response } = await SpotterAccountPaymentSdk.undo(...args);
            return response;
        },
    );
    // 查询退货详情s
    const queryReturnDetails = autoContextFlow(
        'returnDetails',
        async (...args: Parameters<typeof SpotterAmazonReturnSdk.nonSettlementDetails>) => {
            const { data: response } = await SpotterAmazonReturnSdk.nonSettlementDetails(...args);
            return response;
        },
    );
    // 查询丢缺货详情s
    const queryLostStockDetails = autoContextFlow(
        'lostStockDetails',
        async (...args: Parameters<typeof SpotterAmazonShortageMissedSdk.nonSettlementDetails>) => {
            const { data: response } = await SpotterAmazonShortageMissedSdk.nonSettlementDetails(
                ...args,
            );
            return response;
        },
    );
    // 查询退货明细基础信息
    const getReturnDetailList = autoContextFlow(
        'returnDetailList',
        async (...args: Parameters<typeof SpotterAmazonReturnSdk.getReturnDetailList>) => {
            const { data: response } = await SpotterAmazonReturnSdk.getReturnDetailList(...args);
            return response;
        },
    );
    // 根据ID更新退货详情
    const updateReturnDetail = autoContextFlow(
        'updateReturnDetail',
        async (...args: Parameters<typeof SpotterAmazonReturnSdk.supplementAmzReturnDetail>) => {
            const { data: response } = await SpotterAmazonReturnSdk.supplementAmzReturnDetail(
                ...args,
            );
            return response;
        },
    );
    // 询丢缺货明细基础信息
    const getLostStockDetailList = autoContextFlow(
        'lostStockDetailList',
        async (...args: Parameters<typeof SpotterAmazonShortageMissedSdk.getReturnDetailList>) => {
            const { data: response } = await SpotterAmazonShortageMissedSdk.getReturnDetailList(
                ...args,
            );
            return response;
        },
    );
    // 根据ID更新缺货详情
    const updateLostStockDetail = autoContextFlow(
        'updateLostStockDetail',
        async (
            ...args: Parameters<typeof SpotterAmazonShortageMissedSdk.supplementAmzShortageMissed>
        ) => {
            const { data: response } =
                await SpotterAmazonShortageMissedSdk.supplementAmzShortageMissed(...args);
            return response;
        },
    );
    return {
        detail,
        exportExcel,
        settlement,
        summary,
        undo,
        queryReturnDetails,
        queryLostStockDetails,
        getReturnDetailList,
        updateReturnDetail,
        getLostStockDetailList,
        updateLostStockDetail,
    };
});

export default RefundStore;
