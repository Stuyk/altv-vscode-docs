import * as vscode from 'vscode';
import * as path from 'path';
import * as glob from 'glob';

let documentationFiles: Array<{ fileName: string; filePath: string }> = [];

interface altPickItem extends vscode.QuickPickItem {
    filePath: string;
}

export class DocumentationSearch {
    public static readonly viewType = 'altv.docsView';

    constructor(contextUri: string) {
        documentationFiles = [];

        const currentFiles = glob.sync(path.join(contextUri, '/docs/**/*.md'));
        for (let i = 0; i < currentFiles.length; i++) {
            let filePath = currentFiles[i];
            let fileName = currentFiles[i].substr(contextUri.length + 1);

            fileName = fileName.replace('docs/', '');

            if (fileName.includes('Client/')) {
                fileName = fileName.replace('Client', '');
                fileName = `[Client] ${fileName}`;
            } else if (fileName.includes('articles')) {
                fileName = `[Article] ${fileName}`;
            } else if (fileName.includes('tables')) {
                fileName = `[Tables] ${fileName}`;
            } else {
                fileName = `[Server] ${fileName}`;
            }

            fileName = fileName.replace('.md', '');
            fileName = fileName.replace(/\//g, '.');
            fileName = fileName.replace('articles.', '');
            fileName = fileName.replace('tables.', '');
            documentationFiles.push({ fileName, filePath });
        }

        console.log(`alt:V IDE - Found: ${documentationFiles.length} files for documentation.`);
    }

    static showDocumentation(filePath: string) {
        const uri = vscode.Uri.file(filePath);
        vscode.commands.executeCommand('markdown.showPreviewToSide', uri, vscode.ViewColumn.Active);
    }

    static showQuickPick() {
        const quickPick = vscode.window.createQuickPick();
        quickPick.items = documentationFiles.map((fileData) => {
            return { label: fileData.fileName, filePath: fileData.filePath } as altPickItem;
        });

        quickPick.onDidChangeSelection((selectedItems) => {
            const selected = selectedItems[0] as altPickItem;

            if (!selected.filePath) {
                quickPick.dispose();
                return;
            }

            DocumentationSearch.showDocumentation(selected.filePath);
            quickPick.dispose();
        });

        quickPick.onDidHide(() => {
            quickPick.dispose();
        });

        quickPick.show();
    }
}
