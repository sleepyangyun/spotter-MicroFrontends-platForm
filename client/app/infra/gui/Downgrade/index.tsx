import { ClientError } from '@app/infra/gui/Downgrade/ClientError';
import { NotFound } from './NotFound';
import { PermissionDenied } from './PermissionDenied';
import { ServerError } from './ServerError';

export default {
    NotFound,
    PermissionDenied,
    ServerError,
    ClientError,
};
