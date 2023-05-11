import generateSettingSectionDefaultSchema from '@server/util/setting';
import { SettingSection } from '@server/infra/setting/setting.constants';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EnvSectionSetting {}

export const EnvSectionSettingSchema = generateSettingSectionDefaultSchema(SettingSection.ENV, {});
