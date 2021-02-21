---
title: 'player.setWeather'
description: 'Used to set player weather.'
prefix: '[Server]'
---

# player.setWeather

**Description**

Used to set a player's weather.

[Weather IDs & Names](../articles/tables/weather.md)

_If you wish to do weather transitions you must do it client-side._

**Syntax**

```ts
setWeather(weatherType: WeatherType): void;
```

**Example Usage**

```js
// weather id
player.setWeather(0); // Extra Sunny
```
