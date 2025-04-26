# Known issues

## Building docker image fails

This covers errors such as:
- `E: Unable to locate package software-properties-common`
- `Temporary failure resolving 'deb.debian.org'`

That's not a project related issue but I had to solve it personally.

**Call command**

```bash
sudo nano /etc/docker/daemon.json
```

If the file does not exist then create it.

**Set content**

```json
{
  "dns": ["8.8.8.8", "8.8.4.4"]
}
```

**Call command**

```bash
service docker restart
```

::: info
Based on some docs, stackoverflow etc. it's also possible to set the CLI variable before starting the container, but for
me, it didn't work.
:::