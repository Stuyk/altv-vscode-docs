---
title: 'player.visible'
description: 'Get player visibility based on server setter.'
prefix: '[Client]'
---

# alt.Player.local.visible

Get the player's visbility.

**Syntax**

```ts
readonly visible: boolean;
```

**Example Usage**

```js
const isLocalVisible = alt.Player.local.visible;
console.log(`Is Visible? ${isLocalVisible}`);
```

_alt.Player.local can also be a **player instance** from server_
