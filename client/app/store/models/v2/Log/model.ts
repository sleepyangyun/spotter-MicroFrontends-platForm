import { logSdk } from '@client/app/services/v2/log';
import { ApiPaginationReturnType } from '@spotter/gmesh-api-sdk';

export type OperationLogModel = ApiPaginationReturnType<typeof logSdk.findPage>;
