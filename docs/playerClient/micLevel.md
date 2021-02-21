---
title: 'player.micLevel'
description: 'Get the microphone level of a player.'
prefix: '[Client]'
---

# alt.Player.local.micLevel

Get the current micLevel of a player.

**Syntax**

```ts
readonly micLevel: number;
```

**Example Usage**

```js
const micLevel = alt.Player.local.micLevel;
alt.log(`Mic Level is: ${micLevel}.`);
```

_alt.Player.local can also be a **player instance** from server_
