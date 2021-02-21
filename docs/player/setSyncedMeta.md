---
title: 'player.setSyncedMeta'
description: 'Used to set cross-resource accessible information.'
prefix: '[Server]'
---

# player.setSyncedMeta

**Description**

Used to store cross-resource accessible information. This functionality stores an object on a player that can than be accessed with [getSyncedMeta](./getSyncedMeta.md). This can also be accessed on client-side.

_This type of meta is accessible anywhere but can only be set on server-side._

**Syntax**

```ts
setSyncedMeta(key: string, value: any): void;
```

_You can store literally anything. Except functions._

**Example Usage**

```js
player.setSyncedMeta('myData', 'hello from meta');
```
