import { WithPagination, BaseApiSdk } from '@spotter/api-sdk';
import { GMeshAbstractSdk } from '@app/services/v1/g-mesh/g-mesh.abstract';
import {
    GetProductListRequestPayload,
    GetProductLineListRequestPayload,
    GetProductBrandListRequestPayload,
    GetMyProductBusinessCheckedDoneRequestPayload,
    GetMyProductBusinessCheckedTodoRequestPayload,
    GetDepartmentProductBusinessCheckedDoneRequestPayload,
    GetDepartmentProductBusinessCheckedTodoRequestPayload,
    GetMyProductOperatingCheckedDoneRequestPayload,
    GetMyProductOperatingCheckedTodoRequestPayload,
    GetDepartmentProductOperatingCheckedDoneRequestPayload,
    GetDepartmentProductOperatingCheckedTodoRequestPayload,
    GetProductAuditDetailRequestPayload,
    UpdateProductRequestPayload,
    ApprovalBusinessTaskRequestPayload,
    ApprovalOperatingTaskRequestPayload,
    TaskResetAssigneeRequestPayload,
    TaskRefusedRequestPayload,
    CalculateProductBusinessFirstRequestPayload,
    CalculateProductBusinessSecondRequestPayload,
} from '@app/services/v1/g-mesh/g-mesh.request';
import {
    BusinessProductBrand,
    BusinessProductLine,
    BusinessProductModel,
    BusinessProductCheckedModel,
    ProductDetailModel,
    ProductReportCodeModel,
    IdWithCodeModel,
    SpotterOfferInfoModel,
    CompanyDetailInfoModel,
} from '@app/services/v1/g-mesh/g-mesh.model';

export class GMeshSdk extends BaseApiSdk implements GMeshAbstractSdk {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(...params: ConstructorParameters<typeof BaseApiSdk>) {
        super(...params);
    }
    /**
     * 获取产品品牌列表
     */
    async getProductBrandList(data: GetProductBrandListRequestPayload) {
        return this.httpClient.request<BusinessProductBrand[]>({
            url: '/brand/list',
            method: 'POST',
            data,
        });
    }
    /**
     * 获取产品线列表
     * @param brandId
     */
    async getProductLineList(data: GetProductLineListRequestPayload) {
        return this.httpClient.request<BusinessProductLine[]>({
            url: '/line/list',
            method: 'POST',
            data,
        });
    }
    /**
     * 获取产品线产品销售列表
     * @param data
     */
    async getProductLinePage(data: GetProductListRequestPayload) {
        return this.httpClient.request<WithPagination<BusinessProductModel>>({
            url: '/product/line/page',
            method: 'POST',
            data,
        });
    }
    // 商务-审核模块
    /**
     * 商务-我的已办
     * @param data
     */
    async getMyProductBusinessCheckedDone(data: GetMyProductBusinessCheckedDoneRequestPayload) {
        return this.httpClient.request<WithPagination<BusinessProductCheckedModel>>({
            url: '/product/business/done',
            method: 'POST',
            data,
        });
    }
    /**
     * 商务-我的待办
     * @param data
     */
    async getMyProductBusinessCheckedTodo(data: GetMyProductBusinessCheckedTodoRequestPayload) {
        return this.httpClient.request<WithPagination<BusinessProductCheckedModel>>({
            url: '/product/business/todo',
            method: 'POST',
            data,
        });
    }
    /**
     * 商务-部门已办
     * @param data
     */
    async getDepartmentProductBusinessCheckedDone(
        data: GetDepartmentProductBusinessCheckedDoneRequestPayload,
    ) {
        return this.httpClient.request<WithPagination<BusinessProductCheckedModel>>({
            url: '/product/department/business/done',
            method: 'POST',
            data,
        });
    }
    /**
     * 商务-部门待办
     * @param data
     */
    async getDepartmentProductBusinessCheckedTodo(
        data: GetDepartmentProductBusinessCheckedTodoRequestPayload,
    ) {
        return this.httpClient.request<WithPagination<BusinessProductCheckedModel>>({
            url: '/product/department/business/todo',
            method: 'POST',
            data,
        });
    }
    /**
     * 运营-我的已办
     * @param params
     */
    async getMyProductOperatingCheckedDone(data: GetMyProductOperatingCheckedDoneRequestPayload) {
        return this.httpClient.request<WithPagination<BusinessProductCheckedModel>>({
            url: '/product/operating/done',
            method: 'POST',
            data,
        });
    }
    /**
     * 运营-我的待办
     * @param data
     */
    async getMyProductOperatingCheckedTodo(data: GetMyProductOperatingCheckedTodoRequestPayload) {
        return this.httpClient.request<WithPagination<BusinessProductCheckedModel>>({
            url: '/product/operating/todo',
            method: 'POST',
            data,
        });
    }
    /**
     * 运营-部门已办
     * @param data
     */
    async getDepartmentProductOperatingCheckedDone(
        data: GetDepartmentProductOperatingCheckedDoneRequestPayload,
    ) {
        return this.httpClient.request<WithPagination<BusinessProductCheckedModel>>({
            url: '/product/department/operating/done',
            method: 'POST',
            data,
        });
    }
    /**
     * 运营-部门待办
     * @param data
     */
    async getDepartmentProductOperatingCheckedTodo(
        data: GetDepartmentProductOperatingCheckedTodoRequestPayload,
    ) {
        return this.httpClient.request<WithPagination<BusinessProductCheckedModel>>({
            url: '/product/department/operating/todo',
            method: 'POST',
            data,
        });
    }
    /**
     * 查看产品详情：包含产品、审批&利润测算信息
     * @param data
     */
    async getProductAuditDetail(data: GetProductAuditDetailRequestPayload) {
        return this.httpClient.request<ProductDetailModel>({
            url: '/product/audit/detail',
            method: 'POST',
            data,
        });
    }
    /**
     * 获取产品上报状态所有枚举
     */
    async getProductStatusEnums() {
        return this.httpClient.request<ProductReportCodeModel[]>({
            url: '/product/status/enums',
            method: 'GET',
        });
    }
    // /**
    //  * 模糊搜索公司
    //  */
    // async getCompanyList(data: GetCompanyListRequestPayload) {
    //     return this.httpClient.request<CompanyInfoModel[]>({
    //         url: '/company/search',
    //         method: 'POST',
    //         data,
    //     });
    // }

