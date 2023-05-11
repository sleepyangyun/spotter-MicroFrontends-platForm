import { videoSdk } from '@client/app/services/v2/items/videoManagement';
import { ApiPaginationReturnType, ApiReturnType } from '@spotter/gmesh-api-sdk';

export type VideoManageListVOModel = ApiPaginationReturnType<typeof videoSdk.pageQuery>;

export type VideoManageDetailVOModel = ApiReturnType<typeof videoSdk.detail>;
