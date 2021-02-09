Usually obtained from an event. This is a local or server-side player.

**Example Usage**

_Server_

```js
player.pos = { x: 0, y: 0, z: 0 };
player.health = 199;
player.armour = 100;
```

_Client_

```js
// You should use alt.Player.local for your local player.
// Then use .scriptID to do native functions.
native.freezeEntityPosition(alt.Player.local.scriptID, true);
```
