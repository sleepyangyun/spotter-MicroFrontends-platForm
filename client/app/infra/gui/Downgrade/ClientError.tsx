import { FC, useState } from 'react';
import { Button, Result } from 'antd';
import { useSt } from '@spotter/i18n-sdk';

export interface ClientErrorProps {
    error?: Error;
}

export const ClientError: FC<ClientErrorProps> = ({ error }) => {
    const t = useSt();
    const [openDetail, setOpenDetail] = useState<boolean>(false);
    return (
        <div className="h-full">
            <div className="overflow-auto h-full flex flex-col box-border justify-between bg-white">
                <Result
                    title={t('infra.downgrade_client_crashed_title')}
                    subTitle={
                        openDetail ? (
                            error?.message
                        ) : (
                            <a
                                onClick={() => {
                                    setOpenDetail(true);
                                }}
                            >
                                {t('common.detail')}
                            </a>
                        )
                    }
                    status="500"
                    extra={
                        <Button type="primary" href="/">
                            {t('infra.back_home')}
                        </Button>
                    }
                />
            </div>
        </div>
    );
};
