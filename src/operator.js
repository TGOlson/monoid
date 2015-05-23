var R = require('ramda');


var operators = {
  '+'  : function(v1, v2) {return v1 + v2;},
  '*'  : function(v1, v2) {return v1 * v2;},
  '&&' : function(v1, v2) {return v1 && v2;},
  '||' : function(v1, v2) {return v1 || v2;}
}


var hasOperator = R.has(R.__, operators);


var getOperator = R.prop(R.__, operators);


var get = R.ifElse(
  hasOperator,
  R.compose(R.curry, getOperator),
  unkownOperatorError
);


function unkownOperatorError(operator) {
  throw new Error('Unkown operator "' + operator + '"');
}


module.exports = {
  get: get
}
