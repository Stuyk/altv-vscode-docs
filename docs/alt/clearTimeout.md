---
title: 'alt.ClearTimeout'
description: 'Clears a timer set with the setTimeout function.'
prefix: '[Server]'
---

# alt.clearTimeout

**Example Usage**

```js
const x = setTimeout(() => {
    alt.log('Client Says Hello!');
}, 5000);
clearTimeout(x);
```
