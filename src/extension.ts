import { existsSync, readFileSync, writeFileSync } from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

import { DependencyInstaller } from './dependencyInstaller';
import { DocumentationSearch } from './docsSearch';
import { registerHoverProvider } from './hoverProvider';
import { WebViewProvider } from './webviewProvider';

let extensionPath: null | string = null;
let interval: NodeJS.Timeout;
let extensionContext: vscode.ExtensionContext;
let disposable;
let packageData: { version: string };
let fileName = '.firstLoad';

//Extension
export async function activate(context: vscode.ExtensionContext) {
    extensionContext = context;
    extensionPath = context.extensionPath;

    if (!extensionPath) {
        console.error('No idea how you ran into this error. But it is an error. Cannot get the extension path.');
        return;
    }

    try {
        const packageJSON = readFileSync(path.join(extensionPath, 'package.json')).toString();
        packageData = JSON.parse(packageJSON);
        fileName = `.version-${packageData.version}`;
    } catch (err) {
        console.error(`alt:V IDE - Could not read package.json`);
    }

    if (!existsSync(path.join(extensionPath, `./${fileName}`))) {
        writeFileSync(path.join(extensionPath, `./${fileName}`), `${fileName}`);
        DocumentationSearch.showGettingStarted();
    }

    interval = setInterval(waitForSetup, 2000);
    waitForSetup();
}

async function waitForSetup() {
    const serverExists = await vscode.workspace.findFiles('altv-server.*');
    if (serverExists.length <= 0) {
        return;
    }

    clearInterval(interval);

    // Used to generate the status bar at the bottom of the IDE.
    const disposableStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 99);
    disposableStatusBar.text = '📝 alt:V IDE - Loading...';
    disposableStatusBar.show();
    extensionContext.subscriptions.push(disposableStatusBar);

    // Loads Dependencies for Project
    await DependencyInstaller.load(extensionContext);

    // Used to generate the status bar at the bottom of the IDE.
    disposableStatusBar.text = '📝 alt:V Docs';
    disposableStatusBar.command = 'altv-docs';
    disposableStatusBar.tooltip = 'Open alt:V Documentation Search';
   
    // Used to open a webview url path to `altv.stuyk.com`
    disposable = vscode.commands.registerCommand('altv-vscode-docs.open-webview', WebViewProvider.openUrlPath);

    // Allows refreshing documentation on the fly.
    disposable = vscode.commands.registerCommand(
        'altv-vscode-docs.altv-docs-refresh',
        DependencyInstaller.refreshDocumentation
    );

    // Used to generate links to documentation when hovering over elements.
    disposable = registerHoverProvider({ language: 'typescript' }, true);
    extensionContext.subscriptions.push(disposable);

    disposable = registerHoverProvider({ language: 'javascript' }, true);
    extensionContext.subscriptions.push(disposable);

    // Tell people to stop using old shit we don't use anymore.
    disposable = vscode.window.onDidChangeActiveTextEditor((e: vscode.TextEditor | undefined) => {
        if (!e || !e.document) {
            return;
        }

        if (!e.document.fileName.includes('.mjs')) {
            return;
        }

        vscode.window.showErrorMessage(`[alt:V IDE] We stopped using .mjs a long time ago. 
            Change all your file extensions to .js and please add "type": "module" to your package.json to make it work.`);
    });

    // Status Bar Docs Command
    disposable = vscode.commands.registerCommand('altv-docs', () => {
        new DocumentationSearch(extensionContext.extensionUri.fsPath);
        DocumentationSearch.showQuickPick();
    });

    extensionContext.subscriptions.push(disposable);
}

export function getRootPath(): string | null {
    return extensionPath;
}
