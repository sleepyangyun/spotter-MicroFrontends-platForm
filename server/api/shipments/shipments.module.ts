import {Module} from '@nestjs/common';
import {ShipmentsController} from "./shipments.controller";
import {ShipmentsServiceImpl} from "./shipments.service";

@Module({
    controllers: [ShipmentsController],
    providers: [ShipmentsServiceImpl],
})
export class ShipmentsModule {
}
