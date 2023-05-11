import chalk from 'chalk';

const LOG_SYMBOL = {
    SUCCESS: `${chalk.bgGreenBright.black(`  成功  `)}  🎉`,
    IN_PROCESSING: `${chalk.bgBlueBright.black(` 处理中 `)}  🚀`,
    FAILED: `${chalk.bgRedBright.black('  失败  ')}  💀`,
};

const statusLogger = {
    processing: (...args: any[]) =>
        console.log(LOG_SYMBOL.IN_PROCESSING, chalk.blueBright(...args)),
    success: (...args: any[]) => console.log(LOG_SYMBOL.SUCCESS, chalk.greenBright(...args)),
    failed: (...args: any[]) => console.log(LOG_SYMBOL.FAILED, chalk.redBright(...args)),
};

export { statusLogger };
