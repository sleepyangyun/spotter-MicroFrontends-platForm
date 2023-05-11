import { ISimpleType, types } from 'mobx-state-tree';
import { UpdateFnPropsType } from '@app/types/type';
import { ApiReturnType } from '@spotter/gmesh-api-sdk';
import { nanoid } from 'nanoid';

export const WITH_ARRAY_UPDATE_FN_MODEL_NAME = 'WithArrayUpdateFnModel';

export default function WithArrayUpdateFnModel<
    F extends (...args: any[]) => Promise<any>,
    R = ApiReturnType<F>,
>(dataModel?: ISimpleType<R>) {
    const defInit = {
        data: [],
        uid: nanoid(4),
    };

    const properties = {
        data: types.array(dataModel ?? types.frozen<R>()),
        uid: types.string,
    };
    const model = types.optional(
        types.model(WITH_ARRAY_UPDATE_FN_MODEL_NAME, properties).actions((self) => {
            const updateData = (props: UpdateFnPropsType<R[]>) => {
                if (typeof props === 'function') {
                    updateData(props(self.data));
                } else {
                    self.data.clear();
                    self.data.push(...props);
                    self.uid = nanoid(4);
                }
            };
            return {
                updateData,
            };
        }),
        defInit,
    );

    return { model, properties, defInit };
}
