import { useNavigate } from 'react-router-dom';
import { useSt } from '@spotter/i18n-sdk';
import { Button } from 'antd';
import serverError from '@img/500.svg';

export const ServerError = () => {
    const navigate = useNavigate();
    const t = useSt();
    return (
        <div className="h-full p-24px">
            <div className="h-full bg-white">
                <div className="mx-auto pt-100px text-center">
                    <img className="mx-auto" src={serverError} alt="Server Error" />
                    <div className="text-16px mb-12px font-bold leading-24px">
                        {t('infra.downgrade_server_error_title')}
                    </div>
                    <div className="leading-24px text-gray-400">
                        {t('infra.downgrade_server_error_help')}
                    </div>
                    <Button
                        className="mt-24px"
                        type="primary"
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        {t('infra.back_home')}
                    </Button>
                </div>
            </div>
        </div>
    );
};
