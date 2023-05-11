import Model from '@app/store/infra/Model';
import WithPaginationUpdateFnModel from '@app/store/infra/WithPaginationUpdateFnModel';
import WithPrimaryUpdateFnModel from '@app/store/infra/WithPrimaryUpdateFnModel';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { spotterShipmentRemarkApiSdk, spotterShipmentSdk } from '@app/services/v2/logistics';
import { types } from 'mobx-state-tree';
import { ApiPaginationReturnType, ApiReturnType } from '@spotter/gmesh-api-sdk';
import { spotterCommonApiSdk } from '@client/app/services/v2/common';

export const SptShipmentStore = Model({
    name: 'SptShipmentStore',
    properties: {
        sptShipmentList: WithPaginationUpdateFnModel(
            types.frozen<ApiPaginationReturnType<typeof spotterShipmentSdk.orderPage>>(),
        ).model,
        shipmentRemarkList: WithPrimaryUpdateFnModel(
            {} as ApiReturnType<typeof spotterShipmentRemarkApiSdk.list>,
        ).model,
        sptShipmentDetail: WithPrimaryUpdateFnModel(
            {} as ApiReturnType<typeof spotterShipmentSdk.orderDetail>,
        ).model,
    },
    overridesInitWatcher: {
        exportExcel: false,
        exportPdf: false,
        shipmentRemarkList: false,
        confirmDeliveryDate: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);
    // 确认预计送达时间
    const confirmDeliveryDate = autoContextFlow(
        'confirmDeliveryDate',
        async (...args: Parameters<typeof spotterShipmentSdk.confirmDeliveryDate>) => {
            const { data: response } = await spotterShipmentSdk.confirmDeliveryDate(...args);
            return response;
        },
    );

    // 查询SPT物流订单详情
    const getSptShipmentDetail = autoContextFlow(
        'sptShipmentDetail',
        async (...args: Parameters<typeof spotterShipmentSdk.orderDetail>) => {
            const { data: response } = await spotterShipmentSdk.orderDetail(...args);
            return response;
        },
    );

    // SPT物流订单Excel导出
    const exportExcel = autoContextFlow(
        'exportExcel',
        async (...args: Parameters<typeof spotterShipmentSdk.orderExport>) => {
            const { data: response } = await spotterShipmentSdk.orderExport(...args);
            return response;
        },
    );

    // 分页条件查询SPT物流单
    const getSptShipmentPage = autoContextFlow(
        'sptShipmentList',
        async (...args: Parameters<typeof spotterShipmentSdk.orderPage>) => {
            const { data: response } = await spotterShipmentSdk.orderPage(...args);
            return response;
        },
    );
    // SPT物流查询发货备注
    const getShipmentRemarkList = autoContextFlow(
        'shipmentRemarkList',
        async (...args: Parameters<typeof spotterShipmentRemarkApiSdk.list>) => {
            const { data: response } = await spotterShipmentRemarkApiSdk.list(...args);
            return response;
        },
    );

    // 导出箱唛pdf
    const exportPdf = autoContextFlow(
        'exportPdf',
        async (...args: Parameters<typeof spotterCommonApiSdk.exportPdf_1>) => {
            const { data: response } = await spotterCommonApiSdk.exportPdf_1(...args);
            return response;
        },
    );
    return {
        confirmDeliveryDate,
        getSptShipmentDetail,
        getSptShipmentPage,
        exportExcel,
        getShipmentRemarkList,
        exportPdf,
    };
});
