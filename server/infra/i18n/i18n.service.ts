import { Injectable } from '@nestjs/common';
import { NacosService } from '@server/infra/nacos/nacos.service';
// import { I18nCache } from '@server/infra/i18n/i18n.util';
import { SettingService } from '@server/infra/setting/setting.service';
import { SettingSection } from '@server/infra/setting/setting.constants';
import { LoggerService } from '@server/infra/logger/logger.service';
import { Lang } from '@server/util/consts';

@Injectable()
export class I18nService {
    // private readonly i18nCache: I18nCache;
    constructor(
        private nacos: NacosService,
        private settingService: SettingService,
        private logger: LoggerService,
    ) {
        // this.i18nCache = new I18nCache();
        this.subscribeTranslationUpdation();
    }

    private async getI18nTranslationFromNacos(langKey: Lang) {
        const { configClient } = this.settingService.get(SettingSection.NACOS);
        return this.nacos.getConfig(langKey, configClient.i18NTranslationGroup);
        // this.i18nCache.cacheTranslation(langKey, config as any);
    }

    private async subscribeTranslationUpdation() {
        const { configClient } = this.settingService.get(SettingSection.NACOS);
        try {
            await Promise.all(
                Object.values(Lang).map((langKey) => {
                    return this.nacos.subscribe(
                        {
                            dataId: langKey,
                            group: configClient.i18NTranslationGroup,
                        },
                        () => {
                            this.logger.log(`translation[${langKey}] updated.`);
                        },
                    );
                }),
            );
        } catch (error: any) {
            this.logger.error(
                'I18nService init failed! Because fail to subscript i18n translation configuration from nacos, please make sure nacos section setting is correct and nacos is working.',
                error,
            );
        }
    }

    // private async getAllTranslationConfig() {
    //     const { configClient } = this.settingService.get(SettingSection.NACOS);
    //
    //     try {
    //         const data = await this.nacos
    //             .getConfigClient()
    //             .batchGetConfig(Object.values(Lang), configClient.i18NTranslationGroup);
    //         console.log(data);
    //     } catch (error: any) {
    //         this.logger.error(
    //             'I18nService init failed! Because fail to get i18n translation configuration from nacos, please make sure nacos section setting is correct and nacos is working.',
    //             error,
    //         );
    //         throw error
    //     }
    // }

    async getI18nTranslation(langKey: Lang) {
        return this.getI18nTranslationFromNacos(langKey);
    }
}
