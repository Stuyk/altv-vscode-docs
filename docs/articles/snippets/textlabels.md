---
title: 'How to Create 2D & 3D Text Labels'
description: 'Drawing text on screen using GTA:V Natives'
prefix: '[Snippet]'
---

[<-- Back to Snippets](./index.md)

# How to Create 2D & 3D Text Labels

I must preface this snippet by stating that you should be using distance to scale your text as well as preventing it from drawing when the player is not near the text. It is also important to understand that this must be done on `client-side`.

Keep in mind that `x` and `y` are percentages of your player's full screen resolution when drawing 2D elements. Values may range from `0 - 1`. Meaning `0.5` is the center of the screen.

Here's what these labels may look like in a 2D space.

![](https://i.imgur.com/7Fbp9gD.png)

## 2D Text Draws

```js
export function drawText2d(
    msg,
    x,
    y,
    scale,
    fontType,
    r,
    g,
    b,
    a,
    useOutline = true,
    useDropShadow = true,
    layer = 0,
    align = 0
) {
    let hex = msg.match('{.*}');
    if (hex) {
        const rgb = hexToRgb(hex[0].replace('{', '').replace('}', ''));
        r = rgb[0];
        g = rgb[1];
        b = rgb[2];
        msg = msg.replace(hex[0], '');
    }

    native.beginTextCommandDisplayText('STRING');
    native.addTextComponentSubstringPlayerName(msg);
    native.setTextFont(fontType);
    native.setTextScale(1, scale);
    native.setTextWrap(0.0, 1.0);
    native.setTextCentre(true);
    native.setTextColour(r, g, b, a);
    native.setTextJustification(align);

    if (useOutline) {
        native.setTextOutline();
    }

    if (useDropShadow) {
        native.setTextDropShadow();
    }

    native.endTextCommandDisplayText(x, y);
}
```

## Drawing 3D Text

Please use distance calculation to prevent text from being drawn while the player is across the map. Ensure they are within the range of where you are drawing your text before rendering it.

```js
export function drawText3d(
    msg,
    x,
    y,
    z,
    scale,
    fontType,
    r,
    g,
    b,
    a,
    useOutline = true,
    useDropShadow = true,
    layer = 0
) {
    let hex = msg.match('{.*}');
    if (hex) {
        const rgb = hexToRgb(hex[0].replace('{', '').replace('}', ''));
        r = rgb[0];
        g = rgb[1];
        b = rgb[2];
        msg = msg.replace(hex[0], '');
    }

    native.setDrawOrigin(x, y, z, 0);
    native.beginTextCommandDisplayText('STRING');
    native.addTextComponentSubstringPlayerName(msg);
    native.setTextFont(fontType);
    native.setTextScale(1, scale);
    native.setTextWrap(0.0, 1.0);
    native.setTextCentre(true);
    native.setTextColour(r, g, b, a);

    if (useOutline) {
        native.setTextOutline();
    }

    if (useDropShadow) {
        native.setTextDropShadow();
    }

    native.endTextCommandDisplayText(0, 0);
    native.clearDrawOrigin();
}
```

## Example Usage

**Client Side**

```js
alt.setInterval(() => {
    drawText2d('Hello from Top Center of Screen', 0.5, 0.05, 0.4, 4, 255, 255, 255, 255);

    const playerPos = { ...alt.Player.local.pos };
    drawText3d(`This is You`, playerPos.x, playerPos.y, playerPos.z, 0.3, 4, 255, 255, 255, 255);
}, 0);
```
