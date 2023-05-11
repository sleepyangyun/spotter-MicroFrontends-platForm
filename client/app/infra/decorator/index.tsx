import { FC, ReactElement } from 'react';
// import { useNetworkDecorator } from './useNetworkDecorator';
import { useNetworkDecorator, useCompatibleDecorator } from '@spotter/utils';
import { Button, message } from 'antd';
import { useSt } from '@spotter/i18n-sdk';

const OFFLINE_HELP_MESSAGE = 'OFFLINE_HELP_MESSAGE';
export const SpotterAppDecorator: FC<{ children: ReactElement }> = ({ children }) => {
    const t = useSt();
    useCompatibleDecorator({
        onUnsupported: () => message.warning(t('common.supported_browser_tip'), 5),
    });
    useNetworkDecorator({
        onNetworkChange: (isOnline: boolean) => {
            if (!isOnline) {
                message.error({
                    content: (
                        <span className="leading-16px flex items-center">
                            <span className="mr-12px">{t('infra.network_goes_offline_tips')}</span>
                            <Button
                                style={{
                                    padding: 6,
                                }}
                                onClick={() => {
                                    message.destroy(OFFLINE_HELP_MESSAGE);
                                }}
                                type="link"
                            >
                                {t('common.action_close')}
                            </Button>
                        </span>
                    ),
                    duration: 0,
                    key: OFFLINE_HELP_MESSAGE,
                });
            } else {
                message.destroy(OFFLINE_HELP_MESSAGE);
            }
        },
    });
    return children;
};
