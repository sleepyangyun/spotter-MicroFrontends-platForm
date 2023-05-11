import { financeOperateSdk } from "@client/app/services/v2/finance/operate";
import { ApiReturnType } from "@spotter/gmesh-api-sdk";

export type OperateLogModel = ApiReturnType<typeof financeOperateSdk.queryLog>;
