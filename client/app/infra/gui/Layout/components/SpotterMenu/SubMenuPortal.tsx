import { FC, useEffect, useState } from 'react';
import {
    CreateSubMenuPayload,
    navigationMenuEventBus,
} from '@app/infra/gui/Layout/components/SpotterMenu/navigationMenuEventBus';
import classNames from 'classnames';
import { SpotterLink } from '@app/components/SpotterLink';

const initState = {
    data: [],
    title: '',
    position: {
        x: 0,
        y: 0,
    },
    visible: false,
};

const expectRange = (
    target: number,
    /**
     * 预期范围，目标值不会超过给定的边界值
     * [最小值，最大值]
     */
    range: [number, number],
) => Math.min(Math.max(target, range[0]), range[1]);

/**
 * 计算逻辑
 * title(40px) + 底部透明防滑区(12px) + length(子导航数量) * 36px(子导航高度)
 * @param length
 */
const getSubMenuHeight = (length: number) => Math.min(52 + length * 36, window.innerHeight);

export const SubMenuPortal: FC = () => {
    const [{ title, data, position, visible }, setPayload] = useState<
        CreateSubMenuPayload & { visible: boolean }
    >(initState);

    useEffect(() => {
        const createSubMenuHandler = (payload: CreateSubMenuPayload) => {
            setPayload({
                ...payload,
                visible: !!payload.data.length,
                position: {
                    ...payload.position,
                    /**
                     * 子导航的显示显示范围应该在视窗之内
                     *  - 对于顶部，y 轴最小值应 >= 0
                     *  - 对于底部，y 轴最大值应该 <= viewHeight - subMenuHeight
                     */
                    y: expectRange(payload.position.y, [
                        0,
                        window.innerHeight - getSubMenuHeight(payload.data.length),
                    ]),
                },
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
            className={classNames('absolute pb-12px spotter-sub-menu -top-40px left-72px z-999', {
                flex: visible,
                hidden: !visible,
            })}
            style={{
                left: position.x,
                top: position.y,
            }}
        >
            <div
                className="flex flex-col min-w-144px max-h-screen overflow-y-auto"
                style={{
                    background: '#F6F8FC',
                    height: 'max-content',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.12)',
                }}
            >
                <div className="leading-22px text-16px font-bold px-12px pt-13px pb-5px">
                    {title}
                </div>
                <div className="flex flex-col flex-grow text-14px leading-22px">
                    {data.map((i) => (
                        <SpotterLink
                            className="spotter-sub-menu-item py-7px px-12px"
                            to={i.url ?? ''}
                            key={i.key}
                            type={i.type}
                        >
                            <div className="whitespace-nowrap" style={{ color: '#1E1E1E' }}>
                                {i.name}
                            </div>
                        </SpotterLink>
                    ))}
                </div>
            </div>
        </div>
    );
};
