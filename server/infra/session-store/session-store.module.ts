import {Global, Module} from "@nestjs/common";
import {SessionStoreService} from "@server/infra/session-store/session-store.service";

@Global()
@Module({
    providers: [SessionStoreService],
    exports: [SessionStoreService],
})
export class SessionStoreModule{
    
}