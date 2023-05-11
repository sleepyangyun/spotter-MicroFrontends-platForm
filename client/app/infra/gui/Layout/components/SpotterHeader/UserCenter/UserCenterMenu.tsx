import { FC } from 'react';
import { Menu, Space, Tag, Typography } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSt } from '@spotter/i18n-sdk';
import { useStore } from '@app/store';
import { observer } from 'mobx-react-lite';
import { userSdk } from '@app/services/v2/auth/user';
import { useValidate } from '@client/app/utils/hooks';

const MenuItem = Menu.Item;
const { Text } = Typography;
export const UserCenterMenu: FC<any> = observer(({ ...antdMenuProps }) => {
    const t = useSt();
    const navigate = useNavigate();
    const { user, company } = useStore('global');
    const validate = useValidate();
    return (
        <Menu {...antdMenuProps} style={{ width: 270 }}>
            <li className="px-24px py-12px bg-gray-100/10">
                <Space size={8} direction="vertical" style={{ width: '100%' }}>
                    <Tag color="geekblue">{company?.data?.name ?? '-'}</Tag>
                    <div className="text-16px leading-16px font-bold text-gray-700 overflow-ellipsis">
                        {user.data?.email ?? '-'}
                    </div>
                    <div className="flex items-center text-gray-500 text-12px">
                        <span className="mr-6px">{t('user.id')}:</span>
                        <Text
                            ellipsis={{
                                tooltip: user.data?.id ?? '-',
                            }}
                            style={{ flexGrow: '1', width: 0, flexBasis: 0 }}
                        >
                            <span className="text-gray-500">{user.data?.id ?? '-'}</span>
                        </Text>
                    </div>
                    <div className="flex w-full items-center text-gray-500 text-12px">
                        <span className="mr-6px">{t('user.business_code')}:</span>
                        <Text
                            ellipsis={{
                                tooltip: user.data?.id ?? '-',
                            }}
                            style={{ flexGrow: '1', width: 0, flexBasis: 0 }}
                        >
                            <span className="text-gray-500">
                                {company?.data?.businessCode ?? '-'}
                            </span>
                        </Text>
                    </div>
                </Space>
            </li>
            <Menu.Divider />
            <MenuItem
                style={{
                    paddingRight: 24,
                    paddingLeft: 24,
                }}
                className="py-12px"
                onClick={() => {
                    navigate('/user-center');
                }}
                key="userCenter"
                icon={<UserOutlined />}
            >
                {t('user.user_center')}
            </MenuItem>
            <MenuItem
                style={{
                    paddingRight: 24,
                    paddingLeft: 24,
                }}
                onClick={async () => {
                    try {
                        const { data: res } = await userSdk.logout();
                        if (res.data) {
                            validate.clear();
                            navigate('/login');
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }}
                key="logout"
                icon={<LogoutOutlined />}
            >
                {t('auth.logout')}
            </MenuItem>
        </Menu>
    );
});
