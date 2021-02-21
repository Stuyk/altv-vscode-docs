---
title: 'player.rot'
description: 'Get the rotation of a player.'
prefix: '[Client]'
---

# alt.Player.local.rot

Get the player's rotation.

**Syntax**

```ts
readonly rot: { x: number, y: number, z: number };
```

**Example Usage**

```js
const localPlayerRot = alt.Player.local.rot;
alt.log(JSON.stringify(localPlayerRot));
```

_alt.Player.local can also be a **player instance** from server_
