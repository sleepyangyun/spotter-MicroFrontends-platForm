import { permitSdk } from '@client/app/services/v2/auth/permit';
import { roleSdk } from '@client/app/services/v2/auth/role';
import { ApiPaginationReturnType, ApiReturnType } from '@spotter/gmesh-api-sdk';

export type PolicyListType = ApiReturnType<typeof permitSdk.listAll>;
export type MenuType = PolicyListType[0];
export type RoleListModel = ApiPaginationReturnType<typeof roleSdk.listUsers>[];
