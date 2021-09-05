import * as vscode from 'vscode';

export class WebViewProvider {
    /**
     * Opens a WebView to a specific url.
     * @static
     * @param {{ title: string, url: string }} result
     * @return {*}
     * @memberof DocumentationSearch
     */
    static openUrlPath(result: { title: string; url: string }) {
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
}
