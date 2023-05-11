import Model from '@app/store/infra/Model';
import WithPaginationUpdateFnModel from '@app/store/infra/WithPaginationUpdateFnModel';
import WithPrimaryUpdateFnModel from '@app/store/infra/WithPrimaryUpdateFnModel';
import { types } from 'mobx-state-tree';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { promoCodeSdk } from '@client/app/services/v2/marketing/promoCode';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';

const PromoCodeStore = Model({
    name: 'PromoCodeStore',
    properties: {
        promoCodePage: WithPaginationUpdateFnModel(
            types.frozen<ApiReturnType<typeof promoCodeSdk.page>>(),
        ).model,
        promoCodeOperationRecordPage: WithPaginationUpdateFnModel(
            types.frozen<ApiReturnType<typeof promoCodeSdk.history>>(),
        ).model,
        promoCodeDetail: WithPrimaryUpdateFnModel({} as ApiReturnType<typeof promoCodeSdk.detail>)
            .model,
    },
    overridesInitWatcher: {
        _export: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    const getPromoCodeDetail = autoContextFlow(
        'promoCodeDetail',
        async (...args: Parameters<typeof promoCodeSdk.detail>) => {
            const { data: response } = await promoCodeSdk.detail(...args);
            return response;
        },
    );

    const getPromoCodeOperationRecordPage = autoContextFlow(
        'promoCodeOperationRecordPage',
        async (...args: Parameters<typeof promoCodeSdk.history>) => {
            const { data: response } = await promoCodeSdk.history(...args);
            return response;
        },
    );

    const getPromoCodePage = autoContextFlow(
        'promoCodePage',
        async (...args: Parameters<typeof promoCodeSdk.page>) => {
            const { data: response } = await promoCodeSdk.page(...args);
            return response;
        },
    );

    const _export = autoContextFlow(
        '_export',
        async (...args: Parameters<typeof promoCodeSdk._export>) => {
            const { data: response } = await promoCodeSdk._export(...args);
            return response;
        },
    );

    return {
        getPromoCodeDetail,
        getPromoCodeOperationRecordPage,
        getPromoCodePage,
        _export,
    };
});

export default PromoCodeStore;
