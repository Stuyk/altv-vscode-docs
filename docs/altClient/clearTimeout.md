---
title: 'alt.clearTimeout'
description: 'Clears a timer set with the setTimeout function.'
prefix: '[Client]'
---

# alt.clearTimeout

**Example Usage**

```js
const x = alt.setTimeout(() => {
    alt.log('We waited for 5 seconds');
}, 5000);

alt.clearTimeout(x);
```
