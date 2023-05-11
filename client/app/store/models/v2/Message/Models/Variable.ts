import { ApiReturnType } from '@spotter/gmesh-api-sdk';
import { messageVarSdk } from '@client/app/services/v2/message';

export type MessageVarTreeVOModel = ApiReturnType<typeof messageVarSdk.query>;
export type MessageVarVOModel = MessageVarTreeVOModel['0'];

// 详情的Model
export type MessageVarDetailModel = ApiReturnType<typeof messageVarSdk.queryById>;
