---
title: 'player.spawn'
description: 'Used to spawn the player into the world.'
prefix: '[Server]'
---

# player.spawn

**Description**

Used to spawn the player into the world.

_Best paired with `player.model` when spawning players._

**Syntax**

```ts
spawn(x: number, y: number, z: number, delay: number): void;
```

**Example Usage**

```js
// x, y, z, delay in milliseconds
player.spawn(0, 0, 0, 25000); // Fires after 2.5 seconds
```
