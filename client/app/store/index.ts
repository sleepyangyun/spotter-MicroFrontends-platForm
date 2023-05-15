/**
 * @See https://github.com/mobxjs/mobx-react-lite/#observer-batching
 */
import { createContext, useContext } from 'react';
import { Instance, types } from 'mobx-state-tree';
import GlobalStore from '@app/store/models/v2/Global';
import AppStore from '@app/store/models/v2/App';
// import VendorCentralStore from '@app/store/models/v1/VendorCentral';
// import OrganizationStore from '@app/store/models/v2/Organization';
// import RoleStore from '@app/store/models/v2/Role';
import TenantStore from '@app/store/models/v2/Tenant';
// import PermissionStore from '@app/store/models/v2/Permission';
// import GMesh from '@app/store/models/v1/G-mesh';
// import { TicketStore } from '@app/store/models/v2/Ticket';
// import { SptShipmentStore } from '@app/store/models/v2/Logistic/sptLogistics';
// import ContractStore from '@app/store/models/v2/Contract';
// import CompanyStore from '@app/store/models/v2/Company';
// import CategoryStore from '@app/store/models/v2/Category';
// import SupportStore from '@app/store/models/v2/Support';
// import CompanyBankStore from '@app/store/models/v2/Auth/CompanyBank';
// import LogStore from '@app/store/models/v2/Log';
// import { CatalogStore } from '@app/store/models/v2/Catalog';
// import OfferStore from '@app/store/models/v2/Offer';
// import AmzOrderStore from '@app/store/models/v2/Order/amzOrder';
// import BBOOrderStore from '@app/store/models/v2/Order/bboOrder';
// import { SVCAccountStore } from '@app/store/models/v2/Business/SVCAccount';
// import AmzLogisticsStore from '@app/store/models/v2/Logistic/amzLogistics';
// import CouponStore from '@app/store/models/v2/Coupon';
// import CommonStore from '@app/store/models/v2/Common';
// import { BtrOrderStore } from '@app/store/models/v2/Order/btrOrder';
// import { FinanceStore } from '@app/store/models/v2/Finance';
// import { WarehouseStore } from '@app/store/models/v2/Warehouse';
// import BestDealStore from '@app/store/models/v2/BestDeal';
// import FileStorageStore from '@app/store/models/v2/File/fileStorage';
// import PriceDiscountStore from '@app/store/models/v2/PriceDiscount';
// import LightningDealStore from '@app/store/models/v2/LightningDeal';
// import PromoCodeStore from '@app/store/models/v2/PromoCode';
// import FileStore from '@app/store/models/v2/File';
// import RefundStore from '@app/store/models/v2/Finance/refund';
// import { AmzInvoiceStore } from '@app/store/models/v2/Finance/invoice';
// import { ChouZhouStore } from '@app/store/models/v2/SupplyChainFinance/chouzhou';
// import MarketingPromotionFeeStore from '@app/store/models/v2/Finance/marketingPromotionFee';
// import { ImageStore } from '@app/store/models/v2/Catalog/imageManagement';
// import OtherFeeStore from '@app/store/models/v2/Finance/otherFee';
// import PenaltyStore from '@app/store/models/v2/Finance/penalty';
// import ReportStore from '@app/store/models/v2/Report';
// import TechnologyServiceFeeStore from '@app/store/models/v2/Finance/technologyServiceFee';

// import BusinessAgreementStore from '@app/store/models/v2/Business/Agreement';
// import BusinessProductStore from '@app/store/models/v2/Business/Product';
// import BusinessEnumStore from '@app/store/models/v2/Business/Enum';
// import BusinessProcessRecordStore from '@app/store/models/v2/Business/ProcessRecord';
// import BusinessBrandStore from '@app/store/models/v2/Business/Brand';
// import BusinessProductLineStore from '@app/store/models/v2/Business/ProductLine';
// import BusinessBrandAuthReportingStore from '@app/store/models/v2/Business/BrandAuthReporting';
// import { SalesManagementStore } from '@app/store/models/v2/Management/SaleManagement';
// import { VideoStore } from './models/v2/Catalog/videoManagement';
// import { MessageStore } from './models/v2/Message';
// import { PlanOfActionStore } from './models/v2/Performance/planOfAction';
// import { SpotterInvoiceStore } from './models/v2/Finance/spotterInvoice';
// import CategoryModificationStore from './models/v2/Catalog/categoryModification';
// import { WarehouseStatementStore } from './models/v2/Finance/statement';
// import BusinessStorageAgreementStore from './models/v2/Business/StorageAgreement';
// import { MonthReconciliationStore } from './models/v2/Finance/month';
// import { DfOrderStore } from './models/v2/Order/dfOrder';
// import { DfShipmentStore } from './models/v2/Logistic/dfShipment';

