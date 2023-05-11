import { message } from 'antd';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';
import {
    CurrencyFormatter,
    DEFAULT_EMPTY_VALUE,
    downloadFileFromLocal,
    formatNumber,
    formatUnit,
    TIME_DAY_FORMAT,
    tzTime,
    tzTimeFormatter,
} from '@spotter/utils';
import MD5 from 'crypto-js/md5';
import * as ExcelJS from 'exceljs';
import { currencyFormatter, DEFAULT_TABLE_SORT_DIRECTION, emptyValues, UNIT } from './const';

export const goToLogout = () => {
    // window.location.replace(
    //     `${window.location.origin}${pathJoin(appSubUrl, logoutUrl)}?service=${encodeURIComponent(
    //         window.location.href,
    //     )}`,
    // );

    window.location.replace(`${window.location.origin}/login`);
};

export async function promiseQueue(promiseFnQueue: (() => Promise<any>)[]): Promise<any> {
    return promiseFnQueue.reduce(
        (p, c) =>
            p
                ? new Promise((resolve) => {
                      p.finally(() => {
                          c().finally(() => {
                              resolve('');
                          });
                      });
                  })
                : c(),
        null as null | Promise<any>,
    );
}

export interface RuleType {
    condition: (() => boolean) | boolean;
    message?: string;
    level?: 'warning' | 'error' | 'info';
    children?: RuleType[];
}

export function checkRules(
    rules: RuleType[],
    callback?: (message: string, level: RuleType['level']) => void,
): boolean {
    return !rules.some(({ condition, level = 'warning', message: msg, children = [] }) => {
        let result = typeof condition === 'function' ? condition() : condition;
        if (result) {
            msg && callback ? callback(msg, level) : message[level](msg);
            children?.length && (result = !checkRules(children, callback));
        }
        return result;
    });
}
// 将字符串转ArrayBuffer
export function s2ab(s: string) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
        view[i] = s.codePointAt(i) as number & 0xff;
    }
    return buf;
}

export function workbook2blob(workbook: XLSX.WorkBook) {
    // 生成excel的配置项
    const wopts: XLSX.WritingOptions = {
        // 要生成的文件类型
        bookType: 'xlsx',
        // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        bookSST: false,
        // 二进制类型
        type: 'binary',
    };
    const wbout = XLSX.write(workbook, wopts);
    return new Blob([s2ab(wbout)], {
        type: 'application/octet-stream',
    });
}

export function generateExcelFile(
    sheetData: Record<string, any>[],
    fileName: string,
    sheetName: string,
    columnsWidth?: number[],
    unityWidth = 20,
) {
    const wb = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(sheetData);
    const columns = Object.keys(sheetData[0]).length;
    sheet['!cols'] = [];
    if (columnsWidth?.length) {
        for (let i = 0; i < columns; i++) {
            sheet['!cols'][i] = { wch: columnsWidth[i] || unityWidth };
        }
    } else {
        for (let i = 0; i < columns; i++) {
            sheet['!cols'][i] = { wch: unityWidth };
        }
    }
    XLSX.utils.book_append_sheet(wb, sheet, `${sheetName}`);
    downloadFileFromLocal(workbook2blob(wb), `${fileName}.xlsx`, 'application/xlsx');
}

export const formatCurrency = new CurrencyFormatter().format;

export function withUnit(t: string, u: string) {
    return `${t} / ${u}`;
}

// 暂时应该没有地方在用这个
export const toTimeStringRange =
    (fields: [string, string?], format = TIME_DAY_FORMAT) =>
    (timeRange?: [Parameters<typeof dayjs>[0], Parameters<typeof dayjs>[0]]) => {
        if (!timeRange) return {};
        const startTime = dayjs(timeRange[0]).format(format);
        const endTime = dayjs(timeRange[1]).format(format);
        if (fields.length > 1) {
            return {
                [fields[0]]: startTime,
                [fields[1] as string]: endTime,
            };
        }
        return { [fields[0]]: [startTime, endTime] };
    };

