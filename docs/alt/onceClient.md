Subscribes to client event with specified listener, which only triggers once.

**Example Usage**

```js
alt.onceClient('myEventName', (player, args) => {
    alt.log(args)
}
```
