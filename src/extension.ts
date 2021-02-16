import * as vscode from 'vscode';
import { updateJavascriptFile } from './fileReferenceUpdater';
import { verifyTypes } from './dependencyInstaller';
import { registerHoverProvider } from './hoverProvider';
import { DocsViewPanel } from './webview';

let extensionPath: null | string = null;

//Extension
export async function activate(context: vscode.ExtensionContext) {
    let disposable;

    extensionPath = context.extensionPath;

    if (!extensionPath) {
        console.error('No idea how you ran into this error. But it is an error. Cannot get the extension path.');
        return;
    }

    const serverExists = await vscode.workspace.findFiles('altv-server.*');
    if (serverExists.length <= 0) {
        return;
    }

    const typesReady = await verifyTypes();

    if (!typesReady) {
        vscode.window.showErrorMessage(`alt:V Docs - Close package.json and re-open VSCode in this folder.`);
        return;
    }

    disposable = vscode.commands.registerCommand('alt:V-Test', () => new DocsViewPanel());
    context.subscriptions.push(disposable);

    disposable = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
    disposable.command = 'alt:V-Test';
    disposable.text = 'alt:V Docs';
    disposable.show();
    context.subscriptions.push(disposable);

    // Hover Handler
    disposable = registerHoverProvider({ language: 'typescript' }, true);
    context.subscriptions.push(disposable);

    disposable = registerHoverProvider({ language: 'javascript' }, true);
    context.subscriptions.push(disposable);

    // Text Editor Handler
    disposable = vscode.window.onDidChangeActiveTextEditor((e) => {
        updateJavascriptFile(e?.document as vscode.TextDocument);
    });
    context.subscriptions.push(disposable);

    vscode.window.showInformationMessage(`alt:V Docs - Workspace Validated! Let's get coding!`);
}

export function getRootPath(): string | null {
    return extensionPath;
}
