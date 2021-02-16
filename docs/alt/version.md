---
title: 'alt.version'
description: 'Represents the current server version.'
prefix: '[Server]'
---

# alt.version

It's a slighty modified semantic versioning specification, which can be matched using this regular expression pattern:

```
^(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))$.
```
