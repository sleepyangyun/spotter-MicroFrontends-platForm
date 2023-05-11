import { GMeshSdk } from '@app/services/v1/g-mesh/g-mesh.sdk';
import { message } from 'antd';
import { apiPrefixPathMap } from '@app/utils/const';
import { getAppBootData } from '@spotter/utils';

export const gMeshSdk = new GMeshSdk({
    context: new URL(apiPrefixPathMap.gmesh, getAppBootData('app').apiUrl),
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
