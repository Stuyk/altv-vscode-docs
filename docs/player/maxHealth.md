---
title: 'player.maxHealth'
description: "Used to get or set the player's Maximum Health."
prefix: '[Server]'
---

# player.maxHealth

**Description**

Used to get or set the player's Maximum Health.
Makes it larger than 199.

**Syntax**

```ts
maxHealth: number;
```

**Example Usage**

```js
const maxHealth = player.maxHealth;
console.log(`Their max health is: ${maxHealth}`);
player.maxHealth = 1999;
```
