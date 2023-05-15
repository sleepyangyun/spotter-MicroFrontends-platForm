import { Spin, TabPaneProps, Typography } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import { FC, ReactElement, ReactNode, useEffect, useMemo, useState } from 'react';
import { pathJoin } from '@spotter/utils';
import classNames from 'classnames';
import { SpotterLink } from '@app/components/SpotterLink';
import TabWithBadge, { TabBadgeType } from '../TabWithBadge';

const { Text } = Typography;

export interface PageContainerProps {
    title?: ReactNode;
    subTitle?: ReactNode;
    tabs?: (TabPaneProps & { count?: number })[];
    tabBadgeType?: TabBadgeType;
    basePath?: string;
    extra?: ReactElement;
    action?: ReactNode;
    loading?: boolean;
    topSection?: ReactNode;
    // Tab 导航模式
    tabNavigationMode?: boolean;
    onTabChange?: (activeTabKey: string) => void;
    // 内容的布局适配容器
    fitContainer?: boolean;
    /** 自动默认tab key */
    autoDefaultTabKey?: boolean;
}

export const PageContainer: FC<PageContainerProps> = ({
    title,
    subTitle,
    tabs = [],
    tabBadgeType = TabBadgeType.Corner,
    basePath = '',
    topSection,
    children = <Outlet />,
    extra,
    action,
    loading = false,
    tabNavigationMode = true,
    autoDefaultTabKey = true,
    fitContainer = false,
    onTabChange,
}) => {
    const innerTabs = useMemo(
        () =>
            tabs?.map((p) => ({
                // ...p,
                label: p.tab,
                key: tabNavigationMode ? pathJoin(basePath, p.tabKey as string) : p.tabKey,
                count: p?.count,
            })) as any[],
        [basePath, tabs, tabNavigationMode],
    );
    const location = useLocation();
    const [activeKey, setActiveKey] = useState(
        tabNavigationMode ? location.pathname : innerTabs[0]?.key ?? undefined,
    );

    useEffect(() => {
        if (tabNavigationMode && location.pathname !== pathJoin('/', basePath)) {
            setActiveKey(location.pathname);
        } else {
            autoDefaultTabKey && innerTabs.length && setActiveKey(innerTabs[0].key);
        }
    }, [location.pathname, tabNavigationMode, innerTabs]);

    useEffect(() => {
        onTabChange && onTabChange(activeKey!);
    }, [activeKey]);
    return (
        <div
            className={classNames(
                {
                    'with-tabs': tabs?.length,
                    'fit-container': fitContainer,
                    'tab-navigation-mode': tabNavigationMode,
                },
                'spotter-page-container',
            )}
        >
            {topSection}
            {(title || subTitle || action || extra || innerTabs?.length > 0) && (
                <div className="spotter-page-container-title mt-16px">
                    {(title || subTitle || action) && (
                        <div className="flex items-start mb-8px">
                            <div className="flex flex-col flex-1 flex-grow h-full justify-center w-0">
                                <Text
                                    style={{ verticalAlign: 'middle', overflow: 'hidden' }}
                                    className="flex-grow !text-24px leading-32px min-h-32px whitespace-normal break-words"
                                    ellipsis={{
                                        tooltip: title,
                                    }}
                                >
                                    {title}
                                </Text>
                                {subTitle ? (
                                    <div className="flex-grow flex-1 text-gray-500 mt-8px">
                                        {subTitle}
                                    </div>
                                ) : null}
                            </div>
                            <div className="flex items-center justify-center ml-24px">{action}</div>
                        </div>
                    )}
                    {extra}
                    {innerTabs?.length ? (
                        <TabWithBadge
                            activeKey={activeKey}
                            size="large"
                            onChange={(key) => {
                                setActiveKey(key);
                            }}
                            items={innerTabs.map((props, i) => ({
                                label: tabNavigationMode ? (
                                    <SpotterLink noStyle to={props.key}>
                                        {tabs[i].tab}
                                    </SpotterLink>
                                ) : (
                                    tabs[i].tab
                                ),
                                key: tabNavigationMode ? props.key : (tabs[i].tabKey as string),
                                count: props?.count,
                            }))}
                            badgeType={tabBadgeType}
                            badgeProps={{
                                offset: [6, 10],
                            }}
                        />
                    ) : null}
                </div>
            )}

            <Spin style={{ height: '' }} spinning={loading}>
                {children}
            </Spin>
        </div>
    );
};
