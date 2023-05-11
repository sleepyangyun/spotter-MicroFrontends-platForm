import Model from '@app/store/infra/Model';
import { generateAutoContextFlowWithSelf } from '@app/store/infra/utils';
import {
    saleManagementBrandApiSdk,
    saleManagementCompanyApiSdk,
    saleManagementLineApiSdk,
    saleManagementTargetApiSdk,
} from '@app/services/v2/management/sales';
import WithPrimaryUpdateFnModel from '@app/store/infra/WithPrimaryUpdateFnModel';
import WithPaginationUpdateFnModel from '@app/store/infra/WithPaginationUpdateFnModel';

export const SalesManagementStore = Model({
    name: 'SalesManagementStore',
    properties: {
        yearTargetList: WithPrimaryUpdateFnModel<typeof saleManagementTargetApiSdk.targetList>([])
            .model,
        yearTargetOverviewList: WithPrimaryUpdateFnModel<
            typeof saleManagementTargetApiSdk.overview
        >([]).model,
        businessLineOverviewList: WithPrimaryUpdateFnModel<
            typeof saleManagementLineApiSdk.overview
        >([]).model,
        brandOverviewList: WithPrimaryUpdateFnModel<typeof saleManagementBrandApiSdk.overview>([])
            .model,
        brandOverviewListByOwner: WithPrimaryUpdateFnModel<
            typeof saleManagementBrandApiSdk.personOverview
        >([]).model,
        companyOverviewList: WithPrimaryUpdateFnModel<typeof saleManagementCompanyApiSdk.overview>(
            [],
        ).model,
        companyOverviewListByOwner: WithPrimaryUpdateFnModel<
            typeof saleManagementCompanyApiSdk.personOverview
        >([]).model,
        businessLineListByPermission: WithPrimaryUpdateFnModel<
            typeof saleManagementLineApiSdk.formulateLine
        >({
            owned: [],
            others: [],
        }).model,
        businessLinePageList:
            WithPaginationUpdateFnModel<typeof saleManagementLineApiSdk.lineSearchPage>().model,
        brandPageList:
            WithPaginationUpdateFnModel<typeof saleManagementBrandApiSdk.brandSearchPage>().model,
        companyPageList:
            WithPaginationUpdateFnModel<typeof saleManagementCompanyApiSdk.companySearchPage>()
                .model,
        assignableOwnerList: WithPrimaryUpdateFnModel<
            typeof saleManagementTargetApiSdk.assignablePersons
        >([]).model,
        assignableOwnerListByYear: WithPrimaryUpdateFnModel<
            typeof saleManagementTargetApiSdk.historyAssignablePersons
        >([]).model,
        creatorList: WithPrimaryUpdateFnModel<typeof saleManagementTargetApiSdk.createdPersons>([])
            .model,
        companyInfoWithDetailList:
            WithPaginationUpdateFnModel<
                typeof saleManagementCompanyApiSdk.companySearchPageDetailed
            >().model,
        companyHistoryDetailed: WithPrimaryUpdateFnModel<
            typeof saleManagementCompanyApiSdk.companyHistoryDetailed
        >([]).model,
        brandTableList:
            WithPaginationUpdateFnModel<typeof saleManagementBrandApiSdk.brandSearchPageDetailed>()
                .model,
        operationLogParam: WithPrimaryUpdateFnModel<
            typeof saleManagementTargetApiSdk.syncUpdateOperationLogParam
        >({} as any).model,
    },
    overridesInitWatcher: {
        updateYearTargetStatus: false,
        updateBusinessLine: false,
        updateBusinessLineDraft: false,
        updateYearTarget: false,
        syncBusinessLine: false,
        createYearTarget: false,
        createVirtualBusinessLine: false,
        publishCompanyStatus: false,
        syncUpdateCompanyStatus: false,
        companyLogParam: false,
        companyInfoWithDetailList: false,
        updateCompanyDraft: false,
        updateBrandDraft: false,
        removeVirtualBusinessLine: false,
        removeVirtualCompany: false,
        removeVirtualBrand: false,
        updateVirtualBusinessLine: false,
        updateVirtualCompany: false,
        updateVirtualBrand: false,
        updateBrand: false,
    },
}).actions((self) => {
    const autoContextFlow = generateAutoContextFlowWithSelf(self, true);

    const updateYearTargetStatus = autoContextFlow(
        'updateYearTargetStatus',
        async (...args: Parameters<typeof saleManagementTargetApiSdk.updateTargetStatus>) => {
            const { data: response } = await saleManagementTargetApiSdk.updateTargetStatus(...args);
            return response;
        },
    );

    const updateYearTarget = autoContextFlow(
        'updateYearTarget',
        async (...args: Parameters<typeof saleManagementTargetApiSdk.updateTarget>) => {
            const { data: response } = await saleManagementTargetApiSdk.updateTarget(...args);
            return response;
        },
    );

    const updateBusinessLine = autoContextFlow(
        'updateBusinessLine',
        async (...args: Parameters<typeof saleManagementLineApiSdk.publishLine>) => {
            const { data: response } = await saleManagementLineApiSdk.publishLine(...args);
            return response;
        },
    );

    const updateBrand = autoContextFlow(
        'updateBrand',
        async (...args: Parameters<typeof saleManagementBrandApiSdk.publishBrand>) => {
            const { data: response } = await saleManagementBrandApiSdk.publishBrand(...args);
            return response;
        },
    );

    const updateBusinessLineDraft = autoContextFlow(
        'updateBusinessLineDraft',
        async (...args: Parameters<typeof saleManagementLineApiSdk.lineSaveDraft>) => {
            const { data: response } = await saleManagementLineApiSdk.lineSaveDraft(...args);
            return response;
        },
    );

    const updateBrandDraft = autoContextFlow(
        'updateBrandDraft',
        async (...args: Parameters<typeof saleManagementBrandApiSdk.brandSaveDraft>) => {
            const { data: response } = await saleManagementBrandApiSdk.brandSaveDraft(...args);
            return response;
        },
    );

    const updateCompanyDraft = autoContextFlow(
        'updateCompanyDraft',
        async (...args: Parameters<typeof saleManagementCompanyApiSdk.companySaveDraft>) => {
            const { data: response } = await saleManagementCompanyApiSdk.companySaveDraft(...args);
            return response;
        },
    );

    const createYearTarget = autoContextFlow(
        'createYearTarget',
        async (...args: Parameters<typeof saleManagementTargetApiSdk.addTarget>) => {
            const { data: response } = await saleManagementTargetApiSdk.addTarget(...args);
            return response;
        },
    );

    const createVirtualBusinessLine = autoContextFlow(
        'createVirtualBusinessLine',
        async (...args: Parameters<typeof saleManagementLineApiSdk.addVirtualLine>) => {
            const { data: response } = await saleManagementLineApiSdk.addVirtualLine(...args);
            return response;
        },
    );

    const createVirtualBrand = autoContextFlow(
        'createVirtualBrand',
        async (...args: Parameters<typeof saleManagementBrandApiSdk.addVirtualBrand>) => {
            const { data: response } = await saleManagementBrandApiSdk.addVirtualBrand(...args);
            return response;
        },
    );

    const createVirtualCompany = autoContextFlow(
        'createVirtualCompany',
        async (...args: Parameters<typeof saleManagementCompanyApiSdk.addVirtualCompany>) => {
            const { data: response } = await saleManagementCompanyApiSdk.addVirtualCompany(...args);
            return response;
        },
    );

    const syncBusinessLine = autoContextFlow(
        'syncBusinessLine',
        async (...args: Parameters<typeof saleManagementLineApiSdk.syncUpdateLine>) => {
            const { data: response } = await saleManagementLineApiSdk.syncUpdateLine(...args);
            return response;
        },
    );
    const syncBrand = autoContextFlow(
        'syncBrand',
        async (...args: Parameters<typeof saleManagementBrandApiSdk.syncUpdateBrand>) => {
            const { data: response } = await saleManagementBrandApiSdk.syncUpdateBrand(...args);
            return response;
        },
    );

    const syncCompany = autoContextFlow(
        'syncCompany',
        async (...args: Parameters<typeof saleManagementCompanyApiSdk.syncUpdateCompany>) => {
            const { data: response } = await saleManagementCompanyApiSdk.syncUpdateCompany(...args);
            return response;
        },
    );

    const getYearTargetOverviewList = autoContextFlow(
        'yearTargetOverviewList',
        async (...args: Parameters<typeof saleManagementTargetApiSdk.overview>) => {
            const { data: response } = await saleManagementTargetApiSdk.overview(...args);
            return response;
        },
    );

    const getBusinessLineOverviewList = autoContextFlow(
        'businessLineOverviewList',
        async (...args: Parameters<typeof saleManagementLineApiSdk.overview>) => {
            const { data: response } = await saleManagementLineApiSdk.overview(...args);
            return response;
        },
    );

    const getBrandOverviewList = autoContextFlow(
        'brandOverviewList',
        async (...args: Parameters<typeof saleManagementBrandApiSdk.overview>) => {
            const { data: response } = await saleManagementBrandApiSdk.overview(...args);
            return response;
        },
    );

    const getBrandOverviewListByOwner = autoContextFlow(
        'brandOverviewListByOwner',
        async (...args: Parameters<typeof saleManagementBrandApiSdk.personOverview>) => {
            const { data: response } = await saleManagementBrandApiSdk.personOverview(...args);
            return response;
        },
    );

    const getCompanyOverviewList = autoContextFlow(
        'brandOverviewList',
        async (...args: Parameters<typeof saleManagementCompanyApiSdk.overview>) => {
            const { data: response } = await saleManagementCompanyApiSdk.overview(...args);
            return response;
        },
    );

    const getCompanyOverviewListByOwner = autoContextFlow(
        'companyOverviewListByOwner',
        async (...args: Parameters<typeof saleManagementCompanyApiSdk.personOverview>) => {
            const { data: response } = await saleManagementCompanyApiSdk.personOverview(...args);
            return response;
        },
    );

    const getYearTargetList = autoContextFlow(
        'yearTargetList',
        async (...args: Parameters<typeof saleManagementTargetApiSdk.targetList>) => {
            const { data: response } = await saleManagementTargetApiSdk.targetList(...args);
            return response;
        },
    );

    const getBusinessLineListByPermission = autoContextFlow(
        'businessLineListByPermission',
        async (...args: Parameters<typeof saleManagementLineApiSdk.formulateLine>) => {
            const { data: response } = await saleManagementLineApiSdk.formulateLine(...args);
            return response;
        },
    );

    const getBusinessLinePageList = autoContextFlow(
        'businessLinePageList',
        async (...args: Parameters<typeof saleManagementLineApiSdk.lineSearchPage>) => {
            const { data: response } = await saleManagementLineApiSdk.lineSearchPage(...args);
            return response;
        },
    );

    const getBrandPageList = autoContextFlow(
        'brandPageList',
        async (...args: Parameters<typeof saleManagementBrandApiSdk.brandSearchPage>) => {
            const { data: response } = await saleManagementBrandApiSdk.brandSearchPage(...args);
            return response;
        },
    );

    const getCompanyPageList = autoContextFlow(
        'companyPageList',
        async (...args: Parameters<typeof saleManagementCompanyApiSdk.companySearchPage>) => {
            const { data: response } = await saleManagementCompanyApiSdk.companySearchPage(...args);
            return response;
        },
    );

    const getCompanyInfoWithDetailList = autoContextFlow(
        'companyInfoWithDetailList',
        async (
            ...args: Parameters<typeof saleManagementCompanyApiSdk.companySearchPageDetailed>
        ) => {
            const { data: response } = await saleManagementCompanyApiSdk.companySearchPageDetailed(
                ...args,
            );
            return response;
        },
    );

    const getCompanyHistoryDetailed = autoContextFlow(
        'companyHistoryDetailed',
        async (...args: Parameters<typeof saleManagementCompanyApiSdk.companyHistoryDetailed>) => {
            const { data: response } = await saleManagementCompanyApiSdk.companyHistoryDetailed(
                ...args,
            );
            return response;
        },
    );

    // 公司一级 - 发布目标
    const postCompanySalesTarget = autoContextFlow(
        'publishCompanyStatus',
        async (...args: Parameters<typeof saleManagementCompanyApiSdk.publishCompany>) => {
            const { data: response } = await saleManagementCompanyApiSdk.publishCompany(...args);
            return response;
        },
    );

    // 转移公司 - 将业务线负责人转给别人
    const transferCompanyOwn = autoContextFlow(
        'shiftCompany',
        async (...args: Parameters<typeof saleManagementCompanyApiSdk.shiftCompany>) => {
            const { data: response } = await saleManagementCompanyApiSdk.shiftCompany(...args);
            return response;
        },
    );

    // ------------- 品牌 --------------
    const getBrandTableList = autoContextFlow(
        'brandTableList',
        async (...args: Parameters<typeof saleManagementBrandApiSdk.brandSearchPageDetailed>) => {
            const { data: response } = await saleManagementBrandApiSdk.brandSearchPageDetailed(
                ...args,
            );
            return response;
        },
    );

    const getBrandHistoryList = autoContextFlow(
        'brandTableHistoryList',
        async (...args: Parameters<typeof saleManagementBrandApiSdk.brandHistoryDetailed>) => {
            const { data: response } = await saleManagementBrandApiSdk.brandHistoryDetailed(
                ...args,
            );
            return response;
        },
    );

    // 转移品牌 - 将品牌负责人转给别人
    const transferBrandOwn = autoContextFlow(
        'shiftBrand',
        async (...args: Parameters<typeof saleManagementBrandApiSdk.shiftBrand>) => {
            const { data: response } = await saleManagementBrandApiSdk.shiftBrand(...args);
            return response;
        },
    );

    const getOperationLogParam = autoContextFlow(
        'operationLogParam',
        async (
            ...args: Parameters<typeof saleManagementTargetApiSdk.syncUpdateOperationLogParam>
        ) => {
            const { data: response } = await saleManagementTargetApiSdk.syncUpdateOperationLogParam(
                ...args,
            );
            return response;
        },
    );

    const getCreatorList = autoContextFlow(
        'creatorList',
        async (...args: Parameters<typeof saleManagementTargetApiSdk.createdPersons>) => {
            const { data: response } = await saleManagementTargetApiSdk.createdPersons(...args);
            return response;
        },
    );

    const getAssignableOwnerListByYear = autoContextFlow(
        'assignableOwnerListByYear',
        async (...args: Parameters<typeof saleManagementTargetApiSdk.historyAssignablePersons>) => {
            const { data: response } = await saleManagementTargetApiSdk.historyAssignablePersons(
                ...args,
            );
            return response;
        },
    );

    const getAssignableOwnerList = autoContextFlow(
        'assignableOwnerList',
        async (...args: Parameters<typeof saleManagementTargetApiSdk.assignablePersons>) => {
            const { data: response } = await saleManagementTargetApiSdk.assignablePersons(...args);
            return response;
        },
    );

    const removeVirtualBusinessLine = autoContextFlow(
        'removeVirtualBusinessLine',
        async (...args: Parameters<typeof saleManagementLineApiSdk.deleteVirtualLine>) => {
            const { data: response } = await saleManagementLineApiSdk.deleteVirtualLine(...args);
            return response;
        },
    );

    const removeVirtualCompany = autoContextFlow(
        'removeVirtualCompany',
        async (...args: Parameters<typeof saleManagementCompanyApiSdk.deleteVirtualCompany>) => {
            const { data: response } = await saleManagementCompanyApiSdk.deleteVirtualCompany(
                ...args,
            );
            return response;
        },
    );

    const removeVirtualBrand = autoContextFlow(
        'removeVirtualBrand',
        async (...args: Parameters<typeof saleManagementBrandApiSdk.deleteVirtualBrand>) => {
            const { data: response } = await saleManagementBrandApiSdk.deleteVirtualBrand(...args);
            return response;
        },
    );

    const updateVirtualBusinessLine = autoContextFlow(
        'updateVirtualBusinessLine',
        async (...args: Parameters<typeof saleManagementLineApiSdk.editVirtualLine>) => {
            const { data: response } = await saleManagementLineApiSdk.editVirtualLine(...args);
            return response;
        },
    );
    const updateVirtualCompany = autoContextFlow(
        'updateVirtualCompany',
        async (...args: Parameters<typeof saleManagementCompanyApiSdk.editVirtualCompany>) => {
            const { data: response } = await saleManagementCompanyApiSdk.editVirtualCompany(
                ...args,
            );
            return response;
        },
    );

    const updateVirtualBrand = autoContextFlow(
        'updateVirtualBrand',
        async (...args: Parameters<typeof saleManagementBrandApiSdk.editVirtualBrand>) => {
            const { data: response } = await saleManagementBrandApiSdk.editVirtualBrand(...args);
            return response;
        },
    );

    return {
        updateYearTargetStatus,
        updateYearTarget,
        updateBusinessLine,
        updateBrand,
        updateBusinessLineDraft,
        updateBrandDraft,
        updateCompanyDraft,
        createYearTarget,
        createVirtualBusinessLine,
        createVirtualBrand,
        createVirtualCompany,
        getYearTargetList,
        getBusinessLineListByPermission,
        getBusinessLinePageList,
        getBrandPageList,
        getCompanyPageList,
        getYearTargetOverviewList,
        getBusinessLineOverviewList,
        getBrandOverviewList,
        getBrandOverviewListByOwner,
        getCompanyOverviewList,
        getCompanyOverviewListByOwner,
        getAssignableOwnerList,
        getAssignableOwnerListByYear,
        syncBusinessLine,
        syncCompany,
        syncBrand,

        getCompanyInfoWithDetailList,
        getCompanyHistoryDetailed,
        postCompanySalesTarget,
        transferCompanyOwn,

        getBrandTableList,
        getBrandHistoryList,
        transferBrandOwn,
        getOperationLogParam,
        getCreatorList,
        removeVirtualBusinessLine,
        removeVirtualCompany,
        removeVirtualBrand,
        updateVirtualBusinessLine,
        updateVirtualCompany,
        updateVirtualBrand,
    };
});
