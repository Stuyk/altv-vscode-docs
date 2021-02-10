# alt:V VSCode Docs

A beautiful way to get information about coding for alt:V without stumbling around in the dark.

This will give you information about what you are typing by hovering over different elements in your code. However, it will not cover all elements.

Just in most cases you can get general information while working with the alt:V API.

## Installation

Click the install button above. It's that easy.

## Usage

**Important**
Open up a _workspace folder_ where `altv-server` is located.

**!! WARNING !!**
This will not work without `altv-server` present.

## Features

### Verifies the alt:V Workspace

This will check if `altv-server` is present in your workspace directory.

### Type Installer for alt:V Types

Sets up your workspace to install missing dependencies needed for alt:V.

**Requires** `package.json` to be present.

![](https://i.imgur.com/UAuSR7O.png)

### Auto Reference Builder for `.js` and `.mjs`

Adds references to the tops of files if using `.js` or `.mjs`. Which automatically figures out if you're on client-side or server-side.

![](https://i.imgur.com/30RaULb.png)

### Adds "type": "module" to package.json

Automatically fixes a module bug that users often overlook

![](https://i.imgur.com/uwF7H9F.png)

### Additional Type Information

Simply hover over elements and it will tell you if it has information about it or not.

![](https://thumbs.gfycat.com/EnviousSecondhandBullfrog-size_restricted.gif)

## Basic Contribution Guidelines

-   Download the Repository
-   Install Dependencies
-   Start Writing `.md` files in the `docs` folder.

Basically each folder is a prefix for some documentation.

![](https://i.imgur.com/gokOSIN.png)

Adding the documentation means it needs to be small. Very small.

Try not to take up more than `10` lines if at all possible.

## Using from Repository

If you are running this from the cloned github repository.

-   NodeJS 13+
-   Run `npm install` in terminal to install dependencies
-   Run the `Run Extension` target in the Debug View. This will:
    -   Start a task `npm: watch` to compile the code
    -   Run the extension in a new VS Code window

You can also hit F5 in VSCode to debug the extension.

## Changelog

```
1.0.5
- Must have 'altv-server' in workspace to start.

1.0.4
- Better Word Lookup Extension
- Auto Install Missing Dependencies
- Auto Check if `altv-server` workspace
- Auto Install References for .js / .mjs
- Organized Folders

1.0.3
- Added server alt definitions

1.0.2
- Added Client / Server Check
- Added Vehicle

1.0.1
- Added Basic Player Parameters

1.0.0
- Release Template
```
