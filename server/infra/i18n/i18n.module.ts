import {Module} from "@nestjs/common";
import {I18nController} from "@server/infra/i18n/i18n.controller";
import {I18nService} from "@server/infra/i18n/i18n.service";
import {NacosModule} from "@server/infra/nacos/nacos.module";

@Module({
    providers: [I18nService],
    imports: [NacosModule],
    controllers: [I18nController],
    exports: [I18nService]
})
export class I18nModule {
    
}