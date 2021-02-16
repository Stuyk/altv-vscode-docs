---
title: 'alt.emitAllClients'
description: 'Emits specified event to all clients.'
prefix: '[Server]'
---

# alt.emitAllClients

**Example Usage**

```js
alt.on('playerConnect', (player) => {
    const number = 56;
    alt.emitAllClients('customEventName', number);
});
```
