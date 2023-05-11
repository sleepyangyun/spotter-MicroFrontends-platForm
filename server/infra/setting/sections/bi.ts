import generateSettingSectionDefaultSchema from '@server/util/setting';
import { SettingSection } from '../setting.constants';

export interface BiSectionSetting {
    biUrl: string;
}

export const BiSectionSettingSchema = generateSettingSectionDefaultSchema(SettingSection.BI, {
    biUrl: '',
});
