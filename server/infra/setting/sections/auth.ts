import {
    DEFAULT_EMPTY_LIST,
    DEFAULT_COOKIE_SECRET,
    DEFAULT_SESSION_NAME,
    DEFAULT_SESSION_MAX_AGE,
    DEFAULT_COOKIE_MAX_AGE,
    DEFAULT_CHECK_EXPIRATION_INTERVAL,
    SettingSection,
    DEFAULT_MYSQL_SESSION_TABLE_NAME,
    DEFAULT_SESSION_CONNECTION_LIMIT,
    DEFAULT_EMPTY,
} from '@server/infra/setting/setting.constants';
import generateSettingSectionDefaultSchema from '@server/util/setting';
import Joi from 'joi';

export interface MysqlSessionSetting {
    sessionTable: string;
    connectionLimit: number;
}

export interface Oauth2Setting {
    larkUrl: string;
    dingUrl: string;
}

export interface AuthSectionSetting {
    oauth2: Oauth2Setting;
    mysql?: MysqlSessionSetting;
    loginCookieName: string;
    cookieMaxAge: number;
    cookieSignSecret: string;
    sessionMaxAge: number;
    sessionCheckExpirationInterval: number;
    allowedCorsOriginUrls: string[];
}

export const AuthSectionSettingSchema = generateSettingSectionDefaultSchema(
    SettingSection.AUTH,
    {
        mysql: {
            sessionTable: DEFAULT_MYSQL_SESSION_TABLE_NAME,
            connectionLimit: DEFAULT_SESSION_CONNECTION_LIMIT,
        },
        oauth2: {
            larkUrl: DEFAULT_EMPTY,
            dingUrl: DEFAULT_EMPTY,
        },
        loginCookieName: DEFAULT_SESSION_NAME,
        cookieMaxAge: DEFAULT_COOKIE_MAX_AGE,
        sessionMaxAge: DEFAULT_SESSION_MAX_AGE,
        sessionCheckExpirationInterval: DEFAULT_CHECK_EXPIRATION_INTERVAL,
        cookieSignSecret: DEFAULT_COOKIE_SECRET,
        allowedCorsOriginUrls: DEFAULT_EMPTY_LIST,
    },
    {
        allowedCorsOriginUrls: Joi.array().unique().items(Joi.string()),
    },
);
