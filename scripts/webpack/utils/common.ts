import { loader as MiniCssExtractLoader } from 'mini-css-extract-plugin';

export function getCssLoaders(importLoaders: number, isDev = false) {
    return [
        ...(!isDev ? [{ loader: MiniCssExtractLoader, options: { publicPath: '../' } }] : []),
        {
            loader: 'css-loader',
            options: {
                // 前面使用的每一个 loader 都需要指定 sourceMap 选项
                sourceMap: true,
                // 指定在 css-loader 前应用的 loader 的数量
                importLoaders,
            },
        },
        {
            loader: 'postcss-loader',
            options: { sourceMap: true },
        },
    ];
}
