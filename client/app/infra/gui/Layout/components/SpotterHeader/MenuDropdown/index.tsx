import { FC } from 'react';
import { SpotterLink } from '@client/app/components/SpotterLink';
import { Dropdown } from 'antd';
import { SptIcon } from '@client/app/components/SptIcon';
import { SpotterMenuNavigationDomain } from '../../SpotterNewMenu';

interface MenuDropdownProps {
    menus: SpotterMenuNavigationDomain[];
}
const menuItems = (itemsData: SpotterMenuNavigationDomain[]) =>
    itemsData.map((item) => ({
        key: item.key,
        label: (
            <SpotterLink to={item.url ?? ''} key={item.key} type={item.type}>
                <div style={{ fontSize: '14px', lineHeight: '22px', color: 'rgba(0,0,0, 0.85)' }}>
                    {item.name}
                </div>
            </SpotterLink>
        ),
    }));

export const MenuDropdown: FC<MenuDropdownProps> = ({ menus }) => {
    return (
        <div className="flex items-center">
            {menus.map((menuItem) => (
                <Dropdown
                    key={menuItem.key}
                    placement="bottomRight"
                    menu={{ items: menuItems(menuItem.children) }}
                    overlayStyle={{ width: '160px' }}
                >
                    <div className="h-47px flex justify-center items-center px-12px header-menus-item">
                        {menuItem.icon ? (
                            <div className="flex justify-center items-center pt-1px">
                                <SptIcon
                                    color="rgba(0 0 0 / 65%)"
                                    size="18px"
                                    type={menuItem.icon}
                                />
                            </div>
                        ) : (
                            menuItem.name
                        )}
                    </div>
                </Dropdown>
            ))}
        </div>
    );
};