const masterModelProperties = {
    app: AppStore,
    global: GlobalStore,
    // organization: OrganizationStore,
    // role: RoleStore,
    tenant: TenantStore,
    // permission: PermissionStore,
    // gmesh: GMesh,
    // vendorCentral: VendorCentralStore,
    // ticket: TicketStore,
    // contract: ContractStore,
    // company: CompanyStore,
    // category: CategoryStore,
    // companyBank: CompanyBankStore,
    // support: SupportStore,
    // log: LogStore,
    // catalog: CatalogStore,
    // offer: OfferStore,
    // amzOrder: AmzOrderStore,
    // bboOrder: BBOOrderStore,
    // svcAccount: SVCAccountStore,
    // amzLogistics: AmzLogisticsStore,
    // dfShipment: DfShipmentStore,
    // sptShipment: SptShipmentStore,
    // coupon: CouponStore,
    // warehouse: WarehouseStore,
    // finance: FinanceStore,
    // btrOrder: BtrOrderStore,
    // dfOrder: DfOrderStore,
    // common: CommonStore,
    // bestDeal: BestDealStore,
    // priceDiscount: PriceDiscountStore,
    // lightningDeal: LightningDealStore,
    // promoCode: PromoCodeStore,
    // // file: FileStorageStore,
    // file: FileStore,
    // amzInvoice: AmzInvoiceStore,
    // invoice: SpotterInvoiceStore,
    // chouzhou: ChouZhouStore,
    // refund: RefundStore,
    // fileStorage: FileStorageStore,
    // marketingPromotionFee: MarketingPromotionFeeStore,
    // otherFee: OtherFeeStore,
    // penalty: PenaltyStore,
    // image: ImageStore,
    // video: VideoStore,
    // businessAgreement: BusinessAgreementStore,
    // businessProduct: BusinessProductStore,
    // businessEnum: BusinessEnumStore,
    // businessProcessRecord: BusinessProcessRecordStore,
    // businessBrand: BusinessBrandStore,
    // BusinessBrandAuthReporting: BusinessBrandAuthReportingStore,
    // message: MessageStore,
    // report: ReportStore,
    // technologyServiceFee: TechnologyServiceFeeStore,
    // businessProductLine: BusinessProductLineStore,
    // planOfAction: PlanOfActionStore,
    // categoryModification: CategoryModificationStore,
    // warehouseStatement: WarehouseStatementStore,
    // salesManagement: SalesManagementStore,
    // businessStorageAgreement: BusinessStorageAgreementStore,
    // // Finance
    // monthReconciliation: MonthReconciliationStore,
};
const masterModel = types.model(masterModelProperties);

export type MasterStoreInstance = Instance<typeof masterModel>;

export const masterStore = masterModel.create(
    Object.keys(masterModelProperties).reduce((p, model) => {
        p[model as keyof typeof masterModelProperties] = {};
        return p;
    }, {} as Record<keyof typeof masterModelProperties, any>),
);

const MasterStoreContext = createContext<null | MasterStoreInstance>(null);
export const { Provider: MasterStoreProvider } = MasterStoreContext;

type ScopeType = keyof typeof masterModelProperties;

export function useStore(): MasterStoreInstance;
export function useStore<T extends ScopeType>(scope?: T): MasterStoreInstance[T];
export function useStore(scope?: ScopeType): any {
    const store = useContext(MasterStoreContext);
    if (store === null) {
        throw new Error('Store cannot be null, please add a context provider');
    }
    if (scope) {
        if (!store[scope]) {
            throw new Error(`Store have no property that named: ${scope}`);
        } else {
            return store[scope];
        }
    }
    return store;
}
