import { useRoutes } from 'react-router-dom';
import { AuthLayout, DefaultLayout } from '@app/infra/gui/Layout';
import { UserCenter } from '@app/routes/UserCenter';
import Downgrade from '@app/infra/gui/Downgrade';

/** direct load routes */
import { Home } from '@app/routes/Home';
import { GetStarted } from '@app/routes/GetStarted';
import { Login, PasswordForgot, AccountActivation } from '@app/routes/Auth';
import { PasswordModificationCompletion } from '@app/routes/Auth/PasswordForgot/PasswordModificationCompletion';
import { useEmbeddedRoutes } from '@app/infra/gui/EmbededRegister';
import { observer } from 'mobx-react-lite';
import { SpotterRouterGuard } from '../infra/routerGuard';

const AppRoutes = observer(() => {
    const EmbeddedRoutes = useEmbeddedRoutes();
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
                        ...EmbeddedRoutes, // bi报告
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
