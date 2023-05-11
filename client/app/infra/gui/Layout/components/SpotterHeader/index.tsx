import { FC, useMemo } from 'react';
import { Breadcrumb } from 'antd';
import { Link, matchRoutes } from 'react-router-dom';
import { SpotterRouteObject } from '@app/types/type';
import { observer } from 'mobx-react-lite';
import { navigationConfig } from '@app/routes/navigation.config';
import { LangSelector } from '@app/infra/gui/Layout/components/SpotterHeader/LangSelector';
import { UserCenterNavigation } from '@app/infra/gui/Layout/components/SpotterHeader/UserCenter';
import { MenuDropdown } from '@app/infra/gui/Layout/components/SpotterHeader/MenuDropdown';
import { NewBreadcrumbProps } from 'antd/es/breadcrumb/Breadcrumb';
import { SpotterMenuNavigationDomain } from '../SpotterNewMenu';

interface SpotterHeaderProps {
    menus: SpotterMenuNavigationDomain[];
    pathSnippets: string[];
}

export const metaRoutes = (Object.keys(navigationConfig) as (keyof typeof navigationConfig)[]).map(
    (k) => navigationConfig[k],
);

export const SpotterHeader: FC<SpotterHeaderProps> = observer(({ menus, pathSnippets }) => {
    const BreadcrumbItems = useMemo(
        () => [
            ...pathSnippets.reduce((p, _, index) => {
                const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
                const route = matchRoutes(metaRoutes, { pathname: url })?.[0]
                    ?.route as SpotterRouteObject<any>;
                route?.name &&
                    p.push({
                        title: route.element ? (
                            <Link to={url} style={{ height: '24px' }}>
                                {/* {route?.icon ? <span className="mr-6px">{route?.icon}</span> : null} */}
                                {route.name}
                            </Link>
                        ) : (
                            <div className="h-24px">{route.name}</div>
                        ),
                    });
                return p;
            }, [] as NewBreadcrumbProps['items']),
        ],
        [pathSnippets],
    );

    return (
        <div
            className="spotter-layout-header w-full h-48px min-h-48px flex items-center justify-between px-24px whitespace-nowrap"
            style={{
                borderBottom: '1px solid #e3e8ee',
                // modal的mask的zIndex是1000
                zIndex: '999',
                background: '#fff',
            }}
        >
            <div className="flex item-center sticky left-24px">
                <Breadcrumb className="h-full" items={BreadcrumbItems} />
            </div>
            <div className="flex-grow" />
            <div
                className="flex items-center"
                style={{
                    zIndex: 999,
                    background: '#fff',
                }}
            >
                <MenuDropdown menus={menus} />
                <LangSelector />
                <UserCenterNavigation />
            </div>
        </div>
    );
});
