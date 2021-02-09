# alt:V VSCode Docs

A beautiful way to get information about coding for alt:V without stumbling around in the dark.

This will give you information about what you are typing by hovering over different elements in your code. However, it will not cover all elements. Just in most cases you can get general information while working with the alt:V API.

## Installation

Click the install button above. It's that easy.

## Usage

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
1.0.2
- Added Client / Server Check
- Added Vehicle

1.0.1
- Added Basic Player Parameters

1.0.0
- Release Template
```
