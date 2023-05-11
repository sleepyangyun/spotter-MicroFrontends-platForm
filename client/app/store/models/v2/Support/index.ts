import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { supportSdk } from '@app/services/v2/support/support';

const SupportStore = Model({
    name: 'SupportStore',
    properties: {},
    overridesInitWatcher: {
        uploadAttachment: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);
    const uploadAttachment = autoContextFlow(
        'uploadAttachment',
        async (...args: Parameters<typeof supportSdk.uploadAttachment>) => {
            const { data: response } = await supportSdk.uploadAttachment(...args);
            return response;
        },
    );

    return {
        uploadAttachment,
    };
});

export default SupportStore;
