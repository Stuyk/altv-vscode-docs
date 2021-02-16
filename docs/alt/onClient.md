---
title: 'alt.onClient'
description: 'Subscribes to client event with specified listener.'
prefix: '[Server]'
---

# alt.onClient

**Example Usage**

```js
alt.onClient('myEventName', (player, someArg) => {
    console.log(`${player.name} has triggered this event`);
});
```
