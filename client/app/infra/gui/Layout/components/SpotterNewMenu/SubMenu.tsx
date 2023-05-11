import { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { SpotterLink } from '@client/app/components/SpotterLink';
import { useLocation } from 'react-router-dom';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { CreateSubMenuPayload, navigationMenuEventBus } from './navigationMenuEventBus';

const initState = {
    key: '',
    title: '',
    data: [],
    visible: false,
};

const SubMenu: FC = () => {
    const [{ key, title, data, visible }, setPayload] = useState<
        CreateSubMenuPayload & { visible: boolean }
    >(initState);
    const [showTopAnchor, setShowTopAnchor] = useState<boolean>(false);
    const [showBottomAnchor, setShowBottomAnchor] = useState<boolean>(false);
    const [subMenuTitleHeight, setSubMenuTitleHeight] = useState<number>(0);
    const subMenuTitleRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const subMenuTopAnchorIO = new IntersectionObserver((entries) =>
        setShowTopAnchor(entries[0].intersectionRatio <= 0),
    );
    const subMenuBottomAnchorIO = new IntersectionObserver((entries) =>
        setShowBottomAnchor(entries[0].intersectionRatio <= 0),
    );

    useEffect(() => {
        subMenuTitleRef?.current?.clientHeight &&
            setSubMenuTitleHeight(subMenuTitleRef?.current?.clientHeight);
    }, [visible]);

    useEffect(() => {
        subMenuTopAnchorIO.observe(document.querySelector('#subMenuTopAnchor') as HTMLElement);
        subMenuBottomAnchorIO.observe(
            document.querySelector('#subMenuBottomAnchor') as HTMLElement,
        );
        return () => {
            subMenuTopAnchorIO.disconnect();
            subMenuBottomAnchorIO.disconnect();
        };
    }, []);

    useEffect(() => {
        const createSubMenuHandler = (payload: CreateSubMenuPayload) => {
            setPayload({
                ...payload,
                visible: !!payload.data.length,
            });
        };
        const destroySubMenuHandler = () => {
            setPayload(initState);
        };
        navigationMenuEventBus.onCreateSubMenu(createSubMenuHandler);
        navigationMenuEventBus.onDestroySubMenu(destroySubMenuHandler);

        return () => {
            navigationMenuEventBus.offCreateSubMenu(createSubMenuHandler);
            navigationMenuEventBus.offDestroySubMenu(destroySubMenuHandler);
        };
    }, []);

    return (
        <div
            className={classNames('spotter-sub-menu-container', {
                hidden: !visible,
            })}
            onMouseEnter={() =>
                navigationMenuEventBus.changeSubMenuHoverStatus({ status: true, key })
            }
            onMouseLeave={() =>
                navigationMenuEventBus.changeSubMenuHoverStatus({ status: false, key })
            }
        >
            <div className="spotter-sub-menu-wrapper">
                <div className="sub-menu-title" ref={subMenuTitleRef}>
                    <div className="sub-menu-title-text">{title}</div>
                </div>
                <div
                    className="sub-menu-items-container"
                    style={{ height: `calc(100% - ${subMenuTitleHeight}px)` }}
                >
                    {showTopAnchor ? (
                        <div
                            className="spotter-menu-indicator spotter-menu-indicator-up"
                            style={{ ['--bg-color' as any]: '#fff', paddingTop: '6px' }}
                        >
                            <UpOutlined />
                        </div>
                    ) : null}
                    <div className="sub-menu-items">
                        <div id="subMenuTopAnchor" />
                        {data.map((item) => {
                            let active = false;
                            if (item?.children?.length) {
                                return (
                                    <div key={item.key} className="sub-menu-group">
                                        <div className="sub-menu-item sub-menu-group-title">
                                            <div className="sub-menu-item-text">{item.name}</div>
                                        </div>
                                        {item.children.map((child) => {
                                            active =
                                                decodeURIComponent(location.pathname) ===
                                                    child.url ||
                                                decodeURIComponent(location.pathname).startsWith(
                                                    child.url,
                                                );
                                            return (
                                                <SpotterLink
                                                    to={child.url ?? ''}
                                                    key={child.key}
                                                    type={child.type}
                                                    noStyle
                                                    className={`sub-menu-item ${
                                                        active ? 'sub-menu-item-active' : ''
                                                    }`}
                                                >
                                                    <div
                                                        className={`sub-menu-item-text ${
                                                            active
                                                                ? 'sub-menu-item-text-active'
                                                                : ''
                                                        }`}
                                                    >
                                                        {child.name}
                                                    </div>
                                                </SpotterLink>
                                            );
                                        })}
                                    </div>
                                );
                            }
                            active =
                                decodeURIComponent(location.pathname) === item.url ||
                                decodeURIComponent(location.pathname).startsWith(item.url);
                            return (
                                <SpotterLink
                                    to={item.url ?? ''}
                                    key={item.key}
                                    type={item.type}
                                    noStyle
                                    className={`sub-menu-item ${
                                        active ? 'sub-menu-item-active' : ''
                                    }`}
                                >
                                    <div
                                        className={`sub-menu-item-text ${
                                            active ? 'sub-menu-item-text-active' : ''
                                        }`}
                                    >
                                        {item.name}
                                    </div>
                                </SpotterLink>
                            );
                        })}
                        <div id="subMenuBottomAnchor" />
                    </div>
                    {showBottomAnchor ? (
                        <div
                            className="spotter-menu-indicator spotter-menu-indicator-down"
                            style={{ ['--bg-color' as any]: '#fff', paddingBottom: '6px' }}
                        >
                            <DownOutlined />
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default SubMenu;
