import * as vscode from 'vscode';
import * as path from 'path';
import * as glob from 'glob';
import * as fs from 'fs';
import * as gm from 'gray-matter';

let documentationFiles: Array<{ fileName: string; filePath: string; description: string }> = [];

interface altPickItem extends vscode.QuickPickItem {
    filePath: string;
    description: string;
}

interface altMatter {
    title?: string;
    description?: string;
    prefix?: string;
}

export class DocumentationSearch {
    public static readonly viewType = 'altv.docsView';

    constructor(contextUri: string) {
        documentationFiles = [];

        const currentFiles = glob.sync(path.join(contextUri, '/docs/**/*.md'));
        for (let i = 0; i < currentFiles.length; i++) {
            let filePath = currentFiles[i];
            let fileData = fs.readFileSync(filePath, 'utf8');

            try {
                const grayMatter = gm(fileData);
                const data = grayMatter.data as altMatter;

                documentationFiles.push({
                    fileName: `${data.prefix} ${data.title}`,
                    filePath,
                    description: data.description ? data.description : '',
                });
            } catch (err) {
                console.log(err);
            }
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
            return {
                label: fileData.fileName,
                filePath: fileData.filePath,
                description: fileData.description,
            } as altPickItem;
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
