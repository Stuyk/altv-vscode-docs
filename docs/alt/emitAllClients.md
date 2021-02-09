Emits specified event to all clients.

**Example Usage**

```js
alt.on('playerConnect', (player) => {
    const number = 56;
    alt.emitAllClients('customEventName', number);
});
```
