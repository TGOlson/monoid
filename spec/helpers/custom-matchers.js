function toBeTheNumber(util, customEqualityTesters) {
  return {
    compare: function(actual, expected) {
      return {
        pass: util.equals(actual, expected)
      };
    }
  };
}

module.exports = {
  toBeTheNumber: toBeTheNumber
};