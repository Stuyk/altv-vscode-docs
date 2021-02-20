---
title: 'How to use alt:V Voice'
description: 'How to implement voice into your gamemode.'
prefix: '[Snippet]'
---

[<-- Back to Snippets](./index.md)

# How to use alt:V Voice

alt:V has its own built-in voice server into the server itself. It has been tested up to 500~ players and has generally worked quite well. It is recommended to try out the voice option in alt:V before looking at third-party options as it already handles distance and panning.

## Enabling Voice

Inside of your `server.cfg` introduce a section called voice with something along the lines of:

```
voice: {
    bitrate: 64000
},
```

## Creating a Voice Channel

```js
import * as alt from 'alt-server';

// The last parameter is the maximum distance of this channel.
let mainChannel = new alt.VoiceChannel(true, 25);

// Call this function to allow the player to speak and hear everyone
// else in the global channel.
export function addToGlobalVoice(player) {
    if (mainChannel.isPlayerInChannel(player)) {
        return;
    }

    mainChannel.addPlayer(player);
}

// Call this function to remove the player and stop them from
// speaking or hearing anyone else.
export function removeFromGlobalVoice(player) {
    if (!mainChannel.isPlayerInChannel(player)) {
        return;
    }

    mainChannel.removePlayer(player);
}
```
