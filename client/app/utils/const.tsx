/* eslint-disable unicorn/no-hex-escape, no-control-regex, unicorn/better-regex */
import { CurrencyFormatter, SUPPORT_FILE_SUFFIX_SET } from '@spotter/utils';

export const PAGE_SIZE_OPTIONS = ['10', '20', '50', '100'];

export const emptyValues = new Set<any>([null, undefined, '']);

export const PARSE_FROM_FORMAT = 'YYYY-MM-DD HH:mm:ss Z';

export const apiPrefixPathMap = {
    gmesh: 'gmesh-web',
    finance: 'spotter-finance-web',
    guard: 'spotter-guard-web',
    amazonVc: '/api/v1/amazon/vc/',
    operationLog: 'operation-log-web',
};

export const applicationBootData = window.__SPOTTER_APP_BOOT_DATA__;
export const LAST_SELECTED_VC_ACCOUNT = 'spotter@last_selected_vc_account';
export const UNIT = {
    LENGTH: 'inch',
    AMOUNT: '$',
    PERCENT: '%',
    WEIGHT: 'lb',
    DAY: 'day',
    ITEM: 'item',
    VOLUME: 'cbm',
    CUBIC_INCH: 'in³',
    VOLUME_CUIN: 'CuIn',
    UNSTACKED: 'unstacked',
    USD: 'USD',
};

export const formItemNumberFormatter = {
    formatter: (value?: string) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    parser: (value?: string) => value?.replace(/\$\s?|(,*)/g, ''),
};

export const SPOTTER_COMPANY_ID = '42';

export const SPOTTER_COMPANY_NAME = 'Spotter Global, Inc';

export const SPOTTER_ORDER_PDF =
    'https://sevc-1303367458.cos.ap-nanjing.myqcloud.com/pdf/spotter_order_template.pdf';

export const SPOTTER_SHIPMENT_BOX_MARK_PDF =
    'https://sevc-1303367458.cos.ap-nanjing.myqcloud.com/pdf/boxMark2.html';

export const SUPPORT_FILE_SUFFIX_STRING = [...SUPPORT_FILE_SUFFIX_SET]
    .map((suffix) => `.${suffix}`)
    .join(', ');

export const OPERATION_DEPARTMENT_CODE = 's_operations_org';

export const ROOT_PERMIT_ID = 0;
export const ALL_STATUS = '';

// TODO: 是否迁移到utils
export enum SPOTTER_ROLES_CODE {
    SPOTTER_SHIPMENT_MANAGER_CODE = 'SPT-SHIPMENT', // 物流经理
    BUSINESS_MANAGER_LEADER = 'business_manager_leader', // 运营经理
    BUSINESS_MANAGER = 'business_manager', // 运营专员
    ACCOUNT_MANAGER_LEADER = 'account_manager_leader', // 商务经理
    ACCOUNT_MANAGER = 'account_manager', // 账号经理
    ADMIN = 'admin', // 超级管理员
    FINANCIAL_MANAGER = 'financial_assistant', // 财务经理
    FINANCIAL_ASSISTANT = 'finance_assistant_sub', // 财务助理
    FINANCIAL_ACCOUNTING = 'finance_accounting', // 财务会计
    CASHIER = 'cashier', // 出纳
}

// 运营部门ID
export const OPERATION_ORG_ID = 3;

export const alphabetList = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
];

export const AMZ_CATALOG_NO_IMG_AVAILABLE =
    'https://m.media-amazon.com/images/I/01RmK+J4pJL._SS65_.gif';
export const MIME_TYPE = {
    pdf: 'application/pdf',
    json: 'application/json',
    xlsx: 'application/xlsx',
    jpg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};
export type SortOrder = 'descend' | 'ascend' | null;
export const DEFAULT_TABLE_SORT_DIRECTION = ['descend', 'ascend'] as SortOrder[];
export const currencyFormatter = new CurrencyFormatter();

export const SEVC_MENU_PREFIX = 'SEVC@';

export const UPPERCASE_OR_NUMBER_REGEXP = /^[\dA-Z]+$/;
/** 状态码 */
export enum SPT_STATUS_CODE {
    /**
     * 二期款预览单并发错误
     * @FYI https://d2vpiinh02.feishu.cn/wiki/wikcn2ItWNYMki6HGESceZd0LMd#doxcne8GcOcwQ0IymUB6SCOTJih
     */
    concurrent = 7_100_018,
    /** 合同不存在 */
    no_contract = 7_100_017,
}

export const TIMEZONE_CHINA = 'Asia/Shanghai';
export const CHINA_STANDARD_TIME = 'CST';
// export const BUCKET_NAME =
//     process.env.NODE_ENV === 'production' ? 'message-prod-1303367458' : 'message-test-1303367458';

export const BUCKET_NAME = applicationBootData!.app.messageBucketName;
export const PRIMARY_COLOR = '#2f54eb';
export const PAGE_SIZE = 20;

export const NEW_WAREHOUSE_CONFIG = 'newBBOOrder';
export const DEFAULT_TABLE_SPAN = {
    xs: 24,
    sm: 12,
    md: 8,
    lg: 8,
    xl: 8,
    xxl: 6,
};

export const DEFAULT_DESC_COLS = {
    xxl: 5,
    xl: 5,
    lg: 4,
    md: 4,
    sm: 2,
    xs: 1,
};
