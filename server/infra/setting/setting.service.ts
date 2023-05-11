import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Setting, SettingSchema } from '@server/infra/setting/sections';
import { immutable, ImmutableType } from '@server/util/common';
import { SettingSection } from '@server/infra/setting/setting.constants';
import { ServerSectionSetting } from '@server/infra/setting/sections/server';
import { URL } from 'node:url';
import { EnvSectionSetting } from '@server/infra/setting/sections/env';
import { NacosSectionSetting } from '@server/infra/setting/sections/nacos';
import { AuthSectionSetting } from './sections/auth';

type ImmutableSetting = ImmutableType<Setting>;

/**
 * Setting Service
 * All section setting is immutable after instantiated by design.
 * @TODO For future if we need modify some setting in application runtime, we will add mutable runtime setting module to support it.
 */
@Injectable()
// @ts-ignore
export class SettingService implements ImmutableSetting {
    private readonly server: ImmutableSetting[SettingSection.SERVER];

    private readonly database: ImmutableSetting[SettingSection.DATABASE];

    private readonly log: ImmutableSetting[SettingSection.LOG];

    private readonly auth: ImmutableSetting[SettingSection.AUTH];

    private readonly proxy: ImmutableSetting[SettingSection.PROXY];

    private readonly openApi: ImmutableSetting[SettingSection.OPEN_API];

    private readonly service: ImmutableSetting[SettingSection.SERVICE];

    private readonly env: ImmutableSetting[SettingSection.ENV];

    private readonly bi: ImmutableSetting[SettingSection.BI];

    private readonly clientMonitor: ImmutableSetting[SettingSection.CLIENT_MONITOR];

    private readonly logger: LoggerService = new Logger('Setting');

    private readonly allSetting: Setting;

    constructor(private configService: ConfigService<Setting>) {
        const validatedSetting = this.validate();
        const _allSetting: any = {};
        for (const section of Object.values(SettingSection)) {
            const sectionSetting = this.getImmutablePostHandleSectionsSetting(
                section,
                validatedSetting,
            );
            // @ts-ignore
            this[section] = sectionSetting;
            _allSetting[section] = sectionSetting;
        }

        this.allSetting = _allSetting;
    }

    // @ts-ignore
    get(): Setting;
    get<T extends SettingSection>(section: T): Setting[T];

    get(section?: SettingSection): Setting {
        // @ts-ignore
        return section ? (this[section] as unknown as any) : this.allSetting;
    }

    private validate() {
        const { error, value, warning } = SettingSchema.validate(
            (Object.values(SettingSection) as SettingSection[]).reduce((p, c) => {
                p[c] = this.configService.get(c) ?? {};
                return p;
            }, {} as Record<SettingSection, Record<string, unknown>>),
            { abortEarly: false, allowUnknown: false, presence: 'optional', debug: true },
        );
        error && this.logger.error(error.message);
        warning && this.logger.warn(warning.message);
        return value as Setting;
    }

    private getImmutablePostHandleSectionsSetting<S extends SettingSection>(
        section: S,
        setting: Setting,
    ) {
        const sectionSetting = setting[section];
        return immutable(
            (function (self) {
                switch (section) {
                    case SettingSection.SERVER: {
                        return self.postHandleServerSectionSetting(
                            sectionSetting as ServerSectionSetting,
                        );
                    }

                    case SettingSection.ENV: {
                        return self.generateEnvSectionSetting();
                    }

                    case SettingSection.AUTH: {
                        return self.postHandleAuthSectionSetting(
                            sectionSetting as AuthSectionSetting,
                        );
                    }

                    case SettingSection.NACOS: {
                        return self.postHandleNacosSectionSetting(
                            sectionSetting as NacosSectionSetting,
                        );
                    }

                    default: {
                        return sectionSetting;
                    }
                }
            })(this),
        );
    }

    /**
     * Because toml do not support reference syntax by design, so the best practice to use reference value is generating in application level.
     * @see discussion at
     *  1. https://github.com/toml-lang/toml/issues/612
     *  2. https://github.com/toml-lang/toml/issues/528
     */
    private postHandleServerSectionSetting(serverSetting: Setting[SettingSection.SERVER]) {
        const { protocol, domain, httpPort, appSubUrl } = serverSetting;
        /** add server root url depends on other url component */
        serverSetting.rootUrl = new URL(appSubUrl, `${protocol}://${domain}:${httpPort}`).href;
        return serverSetting;
    }

    private postHandleAuthSectionSetting(authSetting: Setting[SettingSection.AUTH]) {
        /** override oauth2 url */
        authSetting.oauth2.larkUrl = process.env.APP_LARK_URL || authSetting.oauth2.larkUrl;
        authSetting.oauth2.dingUrl = process.env.APP_DING_URL || authSetting.oauth2.dingUrl;
        return authSetting;
    }

    private postHandleNacosSectionSetting(nacosSetting: Setting[SettingSection.NACOS]) {
        /** override nacos url */
        nacosSetting.configClient.serverAddr =
            process.env.NACOS_SERVER_ADDR || nacosSetting.configClient.serverAddr;
        return nacosSetting;
    }

    private generateEnvSectionSetting(): EnvSectionSetting {
        // 暂时不使用这种方式，使用预设的环境变量，降低一些发布成本，后期规模到一定量时会统一通过环境变量消费
        return {};
    }
}
