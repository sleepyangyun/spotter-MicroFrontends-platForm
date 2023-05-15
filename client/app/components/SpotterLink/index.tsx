import { CSSProperties, FC } from 'react';
import classNames from 'classnames';
import { Link as CheapLink } from 'react-router-dom';
import { Typography } from 'antd';

/**
 *
 * default: 更好的性能表现，使用轻量的路由切换， 基于 react-router 的 history 模式.
 * new: 新建页签，等同于 target: '_blank', target 详见 https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target
 * replace: 跳转并刷新当前页面，等同于 target: '_self'
 */
export type SpotterNavigationRouteType = 'default' | 'new' | 'replace';

const { Link: ExpensiveLink } = Typography;

export interface SpotterLinkProps {
    className?: string;
    /**
     * 如果不传入 type，会基于 to 参数来动态判断 type。
     *  to 是否 http:// 或者 https:// 开头时，
     *  是，则认为跳转到的是完整的 url，打开新页面跳转，type 等于 'new'
     *  否，则认为跳转到的当前网站的功能，默认 type 等于 'default'
     */
    type?: SpotterNavigationRouteType;
    to: URL | string;
    // 移除链接所有的自带样式
    noStyle?: boolean;
}

export const SpotterLink: FC<SpotterLinkProps> = ({ children, className, type, to, noStyle }) => {
    if (!type && to.toString().startsWith('http')) {
        type = 'new';
    }

    const _c = classNames('spotter-link', className);

    const style: CSSProperties = noStyle
        ? {
              color: 'inherit',
          }
        : {};

    switch (type) {
        case 'new': {
            return (
                <ExpensiveLink className={_c} style={style} href={to as string} target="_blank">
                    {children}
                </ExpensiveLink>
            );
        }
        case 'replace': {
            return (
                <ExpensiveLink className={_c} style={style} href={to as string} target="_self">
                    {children}
                </ExpensiveLink>
            );
        }

        default: {
            return (
                <CheapLink className={_c} style={style} to={to}>
                    {children}
                </CheapLink>
            );
        }
    }
};
