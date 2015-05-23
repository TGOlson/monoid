'use strict';

var R = require('ramda');
var Binary = require('./binary');


var extract = R.invoke('extract', []);


var makeMonoid = R.curry(function(identity, binary, v) {

  var thisMonoid    = makeMonoid(identity, binary);
  var curriedBinary = R.curry(binary);

  return {
    extract : R.always(v),
    empty   : R.partial(thisMonoid, identity),
    append  : R.compose(thisMonoid, curriedBinary(v), extract),
  };
});


var maybeParseBinary = R.ifElse(R.is(Function), R.identity, Binary.getFn);


function Monoid(props) {
  return makeMonoid(props.identity, maybeParseBinary(props.binary));
}


function empty(m) {
  return m.empty ? m.empty() : m(null).empty();
}


function append(m1, m2) {
  return m1.append(m2);
}


function concat(ms) {
  return R.reduce(append, empty(R.head(ms)), ms);
}


var applyWith = R.curry(function(m, vs) {
  return extract(concat(R.map(m, vs)));
});


module.exports = {
  Monoid    : Monoid,
  empty     : empty,
  append    : append,
  concat    : concat,
  extract   : extract,
  applyWith : applyWith
};
