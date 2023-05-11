import webpack from 'webpack';
import { publishWeb } from '@scripts/actions/publishWeb';
import { generateProdConfig } from '../configs/web/webpack.prod';

export async function buildWeb() {
    const compiler = webpack(await generateProdConfig());

    compiler.run((error) => {
        if (error) {
            console.error(error);
        } else {
            process.argv.includes('--release') && publishWeb();
        }
    });
}
