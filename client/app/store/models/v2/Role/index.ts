import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import Model from '@app/store/infra/Model';
import WithPaginationUpdateFnModel from '@app/store/infra/WithPaginationUpdateFnModel';
import { permitSdk } from '@app/services/v2/auth/permit';
import { roleSdk, roleV2Sdk } from '@app/services/v2/auth/role';
import { userV2Sdk } from '@app/services/v2/auth/user';
import WithPrimaryUpdateFnModel from '@client/app/store/infra/WithPrimaryUpdateFnModel';

const RoleStore = Model({
    name: 'RoleStore',
    properties: {
        roleList: WithPrimaryUpdateFnModel<typeof roleSdk.roleList>([]).model,
        otherRoleList: WithPrimaryUpdateFnModel<typeof roleSdk.getUserExcludeRole>([]).model,
        userListByRoleCode: WithPaginationUpdateFnModel<typeof roleSdk.listUsers>().model,
        hasPolicyList: WithPrimaryUpdateFnModel<typeof permitSdk.list>([]).model,

        roleListV2: WithPrimaryUpdateFnModel<typeof roleV2Sdk.roleList>([]).model,
        simpleRoleList: WithPrimaryUpdateFnModel<typeof roleV2Sdk.simpleRoleList>([]).model,
        allPermitGroup: WithPrimaryUpdateFnModel<typeof roleV2Sdk.allPermitGroup>([]).model,

        userList: WithPaginationUpdateFnModel<typeof userV2Sdk.getUserList>().model,
    },
    overridesInitWatcher: {
        hasPolicyList: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    // 获取角色的权限列表
    const getPolicyList = autoContextFlow(
        'hasPolicyList',
        async (...args: Parameters<typeof permitSdk.list>) => {
            const { data: response } = await permitSdk.list(...args);
            return response;
        },
    );
    // 获取角色列表
    const getRoleList = autoContextFlow(
        'roleList',
        async (...args: Parameters<typeof roleSdk.roleList>) => {
            const { data: response } = await roleSdk.roleList(...args);
            return response;
        },
    );
    // 获取角色下的用户列表搜索获取角色下的人员列表
    const getUserListForRole = autoContextFlow(
        'otherRoleList',
        async (...args: Parameters<typeof roleSdk.getUserExcludeRole>) => {
            const { data: response } = await roleSdk.getUserExcludeRole(...args);
            return response;
        },
    );
    // 创建角色
    const createRole = autoContextFlow(
        'createRole',
        async (...args: Parameters<typeof roleSdk.create>) => {
            const { data: response } = await roleSdk.create(...args);
            return response;
        },
    );
    // 删除角色
    const deleteRole = autoContextFlow(
        'deleteRole',
        async (...args: Parameters<typeof roleSdk._delete>) => {
            const { data: response } = await roleSdk._delete(...args);
            self.hasPolicyList.updateData([]);
            return response;
        },
    );
    // 搜索获取角色下的人员列表
    const getUsersByRoleCode = autoContextFlow(
        'userListByRoleCode',
        async (...args: Parameters<typeof roleSdk.listUsers>) => {
            const { data: response } = await roleSdk.listUsers(...args);
            return response;
        },
    );

    // 添加角色员工
    const addRoleUsers = autoContextFlow(
        'addRoleUsers',
        async (...args: Parameters<typeof roleSdk.addUser>) => {
            const { data: response } = await roleSdk.addUser(...args);

            return response;
        },
    );
    // 移除角色员工
    const removeRoleUsers = autoContextFlow(
        'removeRoleUsers',
        async (...args: Parameters<typeof roleSdk.removeUserInRole>) => {
            const { data: response } = await roleSdk.removeUserInRole(...args);
            return response;
        },
    );

    // 批量修改角色权限
    const addPermissionForRole = autoContextFlow(
        'addPermissionForRole',
        async (...args: Parameters<typeof permitSdk.addRoleAndPermit>) => {
            const { data: response } = await permitSdk.addRoleAndPermit(...args);
            return response;
        },
    );

    // 查询角色与功能权限,角色为空则展示所有
    const getAllPermitGroup = autoContextFlow(
        'allPermitGroup',
        async (...args: Parameters<typeof roleV2Sdk.allPermitGroup>) => {
            const { data: response } = await roleV2Sdk.allPermitGroup(...args);
            return response;
        },
    );

    //  角色管理-角色列表(含有包含人数)
    const getRoleListV2 = autoContextFlow(
        'roleListV2',
        async (...args: Parameters<typeof roleV2Sdk.roleList>) => {
            const { data: response } = await roleV2Sdk.roleList(...args);
            return response;
        },
    );

    const getSimpleRoleList = autoContextFlow(
        'simpleRoleList',
        async (...args: Parameters<typeof roleV2Sdk.simpleRoleList>) => {
            const { data: response } = await roleV2Sdk.simpleRoleList(...args);
            return response;
        },
    );

    const getUserList = autoContextFlow(
        'userList',
        async (...args: Parameters<typeof userV2Sdk.getUserList>) => {
            const { data: response } = await userV2Sdk.getUserList(...args);
            return response;
        },
    );

    return {
        getPolicyList,
        getRoleList,
        getUserListForRole,
        createRole,
        deleteRole,
        getUsersByRoleCode,
        addRoleUsers,
        removeRoleUsers,
        addPermissionForRole,
        getAllPermitGroup,
        getRoleListV2,
        getSimpleRoleList,
        getUserList,
    };
});

export default RoleStore;
