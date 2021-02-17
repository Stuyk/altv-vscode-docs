---
title: 'alt.on'
description: 'Used to listen to events when a player joins, leaves, dies, etc.'
prefix: '[Server]'
---

# alt.on

Used to listen to events when a player joins, leaves, dies, etc.

See the [server event list](../articles/server/server-events.md) for additional examples.

**Example Usage**

```js
alt.on('playerConnect', (player) => {
    console.log(`${player.name} has joined the server.`);
});

alt.on('playerDamage', (victim, attacker, damage, weaponHash) => {
    console.log(`${victim.name} has been damaged by ${attacker.name}!`);
});
```
