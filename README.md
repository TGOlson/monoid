# Monoid

[![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url]


Simple monoid factory in JavaScript.

Easily define list reductions by providing an identity value and a binary function. Get the `reduce` (aka `concat`) for free.

### Examples

```js
var M = require('monoid');

/*
 * Any
 * returns true of any elements are truthy
 */

var Any = M.Monoid({
  identity : false,
  binary   : function (v1, v2) {
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
  identity : 1,
  binary   : function (v1, v2) {
    return v1 * v2;
  }
});

M.applyWith(Product, [3, 5, 10]);
// => 150


/*
 * Shorthand syntax for well-known binaries
 */
var Sum = M.Monoid({
  identity : 0,
  binary   : '+'
});

var sum = M.applyWith(Sum);

sum([10, 32, 11])
// => 53
```

### TODO

* More examples/docs
* Add more built in binaries
* Consider additional shorthand `var Any = M.Monoid(false, '||')`.

[travis-image]: https://travis-ci.org/TGOlson/monoid.svg?branch=master
[travis-url]: https://travis-ci.org/TGOlson/monoid

[coveralls-image]: https://coveralls.io/repos/TGOlson/monoid/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/r/TGOlson/monoid?branch=master
