import * as vscode from 'vscode';
import { updateJavascriptFile } from './fileReferenceUpdater';
import { verifyTypes } from './dependencyInstaller';
import { registerHoverProvider } from './hoverProvider';
import { OutlineProvider } from './docsTreeView';

const extensionName = `altv-vscode-helper`;
let extensionPath: null | string = null;

// Tree View Sample
// const dataObject = {
//     label: 'level one',
//     children: [
//         {
//             label: 'level two a',
//             children: [
//                 {
//                     label: 'level three',
//                     children: [],
//                 },
//             ],
//         },
//         {
//             label: 'level two b',
//             children: [],
//         },
//     ],
// };

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
        vscode.window.showErrorMessage(`alt:V Docs - Did not find type extensions. Please install them now.`);
        return;
    }

    // Eventual Tree View?
    // disposable = vscode.window.registerTreeDataProvider('explorer-docs', new OutlineProvider([dataObject, dataObject]));
    // context.subscriptions.push(disposable);

    disposable = registerHoverProvider({ language: 'typescript' }, true);
    context.subscriptions.push(disposable);

    disposable = registerHoverProvider({ language: 'javascript' }, true);
    context.subscriptions.push(disposable);

    disposable = vscode.window.onDidChangeActiveTextEditor((e) => {
        updateJavascriptFile(e?.document as vscode.TextDocument);
    });
    context.subscriptions.push(disposable);

    vscode.window.showInformationMessage(`alt:V Docs - Workspace Validated! Let's get coding!`);
}

export function getRootPath(): string | null {
    return extensionPath;
}
