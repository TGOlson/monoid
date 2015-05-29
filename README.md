# Monoid

[![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url]

Simple monoid factory in JavaScript. Compatible with the [Fantasy Land JS Spec](https://github.com/fantasyland/fantasy-land).

Easily define list reductions by providing an identity value and a binary function. Get a free way to reduce a list of monoids with `concatAll`.

### Examples

Make a monoid and `concat` two monoid values.

```js
var M = require('monoid');

var Any = M.Monoid({
  identity : false,
  binary   : function (v1, v2) {
    return v1 || v2;
  }
});


// Use the monoid instance method
Any(true).append(Any(false));    // => Any(true)

// Or the free function provided by the Monoid module
M.append(Any(true), Any(false)); // => Any(true)

// Reduce an entire list of monoids
M.concatAll([Any(false), Any(false), Any(true)]);  // => Any(true)
M.concatAll([Any(false), Any(false), Any(false)]); // => Any(false)
```

Create a function to reduce a list of values using `applyWith`.

```js
var any = M.applyWith(Any);

any([false, false, true]);  // => true
any([false, false, false]); // => true


var Product = M.Monoid({
  identity : 1,
  binary   : function (v1, v2) {
    return v1 * v2;
  }
});

M.applyWith(Product, [3, 5, 10]); // => 150
```

Note: `M.applyWith(<Monoid>, list)` is equivelent to `M.extract(M.concatAll(list.map(<Monoid>)))`.

Use shorthand syntax for defining binaries. Currently available for `+`, `*`, `||` and `&&`.

```js
var Sum = M.Monoid({
  identity : 0,
  binary   : '+'
});

var sum = M.applyWith(Sum);

sum([10, 32, 11]) // => 53
```

### TODO

* More examples/docs
* Add more built in binaries
* Consider additional shorthand `var Any = M.Monoid(false, '||')`.

[travis-image]: https://travis-ci.org/TGOlson/monoid.svg?branch=master
[travis-url]: https://travis-ci.org/TGOlson/monoid

[coveralls-image]: https://coveralls.io/repos/TGOlson/monoid/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/r/TGOlson/monoid?branch=master
