const Cache = require('../../lib/caches/LRUCache.js');

describe('LRUCache', () => {
  let cache;
  let getValue;
  beforeEach(() => {
    getValue = jasmine.createSpy('getValue').and.callFake(key => `${key}!`);
    cache = new Cache(2, getValue);
    cache.get('old');
  });

  describe('includes', () => {
    context('when the cache includes the key', () => {
      it('returns true', () => {
        expect(cache.includes('old')).toBe(true);
      });
    });

    context('when the cache does not include the key', () => {
      it('returns false', () => {
        expect(cache.includes('ghost')).toBe(false);
      });
    });
  });

  describe('get', () => {
    context('when the cache does not already include the key', () => {
      it('adds the new key', () => {
        cache.get('new');
        expect(cache.includes('new')).toBe(true);
      });

      it('uses the callback to calculate the value', () => {
        cache.get('new');
        expect(getValue).toHaveBeenCalledWith('new');
      });

      it('returns the value', () => {
        expect(cache.get('new')).toBe('new!');
      });

      context('when the cache is full', () => {
        it('ejects the oldest key', () => {
          cache.get('new');
          cache.get('newest');
          expect(cache.includes('old')).toBe(false);
        });
      });
    });

    context('when the cache already includes the key', () => {
      it('updates the key\'s age', () => {
        cache.get('new');
        cache.get('old');
        cache.get('newest');
        expect(cache.includes('old')).toBe(true);
      });
    });
  });
});
