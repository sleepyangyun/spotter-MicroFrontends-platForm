import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import WithPaginationUpdateFnModel from '@app/store/infra/WithPaginationUpdateFnModel';

import {
    spotterAccountSdk,
    spotterCategorySdk,
    spotterVendorCategorySdk,
    spotterVendorSdk,
} from '@app/services/v2/business/svcAccount';
import WithPrimaryUpdateFnModel from '@app/store/infra/WithPrimaryUpdateFnModel';
import { ApiReturnType, ApiPaginationReturnType } from '@spotter/gmesh-api-sdk';
import { types } from 'mobx-state-tree';

export const SVCAccountStore = Model({
    name: 'SVCAccountStore',
    properties: {
        myCertificationTicketList:
            WithPaginationUpdateFnModel<typeof spotterCategorySdk.listAllPrimaryCategory>().model,
        allFirstCategoryList: WithPrimaryUpdateFnModel<
            typeof spotterCategorySdk.listAllPrimaryCategory
        >([]).model,
        vendorConfigDetail: WithPrimaryUpdateFnModel(
            {} as ApiReturnType<typeof spotterVendorCategorySdk.listDetail>,
        ).model,
        SVCAccountList: WithPaginationUpdateFnModel<typeof spotterAccountSdk.page>().model,
        categoryConfig: WithPrimaryUpdateFnModel(
            [] as ApiReturnType<typeof spotterVendorCategorySdk.list>,
        ).model,
        vendorCodeList: WithPaginationUpdateFnModel(
            types.frozen<ApiPaginationReturnType<typeof spotterVendorSdk.page>>(),
        ).model,
        allSVCAccount: WithPrimaryUpdateFnModel<typeof spotterAccountSdk.all>([]).model,
        allVendorList: WithPrimaryUpdateFnModel<typeof spotterVendorSdk.list>([]).model,
        vendorCategory: WithPaginationUpdateFnModel<typeof spotterVendorSdk.page>().model,
    },
    overridesInitWatcher: {
        updateVendorCategory: false,
        vendorCategory: false,
        allSVCAccount: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    // 根据条件查询亚马逊运营账号（分页）
    const getSVCAccountList = autoContextFlow(
        'SVCAccountList',
        async (...args: Parameters<typeof spotterAccountSdk.page>) => {
            const { data: res } = await spotterAccountSdk.page(...args);
            return res;
        },
    );
    // 插入一个亚马逊账号
    const addSVCAccount = autoContextFlow(
        'addSVCAccount',
        async (...args: Parameters<typeof spotterAccountSdk.save>) => {
            const { data: res } = await spotterAccountSdk.save(...args);
            return res;
        },
    );
    // 根据id更新账号字段
    const updateSVCAccount = autoContextFlow(
        'updateSVCAccount',
        async (...args: Parameters<typeof spotterAccountSdk.modify>) => {
            const { data: res } = await spotterAccountSdk.modify(...args);
            return res;
        },
    );
    // 模糊查询registeredBusinessName list
    const getListRegisteredBusinessName = autoContextFlow(
        'listRegisteredBusinessName',
        async (...args: Parameters<typeof spotterAccountSdk.listRegisteredBusinessName>) => {
            const { data: res } = await spotterAccountSdk.listRegisteredBusinessName(...args);
            return res;
        },
    );
    // 模糊查询listAccountCode list
    const getListAccountCode = autoContextFlow(
        'listAccountCode',
        async (...args: Parameters<typeof spotterAccountSdk.listAccountCode>) => {
            const { data: res } = await spotterAccountSdk.listAccountCode(...args);
            return res;
        },
    );
    // 获取所有运营账号信息
    const getAllSVCAccount = autoContextFlow(
        'allSVCAccount',
        async (...args: Parameters<typeof spotterAccountSdk.all>) => {
            const { data: res } = await spotterAccountSdk.all(...args);
            return res;
        },
    );

    // 根据id更新vendor信息
    const updateVendorById = autoContextFlow(
        'updateVendorById',
        async (...args: Parameters<typeof spotterVendorSdk.modify>) => {
            const { data: res } = await spotterVendorSdk.modify(...args);
            return res;
        },
    );
    // 根据条件查询vendor及其所属类目信息
    const getVendorCategory = autoContextFlow(
        'vendorCategory',
        async (...args: Parameters<typeof spotterVendorSdk.vendorCategoryPage>) => {
            const { data: res } = await spotterVendorSdk.vendorCategoryPage(...args);
            return res;
        },
    );
    // 新增一个vendor code
    const addVendorCode = autoContextFlow(
        'addVendorCode',
        async (...args: Parameters<typeof spotterVendorSdk.save>) => {
            const { data: res } = await spotterVendorSdk.save(...args);
            return res;
        },
    );
    const getVendorCodePageList = autoContextFlow(
        'vendorCodeList',
        async (...args: Parameters<typeof spotterVendorSdk.page>) => {
            const { data: res } = await spotterVendorSdk.page(...args);
            return res;
        },
    );
    // 查询所有vendor列表
    const getAllVendorList = autoContextFlow(
        'allVendorList',
        async (...args: Parameters<typeof spotterVendorSdk.list>) => {
            const { data: res } = await spotterVendorSdk.list(...args);
            return res;
        },
    );
    // 根据条件查询类目配置
    const getCategoryConfigByVendorId = autoContextFlow(
        'categoryConfig',
        async (...args: Parameters<typeof spotterVendorCategorySdk.list>) => {
            const { data: res } = await spotterVendorCategorySdk.list(...args);
            return res;
        },
    );
    // 更新vendor类目配置
    const updateVendorCategory = autoContextFlow(
        'updateVendorCategory',
        async (...args: Parameters<typeof spotterVendorCategorySdk.modify>) => {
            const { data: res } = await spotterVendorCategorySdk.modify(...args);
            return res;
        },
    );

    // vendor类目配置激活
    const vendorCategoryActive = autoContextFlow(
        'vendorCategoryActive',
        async (...args: Parameters<typeof spotterVendorCategorySdk.active>) => {
            const { data: res } = await spotterVendorCategorySdk.active(...args);
            return res;
        },
    );
    // vendor类目配置冻结
    const vendorCategoryFrozen = autoContextFlow(
        'vendorCategoryFrozen',
        async (...args: Parameters<typeof spotterVendorCategorySdk.frozen>) => {
            const { data: res } = await spotterVendorCategorySdk.frozen(...args);
            return res;
        },
    );
    // 根据条件查询类目配置 & vendor 信息 & account 信息
    const getVendorConfigDetail = autoContextFlow(
        'vendorConfigDetail',
        async (...args: Parameters<typeof spotterVendorCategorySdk.listDetail>) => {
            const { data: res } = await spotterVendorCategorySdk.listDetail(...args);
            return res;
        },
    );
    // 新增vendor类目配置
    const addVendorCategory = autoContextFlow(
        'addVendorCategory',
        async (...args: Parameters<typeof spotterVendorCategorySdk.save>) => {
            const { data: res } = await spotterVendorCategorySdk.save(...args);
            return res;
        },
    );
    // 获取所有一级类目信息
    const getAllFirstCategoryList = autoContextFlow(
        'allFirstCategoryList',
        async (...args: Parameters<typeof spotterCategorySdk.listAllPrimaryCategory>) => {
            const { data: res } = await spotterCategorySdk.listAllPrimaryCategory(...args);
            return res;
        },
    );
    // 查询类目信息
    const searchCategory = autoContextFlow(
        'searchCategory',
        async (...args: Parameters<typeof spotterCategorySdk.search>) => {
            const { data: res } = await spotterCategorySdk.search(...args);
            return res;
        },
    );

    return {
        getSVCAccountList,
        getAllVendorList,
        addSVCAccount,
        updateSVCAccount,
        getListRegisteredBusinessName,
        getListAccountCode,
        getAllSVCAccount,
        updateVendorById,
        getVendorCategory,
        addVendorCode,
        vendorCategoryActive,
        vendorCategoryFrozen,
        addVendorCategory,
        getVendorConfigDetail,
        getAllFirstCategoryList,
        searchCategory,
        getCategoryConfigByVendorId,
        updateVendorCategory,
        getVendorCodePageList,
    };
});
