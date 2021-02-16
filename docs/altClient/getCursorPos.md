---
title: 'alt.getCursorPos'
description: 'Gets the current position of the cursor.'
prefix: '[Client]'
---

# alt.getCursorPos

**Example Usage**

```js
const x = alt.getCursorPos();

alt.setInterval(() => {
    alt.log(JSON.stringify(x));
}, 1000);
```
