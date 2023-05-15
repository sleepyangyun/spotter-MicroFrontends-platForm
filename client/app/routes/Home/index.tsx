import { SpotterMenuNavigationDomain } from '@client/app/infra/gui/Layout/components/SpotterNewMenu';
import { useStore } from '@client/app/store';
import { MenusType } from '@client/app/store/models/v2/Global/global.model';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const transformMenuData = (menus?: MenusType): SpotterMenuNavigationDomain[] =>
    menus?.length
        ? menus.map(({ data, code, children }) => ({
              ...JSON.parse(data),
              key: code,
              children: transformMenuData(children),
          }))
        : [];

/**
 * 遍历查询每层级第一个菜单，返回最后层级的第一个菜单
 * @param menuData
 * @returns
 */
const findLastSubMenuFirstOne = (
    menuData: SpotterMenuNavigationDomain,
): SpotterMenuNavigationDomain => {
    if (menuData?.children && menuData?.children?.length > 0) {
        const firstChildren = menuData?.children[0];
        return findLastSubMenuFirstOne(firstChildren);
    }
    return menuData;
};

export const Home: FC = () => {
    const navigate = useNavigate();
    const { menus } = useStore('global');

    // FIXME: 如果用户有输入具体地址，跳转到登陆地址，那应该重定向到具体地址
    // 重定向到第一个菜单的末级子菜单中的第一个子菜单
    useEffect(() => {
        const menusData = transformMenuData(menus.data);
        if (menusData.length > 0) {
            const firstMeunLastSubMenu = findLastSubMenuFirstOne(menusData[0]);
            firstMeunLastSubMenu.url && navigate(firstMeunLastSubMenu.url);
        }
    }, [menus]);

    return <div />;
};
