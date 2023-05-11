import { statementSdk } from "@client/app/services/v2/finance/statement";
import { ApiReturnType } from "@spotter/gmesh-api-sdk";

export type WosaModel = ApiReturnType<typeof statementSdk.detailReconciliation>;
