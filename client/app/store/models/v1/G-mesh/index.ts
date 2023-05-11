import { types } from 'mobx-state-tree';
import WithArrayUpdateFnModel from '@app/store/infra/WithArrayUpdateFnModel';
import {
    BusinessProductBrand,
    BusinessProductLine,
    BusinessProductModel,
    BusinessProductCheckedModel,
    CompanyInfoModel,
    ProductDetailModel,
    IdWithCodeModel,
    SpotterOfferInfoModel,
    CompanyDetailInfoModel,
} from '@app/services/v1/g-mesh/g-mesh.model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import Model from '@app/store/infra/Model';
import { gMeshSdk } from '@app/services/v1/g-mesh';
import WithPrimaryUpdateFnModel from '../../../infra/WithPrimaryUpdateFnModel';
import WithPaginationUpdateFnModel from '../../../infra/WithPaginationUpdateFnModel';

const GMeshStore = Model({
    name: 'GMeshStore',
    properties: {
        productBrandList: WithArrayUpdateFnModel(types.frozen<BusinessProductBrand>()).model,
        productLineList: WithArrayUpdateFnModel(types.frozen<BusinessProductLine>()).model,
        productLinePage: WithPaginationUpdateFnModel(types.frozen<BusinessProductModel>()).model,
        myProductBusinessCheckedDone: WithPaginationUpdateFnModel(
            types.frozen<BusinessProductCheckedModel>(),
        ).model,
        myProductBusinessCheckedTodo: WithPaginationUpdateFnModel(
            types.frozen<BusinessProductCheckedModel>(),
        ).model,
        departmentProductBusinessCheckedTodo: WithPaginationUpdateFnModel(
            types.frozen<BusinessProductCheckedModel>(),
        ).model,
        departmentProductBusinessCheckedDone: WithPaginationUpdateFnModel(
            types.frozen<BusinessProductCheckedModel>(),
        ).model,
        myProductOperatingCheckedDone: WithPaginationUpdateFnModel(
            types.frozen<BusinessProductCheckedModel>(),
        ).model,
        myProductOperatingCheckeTodo: WithPaginationUpdateFnModel(
            types.frozen<BusinessProductCheckedModel>(),
        ).model,
        departmentProductOperatingCheckedDone: WithPaginationUpdateFnModel(
            types.frozen<BusinessProductCheckedModel>(),
        ).model,
        departmentProductOperatingCheckedTodo: WithPaginationUpdateFnModel(
            types.frozen<BusinessProductCheckedModel>(),
        ).model,
        companyList: WithArrayUpdateFnModel(types.frozen<CompanyInfoModel>()).model,
        productAuditDetail: WithPrimaryUpdateFnModel({} as ProductDetailModel).model,
        operatingAccountAll: WithArrayUpdateFnModel(types.frozen<IdWithCodeModel>()).model,
        storageAll: WithArrayUpdateFnModel(types.frozen<IdWithCodeModel>()).model,
        companyInfo: WithPrimaryUpdateFnModel({} as CompanyDetailInfoModel).model,
        spotterOfferInfo: WithPrimaryUpdateFnModel({} as SpotterOfferInfoModel).model,
    },
    overridesInitWatcher: {},
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self);
    const getProductBrandList = autoContextFlow(
        'productBrandList',
        async (...args: Parameters<typeof gMeshSdk.getProductBrandList>) => {
            const { data: res } = await gMeshSdk.getProductBrandList(...args);
            self.productBrandList.updateData(res.data);
            return res;
        },
    );
    const getProductLineList = autoContextFlow(
        'productLineList',
        async (...args: Parameters<typeof gMeshSdk.getProductLineList>) => {
            const { data: res } = await gMeshSdk.getProductLineList(...args);
            self.productLineList.updateData(res.data);
            return res;
        },
    );
    const getProductLinePage = autoContextFlow(
        'productLinePage',
        async (...args: Parameters<typeof gMeshSdk.getProductLinePage>) => {
            const { data: res } = await gMeshSdk.getProductLinePage(...args);
            self.productLinePage.updatePagination(res.data);
            self.productLinePage.updateData(res.data.data);
            return res;
        },
    );

    const getMyProductBusinessCheckedDone = autoContextFlow(
        'myProductBusinessCheckedDone',
        async (...args: Parameters<typeof gMeshSdk.getMyProductBusinessCheckedDone>) => {
            const { data: res } = await gMeshSdk.getMyProductBusinessCheckedDone(...args);
            self.myProductBusinessCheckedDone.updateData(res.data.data);
            self.myProductBusinessCheckedDone.updatePagination(res.data);
            return res;
        },
    );

    const getMyProductBusinessCheckedTodo = autoContextFlow(
        'myProductBusinessCheckedTodo',
        async (...args: Parameters<typeof gMeshSdk.getMyProductBusinessCheckedTodo>) => {
            const { data: res } = await gMeshSdk.getMyProductBusinessCheckedTodo(...args);
            self.myProductBusinessCheckedTodo.updateData(res.data.data);
            self.myProductBusinessCheckedTodo.updatePagination(res.data);
            return res;
        },
    );

    const getDepartmentProductBusinessCheckedDone = autoContextFlow(
        'departmentProductBusinessCheckedDone',
        async (...args: Parameters<typeof gMeshSdk.getDepartmentProductBusinessCheckedDone>) => {
            const { data: res } = await gMeshSdk.getDepartmentProductBusinessCheckedDone(...args);
            self.departmentProductBusinessCheckedDone.updateData(res.data.data);
            self.departmentProductBusinessCheckedDone.updatePagination(res.data);
            return res;
        },
    );

    const getDepartmentProductBusinessCheckedTodo = autoContextFlow(
        'departmentProductBusinessCheckedTodo',
        async (...args: Parameters<typeof gMeshSdk.getDepartmentProductBusinessCheckedTodo>) => {
            const { data: res } = await gMeshSdk.getDepartmentProductBusinessCheckedTodo(...args);
            self.departmentProductBusinessCheckedTodo.updateData(res.data.data);
            self.departmentProductBusinessCheckedTodo.updatePagination(res.data);
            return res;
        },
    );
    const getMyProductOperatingCheckedDone = autoContextFlow(
        'myProductOperatingCheckedDone',
        async (...args: Parameters<typeof gMeshSdk.getMyProductOperatingCheckedDone>) => {
            const { data: res } = await gMeshSdk.getMyProductOperatingCheckedDone(...args);
            self.myProductOperatingCheckedDone.updateData(res.data.data);
            self.myProductOperatingCheckedDone.updatePagination(res.data);
            return res;
        },
    );

    const getMyProductOperatingCheckedTodo = autoContextFlow(
        'myProductOperatingCheckedTodo',
        async (...args: Parameters<typeof gMeshSdk.getMyProductOperatingCheckedTodo>) => {
            const { data: res } = await gMeshSdk.getMyProductOperatingCheckedTodo(...args);
            self.myProductOperatingCheckeTodo.updateData(res.data.data);
            self.myProductOperatingCheckeTodo.updatePagination(res.data);
            return res;
        },
    );

    const getDepartmentProductOperatingCheckedDone = autoContextFlow(
        'departmentProductOperatingCheckedDone',
        async (...args: Parameters<typeof gMeshSdk.getDepartmentProductOperatingCheckedDone>) => {
            const { data: res } = await gMeshSdk.getDepartmentProductOperatingCheckedDone(...args);
            self.departmentProductOperatingCheckedDone.updateData(res.data.data);
            self.departmentProductOperatingCheckedDone.updatePagination(res.data);
            return res;
        },
    );

    const getDepartmentProductOperatingCheckedTodo = autoContextFlow(
        'departmentProductOperatingCheckedTodo',
        async (...args: Parameters<typeof gMeshSdk.getDepartmentProductOperatingCheckedTodo>) => {
            const { data: res } = await gMeshSdk.getDepartmentProductOperatingCheckedTodo(...args);
            self.departmentProductOperatingCheckedTodo.updateData(res.data.data);
            self.departmentProductOperatingCheckedTodo.updatePagination(res.data);
            return res;
        },
    );

    const getProductAuditDetail = autoContextFlow(
        'productAuditDetail',
        async (...args: Parameters<typeof gMeshSdk.getProductAuditDetail>) => {
            const { data: res } = await gMeshSdk.getProductAuditDetail(...args);
            self.productAuditDetail.updateData(res.data);
            return res;
        },
    );

    const getOperatingAccountAll = autoContextFlow(
        'operatingAccountAll',
        async (...args: Parameters<typeof gMeshSdk.getOperatingAccountAll>) => {
            const { data: res } = await gMeshSdk.getOperatingAccountAll(...args);
            self.operatingAccountAll.updateData(res.data);
            return res;
        },
    );

    const getStorageAll = autoContextFlow(
        'storageAll',
        async (...args: Parameters<typeof gMeshSdk.getStorageAll>) => {
            const { data: res } = await gMeshSdk.getStorageAll(...args);
            self.storageAll.updateData(res.data);
            return res;
        },
    );
    const getCompanyInfo = autoContextFlow(
        'companyInfo',
        async (...args: Parameters<typeof gMeshSdk.getCompanyInfo>) => {
            const { data: res } = await gMeshSdk.getCompanyInfo(...args);
            self.companyInfo.updateData(res.data);
        },
    );
    const CalculateProductBusinessFirst = autoContextFlow(
        'spotterOfferInfo',
        async (...args: Parameters<typeof gMeshSdk.CalculateProductBusinessFirst>) => {
            const { data: res } = await gMeshSdk.CalculateProductBusinessFirst(...args);
            self.spotterOfferInfo.updateData(res.data);
        },
    );
    const CalculateProductBusinessSecond = autoContextFlow(
        'spotterOfferInfo',
        async (...args: Parameters<typeof gMeshSdk.CalculateProductBusinessSecond>) => {
            const { data: res } = await gMeshSdk.CalculateProductBusinessSecond(...args);
            self.spotterOfferInfo.updateData(res.data);
        },
    );
    const CalculateProductBusinessFirstSave = autoContextFlow(
        'spotterOfferInfo',
        async (...args: Parameters<typeof gMeshSdk.CalculateProductBusinessFirstSave>) => {
            const { data: res } = await gMeshSdk.CalculateProductBusinessFirstSave(...args);
            self.spotterOfferInfo.updateData(res.data);
        },
    );
    const CalculateProductBusinessSecondSave = autoContextFlow(
        'spotterOfferInfo',
        async (...args: Parameters<typeof gMeshSdk.CalculateProductBusinessSecondSave>) => {
            const { data: res } = await gMeshSdk.CalculateProductBusinessSecondSave(...args);
            self.spotterOfferInfo.updateData(res.data);
        },
    );
    return {
        getProductBrandList,
        getProductLineList,
        getProductLinePage,
        getMyProductBusinessCheckedDone,
        getMyProductBusinessCheckedTodo,
        getDepartmentProductBusinessCheckedDone,
        getDepartmentProductBusinessCheckedTodo,
        getMyProductOperatingCheckedDone,
        getMyProductOperatingCheckedTodo,
        getDepartmentProductOperatingCheckedDone,
        getDepartmentProductOperatingCheckedTodo,
        getProductAuditDetail,
        getOperatingAccountAll,
        getStorageAll,
        getCompanyInfo,
        CalculateProductBusinessFirst,
        CalculateProductBusinessSecond,
        CalculateProductBusinessFirstSave,
        CalculateProductBusinessSecondSave,
    };
});

export default GMeshStore;
