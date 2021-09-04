import * as gm from 'gray-matter';
import * as vscode from 'vscode';

let urlsOutput = vscode.window.createOutputChannel("alt:V IDE URLS Output");

export function getUriFromFilePath(frontMatter: gm.GrayMatterFile<string>, filePath: string): {title: string, uri: vscode.Uri } {
    const urlPath = getUrlFromFilePath(filePath);
    const args = [{ url: urlPath, title: frontMatter.data.title }];
    const commandURI = vscode.Uri.parse(
        `command:altv-vscode-docs.open-webview?${encodeURIComponent(JSON.stringify(args))}`
    );

    return { title: frontMatter.data.title, uri: commandURI };
}

export function getUrlFromFilePath(filePath: string): string {
    let urlPath: string;

    urlPath = filePath.replace(/.*vscode-docs.*?(\/|\\)/gm, '');
    urlPath = urlPath.replace(/\\/g, '/');
    urlPath = urlPath.replace('.md', '.html');
    urlPath = `https://altv.stuyk.com/${urlPath}`;

    urlsOutput.appendLine(`alt:V IDE URL Path Created for ${urlPath}`);
    urlsOutput.show();

    return urlPath;
}
