import { Controller, RequestMapping, RequestMethod } from '@nestjs/common';
import { VcSessionService } from './vc-session.service';
import { ResponseResult } from '@server/util/common';

@Controller('/api/v1/amazon/vc')
export class VcSessionController {
    constructor(private vcSessionService: VcSessionService) {}
    @RequestMapping({ path: '/account/pool', method: RequestMethod.GET })
    async getAccountPool() {
        return ResponseResult({ data: await this.vcSessionService.getAccountPool() });
    }
}
