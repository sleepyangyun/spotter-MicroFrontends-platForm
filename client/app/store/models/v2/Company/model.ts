import { companySdk } from '@client/app/services/v2/auth/company';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';

export type CompanyListModel = ApiReturnType<typeof companySdk.listAll>;
