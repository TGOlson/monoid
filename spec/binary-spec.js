'use strict';

var Binary = require('../src/binary');

describe('Binary', function() {
  it('should get an operator from a string representation', function() {
    var add = Binary.getFn('+');

    expect(add).toEqual(jasmine.any(Function));

    expect(add(1)(2)).toBe(3);
    expect(add(1, 2)).toBe(3);
  });

  it('should throw an error if an operator does no exists', function() {
    expect(Binary.getFn.bind(null, '~~')).toThrowError('Cannot parse binary from "~~"');
  });
});
