Emits specified event to specific client.

**Example Usage**

```js
alt.on('playerConnect', (player) => {
    alt.emitClient(player, 'customEventName');
});
```
