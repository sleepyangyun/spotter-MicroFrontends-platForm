import {Module} from "@nestjs/common";
import {VcSessionService} from "./vc-session.service";
import {NacosModule} from "@server/infra/nacos/nacos.module";
import {VcSessionController} from "@server/infra/vc-session/vc-session.controller";

@Module({
    imports:[NacosModule],
    providers:[VcSessionService],
    controllers: [VcSessionController],
    exports:[VcSessionService]
})
export class VcSessionModule{
}