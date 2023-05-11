import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import WithPrimaryUpdateFnModel from '@client/app/store/infra/WithPrimaryUpdateFnModel';
import { otherFinanceSdk } from '@app/services/v2/finance/otherFee';
import WithPaginationUpdateFnModel from '@app/store/infra/WithPaginationUpdateFnModel';

const OtherFeeStore = Model({
    name: 'OtherFeeStore',
    properties: {
        categoryList: WithPrimaryUpdateFnModel<typeof otherFinanceSdk.categoryList>([]).model,
        otherFeeList: WithPaginationUpdateFnModel<typeof otherFinanceSdk.query>().model,
        otherFeeDetail: WithPrimaryUpdateFnModel<typeof otherFinanceSdk.detail>({} as any).model,
        lastSettleDate: WithPrimaryUpdateFnModel<typeof otherFinanceSdk.lastSettleDate>(0).model,
        undeliveredList: WithPrimaryUpdateFnModel<typeof otherFinanceSdk.undeliveredList>([]).model,
    },
    overridesInitWatcher: {
        createOtherFee: false,
        revokeOtherFee: false,
        updateOtherFee: false,
        exportExcel: false,
        createCategoryStatus: false,
        delCategoryStatus: false,
        updateCategoryStatus: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    const getOtherFeeList = autoContextFlow(
        'otherFeeList',
        async (...args: Parameters<typeof otherFinanceSdk.query>) => {
            const { data: response } = await otherFinanceSdk.query(...args);
            return response;
        },
    );

    // 其他费用分类列表
    const getCategoryList = autoContextFlow(
        'categoryList',
        async (...args: Parameters<typeof otherFinanceSdk.categoryList>) => {
            const { data: response } = await otherFinanceSdk.categoryList(...args);
            return response;
        },
    );

    const createCategory = autoContextFlow(
        'createCategoryStatus',
        async (...args: Parameters<typeof otherFinanceSdk.categoryCreate>) => {
            const { data: response } = await otherFinanceSdk.categoryCreate(...args);
            return response;
        },
    );

    const deleteCategory = autoContextFlow(
        'delCategoryStatus',
        async (...args: Parameters<typeof otherFinanceSdk.categoryDelete>) => {
            const { data: response } = await otherFinanceSdk.categoryDelete(...args);
            return response;
        },
    );

    const updateCategory = autoContextFlow(
        'updateCategoryStatus',
        async (...args: Parameters<typeof otherFinanceSdk.categoryUpdate>) => {
            const { data: response } = await otherFinanceSdk.categoryUpdate(...args);
            return response;
        },
    );

    const getOtherFeeDetail = autoContextFlow(
        'otherFeeDetail',
        async (...args: Parameters<typeof otherFinanceSdk.detail>) => {
            const { data: response } = await otherFinanceSdk.detail(...args);
            return response;
        },
    );

    const getLastSettleDate = autoContextFlow(
        'lastSettleDate',
        async (...args: Parameters<typeof otherFinanceSdk.lastSettleDate>) => {
            const { data: response } = await otherFinanceSdk.lastSettleDate(...args);
            return response;
        },
    );

    const createOtherFee = autoContextFlow(
        'createOtherFee',
        async (...args: Parameters<typeof otherFinanceSdk.create>) => {
            const { data: response } = await otherFinanceSdk.create(...args);
            return response;
        },
    );

    const revokeOtherFee = autoContextFlow(
        'revokeOtherFee',
        async (...args: Parameters<typeof otherFinanceSdk._delete>) => {
            const { data: response } = await otherFinanceSdk._delete(...args);
            return response;
        },
    );

    const updateOtherFee = autoContextFlow(
        'updateOtherFee',
        async (...args: Parameters<typeof otherFinanceSdk.modify>) => {
            const { data: response } = await otherFinanceSdk.modify(...args);
            return response;
        },
    );

    const exportExcel = autoContextFlow(
        'exportExcel',
        async (...args: Parameters<typeof otherFinanceSdk.exportExcel>) => {
            const { data: response } = await otherFinanceSdk.exportExcel(...args);
            return response;
        },
    );

    // 未发货信息（金额为正）分页查询
    const getUndeliveredPage = autoContextFlow(
        'otherUndeliveredPage',
        async (...args: Parameters<typeof otherFinanceSdk.undeliveredPage>) => {
            const { data: response } = await otherFinanceSdk.undeliveredPage(...args);
            return response;
        },
    );

    // 未发货（未扣除，金额为正）信息查询
    const getUndeliveredList = autoContextFlow(
        'undeliveredList',
        async (...args: Parameters<typeof otherFinanceSdk.undeliveredList>) => {
            const { data: response } = await otherFinanceSdk.undeliveredList(...args);
            return response;
        },
    );

    return {
        getOtherFeeList,
        getCategoryList,
        createCategory,
        deleteCategory,
        updateCategory,
        getOtherFeeDetail,
        getLastSettleDate,
        createOtherFee,
        updateOtherFee,
        revokeOtherFee,
        exportExcel,
        getUndeliveredPage,
        getUndeliveredList,
    };
});

export default OtherFeeStore;
