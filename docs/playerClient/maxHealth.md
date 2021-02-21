---
title: 'player.maxHealth'
description: 'Get player maximum health.'
prefix: '[Client]'
---

# alt.Player.local.maxHealth

Used to get the player's Maximum Health.

**Syntax**

```ts
readonly maxHealth: number;
```

**Example Usage**

```js
const maxHealth = alt.Player.local.maxHealth;
console.log(`Your max health is: ${maxHealth}`);
```

_alt.Player.local can also be a **player instance** from server_
