## Code

```js
function getQueryProvider() {
  const url = window.location.href;
  const [_, provider] = url.match(/provider=([^&]*)/);
  if (provider) {
    return provider;
  }
  return;
}
```

## Review

The return of the function is kinda confusing from a caller's perspective
It either returns the provider or exits silently

I would change the return a litle bit:

```js
function getQueryProvider() {
  const url = window.location.href;
  const [_, provider] = url.match(/provider=([^&]*)/);

  return provider ?? undefined;
}
```
