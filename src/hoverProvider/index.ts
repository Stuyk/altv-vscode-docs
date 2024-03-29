import * as fs from 'fs';
import * as gm from 'gray-matter';
import * as path from 'path';
import * as vscode from 'vscode';

import { getRootPath } from '../extension';
import { camelCaseIt } from '../utility/camelCase';
import { getUriFromFilePath } from '../utility/uriPaths';

// These are considered prefixes
// They return the relative file path that applies to the prefix.
// Example: alt.on, alt.emit, native.x
const prefixCases: { [key: string]: Function } = {
    alt: (word: string) => `alt.${word}`,
    native: (word: string) => `native.${word}`,
    player: (word: string) => `player.${word}`,
    Player: (word: string) => `Player.${word}`,
    vehicle: (word: string) => `vehicle.${word}`,
    Vehicle: (word: string) => `Vehicle.${word}`,
    local: (word: string) => `local.${word}`,
};

const replacements: { [key: string]: string } = {
    local: 'player',
};

function getSwitchCaseRule(fullLineText: string, singleWord: string, isClient: boolean = false): string | boolean {
    const keys = Object.keys(prefixCases);
    singleWord = camelCaseIt(singleWord);

    for (let i = 0; i < keys.length; i++) {
        const newWord = prefixCases[keys[i]](singleWord);
        // console.log(newWord);
        if (fullLineText.includes(newWord)) {
            let folderName = replacements[keys[i]] ? replacements[keys[i]] : keys[i];
            return `${folderName}${!isClient ? '' : 'Client'}/${singleWord}`;
        }
    }

    return false;
}

export function registerHoverProvider(
    selector: vscode.DocumentSelector,
    shouldInsertTypes: boolean = false
): vscode.Disposable {
    return vscode.languages.registerHoverProvider(selector, {
        provideHover(document, position) {
            const fullLine = document.lineAt(position.line);
            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);

            let maxLineCheck = 25;

            if (document.lineCount < maxLineCheck) {
                maxLineCheck = document.lineCount;
            }

            let isClient = false;
            for (let i = 0; i < maxLineCheck; i++) {
                const searchLine = document.lineAt(i);
                if (searchLine.text.includes('alt-client') || searchLine.text.includes('natives')) {
                    isClient = true;
                    break;
                }
            }

            const extensionPath = getRootPath();
            const switchCaseRule = getSwitchCaseRule(fullLine.text, word, isClient);

            let fullPath = path.join(extensionPath as string, `./docs/${word}.md`);

            if (switchCaseRule) {
                fullPath = path.join(extensionPath as string, `./docs/${switchCaseRule}.md`);
            }

            if (!fs.existsSync(fullPath)) {
                return new vscode.Hover([]);
            }

            const file = fs.readFileSync(fullPath);
            if (!file) {
                return new vscode.Hover([]);
            }

            const result = getUriFromFilePath(gm(file.toString()), fullPath);
            const contents = new vscode.MarkdownString(`[>> Open Documentation (${result.title})](${result.uri})`);
            contents.isTrusted = true;
            return new vscode.Hover(contents);
        },
    });
}