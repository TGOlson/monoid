'use strict';

var M = require('../src/monoid');

describe('Monoid Factory', function() {
  var Any;

  beforeEach(function() {
    Any = M.Monoid({
      identity : false,
      binary   : function(v1, v2) {return v1 || v2;}
    });
  });

  it('should be a value constructor', function() {
    expect(Any).toEqual(jasmine.any(Function));
  });

  it('should provide a monoid type instance', function() {
    expect(Any(true)).toEqual({
      empty   : jasmine.any(Function),
      extract : jasmine.any(Function),
      concat  : jasmine.any(Function)
    });
  });

  it('should provide a way to extract its value', function() {
    expect(Any(true).extract()).toBe(true);
  });

  it('should know its monoid identity value', function() {
    expect(Any(true).empty().extract()).toBe(false);
  });

  it('should have a binary function that returns a new monoid instance', function() {
    expect(Any(true).concat(Any(true))).toBeTheSameMonoidAs(Any(true));

    expect(Any(false).concat(Any(true))).toBeTheSameMonoidAs(Any(true));

    expect((Any(false)).concat(Any(false))).toBeTheSameMonoidAs(Any(false));
  });

  it('should provide an empty function', function() {
    expect(M.empty(Any(true))).toBeTheSameMonoidAs(Any(true).empty());
    expect(M.empty(Any)).toBeTheSameMonoidAs(Any(true).empty());
  });

  it('should provide an concat function', function() {
    expect(M.concat(Any(true), Any(true))).toBeTheSameMonoidAs(Any(true));

    expect(M.concat(Any(true), Any(false))).toBeTheSameMonoidAs(Any(true));

    expect(M.concat(Any(false), Any(false))).toBeTheSameMonoidAs(Any(false));
  });

  it('should provide a way to reduce a monoid list', function() {
    expect(M.concatAll([Any(true), Any(false), Any(false)])).toBeTheSameMonoidAs(Any(true));

    expect(M.concatAll([Any(false), Any(false), Any(false)])).toBeTheSameMonoidAs(Any(false));
  });

  it('should provide an extract function', function() {
    expect(M.extract(Any(true))).toBe(true);
    expect(M.extract(Any(false))).toBe(false);
  });

  it('should provide a way to apply a monoid type over a list of non-monoids', function() {
    var any = M.applyWith(Any);

    expect(any([true, false, false])).toBe(true);
    expect(any([false, false, false])).toBe(false);
  });

  it('should allow some binaries to be defined with a string representation', function() {
    var Any = M.Monoid({
      identity : false,
      binary   : '||'
    });

    expect(Any(true)).toEqual({
      empty   : jasmine.any(Function),
      extract : jasmine.any(Function),
      concat  : jasmine.any(Function)
    });

    expect(M.concat(Any(true), Any(true))).toBeTheSameMonoidAs(Any(true));
    expect(M.concat(Any(true), Any(false))).toBeTheSameMonoidAs(Any(true));
    expect(M.concat(Any(false), Any(false))).toBeTheSameMonoidAs(Any(false));
  });
});