export const sortQueryFormatter = (sort: Record<string, any>) => {
    const [column] = Object.keys(sort);
    return { column, sortType: sort[column] };
};

export const getAmzProductLinkByAsin = (asin: string) => `https://www.amazon.com/dp/${asin}`;

export function amountSymbolFormat(
    amount?: number,
    options?: Parameters<typeof currencyFormatter.format>[1],
) {
    return currencyFormatter.format(amount, {
        code: '$',
        pattern: 'C D',
        ...options,
    });
}

export const tableSorter =
    (key?: string, init = 0 as any) =>
    (a: Record<string, any>, b: Record<string, any>) =>
        key ? (a?.[key] ?? init) - (b?.[key] ?? init) : 0;

export const tableSortOptions = (
    options?:
        | string
        | {
              ascendFirst?: boolean;
              sorter: Parameters<typeof tableSorter>;
          },
) =>
    typeof options !== 'object'
        ? {
              sortDirections: DEFAULT_TABLE_SORT_DIRECTION,
              sorter: tableSorter(options),
          }
        : {
              sortDirections: options.ascendFirst
                  ? DEFAULT_TABLE_SORT_DIRECTION.reverse()
                  : DEFAULT_TABLE_SORT_DIRECTION,
              sorter: tableSorter(...options.sorter),
          };

export const toTimeStamp = (
    ms: Parameters<typeof dayjs>[0],
    type: 'startOf' | 'endOf' = 'endOf',
    asLATime = true,
) => (ms ? dayjs(ms).tz('America/Los_Angeles', asLATime)[type]('day').valueOf() : undefined);

export const toTimeStampRange =
    (fields: [string, string?], asLATime = true) =>
    (timeRange: [Parameters<typeof dayjs>[0], Parameters<typeof dayjs>[0]]) => {
        if (!timeRange) return {};
        const startTime = toTimeStamp(timeRange[0], 'startOf', asLATime);
        const endTime = toTimeStamp(timeRange[1], 'endOf', asLATime);
        if (fields.length > 1) {
            return {
                [fields[0]]: startTime,
                [fields[1] as string]: endTime,
            };
        }
        return { [fields[0]]: [startTime, endTime] };
    };

export const getPermitsHash = (permits: string) => MD5(permits).toString().toUpperCase();

export const formatTime = (val: any) =>
    val ? tzTimeFormatter(val, TIME_DAY_FORMAT) : DEFAULT_EMPTY_VALUE;

export const formatPlainText = (val: any) => (emptyValues.has(val) ? DEFAULT_EMPTY_VALUE : val);

export const formatVolume = (volume: number, decimal = 6, unit = UNIT.VOLUME) =>
    formatUnit(volume, { pattern: 'D U', unit, decimal });

export const formatWeight = (weight: number, decimal = 2) =>
    formatUnit(weight, { pattern: 'D U', unit: UNIT.WEIGHT, decimal });

export const formatLength = (weight: number, decimal = 2) =>
    formatUnit(weight, { pattern: 'D U', unit: UNIT.LENGTH, decimal });

export const formatPercent = (value: number, decimal = 2) =>
    formatUnit(value, { pattern: 'DU', unit: UNIT.PERCENT, decimal });

/**
 * 验证十进制数字
 */
export function isNumber(value: any) {
    return /^[+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value);
}

/**
 * 验证正整数
 * @param val 要验证的字符串
 * @param zero 是否带0
 * @returns
 */
export function isPositiveInt(val: string | number, zero = false) {
    if (typeof val === 'number') {
        val = `${val}`;
    }
    return zero ? /^\+{0,1}(\d+)$/.test(val) : /^[1-9]\d*$/.test(val);
}

