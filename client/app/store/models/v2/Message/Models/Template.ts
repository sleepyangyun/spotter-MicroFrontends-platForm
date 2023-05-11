import { messageTemplateSdk } from '@client/app/services/v2/message';
import { ApiPaginationReturnType, ApiReturnType } from '@spotter/gmesh-api-sdk';

export type TemplateDetailModel = ApiReturnType<typeof messageTemplateSdk.detail>;
export type TemplateListModel = ApiPaginationReturnType<typeof messageTemplateSdk.queryPage>;
