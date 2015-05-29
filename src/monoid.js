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
    concat  : R.compose(thisMonoid, curriedBinary(v), extract),
  };
});


var maybeParseBinary = R.ifElse(R.is(Function), R.identity, Binary.getFn);


function Monoid(props) {
  return makeMonoid(props.identity, maybeParseBinary(props.binary));
}


function empty(m) {
  return m.empty ? m.empty() : m(null).empty();
}


function concat(m1, m2) {
  return m1.concat(m2);
}


function concatAll(ms) {
  return R.reduce(concat, empty(R.head(ms)), ms);
}


var applyWith = R.curry(function(m, vs) {
  return extract(concatAll(R.map(m, vs)));
});


module.exports = {
  Monoid    : Monoid,
  empty     : empty,
  concat    : concat,
  concatAll : concatAll,
  extract   : extract,
  applyWith : applyWith
};