export const copyText = (text: string) =>
    new Promise((resolve, reject) => {
        if (typeof (window as any).copy === 'function') {
            (window as any).copy(text);
            resolve(text);
        }

        if (typeof document.execCommand === 'function') {
            const dom = document.createElement('textarea');
            dom.value = text;
            dom.setAttribute('style', 'display: block;width:1px;height:1px;');
            document.body.append(dom);
            dom.select();
            const result = document.execCommand('copy');
            dom.remove();
            if (result) {
                resolve(result);
            } else if (typeof document.createRange === 'function') {
                const range = document.createRange();
                const div = document.createElement('div');
                div.innerHTML = text;
                div.setAttribute('style', 'height: 1px; fontSize: 1px; overflow: hidden;');
                document.body.append(div);
                range.selectNode(div);
                const selection = window.getSelection();
                if (selection?.rangeCount && selection?.rangeCount > 0) {
                    selection.removeAllRanges();
                }
                selection?.addRange(range);
                const copiedText = document.execCommand('copy');
                if (copiedText) {
                    resolve(copiedText);
                }
            }
        }

        reject();
    });

// 列表重建为树结构
export const arrayToTree = <T, K extends { id: number; parentId: number; children?: T[] } & T>(
    items: K[],
) => {
    const res: K[] = []; // 存放
    const map: Record<string | number, any> = {};

    // 转Map存储
    for (const item of items) {
        map[item.id] = { ...item, children: [] };
    }

    for (const item of items) {
        const newItem = map[item.id];
        if (!newItem.parentId) {
            res.push(newItem);
        } else if (Object.prototype.hasOwnProperty.call(map, item.parentId)) {
            map[item.parentId].children.push(newItem);
        }
    }
    return res;
};

/**
 * @function 延迟函数
 * @param timeout {number} 延迟间隔
 * @returns
 */
export function _delay(timeout = 1000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, timeout);
    });
}

/**
 * 递归函数
 * @param promise
 * @param resolve
 * @param reject
 * @param count
 * @param totalCount
 */
export function _recursion(
    promise: (...args: any) => Promise<any>,
    resolve: (value: unknown) => void,
    reject: (value: unknown) => void,
    count: number,
    totalCount: number,
    ...args: any
) {
    // eslint-disable-next-line promise/catch-or-return
    _delay().then(() => {
        promise(...args)
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                if (count >= totalCount) {
                    reject(error);
                    return;
                }
                _recursion(promise, resolve, reject, count + 1, totalCount, ...args);
            });
    });
}

/**
 * 请求重试函数
 * @param promise
 * @param totalCount
 * @returns
 */
export function requestTry(
    promise: (...args: any) => Promise<any>,
    totalCount: number,
    ...args: any
) {
    return new Promise((resolve, reject) => {
        const count = 1;
        promise(...args)
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                if (count >= totalCount) {
                    reject(error);
                    return;
                }
                _recursion(promise, resolve, reject, count + 1, totalCount, ...args);
            });
    });
}

export function getFileSuffix(filename: string) {
    const [suffix] = filename.split('.')?.reverse() ?? [];
    return suffix;
}

export function cssVariableKey(s: string) {
    return `var(--${s})`;
}

export function cssVariableValue(s: string, el?: HTMLElement) {
    return getComputedStyle(el ?? document.body).getPropertyValue(`--${s}`);
}
// 格式化正整数
export const formatPositiveInteger = (val?: number | string) =>
    val ? `${val}`.replace(/^(\d+)\..*$/, '$1') : '';

export const limitDecimals = (value?: string | number): string => {
    const reg = /^(-)*(\d+)\.(\d\d).*$/;
    if (typeof value === 'string') {
        return !Number.isNaN(Number(value)) ? value.replace(reg, '$1$2.$3') : '';
    }
    if (typeof value === 'number') {
        return !Number.isNaN(value) ? String(value).replace(reg, '$1$2.$3') : '';
    }
    return '';
};

// 判空
export const isEmpty = (val: string | number | undefined | null): boolean => emptyValues.has(val);

