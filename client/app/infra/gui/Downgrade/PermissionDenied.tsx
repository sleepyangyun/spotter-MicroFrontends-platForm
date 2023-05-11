import { useNavigate } from 'react-router-dom';
import { useSt } from '@spotter/i18n-sdk';
import permissionDenied from '@img/403.svg';
import { Button } from 'antd';

export const PermissionDenied = () => {
    const navigate = useNavigate();
    const t = useSt();
    return (
        <div className="h-full p-24px">
            <div className="h-full bg-white">
                <div className="mx-auto pt-100px text-center">
                    <img className="mx-auto" src={permissionDenied} alt="Server Error" />
                    <div className="text-16px mb-12px font-bold leading-24px">
                        {t('infra.downgrade_permission_denied_title')}
                    </div>
                    <div className="leading-24px text-gray-400">
                        {t('infra.downgrade_permission_denied_help')}
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
