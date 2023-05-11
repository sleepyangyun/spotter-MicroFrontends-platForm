import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import WithPrimaryUpdateFnModel from '@app/store/infra/WithPrimaryUpdateFnModel';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';
import { imageSdk } from '@client/app/services/v2/items/imageManagement';

export const ImageStore = Model({
    name: 'ImageStore',
    properties: {
        imageTiketdetail: WithPrimaryUpdateFnModel(<ApiReturnType<typeof imageSdk.getDetail>>{})
            .model,
        operationRecord: WithPrimaryUpdateFnModel(
            <ApiReturnType<typeof imageSdk.getOperationRecord>>{},
        ).model,
    },
    overridesInitWatcher: {
        accept: false,
        audit: false,
        divert: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    //  接受转移给我的Item图片管理工单
    const acceptImageTiket = autoContextFlow(
        'accept',
        async (...args: Parameters<typeof imageSdk.accept>) => {
            const { data: res } = await imageSdk.accept(...args);
            return res;
        },
    );
    //  审核Item图片管理工单
    const auditImageTiket = autoContextFlow(
        'audit',
        async (...args: Parameters<typeof imageSdk.audit>) => {
            const { data: res } = await imageSdk.audit(...args);
            return res;
        },
    );
    // 转移Item图片管理工单
    const divertImageTiket = autoContextFlow(
        'divert',
        async (...args: Parameters<typeof imageSdk.divert>) => {
            const { data: res } = await imageSdk.divert(...args);
            return res;
        },
    );
    // 获取详情
    const getImageTiketDetail = autoContextFlow(
        'imageTiketdetail',
        async (...args: Parameters<typeof imageSdk.getDetail>) => {
            const { data: res } = await imageSdk.getDetail(...args);
            return res;
        },
    );
    // 分页条件查询转移给我的Item图片管理工单
    const getDivertMe = autoContextFlow(
        'divertMe',
        async (...args: Parameters<typeof imageSdk.getDivertMe>) => {
            const { data: res } = await imageSdk.getDivertMe(...args);
            return res;
        },
    );

    // 获取操作记录
    const getOperationRecord = autoContextFlow(
        'operationRecord',
        async (...args: Parameters<typeof imageSdk.getOperationRecord>) => {
            const { data: res } = await imageSdk.getOperationRecord(...args);
            return res;
        },
    );

    // 分页条件查询Item图片管理工单
    const getImageTiketList = autoContextFlow(
        'imageTiketList',
        async (...args: Parameters<typeof imageSdk.getPage>) => {
            const { data: res } = await imageSdk.getPage(...args);
            return res;
        },
    );

    return {
        acceptImageTiket,
        auditImageTiket,
        divertImageTiket,
        getImageTiketDetail,
        getDivertMe,
        getOperationRecord,
        getImageTiketList,
    };
});