    /**
     * 更新产品基本信息
     */
    async updateProductBasicInfo(data: UpdateProductRequestPayload) {
        return this.httpClient.request<boolean>({
            url: '/product',
            method: 'PUT',
            data,
        });
    }

    /**
     * 获取所有运营账号信息
     */
    async getOperatingAccountAll() {
        return this.httpClient.request<IdWithCodeModel[]>({
            url: '/operating/account/all',
            method: 'GET',
        });
    }

    /**
     * 获取所有仓库
     */
    async getStorageAll() {
        return this.httpClient.request<IdWithCodeModel[]>({
            url: '/storage/all',
            method: 'GET',
        });
    }

    /**
     * 商务审批通过任务
     */
    async taskBusinessApproval(data: ApprovalBusinessTaskRequestPayload) {
        return this.httpClient.request<boolean>({
            url: '/task/business/approval',
            method: 'POST',
            data,
        });
    }

    /**
     * 审批拒绝任务
     */
    async taskRefused(data: TaskRefusedRequestPayload[]) {
        return this.httpClient.request<boolean>({
            url: '/task/refused',
            method: 'POST',
            data,
        });
    }
    /**
     * 运营审批通过任务
     */
    async taskOperatingApproval(data: ApprovalOperatingTaskRequestPayload[]) {
        return this.httpClient.request<boolean>({
            url: '/task/operating/approval',
            method: 'POST',
            data,
        });
    }
    /**
     * 批量转移审核员
     */
    async taskRestAssignee(data: TaskResetAssigneeRequestPayload[]) {
        return this.httpClient.request<boolean>({
            url: '/task/reset/assignee',
            method: 'POST',
            data,
        });
    }

    async getCompanyInfo(companyId: string) {
        return this.httpClient.request<CompanyDetailInfoModel>({
            url: '/company/info',
            method: 'POST',
            data: { companyId },
        });
    }

    async CalculateProductBusinessFirst(data: CalculateProductBusinessFirstRequestPayload) {
        return this.httpClient.request<SpotterOfferInfoModel>({
            url: '/calculate/product/business/first',
            method: 'POST',
            data,
        });
    }

    async CalculateProductBusinessFirstSave(data: CalculateProductBusinessFirstRequestPayload) {
        return this.httpClient.request<SpotterOfferInfoModel>({
            url: '/calculate/product/business/first/save',
            method: 'POST',
            data,
        });
    }

    async CalculateProductBusinessSecond(data: CalculateProductBusinessSecondRequestPayload) {
        return this.httpClient.request<SpotterOfferInfoModel>({
            url: '/calculate/product/business/second',
            method: 'POST',
            data,
        });
    }

    async CalculateProductBusinessSecondSave(data: CalculateProductBusinessSecondRequestPayload) {
        return this.httpClient.request<SpotterOfferInfoModel>({
            url: '/calculate/product/business/second/save',
            method: 'POST',
            data,
        });
    }
}
