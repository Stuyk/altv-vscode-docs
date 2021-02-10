import { ChildProcess, exec } from 'child_process';

export function installPkg(packages: Array<string>, opts: any) {
    if (packages.length == 0 || !packages || !packages.length) {
        return Promise.reject('No packages found');
    }

    if (typeof packages == 'string') {
        packages = [packages];
    }

    if (!opts) {
        opts = {};
    }

    const cmdString =
        'npm install ' +
        packages.join(' ') +
        ' ' +
        (opts.global ? ' -g' : '') +
        (opts.save ? ' --save' : ' --no-save') +
        (opts.saveDev ? ' --save-dev' : '') +
        (opts.legacyBundling ? ' --legacy-bundling' : '') +
        (opts.noOptional ? ' --no-optional' : '') +
        (opts.ignoreScripts ? ' --ignore-scripts' : '');

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
