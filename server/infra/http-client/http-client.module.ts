import {Global, Module} from '@nestjs/common';
import {VcSessionModule} from "@server/infra/vc-session/vc-session.module";
import { HttpClientService } from './http-client.service';

@Global()
@Module({
    imports: [VcSessionModule],
    providers: [HttpClientService],
    exports: [HttpClientService],
})
export class HttpClientModule {}
