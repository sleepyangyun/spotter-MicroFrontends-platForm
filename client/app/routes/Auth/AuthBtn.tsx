import { useStore } from '@client/app/store';
import { FC } from 'react';

export const AuthBtn: FC<{ authId: string }> = ({ authId, children }) => {
    const permits = useStore('global')?.permits.data ?? [];
    const show = permits.some((e: any) => e.code === authId);

    return show ? <div>{children}</div> : <div />;
};
