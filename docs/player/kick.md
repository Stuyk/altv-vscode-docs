---
title: 'player.kick'
description: 'Kick a player with a reason.'
prefix: '[Server]'
---

# player.kick

**Description**

Kick a player with a reason.

**Syntax**

```ts
kick(reason?: string): void;
```

**Example Usage**

```js
const ping = player.ping;
if (player.ping >= 200) {
    player.kick('Ping too high');
    return;
}
```
