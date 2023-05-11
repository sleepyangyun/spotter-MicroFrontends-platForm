import { SpotterCatalogCertificationPackageApiSdk } from '@spotter/gmesh-api-sdk';
import { message } from 'antd';
import { getAppBootData } from '@spotter/utils';

export enum ProductPackagingCertification {
    PENDING_CERTIFICATION = 0,
    UNDER_REVIEW,
    CERTIFIED,
    NO_ACCREDITATION_REQUIRED,
}
export const catalogSdk = new SpotterCatalogCertificationPackageApiSdk({
    context: new URL(getAppBootData('app').apiUrl),
    res: {
        onAuthError: (error) => {
            console.error(error);
            window.location.assign('/login');
        },
        onOtherError: (error) => {
            message.error(error.data.msg);
            console.error(error);
        },
    },
});
