export interface VcAccount {
    name: string
    sessionDataId: string
}

export interface ShipmentModel {
    arn: string;
    asnId: string;
    arnCreationDate: number;
    asnCreationDate: number;
    cartonCount: number;
    stackedPalletCount: number;
    unstackedPalletCount: number;
    carrierScac: void /* 未知类型 */;
    carrierName: void /* 未知类型 */;
    shipMode: void /* 未知类型 */;
    shipFromAddressId: number;
    shipFromLine1: string;
    shipFromName: string;
    shipFromCity: string;
    shipFromZip: string;
    shipFromState: string;
    shipFromLocalTimeZone: string;
    shipFromCountryCode: string;
    tenderPickupDate: void /* 未知类型 */;
    estimatedDeliveryDate: void /* 未知类型 */;
    deliveryDate: void /* 未知类型 */;
    shipToName: string;
    shipToLine1: string;
    shipToFC: string;
    shipToCity: string;
    shipToState: string;
    shipToCountryCode: string;
    shipToZip: string;
    shipToLocalTimeZone: void /* 未知类型 */;
    shipmentStatus: string;
    poIds: string[];
    isAsnDraft: boolean;
    isExcelDraft: void /* 未知类型 */;
    frdDMStatus: void /* 未知类型 */;
    frdDMOrigin: void /* 未知类型 */;
    loadDMStatus: void /* 未知类型 */;
    loadDMOrigin: void /* 未知类型 */;
    canPrintLabels: boolean;
    canPrintPalletLabels: boolean;
    isArnEditable: boolean;
    isAsnEditable: boolean;
    referenceId: void /* 未知类型 */;
    canPrintCI: void /* 未知类型 */;
    canCreateCI: void /* 未知类型 */;
    vehicleRunId: void /* 未知类型 */;
}