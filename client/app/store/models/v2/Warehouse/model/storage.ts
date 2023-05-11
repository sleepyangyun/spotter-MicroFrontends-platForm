import { warehouseSdk } from '@client/app/services/v2/warehouse';
import { storageApiSdk } from '@client/app/services/v2/storage';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';

export type StorageItemModel = ApiReturnType<typeof storageApiSdk.getStorageList>[0];
export type StorageItemV2Model = ApiReturnType<typeof warehouseSdk.storageList>[0];
