import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import * as wget from 'wget-improved';
import * as unzipper from 'unzipper';

import { installPkg } from '../utility/installPkg';

const mainDocsURL = `https://github.com/Stuyk/altv-markdown-docs/archive/refs/heads/main.zip`;
let rootDirectory: string;
let extensionDirectory: vscode.ExtensionContext;

const packagesToInstall = [
    '@altv/types-client',
    '@altv/types-natives',
    '@altv/types-server',
    '@altv/types-webview',
    '@altv/types-shared',
];

export class DependencyInstaller {
    /**
     * Loads dependencies, typings, etc.
     * Also helps setup missing project settings.
     * @static
     * @return {*}  {Promise<boolean>}
     * @memberof DependencyInstaller
     */
    static async load(context: vscode.ExtensionContext): Promise<boolean> {
        extensionDirectory = context;

        const files = await vscode.workspace.findFiles('package.json');

        if (!files || !Array.isArray(files) || files.length <= 0) {
            return false;
        }

        const packageData = fs.readFileSync(files[0].fsPath).toString();
        const folders = vscode.workspace.workspaceFolders;

        if (!folders) {
            vscode.window.showErrorMessage(
                `[alt:V IDE] Failed to load 'package.json' please run 'npm init' in a console / terminal.`
            );
            return false;
        }

        rootDirectory = folders[0].uri.fsPath;
        const packageJSON = fs.readFileSync(path.join(rootDirectory, 'package.json')).toString();
        const pkgData = JSON.parse(packageJSON);

        await DependencyInstaller.refreshDocumentation();
        await DependencyInstaller.addModuleType(pkgData, rootDirectory);
        await DependencyInstaller.addJsTypings(rootDirectory);

        // Installs Dependencies
        await installPkg(packagesToInstall, { saveDev: true, cwd: rootDirectory }).catch((err) => {
            vscode.window.showErrorMessage(err);
        });

        return true;
    }

    /**
     * Adds 'type': 'module' to the package.json
     * @static
     * @param {{ type?: string }} pkgData
     * @param {string} rootDirectory
     * @return {*}  {boolean}
     * @memberof DependencyInstaller
     */
    static addModuleType(pkgData: { type?: string }, rootDirectory: string): boolean {
        if (pkgData.type && pkgData.type === 'module') {
            return true;
        }

        pkgData.type = 'module';
        fs.writeFileSync(path.join(rootDirectory, 'package.json'), JSON.stringify(pkgData, null, '\t'));
        vscode.window.showInformationMessage(`[alt:V IDE] Added type 'module' to package.json`);
        return true;
    }

    /**
     * Adds jsconfig to create typings support for alt:V JavaScript based project.
     * @static
     * @param {string} rootDirectory
     * @return {*}  {boolean}
     * @memberof DependencyInstaller
     */
    static addJsTypings(rootDirectory: string): boolean {
        // Using Typescript. No need to add it.
        if (fs.existsSync(path.join(rootDirectory, 'tsconfig.json'))) {
            return true;
        }

        // Already have jsconfig.json file.
        if (fs.existsSync(path.join(rootDirectory, 'jsconfig.json'))) {
            return true;
        }

        const jsconfig = {
            compilerOptions: {
                target: 'esNext',
                module: 'esNext',
                rootDir: '.',
                typeRoots: ['./node_modules/@altv'],
            },
        };

        fs.writeFileSync(path.join(rootDirectory, 'jsconfig.json'), JSON.stringify(jsconfig, null, '\t'));
        vscode.window.showInformationMessage(`[alt:V IDE] Created 'jsconfig.json' for JavaScript Project`);
        return true;
    }

    static async copyDirectory(source: string, destination: string) {
        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination, { recursive: true });
        }

        fs.readdirSync(source, { withFileTypes: true }).forEach((entry) => {
            let sourcePath = path.join(source, entry.name);
            let destinationPath = path.join(destination, entry.name);

            entry.isDirectory()
                ? DependencyInstaller.copyDirectory(sourcePath, destinationPath)
                : fs.copyFileSync(sourcePath, destinationPath);
        });
    }

    /**
     * Refreshes documentation locally.
     * @static
     * @return {*}  {Promise<boolean>}
     * @memberof DependencyInstaller
     */
    static async refreshDocumentation(): Promise<boolean> {
        const docsPath = path.join(extensionDirectory.extensionPath, './docs');
        const outputPath = path.join(extensionDirectory.extensionPath, './docs.zip');

        if (fs.existsSync(docsPath)) {
            fs.rmdirSync(docsPath, { recursive: true });
        }

        if (fs.existsSync(outputPath)) {
            fs.unlinkSync(outputPath);
        }

        await new Promise((resolve: Function) => {
            const download = wget.download(mainDocsURL, outputPath);

            download.on('end', () => {
                return resolve(true);
            });
        });

        const stream = fs.createReadStream(outputPath).pipe(unzipper.Extract({ path: docsPath }));

        await new Promise((resolve: Function) => {
            stream.on('close', () => {
                resolve();
            });
        });

        if (fs.existsSync(outputPath)) {
            fs.unlinkSync(outputPath);
        }

        const actualSource = path.join(docsPath, './altv-markdown-docs-main');
        await DependencyInstaller.copyDirectory(actualSource, docsPath);

        if (fs.existsSync(actualSource)) {
            fs.rmdirSync(actualSource, { recursive: true });
        }

        vscode.window.showInformationMessage(`[alt:V IDE] Documentation Refreshed`);
        return true;
    }
}
