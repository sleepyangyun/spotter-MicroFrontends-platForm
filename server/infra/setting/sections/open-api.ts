import {
    DEFAULT_OPEN_API_DOC_TITLE,
    DEFAULT_OPEN_API_PATH,
    SettingSection,
    Switch,
} from '@server/infra/setting/setting.constants';
import generateSettingSectionDefaultSchema from '@server/util/setting';

export interface OpenApiSectionSetting {
    enable: boolean;
    title: string;
    path: string;
}

export const OpenApiSectionSettingSchema = generateSettingSectionDefaultSchema(
    SettingSection.OPEN_API,
    {
        enable: Switch.ON,
        title: DEFAULT_OPEN_API_DOC_TITLE,
        path: DEFAULT_OPEN_API_PATH,
    },
);
