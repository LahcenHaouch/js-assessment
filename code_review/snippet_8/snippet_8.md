## Code

```js
function getUserSettings(user) {
  if (user) {
    const project = getProject(user.id);
    if (project) {
      const settings = getSettings(project.id);
      if (settings) {
        return settings;
      }
    }
  }
  return {};
}
```

## Review

The above code works, we could make it simpler but it's just some sugar

```js
function getUserSettings(user) {
  if (user) {
    const project = getProject(user.id);

    const settings = project ? getSettings(project.id) : {};

    return settings;
  }
  return {};
}
```
