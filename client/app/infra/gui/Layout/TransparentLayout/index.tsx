import { FC, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

interface TransparentLayoutProps {
    base: string;
    indexPath: string;
}

export const TransparentLayout: FC<TransparentLayoutProps> = ({ indexPath, base, children }) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === base) {
            navigate(indexPath);
        }
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [location.pathname]);

    return children ? <div style={{ height: '100%' }}>{children}</div> : <Outlet />;
};
