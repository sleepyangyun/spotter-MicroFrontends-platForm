import Model from '@app/store/infra/Model';
import WithPrimaryUpdateFnModel from '@client/app/store/infra/WithPrimaryUpdateFnModel';

const AppStore = Model({
    name: 'AppStore',
    properties: {
        menuLoading: WithPrimaryUpdateFnModel(false).model,
    },
}).actions((self) => {
    const toggleMenuLoading = () => !self.menuLoading;
    return {
        toggleMenuLoading,
    };
});

export default AppStore;
