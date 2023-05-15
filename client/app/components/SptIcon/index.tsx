import { FC, CSSProperties } from 'react';
import classNames from 'classnames';

interface SptIconProps {
    type: string;
    size?: CSSProperties['fontSize'];
    color?: string;
    className?: string;
}

export const SptIcon: FC<SptIconProps> = ({ type, size, color, className }) => (
    <i
        style={{
            fontSize: size,
            lineHeight: size,
            color,
        }}
        className={classNames('sptfont', type, className)}
    />
);
