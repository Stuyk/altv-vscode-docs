# alt:V - VSCode IDE

A beautiful way to get information about coding for alt:V without stumbling around in the dark. This will give you information about what you are typing by hovering over different elements in your code. However, it will not cover all elements. Just in most cases you can get general information while working with the alt:V API.

This tool provides human readable examples for the alt:V API while also ensuring that you don't spend too much time weeding through documentation files to figure out how something works.

This is an unofficial community extension for alt:V and the documentation that you find inside of it can be modified and updated.

[Made for Usage with altv.mp](https://altv.mp)

# Setup & Installation

-   Install the Extension
-   [Retrieve Server Files](https://altv.mp/#/downloads)
-   Initialize a folder with `npm init`
-   Setup your workspace with a similar hierachy as below.
-   Open the folder `myServer` in VSCode.
-   The extension will notify you if it loaded properly.

```sh
myServer/
├─── altv-server.exe OR altv-server
├─── libnode.dll
├─── server.cfg
├─── package.json # From running 'npm init'
├─── modules/
│    └─── js-module
└─── resources*/
    └─── myResource/
        ├─── server/
        ├─── client/
        └─── resource.cfg

* = Any Folder Name
```

# Important

⚠️ Open up a _workspace folder_ where `altv-server` is located.

⚠️ This will not work without `altv-server` present.

⚠️ If it does not work the first time you will need to re-open VSCode.

# Features

## Verifies the alt:V Workspace

Verifies if `altv-server` is present in the current workspace. The rest of the plugin will not load until a proper server infrastructure is setup. Please refer to the **Setup & Installation** guide above.

## Type Installer for alt:V Types

Sets up your workspace to install missing dependencies needed for alt:V.

**Requires** `package.json` to be present.

![](https://i.imgur.com/UAuSR7O.png)

## Auto Reference Injector for `.js` and `.mjs`

Adds references to the tops of files if using `.js` or `.mjs`. Which automatically figures out if you're on client-side or server-side. This is necessary for types to work properly for using non-typescript infrastructure.

![](https://i.imgur.com/9o3vAM1.png)

## Forces ES6

Automatically fixes a module bug that users often overlook. This ensures that you are working in an ES6 environment regardless of whether or not you are using Javascript or Typescript.

![](https://i.imgur.com/Zd8l97d.png)

## Quickly find Documentation

Hover over a type to get more information about the type. This uses the official alt:V Types but this also provides human readable examples by clicking on the `>> Open Documentation`.

![](https://thumbs.gfycat.com/FragrantCommonLangur-size_restricted.gif)

## Human Written Documentation

Simply click: `Open alt:V Docs` to bring up built-in documentation for alt:V Types with examples. This will provide basic examples of how to use certain namespaces, functions, and properties.

You can also use the command palette `CTRL + Shift + P` and type `alt:V Documentation` to browse docs.

![](https://thumbs.gfycat.com/CarelessDefiantDaddylonglegs-size_restricted.gif)

# Basic Contribution Guidelines

-   Download the Repository
-   Install Dependencies
-   Start Writing `.md` files in the `docs` folder.
-   Documentation needs to have examples or be an article about the topic.
-   New folders need to be programmed in for hovering over elements.
-   All `.md` files need `Front Matter` headers to be parsed. See other files to get an example of how all of that works.

Basically each folder is a prefix for some documentation.

![](https://i.imgur.com/gokOSIN.png)

# From Source

⚠️ Only useful for making contributions.

If you are running this from the cloned github repository.

-   NodeJS 13+
-   Run `npm install` in terminal to install dependencies
-   Run the `Run Extension` target in the Debug View. This will:
    -   Start a task `npm: watch` to compile the code
    -   Run the extension in a new VS Code window

You can also hit F5 in VSCode to debug the extension.

# Changelog

```
1.1.2
- Added First Time Loading Page
- Added Getting Started Guide
- Added new tables

1.1.1
- Remove Hover Markdown
- Documentation is now accessible through open 'x' document on hover.
- Added 'local' replacement for player.
- Local now shows documentation for client-side player.
- Updated README to be more feature complete.
- Added Server Events
- Added New Concepts
- Added Tables

1.1.0
- Add Front Matter to .md Files
- Add Better Title / Prefix Handling for Files
- Format All .md Files
- Thanks Alexa/Zack!

1.0.9
- Better Search Box for Documentation Browsing
- Better Markdown Preview for Documentation Browsing

1.0.8
- New Built In Documentation Browser

1.0.7
- Fix Types for Smaller Files

1.0.6
- More Types!

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
