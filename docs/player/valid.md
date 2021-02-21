---
title: 'player.valid'
description: 'Get the validity of the player entity. Check if they are still online.'
prefix: '[Server]'
---

# player.valid

**Description**

Get the validity of the player entity. Checks if they are still a valid entity.
Useful when you use timeouts and then the player logs out.

**Syntax**

```ts
readonly valid: boolean;
```

**Example Usage**

```js
alt.setTimeout(() => {
    // No longer valid. Discarding timeout.
    if (!player.valid) {
        return;
    }

    // Do some stuff later.
}, 5000);
```
