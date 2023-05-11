import webpack from 'webpack';
import { generateTypeCheckerConfig } from '@scripts/configs/web/webpack.type-check';

export async function typeCheck() {
    const compiler = webpack(await generateTypeCheckerConfig());

    compiler.run((error, result) => {
        if (error || result?.hasErrors()) {
            console.log('error', error, result?.compilation?.getErrors());
            process.exit(1);
        }
    });
}
