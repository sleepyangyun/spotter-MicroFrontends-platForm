import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import notFound from '@img/404.svg';
import { useSt } from '@spotter/i18n-sdk';

// 应用无法匹配到浏览器当前路由时降级页面
export const NotFound = () => {
    const navigate = useNavigate();
    const t = useSt();
    return (
        <div className="h-full p-24px">
            <div className="h-full bg-white">
                <div className="mx-auto pt-100px text-center">
                    <img className="mx-auto" src={notFound} alt="Not Found" />
                    <div className="text-16px mb-12px font-bold leading-24px">
                        {t('infra.downgrade_not_found_title')}
                    </div>
                    <div className="leading-24px text-gray-400">
                        {t('infra.downgrade_not_found_help')}
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
