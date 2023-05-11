import Model from '@app/store/infra/Model';
import WithPaginationUpdateFnModel from '@app/store/infra/WithPaginationUpdateFnModel';
import WithPrimaryUpdateFnModel from '@app/store/infra/WithPrimaryUpdateFnModel';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { types } from 'mobx-state-tree';
import { categoryModificationSdk } from '@client/app/services/v2/items';
import { ApiPaginationReturnType, ApiReturnType } from '@spotter/gmesh-api-sdk';

const CategoryModificationStore = Model({
    name: 'CategoryModificationStore',
    properties: {
        modificationList: WithPaginationUpdateFnModel(
            types.frozen<ApiPaginationReturnType<typeof categoryModificationSdk.page>>(),
        ).model,

        modificationDetail: WithPrimaryUpdateFnModel(
            {} as ApiReturnType<typeof categoryModificationSdk.detail>,
        ).model,
    },
    overridesInitWatcher: {
        addCategoryModification: false,
        ticketAccept: false,
        ticketDivert: false,
        ticketApproved: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);
    //  工单详情数据
    const getModificationDetail = autoContextFlow(
        'modificationDetail',
        async (...args: Parameters<typeof categoryModificationSdk.detail>) => {
            const { data: response } = await categoryModificationSdk.detail(...args);
            return response;
        },
    );
    // 待我受理工单分页数据
    const divertTicketPage = autoContextFlow(
        'divertTicketPage',
        async (...args: Parameters<typeof categoryModificationSdk.divertTicketPage>) => {
            const { data: response } = await categoryModificationSdk.divertTicketPage(...args);
            return response;
        },
    );

    //  工单分页数据
    const getModificationList = autoContextFlow(
        'modificationList',
        async (...args: Parameters<typeof categoryModificationSdk.page>) => {
            const { data: response } = await categoryModificationSdk.page(...args);
            return response;
        },
    );

    // 接收工单
    const ticketAccept = autoContextFlow(
        'ticketAccept',
        async (...args: Parameters<typeof categoryModificationSdk.ticketAccept>) => {
            const { data: response } = await categoryModificationSdk.ticketAccept(...args);
            return response;
        },
    );
    // 审核通过工单
    const ticketApproved = autoContextFlow(
        'ticketApproved',
        async (...args: Parameters<typeof categoryModificationSdk.ticketApproved>) => {
            const { data: response } = await categoryModificationSdk.ticketApproved(...args);
            return response;
        },
    );
    //  转移工单
    const ticketDivert = autoContextFlow(
        'ticketDivert',
        async (...args: Parameters<typeof categoryModificationSdk.ticketDivert>) => {
            const { data: response } = await categoryModificationSdk.ticketDivert(...args);
            return response;
        },
    );
    // 审核不通过工单
    const ticketRefused = autoContextFlow(
        'ticketRefused',
        async (...args: Parameters<typeof categoryModificationSdk.ticketRefused>) => {
            const { data: response } = await categoryModificationSdk.ticketRefused(...args);
            return response;
        },
    );
    return {
        getModificationDetail,
        divertTicketPage,
        getModificationList,
        ticketAccept,
        ticketApproved,
        ticketDivert,
        ticketRefused,
    };
});

export default CategoryModificationStore;
