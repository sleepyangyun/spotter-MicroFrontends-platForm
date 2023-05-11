import { storageApiSdk } from '@client/app/services/v2/storage';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';

export type AmazonCountryAndStateVOModel = ApiReturnType<
    typeof storageApiSdk.getAmazonCountryAndStateVO
>;
export type countryAndStateModel = AmazonCountryAndStateVOModel['countryAndState'];

export type StorageModel = ApiReturnType<typeof storageApiSdk.getStorageDetail>;
