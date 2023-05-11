import { Lang } from '@server/util/consts';

export interface TranslationCache {
    translation: Record<string, any>;
    etag: string;
}

export class I18nCache {
    private cacheMap = new Map<Lang, TranslationCache>();

    cacheTranslation(langKey: Lang, value: TranslationCache) {
        return this.cacheMap.set(langKey, value);
    }

    getCacheMap(langKey: Lang) {
        return this.cacheMap.get(langKey);
    }

    getValidTranslation(langKey: Lang, etag?: string) {
        const cache = this.cacheMap.get(langKey);
        return etag && cache?.etag === etag ? cache : null;
    }
}
