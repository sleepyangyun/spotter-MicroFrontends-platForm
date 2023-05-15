import WithPrimaryUpdateFnModel from '@app/store/infra/WithPrimaryUpdateFnModel';
import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import { userSdk } from '@app/services/v2/auth/user';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';
import { validateSdk } from '@client/app/services/v2/auth/validate';
import { CompanyType, RolesType, UserType } from './global.model';

const GlobalStore = Model({
    name: 'GlobalStore',
    properties: {
        menus: WithPrimaryUpdateFnModel<typeof validateSdk.menus>([]).model,
        validate: WithPrimaryUpdateFnModel(<ApiReturnType<typeof validateSdk.validate>>{}).model,
        permits: WithPrimaryUpdateFnModel<typeof validateSdk.permits>([]).model,
        user: WithPrimaryUpdateFnModel(<UserType>{}).model,
        company: WithPrimaryUpdateFnModel({} as CompanyType).model,
        userUnderline: WithPrimaryUpdateFnModel<typeof userSdk.getUnderlingByUserId>([]).model,
        roles: WithPrimaryUpdateFnModel([] as RolesType).model,
        leader: WithPrimaryUpdateFnModel(
            <ApiReturnType<typeof userSdk.getLeaderByCompanyIdAndOrgId>>{},
        ).model,
    },
    overridesInitWatcher: {
        validateCaptcha: false,
        updateValidate: false,
        validate: false,
        menus: false,
        permits: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    const getUserUnderline = autoContextFlow(
        'userUnderline',
        async (...args: Parameters<typeof userSdk.getUnderlingByUserId>) => {
            const { data: res } = await userSdk.getUnderlingByUserId(...args);
            return res;
        },
    );

    const validateCaptcha = autoContextFlow(
        'validateCaptcha',
        async (...args: Parameters<typeof userSdk.validateCaptcha>) => {
            const { data: response } = await userSdk.validateCaptcha(...args);
            return response;
        },
    );

    const updateValidate = autoContextFlow(
        'updateValidate',
        async (...args: Parameters<typeof userSdk.updateValidate>) => {
            const { data: response } = await userSdk.updateValidate(...args);
            return response;
        },
    );

    // 读取权限hash值
    const getValidateHash = autoContextFlow('validate', async () => {
        const { data: response } = await validateSdk.validate();
        if (response.data?.userSimpleVO) {
            self.user.updateData(response.data?.userSimpleVO);
        }
        if (response.data?.companySimpleVO) {
            self.company.updateData(response.data?.companySimpleVO);
        }
        return response;
    });

    // 读取权限列表
    const getPermits = autoContextFlow('permits', async () => {
        const { data: response } = await validateSdk.permits();
        return response;
    });

    // 读取菜单列表
    const getMenus = autoContextFlow('menus', async () => {
        const { data: response } = await validateSdk.menus();
        return response;
    });

    // 读取角色列表
    const getRoles = autoContextFlow('roles', async () => {
        const { data: response } = await validateSdk.roles();
        return response;
    });

    // 根据公司id和部门code获取部门leader
    const getLeaderByCompanyIdAndOrgId = autoContextFlow(
        'leader',
        async (...args: Parameters<typeof userSdk.getLeaderByCompanyIdAndOrgId>) => {
            const { data: response } = await userSdk.getLeaderByCompanyIdAndOrgId(...args);
            return response;
        },
    );

    return {
        updateValidate,
        validateCaptcha,
        getUserUnderline,
        getMenus,
        getPermits,
        getValidateHash,
        getRoles,
        getLeaderByCompanyIdAndOrgId,
    };
});

export default GlobalStore;
