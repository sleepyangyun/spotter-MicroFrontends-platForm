import { useState } from 'react';
import { Avatar, Card, Divider, List } from 'antd';
import { BlockOutlined, SolutionOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { useStore } from '@app/store';
import PersonalInformation from '@app/routes/UserCenter/PersonalInformation';
import AccountBinding from '@app/routes/UserCenter/AccountBinding';
import { UserCenterNavKey } from '@app/routes/UserCenter/const';
import { PageContainer } from '@app/components/PageContainer';

const ACTIVE_KEY = 'activeNav';

const UserCenter = observer(() => {
    const [params, setSearchParams] = useSearchParams();
    const [selectedNavKey, setSelectedNavKey] = useState(
        params.get(ACTIVE_KEY) ?? UserCenterNavKey.PERSONAL_INFORMATION,
    );
    const { user } = useStore('global');

    const navigate = (key: UserCenterNavKey) => {
        setSelectedNavKey(key);
        params.set(ACTIVE_KEY, key);
        setSearchParams(params);
    };

    const navList = [
        {
            navTitle: '私人信息',
            navIcon: <SolutionOutlined />,
            key: UserCenterNavKey.PERSONAL_INFORMATION,
            sectionRender: () => <PersonalInformation navigate={navigate} />,
        },
        {
            navTitle: '绑定账户',
            navIcon: <BlockOutlined />,
            key: UserCenterNavKey.ACCOUNT_BINDING,
            sectionRender: () => <AccountBinding />,
        },
    ];
    const selectedNav = navList.find(({ key }) => key === selectedNavKey);
    return (
        <PageContainer title="用户中心">
            <div className="flex px-24px">
                <div className="flex flex-col w-280px min-w-280px">
                    <Card
                        bodyStyle={{
                            padding: 32,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Avatar
                            className="bg-primary-500"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: 'var(--primary-color)',
                                width: 102,
                                height: 102,
                                fontSize: '32px',
                            }}
                            gap={16}
                        >
                            {user.data?.name?.slice(0, Math.min(user.data?.name?.length, 4))}
                        </Avatar>
                        <div className="mt-21px h-26px font-500 text-18px leading-25px">
                            {user.data?.email}
                        </div>
                    </Card>
                    <Card style={{ marginTop: '16px' }} bodyStyle={{ padding: 0 }}>
                        <List className="spotter-nav-list">
                            {navList.map((item) => (
                                <List.Item
                                    key={item.key}
                                    className={classNames('nav-list-item', {
                                        active: selectedNavKey === item.key,
                                    })}
                                    onClick={() => {
                                        navigate(item.key);
                                    }}
                                >
                                    <div className="item-content">
                                        <span className="flex item-center text-20px mr-6px">
                                            {item.navIcon}
                                        </span>
                                        {item.navTitle}
                                    </div>
                                </List.Item>
                            ))}
                        </List>
                    </Card>
                </div>
                <Divider
                    type="vertical"
                    style={{
                        height: 340,
                        margin: '12px 24px',
                    }}
                />
                <div className="max-w-900px w-900px">{selectedNav?.sectionRender()}</div>
            </div>
        </PageContainer>
    );
});

export default UserCenter;
