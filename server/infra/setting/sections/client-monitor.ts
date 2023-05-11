import generateSettingSectionDefaultSchema from '@server/util/setting';
import {
    DEFAULT_CLIENT_MONITOR_SDK_CDN_URL, DEFAULT_EMPTY,
    SettingSection,
    Switch,
} from '@server/infra/setting/setting.constants';

export interface ClientMonitorSectionSetting {
    /**
     * @description 是否启用 sdk
     */
    enable: boolean;
    /**
     * @description sdk cdn 的 url，涉及首屏加载的性能监控不建议使用 npm 的方式，除非单独提升该 package 的 chunk 引入位置
     */
    sdkCdnUrl: string;
    /**
     * @description 上报 id
     */
    id: string;
    /**
     * @description 开启 API 速度上报
     */
    reportApiSpeed: boolean;
    /**
     * @description 开启静态资源速度上报
     */
    reportAssetSpeed: boolean;
    /**
     * @description spa 应用页面跳转的时候开启 PV 计算
     */
    spa: boolean;
}

export const ClientMonitorSectionSettingSchema = generateSettingSectionDefaultSchema(
    SettingSection.CLIENT_MONITOR,
    {
        enable: Switch.OFF,
        sdkCdnUrl: DEFAULT_CLIENT_MONITOR_SDK_CDN_URL,
        id: DEFAULT_EMPTY,
        reportApiSpeed: Switch.ON,
        reportAssetSpeed: Switch.ON,
        spa: Switch.ON
    },
);
