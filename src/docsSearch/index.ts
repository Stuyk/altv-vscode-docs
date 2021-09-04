import * as fs from 'fs';
import * as glob from 'glob';
import * as gm from 'gray-matter';
import * as path from 'path';
import * as vscode from 'vscode';

import { getRootPath } from '../extension';
import { getUrlFromFilePath } from '../utility/uriPaths';

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

    static showGettingStarted() {
        const uri = vscode.Uri.file(path.join(getRootPath() as string, '/docsStatic/welcome.md'));
        vscode.commands.executeCommand('markdown.showPreviewToSide', uri, vscode.ViewColumn.Active);
    }

    static openUrlPath(result: { title: string, url: string }) {
        if (!result || !result.url) {
            return;
        }

        const panel = vscode.window.createWebviewPanel('altvDocLookup', result.title, vscode.ViewColumn.Beside, {});
        panel.webview.html = `
            <!DOCTYPE html>
            <html lang="en" style="height: 100%">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${result.title}</title>
            </head>
            <body style="margin:0px;padding:0px;overflow:hidden; height: 100%;">
                <iframe src="${result.url}" frameborder="0" style="overflow:hidden;height:100%;width:100%" height="100%" width="100%"></iframe>
            </body>
            </html>
        `;
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

            console.log(selected.label);

            const result = getUrlFromFilePath(selected.filePath);
            DocumentationSearch.openUrlPath({ title: selected.label, url: result })
            quickPick.dispose();
        });

        quickPick.onDidHide(() => {
            quickPick.dispose();
        });

        quickPick.show();
    }
}
