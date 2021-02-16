---
title: 'alt.Player.all'
description: 'Get all current players.'
prefix: '[Server/Client]'
---

# alt.Player.all

Gets the players who are currently on the server.

The properties available on individual players varies based on server-side or client-side.

Which means `ping` is not available on client-side but it is available on server-side.

**Example Usage**

```js
const playerList = alt.Player.all;
playerList.forEach((player) => {
    alt.log(player.name);
});
```
