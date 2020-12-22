## Code

```js
function getParagraphTexts() {
  const texts = [];
  document.querySelectorAll("p").forEach((p) => {
    texts.push(p);
  });
  return texts;
}
```

## Review

A more simplified version

```js
function getParagraphTexts() {
  return Array.from(document.querySelectorAll("p"));
}
```
