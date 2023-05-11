export interface SearchShipmenResponse {
    shipmentResults: IShipmentResult[];
    nextPageNum: number;
}


/* 自动生成的 Interface */

interface IShipmentResult {
    arn: string;
    asnId: string;
    arnCreationDate: number;
    asnCreationDate: number;
    cartonCount: number;
    stackedPalletCount: number;
    unstackedPalletCount: number;
    carrierScac: string;
    carrierName: any /* 未知类型 */;
    shipMode: string;
    shipFromAddressId: number;
    shipFromLine1: string;
    shipFromName: string;
    shipFromCity: string;
    shipFromZip: string;
    shipFromState: string;
    shipFromLocalTimeZone: string;
    shipFromCountryCode: string;
    tenderPickupDate: number;
    estimatedDeliveryDate: number;
    deliveryDate: any /* 未知类型 */;
    shipToName: string;
    shipToLine1: string;
    shipToFC: string;
    shipToCity: string;
    shipToState: string;
    shipToCountryCode: string;
    shipToZip: string;
    shipToLocalTimeZone: any /* 未知类型 */;
    shipmentStatus: string;
    poIds: string[];
    isAsnDraft: boolean;
    isExcelDraft: any /* 未知类型 */;
    frdDMStatus: any /* 未知类型 */;
    frdDMOrigin: any /* 未知类型 */;
    loadDMStatus: any /* 未知类型 */;
    loadDMOrigin: any /* 未知类型 */;
    canPrintLabels: boolean;
    canPrintPalletLabels: boolean;
    isArnEditable: boolean;
    isAsnEditable: boolean;
    referenceId: any /* 未知类型 */;
    canPrintCI: any /* 未知类型 */;
    canCreateCI: any /* 未知类型 */;
    vehicleRunId: string;
}