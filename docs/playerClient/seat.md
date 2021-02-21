---
title: 'player.seat'
description: 'Get the seat of a player if they are in a vehicle.'
prefix: '[Client]'
---

# alt.Player.local.seat

Get the player's seat if they are in a vehicle.

_Note: Driver seat starts at -1 for natives._

**Syntax**

```ts
readonly seat: number;
```

**Example Usage**

```js
const seat = alt.Player.local.seat;
if (seat === 1) {
    console.log('You are the driver');
    return;
}
```

_alt.Player.local can also be a **player instance** from server_
