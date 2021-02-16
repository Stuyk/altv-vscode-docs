---
title: 'alt.onceClient'
description: 'Subscribes to client event with specified listener, which only triggers once.'
prefix: '[Server]'
---

# alt.onceClient

**Example Usage**

```js
alt.onceClient('myEventName', (player, args) => {
    alt.log(args)
}
```
