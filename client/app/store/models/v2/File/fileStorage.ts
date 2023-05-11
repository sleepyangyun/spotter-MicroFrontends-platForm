import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { fileStorageSdk } from '@app/services/v2/file/fileStorage';
import WithPrimaryUpdateFnModel from '@client/app/store/infra/WithPrimaryUpdateFnModel';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';

const FileStorageStore = Model({
    name: 'FileStorageStore',
    properties: {
        credential: WithPrimaryUpdateFnModel(<ApiReturnType<typeof fileStorageSdk.getCredential>>{})
            .model,
    },
    overridesInitWatcher: {},
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);
    const getCredential = autoContextFlow(
        'credential',
        async (...args: Parameters<typeof fileStorageSdk.getCredential>) => {
            const { data: response } = await fileStorageSdk.getCredential(...args);
            return response;
        },
    );

    return {
        getCredential,
    };
});

export default FileStorageStore;
