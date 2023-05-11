import { Controller, Render, Req, RequestMapping, RequestMethod } from '@nestjs/common';
import { type Request } from 'express';
import { SettingService } from '@server/infra/setting/setting.service';
import { SettingSection } from '@server/infra/setting/setting.constants';

export interface ApplicationBootData {
    app: {
        name: string;
        code: string;
        apiUrl: string;
        apiTag?: string;
        larkUrl: string;
        dingUrl: string;
        biUrl: string;
        messageBucketName: string;
        imageBucketName: string;
        businessImageBucketName: string;
        biRealtimeSalesDashboardId?: string;
        performanceBucketName: string;
        env?: string;
    };
}

@Controller()
export class ViewController {
    constructor(private settingService: SettingService) {}

    @RequestMapping({ path: '*', method: RequestMethod.GET })
    @Render('index')
    index(@Req() request: Request) {
        const { appApiUrl, runtime, appCode, appSubUrl, appName } = this.settingService.get(
            SettingSection.SERVER,
        );
        const { oauth2 } = this.settingService.get(SettingSection.AUTH);
        const monitor = this.settingService.get(SettingSection.CLIENT_MONITOR);
        const bi = this.settingService.get(SettingSection.BI);
        const bucket = this.settingService.get(SettingSection.BUCKET);
        const applicationBootData: ApplicationBootData = {
            app: {
                apiUrl: runtime.appApiUrl || appApiUrl,
                apiTag: runtime.appApiTag,
                name: appName,
                code: appCode,
                larkUrl: oauth2.larkUrl,
                dingUrl: oauth2.dingUrl,
                biUrl: bi.biUrl,
                messageBucketName: bucket.messageBucketName,
                imageBucketName: bucket.imageBucketName,
                businessImageBucketName: bucket.businessImageBucketName,
                performanceBucketName: bucket.performanceBucketName,
                biRealtimeSalesDashboardId: process.env.BI_REALTIME_SALES_DASHBOARD_ID,
                env: process.env.NODE_ENV,
            },
        };

        return {
            appSubUrl: appSubUrl.endsWith('/') ? appSubUrl : `${appSubUrl}/`,
            appName,
            monitor: {
                ...monitor,
                uin: request.cookies.spotter_sso_sessionid,
            },
            applicationBootData,
            env: runtime.appEnv,
        };
    }
}
