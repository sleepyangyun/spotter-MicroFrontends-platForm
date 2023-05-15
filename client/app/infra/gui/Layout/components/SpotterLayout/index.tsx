import { FC, useMemo } from 'react';
// import { SpotterMenu, SpotterMenuProps } from '@app/infra/gui/Layout/components/SpotterMenu';
import { SpotterMenuProps, SpotterNewMenu } from '@app/infra/gui/Layout/components/SpotterNewMenu';
import { SpotterHeader } from '@app/infra/gui/Layout/components/SpotterHeader';
import { useLocation } from 'react-router-dom';
import { pull } from 'lodash';
import { navigationMenuEventBus } from '@app/infra/gui/Layout/components/SpotterMenu/navigationMenuEventBus';
import { useStore } from '@client/app/store';
import { observer } from 'mobx-react-lite';
import { SuspenseLoading } from '../../../SuspenseLoading';

export interface SpotterLayoutProps {
    menus: SpotterMenuProps['menus'];
    menuLoading?: boolean;
}

export interface IMenusData {
    defaultMenus: SpotterMenuProps['menus'];
    headerMenus: SpotterMenuProps['menus'];
}

export const SpotterLayout: FC<SpotterLayoutProps> = observer(
    ({ children, menus, menuLoading: _ }) => {
        const sourceMenus = menus.map((item) => {
            item.items = item.children;
            return item;
        });

        const menusData: IMenusData = useMemo(() => {
            const headerMenus = sourceMenus.filter((menuItem) => menuItem.position === 'header');
            pull(sourceMenus, ...headerMenus);
            return { defaultMenus: sourceMenus, headerMenus };
        }, [sourceMenus]);

        const location = useLocation();
        const pathSnippets = useMemo(
            () => location.pathname.split('/').filter((p) => p),
            [location.pathname],
        );
        const { menuLoading } = useStore('app');

        return (
            <div className="spotter-layout flex h-full">
                {/* {menus ? <SpotterMenu menus={menus} loading={menuLoading.data} /> : null} */}
                {menus ? (
                    <SpotterNewMenu menus={menusData.defaultMenus} loading={menuLoading.data} />
                ) : null}
                <div className="flex-grow w-0 h-full overflow-auto">
                    <div className="flex flex-col  min-w-900px h-full">
                        <SpotterHeader menus={menusData.headerMenus} pathSnippets={pathSnippets} />
                        <div
                            className="spotter-layout-content"
                            onMouseEnter={() => {
                                navigationMenuEventBus.destroySubMenu();
                            }}
                        >
                            {menuLoading.data ? <SuspenseLoading /> : children}
                        </div>
                    </div>
                </div>
            </div>
        );
    },
);
