import {
    DEFAULT_NACOS_SEVER_ADDR,
    DEFAULT_NACOS_I18N_TRANSLATION_GROUP_NAME,
    DEFAULT_NACOS_VC_SESSION_GROUP,
    DEFAULT_NACOS_VC_ACCOUNT_POOL_DATA_ID,
    SettingSection,
    DEFAULT_EMPTY,
} from '@server/infra/setting/setting.constants';
import generateSettingSectionDefaultSchema from '@server/util/setting';

export interface NacosSectionSetting {
    configClient: NacosConfigClientSetting;
}

export interface NacosDataSetting {
    dataId: string;
    group: string;
}

export interface NacosConfigClientSetting {
    serverAddr: string;
    i18NTranslationGroup: string;
    vcSessionGroup: string;
    vcAccountPoolDataId: string;
    bi: NacosDataSetting;
}

export const NacosSectionSettingSchema = generateSettingSectionDefaultSchema(SettingSection.NACOS, {
    configClient: {
        serverAddr: DEFAULT_NACOS_SEVER_ADDR,
        i18NTranslationGroup: DEFAULT_NACOS_I18N_TRANSLATION_GROUP_NAME,
        vcSessionGroup: DEFAULT_NACOS_VC_SESSION_GROUP,
        vcAccountPoolDataId: DEFAULT_NACOS_VC_ACCOUNT_POOL_DATA_ID,
        bi: {
            dataId: DEFAULT_EMPTY,
            group: DEFAULT_EMPTY,
        },
    },
});
