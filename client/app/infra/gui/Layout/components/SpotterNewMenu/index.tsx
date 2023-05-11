import { FC, useEffect, useState } from 'react';
import { SpotterLink, SpotterNavigationRouteType } from '@client/app/components/SpotterLink';
import { SptIcon } from '@client/app/components/SptIcon';
import { WithEmptyAndLoading } from '@app/components/WithEmptyAndLoading';
import { Skeleton } from 'antd';
import MainMenu from './MainMenu';
import SubMenu from './SubMenu';
import { CreateSubMenuPayload, navigationMenuEventBus } from './navigationMenuEventBus';

export interface SpotterMenuNavigationItem {
    // 菜单项的唯一键
    key: string;
    // 导航名称
    name: string;
    // 领域导航默认展示的 icon
    icon: string;
    // 菜单项跳转的 url
    url: string;
    // 菜单的跳转类型
    type?: SpotterNavigationRouteType;
    children: SpotterMenuNavigationItem[];
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
    children: SpotterMenuNavigationItem[];
}

export interface SpotterMenuProps {
    menus: SpotterMenuNavigationDomain[];
    loading?: boolean;
}

export const SpotterNewMenu: FC<SpotterMenuProps> = ({ menus, loading }) => {
    const [subMenuOpened, setSubMenuOpened] = useState<boolean>(false);

    useEffect(() => {
        const createSubMenuHandler = (payload: CreateSubMenuPayload) => {
            setSubMenuOpened(payload.data.length > 0);
        };
        const destroySubMenuHandler = () => {
            setSubMenuOpened(false);
        };
        navigationMenuEventBus.onCreateSubMenu(createSubMenuHandler);
        navigationMenuEventBus.onDestroySubMenu(destroySubMenuHandler);

        return () => {
            navigationMenuEventBus.offCreateSubMenu(createSubMenuHandler);
            navigationMenuEventBus.offDestroySubMenu(destroySubMenuHandler);
        };
    }, []);

    return (
        <div className={`spotter-layout-menu ${subMenuOpened ? 'spotter-layout-menu-shadow' : ''}`}>
            <div className="flex flex-col w-72px h-full min-w-72px pb-6px">
                <div
                    onMouseEnter={() => {
                        navigationMenuEventBus.destroySubMenu();
                    }}
                >
                    <SpotterLink
                        to="/"
                        className="flex justify-center items-center mt-9px mb-6px h-56px min-h-56px"
                    >
                        <SptIcon
                            color="var(--primary-color)"
                            size="40px"
                            type="sptfont-menu-logo"
                        />
                    </SpotterLink>
                </div>
                <WithEmptyAndLoading
                    // eslint-disable-next-line react/no-unstable-nested-components
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
                    render={() => <MainMenu menus={menus} />}
                    loading={loading}
                />
                <SubMenu />
            </div>
        </div>
    );
};
