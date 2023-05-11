import { GetShipmentListRequestPayload } from '@app/services/v1/vendor-central/vendor-central.request';
import { ShipmentModel } from "@app/services/v1/vendor-central/vendor-central.model";


export interface VendorCentralAbstractSdk {
    getShipmentList(params: GetShipmentListRequestPayload): Promise<{
        data: {
            shipmentResults: ShipmentModel[]   
        }
    }>;

    getAccountPool(): Promise<any>
}
