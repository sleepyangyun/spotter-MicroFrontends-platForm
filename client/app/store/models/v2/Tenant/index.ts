import WithPaginationUpdateFnModel from '@app/store/infra/WithPaginationUpdateFnModel';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import Model from '@app/store/infra/Model';
import { companySdk } from '@app/services/v2/auth/company';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';
import { userSdk } from '@app/services/v2/auth/user';
import { orgSdk } from '@app/services/v2/auth/org';
import WithPrimaryUpdateFnModel from '@client/app/store/infra/WithPrimaryUpdateFnModel';

const TenantStore = Model({
    name: 'TenantStore',
    properties: {
        companyModelList: WithPaginationUpdateFnModel<typeof companySdk.list>().model,
        countryCodeAndName: WithPrimaryUpdateFnModel<typeof companySdk.getCountryCode>(
            <ApiReturnType<typeof companySdk.getCountryCode>>{},
        ).model,
    },
    overridesInitWatcher: {
        createSeller: false,
        changeCompanyStatus: false,
        updateCompany: false,
        createCompany: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);
    const searchCompanyList = autoContextFlow(
        'companyModelList',
        async (...args: Parameters<typeof companySdk.list>) => {
            const { data: res } = await companySdk.list(...args);
            return res;
        },
    );
    const getCountryCodeAndName = autoContextFlow(
        'countryCodeAndName',
        async (...args: Parameters<typeof companySdk.getCountryCode>) => {
            const { data: res } = await companySdk.getCountryCode(...args);
            return res;
        },
    );
    const changeCompanyStatus = autoContextFlow(
        'changeCompanyStatus',
        async (...args: Parameters<typeof companySdk.enableOrDisableCompany>) => {
            const { data: res } = await companySdk.enableOrDisableCompany(...args);
            return res;
        },
    );
    const updateCompany = autoContextFlow(
        'updateCompany',
        async (...args: Parameters<typeof companySdk.update>) => {
            const { data: res } = await companySdk.update(...args);
            return res;
        },
    );
    const createCompany = autoContextFlow(
        'createCompany',
        async (...args: Parameters<typeof companySdk.create>) => {
            const { data: res } = await companySdk.create(...args);
            return res;
        },
    );
    const addMember = autoContextFlow(
        'addMember',
        async (...args: Parameters<typeof userSdk.register>) => {
            const { data: res } = await userSdk.register(...args);
            return res;
        },
    );
    const searchDM = autoContextFlow(
        'searchDM',
        async (...args: Parameters<typeof orgSdk.searchOrgOrUserByKey>) => {
            const { data: res } = await orgSdk.searchOrgOrUserByKey(...args);
            return res;
        },
    );
    const searchMember = autoContextFlow(
        'searchMember',
        async (...args: Parameters<typeof userSdk.getUserList>) => {
            const { data: res } = await userSdk.getUserList(...args);
            return res;
        },
    );

    return {
        searchCompanyList,
        getCountryCodeAndName,
        changeCompanyStatus,
        updateCompany,
        createCompany,
        addMember,
        searchDM,
        searchMember,
    };
});
export default TenantStore;
