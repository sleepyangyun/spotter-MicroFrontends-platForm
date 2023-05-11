import {isObject} from 'lodash';
import crypto from 'node:crypto';
import {ResponseResult} from '@server/infra/http-client/http-client.interface';
import {HttpResponseStatus, HttpResponseStatusMessage,} from '@server/infra/http-client/http-client.constant';
import {URL} from 'node:url';
import path from 'node:path';

const IMMUTABLE_FLAG = Symbol('immutable');
type ImmutableFlagType = { [IMMUTABLE_FLAG]?: boolean };
type PrimitiveValue = number | string | boolean | undefined;
type PrimitiveObject<T = any> = Record<string | symbol | number, T>;
export type ImmutableType<T extends PrimitiveObject> = {
    readonly [P in keyof T]:
    | (T[P] extends ImmutableFlagType ? T[P] : ImmutableType<T[P]> | PrimitiveObject)
    | PrimitiveValue;
} &
    ImmutableFlagType;

export function immutable<T extends PrimitiveObject, K extends keyof T>(obj: T): ImmutableType<T> {
    return new Proxy(obj, {
        get: function getImmutableObj(target: T, p: keyof T): ImmutableType<T[K]> | PrimitiveValue {
            if (p in target) {
                if (isObject(target[p]) && !target[p][IMMUTABLE_FLAG]) {
                    target[p][IMMUTABLE_FLAG] = true;
                    return (target[p] = immutable(target[p]) as T[K]);
                }
                return target[p];
            }
            return undefined;
        },
        set: function setImmutableObj(target: T, p: string | symbol): boolean {
            throw new Error(
                `Can not set the property: "${String(p)}" of ${JSON.stringify(
                    target,
                )}, this object is immutable.`,
            );
        },
        deleteProperty(target: T, p: string | symbol): boolean {
            throw new Error(
                `Can not delete the property: "${String(p)}" of ${JSON.stringify(
                    target,
                )}, this object is immutable.`,
            );
        },
        setPrototypeOf(target: T, v: Record<string, unknown> | null): boolean {
            throw new Error(`Can not override the prototype of a immutable object. 
            target: ${JSON.stringify(target)}
            
            newPrototype: ${JSON.stringify(v)}
            `);
        },
        isExtensible(): boolean {
            return false;
        },
    });
}

export function ResponseResult<T = any>({
                                            data,
                                            code = HttpResponseStatus.Ok,
                                            message = HttpResponseStatusMessage[code],
                                        }: {
    data: T;
    code?: HttpResponseStatus;
    message?: string;
}): ResponseResult<T> {
    return {
        code,
        data,
        message,
    };
}

export function getJoinedUrl(baseUrl: string, joinedPath: string): URL {
    const url = new URL(baseUrl);
    url.pathname = path.join(url.pathname, joinedPath);
    return url;
}
const algorithm = 'aes-128-cbc';

export function encrypt(data: string): Promise<string> {
    const password = crypto.randomBytes(16).toString('hex');
    const salt = crypto.randomBytes(16).toString('hex');
    const iv = crypto.randomBytes(8).toString('hex');

    return new Promise((resolve, reject) => {
        crypto.scrypt(password, salt, 16, (err, derivedKey) => {
            if (err) {
                reject(err);
            } else {
                const cipher = crypto.createCipheriv(algorithm, derivedKey, iv);
                const cipherText = cipher.update(data, 'utf8', 'hex');
                resolve(`${cipherText}${cipher.final('hex')}${password}${salt}${iv}`);
            }
        });
    });
}

export function decrypt(cipherText: string): Promise<string> {
    const iv = cipherText.slice(-16); // 获取初始化向量
    const salt = cipherText.slice(-48, -16); // 获取盐值
    const password = cipherText.slice(-80, -48); // 获取密钥密码
    const data = cipherText.slice(0, -80); // 获取密文

    return new Promise((resolve, reject) => {
        crypto.scrypt(password, salt, 16, (err, derivedKey) => {
            if (err) {
                reject(err);
            } else {
                const decipher = crypto.createDecipheriv(algorithm, derivedKey, iv);

                const text = decipher.update(data, 'hex', 'utf8');
                resolve(`${text}${decipher.final('utf-8')}`);
            }
        });
    });
}



export function insertSort<T extends { creationTime: string }>(a: T[], b: T[]) {
    const result: T[] = [];
    let i = 0;
    let j = 0;
    while (i < a.length && j < b.length) {
        if (new Date(a[i].creationTime).getTime() > new Date(b[j].creationTime).getTime()) {
            result.push(a[i]);
            i++;
        } else {
            result.push(b[j]);
            j++;
        }
    }

    if (a.length === b.length) return result;

    if (a.length < b.length) return result.concat(b.slice(j));

    return result.concat(a.slice(i));
}

