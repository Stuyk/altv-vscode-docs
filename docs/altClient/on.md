---
title: 'alt.on'
description: 'Used to emit from one resource to another or the same resource.'
prefix: '[Client]'
---

# alt.on

**Example Usage**

```js
alt.on('connectionComplete', (player) => {
    alt.log(`${player.name} has connected on clientside`);
});
```
