import { Controller, Param, RequestMapping, RequestMethod } from '@nestjs/common';
import { I18nService } from '@server/infra/i18n/i18n.service';
import { Lang } from '@server/util/consts';

@Controller('/api/v1/locales')
export class I18nController {
    constructor(private i18nService: I18nService) {}

    @RequestMapping({
        method: RequestMethod.GET,
        path: `/:lang`,
    })
    getEnTranslation(@Param('lang') lang: Lang) {
        return this.i18nService.getI18nTranslation(lang);
    }
}
