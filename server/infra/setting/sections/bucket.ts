import generateSettingSectionDefaultSchema from '@server/util/setting';
import { SettingSection } from '../setting.constants';

export interface BucketSectionSetting {
    messageBucketName: string;
    imageBucketName: string;
    businessImageBucketName: string;
    performanceBucketName: string;
}

export const BucketSectionSettingSchema = generateSettingSectionDefaultSchema(
    SettingSection.BUCKET,
    {
        messageBucketName: '',
        imageBucketName: '',
        businessImageBucketName: '',
        performanceBucketName: '',
    },
);
