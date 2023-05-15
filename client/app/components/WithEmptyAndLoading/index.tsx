import { ReactElement, useMemo } from 'react';
import { Empty, Spin } from 'antd';

interface WithEmptyAndLoadingProps<Deps extends [...any[]]> {
    loading?: boolean;
    deps?: [...Deps];
    loadingRender?: () => ReactElement;
    emptyRender?: () => ReactElement;
    render: (deps: Required<[...Deps]>) => ReactElement;
}

export const WithEmptyAndLoading = <Deps extends [...any[]]>({
    loading = false,
    deps,
    loadingRender,
    emptyRender,
    render,
}: WithEmptyAndLoadingProps<Deps>) => {
    const isEmpty = useMemo(() => deps?.some((dep: any) => !dep), [deps]);

    return (
        <>
            {loading ? loadingRender ? loadingRender() : <Spin spinning /> : null}
            {!loading && isEmpty ? emptyRender ? emptyRender() : <Empty /> : null}
            {!loading && !isEmpty ? render(deps as Required<[...Deps]>) : null}
        </>
    );
};
