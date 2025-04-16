# Updating v 2.x

## General information

All You have todo is updating Your local code state.

Necessary updates, and changes are triggered each time when docker container gets restarted (see `entrypoint`).

With that being said, if You'll update Your local code, then You **must** restart the containers to apply necessary changes.

::: warning
The **auto-update** comes with a risk, therefore **ALWAYS** switch to higher versions by using `git tags`.
:::

## Known issues

Turns out that browser will sometimes cache the assets, and if frontend will get updated then it will start throwing
some weird errors, try force refreshing the cache by pressing:
```
CTRL + SHIFT + R
```