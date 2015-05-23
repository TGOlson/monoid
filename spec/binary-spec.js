'use strict';

var Binary = require('../src/binary');

describe('Binary', function() {
  it('should get an operator from a string representation', function() {
    var add = Binary.getFn('+');

    expect(add).toEqual(jasmine.any(Function));

    expect(add(1)(2)).toBe(3);
    expect(add(1, 2)).toBe(3);
  });

  it('should provide common binaries', function() {
    expect(Binary.getFn('+')(1, 2)).toBe(3);
    expect(Binary.getFn('*')(1, 2)).toBe(2);
    expect(Binary.getFn('||')(false, true)).toBe(true);
    expect(Binary.getFn('&&')(false, true)).toBe(false);
  });

  it('should throw an error if an operator does no exists', function() {
    expect(Binary.getFn.bind(null, '~~')).toThrowError('Cannot parse binary from "~~"');
  });
});
