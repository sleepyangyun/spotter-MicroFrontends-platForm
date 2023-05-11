import {Module} from "@nestjs/common";
import {NacosService} from "@server/infra/nacos/nacos.service";

@Module({
    providers: [NacosService],
    exports: [NacosService]
})
export class NacosModule {
    
}