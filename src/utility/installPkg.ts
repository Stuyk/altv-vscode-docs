import { ChildProcess, exec } from 'child_process';

export function installPkg(packages: Array<string>, opts: any) {
    if (packages.length == 0 || !packages || !packages.length) {
        return Promise.reject('No packages found');
    }

    if (typeof packages == 'string') {
        packages = [packages];
    }

    for(let i = 0; i < packages.length; i++) {
        packages[i] = `${packages[i]}@latest`
    }

    if (!opts) {
        opts = {};
    }

    const cmdString =
        'npm install ' +
        packages.join(' ') +
        ' ' + '--save-dev'

    return new Promise((resolve, reject) => {
        exec(
            cmdString,
            { cwd: opts.cwd ? opts.cwd : '/', maxBuffer: opts.maxBuffer ? opts.maxBuffer : 200 * 1024 },
            (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            }
        );
    });
}
