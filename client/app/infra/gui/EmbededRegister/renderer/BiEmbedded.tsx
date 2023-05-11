import { pathJoin, useMount } from '@spotter/utils';
import { applicationBootData } from '@app/utils/const';
import { FC, ReactNode, useState } from 'react';
import { PageContainer } from '@client/app/components/PageContainer';

interface BiEmbeddedProps {
    name: string;
    id: string;
    topSection?: ReactNode;
}
export const BiEmbedded: FC<BiEmbeddedProps> = ({ name, id, topSection }) => {
    const [link, setLink] = useState('');

    useMount(() => {
        fetch(
            new URL(
                pathJoin(applicationBootData!.app!.biUrl, 'get-url', id),
                window.location.origin,
            ).toString(),
        )
            .then((response) => response.text())
            .then((url) => {
                setLink(url);
            })
            .catch((error) => {
                console.error(error);
            });
    });

    return (
        <PageContainer fitContainer title={name}>
            {topSection}
            <iframe title={name} className="w-full h-full" src={link} />
        </PageContainer>
    );
};
