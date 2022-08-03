To make validation work. The `value`, `rules` prop need to be set.

And the CFormItem's `field` prop also needed.

The `rules` is an object that contains every field rules. Its' type look like this:

```ts
type Rules = {
  [key: string]: Array<(val: any) => string | false | Promise<string | false>
}
```

Each rule can be a function that receive current value and return a string message or a `false` or a `Promise<string | false>`.

- The string message will be shown at the bottom of form item.
- `false` means no error.
- `Promise<string | false>` means a async validation.
