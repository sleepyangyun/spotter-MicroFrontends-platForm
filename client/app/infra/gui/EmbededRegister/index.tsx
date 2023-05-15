import { useStore } from '@app/store';
import { NavigationRenderType } from './const';
import { SpotterRouteObject } from '@app/types/type';
import { useMemo } from 'react';
import { EmbeddedRenderer } from './renderer';

const SUPPORT_EMBEDDED_TYPE = new Set(['bi-embedded']);

export const useEmbeddedRoutes = (): SpotterRouteObject<any>[] => {
    const { menus } = useStore('global');
    const flatMenus = menus.data.reduce((p, c: any) => {
        try {
            p.push({
                ...c,
                // 如果解析失败，直接移除
                jsonData: JSON.parse(c.data),
            });
        } catch (error) {
            console.error(error);
        }
        if (c.children) {
            for (const item of c.children) {
                try {
                    p.push({
                        ...item,
                        // 如果解析失败，直接移除
                        jsonData: JSON.parse(item.data),
                    });
                } catch (error) {
                    console.error(error);
                }
                if (item.children) {
                    for (const i of item.children) {
                        try {
                            p.push({
                                ...i,
                                // 如果解析失败，直接移除
                                jsonData: JSON.parse(i.data),
                            });
                        } catch (error) {
                            console.error(error);
                        }
                    }
                }
            }
        }
        return p;
    }, [] as any[]);
    return useMemo(
        () =>
            flatMenus
                .filter((i) =>
                    SUPPORT_EMBEDDED_TYPE.has(i.jsonData.renderType as NavigationRenderType),
                )
                .map((i) => ({
                    key: i.jsonData.url,
                    path: i.jsonData.url,
                    name: i.jsonData.name,
                    element: (
                        <EmbeddedRenderer
                            key={i.jsonData.url}
                            data={i.jsonData ?? {}}
                            type={i.jsonData.renderType}
                        />
                    ),
                })),
        [flatMenus],
    );
};
