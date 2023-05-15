import { registerMicroApps, RegistrableApp } from 'qiankun';

registerMicroApps([
    {
        name: 'micro', // 微应用名称
        entry: 'http://locale.spotterio.com:3000/', // 微应用访问地址
        container: '', // 上一步设置的微应用容器节点id
        activeRule: '', // 触发渲染的路由
    },
]);

interface MicroAppInterface {
    name: string;
    entry: string;
    container: string;
    activeRule: string;
}

function registerMicroAppsList(list: MicroAppInterface[]) {
    registerMicroApps(list);
}
