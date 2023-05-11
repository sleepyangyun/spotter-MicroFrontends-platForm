import { FC, useState } from 'react';
import loading from '@img/loading.svg';
import { useMount } from '@spotter/utils';

export const SuspenseLoading: FC = () => {
    const [visible, setVisible] = useState(false);
    useMount(() => {
        const timer = setTimeout(() => {
            setVisible(true);
            clearTimeout(timer);
        }, 100);
    });

    return visible ? (
        <div className="flex h-full justify-center items-center">
            <img alt="loading..." width="100px" src={loading} />
        </div>
    ) : null;
};
