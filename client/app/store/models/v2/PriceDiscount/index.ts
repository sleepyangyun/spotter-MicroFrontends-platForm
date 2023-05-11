import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import Model from '@app/store/infra/Model';
import WithPaginationUpdateFnModel from '@client/app/store/infra/WithPaginationUpdateFnModel';
import { priceDiscountSdk } from '@client/app/services/v2/marketing/priceDiscount';
import WithPrimaryUpdateFnModel from '@client/app/store/infra/WithPrimaryUpdateFnModel';
import { ApiPaginationReturnType, ApiReturnType } from '@spotter/gmesh-api-sdk';
import { types } from 'mobx-state-tree';

const PriceDiscountStore = Model({
    name: 'PriceDiscountStore',
    properties: {
        piceDiscountOperationRecordPage: WithPaginationUpdateFnModel(
            types.frozen(
                <
                    ApiPaginationReturnType<
                        typeof priceDiscountSdk.getPriceDiscountOperationRecordPage
                    >
                >{},
            ),
        ).model,
        priceDiscountDetail: WithPrimaryUpdateFnModel(
            <ApiReturnType<typeof priceDiscountSdk.getPriceDiscountDetail>>{},
        ).model,
        priceDiscountPage: WithPaginationUpdateFnModel(
            types.frozen(<ApiPaginationReturnType<typeof priceDiscountSdk.getPriceDiscountPage>>{}),
        ).model,
    },
    overridesInitWatcher: {
        getRoleListUsers: false,
        allPolicyList: false,
        _export: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    const getPriceDiscountDetail = autoContextFlow(
        'priceDiscountDetail',
        async (...args: Parameters<typeof priceDiscountSdk.getPriceDiscountDetail>) => {
            const { data: response } = await priceDiscountSdk.getPriceDiscountDetail(...args);
            return response;
        },
    );

    const getPriceDiscountOperationRecordPage = autoContextFlow(
        'priceDiscountOperationRecordPage',
        async (
            ...args: Parameters<typeof priceDiscountSdk.getPriceDiscountOperationRecordPage>
        ) => {
            const { data: response } = await priceDiscountSdk.getPriceDiscountOperationRecordPage(
                ...args,
            );
            return response;
        },
    );
    const getPriceDiscountPage = autoContextFlow(
        'priceDiscountPage',
        async (...args: Parameters<typeof priceDiscountSdk.getPriceDiscountPage>) => {
            const { data: response } = await priceDiscountSdk.getPriceDiscountPage(...args);
            return response;
        },
    );

    const _export = autoContextFlow(
        '_export',
        async (...args: Parameters<typeof priceDiscountSdk._export>) => {
            const { data: response } = await priceDiscountSdk._export(...args);
            return response;
        },
    );
    return {
        getPriceDiscountDetail,
        getPriceDiscountOperationRecordPage,
        getPriceDiscountPage,
        _export,
    };
});
export default PriceDiscountStore;
