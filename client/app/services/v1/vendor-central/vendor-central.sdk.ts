import { BaseApiSdk } from '@spotter/api-sdk';
import { VendorCentralAbstractSdk } from '@app/services/v1/vendor-central/vendor-central.abstract';
import { GetShipmentListRequestPayload } from '@app/services/v1/vendor-central/vendor-central.request';
import { ShipmentModel, VcAccount } from '@app/services/v1/vendor-central/vendor-central.model';
import { localCache } from '@spotter/utils';
import { LAST_SELECTED_VC_ACCOUNT } from '@client/app/utils/const';

export class VendorCentralSdk extends BaseApiSdk implements VendorCentralAbstractSdk {
    // ESLINT 报错无用的constructor，故暂时注释掉
    // constructor(...params: ConstructorParameters<typeof BaseApiSdk>) {
    //     super(...params);
    // }
    /**
     * 查询 shipment 列表 GET /api/amazon/vc/orders/shipments/list?keyword=16482699301,16482506241
     */
    async getShipmentList(params: GetShipmentListRequestPayload) {
        return this.httpClient.request<ShipmentModel[], { shipmentResults: ShipmentModel[] }>({
            url: '/orders/shipments/list',
            method: 'GET',
            params,
            headers: {
                'VC-Session-Data-Id': localCache.get(LAST_SELECTED_VC_ACCOUNT) ?? '',
            },
        });
    }

    /**
     * 查询账号池
     */
    async getAccountPool() {
        return this.httpClient.request<VcAccount[]>({
            url: '/account/pool',
            method: 'GET',
        });
    }
}
