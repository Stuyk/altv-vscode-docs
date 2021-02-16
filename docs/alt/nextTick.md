---
title: 'alt.nextTick'
description: 'Schedules execution of handler on next tick.'
prefix: '[Server]'
---

# alt.nextTick

**Example Usage**

```js
function logger() {
    alt.log('This was executed');
}
alt.nextTick(logger);
```
