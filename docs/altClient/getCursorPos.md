Gets the current position of the cursor.

**Example Usage**

```js
const x = alt.getCursorPos();

alt.setInterval(() => {
    alt.log(JSON.stringify(x));
}, 1000);
```
