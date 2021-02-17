import * as vscode from 'vscode';
import { injectJavascriptReferences } from './fileReferenceUpdater';
import { verifyTypes } from './dependencyInstaller';
import { registerHoverProvider } from './hoverProvider';
import { DocumentationSearch } from './docsSearch';
import { existsSync, writeFileSync, readFileSync } from 'fs';
import * as path from 'path';

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

    // Status Bar Docs Command
    disposable = vscode.commands.registerCommand('altv-docs', () => {
        new DocumentationSearch(context.extensionUri.fsPath);
        DocumentationSearch.showQuickPick();
    });

    context.subscriptions.push(disposable);
    interval = setInterval(waitForSetup, 15000);
    waitForSetup();
}

async function waitForSetup() {
    console.log(`alt:V IDE - Waiting for altv-server...`);

    const serverExists = await vscode.workspace.findFiles('altv-server.*');
    if (serverExists.length <= 0) {
        return;
    }

    clearInterval(interval);

    // If this happens to fail; we'll just ignore the error and let it be used like normal.
    // No biggie.
    const typesReady = await verifyTypes().catch((err) => {
        return true;
    });

    if (!typesReady) {
        return;
    }

    // Used to generate the status bar at the bottom of the IDE.
    disposable = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
    disposable.command = 'altv-docs';
    disposable.text = 'Open alt:V Docs';
    disposable.show();
    extensionContext.subscriptions.push(disposable);

    // Used to generate links to documentation when hovering over elements.
    disposable = registerHoverProvider({ language: 'typescript' }, true);
    extensionContext.subscriptions.push(disposable);

    disposable = registerHoverProvider({ language: 'javascript' }, true);
    extensionContext.subscriptions.push(disposable);

    // Used when a markdown link is clicked from within vscode hover features.
    disposable = vscode.workspace.onDidOpenTextDocument(DocumentationSearch.documentTrigger);
    extensionContext.subscriptions.push(disposable);

    // Handles injecting javascript references to .js and .mjs files.
    disposable = vscode.window.onDidChangeActiveTextEditor(injectJavascriptReferences);
    extensionContext.subscriptions.push(disposable);

    vscode.window.showInformationMessage(`alt:V Docs - Workspace Validated! Let's get coding!`);
}

export function getRootPath(): string | null {
    return extensionPath;
}
