---
title: 'alt.emitClient'
description: 'Emits specified event to specific client.'
prefix: '[Server]'
---

# allt.emitClient

**Example Usage**

```js
alt.on('playerConnect', (player) => {
    alt.emitClient(player, 'customEventName');
});
```
