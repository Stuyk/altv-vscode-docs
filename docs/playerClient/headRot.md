---
title: 'player.headRot'
description: 'Get the current rotation of a player head.'
prefix: '[Client]'
---

# alt.Player.local.headRot

Get the player's head rotation.

**Syntax**

```ts
readonly headRot: number;
```

**Example Usage**

```js
const vector3Rotation = alt.Player.local.headRot;
alt.log(JSON.stringify(vector3Rotation, null, '\t'));
```

_alt.Player.local can also be a **player instance** from server_
