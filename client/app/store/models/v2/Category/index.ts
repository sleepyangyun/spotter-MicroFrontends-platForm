import Model from '@app/store/infra/Model';
import WithArrayUpdateFnModel from '@app/store/infra/WithArrayUpdateFnModel';
import { types } from 'mobx-state-tree';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { categorySdk } from '@app/services/v2/category';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';

const CategoryStore = Model({
    name: 'CategoryStore',
    properties: {
        categoryList: WithArrayUpdateFnModel(
            types.frozen<ApiReturnType<typeof categorySdk.search>>(),
        ).model,
        categoryListAll: WithArrayUpdateFnModel(
            types.frozen<ApiReturnType<typeof categorySdk.listAllPrimaryCategory>>(),
        ).model,
    },
    overridesInitWatcher: {},
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);
    const getCategoryList = autoContextFlow(
        'categoryList',
        async (...args: Parameters<typeof categorySdk.search>) => {
            const { data: response } = await categorySdk.search(...args);
            return response;
        },
    );

    const getCategoryListAll = autoContextFlow(
        'categoryListAll',
        async (...args: Parameters<typeof categorySdk.listAllPrimaryCategory>) => {
            const { data: response } = await categorySdk.listAllPrimaryCategory(...args);
            return response;
        },
    );

    return {
        getCategoryList,
        getCategoryListAll,
    };
});

export default CategoryStore;
