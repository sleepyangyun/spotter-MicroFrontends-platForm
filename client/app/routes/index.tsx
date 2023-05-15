import { useRoutes } from 'react-router-dom';
import { AuthLayout, DefaultLayout } from '@app/infra/gui/Layout';
import { UserCenter } from '@app/routes/UserCenter';
import Downgrade from '@app/infra/gui/Downgrade';

/** direct load routes */
import { Home } from '@app/routes/Home';
import { GetStarted } from '@app/routes/GetStarted';
import { Login, PasswordForgot, AccountActivation } from '@app/routes/Auth';
import { PasswordModificationCompletion } from '@app/routes/Auth/PasswordForgot/PasswordModificationCompletion';
// import { TicketRoutes } from '@app/routes/Ticket';
// import { OrderRoutes } from '@app/routes/Order';
// import { CompanyRoutes } from '@app/routes/Seller';
// import { ProductRoutes } from '@app/routes/Product';
// import { AccountRoutes } from '@app/routes/AccountManagement';
// import { CatalogRoutes } from '@app/routes/Catalog';
// import { MarketingRoutes } from '@app/routes/Marketing';
// import { OperationLogRoutes } from '@app/routes/OperationLog';
// import { WarehouseRoutes } from '@app/routes/WarehouseV2';
// import { LogisticsRoutes } from '@app/routes/Logistics';
// import { FinanceRoutes } from '@app/routes/Finance';
// import { SupplyChainFinanceRoutes } from '@app/routes/SupplyChainFinance';
// import { SettingsRoutes } from '@app/routes/Settings';
// import { useEmbeddedRoutes } from '@app/infra/gui/EmbededRegister';
import { observer } from 'mobx-react-lite';
// import { BusinessesRoutes } from '@app/routes/Business';
// import { ReportRoutes } from '@app/routes/Report';
// import { MessageRoutes } from '@app/routes/Message';
// import { ManagementRoutes } from '@app/routes/Management';
// import { DashboardRoutes } from './Dashboard';
import { SpotterRouterGuard } from '../infra/routerGuard';
// import { PerformanceRoutes } from './Performance';

const AppRoutes = observer(() => {
    // const EmbeddedRoutes = useEmbeddedRoutes();
    return useRoutes([
        {
            element: <SpotterRouterGuard />,
            children: [
                {
                    element: <DefaultLayout />,
                    children: [
                        {
                            index: true,
                            element: <Home />,
                        },
                        {
                            path: '/get-started',
                            element: <GetStarted />,
                        },
                        // ...DashboardRoutes,
                        // ...OrderRoutes,
                        // ...TicketRoutes,
                        // ...CompanyRoutes,
                        // ...ProductRoutes,
                        // ...AccountRoutes,
                        // ...CatalogRoutes,
                        // ...MarketingRoutes,
                        // ...OperationLogRoutes,
                        // ...WarehouseRoutes,
                        // ...LogisticsRoutes,
                        // ...FinanceRoutes,
                        // ...SupplyChainFinanceRoutes,
                        // ...SettingsRoutes,
                        // ...ReportRoutes,
                        // ...EmbeddedRoutes,
                        // ...BusinessesRoutes,
                        // ...MessageRoutes,
                        // ...PerformanceRoutes,
                        // ...ManagementRoutes,
                        {
                            path: '/user-center',
                            element: <UserCenter />,
                        },
                        {
                            path: '/permission-denied',
                            element: <Downgrade.PermissionDenied />,
                        },
                        {
                            path: '*',
                            element: <Downgrade.NotFound />,
                        },
                    ],
                },
            ],
        },
        {
            element: <AuthLayout />,
            children: [
                {
                    path: '/login',
                    element: <Login />,
                },
                {
                    path: '/forgot-password',
                    element: <PasswordForgot />,
                },
                {
                    path: '/forgot-password/completion',
                    element: <PasswordModificationCompletion />,
                },
                {
                    path: '/account-activation',
                    element: <AccountActivation />,
                },
                {
                    path: '/permission-denied',
                    element: <Downgrade.PermissionDenied />,
                },
            ],
        },
    ]);
});

export default AppRoutes;
