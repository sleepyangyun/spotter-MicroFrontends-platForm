import { Button, Result, Space } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export function PasswordModificationCompletion() {
    const navigate = useNavigate();
    return (
        <Result
            icon={<SmileOutlined />}
            title={<span className="flex justify-center items-center">密码已更新!</span>}
            extra={
                <Space size={24}>
                    <Button
                        size="large"
                        type="primary"
                        onClick={() => {
                            navigate('/login');
                        }}
                    >
                        进入登录界面
                    </Button>
                </Space>
            }
        />
    );
}
