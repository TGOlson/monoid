# Monoid

Simple monoid factory in JavaScript.

### Examples

```js
var M = require('monoid');

/*
 * Any
 * returns true of any elements are truthy
 */

var Any = M.Monoid({
  identity: false,
  binary: function (v1, v2) {
    return v1 || v2;
  }
});

M.concat([Any(false), Any(false), Any(true)])
// => Any(true)

M.concat([Any(false), Any(false), Any(false)])
// => Any(false)

var any = M.applyWith(Any);

any([false, false, true]);
// => true

any([false, false, false]);
// => true


/*
 * Product
 * returns the product of all elements
 */

var Product = M.Monoid({
  identity: 1,
  binary: function (v1, v2) {
    return v1 * v2;
  }
});


M.applyWith(Product, [3, 5, 10]);
// => 150
```
