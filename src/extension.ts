import * as vscode from 'vscode';
import { updateJavascriptFile } from './fileReferenceUpdater';
import { verifyTypes } from './dependencyInstaller';
import { getHoverFilePath, registerHoverProvider } from './hoverProvider';
import { DocumentationSearch } from './docsSearch';
import { existsSync, writeFileSync } from 'fs';
import * as path from 'path';

let extensionPath: null | string = null;

//Extension
export async function activate(context: vscode.ExtensionContext) {
    let disposable;

    extensionPath = context.extensionPath;

    if (!extensionPath) {
        console.error('No idea how you ran into this error. But it is an error. Cannot get the extension path.');
        return;
    }

    if (!existsSync(path.join(extensionPath, './.firstLoad'))) {
        writeFileSync(path.join(extensionPath, './.firstLoad'), 'Thanks for trying alt:V IDE!');
        DocumentationSearch.showGettingStarted();
    }

    // Status Bar Docs Command
    disposable = vscode.commands.registerCommand('altv-docs', () => {
        new DocumentationSearch(context.extensionUri.fsPath);
        DocumentationSearch.showQuickPick();
    });
    context.subscriptions.push(disposable);

    const serverExists = await vscode.workspace.findFiles('altv-server.*');
    if (serverExists.length <= 0) {
        return;
    }

    const typesReady = await verifyTypes();

    if (!typesReady) {
        vscode.window.showErrorMessage(`alt:V Docs - Close package.json and re-open VSCode in this folder.`);
        DocumentationSearch.showGettingStarted();
        return;
    }

    // Create Status Bar Text
    disposable = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
    disposable.command = 'altv-docs';
    disposable.text = 'Open alt:V Docs';
    disposable.show();
    context.subscriptions.push(disposable);

    // Hover Handler
    disposable = registerHoverProvider({ language: 'typescript' }, true);
    context.subscriptions.push(disposable);

    disposable = registerHoverProvider({ language: 'javascript' }, true);
    context.subscriptions.push(disposable);

    // Used to trigger certain actions when opening from a file.
    disposable = vscode.workspace.onDidOpenTextDocument((e) => {
        // Triggered when a file is opened from hover view.
        if (e?.fileName.includes('altvFileOpener')) {
            vscode.commands.executeCommand(`workbench.action.closeActiveEditor`).then((res) => {
                const filePath = getHoverFilePath();
                if (filePath === '') {
                    return;
                }

                vscode.commands.executeCommand('markdown.showPreviewToSide', vscode.Uri.file(filePath));
            });
            return;
        }
    });
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
