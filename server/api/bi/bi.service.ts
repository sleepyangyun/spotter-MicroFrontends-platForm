import { Injectable } from '@nestjs/common';
import { SettingSection } from '@server/infra/setting/setting.constants';
import { SettingService } from '@server/infra/setting/setting.service';
import jwt from 'jsonwebtoken';
import { NacosService } from '@server/infra/nacos/nacos.service';
import { LoggerService } from '@server/infra/logger/logger.service';

@Injectable()
export class BiServiceImpl {
    constructor(
        private settings: SettingService,
        private nacosService: NacosService,
        private loggerService: LoggerService,
    ) {
        const { configClient } = this.settings.get(SettingSection.NACOS);
        this.nacosService.subscribe({ ...configClient.bi }, () => {
            this.loggerService.log('Gmesh Bi Nacos Config Updated');
        });
    }

    async generateUrl(id: string) {
        const { configClient } = this.settings.get(SettingSection.NACOS);
        try {
            const { metabaseSiteUrl, metabaseSecretKey } = JSON.parse(
                await this.nacosService.getConfig(configClient.bi.dataId, configClient.bi.group),
            );
            const payload = {
                resource: { dashboard: +id },
                params: {},
                exp: Math.round(Date.now() / 1000) + 60 * 60, // 10 minute expiration
            };
            const token = jwt.sign(payload, metabaseSecretKey);
            return `${metabaseSiteUrl}/embed/dashboard/${token}#bordered=false&titled=false`;
        } catch (error) {
            this.loggerService.error(error);
            return {
                message: '无效的 Nacos 配置项',
                status: '500',
            };
        }
    }

    async getTabs() {
        const { configClient } = this.settings.get(SettingSection.NACOS);
        try {
            const { tabs } = JSON.parse(
                await this.nacosService.getConfig(configClient.bi.dataId, configClient.bi.group),
            );
            return tabs;
        } catch (error) {
            this.loggerService.error(error);
            return {
                message: '无效的 Nacos 配置项',
                code: '500',
                status: 'failed',
            };
        }
    }
}
