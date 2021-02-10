Get if the player is currently aiming.

**Example Usage**

```js
// Are they aiming?
if (alt.Player.local.isAiming) {
    const pos = alt.Player.local.pos;
    const end = alt.Player.local.aimPos.mul(-1).add(pos);
    alt.log(JSON.stringify(end, null, '\t'));
}
```

_alt.Player.local can also be a **player instance** from server_
