import { flow, getType, IMSTMap, ISimpleType } from 'mobx-state-tree';
import { WITH_PAGINATION_UPDATE_FN_MODEL_NAME } from '@app/store/infra/WithPaginationUpdateFnModel';
import { WITH_ARRAY_UPDATE_FN_MODEL_NAME } from '@app/store/infra/WithArrayUpdateFnModel';
import { WITH_PRIMARY_UPDATE_FN_MODEL_NAME } from '@app/store/infra/WithPrimaryUpdateFnModel';

export function autoContextFlow<
    R,
    Args extends any[],
    S extends { loadWatcher: IMSTMap<ISimpleType<boolean>> } = any,
>(self: S, loadWatcherKey: string, fn: (...args: Args) => Promise<R>, autoUpdated: boolean) {
    return flow<R, Args>(function* (...args: Args) {
        let response: any;
        try {
            console.log(loadWatcherKey, true);
            self.loadWatcher.set(loadWatcherKey, true);
            response = yield fn(...args);

            if (autoUpdated && (self as any)[loadWatcherKey]) {
                switch (getType((self as any)[loadWatcherKey]).name) {
                    case WITH_PAGINATION_UPDATE_FN_MODEL_NAME: {
                        (self as any)[loadWatcherKey].updateData(response.data.data);
                        (self as any)[loadWatcherKey].updatePagination(response.data);
                        break;
                    }
                    case WITH_ARRAY_UPDATE_FN_MODEL_NAME: {
                        (self as any)[loadWatcherKey].updateData(response.data);
                        break;
                    }
                    case WITH_PRIMARY_UPDATE_FN_MODEL_NAME: {
                        (self as any)[loadWatcherKey].updateData(response.data);
                        break;
                    }
                    default: {
                    }
                }
                // (self as any)[loadWatcherKey].updateData(response.dat)
            }
        } catch (error) {
            console.error(error);
            !response && (response = Promise.reject(error));
        } finally {
            console.log(loadWatcherKey, false);
            self.loadWatcher.set(loadWatcherKey, false);
            return response;
        }
    });
}

export function generateAutoContextFlowWithSelf<
    S extends { loadWatcher: IMSTMap<ISimpleType<boolean>> } = any,
>(self: S, autoUpdated = false) {
    return <R, Args extends any[]>(loadWatcherKey: string, fn: (...args: Args) => Promise<R>) =>
        autoContextFlow(self, loadWatcherKey, fn, autoUpdated);
}

export function deepTrim(obj: any, newsObj?: any) {
    if (!obj) return obj;
    if (typeof obj === 'string') return obj.trim();
    if (typeof obj === 'object') {
        const newObj = newsObj || (obj.constructor === Array ? [] : {});
        for (const key in obj) {
            if (typeof obj[key] === 'object') {
                newObj[key] = deepTrim(obj[key], newObj[key]);
            } else {
                newObj[key] = typeof obj[key] === 'string' ? obj[key].trim() : obj[key];
            }
        }
        return newObj;
    }
    return obj;
}
