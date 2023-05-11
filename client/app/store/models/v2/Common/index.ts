import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { spotterCommonApiSdk } from '@app/services/v2/common';

const CommonStore = Model({
    name: 'SpotterLogisticsStore',
    properties: {},
    overridesInitWatcher: {
        exportPdf: false,
        getUserList: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);
    // 导出pdf
    const exportPdf = autoContextFlow(
        'exportPdf',
        async (...args: Parameters<typeof spotterCommonApiSdk.exportPdf>) => {
            const { data: response } = await spotterCommonApiSdk.exportPdf(...args);
            return response;
        },
    );

    // 获取财务角色用户列表
    const getFinanceUserList = autoContextFlow(
        'getUserList',
        async (...args: Parameters<typeof spotterCommonApiSdk.getUserList>) => {
            const { data: response } = await spotterCommonApiSdk.getUserList(...args);
            return response;
        },
    );

    // 查询财务操作日志
    const queryFinanceLog = autoContextFlow(
        'queryLog',
        async (...args: Parameters<typeof spotterCommonApiSdk.queryLog>) => {
            const { data: response } = await spotterCommonApiSdk.queryLog(...args);
            return response;
        },
    );

    return {
        exportPdf,
        getFinanceUserList,
        queryFinanceLog,
    };
});

export default CommonStore;
