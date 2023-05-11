export interface List<T = any> {
    list: T[];
}

export interface Pagination {
    total: number;
    pageSize: number;
    totalPages: number;
    currentPage: number;
}

export type PaginationList<T = any> = List<T> & Pagination

export type RegistryServiceCommonParams<P = undefined,
    H extends Record<string, any> = { userId: string }> = P extends undefined ? WithoutParams<H> : WithParams<P, H>;


interface WithParams<P, H> {
    params: P;
    headers: H;
}

interface WithoutParams<H> {
    headers: H;
}
