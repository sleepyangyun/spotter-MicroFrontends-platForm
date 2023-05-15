import { SpotterRouteObject } from '@app/types/type';
import { pathJoin } from '@spotter/utils';
// import { OrderRoutes } from '@app/routes/Order';
// import { TicketRoutes } from '@app/routes/Ticket';
// import { CompanyRoutes } from '@app/routes/Seller';
// import { AccountRoutes } from '@app/routes/AccountManagement';
// import { CatalogRoutes } from '@app/routes/Catalog';
// import { LogisticsRoutes } from '@app/routes/Logistics';
// import { MarketingRoutes } from '@app/routes/Marketing';
// import { WarehouseRoutes } from '@app/routes/WarehouseV2';
// import { FinanceRoutes } from '@app/routes/Finance';
// import { SupplyChainFinanceRoutes } from '@app/routes/SupplyChainFinance';
// import { ReportRoutes } from '@app/routes/Report';
// import { ManagementRoutes } from '@app/routes/Management';
// import { ProductRoutes } from './Product';
// import { OperationLogRoutes } from './OperationLog';
// import { DashboardRoutes } from './Dashboard';
// import { MessageRoutes } from './Message';
// import { BusinessesRoutes } from './Business';
// import { PerformanceRoutes } from './Performance';

const extractMetaRouteMapFromRoutes = <T extends string>(
    routes: SpotterRouteObject<T>[],
    pathMap = {} as Record<T, SpotterRouteObject<T>>,
    base = '',
) => {
    for (const route of routes) {
        pathMap[route.key] = {
            key: route.key,
            path: route.path?.startsWith('http') ? route.path : pathJoin(base, route.path || ''),
            isMenu: route.isMenu,
            name: route.name,
            element: route.element,
        };
        if (route.children) {
            extractMetaRouteMapFromRoutes<T>(route.children, pathMap, pathMap[route.key].path);
        }
    }
    return pathMap;
};

export function getNavigationConfig<T extends string>(...routesList: SpotterRouteObject<T>[][]) {
    // eslint-disable-next-line unicorn/prefer-object-from-entries
    return routesList.reduce(
        (navConfig, routes) => Object.assign(navConfig, extractMetaRouteMapFromRoutes(routes)),
        {} as Record<T, SpotterRouteObject<T>>,
    );
}

export const navigationConfig = getNavigationConfig();
// OrderRoutes,
// TicketRoutes,
// CompanyRoutes,
// ProductRoutes,
// AccountRoutes,
// CatalogRoutes,
// OperationLogRoutes,
// LogisticsRoutes,
// MarketingRoutes,
// WarehouseRoutes,
// DashboardRoutes,
// ReportRoutes,
// FinanceRoutes,
// MessageRoutes,
// SupplyChainFinanceRoutes,
// ManagementRoutes,
// BusinessesRoutes,
// PerformanceRoutes,
