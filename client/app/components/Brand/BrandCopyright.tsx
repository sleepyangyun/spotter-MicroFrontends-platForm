import { FC } from 'react';
import { BrandFull } from '@app/components/Brand/BrandFull';
import { Divider } from 'antd';

export const BrandCopyright: FC = () => (
    <div className="flex flex-col items-center justify-center w-full fixed bottom-12px text-center  text-gray-500/45 z-auto">
        <div className="flex items-center mb-18px">
            <span className="mr-9px text-gray-600/60">Powered By</span>
            <BrandFull
                logoProps={{ className: 'h-20px' }}
                nameProps={{
                    className: 'h-10px',
                }}
            />
        </div>
        <span className="flex justify-center items-baseline">
            Copyright © Since 2022 Spotterio.com, Inc. and its affiliates. All Rights Reserved.
            <Divider type="vertical" />
            <a
                className="text-gray-600/60 text-12px"
                target="_blank"
                rel="noopener noreferrer"
                href="https://beian.miit.gov.cn"
            >
                粤ICP备2022005977号
            </a>
        </span>
    </div>
);
