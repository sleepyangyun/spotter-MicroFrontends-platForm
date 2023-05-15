import { FC } from 'react';
import { Result, Button, Space } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export const RegistrationCompletion: FC = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Result
                icon={<SmileOutlined />}
                title={
                    <span className="flex justify-center items-center">很好，欢迎加入Spotter!</span>
                }
                extra={
                    <Space size={24}>
                        <Button
                            size="large"
                            type="primary"
                            onClick={() => {
                                navigate('/login');
                            }}
                        >
                            开始
                        </Button>
                    </Space>
                }
            />
        </div>
    );
};
