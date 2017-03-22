global.context = describe;

beforeEach(function () {
  jasmine.addMatchers({
    toHaveValue() {
      return {
        compare(actual, expected) {
          return { pass: actual.value === expected };
        }
      };
    },

    toHaveLength() {
      return {
        compare(actual, expected) {
          return { pass: actual.length === expected };
        }
      };
    },

  });
});
