To use validation the async validation. 

The rule item need to be a function that return a `Promise<string | false>`. For example:

```js
const rule = async v => {
  return await someApiValidation(v)
}
```