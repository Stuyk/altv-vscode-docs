---
title: 'player.moveSpeed'
description: 'Get the current movement speed of a player.'
prefix: '[Client]'
---

# alt.Player.local.moveSpeed

Get the current movement speed of a player.

**Syntax**

```ts
readonly moveSpeed: number;
```

**Example Usage**

```js
const moveSpeed = alt.Player.local.moveSpeed;

if (moveSpeed > 5) {
    alt.log('Probably running');
}
```

_alt.Player.local can also be a **player instance** from server_
