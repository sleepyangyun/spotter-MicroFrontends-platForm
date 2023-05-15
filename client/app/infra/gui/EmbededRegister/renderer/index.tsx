import { FC } from 'react';
import { NavigationRenderType } from '../const';
import { BiEmbedded } from '@app/infra/gui/EmbededRegister/renderer/BiEmbedded';

export const EmbeddedRenderer: FC<{
    type: Exclude<NavigationRenderType, 'default'>;
    data?: any;
}> = ({ type, data }) => {
    switch (type) {
        case 'bi-embedded': {
            return <BiEmbedded name={data?.name} id={data?.biDashboardId} />;
        }
        default: {
            return null;
        }
    }
};
