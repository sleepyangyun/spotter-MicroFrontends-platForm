import {
    Context,
    Dispatch,
    MutableRefObject,
    SetStateAction,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { checkRules, DebounceTaskQueue, getPermitsHash, RuleType } from '@app/utils/common';
import { localCache } from '@spotter/utils';
import { message } from 'antd';
import { matchRoutes, useLocation } from 'react-router-dom';
import { SpotterRouteObject } from '@app/types/type';
// eslint-disable-next-line import/no-cycle
import { metaRoutes } from '@app/infra/gui/Layout/components/SpotterHeader';
import { ValidateStorageName } from '../types/enum';
import { useStore } from '../store';

export function useStack<T>(initStack: T[]) {
    const [stack, setStack] = useState<T[]>(initStack);
    const push = (item: T | T[]) => {
        setStack([...stack, ...(Array.isArray(item) ? item : [item])]);
    };
    const pop = (len: number) => {
        setStack(stack.slice(stack.length - len - 1));
    };

    return { stack, push, pop };
}

export function useDomSelector(selector: string): MutableRefObject<HTMLElement | undefined> {
    const domElement = useRef<HTMLElement>();
    useEffect(() => {
        !domElement.current &&
            (domElement.current = document.querySelector(selector) as HTMLElement);
    }, [selector]);
    return domElement;
}

type ContextReturnType<T> = T extends Context<infer U> ? U : never;

export function useSafeContext<T extends Context<any>>(c: T): NonNullable<ContextReturnType<T>> {
    const context = useContext(c);
    if (!context) {
        throw new Error(
            'Component used a uninitialized DocDirectoryTreeContext, please provide a context value.',
        );
    }
    return context;
}

export function useToggledValue(init: boolean): [boolean, () => void] {
    const [value, setValue] = useState(init);

    function toggle() {
        setValue((origin) => !origin);
    }

    return [value, toggle];
}

export function useDependency(): [boolean, () => void] {
    const [dependency, updateDependency] = useState(false);
    const update = () => {
        updateDependency((origin) => !origin);
    };
    return [dependency, update];
}

export function useSwitch(): [boolean, () => void, () => void] {
    const [visible, setVisible] = useState(false);
    const open = () => setVisible(true);
    const close = () => setVisible(false);
    return [visible, open, close];
}

export function useRules(rules: RuleType[], deps: any[]) {
    const memo = useMemo(() => rules, deps);
    return {
        check: (callback?: Parameters<typeof checkRules>[1]) => checkRules(memo, callback),
    };
}

export function useValidate() {
    const { getValidateHash, getPermits, getMenus, getRoles, permits, menus, roles } =
        useStore('global');
    const { menuLoading } = useStore('app');

    const validates = [
        {
            pull: getPermits,
            tagName: ValidateStorageName.PERMIT_TAG_REMOTE,
            dataName: ValidateStorageName.PERMIT_DATA,
            localTagName: ValidateStorageName.PERMIT_TAG_LOCAL,
            data: permits,
        },
        {
            pull: getMenus,
            tagName: ValidateStorageName.MENU_TAG_REMOTE,
            dataName: ValidateStorageName.MENU_DATA,
            localTagName: ValidateStorageName.MENU_TAG_LOCAL,
            data: menus,
        },
        {
            pull: getRoles,
            tagName: ValidateStorageName.ROLE_TAG_REMOTE,
            dataName: ValidateStorageName.ROLE_DATA,
            localTagName: ValidateStorageName.ROLE_TAG_LOCAL,
            data: roles,
        },
    ];

    const get = async () => {
        menuLoading.updateData(true);
        const res = await getValidateHash();
        if (res.data) {
            const requestList = validates.filter((validItem) => {
                const remoteTag = (res.data as Record<string, any>)[validItem.tagName];
                const localRemoteEtag = localCache.get(validItem.tagName); // 本地缓存的远程ETag
                const localHash = localCache.get(validItem.localTagName); // 本地缓存数据hash
                const localData = localCache.get(validItem.dataName);
                if (
                    localRemoteEtag !== remoteTag ||
                    !localData ||
                    typeof localData === 'string' ||
                    localHash !== getPermitsHash(JSON.stringify(localData))
                ) {
                    return true;
                }
                // 没有变化且本地数据存在，从localCache中加载到内存
                validItem.data.updateData(localData);
                return false;
            });
            if (requestList.length > 0) {
                try {
                    const response = await Promise.all(requestList.map((item) => item.pull()));
                    for (const [index, resData] of response.entries()) {
                        const validItem = requestList[index];
                        const remoteTag = (res.data as Record<string, any>)[validItem.tagName];
                        // 数据有变化或者本地data被人手动清理了，重新请求数据
                        if (Array.isArray(resData.data) && resData.data.length >= 0) {
                            // 请求成功更新本地的数据
                            localCache.set(validItem.tagName, remoteTag);
                            localCache.set(validItem.dataName, resData.data);
                            localCache.set(
                                validItem.localTagName,
                                getPermitsHash(JSON.stringify(resData.data)),
                            );
                        }
                    }
                } catch (error) {
                    console.error(error);
                    message.error('用户信息初始化失败，请刷新重试');
                } finally {
                    menuLoading.updateData(false);
                }
            } else {
                menuLoading.updateData(false);
            }
        }
        return res;
    };

    const clear = () => {
        for (const item of validates) {
            localCache.remove(item.tagName);
            localCache.remove(item.dataName);
            localCache.remove(item.localTagName);
            item.data.updateData([]);
        }
    };

    return {
        get,
        clear,
    };
}

// 文件下载链接签名
// export const useFileDownloadSigner = (params: { bucketName: string }) => {
//     const { bucketName } = params;
//     const { getFileDownloadSigner } = useStore('file');
//     const signUrl = async (fileUrl: string) => {
//         const { data } = await getFileDownloadSigner({
//             bucketName,
//             fileKey: fileUrl,
//         });
//         return data;
//     };
//     return { signUrl };
// };

/**
 *
 * @param key 在独立的路由下不重复即可，生成时会使用 routeKey
 * @param defaultValue 等同于 useState(defaultValue)
 * @TODO 数据结构存在问题时的兜底方案
 */
export const useStateWithLocalCache = <
    S extends string | number | boolean | any[] | Record<string, any>,
>(
    key: string,
    defaultValue: SetStateAction<S>,
): [S, Dispatch<SetStateAction<S>>] => {
    const location = useLocation();
    const routeKey = (
        matchRoutes(metaRoutes, { pathname: location.pathname })?.[0]?.route as
            | SpotterRouteObject<any>
            | undefined
    )?.key;
    const _k = routeKey ? `${routeKey}_${key}` : null;
    const [state, setState] = useState<S>((_k && localCache.get(_k)) || defaultValue);

    useEffect(() => {
        if (_k) {
            localCache.set(_k, state);
        }
    }, [state]);
    return [state, setState];
};

export const useDebounceEffect = (fn: (...args: any[]) => void, deps: any[], wait = 100) => {
    const debounceTaskQueue = useRef<DebounceTaskQueue>(new DebounceTaskQueue(wait));

    useEffect(() => {
        debounceTaskQueue.current.add(fn);
    }, deps);
};

// export const useRolePermission = (targetRoleCodeList: SPOTTER_ROLES_CODE[]) => {
//     const { roles } = useStore('global');
//     return roles?.data
//         ?.map((v) => v.code)
//         .some((userRoleCode) => targetRoleCodeList.includes(userRoleCode as any));
// };

export const useOwnerPermission = (userId?: any) => {
    const { user } = useStore('global');
    return user.data?.id === userId;
};
