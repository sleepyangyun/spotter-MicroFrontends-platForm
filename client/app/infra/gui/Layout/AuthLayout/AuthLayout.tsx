import { FC } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { BrandFull } from '@app/components/Brand/BrandFull';
import { BrandCopyright } from '@app/components/Brand';
import { LangSelector } from '@app/infra/gui/Layout/components/SpotterHeader/LangSelector';
import { useMount } from '@spotter/utils';
import '@client/style/star-sky.css';
import { useValidate } from '@client/app/utils/hooks';

export const AuthLayout: FC = () => {
    const navigate = useNavigate();
    const validate = useValidate();

    useMount(() => {
        validate
            .get()
            .then(({ data: res }) => {
                if (res) {
                    navigate('/');
                }
            })
            .catch((error: Error) => {
                console.log(error);
            });
    });
    return (
        <div className="flex h-full overflow-x-auto overflow-y-hidden">
            <div
                style={{
                    // maxWidth: '550px',
                    background: 'linear-gradient(163.85deg,#1d2129,#00308f)',
                }}
                className="max-550px min-300px flex-auto  flex-col items-start h-full"
            >
                <div id="stars" />
                <div id="stars2" />
                <div id="stars3" />
                <Link to="/login">
                    <BrandFull
                        containerProps={{
                            className: 'fixed top-24px left-24px',
                        }}
                        logoProps={{
                            className: 'h-36px',
                        }}
                        nameProps={{
                            className: 'ml-12px h-16px',
                            color: '#fff',
                        }}
                    />
                </Link>
            </div>
            <div
                className="min-w-min overflow-auto flex-auto transform translate-x-0"
                style={{ background: '#FFF' }}
            >
                <div className="flex justify-end  fixed top-0 w-full py-12px px-24px">
                    <LangSelector />
                </div>
                <div className="h-full flex flex-col justify-center item-center">
                    <div style={{ background: '#fff' }} className="z-1">
                        <Outlet />
                    </div>
                </div>
                <BrandCopyright />
            </div>
        </div>
    );
};
