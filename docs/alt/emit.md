Used to emit from one resource to another or the same resource.

**Example Usage**

```js
alt.on('playerConnect', (player) => {
    alt.emit('customEventName', player);
});

alt.on('customEventName', (player) => {
    console.log(`${player.name} has joined the server.`);
});
```
