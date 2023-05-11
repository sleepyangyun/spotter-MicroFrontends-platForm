import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import WithPaginationUpdateFnModel from '@client/app/store/infra/WithPaginationUpdateFnModel';
import { businessBrandAuthSdk } from '@app/services/v2/business/brandAuthReporting';
import { ApiPaginationReturnType, ApiReturnType } from '@spotter/gmesh-api-sdk';
import { types } from 'mobx-state-tree';
import WithPrimaryUpdateFnModel from '@client/app/store/infra/WithPrimaryUpdateFnModel';

const BusinessBrandAuthReportingStore = Model({
    name: 'BusinessBrandAuthReportingStore',
    properties: {
        brandAuthList: WithPaginationUpdateFnModel(
            types.frozen<
                ApiPaginationReturnType<typeof businessBrandAuthSdk.gmeshFindBrandAuthPage>
            >(),
        ).model,
        brandAuthDetail: WithPrimaryUpdateFnModel<typeof businessBrandAuthSdk.gmeshFindBrandById>(
            <ApiReturnType<typeof businessBrandAuthSdk.gmeshFindBrandById>>{},
        ).model,
        brandAuthUploadTimeoutList: WithPrimaryUpdateFnModel<
            typeof businessBrandAuthSdk.gmeshFindBrandAuthUploadTimeout
        >(<ApiReturnType<typeof businessBrandAuthSdk.gmeshFindBrandAuthUploadTimeout>>{}).model,
    },
    overridesInitWatcher: {
        auditBrandAuth: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    const getBrandAuthList = autoContextFlow(
        'brandAuthList',
        async (...args: Parameters<typeof businessBrandAuthSdk.gmeshFindBrandAuthPage>) => {
            const { data: response } = await businessBrandAuthSdk.gmeshFindBrandAuthPage(...args);
            return response;
        },
    );

    const getBrandAuthDetail = autoContextFlow(
        'brandAuthDetail',
        async (...args: Parameters<typeof businessBrandAuthSdk.gmeshFindBrandById>) => {
            const { data: response } = await businessBrandAuthSdk.gmeshFindBrandById(...args);
            return response;
        },
    );

    const auditBrandAuth = autoContextFlow(
        'auditBrandAuth',
        async (...args: Parameters<typeof businessBrandAuthSdk.gmeshAuditBrandAuth>) => {
            const { data: response } = await businessBrandAuthSdk.gmeshAuditBrandAuth(...args);
            return response;
        },
    );

    const getBrandAuthUploadTimeoutList = autoContextFlow(
        'brandAuthUploadTimeoutList',
        async (
            ...args: Parameters<typeof businessBrandAuthSdk.gmeshFindBrandAuthUploadTimeout>
        ) => {
            const { data: response } = await businessBrandAuthSdk.gmeshFindBrandAuthUploadTimeout(
                ...args,
            );
            return response;
        },
    );

    return {
        getBrandAuthList,
        getBrandAuthDetail,
        auditBrandAuth,
        getBrandAuthUploadTimeoutList,
    };
});

export default BusinessBrandAuthReportingStore;
