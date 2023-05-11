import fsExtra from 'fs-extra';
import fs from 'node:fs';
import { resolve, basename, extname } from 'node:path';
import CosSDK from 'cos-nodejs-sdk-v5';
import loadConfiguration from '@server/infra/setting/load';
import filesize from 'filesize';
import chalk from 'chalk';
import { statusLogger } from '@scripts/utils/console';
import * as AWS from '@aws-sdk/client-s3';
import mime from 'mime';

const ENV_PARAMS = {
    assetPublicPath: process.env.ASSET_PUBLIC_PATH,
    s3: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        bucket: process.env.AWS_S3_BUCKET as string,
        region: process.env.AWS_S3_REGION as string,
    },
    cos: {
        secretId: process.env.COS_SECRET_ID,
        secretKey: process.env.COS_SECRET_KEY,
        bucket: process.env.COS_BUCKET as string,
        region: process.env.COS_REGION as string,
    },
};

const s3Client = new AWS.S3({
    credentials: {
        accessKeyId: ENV_PARAMS.s3.accessKeyId as string,
        secretAccessKey: ENV_PARAMS.s3.secretAccessKey as string,
    },
    region: ENV_PARAMS.s3.region,
});

const cosSDK = new CosSDK({
    SecretId: ENV_PARAMS.cos.secretId,
    SecretKey: ENV_PARAMS.cos.secretKey,
});

// 需要忽略的文件扩展名
const IGNORE_EXT = new Set(['.txt', '.map']);

type AssetMap = Record<
    string,
    {
        size: bigint;
    }
>;

export const assetTotalStatistics = (
    ignoredCount: number,
    publishedCount: number,
    detailCount: {
        js: number;
        css: number;
        other: number;
    },
) => {
    const { js, css, other } = detailCount;
    const maxBar = 100;
    statusLogger.success('应用静态资产文件发布成功');
    console.log();
    console.log(
        `已忽略 ${chalk.greenBright(ignoredCount)} 个文件，已发布 ${chalk.greenBright(
            publishedCount,
        )} 个静态资产文件。`,
    );
    console.log();
    console.log(
        `- ${chalk.cyan('js  ')}: [${Array.from({
            length: Math.floor((js * maxBar) / publishedCount),
        })
            .fill('=')
            .join('')}]  ${chalk.cyanBright(
            `${((js * 100) / publishedCount).toFixed(2)}% | ${js}`,
        )} `,
    );
    console.log();
    console.log(
        `- ${chalk.cyan('css ')}: [${Array.from({
            length: Math.floor((css * maxBar) / publishedCount),
        })
            .fill('=')
            .join('')}]  ${chalk.cyanBright(
            `${((css * 100) / publishedCount).toFixed(2)}% | ${css}`,
        )} `,
    );
    console.log();
    console.log(
        `- ${chalk.cyan('其他 ')}: [${Array.from({
            length: Math.floor((other * maxBar) / publishedCount),
        })
            .fill('=')
            .join('')}]  ${chalk.cyanBright(
            `${((other * 100) / publishedCount).toFixed(2)}% | ${other}`,
        )} `,
    );
    console.log();
};
export const publishedAssetStatistics = (
    ext: string,
    list: CosSDK.PutObjectResult[],
    assetMap: AssetMap,
) => {
    const assetList = list.map((res) => {
        const assetName = basename(res.Location);
        return {
            name: assetName,
            size: assetMap[assetName].size,
        };
    });
    console.log(
        `本次发布的 ${chalk.cyan(ext)} 资产清单（${chalk.yellow(
            filesize(assetList.reduce((p, c) => p + c.size, BigInt(0)).toString() as any),
        )}） `,
    );

    for (const [index, asset] of assetList.entries()) {
        console.log(
            `   ${index + 1}. ${chalk.whiteBright(asset.name)}    ${chalk.yellow(
                filesize(asset.size.toString() as any),
            )}`,
        );
    }
    console.log();
};

