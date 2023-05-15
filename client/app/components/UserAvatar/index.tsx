import { Avatar, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import { useStore } from '@app/store';
import { FC } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

interface UserAvatarProps {
    maxNameLength?: number;
    size?:
        | number
        | {
              height: number;
              width: number;
          };
    fontSize?: number | string;
    name?: string;
}

export const UserAvatar: FC<UserAvatarProps> = observer(
    ({ maxNameLength = 1, size = 32, fontSize, name }) => {
        const { user, loadWatchers } = useStore('global');
        return (
            <Avatar
                className="bg-primary-500"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'var(--primary-color)',
                    width: typeof size === 'number' ? size : size.width,
                    height: typeof size === 'number' ? size : size.height,
                    fontSize:
                        fontSize ??
                        Math.max(14, (typeof size === 'number' ? size : size.height) / 3),
                }}
                gap={16}
            >
                {loadWatchers(['user']) ? (
                    <Spin
                        indicator={<LoadingOutlined />}
                        spinning
                        style={{ color: '#fff', display: 'flex', alignItems: 'center' }}
                        size="small"
                    />
                ) : (
                    (name ?? user.data?.name)?.slice(
                        0,
                        Math.min(user.data?.name?.length ?? Number.MAX_SAFE_INTEGER, maxNameLength),
                    )
                )}
            </Avatar>
        );
    },
);
