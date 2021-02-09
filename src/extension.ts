import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

const extensionName = `altv-vscode-helper`;
let extensionPath: null | string = null;

//Extension
export function activate(context: vscode.ExtensionContext) {
    let disposable;

    extensionPath = context.extensionPath;

    if (!extensionPath) {
        console.error('No idea how you ran into this error. But it is an error. Cannot get the extension path.');
        return;
    }

    disposable = registerHoverProvider({ language: 'typescript' });
    context.subscriptions.push(disposable);

    disposable = registerHoverProvider({ language: 'javascript' });
    context.subscriptions.push(disposable);
}

// These are considered prefixes
// They return the relative file path that applies to the prefix.
// Example: alt.on, alt.emit, native.x
const prefixCases: { [key: string]: Function } = {
    alt: (word: string) => `alt.${word}`,
    native: (word: string) => `native.${word}`,
    player: (word: string) => `player.${word}`,
};

function getSwitchCaseRule(fullLineText: string, singleWord: string): string | boolean {
    const keys = Object.keys(prefixCases);

    for (let i = 0; i < keys.length; i++) {
        const newWord = prefixCases[keys[i]](singleWord);
        if (fullLineText.includes(newWord)) {
            return `${keys[i]}/${singleWord}`;
        }
    }

    return false;
}

function registerHoverProvider(selector: vscode.DocumentSelector): vscode.Disposable {
    return vscode.languages.registerHoverProvider(selector, {
        provideHover(document, position, token) {
            const fullLine = document.lineAt(position.line);
            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);

            const switchCaseRule = getSwitchCaseRule(fullLine.text, word);
            let fullPath = path.join(extensionPath as string, `./docs/${word}.md`);

            if (switchCaseRule) {
                fullPath = path.join(extensionPath as string, `./docs/${switchCaseRule}.md`);
            }

            if (!fs.existsSync(fullPath)) {
                return new vscode.Hover([`alt:V - No information for: ${word}`]);
            }

            const file = fs.readFileSync(fullPath);
            if (!file) {
                return new vscode.Hover([`alt:V - No information for: ${word}`]);
            }

            return new vscode.Hover(new vscode.MarkdownString('').appendMarkdown(file.toString()));
        },
    });
}
