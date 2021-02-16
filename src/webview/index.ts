import * as fs from 'fs';
import * as vscode from 'vscode';
import * as path from 'path';
import * as glob from 'glob';
import { getRootPath } from '../extension';

export class DocsViewPanel {
    public static readonly viewType = 'altv.docsView';
    public panel: vscode.WebviewPanel;

    constructor() {
        const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
        this.panel = vscode.window.createWebviewPanel(DocsViewPanel.viewType, 'alt:V Docs', vscode.ViewColumn.Beside, {
            enableScripts: true,
        });

        // Register Event Broker
        this.panel.webview.onDidReceiveMessage(this.eventBroker.bind(this));
        this.panel.webview.html = fs
            .readFileSync(path.join(getRootPath() as string, '/resources/index.html'))
            .toString();
    }

    /**
     * Lets the WebView switch between commands sent from the WebView.
     * @param {{ command: string; text: string }} data
     * @return {*}
     * @memberof DocsViewPanel
     */
    eventBroker(data: { command: string; text: string }) {
        switch (data.command) {
            case 'fetch-files':
                this.populateFiles();
                break;
            case 'fetch-file':
                this.fetchFile(data.text);
                break;
            default:
                return;
        }
    }

    populateFiles() {
        const rootPath = getRootPath() as string;
        const currentFiles = glob
            .sync(path.join(getRootPath() as string, '/docs/**/*.md'))
            .map((f) => f.substr(rootPath.length + 1));

        this.panel.webview.postMessage({ command: 'fetch-files', files: currentFiles });
    }

    fetchFile(fileName: string) {
        const rootPath = getRootPath() as string;
        const markdown = fs.readFileSync(path.join(rootPath, `/${fileName}`)).toString();
        this.panel.webview.postMessage({ command: 'fetch-file', markdown });
    }
}
