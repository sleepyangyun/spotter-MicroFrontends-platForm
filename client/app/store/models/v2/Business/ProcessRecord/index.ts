import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { businessProcessRecordSdk } from '@app/services/v2/business';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';
import WithPrimaryUpdateFnModel from '@client/app/store/infra/WithPrimaryUpdateFnModel';

const BusinessProcessRecordStore = Model({
    name: 'BusinessProcessRecordStore',
    properties: {
        allRecordList: WithPrimaryUpdateFnModel<typeof businessProcessRecordSdk.all>(
            <ApiReturnType<typeof businessProcessRecordSdk.all>>[],
        ).model,
        auditList: WithPrimaryUpdateFnModel<typeof businessProcessRecordSdk.audit>(
            <ApiReturnType<typeof businessProcessRecordSdk.audit>>{},
        ).model,
        commentsList: WithPrimaryUpdateFnModel<typeof businessProcessRecordSdk.comments>(
            <ApiReturnType<typeof businessProcessRecordSdk.comments>>[],
        ).model,
    },
    overridesInitWatcher: {
        addComments: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    const addComments = autoContextFlow(
        'addComments',
        async (...args: Parameters<typeof businessProcessRecordSdk.addComments>) => {
            const { data: response } = await businessProcessRecordSdk.addComments(...args);
            return response;
        },
    );

    const getAllRecordList = autoContextFlow(
        'allRecordList',
        async (...args: Parameters<typeof businessProcessRecordSdk.all>) => {
            const { data: response } = await businessProcessRecordSdk.all(...args);
            return response;
        },
    );

    const getAuditList = autoContextFlow(
        'auditList',
        async (...args: Parameters<typeof businessProcessRecordSdk.audit>) => {
            const { data: response } = await businessProcessRecordSdk.audit(...args);
            return response;
        },
    );

    const getCommentsList = autoContextFlow(
        'commentsList',
        async (...args: Parameters<typeof businessProcessRecordSdk.comments>) => {
            const { data: response } = await businessProcessRecordSdk.comments(...args);
            return response;
        },
    );

    return {
        addComments,
        getAllRecordList,
        getAuditList,
        getCommentsList,
    };
});

export default BusinessProcessRecordStore;
