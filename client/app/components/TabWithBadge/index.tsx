import { Badge, BadgeProps, Tabs, TabsProps } from 'antd';
import { observer } from 'mobx-react-lite';
import { FC, ReactNode, useMemo, useState } from 'react';
import { LabelWithNumber } from './LabelWithNumber';

export enum TabBadgeType {
    // 在一行内进行展示
    Inline,
    // 在右上角进行展示
    Corner,
}

export interface WithBadgeTabProps {
    key: string;
    label: string | ReactNode;
    children?: ReactNode;
    count?: number;
}

export interface TabWithBadgeProps extends TabsProps {
    items?: WithBadgeTabProps[];
    badgeType?: TabBadgeType;
    badgeProps?: BadgeProps;
}

/**
 * 带Badge的Tab菜单
 */
const TabWithBadge: FC<TabWithBadgeProps> = observer(
    ({ items, onChange, badgeType = TabBadgeType.Inline, badgeProps = {}, ...props }) => {
        const [current, setCurrent] = useState(props.activeKey ?? props.defaultActiveKey);

        const innerTabs: TabsProps['items'] = useMemo(
            () =>
                items?.map((item) => {
                    return {
                        label:
                            badgeType === TabBadgeType.Inline ? (
                                <LabelWithNumber
                                    active={item.key === current}
                                    label={item.label}
                                    count={item.count ?? 0}
                                />
                            ) : (
                                <Badge
                                    count={item.count}
                                    offset={[6, -6]}
                                    size={props.size === 'small' ? 'small' : 'default'}
                                    className="custom-tabs-with-badge"
                                    {...badgeProps}
                                >
                                    {item.label}
                                </Badge>
                            ),
                        key: item.key,
                        children: item.children,
                    };
                }),
            [items, current],
        );

        return (
            <Tabs
                items={innerTabs}
                onChange={(activeKey) => {
                    setCurrent(activeKey);
                    onChange?.(activeKey);
                }}
                {...props}
            />
        );
    },
);

export default TabWithBadge;
