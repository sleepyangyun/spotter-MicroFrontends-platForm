import { AsyncServiceResponseResult, WithPagination } from '@spotter/api-sdk';

import {
    GetProductListRequestPayload,
    GetProductLineListRequestPayload,
    GetProductBrandListRequestPayload,
    ApprovalBusinessTaskRequestPayload,
    ApprovalOperatingTaskRequestPayload,
    TaskResetAssigneeRequestPayload,
    TaskRefusedRequestPayload,
    GetMyProductBusinessCheckedDoneRequestPayload,
    GetMyProductBusinessCheckedTodoRequestPayload,
    GetDepartmentProductBusinessCheckedDoneRequestPayload,
    GetDepartmentProductBusinessCheckedTodoRequestPayload,
    GetMyProductOperatingCheckedDoneRequestPayload,
    GetMyProductOperatingCheckedTodoRequestPayload,
    GetDepartmentProductOperatingCheckedDoneRequestPayload,
    GetDepartmentProductOperatingCheckedTodoRequestPayload,
    CalculateProductBusinessFirstRequestPayload,
    CalculateProductBusinessSecondRequestPayload,
} from '@app/services/v1/g-mesh/g-mesh.request';
import {
    BusinessProductBrand,
    BusinessProductLine,
    BusinessProductModel,
    IdWithCodeModel,
    BusinessProductCheckedModel,
    SpotterOfferInfoModel, CompanyDetailInfoModel,
} from '@app/services/v1/g-mesh/g-mesh.model';

export interface GMeshAbstractSdk {
    getProductLinePage(
        data: GetProductListRequestPayload,
    ): AsyncServiceResponseResult<WithPagination<BusinessProductModel>>;
    getProductBrandList(
        data: GetProductBrandListRequestPayload,
    ): AsyncServiceResponseResult<BusinessProductBrand[]>;
    getProductLineList(
        data: GetProductLineListRequestPayload,
    ): AsyncServiceResponseResult<BusinessProductLine[]>;
    getMyProductBusinessCheckedDone(
        data: GetMyProductBusinessCheckedDoneRequestPayload,
    ): AsyncServiceResponseResult<WithPagination<BusinessProductCheckedModel>>;
    getMyProductBusinessCheckedTodo(
        data: GetMyProductBusinessCheckedTodoRequestPayload,
    ): AsyncServiceResponseResult<WithPagination<BusinessProductCheckedModel>>;
    getDepartmentProductBusinessCheckedDone(
        data: GetDepartmentProductBusinessCheckedDoneRequestPayload,
    ): AsyncServiceResponseResult<WithPagination<BusinessProductCheckedModel>>;
    getDepartmentProductBusinessCheckedTodo(
        data: GetDepartmentProductBusinessCheckedTodoRequestPayload,
    ): AsyncServiceResponseResult<WithPagination<BusinessProductCheckedModel>>;
    getMyProductOperatingCheckedDone(
        data: GetMyProductOperatingCheckedDoneRequestPayload,
    ): AsyncServiceResponseResult<WithPagination<BusinessProductCheckedModel>>;
    getMyProductOperatingCheckedTodo(
        data: GetMyProductOperatingCheckedTodoRequestPayload,
    ): AsyncServiceResponseResult<WithPagination<BusinessProductCheckedModel>>;
    getDepartmentProductOperatingCheckedDone(
        data: GetDepartmentProductOperatingCheckedDoneRequestPayload,
    ): AsyncServiceResponseResult<WithPagination<BusinessProductCheckedModel>>;
    getDepartmentProductOperatingCheckedTodo(
        data: GetDepartmentProductOperatingCheckedTodoRequestPayload,
    ): AsyncServiceResponseResult<WithPagination<BusinessProductCheckedModel>>;
    getOperatingAccountAll(): AsyncServiceResponseResult<IdWithCodeModel[]>;
    getStorageAll(): AsyncServiceResponseResult<IdWithCodeModel[]>;
    taskBusinessApproval(
        data: ApprovalBusinessTaskRequestPayload,
    ): AsyncServiceResponseResult<boolean>;
    taskOperatingApproval(
        data: ApprovalOperatingTaskRequestPayload[],
    ): AsyncServiceResponseResult<boolean>;
    taskRestAssignee(data: TaskResetAssigneeRequestPayload[]): AsyncServiceResponseResult<boolean>;
    taskRefused(data: TaskRefusedRequestPayload[]): AsyncServiceResponseResult<boolean>;
    getCompanyInfo(companyId:string): AsyncServiceResponseResult<CompanyDetailInfoModel>;
    CalculateProductBusinessFirst(data:CalculateProductBusinessFirstRequestPayload): AsyncServiceResponseResult<SpotterOfferInfoModel>;
    CalculateProductBusinessFirstSave(data:CalculateProductBusinessFirstRequestPayload): AsyncServiceResponseResult<SpotterOfferInfoModel>;
    CalculateProductBusinessSecond(data:CalculateProductBusinessSecondRequestPayload): AsyncServiceResponseResult<SpotterOfferInfoModel>;
    CalculateProductBusinessSecondSave(data:CalculateProductBusinessSecondRequestPayload): AsyncServiceResponseResult<SpotterOfferInfoModel>;
}
