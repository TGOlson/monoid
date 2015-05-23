'use strict';


var R = require('ramda');


var binaryFns = {
  '+'  : R.add,
  '*'  : R.multiply,
  '&&' : R.and,
  '||' : R.or
};


var isKnownBinaryFn = R.has(R.__, binaryFns);


var getBinaryFn = R.prop(R.__, binaryFns);


var getFn = R.ifElse(isKnownBinaryFn, getBinaryFn, unkownBinaryError);


function unkownBinaryError(x) {
  throw new Error('Cannot parse binary from "' + x + '"');
}


module.exports = {
  getFn: getFn
};
