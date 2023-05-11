import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import WithPrimaryUpdateFnModel from '@app/store/infra/WithPrimaryUpdateFnModel';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';
import { videoSdk } from '@client/app/services/v2/items/videoManagement';

export const VideoStore = Model({
    name: 'VideoStore',
    properties: {
        videoTiketdetail: WithPrimaryUpdateFnModel(<ApiReturnType<typeof videoSdk.detail>>{}).model,
    },
    overridesInitWatcher: {
        accept: false,
        audit: false,
        divert: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    //  接收工单
    const acceptVideoTiket = autoContextFlow(
        'accept',
        async (...args: Parameters<typeof videoSdk.accept>) => {
            const { data: res } = await videoSdk.accept(...args);
            return res;
        },
    );
    //  审核工单
    const auditVideoTiket = autoContextFlow(
        'audit',
        async (...args: Parameters<typeof videoSdk.audit>) => {
            const { data: res } = await videoSdk.audit(...args);
            return res;
        },
    );
    // 转移工单
    const divertVideoTiket = autoContextFlow(
        'divert',
        async (...args: Parameters<typeof videoSdk.divert>) => {
            const { data: res } = await videoSdk.divert(...args);
            return res;
        },
    );
    // 详情查询
    const getVideoTiketDetail = autoContextFlow(
        'videoTiketdetail',
        async (...args: Parameters<typeof videoSdk.detail>) => {
            const { data: res } = await videoSdk.detail(...args);
            return res;
        },
    );
    // 查询需我受理
    const getDivertMe = autoContextFlow(
        'divertMe',
        async (...args: Parameters<typeof videoSdk.pageQueryMyTicket>) => {
            const { data: res } = await videoSdk.pageQueryMyTicket(...args);
            return res;
        },
    );

    // 视频列表获取
    const getVideoTiketList = autoContextFlow(
        'videoTiketList',
        async (...args: Parameters<typeof videoSdk.pageQuery>) => {
            const { data: res } = await videoSdk.pageQuery(...args);
            return res;
        },
    );

    return {
        acceptVideoTiket,
        auditVideoTiket,
        divertVideoTiket,
        getVideoTiketDetail,
        getDivertMe,
        getVideoTiketList,
    };
});
