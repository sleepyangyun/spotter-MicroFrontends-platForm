import { message } from 'antd';
import { EnableScope, proxy, getAppBootData } from '@spotter/utils';
import { userSdk } from '@app/services/v2/auth/user';

const AuthErrorCode = new Set([4_010_004]);
const handleLogout = async () => {
    const { data: res } = await userSdk.logout();
    if (res.data) {
        setTimeout(() => window.location.assign('/login'), 2000);
    }
};
export function boostrapNetProxy() {
    // 网络代理
    proxy({
        enableScope: [EnableScope.XHR, EnableScope.FETCH],
        async beforeRequest(config) {
            // 走 api 网关的请求统一加入 app header
            if (config.url.startsWith(getAppBootData('app').apiUrl)) {
                config.headers['x-app'] = getAppBootData('app').code;
                getAppBootData('app').apiTag &&
                    (config.headers['x-tag-header'] = getAppBootData('app').apiTag!);
            }
            return config;
        },
        async afterResponse(config) {
            let data;
            try {
                data = JSON.parse(config.response);
            } catch {}
            if ( AuthErrorCode.has(data?.code)) {
                handleLogout();
            }
            if (
                config?.config?.url?.startsWith(getAppBootData('app').apiUrl) &&
                config.status === 403
            ) {
                message.error('无执行权限!');
            }
            return config;
        },
    });
}
