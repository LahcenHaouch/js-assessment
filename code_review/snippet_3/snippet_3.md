## Code

```js
let state;
const user = getUser();
if (user) {
  const project = getProject(user.id);
  state = {
    user,
    project,
  };
} else {
  state = {
    user: null,
    project: null,
  };
}
ctx.body = state;
```

## Review

Too many conditions

I also tend to avoid reassigning variables when i can, this could be simplified to:

```js
const user = getUser();
ctx.body = {
  user: user ?? null,
  project: user ? getProject(user.id) : null,
};

ctx.body = state;
```
