import { Injectable } from '@nestjs/common';
import { NacosConfigClient, DataClient } from 'nacos';
import { SettingService } from '@server/infra/setting/setting.service';
import { SettingSection } from '@server/infra/setting/setting.constants';

@Injectable()
export class NacosService {
    private readonly configClient: DataClient;
    constructor(private settingService: SettingService) {
        const { configClient } = this.settingService.get(SettingSection.NACOS);
        this.configClient = new NacosConfigClient.DataClient({
            serverAddr: configClient.serverAddr,
        });
    }
    async getConfig(...params: Parameters<NacosConfigClient['getConfig']>) {
        return this.configClient.getConfig(...params);
    }

    async subscribe(...params: Parameters<NacosConfigClient['subscribe']>) {
        this.configClient.subscribe(...params);
    }

    getConfigClient() {
        return this.configClient;
    }
}
