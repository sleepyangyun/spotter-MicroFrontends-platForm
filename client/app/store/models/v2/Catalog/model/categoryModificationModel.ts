import { categoryModificationSdk } from '@client/app/services/v2/items';
import { ApiPaginationReturnType, ApiReturnType } from '@spotter/gmesh-api-sdk';

export type ModificationListModel = ApiPaginationReturnType<typeof categoryModificationSdk.page>;

export type ModificationDetailModel = ApiReturnType<typeof categoryModificationSdk.detail>;
