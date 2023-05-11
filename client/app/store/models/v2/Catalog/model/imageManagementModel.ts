import { imageSdk } from '@client/app/services/v2/items/imageManagement';
import { ApiPaginationReturnType, ApiReturnType } from '@spotter/gmesh-api-sdk';

export type ImageManageListVOModel = ApiPaginationReturnType<typeof imageSdk.getPage>;

export type ImageManageDetailVOModel = ApiReturnType<typeof imageSdk.getDetail>;

export type ImageManageOperationRecordVOModel = ApiReturnType<typeof imageSdk.getOperationRecord>;
