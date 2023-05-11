import { FC, useCallback, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { SptIcon } from '@app/components/SptIcon';
import classNames from 'classnames';
import { SubMenuPortal } from '@app/infra/gui/Layout/components/SpotterMenu/SubMenuPortal';
import { navigationMenuEventBus } from '@app/infra/gui/Layout/components/SpotterMenu/navigationMenuEventBus';
import { SpotterLink, SpotterNavigationRouteType } from '@app/components/SpotterLink';
import { WithEmptyAndLoading } from '@app/components/WithEmptyAndLoading';
import { Skeleton } from 'antd';

export interface SpotterMenuNavigationItem {
    // 菜单项的唯一键
    key: string;
    // 导航名称
    name: string;
    // 菜单项跳转的 url
    url: string;
    // 菜单的跳转类型
    type?: SpotterNavigationRouteType;
}

export interface SpotterMenuNavigationDomain {
    // 菜单项的唯一键
    key: string;
    // 领域导航名称
    name: string;
    // 领域导航默认展示的 icon
    icon: string;
    /**
     * 菜单展示的位置
     * default - 默认，左侧菜单
     * header - 顶部，头部靠右的下拉菜单
     */
    position?: string;
    /**
     * 领域导航的路径前缀，当 location.path.startsWith(activePrefixPath) 为 true 时的任意路径都会让领域导航处于激活状态，
     * 为空时表示该领域导航永远不会处于 active 状态，该情况一般和 type = 'new' 同时使用，表示外链。
     */
    activePrefixPath?: string;
    /**
     * 点击菜单时，如果 indexKey 存在，会使用这 indexKey 指向的子菜单数据进行导航
     * 优先级低于 url 和 type，如果 url 或 type 存在，会覆盖 indexKey 指向的子菜单数据中相同的字段
     */
    indexKey?: string | number;
    /**
     * 菜单项跳转的 path
     * 一般情况下只有没有子菜单时才会用这个字段，如果子菜单中的一项是可以作为默认路由，请使用 indexKey 来指定
     */
    url?: string;
    // 菜单的跳转类型
    type?: SpotterNavigationRouteType;
    // 领域导航激活状态展示的 icon，默认为 `${icon}-fill`，即默认状态 icon 加上填充风格后缀
    activeIcon?: string;
    // 领域导航下的子功能模块导航
    children?: SpotterMenuNavigationItem[];
}

export interface SpotterMenuProps {
    menus: SpotterMenuNavigationDomain[];
    loading?: boolean;
}

export const SpotterMenu: FC<SpotterMenuProps> = ({ menus, loading }) => {
    const domainNavigationMap = useMemo(
        () =>
            menus.reduce((p, c) => {
                /**
                 * 默认导航
                 * - indexKey 指向的子菜单导航
                 * - 没有 indexKey 时，使用子菜单导航的第一个
                 */
                const defaultIndexNavigation =
                    c.children?.find((i) => i.key === c.indexKey) ?? c.children?.[0];
                p[c.name] = {
                    url:
                        c.url ??
                        (defaultIndexNavigation?.url as string) ??
                        c.activePrefixPath ??
                        '',
                    type: c.type ?? defaultIndexNavigation?.type,
                };
                return p;
            }, {} as Record<string, Pick<SpotterMenuNavigationItem, 'url' | 'type'>>),
        [menus],
    );
    const available = useRef<number | null>(null);
    const location = useLocation();

    const handler = useCallback(() => {
        if (!available.current) {
            navigationMenuEventBus.destroySubMenu();
        }
        clearTimeout(available.current!);
        available.current = setTimeout(() => {
            available.current = null;
        }, 1000) as any;
    }, []);

    return useMemo(
        () => (
            <div className="spotter-layout-menu" style={{ background: '#F6F8FC', zIndex: 100 }}>
                <div className="flex flex-col w-72px h-full min-w-72px pb-12px">
                    <div
                        onMouseEnter={() => {
                            navigationMenuEventBus.destroySubMenu();
                        }}
                    >
                        <SpotterLink
                            to="/"
                            className="flex justify-center items-center mt-8px mb-6px h-56px min-h-56px"
                        >
                            <SptIcon
                                color="var(--primary-color)"
                                size="40px"
                                type="sptfont-menu-logo"
                            />
                        </SpotterLink>
                    </div>
                    <div
                        className="spotter-domain-menu-list flex flex-col overflow-y-auto "
                        onScroll={handler}
                    >
                        <WithEmptyAndLoading
                            loadingRender={() => (
                                <div className="mt-12px">
                                    {Array.from({ length: 10 }).map((_, i) => (
                                        <div
                                            // eslint-disable-next-line react/no-array-index-key
                                            key={i}
                                            className="spotter-menu-item h-56px mb-8px flex items-center flex-col"
                                        >
                                            <Skeleton.Button
                                                shape="square"
                                                size="small"
                                                active
                                                style={{
                                                    marginBottom: 6,
                                                    maxWidth: 32,
                                                    minWidth: 32,
                                                    minHeight: 26,
                                                    maxHeight: 26,
                                                }}
                                            />
                                            <Skeleton.Input
                                                active
                                                size="small"
                                                style={{
                                                    minHeight: 13,
                                                    maxHeight: 13,
                                                    maxWidth: 32,
                                                    minWidth: 32,
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                            render={() => (
                                <>
                                    {menus.map((domain) => {
                                        const active = domain.activePrefixPath
                                            ? location.pathname.startsWith(domain.activePrefixPath)
                                            : false;
                                        const activeIcon =
                                            domain.activeIcon ?? `${domain.icon}-fill`;
                                        const menuStats = {
                                            iconColor: active ? 'var(--primary-color)' : '#62778A',
                                            iconType: active ? activeIcon : domain.icon,
                                        };
                                        return (
                                            <div
                                                key={domain.activePrefixPath}
                                                className="relative spotter-menu-item"
                                                onMouseEnter={(e) => {
                                                    const rect =
                                                        e.currentTarget.getBoundingClientRect();
                                                    navigationMenuEventBus.createSubMenu({
                                                        title: domain.name,
                                                        data: domain.children ?? [],
                                                        position: {
                                                            x: rect.width + rect.x,
                                                            // 40px 是子导航头部标题（不可点击）的高度，这样设计是为了让用户平移即可命中可点击区域而不是每次都需要在 y 轴向下滑动才能点击到子导航
                                                            y: rect.y - 40,
                                                        },
                                                    });
                                                }}
                                            >
                                                <SpotterLink
                                                    key={domain.activePrefixPath}
                                                    to={domainNavigationMap[domain.name].url}
                                                    type={domainNavigationMap[domain.name].type}
                                                    className={classNames(
                                                        'spotter-domain-menu-item flex flex-col text-center h-64px pt-10px pb-4px',
                                                        {
                                                            'spotter-domain-menu-item-active':
                                                                active,
                                                        },
                                                    )}
                                                >
                                                    <SptIcon
                                                        color={menuStats.iconColor}
                                                        size="26px"
                                                        type={menuStats.iconType}
                                                    />
                                                    <div
                                                        className="text-13px leading-22px"
                                                        style={{
                                                            color: menuStats.iconColor,
                                                        }}
                                                    >
                                                        {domain.name}
                                                    </div>
                                                </SpotterLink>
                                            </div>
                                        );
                                    })}
                                </>
                            )}
                            loading={loading}
                        />
                    </div>
                    <div
                        className="flex-grow"
                        onMouseEnter={() => {
                            navigationMenuEventBus.destroySubMenu();
                        }}
                    />
                </div>
                <SubMenuPortal />
            </div>
        ),
        [menus, location.pathname, loading],
    );
};
