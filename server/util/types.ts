export type Identifier = string;
export type RecordExclude<T, K> = {
    [P in keyof T]: Exclude<T[P], K>;
};
