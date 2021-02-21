---
title: 'player.dimension'
description: "Change or get the player's dimension."
prefix: '[Server]'
---

# player.dimension

**Description**

Change or get the player's dimension.
Negative dimensions see positive dimensions. However, positive dimensions do not see negative dimensions.

**Syntax**

```ts
dimension: number;
```

**Example Usage**

```js
const currentDimension = player.dimension;
player.dimension = 2147483647; // Maximum
player.dimension = -2147483647; // Minimum
player.dimension = 0; // Default Dimension
```
