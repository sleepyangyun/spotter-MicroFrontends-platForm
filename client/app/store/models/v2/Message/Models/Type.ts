import { messageTypeSdk } from '@client/app/services/v2/message';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';

export type MessageTypeTreeVOModel = ApiReturnType<typeof messageTypeSdk.query>;
export type MessageTypeModel = MessageTypeTreeVOModel[0];
export type subMessageTypeListModel = MessageTypeModel['subMessageTypeList'];
