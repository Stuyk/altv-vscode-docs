Get the player's current vehicle.

**Example Usage**

```js
const vehicle = alt.Player.local.vehicle;

if (!vehicle) {
    console.log('YOU ARE NOT IN A VEHICLE');
    return;
}
```

_alt.Player.local can also be a **player instance** from server_
