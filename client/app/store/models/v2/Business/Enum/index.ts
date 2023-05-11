import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { businessEnumSdk } from '@app/services/v2/business/enum';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';
import WithPrimaryUpdateFnModel from '@client/app/store/infra/WithPrimaryUpdateFnModel';

const BusinessEnumStore = Model({
    name: 'BusinessEnumStore',
    properties: {
        agreementStatus: WithPrimaryUpdateFnModel<typeof businessEnumSdk.agreementStatus>(
            <ApiReturnType<typeof businessEnumSdk.agreementStatus>>[],
        ).model,
        agreementTypeList: WithPrimaryUpdateFnModel<typeof businessEnumSdk.agreementType>(
            <ApiReturnType<typeof businessEnumSdk.agreementType>>[],
        ).model,
        freeLeaseDays: WithPrimaryUpdateFnModel<typeof businessEnumSdk.freeLeaseDays>(
            <ApiReturnType<typeof businessEnumSdk.freeLeaseDays>>[],
        ).model,
        quotationAttribute: WithPrimaryUpdateFnModel<typeof businessEnumSdk.quotationAttribute>(
            <ApiReturnType<typeof businessEnumSdk.quotationAttribute>>[],
        ).model,
    },
    overridesInitWatcher: {},
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    const getAgreementStatus = autoContextFlow(
        'agreementStatus',
        async (...args: Parameters<typeof businessEnumSdk.agreementStatus>) => {
            const { data: response } = await businessEnumSdk.agreementStatus(...args);
            return response;
        },
    );

    const getAgreementTypeList = autoContextFlow(
        'agreementTypeList',
        async (...args: Parameters<typeof businessEnumSdk.agreementType>) => {
            const { data: response } = await businessEnumSdk.agreementType(...args);
            return response;
        },
    );

    const getFreeLeaseDays = autoContextFlow(
        'freeLeaseDays',
        async (...args: Parameters<typeof businessEnumSdk.freeLeaseDays>) => {
            const { data: response } = await businessEnumSdk.freeLeaseDays(...args);
            return response;
        },
    );

    const getQuotationAttribute = autoContextFlow(
        'quotationAttribute',
        async (...args: Parameters<typeof businessEnumSdk.quotationAttribute>) => {
            const { data: response } = await businessEnumSdk.quotationAttribute(...args);
            return response;
        },
    );

    return {
        getAgreementStatus,
        getAgreementTypeList,
        getFreeLeaseDays,
        getQuotationAttribute,
    };
});

export default BusinessEnumStore;
