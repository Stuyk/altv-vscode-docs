import * as vscode from 'vscode';
import { sleep } from '../utility/sleep';

export async function updateJavascriptFile(document: vscode.TextDocument) {
    if (!document) {
        return;
    }

    if (document.fileName.includes('.json')) {
        return;
    }

    if (document.fileName.includes('.ts')) {
        return;
    }

    if (!document.fileName.includes('.js') && !document.fileName.includes('.mjs')) {
        console.log(`alt:V Debug - Not a JavaScript file.`);
        return;
    }

    const typeInfo = getTypes(document);
    if (!typeInfo) {
        return;
    }

    let needsClientRef = true;
    let needsNativesRef = true;
    let needsServerRef = true;

    let maxLineCheck = 25;

    if (document.lineCount < maxLineCheck) {
        maxLineCheck = document.lineCount;
    }

    if (typeInfo === 'client') {
        needsServerRef = false;
    } else {
        needsClientRef = false;
        needsNativesRef = false;
    }

    for (let i = 0; i < maxLineCheck; i++) {
        const searchLine = document.lineAt(i);

        if (typeInfo === 'client') {
            if (searchLine.text.includes('@altv/types-client')) {
                needsClientRef = false;
            }

            if (searchLine.text.includes('@altv/types-natives')) {
                needsNativesRef = false;
            }

            continue;
        }

        if (searchLine.text.includes('@altv/types-server')) {
            needsServerRef = false;
        }
    }

    if (needsServerRef) {
        const editor = vscode.window.activeTextEditor;
        editor?.edit((editBuilder) => {
            editBuilder.insert(new vscode.Position(0, 0), '/// <reference types="@altv/types-server" />\r\n');
        });
    }

    await sleep(250);

    if (needsNativesRef) {
        const editor = vscode.window.activeTextEditor;
        editor?.edit((editBuilder) => {
            editBuilder.insert(new vscode.Position(0, 0), '/// <reference types="@altv/types-natives" />\r\n');
        });
    }

    await sleep(250);

    if (needsClientRef) {
        const editor = vscode.window.activeTextEditor;
        editor?.edit((editBuilder) => {
            editBuilder.insert(new vscode.Position(0, 0), '/// <reference types="@altv/types-client" />\r\n');
        });
    }
}

function getTypes(document: vscode.TextDocument): string | false {
    let maxLineCheck = 25;

    if (document.lineCount < maxLineCheck) {
        maxLineCheck = document.lineCount;
    }

    for (let i = 0; i < maxLineCheck; i++) {
        const searchLine = document.lineAt(i);

        if (searchLine.text.includes("from 'alt-server'") || searchLine.text.includes('from "alt-server"')) {
            return 'server';
        }

        if (
            searchLine.text.includes("from 'alt-client'") ||
            searchLine.text.includes('from "alt-client"') ||
            searchLine.text.includes('from "alt-natives"') ||
            searchLine.text.includes("from 'alt-natives'")
        ) {
            return 'client';
        }
    }

    return false;
}
