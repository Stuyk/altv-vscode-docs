---
title: 'player.socialId'
description: 'Used to get the social club id of a player.'
prefix: '[Server]'
---

# player.socialId

**Description**

Get the player's social club id.
_Note: this is easily spoofed and should not be used for logins._

**Syntax**

```ts
readonly socialId: string;
```

**Example Usage**

```js
const social = player.socialId;
console.log(social);
```
