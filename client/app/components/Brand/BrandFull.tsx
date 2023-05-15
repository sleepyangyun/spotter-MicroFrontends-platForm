import { FC, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { BrandName } from './BrandName';
import { BrandLogo } from './BrandLogo';

interface BrandFullProps {
    containerProps?: HTMLAttributes<HTMLDivElement>;
    logoProps?: HTMLAttributes<HTMLDivElement>;
    nameProps?: HTMLAttributes<HTMLDivElement>;
}
export const BrandFull: FC<BrandFullProps> = ({ containerProps, logoProps, nameProps }) => (
    <div {...containerProps} className={classNames('flex items-center', containerProps?.className)}>
        <BrandLogo {...logoProps} className={classNames('mr-6px', logoProps?.className)} />
        <BrandName {...nameProps} className={classNames(nameProps?.className)} />
    </div>
);
