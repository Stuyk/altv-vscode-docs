---
title: 'player.ping'
description: 'Get a players current ping.'
prefix: '[Server]'
---

# player.ping

Get the player's current ping.

**Example Usage**

```js
const ping = player.ping;
if (player.ping >= 200) {
    player.kick('Ping too high');
    return;
}
```
