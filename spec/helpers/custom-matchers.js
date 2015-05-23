'use strict';

function toBeTheSameMonoidAs() {
  return {
    compare: function(actual, expected) {
      return {
        pass: hasSameValue(actual, expected) &&
              hasSameIdentityValue(actual, expected)
      };
    }
  };
}

function hasSameIdentityValue(m1, m2) {
  return m1.empty().extract() === m2.empty().extract();
}

function hasSameValue(m1, m2) {
  return m1.extract() === m2.extract();
}

module.exports = {
  toBeTheSameMonoidAs: toBeTheSameMonoidAs
};
