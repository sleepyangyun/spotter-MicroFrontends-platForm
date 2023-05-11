import { initSpotterI18n } from '@spotter/i18n-sdk';

const i18n = initSpotterI18n({
    backend: {
        loadPath: (lngs: string[]) => new URL(`/api/v1/locales/${lngs[0]}`, window.location.href),
        crossDomain: true,
    },
});

export default i18n;
