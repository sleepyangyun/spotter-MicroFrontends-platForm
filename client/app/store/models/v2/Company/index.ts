import Model from '@app/store/infra/Model';
import WithPrimaryUpdateFnModel from '@app/store/infra/WithPrimaryUpdateFnModel';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { companySdk } from '@app/services/v2/auth/company';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';

const CompanyStore = Model({
    name: 'CategoryStore',
    properties: {
        companyInfo: WithPrimaryUpdateFnModel(<ApiReturnType<typeof companySdk.getInfo>>{}).model,
        companyListAll: WithPrimaryUpdateFnModel<typeof companySdk.listAll>([]).model,
    },
    overridesInitWatcher: {
        companyListAll: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);
    const getCompanyInfo = autoContextFlow(
        'companyInfo',
        async (...args: Parameters<typeof companySdk.getInfo>) => {
            const { data: response } = await companySdk.getInfo(...args);
            return response;
        },
    );
    const getCompanyListAll = autoContextFlow(
        'companyListAll',
        async (...args: Parameters<typeof companySdk.listAll>) => {
            const { data: response } = await companySdk.listAll(...args);
            return response;
        },
    );

    return {
        getCompanyInfo,
        getCompanyListAll,
    };
});

export default CompanyStore;
