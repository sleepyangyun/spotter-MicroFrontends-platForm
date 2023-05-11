import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import WithPrimaryUpdateFnModel from '@app/store/infra/WithPrimaryUpdateFnModel';
import { logSdk, logEnumSdk } from '@app/services/v2/log';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';
import WithPaginationUpdateFnModel from '@client/app/store/infra/WithPaginationUpdateFnModel';

const LogStore = Model({
    name: 'LogStore',
    properties: {
        operationList: WithPrimaryUpdateFnModel({} as ApiReturnType<typeof logSdk.findList>).model,
        operationListPage: WithPaginationUpdateFnModel<typeof logSdk.findPage>().model,
        operationLogEnumList: WithPrimaryUpdateFnModel(<any>{}).model,
    },
    overridesInitWatcher: {},
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);
    const getOperationList = autoContextFlow(
        'operationList',
        async (...args: Parameters<typeof logSdk.findList>) => {
            const { data: response } = await logSdk.findList(...args);
            return response;
        },
    );
    const getOperationListPage = autoContextFlow(
        'operationListPage',
        async (...args: Parameters<typeof logSdk.findPage>) => {
            const { data: response } = await logSdk.findPage(...args);
            return response;
        },
    );

    const getOperationLogEnumList = autoContextFlow(
        'operationLogEnumList',
        async (...args: Parameters<typeof logEnumSdk.all>) => {
            const { data: response } = await logEnumSdk.all(...args);
            return response;
        },
    );

    return {
        getOperationList,
        getOperationListPage,
        getOperationLogEnumList,
    };
});

export default LogStore;
