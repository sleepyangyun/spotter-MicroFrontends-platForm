import Joi from 'joi';
import {
    ServerSectionSetting,
    ServerSectionSettingSchema,
} from '@server/infra/setting/sections/server';
import { LogSectionSetting, LogSectionSettingSchema } from '@server/infra/setting/sections/logging';
import { AuthSectionSetting, AuthSectionSettingSchema } from '@server/infra/setting/sections/auth';
import {
    ProxySectionSetting,
    ProxySectionSettingSchema,
} from '@server/infra/setting/sections/proxy';
import {
    OpenApiSectionSetting,
    OpenApiSectionSettingSchema,
} from '@server/infra/setting/sections/open-api';
import {
    ServiceSectionSetting,
    ServiceSectionSettingSchema,
} from '@server/infra/setting/sections/service';
import {
    DatabaseSectionSetting,
    DatabaseSectionSettingSchema,
} from '@server/infra/setting/sections/database';

import { SettingSection } from '@server/infra/setting/setting.constants';
import {
    NacosSectionSetting,
    NacosSectionSettingSchema,
} from '@server/infra/setting/sections/nacos';
import { EnvSectionSetting, EnvSectionSettingSchema } from '@server/infra/setting/sections/env';
import {
    ClientMonitorSectionSetting,
    ClientMonitorSectionSettingSchema,
} from '@server/infra/setting/sections/client-monitor';
import { BiSectionSetting, BiSectionSettingSchema } from './bi';
import { BucketSectionSetting, BucketSectionSettingSchema } from './bucket';

export const SettingSchema = Joi.object({
    ...ServerSectionSettingSchema,
    ...DatabaseSectionSettingSchema,
    ...LogSectionSettingSchema,
    ...AuthSectionSettingSchema,
    ...BiSectionSettingSchema,
    ...BucketSectionSettingSchema,
    ...ProxySectionSettingSchema,
    ...OpenApiSectionSettingSchema,
    ...ServiceSectionSettingSchema,
    ...NacosSectionSettingSchema,
    ...EnvSectionSettingSchema,
    ...ClientMonitorSectionSettingSchema,
});

export interface Setting {
    [SettingSection.SERVER]: ServerSectionSetting;
    [SettingSection.DATABASE]: DatabaseSectionSetting;
    [SettingSection.AUTH]: AuthSectionSetting;
    [SettingSection.LOG]: LogSectionSetting;
    [SettingSection.PROXY]: ProxySectionSetting;
    [SettingSection.OPEN_API]: OpenApiSectionSetting;
    [SettingSection.SERVICE]: ServiceSectionSetting;
    [SettingSection.NACOS]: NacosSectionSetting;
    [SettingSection.ENV]: EnvSectionSetting;
    [SettingSection.CLIENT_MONITOR]: ClientMonitorSectionSetting;
    [SettingSection.BI]: BiSectionSetting;
    [SettingSection.BUCKET]: BucketSectionSetting;
}

// use camel case name style
export type TOMLAvailableValue =
    | number
    | string
    | boolean
    | [string | number | boolean]
    | { [key: string]: any };
