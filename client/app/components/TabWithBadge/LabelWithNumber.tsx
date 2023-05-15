import { Badge } from 'antd';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

export interface LabelWithNumberProps {
    label?: React.ReactNode;
    count?: number;
    // It will disappear when the default badge number is zero.
    // if alwaysShowCount is true, the default badge number will not.
    showBadge?: boolean;
    active?: boolean;
    showZero?: boolean;
}

export const LabelWithNumber: FC<LabelWithNumberProps> = observer(
    ({ label, count = 0, showBadge = true, active = false, showZero = false }) => (
        <div className="flex items-center">
            <div>{label}</div>
            {showBadge && count > 0 ? (
                <Badge
                    count={count}
                    showZero={showZero}
                    color="#F0F5FF"
                    style={{
                        marginLeft: '5px',
                        color: active ? 'var(--primary-color)' : 'rgba(0,0,0, 0.45)',
                    }}
                />
            ) : null}
        </div>
    ),
);
