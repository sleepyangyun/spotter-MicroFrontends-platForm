import generateSettingSectionDefaultSchema from '@server/util/setting';
import {
    DEFAULT_EMPTY,
    ServiceRegistry,
    SettingSection,
} from '@server/infra/setting/setting.constants';
import Joi from 'joi';

export interface ServiceRegistrySectionSetting {
    serviceUrl: string;
}

export interface ServiceSectionSetting {
    registries: ServiceRegistry[];
    [ServiceRegistry.AMAZON]: ServiceRegistrySectionSetting
}

export const ServiceSectionSettingSchema = generateSettingSectionDefaultSchema(
    SettingSection.SERVICE,
    {
        registries: Object.values(ServiceRegistry) as any,
        [ServiceRegistry.AMAZON]: {
            serviceUrl: DEFAULT_EMPTY,
        },
    },
    {
        registries: Joi.array()
            .unique()
            .items(...Object.values(ServiceRegistry)) as any,
    },
);
