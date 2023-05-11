export interface GetProductListRequestPayload{
    currentPage: number
    pageSize: number
    brandId: string
    companyId:string
    productLineId: string
}

export interface GetProductLineListRequestPayload{
    companyId:string
    brandId: string
}
export interface GetProductBrandListRequestPayload{
    companyId:string
}

export interface GetMyProductBusinessCheckedDoneRequestPayload{
    currentPage: number
    pageSize: number
    currentStatus:string
    keyword:string
    brandId: string
    companyId:string
}
export interface GetMyProductBusinessCheckedTodoRequestPayload{
    currentPage: number
    pageSize: number
    keyword:string
    brandId: string
    companyId:string
}

export interface GetDepartmentProductBusinessCheckedDoneRequestPayload{
    currentPage: number
    pageSize: number
    currentStatus:string
    keyword:string
    brandId: string
    companyId:string
    currentAuditId:string
}
export interface GetDepartmentProductBusinessCheckedTodoRequestPayload{
    currentPage: number
    pageSize: number
    currentStatus:string
    keyword:string
    brandId: string
    companyId:string
    currentAuditId:string
}

export interface GetMyProductOperatingCheckedDoneRequestPayload{
    currentPage: number
    pageSize: number
    currentStatus:string
    keyword:string
    brandId: string
    companyId:string
}
export interface GetMyProductOperatingCheckedTodoRequestPayload{
    currentPage: number
    pageSize: number
    keyword:string
    brandId: string
    companyId:string
}
export interface GetDepartmentProductOperatingCheckedDoneRequestPayload{
    currentPage: number
    pageSize: number
    currentStatus:string
    keyword:string
    brandId: string
    companyId:string
    currentAuditId:string
}
export interface GetDepartmentProductOperatingCheckedTodoRequestPayload{
    currentPage: number
    pageSize: number
    keyword:string
    brandId: string
    companyId:string
    currentAuditId:string
}

export interface GetProductAuditDetailRequestPayload{
    productId?: string
}


// 模糊搜索公司
export interface GetCompanyListRequestPayload{
    likeCompanyName: string
}

export interface UpdateProductRequestPayload{
    id: number
    productName: string
    brandId: string
    productLineId: string
    modelNo: string
    asin: string
}


export interface ApprovalBusinessTaskRequestPayload{
    productId?:string
    taskId:string
    spotterOffer:number
    remark?:string
}

export interface ApprovalOperatingTaskRequestPayload{
    productId?:string
    taskId:string,
    storageId:string,
    operatingAccountId:string
    remark?:string
}

export interface TaskResetAssigneeRequestPayload{
    productId?:string,
    taskId:string,
    newAssignee:string,
}

export interface TaskRefusedRequestPayload{
    productId?:string,
    taskId:string,
    rejectMessage:string,
}

export interface CalculateProductBusinessFirstRequestPayload{
    productId:string,
    amazonNetPpm:number,
    brandLost:number,
}


export interface CalculateProductBusinessSecondRequestPayload{
    productId:string,
    amazonNetPpm:number,
    spotterMargin:number,
}