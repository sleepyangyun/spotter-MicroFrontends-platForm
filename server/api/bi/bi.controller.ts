import { Controller, Param, RequestMapping, RequestMethod } from '@nestjs/common';
import { BiServiceImpl } from './bi.service';

@Controller('/api/v1/biurl')
export class BiController {
    constructor(private readonly biurlService: BiServiceImpl) {}

    @RequestMapping({ path: '/get-url/:id', method: RequestMethod.GET })
    async getUrl(@Param('id') id: string) {
        return this.biurlService.generateUrl(id);
    }

    @RequestMapping({ path: '/get-tabs', method: RequestMethod.GET })
    async getTabs() {
        return this.biurlService.getTabs();
    }
}
