Get what the player is currently aiming at.

**Example Usage**

```js
if (alt.Player.local.isAiming) {
    const pos = alt.Player.local.pos;
    const end = alt.Player.local.aimPos.mul(-1).add(pos);
    // End is the position where the player is aiming.
    alt.log(JSON.stringify(end, null, '\t'));
}
```

_alt.Player.local can also be a **player instance** from server_
