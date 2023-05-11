import { SpotterLink } from '@client/app/components/SpotterLink';
import { SptIcon } from '@client/app/components/SptIcon';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import { Typography } from 'antd';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { SpotterMenuNavigationDomain, SpotterMenuNavigationItem } from './index';
import { navigationMenuEventBus, subMenuHoverStatus } from './navigationMenuEventBus';

export interface MainMenuProps {
    menus: SpotterMenuNavigationDomain[];
}

const subMenuItems = (menuItemData: SpotterMenuNavigationDomain) => {
    const items = (itemData: SpotterMenuNavigationDomain): SpotterMenuNavigationDomain[] => {
        const subMenuItem: SpotterMenuNavigationDomain[] = [];
        if (itemData.children.length) {
            let childItems: SpotterMenuNavigationDomain[] = [];
            for (const child of itemData.children) {
                childItems = [...childItems, ...items(child)];
            }
            return childItems;
        }
        subMenuItem.push(itemData);
        return subMenuItem;
    };
    return items(menuItemData);
};

const MainMenu: FC<MainMenuProps> = ({ menus }) => {
    const location = useLocation();
    const [showTopAnchor, setShowTopAnchor] = useState<boolean>(false);
    const [showBottomAnchor, setShowBottomAnchor] = useState<boolean>(false);
    const [subMenuOpened, setSubMenuOpened] = useState<boolean>(false);
    const [hoveredKey, setHoveredKey] = useState<string>('');
    const isActive = (menuItemData: SpotterMenuNavigationDomain) =>
        subMenuItems(menuItemData).some((item) => location.pathname.startsWith(item.url as string));

    const domainNavigationMap = useMemo(
        () =>
            menus.reduce((p, c) => {
                /**
                 * 默认导航
                 * - indexKey 指向的子菜单导航
                 * - 没有 indexKey 时，使用子菜单导航的第一个
                 */
                const defaultIndexNavigationItem =
                    c.children?.find((i) => i.key === c.indexKey) ?? subMenuItems(c)[0];
                p[c.name] = {
                    url: defaultIndexNavigationItem?.url ?? c.url ?? c.activePrefixPath ?? '',
                    type: c.type ?? defaultIndexNavigationItem?.type,
                };
                return p;
            }, {} as Record<string, Pick<SpotterMenuNavigationItem, 'url' | 'type'>>),
        [menus],
    );

    const mainMenuTopAnchorIO = new IntersectionObserver((entries) =>
        setShowTopAnchor(entries[0].intersectionRatio <= 0),
    );
    const mainMenuBottomAnchorIO = new IntersectionObserver((entries) =>
        setShowBottomAnchor(entries[0].intersectionRatio <= 0),
    );
    useEffect(() => {
        mainMenuTopAnchorIO.observe(document.querySelector('#mainMenuTopAnchor') as HTMLElement);
        mainMenuBottomAnchorIO.observe(
            document.querySelector('#mainMenuBottomAnchor') as HTMLElement,
        );
        return () => {
            mainMenuTopAnchorIO.disconnect();
            mainMenuBottomAnchorIO.disconnect();
        };
    }, []);

    useEffect(() => {
        const changeSubMenuHoverStatusHandler = (data: subMenuHoverStatus) => {
            if (data.status) {
                return setHoveredKey(data.key);
            }
            setHoveredKey('');
            setSubMenuOpened(false);
        };
        navigationMenuEventBus.onChangeSubMenuHoverStatus(changeSubMenuHoverStatusHandler);
        return () => {
            navigationMenuEventBus.offChangeSubMenuHoverStatus(changeSubMenuHoverStatusHandler);
        };
    }, []);

    const available = useRef<number | null>(null);

    const scrollHandler = useCallback(() => {
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
            <div className="spotter-main-menu-container">
                {showTopAnchor ? (
                    <div
                        className="spotter-menu-indicator spotter-menu-indicator-up"
                        style={{ ['--bg-color' as any]: '#F6F8FC' }}
                    >
                        <UpOutlined className="icon-color" />
                    </div>
                ) : null}
                <div
                    className="spotter-main-menu-wrapper flex flex-col overflow-y-auto"
                    onScroll={scrollHandler}
                >
                    <div id="mainMenuTopAnchor" />
                    {menus.map((item) => {
                        const active = isActive(item);
                        // const active = item.activePrefixPath
                        //     ? location.pathname.startsWith(item.activePrefixPath)
                        //     : isActive(item);
                        const activeIcon = item.activeIcon ?? `${item.icon}-fill`;
                        const menuStats = {
                            iconColor: active ? 'var(--primary-color)' : '#62778A',
                            iconType: active ? activeIcon : item.icon,
                        };
                        let delayTimer: any;
                        return (
                            <div
                                key={item.key}
                                className={classNames(
                                    'spotter-menu-item py-6px flex flex-col justify-center',
                                    {
                                        'spotter-menu-item-active': active,
                                        'spotter-menu-item-hovered': hoveredKey === item.key,
                                    },
                                )}
                                onMouseEnter={() => {
                                    if (subMenuOpened) {
                                        delayTimer = setTimeout(() => {
                                            navigationMenuEventBus.createSubMenu({
                                                key: item.key,
                                                title: item.name,
                                                data: item.children ?? [],
                                            });
                                            setSubMenuOpened(true);
                                        }, 200);
                                    } else {
                                        navigationMenuEventBus.createSubMenu({
                                            key: item.key,
                                            title: item.name,
                                            data: item.children ?? [],
                                        });
                                        setSubMenuOpened(true);
                                    }
                                }}
                                onMouseLeave={() => delayTimer && clearTimeout(delayTimer)}
                            >
                                <SpotterLink
                                    to={domainNavigationMap[item.name].url}
                                    type={domainNavigationMap[item.name].type}
                                    className="flex flex-col justify-center items-center"
                                    noStyle
                                >
                                    <SptIcon
                                        color={menuStats.iconColor}
                                        size="26px"
                                        type={menuStats.iconType}
                                    />
                                    <div
                                        className="spotter-menu-item-text text-13px leading-22px"
                                        style={{
                                            color: menuStats.iconColor,
                                            fontWeight: active ? '600' : 'normal',
                                        }}
                                    >
                                        {item.name}
                                    </div>
                                </SpotterLink>
                            </div>
                        );
                    })}
                    <div id="mainMenuBottomAnchor" />
                </div>
                {showBottomAnchor ? (
                    <div
                        className="spotter-menu-indicator spotter-menu-indicator-down"
                        style={{ ['--bg-color' as any]: '#F6F8FC' }}
                    >
                        <DownOutlined className="icon-color" />
                    </div>
                ) : null}
            </div>
        ),
        [menus, hoveredKey, subMenuOpened, showTopAnchor, showBottomAnchor],
    );
};

export default MainMenu;