// 页面滚动
export const pageScrollTo = (x = 0, y = 0) => {
    const body = document.querySelector('.spotter-page-container');
    body?.scrollTo(x, y);
};

// 检查导出时间
export const checkExportTime: (
    timeRange: [any, any],
    opt?:
        | {
              message?: {
                  max?: string;
                  empty?: string;
              };
              max?: number;
          }
        | string,
) => boolean = (timeRange, opt = {}) => {
    let max = 30;
    let msg = `最多导出31天的数据，请修改查询条件`;
    let emptyMessage = '时间范围不可为空';
    if (typeof opt === 'string') {
        msg = opt;
    } else {
        msg = opt.message?.max ?? msg;
        emptyMessage = opt.message?.empty ?? emptyMessage;
        max = opt.max ?? max;
    }
    return checkRules([
        {
            condition: () => !timeRange?.[0] || !timeRange?.[1],
            message: emptyMessage,
        },
        {
            condition: () =>
                !tzTime(timeRange?.[1])
                    .endOf('D')
                    .subtract(max, 'day')
                    .isBefore(tzTime(timeRange?.[0]).startOf('D')),
            message: msg,
        },
    ]);
};

/**
 * 数字缩写
 */
export const numberAbbreviate = <
    {
        K: number;
        M: number;
        B: number;
        T: number;
        units: ['T', 'B', 'M', 'K'];
        (size: number, decimal?: number): string;
    }
>function (number: number, decimal = 2): string {
    !numberAbbreviate.K && (numberAbbreviate.K = 10 ** 3);
    !numberAbbreviate.M && (numberAbbreviate.M = 10 ** 6);
    !numberAbbreviate.B && (numberAbbreviate.B = 10 ** 9);
    !numberAbbreviate.T && (numberAbbreviate.T = 10 ** 12);
    !numberAbbreviate.units && (numberAbbreviate.units = ['T', 'B', 'M', 'K']);

    for (const unit of numberAbbreviate.units) {
        if (number >= numberAbbreviate[unit]) {
            return `${formatNumber(number / numberAbbreviate[unit], decimal)} ${unit}`;
        }
    }
    return formatNumber(number, decimal);
};

export class DebounceTaskQueue {
    private defaultTimeout: number;
    private debounceTimer: number | null = null;

    constructor(defaultDebounceTimeout: number) {
        this.defaultTimeout = defaultDebounceTimeout;
    }

    add(task: (...args: any[]) => any, wait?: number) {
        // 如果在 debounce 中
        this.debounceTimer && clearTimeout(this.debounceTimer);

        this.debounceTimer = setTimeout(() => {
            task();
            clearTimeout(this.debounceTimer!);
        }, wait ?? this.defaultTimeout) as any;
    }
}

export function diffArray<T>(a: T[], b: T[]): { added: T[]; removed: T[] } {
    const aSet = new Set(a);
    const bSet = new Set(b);
    const added = [];
    const removed = [];

    for (const value of aSet) {
        if (!bSet.has(value)) {
            removed.push(value);
        }
    }

    for (const value of bSet) {
        if (!aSet.has(value)) {
            added.push(value);
        }
    }

    return { added, removed };
}

// 默认导出后缀
export const DEFAULT_EXPORT_DAY_SUFFIX = 'YYYYMMDD';

/**
 *
 * @param headerList
 * @param dataList
 * @returns
 */

export const DownLoadExcelFromLocal = async <T>(
    hearList: Partial<ExcelJS.Column>[],
    dataList: T[],
    fileName?: string,
) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet(fileName ?? 'List');
    sheet.columns = hearList;
    sheet.addRows(dataList);
    const buffer = await workbook.xlsx.writeBuffer();
    await downloadFileFromLocal(
        new Blob([buffer]),
        `${fileName ?? 'List'}.xlsx`,
        'application/xlsx',
    );
};
