---
title: 'player'
description: 'Usually obtained from an event. This is a local or server-side player.'
prefix: '[Server/Client]'
---

# player

Usually obtained from an event. This is a local or server-side player.
By default the player needs to call `.spawn` and `.model` to move around in the world.

**Example Usage**

_Server_

```js
player.pos = { x: 0, y: 0, z: 0 };
player.health = 199;
player.armour = 100;
```

_Client_

```js
// You should use alt.Player.local for your local player.
// Then use .scriptID to do native functions.
native.freezeEntityPosition(alt.Player.local.scriptID, true);
```
