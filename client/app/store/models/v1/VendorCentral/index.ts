import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import WithArrayUpdateFnModel from '@app/store/infra/WithArrayUpdateFnModel';
import { ShipmentModel, VcAccount } from '@app/services/v1/vendor-central/vendor-central.model';
import { types } from 'mobx-state-tree';
import { vendorCentralSdk } from '@app/services/v1/vendor-central';

const VendorCentralStore = Model({
    name: 'VendorCentralStore',
    properties: {
        shipmentList: WithArrayUpdateFnModel(types.frozen<ShipmentModel>()).model,
        accountPool: WithArrayUpdateFnModel(types.frozen<VcAccount>()).model,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self);
    const getShipmentList = autoContextFlow(
        'shipmentList',
        async (...params: Parameters<typeof vendorCentralSdk.getShipmentList>) => {
            const { data: res } = await vendorCentralSdk.getShipmentList(...params);
            self.shipmentList.updateData(res.shipmentResults);
            return res;
        },
    );

    const getAccountPool = autoContextFlow('accountPool', async () => {
        const { data: res } = await vendorCentralSdk.getAccountPool();
        self.accountPool.updateData(res.data);
        return res;
    });

    return {
        getShipmentList,
        getAccountPool,
    };
});

export default VendorCentralStore;
