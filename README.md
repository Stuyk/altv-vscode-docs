# Splunkit

A code formatter/beautify for .spl files - specifically around stats and rename commands. 

For functionality similar to Splunk App 'Ctrl + \\' functionality the "Format SPL" Extension Command from VS Extension 'Splunk Search Autocompletion Tool' (by [arcsector](https://github.com/arcsector/vscode-splunk-search-linter)) works well and is auto-run by this extension.

## Usage

```
Ctrl + Shift + P
> SPL Beautify
```

## Installation / Testing

If you are running this from the cloned github repository.

-   NodeJS 13+
-   Run `npm install` in terminal to install dependencies
-   Run the `Run Extension` target in the Debug View. This will:
    -   Start a task `npm: watch` to compile the code
    -   Run the extension in a new VS Code window

You can also hit F5 in VSCode to debug the extension.
