import {
    DEFAULT_DOMAIN,
    DEFAULT_EMPTY, 
    DEFAULT_MYSQL_DATABASE_NAME, 
    DEFAULT_MYSQL_PORT, 
    DEFAULT_MYSQL_USERNAME,
    SettingSection,
    Switch,
} from '@server/infra/setting/setting.constants';
import generateSettingSectionDefaultSchema from '@server/util/setting';

export interface DatabaseSectionSetting {
    enable: boolean
    mysql: MySQLDBSetting;
}

export interface MySQLDBSetting {
    database: string
    host: string
    port: number
    username: string
    password: string
    synchronize: boolean
}

export const DatabaseSectionSettingSchema = generateSettingSectionDefaultSchema(
    SettingSection.DATABASE,
    {
        enable: Switch.ON,
        mysql: {
            database: DEFAULT_MYSQL_DATABASE_NAME,
            host: DEFAULT_DOMAIN,
            port: DEFAULT_MYSQL_PORT,
            username: DEFAULT_MYSQL_USERNAME,
            password: DEFAULT_EMPTY,
            synchronize: Switch.OFF
        }
    },
);
