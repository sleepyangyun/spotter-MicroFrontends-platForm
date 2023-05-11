import { fileStorageSdk } from '@client/app/services/v2/file/fileStorage';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';

export type CredentialModel = ApiReturnType<typeof fileStorageSdk.getCredential>;
