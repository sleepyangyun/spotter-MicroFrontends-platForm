import {Injectable,} from "@nestjs/common";
import {HttpClientService} from "@server/infra/http-client/http-client.service";
import {SettingSection} from "@server/infra/setting/setting.constants";
import {SettingService} from "@server/infra/setting/setting.service";
import {getJoinedUrl} from "@server/util/common";


@Injectable()
export class ShipmentsServiceImpl {
    constructor(private httpClient: HttpClientService, private settings: SettingService) {
    }

    async searchShipmentsByArn(options: { keyword?: string, lookbackDays?: string, pageNum?: string, pageSize?: string }, sessionDataId: string,) {
        const {amazon} = this.settings.get(SettingSection.SERVICE)
        const url = getJoinedUrl(amazon.serviceUrl, '/hz/vendor/members/shipment-mgr/resource/searchShipments')
        url.searchParams.append('keyword', options.keyword ?? '')
        url.searchParams.append('lookbackDays', options.lookbackDays ?? '365')
        url.searchParams.append('pageNum', options.pageNum ?? '0')
        url.searchParams.append('pageSize', options.pageSize ?? '25')

        return new Promise( (resolve, reject) => {
            return this.httpClient.steamRequest(sessionDataId,{
                url: url.href,
                method: 'GET'
            }, (error, response) => {
                error && reject(error);
                resolve(response?.body)
            })
        })
    }

    async downloadShipmentCartonLabelsPDF(arn: string,sessionDataId: string) {
        const shipment = JSON.parse(await this.searchShipmentsByArn({keyword: arn}, sessionDataId) as any)
        const {amazon} = this.settings.get(SettingSection.SERVICE)
        const url = getJoinedUrl(amazon.serviceUrl, '/hz/vendor/members/shipment-mgr/resource/action/shipments-label-data')
        url.searchParams.append('shipmentId', shipment?.shipmentResults[0]?.asnId)
        url.searchParams.append('shipmentType', 'asn')
        url.searchParams.append('outputType', 'pdf')
        return this.httpClient.steamRequest(sessionDataId,{
            method: 'GET',
            url: url.href,
        }, (error) => {
            error && console.error(error)
        })
    }

    async downloadShipmentShippingLabelsPDF(arn: string, sessionDataId: string) {
        const {amazon} = this.settings.get(SettingSection.SERVICE)
        const url = getJoinedUrl(amazon.serviceUrl, '/hz/vendor/members/shipment-mgr/resource/action/printsplabel')
        url.searchParams.append('shipmentId', arn)
        url.searchParams.append('scac', 'UPSN')

        return this.httpClient.steamRequest(sessionDataId,{
            method: 'GET',
            url: url.href,
        }, (error) => {
            error && console.error(error)
        })
    }

    async downloadShipmentBOFPDF(arn: string, sessionDataId: string) {
        const {amazon} = this.settings.get(SettingSection.SERVICE)
        const url = getJoinedUrl(amazon.serviceUrl, '/hz/vendor/members/shipment-mgr/resource/action/printbol')
        url.searchParams.append('shipmentId', arn)
        url.searchParams.append('appType', 'rr')
        return this.httpClient.steamRequest(sessionDataId,{
            method: 'GET',
            url: url.href,
        }, (error) => {
            error && console.error(error)
        })
    }
}