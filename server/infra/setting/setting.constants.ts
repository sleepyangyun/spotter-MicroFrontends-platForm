/** ************************************** Common Setting Constants *************************************** */
export const DEFAULT_CONF_FILE_EXTENSION_NAME = 'toml';
export const DEFAULT_CONF_FILE_NAME = 'default';
export const DEFAULT_EMPTY = '';
export const DEFAULT_CONF_LOAD_DIRECTORY = 'conf';
export const DEFAULT_EMPTY_LIST: any[] = [];
export const DEFAULT_EMPTY_MAP: any = {};

export enum Scheme {
    HTTP = 'http',
    HTTPS = 'https',
    HTTP2 = 'h2',
}

export const Switch = {
    ON: true,
    OFF: false,
};

export enum SettingSection {
    SERVER = 'server',
    DATABASE = 'database',
    LOG = 'log',
    AUTH = 'auth',
    PROXY = 'proxy',
    OPEN_API = 'openApi',
    SERVICE = 'service',
    NACOS = 'nacos',
    ENV = 'env',
    CLIENT_MONITOR = 'clientMonitor',
    BI = 'bi',
    BUCKET = 'bucket',
}

/** ************************************** Server Sections Constants *************************************** */
export const DEFAULT_DOMAIN = 'localhost';
export const DEFAULT_STATIC_ROOT_PATH = 'dist/public';
export const DEFAULT_PORT = 3000;
export const DEFAULT_DEV_PORT = 3001;
export const DEFAULT_APP_NAME = 'Zeus';
export const DEFAULT_DEV_HRM_PATH = '/__webpack_hmr';

export enum AppEnvironment {
    DEVELOPMENT = 'development',
    TEST = 'test',
    PRODUCTION = 'production',
}

/** ************************************** Database Sections Constants *************************************** */
export const DEFAULT_MYSQL_PORT = 3306;
export const DEFAULT_MYSQL_USERNAME = 'root';
export const DEFAULT_MYSQL_DATABASE_NAME = 'root';

/** ************************************** Database Sections Constants *************************************** */
export const DEFAULT_NACOS_SEVER_ADDR = '127.0.0.1:8848';
export const DEFAULT_NACOS_I18N_TRANSLATION_GROUP_NAME = 'I18N_TRANSLATION_GROUP';
export const DEFAULT_NACOS_VC_SESSION_GROUP = 'VC_SESSION_GROUP';
export const DEFAULT_NACOS_VC_ACCOUNT_POOL_DATA_ID = 'vc_account_pool';

/** ************************************** Log Sections Constants *************************************** */
export const DEFAULT_LOG_STORE_PATH = 'log';
export const DEFAULT_LOG_DESC_FILE_NAME = 'desc.log';
export const DEFAULT_LOG_MAX_SIZE_SHIFT = 28;
export const DEFAULT_LOG_MAX_DAYS = 7;

export enum LogLevel {
    DEBUG = 'debug',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
    FATAL = 'fatal',
}

export enum LogAppenderType {
    STDOUT = 'stdout',
    CONSOLE = 'console',
    FILE = 'file',
    DATE_FILE = 'dateFile',
}

export enum LogTransport {
    CONSOLE = 'console',
    DESC = 'desc',
}

/** ************************************** Auth Sections Constants *************************************** */
export const DEFAULT_MYSQL_SESSION_TABLE_NAME = 'sessions';
export const DEFAULT_SESSION_NAME = 'ROMERX_SESSION';
export const DEFAULT_COOKIE_MAX_AGE = 7_200_000;
export const DEFAULT_SESSION_MAX_AGE = 86_400_000;
export const DEFAULT_CHECK_EXPIRATION_INTERVAL = 900_000;
export const DEFAULT_COOKIE_SECRET = 'romerx';
export const DEFAULT_SESSION_CONNECTION_LIMIT = 10;

/** ************************************** Proxy Sections Constants *************************************** */
/** ************************************** Open API Sections Constants *************************************** */
export const DEFAULT_OPEN_API_DOC_TITLE = 'Application API Docs';
export const DEFAULT_OPEN_API_PATH = '/open-api';

/** ************************************** Service Sections Constants *************************************** */
export enum ServiceRegistry {
    AMAZON = 'amazon',
}

/** ************************************** Client Monitor Sections Constants *************************************** */
export const DEFAULT_CLIENT_MONITOR_SDK_CDN_URL =
    'https://cdn-go.cn/aegis/aegis-sdk/latest/aegis.min.js';

/** ************************************** BI Sections Constants *************************************** */
