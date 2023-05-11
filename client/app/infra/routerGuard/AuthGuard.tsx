import { FC, ReactElement } from 'react';
import { observer } from 'mobx-react-lite';

export const AuthGuard: FC<{ children: ReactElement }> = observer(
    ({ children }) =>
        // return <Outlet />;
        // return children;
        children,
);
