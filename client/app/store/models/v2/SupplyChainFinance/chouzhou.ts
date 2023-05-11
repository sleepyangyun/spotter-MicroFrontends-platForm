import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { spotterAccountSdk } from '@app/services/v2/business/svcAccount';
import { chouzhouLoanSdk } from '@client/app/services/v2/supplyChainFinance';
import WithPrimaryUpdateFnModel from '@client/app/store/infra/WithPrimaryUpdateFnModel';
import { ChouZhouDetailVOModel, ChouZhouLoanInfoVOModel } from './model';

export const ChouZhouStore = Model({
    name: 'ChouZhouStore',
    properties: {
        detail: WithPrimaryUpdateFnModel({} as ChouZhouDetailVOModel).model,
        loanInfo: WithPrimaryUpdateFnModel({} as ChouZhouLoanInfoVOModel).model,
    },
    overridesInitWatcher: {
        update: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    return {
        getDetail: autoContextFlow(
            'detail',
            async (...args: Parameters<typeof spotterAccountSdk.detail>) => {
                const { data: response } = await spotterAccountSdk.detail(...args);
                return response;
            },
        ),
        getLoanInfo: autoContextFlow(
            'loanInfo',
            async (...args: Parameters<typeof chouzhouLoanSdk.info>) => {
                const { data: response } = await chouzhouLoanSdk.info(...args);
                return response;
            },
        ),
        updateAccount: autoContextFlow(
            'update',
            async (...args: Parameters<typeof spotterAccountSdk.updateAccount>) => {
                const { data: response } = await spotterAccountSdk.updateAccount(...args);
                return response;
            },
        ),
    };
});
