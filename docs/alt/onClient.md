Subscribes to client event with specified listener.

**Example Usage**

```js
alt.onClient('myEventName', (player, someArg) => {
    console.log(`${player.name} has triggered this event`);
});
```
