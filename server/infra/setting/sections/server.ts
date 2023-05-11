import Joi from 'joi';
import {
    AppEnvironment,
    DEFAULT_APP_NAME,
    DEFAULT_CONF_LOAD_DIRECTORY,
    DEFAULT_DOMAIN,
    DEFAULT_EMPTY,
    DEFAULT_PORT,
    DEFAULT_STATIC_ROOT_PATH,
    Scheme,
    SettingSection,
    Switch,
} from '@server/infra/setting/setting.constants';
import generateSettingSectionDefaultSchema from '@server/util/setting';

export interface ServerRuntimeSectionSetting {
    appRootPath: string;
    appConfigPath: string;
    appEnv: AppEnvironment;
    appApiUrl?: string;
    appApiTag?: string;
}

export interface ServerSectionSetting {
    protocol: Scheme;
    httpAddr: string;
    httpPort: number;
    domain: string;
    rootUrl: string;
    appSubUrl: string;
    appApiUrl: string;
    appCode: string;
    staticRootPath: string;
    appName: string;
    enableGzip: boolean;
    certFile: string;
    certKey: string;
    ca: string;
    runtime: ServerRuntimeSectionSetting;
}

export const ServerSectionSettingSchema = generateSettingSectionDefaultSchema(
    SettingSection.SERVER,
    {
        protocol: Scheme.HTTP,
        httpAddr: DEFAULT_EMPTY,
        httpPort: DEFAULT_PORT,
        domain: DEFAULT_DOMAIN,
        rootUrl: DEFAULT_EMPTY,
        appSubUrl: DEFAULT_EMPTY,
        appApiUrl: DEFAULT_EMPTY,
        staticRootPath: DEFAULT_STATIC_ROOT_PATH,
        appName: DEFAULT_APP_NAME,
        appCode: DEFAULT_EMPTY,
        enableGzip: Switch.ON,
        certFile: DEFAULT_EMPTY,
        certKey: DEFAULT_EMPTY,
        ca: DEFAULT_EMPTY,
        runtime: {
            appConfigPath: DEFAULT_CONF_LOAD_DIRECTORY,
            appRootPath: DEFAULT_EMPTY,
            appEnv: AppEnvironment.DEVELOPMENT,
            appApiUrl: DEFAULT_EMPTY,
            appApiTag: DEFAULT_EMPTY,
        },
    },
    {
        protocol: Joi.string().valid(...Object.values(Scheme)),
        runtime: {
            appEnv: Joi.string().valid(...Object.values(AppEnvironment)),
        },
    },
);
