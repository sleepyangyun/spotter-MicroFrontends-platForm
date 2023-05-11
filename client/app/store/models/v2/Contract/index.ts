import Model from '@app/store/infra/Model';
import WithPrimaryUpdateFnModel from '@app/store/infra/WithPrimaryUpdateFnModel';
import WithPaginationUpdateFnModel from '@app/store/infra/WithPaginationUpdateFnModel';
import { types } from 'mobx-state-tree';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { contractSdk } from '@app/services/v2/contract';
import { ApiReturnType, ApiPaginationReturnType } from '@spotter/gmesh-api-sdk';

const ContractStore = Model({
    name: 'ContractStore',
    properties: {
        contractDetail: WithPrimaryUpdateFnModel(<ApiReturnType<typeof contractSdk.detail>>{})
            .model,
        contractList: WithPaginationUpdateFnModel(
            types.frozen<ApiPaginationReturnType<typeof contractSdk.findPage>>(),
        ).model,
        orderTypeWithWarehouseList: WithPrimaryUpdateFnModel(
            <ApiReturnType<typeof contractSdk.orderTypeWithWarehouseList>>[],
        ).model,
        paymentWithRatesList: WithPrimaryUpdateFnModel(
            <ApiReturnType<typeof contractSdk.paymentWithRates>>[],
        ).model,
        supplementResidualAttachCount: WithPrimaryUpdateFnModel(
            <ApiReturnType<typeof contractSdk.supplementResidualAttachCount>>0,
        ).model,
    },
    overridesInitWatcher: {
        createContract: false,
        updateContract: false,
        uploadAttachment: false,
        supplementAttachedUpload: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);
    const createContract = autoContextFlow(
        'createContract',
        async (...args: Parameters<typeof contractSdk.create>) => {
            const { data: response } = await contractSdk.create(...args);
            return response;
        },
    );
    const getContractDetail = autoContextFlow(
        'contractDetail',
        async (...args: Parameters<typeof contractSdk.detail>) => {
            const { data: response } = await contractSdk.detail(...args);
            return response;
        },
    );

    const getContractList = autoContextFlow(
        'contractList',
        async (...args: Parameters<typeof contractSdk.findPage>) => {
            const { data: response } = await contractSdk.findPage(...args);
            return response;
        },
    );

    const getOrderTypeWithWarehouseList = autoContextFlow(
        'orderTypeWithWarehouseList',
        async (...args: Parameters<typeof contractSdk.orderTypeWithWarehouseList>) => {
            const { data: response } = await contractSdk.orderTypeWithWarehouseList(...args);
            return response;
        },
    );
    const getPaymentWithRatesList = autoContextFlow(
        'paymentWithRatesList',
        async (...args: Parameters<typeof contractSdk.paymentWithRates>) => {
            const { data: response } = await contractSdk.paymentWithRates(...args);
            return response;
        },
    );

    const updateContract = autoContextFlow(
        'updateContract',
        async (...args: Parameters<typeof contractSdk.update>) => {
            const { data: response } = await contractSdk.update(...args);
            return response;
        },
    );

    const getSupplementResidualAttachCount = autoContextFlow(
        'supplementResidualAttachCount',
        async (...args: Parameters<typeof contractSdk.supplementResidualAttachCount>) => {
            const { data: response } = await contractSdk.supplementResidualAttachCount(...args);
            return response;
        },
    );

    const supplementAttachedUpload = autoContextFlow(
        'supplementAttachedUpload',
        async (...args: Parameters<typeof contractSdk.supplementAttachedUpload>) => {
            const { data: response } = await contractSdk.supplementAttachedUpload(...args);
            return response;
        },
    );

    return {
        createContract,
        getContractDetail,
        getContractList,
        getOrderTypeWithWarehouseList,
        getPaymentWithRatesList,
        updateContract,
        getSupplementResidualAttachCount,
        supplementAttachedUpload,
    };
});

export default ContractStore;
