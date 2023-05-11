import { types } from 'mobx-state-tree';
import { UpdateFnPropsType } from '@app/types/type';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';

export const WITH_PRIMARY_UPDATE_FN_MODEL_NAME = 'WithPrimaryUpdateFnModel';

export default function WithPrimaryUpdateFnModel<
    F extends (...args: any[]) => Promise<any>,
    R = ApiReturnType<F>,
    >(defInit: R) {
    const properties = {
        data: types.frozen<R>(defInit),
    };
    const model = types.optional(
        types.model(WITH_PRIMARY_UPDATE_FN_MODEL_NAME, properties).actions((self) => {
            const updateData = (props: UpdateFnPropsType<R>) => {
                if (typeof props === 'function') {
                    updateData((props as any)(self.data));
                } else {
                    self.data = props as any;
                }
            };
            return {
                updateData,
            };
        }),
        {
            data: defInit,
        },
    );

    return { model, properties, defInit };
}
