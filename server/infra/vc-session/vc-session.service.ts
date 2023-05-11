import {Injectable} from "@nestjs/common";
import {NacosService} from "../nacos/nacos.service";
import {SettingService} from "../setting/setting.service";
import {SettingSection} from "../setting/setting.constants";
import {LoggerService} from "../logger/logger.service";
import {VcAccount} from "./vc-session.interface";

@Injectable()
export class VcSessionService{
    constructor(private nacos: NacosService, private settingService: SettingService, private logger: LoggerService) {
        this.init()
    }

    private async init(){
        await this.subscribeAccountPoolUpdating()
        const accountPool = await this.getAccountPool()
        await this.subscribeSessionPoolUpdating(accountPool)
    }

    async getAccountPool(): Promise<VcAccount[]> {
        const { configClient } = this.settingService.get(SettingSection.NACOS);
        const accountPoolString = await this.nacos.getConfig(configClient.vcAccountPoolDataId, configClient.vcSessionGroup);
        return  JSON.parse(accountPoolString)
    }

    async getSessionList(sessionDataId: string):Promise<Record<string, string>[]>{
        const { configClient } = this.settingService.get(SettingSection.NACOS);
        const accountPoolString = await this.nacos.getConfig(sessionDataId, configClient.vcSessionGroup);
        return  JSON.parse(accountPoolString)
    }


    private async subscribeAccountPoolUpdating(){
        const { configClient } = this.settingService.get(SettingSection.NACOS);
        try {
            await this.nacos.subscribe(
                {
                    dataId: configClient.vcAccountPoolDataId,
                    group: configClient.vcSessionGroup,
                },
                (data: any) => {
                    this.logger.log(`account pool updated ${data}`,);
                },
            );
        } catch (error: any) {
            this.logger.error(
                'VcSessionService init failed! Because fail to subscript account pool configuration from nacos, please make sure nacos section setting is correct and nacos is working.',
                error,
            );
        }
    }


    private async subscribeSessionPoolUpdating(accountPool: VcAccount[]){
        const { configClient } = this.settingService.get(SettingSection.NACOS);
        try {
            await Promise.all(
                accountPool.map((ac) => {
                    return this.nacos.subscribe(
                        {
                            dataId: ac.sessionDataId,
                            group: configClient.vcSessionGroup,
                        },
                        () => {
                            this.logger.log(`Account session[${ac.sessionDataId}] updated.`);
                        },
                    );
                }),
            );
        } catch (error: any) {
            this.logger.error(
                'VcSessionService init failed! Because fail to subscript session configuration from nacos, please make sure nacos section setting is correct and nacos is working.',
                error,
            );
        }
    }

}