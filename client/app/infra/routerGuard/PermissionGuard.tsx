import { observer } from 'mobx-react-lite';
import { FC, ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '@client/app/store';
import { navigationConfig } from '@client/app/routes/navigation.config';
import { MenusType } from '@client/app/store/models/v2/Global/global.model';
import { useMount } from '@spotter/utils';
import { useValidate } from '@client/app/utils/hooks';

const WHITE_LIST = new Set([
    '/',
    '/403',
    '/404',
    '/login',
    '/forgot-password',
    '/permission-denied',
    '/user-center',
]);

// 扁平化授权的菜单树
const flattenRoutes = (menus: MenusType): string[] => {
    const paths: string[] = [];
    if (!menus) return paths;
    for (const menu of menus) {
        const data = JSON.parse(menu.data);
        paths.push((data?.url as any) ?? data.path);
        if (menu.children?.length > 0) {
            paths.push(...flattenRoutes(menu.children));
        }
    }
    return paths;
};

// 完整可授权菜单列表
const LocalMenus = new Set(
    Object.values(navigationConfig)
        .filter((menu) => menu.isMenu)
        .map((item) => item.path),
);

const hasPermission = (path: string, remoteMenus: string[]) => {
    if (WHITE_LIST.has(path)) {
        // 白名单直接有权限
        return true;
    }

    if (LocalMenus.has(path)) {
        // 可授权菜单走权限绝对判断
        return remoteMenus.includes(path);
    }

    if (remoteMenus.length === 0) {
        return false;
    }

    // 非可授权菜单走前缀判断
    // return remoteMenus.some((r: string) => path.startsWith(r));
    // TODO: 这块儿逻辑判断有问题，不能直接通过前缀去判断，先暂时略过一下
    return true;
};
const authError = new Set([401, 403]);

// TODO: 优化，现在 permission guard 里面做了认证和鉴权两个工作，后面需要拆分出来
export const PermissionGuard: FC<{ children: ReactElement }> = observer(({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const validate = useValidate();
    const { menus } = useStore('global');
    const currentPathName = window.location.pathname;

    useMount(async () => {
        try {
            await validate.get();
            const remoteMenus = flattenRoutes(menus?.data);
            if (
                menus.data &&
                location.pathname &&
                remoteMenus.length >= 0 &&
                !hasPermission(location.pathname, remoteMenus)
            ) {
                navigate('/permission-denied');
            }
        } catch (error: any) {
            if (authError.has(error.data?.code)) {
                window.localStorage.setItem('PATHNAME_BEFORE_LOGIN', currentPathName);
                navigate(`/login`);
            }
            console.log(error);
        }
    });

    return children;
});
