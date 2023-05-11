export interface BusinessProductBrand {
    brandVO: {
        id: string;
        name: string;
        // productName: string;
        // serialstring: string;
        createdTimeMs: string; // unix 时间戳
        updatedTimeMs: string; // unix 时间戳
    };
    historyTotalSales: string;
}
export interface BusinessProductLine {
    productLineVO: {
        id: string;
        name: string;
        brandId: string;
        historyTotalSales: string;
        createdTimeMs: string; // unix 时间戳
        updatedTimeMs: string; // unix 时间戳
    };
    historyTotalSales: string;
}
export interface BusinessProductModel {
    id: string;
    ssku: string;
    companyId: string;
    productLineId: string;
    productLineName:string;
    primaryCategoryId: string;
    primaryCategoryName: string;
    brandId: string;
    brandName: string;
    productName: string;
    modelNo: string;
    historySale: string;
    createdTimeMs: string;
    updatedTimeMs: string;
}

// 商务产品模块
export interface BusinessProductCheckedModel {
    productId: string;
    taskId: string;
    processInstanceld: string;
    brandName: string;
    ModelNo: string;
    productLineName: string;
    productName: string;
    asin: string;
    ssku: string;
    companyName: string;
    createdTimeMs: string;
    updatedTimeMs: string;
    salesFirstAuditId: string;
    salesSecondAuditId: string;
    operatingAuditId: string;
    salesFirstAuditName: string;
    salesSecondAuditName: string;
    operatingAuditName: string;
    currentStatus: string;
    operatingAccountCode: string;
    storageCode: string;
}
export interface ProductReportCodeModel {
    code: string;
    desc: string;
}

export interface IdWithCodeModel {
    id: string;
    code: string;
}

export interface ProductDetailBasicModel {
    id: string;
    ssku: string;
    productName: string;
    companyId: string;
    brandId: string;
    categoryId: string;
    categoryName: string;
    productLineId: string;
    modelNo: string;
    asin: string;
    upc: string;
    nodeId: string;
    msrp: string;
    map: string;
    scFulfillmentFee: string;
    scReferralFreeRate: string;
    returnRate: string;
    inventory: string;
    fobLeadTime: string;
    itemPackageLength: string;
    itemPackageWidth: string;
    itemPackageHeight: string;
    itemPackageWeight: string;
    cartonLength: string;
    cartonWidth: string;
    cartonHeight: string;
    cartonWeight: string;
    itemsPerInnerPack: string;
    historySale: string;
    processId: string;
    status: number;
    storageId: string;
    operatingAccountId: string;
    profitMeasureId: string;
    createdTimeMs: string;
    updatedTimeMs: string;
    salesFirstAuditId: string;
    salesSecondAuditId: string;
    operatingAuditId: string;
    currentAuditId: string;
    currentAuditName: string;
    primaryNodeId:string;
}
export interface ProductProfitModel {
    id: string;
    itemCost: number;
    dutyTax: number;
    promotionFeeRate:number
    cnUsFreightFee:number;
    advertisingCostRate:number
    grossProfitMargin:number;
    promotionCost:number
    productTotalCost:number;
    calculatorContextSnapshot:string;
    createdTimeMs:string;
    updatedTimeMs:string
}
export interface TaskInfoModel {
    id: string;
    assignee: string;
    name: string;
    processInstanceId: string;
    createTime: string;
    claimTime: string;
}

export interface CommentInfoModel {
    type: string;
    userId: string;
    time: string;
    taskId: string;
    processInstanceId: string;
    message: string;
    fullMessage: string;
}
export interface ProductDetailModel {
    profit: ProductProfitModel;
    product: ProductDetailBasicModel;
    task: TaskInfoModel;
    comments: CommentInfoModel[];
    offer:OfferInfoModel;
    brand:BrandInfoModel;
    category:CategoryInfoModel;
    storageFee:StorageFeeInfoModel;
    accountManager:UserInfoModel;
    currentAuditUser:UserInfoModel;
    productLine:ProductLineInfoModel;
}

export interface CompanyInfoModel {
    id: string;
    name: string;
}

export interface CompanyDetailInfoModel {
    companyVO: {
        id: string;
        name: string;
        countryCode: string;
        businessCode: string;
        companyUserId: string;
        companyUserName: string;
        level: string;
        remark: string;
        createdTimeMs: number;
        updatedTimeMs: number;
    };
    historyTotalSale: number;
    brandCount:number;
}

export interface OfferInfoModel {
    id:number;
    price:number;
    discount:number;
    expectPrice:number;
    brandLostRate:number;
    scStorageFeeRate:number;
    scTotalCommissionRate:number;
    scTotalCostRate:number;
    scFulfillmentFeeRate:number;
    fbaTransferFee:number;
    fbaTransferFeeRate:number;
    amazonNetPpmRate:number;
    amazonInvoiceCost:number;
    amazonFrontMarginRate:number;
    spotterProfit:number;
    spotterMarginRate:number;
    spotterLowestInvoiceCost:number;
    calculatorContextSnapshot:string;
    createdTimeMs:string;
    updatedTimeMs:string;
}

export interface SpotterOfferInfoModel {
    price:number;
    discount:string;
    spotterMarginRate:number;
    amazonNetPpMRate:number;
    brandLostRate:number;
}
export interface BrandInfoModel {
    id:string;
    name:string;
    createdTimeMs:string;
    updatedTimeMs:string;
}

export interface CategoryInfoModel {
    id:string;
    primaryNodeName:string;
    primaryNodeId:string;
    nodeId:string;
    useCount:number;
    createdTimeMs:string;
    updatedTimeMs:string;
}

export interface StorageFeeInfoModel {
   id:string
   vcpoFulfillmentFeePerPiece:number;
   vcpoFulfillmentFeePerCase:number;
   shippingLabelFee:number;
   shippingOrderPickingFee:number;
   cartonLabelFee:number;
   storageFee:number;
   devanningFee:number;
   cartonQtyPer40Hq:number;
   basePricing:number;
   sellerStorageCoefficient:number;
   calculatorContextSnapshot:string;
   createdTimeMs:string;
   updatedTimeMs:string;
}

export interface UserInfoModel {
    id:string
    status:string;
    email:string;
    name:string;
    phone:string;
    companyId:string;
 }

 export interface ProductLineInfoModel {
    id:string
    brandId:number;
    name:string;
    createdTimeMs:string;
    updatedTimeMs:string;
 }