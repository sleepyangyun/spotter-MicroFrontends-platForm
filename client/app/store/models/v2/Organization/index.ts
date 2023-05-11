import WithPrimaryUpdateFnModel from '@app/store/infra/WithPrimaryUpdateFnModel';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import Model from '@app/store/infra/Model';
import WithPaginationUpdateFnModel from '@app/store/infra/WithPaginationUpdateFnModel';
import { orgSdk } from '@client/app/services/v2/auth/org';
import { userSdk } from '@client/app/services/v2/auth/user';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';

const OrganizationStore = Model({
    name: 'OrganizationStore',
    properties: {
        organizationList: WithPrimaryUpdateFnModel<typeof orgSdk.tree>(
            {} as ApiReturnType<typeof orgSdk.tree>,
        ).model,
        userListByOrgId: WithPaginationUpdateFnModel<typeof userSdk.listByOrgId>().model,
        otherUserList: WithPrimaryUpdateFnModel<typeof orgSdk.getUserExcludeOrgId>([]).model,
        userListByOrgCode: WithPrimaryUpdateFnModel<typeof orgSdk.getUserListByOrgCode>([]).model,
    },
    overridesInitWatcher: {
        createOrganizationList: false,
        updateOrganizationName: false,
        updateOrganizationAdmin: false,
        deleteOrganization: false,
        transferOrganizationMember: false,
        updateUserAccountAvailableStatus: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    // 获取组织树
    const getOrganizationTree = autoContextFlow(
        'organizationList',
        async (...args: Parameters<typeof orgSdk.tree>) => {
            const { data: response } = await orgSdk.tree(...args);
            return response;
        },
    );

    // 新建部门
    const createOrganizationList = autoContextFlow(
        'createOrganizationList',
        async (...args: Parameters<typeof orgSdk.create>) => {
            const { data: response } = await orgSdk.create(...args); // { data: response }
            return response;
        },
    );

    // 编辑部门名称
    const updateOrganizationName = autoContextFlow(
        'updateOrganizationName',
        async (...args: Parameters<typeof orgSdk.updateOrgName>) => {
            const { data: response } = await orgSdk.updateOrgName(...args);
            return response;
        },
    );

    // 设置部门主管
    const updateOrganizationAdmin = autoContextFlow(
        'updateOrganizationAdmin',
        async (...args: Parameters<typeof orgSdk.updateOrgManage>) => {
            const { data: response } = await orgSdk.updateOrgManage(...args);
            return response;
        },
    );
    // 删除组织
    const deleteOrganization = autoContextFlow(
        'deleteOrganization',
        async (...args: Parameters<typeof orgSdk._delete>) => {
            const { data: response } = await orgSdk._delete(...args);
            self.userListByOrgId.updateData([]);
            return response;
        },
    );
    // 通过组织id查询用户列表
    const getUserListByOrgIdQuery = autoContextFlow(
        'userListByOrgId',
        async (...args: Parameters<typeof userSdk.listByOrgId>) => {
            const { data: response } = await userSdk.listByOrgId(...args);
            return response;
        },
    );
    // 转移组织/部门表成员
    const transferOrganizationMember = autoContextFlow(
        'transferOrganizationMember',
        async (...args: Parameters<typeof orgSdk.batchTransfer>) => {
            const { data: response } = await orgSdk.batchTransfer(...args);
            return response;
        },
    );

    // 搜索获取组织下的人员列表选***选中的部门Id, 排除当前orgId下的人员***
    const getOrgOtherUsers = autoContextFlow(
        'otherUserList',
        async (...args: Parameters<typeof orgSdk.getUserExcludeOrgId>) => {
            const { data: response } = await orgSdk.getUserExcludeOrgId(...args);
            return response;
        },
    );

    const getUserListByOrgCode = autoContextFlow(
        'userListByOrgCode',
        async (...args: Parameters<typeof orgSdk.getUserListByOrgCode>) => {
            const { data: response } = await orgSdk.getUserListByOrgCode(...args);
            return response;
        },
    );
    // 更改成员状态 authSdk //
    const updateUserAccountAvailableStatus = autoContextFlow(
        'updateUserAccountAvailableStatus',
        async (...args: Parameters<typeof userSdk.enableOrDisableUser>) => {
            const { data: response } = await userSdk.enableOrDisableUser(...args);
            return response;
        },
    );

    return {
        getOrganizationTree,
        createOrganizationList,
        updateOrganizationName,
        updateOrganizationAdmin,
        getUserListByOrgIdQuery,
        deleteOrganization,
        transferOrganizationMember,
        getOrgOtherUsers,
        updateUserAccountAvailableStatus,
        getUserListByOrgCode,
    };
});

export default OrganizationStore;
