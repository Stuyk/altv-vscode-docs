---
title: 'Getting Started'
description: 'Documentation on basic alt:V setup.'
prefix: '[Article]'
---

[<-- Back to Articles](./index.md)

# Step 1 - Introduction

This will teach you the basics on getting started with the alt:V Javascript Framework. After completing this getting started guide you should restart your VSCode to ensure the extension is working properly. It will tell you if it is and it will send you back here if you failed to setup your environment properly.

Make sure you go back to the extension page and read about features and how it all works. It's pretty important.

**Table of Contents**

-   [Step 1 - Introduction](#step-1---introduction)
-   [Step 2 - Prerequisites](#step-2---prerequisites)
    -   [General Assumptions](#general-assumptions)
-   [Step 3 - Installing Server Binaries](#step-3---installing-server-binaries)
    -   [Installing `altv-pkg`](#installing-altv-pkg)
-   [Step 4 - Using `altv-pkg`](#step-4---using-altv-pkg)
-   [Step 5 - Understanding File Structure](#step-5---understanding-file-structure)
    -   [altv-server](#altv-server)
    -   [package.json](#packagejson)
    -   [server.cfg](#servercfg)
        -   [password](#password)
        -   [token](#token)
        -   [debug](#debug)
        -   [resources](#resources)
    -   [/data](#data)
    -   [/modules](#modules)
    -   [/node_modules](#node_modules)
    -   [/resources](#resources-1)
-   [Step 6 - Opening Up Your Workspace](#step-6---opening-up-your-workspace)
-   [Step 7 - Connecting](#step-7---connecting)
-   [Server-Side](#server-side)
-   [Client-Side](#client-side)
-   [Start Coding!](#start-coding)

# Step 2 - Prerequisites

Before you begin please install these programs and utilities.

-   [NodeJS 13+](https://nodejs.org/en/download/current/)
-   [Visual Studio Code](https://code.visualstudio.com/download)
-   [GIT](https://git-scm.com/downloads)
-   [alt:V Client](https://altv.mp/#/downloads)

## General Assumptions

This guide will be assuming you will be working in a Windows development environment.

-   You should know how to use a Command Prompt or Powershell
-   You should know how to open Command Prompt or Powershell
-   You should know that you can run .exe files inside of Command Prompt or Powershell
-   You should know very basic JavaScript.

# Step 3 - Installing Server Binaries

If you are new to development with alt:V you are going to need to setup your server infrastructure by either [downloading binaries from the official alt:V website](https://altv.mp/#/downloads) or you can simply install `altv-pkg` and it will take care of the rest.

This guide will focus on setting up your Javascript environment with `altv-pkg`.

## Installing `altv-pkg`

[altv-pkg](https://github.com/stuyk/altv-pkg) is a utility that will quickly allow you to spin up the server binaries on Windows or Linux. This will also give you a base resource for you to work with.

You can install it from a command prompt or terminal.

```sh
npm install -g altv-pkg
```

If you run into trouble with install global files. Open a **Powershell** with **Administrative** permissions and run the following command.

```sh
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted -Force;
```

Verify installion by checking the version.

```sh
altv-pkg --version
```

# Step 4 - Using `altv-pkg`

After installing we'll be downloading the server files.

Create a directory for your server. Then open a Command Prompt in that directory.

```sh
$ altv-pkg d release
```

This will prompt you for information regarding the gamemode you are creating.

By default the server files and resource files will automatically generate in your current directory.

Follow the on-screen instructions.

-   **N** for Voice
-   **Y** for Example Resource

![](https://thumbs.gfycat.com/YearlyJoyousDutchsmoushond-size_restricted.gif)

⚠️ It would be wise to restart your VSCode into this workspace if you wish to use the alt:V IDE extension.

# Step 5 - Understanding File Structure

It is important to discuss a few of the files and the general structure created after downloading the server binaries. Here are the files or some general files that should have been downloaded after you run `altv-pkg d release`.

```
|   altv-server.exe
|   libnode.dll
|   package-lock.json
|   package.json
|   server.cfg
|   update.json
|
+---data
|       vehmodels.bin
|       vehmods.bin
|
+---modules
|       js-module.dll
|
\node_modules
\---resources
    \---example
        |   resource.cfg
        |
        +---client
        |       startup.js
        |
        \---server
                startup.js
```

## altv-server

This is your main binary file for running your server. You can run this from command prompt.

```
altv-server.exe
```

Use Ctrl + C to kill the server.

## package.json

This is where your node_modules that you are using will be defined. This is where you install packages that may be used by the server-side. Keep in mind that you cannot use node_modules in client-side.

```json
{
    "name": "altv-pkgserver",
    "version": "0.0.0",
    "description": "Don't worry we made this package.json for you.",
    "main": "index.js",
    "scripts": {
        "update": "altv-pkg d release"
    },
    "author": "stuyk",
    "type": "module",
    "prettier": {
        "printWidth": 120,
        "tabWidth": 4,
        "singleQuote": true,
        "bracketSpacing": true
    },
    "devDependencies": {
        "@altv/types-client": "latest",
        "@altv/types-natives": "latest",
        "@altv/types-server": "latest",
        "@altv/types-webview": "latest"
    }
}
```

Important takeaways from what is defined in this structure.

-   We are using the Prettier extension for VSCode
-   We are using "type": "module" to support ES6 Syntax.
-   We can update our server files by running `npm run update` from the base directory.

That's mainly the structure of the package.json and mostly functions like a normal nodejs project.

## server.cfg

This uses a custom parser for your server's configuration.

```
name: "TestServer",
host: "0.0.0.0",
port: 7788,
players: 1024,
#password: "verysecurepassword",
announce: false,
#token: no-token,
gamemode: "Freeroam",
website: "test.com",
language: "en",
description: "test",
debug: false,
modules: [
  "js-module",
],
resources: [
    "example"
],
tags: [
  "customTag1",
  "customTag2",
  "customTag3",
  "customTag4"
]
```

### password

Password is an optional parameter. Commented out with #.

### token

Token is an optional parameter. Commented out with #. You may get a token from the alt:V Discord by messaging one of the bots in the member list.

### debug

It is recommended to set this true in order to work with your server in development mode. This will allow reconnecting to your server if you setup debug in your client configuration as well.

### resources

This is where you list the folders inside of the `/resources` folder that you want to use. All resources must have a resource.cfg inside of their respective folder in order to be loaded as a resource.

Here is the `resource.cfg` from the `/resources/example` folder.

```cfg
type: js,
main: server/startup.js,
client-main: client/startup.js,
client-files: [
	client/*
],
deps: []
```

The main entry point for server-side is the `example` resource is `/resources/example/server/startup.js`

The same for client-side except it uses `client` instead of `server`.

## /data

This folder is where we have data files that help us define what vehicle names correspond with what values. These should be downloaded and used automatically.

## /modules

This is where you load special .dll or .so files for modules that use different languages. ie. C#, Lua, etc. These are usually generated by users who are developing for alt:V. Community made.

## /node_modules

This is where packages you download from NPM are installed. Here is an example on installing the Stanford Javascript Crypto Library from NPM.

```sh
npm i sjcl
```

## /resources

Resources is where you create new resources that can be loaded into your server.cfg. It is highly recommended that if you are create a very large project that you stick to a single resource for performance reasons and ease of use.

If you are using a typescript project you may see source files inside a folder called `/src`

# Step 6 - Opening Up Your Workspace

This can be done by opening VSCode and go to `File -> Open Folder`. You will want to open up the entire folder where your `altv-server` is located.

Should look similar to:

![](https://i.imgur.com/T4daVCQ.png)

You can start writing your code inside of `resources/example/startup.js`.

Make sure your `server.cfg` has the resource called `example` inside of the resources section of your `server.cfg`.

```
resources: [
  "example"
],
```

Run your server from command line to ensure everything has loaded properly.

![](https://i.imgur.com/E6H1Tqr.png)

# Step 7 - Connecting

You may connect by opening your alt:V Client and using direct connect.

```
127.0.0.1:7788
```

# Server-Side

Server side code should be written in the `server` folder.

You also need to import the types for alt:V Server Side.

```js
/// <reference types="@altv/types-server" />
import alt from 'alt-server';

alt.log('test');
```

If you are using the alt:V IDE extension this is done automatically for you.

Your server side should now have auto-completion. This is not required for `TypeScript` as you will only need to add type definitions to the `tsconfig` file.

![](https://i.imgur.com/odg8q3J.png)

# Client-Side

Client side code should be writtein in the `client` folder.

This is the only section where you can actively use a native.

You also need to import the `types` for alt:V Client Side.

If you are using the alt:V IDE extension this is done automatically for you.

```js
/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import alt from 'alt-client';
import * as native from 'natives';

alt.log(`You connected! Nice!`);
```

Your client side should now have auto-completion.

![](https://i.imgur.com/9GnZX2h.png)

# Start Coding!

You now have a proper setup for a Javascript environment for alt:V. Onwards!
