import { AuthGuard } from '@app/infra/routerGuard/AuthGuard';
import { PermissionGuard } from '@app/infra/routerGuard/PermissionGuard';
import { Outlet } from 'react-router-dom';

export const SpotterRouterGuard = () => (
    <AuthGuard>
        <PermissionGuard>
            <Outlet />
        </PermissionGuard>
    </AuthGuard>
);
