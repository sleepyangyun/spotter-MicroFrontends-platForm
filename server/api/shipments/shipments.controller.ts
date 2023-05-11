import { Controller, Param, Query, RequestMapping, Headers,  RequestMethod, Res} from "@nestjs/common";
import {Response} from "express";
import {ShipmentsServiceImpl} from "./shipments.service";
import {Identifier} from "../../util/types";

// import {createWriteStream} from "fs";

@Controller('/api/v1/amazon/vc/orders/shipments')
export class ShipmentsController {
    constructor(private shipmentsServiceImpl: ShipmentsServiceImpl) {
    }

    @RequestMapping({path: '/list', method: RequestMethod.GET})
    async getArnAsnMapList(
        @Query('keyword') keyword: string,
        @Query('lookbackDays') lookbackDays: string,
        @Query('pageSize') pageSize: string,
        @Query('pageNum') pageNum: string,
        @Headers('VC-Session-Data-Id') vcSessionDataId: string
    ) {

        return  this.shipmentsServiceImpl.searchShipmentsByArn({
            keyword,
            lookbackDays,
            pageSize,
            pageNum
        },vcSessionDataId)
    }

    @RequestMapping({path: '/:arn/carton-labels/pdf', method: RequestMethod.GET})
    async downloadShipmentsCartonLabelsPDFByARN(
        @Param('arn') arn: Identifier,
        @Res() res: Response,
        @Headers('VC-Session-Data-Id') vcSessionDataId: string
    ) {
        const pdf = await this.shipmentsServiceImpl.downloadShipmentCartonLabelsPDF(arn, vcSessionDataId);
        pdf.on('response', (res) => {
            res.caseless.set('content-disposition', `attachment;filename="${arn}.pdf"`)
            res.caseless.set('Access-Control-Expose-Headers', 'content-disposition')
        })
        pdf.pipe(res)
    }

    @RequestMapping({path: '/:arn/shipping-labels/pdf', method: RequestMethod.GET})
    async downloadShippingLabelByARN(
        @Param('arn') arn: Identifier,
        @Res() res: Response,
        @Headers('VC-Session-Data-Id') vcSessionDataId: string
    ) {
        const pdf = await this.shipmentsServiceImpl.downloadShipmentShippingLabelsPDF(arn, vcSessionDataId)
        pdf.on('response', (res) => {
            res.caseless.set('Access-Control-Expose-Headers', 'content-disposition')
        })
        pdf.pipe(res)
    }

    @RequestMapping({path: '/:arn/bof/pdf', method: RequestMethod.GET})
    async downloadBOFByARN(
        @Param('arn') arn: Identifier,
        @Res() res: Response,
        @Headers('VC-Session-Data-Id') vcSessionDataId: string
    ) {
        const pdf = await this.shipmentsServiceImpl.downloadShipmentBOFPDF(arn, vcSessionDataId)
        pdf.on('response', (res) => {
            res.caseless.set('Access-Control-Expose-Headers', 'content-disposition')
        })
        pdf.pipe(res)

    }
}
