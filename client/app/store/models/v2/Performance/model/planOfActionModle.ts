import { planOfActionSdk } from '@client/app/services/v2/performance/planOfAction';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';

export type PlanOfActionDetailModel = ApiReturnType<typeof planOfActionSdk.gDetail>;

export type PlanOfActionListModel = ApiReturnType<typeof planOfActionSdk.gPOASearch>;

export type ReplyTemplateModel = ApiReturnType<typeof planOfActionSdk.findTemplateById>;
