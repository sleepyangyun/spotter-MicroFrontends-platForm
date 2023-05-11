import { ISimpleType, types } from 'mobx-state-tree';
import { ApiPaginationReturnType, WithPagination } from '@spotter/gmesh-api-sdk';
import { nanoid } from 'nanoid';

export const WITH_PAGINATION_UPDATE_FN_MODEL_NAME = 'WithPaginationUpdateFnModel';

export default function WithPaginationUpdateFnModel<
    F extends (...args: any[]) => Promise<any>,
    R = ApiPaginationReturnType<F>,
>(dataModel?: ISimpleType<R>) {
    const defInit = {
        data: [],
        uid: nanoid(4),
    };

    const properties = {
        data: types.array(dataModel ?? types.frozen<R>()),
        uid: types.string,
        pagination: types.optional(
            types.model('paginationModel', {
                currentPage: types.optional(types.number, 0),
                pageSize: types.optional(types.number, 20),
                totalPage: types.optional(types.number, 0),
                totalNum: types.optional(types.number, 0),
                startIndex: types.optional(types.number, 0),
            }),
            {},
        ),
    };
    const model = types.optional(
        types.model(WITH_PAGINATION_UPDATE_FN_MODEL_NAME, properties).actions((self) => {
            const updateData = (data: R[]) => {
                self.data.replace(data as any[]);
                self.uid = nanoid(4);
            };
            const updatePagination = (pagination?: WithPagination<R>) => {
                self.pagination.currentPage = pagination!.currentPage!;
                self.pagination.pageSize = pagination!.pageSize!;
                self.pagination.totalPage = pagination!.totalNum!;
                self.pagination.totalNum = pagination!.totalNum!;
                self.pagination.startIndex = pagination!.startIndex!;
            };
            return {
                updateData,
                updatePagination,
            };
        }),
        defInit,
    );

    return { model, properties, defInit };
}
