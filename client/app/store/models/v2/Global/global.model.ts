import { validateSdk } from '@client/app/services/v2/auth/validate';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';

export type ValidateType = ApiReturnType<typeof validateSdk.validate>;
export type UserType = ValidateType['userSimpleVO'];
export type CompanyType = ValidateType['companySimpleVO'];
export type RolesType = ApiReturnType<typeof validateSdk.roles>;
export type MenusType = ApiReturnType<typeof validateSdk.menus>;
