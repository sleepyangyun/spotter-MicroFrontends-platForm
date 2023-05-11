import Model from '@app/store/infra/Model';
import WithPrimaryUpdateFnModel from '@app/store/infra/WithPrimaryUpdateFnModel';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { companyBankSdk } from '@client/app/services/v2/auth/companyBank';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';

const CompanyBankStore = Model({
    name: 'CompanyBankStore',
    properties: {
        companyBankDetail: WithPrimaryUpdateFnModel(<ApiReturnType<typeof companyBankSdk.info>>{})
            .model,
    },
    overridesInitWatcher: {
        createCompanyBank: false,
        updateCompanyBank: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);
    const createCompanyBank = autoContextFlow(
        'createCompanyBank',
        async (...args: Parameters<typeof companyBankSdk.create>) => {
            const { data: response } = await companyBankSdk.create(...args);
            return response;
        },
    );

    const getCompanyBankDetail = autoContextFlow(
        'companyBankDetail',
        async (...args: Parameters<typeof companyBankSdk.info>) => {
            const { data: response } = await companyBankSdk.info(...args);
            return response;
        },
    );
    const updateCompanyBank = autoContextFlow(
        'updateCompanyBank',
        async (...args: Parameters<typeof companyBankSdk.update>) => {
            const { data: response } = await companyBankSdk.update(...args);
            return response;
        },
    );
    return {
        createCompanyBank,
        getCompanyBankDetail,
        updateCompanyBank,
    };
});

export default CompanyBankStore;
