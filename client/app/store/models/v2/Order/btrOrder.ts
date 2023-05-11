import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import WithPrimaryUpdateFnModel from '@app/store/infra/WithPrimaryUpdateFnModel';
import { bornToRunOrderSdk } from '@app/services/v2/order/bornToRunOrder';
import WithPaginationUpdateFnModel from '@app/store/infra/WithPaginationUpdateFnModel';
import { types } from 'mobx-state-tree';
import { ApiPaginationReturnType } from '@spotter/gmesh-api-sdk';

export const BtrOrderStore = Model({
    name: 'BtrOrderStore',
    properties: {
        bornToRunOrderList: WithPaginationUpdateFnModel(
            types.frozen<ApiPaginationReturnType<typeof bornToRunOrderSdk.page>>(),
        ).model,
        bornToRunOrderStatus: WithPrimaryUpdateFnModel('').model,
        activeOfferList:
            WithPaginationUpdateFnModel<typeof bornToRunOrderSdk.listActiveAll>().model,
    },
    overridesInitWatcher: {
        submitBornToRunOrderAudit: false,
        getBornToRunOrderDetail: false,
        getTodoList: false,
        syncOrder: false,
        nextOffer: false,
        activeOfferList: false,
        submitOffer: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    // 分页条件查询Born To Run订单
    const getBornToRunOrderList = autoContextFlow(
        'bornToRunOrderList',
        async (...args: Parameters<typeof bornToRunOrderSdk.page>) => {
            const { data: res } = await bornToRunOrderSdk.page(...args);
            return res;
        },
    );

    // 获取Born To Run订单详情
    const getBornToRunOrderDetail = autoContextFlow(
        'getBornToRunOrderDetail',
        async (...args: Parameters<typeof bornToRunOrderSdk.detail>) => {
            const { data: res } = await bornToRunOrderSdk.detail(...args);
            return res;
        },
    );

    // 提交Born To Run订单
    const submitBornToRunOrderAudit = autoContextFlow(
        'submitBornToRunOrderAudit',
        async (...args: Parameters<typeof bornToRunOrderSdk.submit>) => {
            const { data: res } = await bornToRunOrderSdk.submit(...args);
            return res;
        },
    );

    // 获取待办列表
    const getTodoList = autoContextFlow(
        'getTodoList',
        async (...args: Parameters<typeof bornToRunOrderSdk.pageToDo>) => {
            const { data: res } = await bornToRunOrderSdk.pageToDo(...args);
            return res;
        },
    );

    // 同步订单
    const syncOrder = autoContextFlow(
        'syncOrder',
        async (...args: Parameters<typeof bornToRunOrderSdk.syncOrder>) => {
            const { data: res } = await bornToRunOrderSdk.syncOrder(...args);
            return res;
        },
    );

    // 生成订单，跳转下一步
    const nextOffer = autoContextFlow(
        'nextOffer',
        async (...args: Parameters<typeof bornToRunOrderSdk.next>) => {
            const { data: response } = await bornToRunOrderSdk.next(...args);
            return response;
        },
    );

    // 提交订单
    const submitOffer = autoContextFlow(
        'submitOffer',
        async (...args: Parameters<typeof bornToRunOrderSdk.add>) => {
            const { data: response } = await bornToRunOrderSdk.add(...args);
            return response;
        },
    );

    // 获取Active的Offer列表
    const getActiveOfferList = autoContextFlow(
        'activeOfferList',
        async (...args: Parameters<typeof bornToRunOrderSdk.listActiveAll>) => {
            const { data: res } = await bornToRunOrderSdk.listActiveAll(...args);
            return res;
        },
    );

    return {
        getActiveOfferList,
        getBornToRunOrderList,
        getBornToRunOrderDetail,
        submitBornToRunOrderAudit,
        getTodoList,
        syncOrder,
        nextOffer,
        submitOffer,
    };
});
