import { spawn } from 'node:child_process';
import { printBanner } from '@spotter/banner';

export async function devWeb() {
    printBanner();

    // eslint-disable-next-line unicorn/prefer-module
    const child = spawn('vite', ['-c', './scripts/vite/configs/vite.config.ts', '--host'], {
        stdio: 'inherit',
    });
    child.stdout?.on('data', (data) => {
        process.stdout.write(data.toString());
    });
    child.stderr?.on('data', (data) => {
        process.stderr.write(data.toString());
    });
}
