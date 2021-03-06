import * as vscode from 'vscode';
import * as path from 'path';
import * as glob from 'glob';
import * as fs from 'fs';
import * as gm from 'gray-matter';
import { getRootPath } from '../extension';
import { getHoverFilePath } from '../hoverProvider';

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

    /**
     * This is triggered by clicking on hoverable markdown files in code.
     * @static
     * @param {vscode.TextDocument} e
     * @return {*}
     * @memberof DocumentationSearch
     */
    static async documentTrigger(e: vscode.TextDocument) {
        if (!e || !e.fileName || !e.fileName.includes('altvFileOpener')) {
            return;
        }

        await vscode.commands.executeCommand(`workbench.action.closeActiveEditor`);

        const filePath = getHoverFilePath();
        if (filePath === '') {
            return;
        }

        vscode.commands.executeCommand('markdown.showPreviewToSide', vscode.Uri.file(filePath));
    }

    static showDocumentation(filePath: string, isHover: boolean = false) {
        const uri = vscode.Uri.file(filePath);

        if (!isHover) {
            vscode.commands.executeCommand('markdown.showPreviewToSide', uri, vscode.ViewColumn.Active);
            return;
        }

        vscode.commands.executeCommand(
            'markdown.showPreviewToSide',
            uri,
            vscode.ViewColumn.Beside | vscode.ViewColumn.Active | vscode.ViewColumn.Two
        );
    }

    static showGettingStarted() {
        const uri = vscode.Uri.file(path.join(getRootPath() as string, '/docs/welcome.md'));
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
