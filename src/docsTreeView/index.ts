import * as vscode from 'vscode';

export class OutlineProvider implements vscode.TreeDataProvider<any> {
    constructor(private outline: any) {}

    getTreeItem(item: any): vscode.TreeItem {
        return new vscode.TreeItem(
            item.label,
            item.children.length > 0 ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.None
        );
    }

    getChildren(element?: any): Thenable<[]> {
        if (element) {
            return Promise.resolve(element.children);
        } else {
            return Promise.resolve(this.outline);
        }
    }
}
