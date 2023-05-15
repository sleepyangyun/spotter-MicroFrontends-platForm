import { Button, Card, Row, Skeleton, Space } from 'antd';

import { MailFilled, EditOutlined, PhoneFilled } from '@ant-design/icons';
import { useState } from 'react';
import PhoneModificationModal from '@app/routes/UserCenter/AccountBinding/PhoneModificationModal';
import { EmailModificationModal } from '@app/routes/UserCenter/AccountBinding/EmailModificationModal';
import { observer } from 'mobx-react-lite';
import { useStore } from '@app/store';

const AccountBinding = observer(() => {
    const [emailModificationModalVisible, setEmailModificationModalVisible] = useState(false);
    const [phoneModificationModalVisible, setPhoneModificationModalVisible] = useState(false);
    const { user, loadWatchers } = useStore('global');

    return (
        <Card
            title={
                <h3 className="mb-0 text-16px" style={{ lineHeight: 'inherit' }}>
                    绑定账户
                </h3>
            }
            className="h-full"
        >
            {loadWatchers(['user']) ? (
                <Space size={24} className="w-full" direction="vertical">
                    <div className="flex items-center w-full">
                        <Skeleton.Avatar
                            active
                            shape="square"
                            style={{ borderRadius: 8, width: 36, height: 36 }}
                        />
                        <Skeleton.Button active className="pl-12px" block />
                        <Skeleton.Button active className="pl-12px w-24px" block />
                    </div>
                    <div className="flex items-center w-full">
                        <span>
                            <Skeleton.Avatar
                                active
                                shape="square"
                                style={{ borderRadius: 8, width: 36, height: 36 }}
                            />
                        </span>
                        <span className="ml-6px">
                            <Skeleton.Button
                                active
                                style={{ flexGrow: 1, width: '100%', flexBasis: 0 }}
                                block
                            />
                        </span>
                        <span className="ml-6px">
                            <Skeleton.Button active className="ml-12px" block />
                        </span>
                    </div>
                </Space>
            ) : (
                <>
                    <Row justify="space-between" className="mt-12px mb-24px">
                        <div className="flex items-center justify-center text-18px">
                            <div className="w-36px h-36px bg-blue-gray-200/50 flex items-center justify-center rounded-8px">
                                <MailFilled
                                    style={{
                                        color: '#515b78',
                                    }}
                                    className=" text-20px leading-36px"
                                />
                            </div>
                            <span className="ml-8px">邮箱</span>
                            <span>:</span>
                            <span className="ml-8px text-blue-500 text-17px">
                                {user.data?.email}
                            </span>
                        </div>
                        <div>
                            <Button
                                onClick={() => {
                                    setEmailModificationModalVisible(true);
                                }}
                                icon={<EditOutlined />}
                                type="link"
                            >
                                修改
                            </Button>
                        </div>
                    </Row>
                    <Row justify="space-between" className="mb-24px">
                        <div className="flex items-center justify-center text-18px">
                            <div className="w-36px h-36px bg-blue-gray-200/50 flex items-center justify-center rounded-8px">
                                <PhoneFilled
                                    style={{
                                        color: '#515b78',
                                    }}
                                    className="transform rotate-y-180 text-20px leading-36px"
                                />
                            </div>
                            <span className="ml-8px">手机</span>
                            <span>:</span>
                            <span className="ml-8px text-blue-500 text-16px">
                                {user.data?.phone}
                            </span>
                        </div>
                        <div>
                            <Button
                                onClick={() => {
                                    setPhoneModificationModalVisible(true);
                                }}
                                icon={<EditOutlined />}
                                type="link"
                            >
                                更改
                            </Button>
                        </div>
                    </Row>
                </>
            )}
            <PhoneModificationModal
                visible={phoneModificationModalVisible}
                onClose={() => {
                    setPhoneModificationModalVisible(false);
                }}
            />
            <EmailModificationModal
                visible={emailModificationModalVisible}
                onClose={() => {
                    setEmailModificationModalVisible(false);
                }}
            />
        </Card>
    );
});
export default AccountBinding;
