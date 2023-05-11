import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import Model from '@app/store/infra/Model';
import { roleSdk } from '@app/services/v2/auth/role';
import WithPaginationUpdateFnModel from '@client/app/store/infra/WithPaginationUpdateFnModel';
import { permitSdk } from '@client/app/services/v2/auth/permit';
import WithPrimaryUpdateFnModel from '@client/app/store/infra/WithPrimaryUpdateFnModel';

const PermissionStore = Model({
    name: 'PermissionStore',
    properties: {
        roleListUsers: WithPaginationUpdateFnModel<typeof roleSdk.listUsers>().model,
        allPolicyList: WithPrimaryUpdateFnModel<typeof permitSdk.listAll>([]).model,
        allMenus: WithPrimaryUpdateFnModel<typeof permitSdk.listAll>([]).model,
    },
    overridesInitWatcher: {
        getRoleListUsers: false,
        allPolicyList: false,
        permitRoleSetting: false,
        permitRolesSetting: false,
        permitRoleSettingForSevc: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);
    const getRoleListUsers = autoContextFlow(
        'roleListUsers',
        async (...args: Parameters<typeof roleSdk.listUsers>) => {
            const { data: res } = await roleSdk.listUsers(...args);
            return res;
        },
    );

    // 查看某个类型下的所有权限
    const getRoleAllPermit = autoContextFlow(
        'allPolicyList',
        async (...args: Parameters<typeof permitSdk.listAll>) => {
            const { data: response } = await permitSdk.listAll(...args);
            return response;
        },
    );

    // 查看某个类型下的所有权限
    const getAllMenus = autoContextFlow(
        'allMenus',
        async (options?: Parameters<typeof permitSdk.listAll>[1]) => {
            const { data: response } = await permitSdk.listAll({ type: 1 }, options);
            return response;
        },
    );

    const permitRoleSetting = autoContextFlow(
        'permitRoleSetting',
        async (...args: Parameters<typeof permitSdk.permitRoleSetting>) => {
            const { data: response } = await permitSdk.permitRoleSetting(...args);
            return response;
        },
    );

    const permitRolesSetting = autoContextFlow(
        'permitRolesSetting',
        async (...args: Parameters<typeof permitSdk.permitRolesSetting>) => {
            const { data: response } = await permitSdk.permitRolesSetting(...args);
            return response;
        },
    );

    const permitRoleSettingForSevc = autoContextFlow(
        'permitRoleSettingForSevc',
        async (...args: Parameters<typeof permitSdk.permitRoleSettingForSevc>) => {
            const { data: response } = await permitSdk.permitRoleSettingForSevc(...args);
            return response;
        },
    );

    return {
        getRoleListUsers,
        getRoleAllPermit,
        getAllMenus,
        permitRoleSetting,
        permitRolesSetting,
        permitRoleSettingForSevc,
    };
});
export default PermissionStore;
