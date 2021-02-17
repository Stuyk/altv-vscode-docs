import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { installPkg } from '../utility/installPkg';

const packagesToInstall = ['@altv/types-client', '@altv/types-natives', '@altv/types-server', '@altv/types-webview'];

export async function verifyTypes() {
    return await vscode.workspace.findFiles('package.json').then(async (res) => {
        // Check if 'package.json' exists.
        if (res.length <= 0) {
            vscode.window.showErrorMessage(
                'alt:V Docs - Failed to load "package.json" aborting. Please run `npm init` first or close "package.json". Then re-open vscode in this folder.'
            );
            return false;
        }

        const packageData = fs.readFileSync(res[0].fsPath).toString();
        const folders = vscode.workspace.workspaceFolders;

        if (!folders || !packageData) {
            vscode.window.showErrorMessage(
                'alt:V Docs - Failed to load "package.json" aborting. Please run `npm init` first or close "package.json". Then re-open vscode in this folder.'
            );
            return false;
        }

        const rootDirectory = folders[0].uri.fsPath;
        const packageJSON = fs.readFileSync(path.join(rootDirectory, 'package.json')).toString();
        const pkgData = JSON.parse(packageJSON);

        if (!pkgData.type || pkgData.type !== 'module') {
            pkgData.type = 'module';
            fs.writeFileSync(path.join(rootDirectory, 'package.json'), JSON.stringify(pkgData, null, '\t'));
            vscode.window.showInformationMessage('alt:V Docs - Added "type: module" to package.json');
        }

        if (pkgData.devDependencies) {
            for (const dependencyName in pkgData.devDependencies) {
                if (packagesToInstall.includes(dependencyName)) {
                    continue;
                }
            }
        }

        let allPassed = true;

        for (let i = 0; i < packagesToInstall.length; i++) {
            const packageName = packagesToInstall[i];

            if (packageData.includes(packageName)) {
                continue;
            }

            await installPkg([packageName], { saveDev: true, cwd: rootDirectory }).catch((err) => {
                console.log(err);
                allPassed = false;
            });
        }

        if (!allPassed) {
            vscode.window.showErrorMessage(
                'alt:V Docs - Failed to load. Open workspace folder where "altv-server" is located.'
            );
            return false;
        }

        return true;
    });
}
