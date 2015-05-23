var Operator = require('../src/operator');

describe('Operator', function() {
  it('should get an operator from a string representation', function() {
    var add = Operator.get('+');

    expect(add).toEqual(jasmine.any(Function));

    expect(add(1)(2)).toBe(3);
    expect(add(1, 2)).toBe(3);
  });

  it('should throw an error if an operator does no exists', function() {
    expect(Operator.get.bind(null, '~~')).toThrowError('Unkown operator "~~"');
  });
});
