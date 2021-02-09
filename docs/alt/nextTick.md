Schedules execution of handler on next tick.

**Example Usage**

```js
function logger() {
    alt.log('This was executed');
}
alt.nextTick(logger);
```
