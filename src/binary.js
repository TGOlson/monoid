'use strict';


var R = require('ramda');


var binaryFns = {
  '+'  : function(v1, v2) {return v1 + v2;},
  '*'  : function(v1, v2) {return v1 * v2;},
  '&&' : function(v1, v2) {return v1 && v2;},
  '||' : function(v1, v2) {return v1 || v2;}
};


var isKnownBinaryFn = R.has(R.__, binaryFns);


var getBinaryFn = R.prop(R.__, binaryFns);


var getFn = R.ifElse(
  isKnownBinaryFn,
  R.compose(R.curry, getBinaryFn),
  unkownBinaryError
);


function unkownBinaryError(x) {
  throw new Error('Cannot parse binary from "' + x + '"');
}


module.exports = {
  getFn: getFn
};
