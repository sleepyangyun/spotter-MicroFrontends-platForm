import { FC } from 'react';
import { Dropdown } from 'antd';
import { UserCenterMenu } from '@app/infra/gui/Layout/components/SpotterHeader/UserCenter/UserCenterMenu';
import { observer } from 'mobx-react-lite';
import { UserAvatar } from '@app/components/UserAvatar';

export const UserCenterNavigation: FC = observer(() => (
    <div className="mr-6px bg-primary-500 cursor-pointer">
        <Dropdown
            trigger={['hover']}
            placement="bottomRight"
            autoAdjustOverflow
            dropdownRender={() => <UserCenterMenu />}
        >
            <div className="h-47px flex justify-center items-center px-12px header-menus-item">
                <UserAvatar maxNameLength={2} />
            </div>
        </Dropdown>
    </div>
));