export const ignoredAssetStatistics = (assetNames: string[], appStaticRootPath: string) => {
    const ignoredAssetNames = assetNames.filter((f) => {
        const ext = extname(f);
        return !ext || IGNORE_EXT.has(ext);
    });
    const ignored = chalk.hex('#6c727e');
    if (ignoredAssetNames.length) {
        console.log(
            ignored(
                `已忽略的资产清单（${chalk.yellow(
                    filesize(
                        ignoredAssetNames
                            .reduce(
                                (p, assetName) =>
                                    p +
                                    fs.statSync(resolve(appStaticRootPath, assetName), {
                                        bigint: true,
                                    }).size,
                                BigInt('0'),
                            )
                            .toString() as any,
                    ),
                )}）`,
            ),
        );
        for (const [index, ignoredAssetName] of assetNames
            .filter((f) => {
                const ext = extname(f);
                return !ext || IGNORE_EXT.has(ext);
            })
            .entries()) {
            console.log(ignored(`   ${index + 1}. ${ignoredAssetName} `));
        }
    }
};

export async function publishWeb() {
    const { server } = loadConfiguration();
    const {
        runtime: { appRootPath },
        staticRootPath,
    } = server;
    const appStaticRootPath = resolve(appRootPath, staticRootPath);
    if (fsExtra.pathExistsSync(appStaticRootPath)) {
        console.log();
        statusLogger.processing('正在发布应用静态资产...');
        console.log();
        // 扫描静态目录下 depth=1 的文件
        const assetPublishReqs: Promise<CosSDK.PutObjectResult>[] = [];
        const globalAssetsPublishReqs: Promise<any>[] = [];
        const assetNames = fs.readdirSync(appStaticRootPath);
        const assetsMap: AssetMap = {};
        /**
         * 忽略以下文件
         * 1. 不存在扩展名
         * 2. 扩展名匹配需要忽略的扩展 IGNORE_EXT
         */
        const validAssetNames = assetNames.filter((f) => {
            const ext = extname(f);
            return ext && !IGNORE_EXT.has(ext);
        });
        for (const assetName of validAssetNames) {
            const assetPath = resolve(appStaticRootPath, assetName);
            // 记录资产文件相关信息的 map
            assetsMap[assetName] = {
                size: fs.statSync(assetPath, { bigint: true }).size,
            };
            assetPublishReqs.push(
                new Promise<CosSDK.PutObjectResult>((_resolve, reject) => {
                    cosSDK.putObject(
                        {
                            Bucket: ENV_PARAMS.cos.bucket as string,
                            Region: ENV_PARAMS.cos.region as string,
                            Key: assetName,
                            Body: fs.createReadStream(assetPath),
                            ContentLength: fs.statSync(assetPath).size,
                        },
                        (err, data) => {
                            if (err) {
                                reject(err);
                            }
                            if (data) {
                                _resolve(data);
                            }
                        },
                    );
                }),
            );
            globalAssetsPublishReqs.push(
                s3Client.putObject({
                    Bucket: ENV_PARAMS.s3.bucket,
                    Key: assetName,
                    Body: fs.createReadStream(assetPath),
                    ContentLength: fs.statSync(assetPath).size,
                    ContentType: mime.getType(extname(assetPath))!,
                }),
            );
        }
        try {
            const resList = await Promise.all(assetPublishReqs);
            const globalList = await Promise.all(globalAssetsPublishReqs);
            const jsResList = resList.filter((data) => extname(data.Location) === '.js');
            const cssResList = resList.filter((data) => extname(data.Location) === '.css');
            const otherResList = resList.filter((data) => {
                const ext = extname(data.Location);
                return ext !== '.css' && ext !== '.js';
            });

            console.log(globalList);

            assetTotalStatistics(assetNames.length - validAssetNames.length, resList.length, {
                js: jsResList.length,
                css: cssResList.length,
                other: otherResList.length,
            });
            publishedAssetStatistics('js', jsResList, assetsMap);
            publishedAssetStatistics('css', cssResList, assetsMap);
            publishedAssetStatistics('其他', otherResList, assetsMap);
            ignoredAssetStatistics(assetNames, appStaticRootPath);
        } catch (error) {
            console.log();
            statusLogger.failed('由于意外的错误，发布终止');
            console.log();
            console.error(chalk.redBright(error));
            console.log();
            throw error;
        }
    } else {
        console.log('静态资产目录不存在');
    }
}
