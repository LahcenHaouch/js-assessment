## Code

```js
async function getIndexes() {
  return await fetch("https://api.coingecko.com/api/v3/indexes").then((res) =>
    res.json()
  );
}

async function analyzeIndexes() {
  const indexes = await getIndexes().catch((_) => {
    throw new Error("Unable to fetch indexes");
  });
  return indexes;
}
```

## Review

Performance issue with the return await

I usually avoid to mix between async/await and then

So I would rather write it as:

```js
async function getIndexes() {
  return fetch("https://api.coingecko.com/api/v3/indexes");
}

async function analyzeIndexes() {
  try {
    const indexes = await getIndexes();
    return indexes.json();
  } catch (_err) {
    throw new Error("Unable to fetch indexes");
  }
}
```
