import { messageInboxDailySdk } from '@client/app/services/v2/message';
import { snapshotSdk } from '@client/app/services/v2/message/snapshot';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';

export type MessageModel = ApiReturnType<typeof snapshotSdk.queryDetail>;

export type PreviewMessageDetailModel = ApiReturnType<
    typeof messageInboxDailySdk.trySendPreviewDetail
>;
