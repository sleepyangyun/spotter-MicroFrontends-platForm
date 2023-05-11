import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import WithPrimaryUpdateFnModel from '@app/store/infra/WithPrimaryUpdateFnModel';
import {
    amzLogisticsSdk,
    // logisticsSdk,
    logisticsGmeshSdk,
    amzLogisticsGmeshSdk,
} from '@app/services/v2/logistics/amzLogistics';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';

const AmzLogisticsStore = Model({
    name: 'AmzLogisticsStore',
    properties: {
        amzLogisticsList: WithPrimaryUpdateFnModel(
            <ApiReturnType<typeof amzLogisticsGmeshSdk.getShipmentListWithItems>>{},
        ).model,
        amzLogisticsDetail: WithPrimaryUpdateFnModel(
            <ApiReturnType<typeof amzLogisticsGmeshSdk.getShipmentDetailWithItems>>{},
        ).model,
        shipmentStateInfo: WithPrimaryUpdateFnModel(
            <ApiReturnType<typeof amzLogisticsGmeshSdk.getShipmentStateInfo>>{},
        ).model,
        amzShipmentLogisticsList: WithPrimaryUpdateFnModel(
            <ApiReturnType<typeof logisticsGmeshSdk.getShipmentLogisticsList>>[],
        ).model,
        amzShipmentFileDownloadPath: WithPrimaryUpdateFnModel(
            <ApiReturnType<typeof amzLogisticsGmeshSdk.getShipmentFileDownloadPath>>{},
        ).model,
        uploadBolSignBillData: WithPrimaryUpdateFnModel(
            <ApiReturnType<typeof amzLogisticsSdk.uploadBolSignBill>>{},
        ).model,
        shipmentShippingList: WithPrimaryUpdateFnModel(
            <ApiReturnType<typeof amzLogisticsGmeshSdk.getShipmentShippingList>>{},
        ).model,
    },
    overridesInitWatcher: {
        cancelAmzShipment: false,
        updateAmzShipmentFRD: false,
        resendEmail: false,
        pullCarrier: false,
        addOutStockMark: false,
        exportLogisticsList: false,
        downloadArrivalCertificate: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);
    const getAmzLogisticsList = autoContextFlow(
        'amzLogisticsList',
        async (...args: Parameters<typeof amzLogisticsGmeshSdk.getShipmentListWithItems>) => {
            const { data: response } = await amzLogisticsGmeshSdk.getShipmentListWithItems(...args);
            return response;
        },
    );
    const getAmzLogisticsDetail = autoContextFlow(
        'amzLogisticsDetail',
        async (...args: Parameters<typeof amzLogisticsGmeshSdk.getShipmentDetailWithItems>) => {
            const { data: response } = await amzLogisticsGmeshSdk.getShipmentDetailWithItems(
                ...args,
            );
            return response;
        },
    );

    const cancelAmzShipment = autoContextFlow(
        'cancelAmzShipment',
        async (...args: Parameters<typeof amzLogisticsSdk.cancelShipment>) => {
            const { data: response } = await amzLogisticsSdk.cancelShipment(...args);
            return response;
        },
    );

    const updateAmzShipmentFRD = autoContextFlow(
        'updateAmzShipmentFRD',
        async (...args: Parameters<typeof amzLogisticsSdk.updateShipmentFRD>) => {
            const { data: response } = await amzLogisticsSdk.updateShipmentFRD(...args);
            return response;
        },
    );

    const getShipmentStateInfo = autoContextFlow(
        'shipmentStateInfo',
        async (...args: Parameters<typeof amzLogisticsGmeshSdk.getShipmentStateInfo>) => {
            const { data: response } = await amzLogisticsGmeshSdk.getShipmentStateInfo(...args);
            return response;
        },
    );

    const resendEmail = autoContextFlow(
        'resendEmail',
        async (...args: Parameters<typeof amzLogisticsSdk.resendEmail>) => {
            const { data: response } = await amzLogisticsSdk.resendEmail(...args);
            return response;
        },
    );

    const pullCarrier = autoContextFlow(
        'pullCarrier',
        async (...args: Parameters<typeof amzLogisticsSdk.pullCarrier>) => {
            const { data: response } = await amzLogisticsSdk.pullCarrier(...args);
            return response;
        },
    );

    const getAmzShipmentFileDownloadPath = autoContextFlow(
        'amzShipmentFileDownloadPath',
        async (...args: Parameters<typeof amzLogisticsGmeshSdk.getShipmentFileDownloadPath>) => {
            const { data: response } = await amzLogisticsGmeshSdk.getShipmentFileDownloadPath(
                ...args,
            );
            return response;
        },
    );

    const addOutStockMark = autoContextFlow(
        'addOutStockMark',
        async (...args: Parameters<typeof amzLogisticsSdk.addOutStockMark>) => {
            const { data: response } = await amzLogisticsSdk.addOutStockMark(...args);
            return response;
        },
    );

    const uploadBolSignBill = autoContextFlow(
        'uploadBolSignBillData',
        async (...args: Parameters<typeof amzLogisticsSdk.uploadBolSignBill>) => {
            const { data: response } = await amzLogisticsSdk.uploadBolSignBill(...args);
            return response;
        },
    );

    const getShipmentShippingList = autoContextFlow(
        'shipmentShippingList',
        async (...args: Parameters<typeof amzLogisticsGmeshSdk.getShipmentShippingList>) => {
            const { data: response } = await amzLogisticsGmeshSdk.getShipmentShippingList(...args);
            return response;
        },
    );

    const exportLogisticsList = autoContextFlow(
        'exportLogisticsList',
        async (...args: Parameters<typeof logisticsGmeshSdk.exportLogisticsList>) => {
            const { data: response } = await logisticsGmeshSdk.exportLogisticsList(...args);
            return response;
        },
    );

    const downloadArrivalCertificate = autoContextFlow(
        'downloadArrivalCertificate',
        async (...args: Parameters<typeof logisticsGmeshSdk.downloadArrivalCertificate>) => {
            const { data: response } = await logisticsGmeshSdk.downloadArrivalCertificate(...args);
            return response;
        },
    );

    const getAmzShipmentLogisticsList = autoContextFlow(
        'amzShipmentLogisticsList',
        async (...args: Parameters<typeof logisticsGmeshSdk.getShipmentLogisticsList>) => {
            const { data: response } = await logisticsGmeshSdk.getShipmentLogisticsList(...args);
            return response;
        },
    );

    return {
        getAmzLogisticsList,
        getAmzLogisticsDetail,
        getAmzShipmentLogisticsList,
        cancelAmzShipment,
        updateAmzShipmentFRD,
        getShipmentStateInfo,
        resendEmail,
        pullCarrier,
        getAmzShipmentFileDownloadPath,
        addOutStockMark,
        uploadBolSignBill,
        getShipmentShippingList,
        exportLogisticsList,
        downloadArrivalCertificate,
    };
});

export default AmzLogisticsStore;
