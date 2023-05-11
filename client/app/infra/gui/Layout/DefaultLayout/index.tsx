import { FC, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { SuspenseLoading } from '@app/infra/gui/SuspenseLoading';
import { ErrorBoundary } from '@app/infra/gui/ErrorBoundary';
import Downgrade from '@app/infra/gui/Downgrade';
import { SpotterLayout } from '@app/infra/gui/Layout/components/SpotterLayout';
import { useStore } from '@app/store';
import { MenusType } from '@client/app/store/models/v2/Global/global.model';
import { SpotterMenuNavigationDomain } from '../components/SpotterNewMenu';

const transformSubMenuData = (menus?: MenusType): SpotterMenuNavigationDomain[] =>
    menus?.length
        ? menus.map(({ data, code, children }) => ({
              ...JSON.parse(data),
              key: code,
              children: transformSubMenuData(children),
          }))
        : [];

const transformDomainMenuData = (menus: MenusType): SpotterMenuNavigationDomain[] =>
    menus?.length
        ? [...menus].map(({ children, data, code }) => ({
              ...(JSON.parse(data) as any),
              key: code,
              children: transformSubMenuData(children),
          }))
        : [];

export const DefaultLayout: FC = observer(() => {
    const location = useLocation();
    const { menus: menusData, loadWatchers } = useStore('global');

    const menus = transformDomainMenuData(menusData?.data);

    return (
        <SpotterLayout menus={menus} menuLoading={loadWatchers(['menus', 'validate'])}>
            <div className="h-full flex flex-col">
                <div className="h-0 flex-grow">
                    <ErrorBoundary
                        FallbackComponent={Downgrade.ClientError}
                        resetKeys={[location.pathname]}
                    >
                        <Suspense fallback={<SuspenseLoading />}>
                            <Outlet />
                        </Suspense>
                    </ErrorBoundary>
                </div>
            </div>
        </SpotterLayout>
    );
});
