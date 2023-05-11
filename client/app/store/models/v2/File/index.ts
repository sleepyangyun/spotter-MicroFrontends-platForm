import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { fileSdk } from '@client/app/services/v2/file';
import WithPrimaryUpdateFnModel from '@client/app/store/infra/WithPrimaryUpdateFnModel';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';

const FileStore = Model({
    name: 'FileStore',
    properties: {
        credential: WithPrimaryUpdateFnModel(
            <ApiReturnType<typeof fileSdk.getTemporaryCredential>>{},
        ).model,
    },
    overridesInitWatcher: { getBatchZip: false },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);
    const getCredential = autoContextFlow(
        'credential',
        async (...args: Parameters<typeof fileSdk.getTemporaryCredential>) => {
            const { data: response } = await fileSdk.getTemporaryCredential(...args);
            return response;
        },
    );
    // ZIP多文件打包
    const getBatchZip = autoContextFlow(
        'getBatchZip',
        async (...args: Parameters<typeof fileSdk.getBatchZip>) => {
            const { data: response } = await fileSdk.getBatchZip(...args);
            return response;
        },
    );

    const getFileDownloadSigner = autoContextFlow(
        'getSevcFileDownloadSigner',
        async (...args: Parameters<typeof fileSdk.getFileDownloadSigner>) => {
            const { data: response } = await fileSdk.getFileDownloadSigner(...args);
            return response;
        },
    );
    return {
        getCredential,
        getBatchZip,
        getFileDownloadSigner,
    };
});

export default FileStore;
