List = require('../../lib/linkedList/SinglyLinkedList.js');

function populate(list) {
  list.push('a');
  list.push('b');
}

describe('SinglyLinkedList',  () => {
  let list;
  beforeEach(() => {
    list = new List();
  });

  describe('findAt', () => {
    beforeEach(() => { populate(list); });

    it('returns the value for a given index', () => {
      list.push('c');
      expect(list.findAt(0)).toBe('a');
      expect(list.findAt(1)).toBe('b');
      expect(list.findAt(2)).toBe('c');
    });

    context('when negative index', () => {
      it('raises an error', () => {
        expect(() => {
          list.findAt(-1);
        }).toThrowError('Nothing to see here');
      });
    });

    context('when no element at the index', () => {
      it('raises an error', () => {
        expect(() => {
          list.findAt(2);
        }).toThrowError('Nothing to see here');
      });
    });
  });

  describe('first', () => {
    it('returns the first element without removing it', () => {
      populate(list);

      expect(list.length).toBe(2);
      expect(list.first()).toBe('a');
      expect(list.length).toBe(2);
    });

    context('when empty', () => {
      it('raises an error', () => {
        expect(() => {
          list.first();
        }).toThrowError('Nothing to see here');
      });
    });
  });

  describe('forEach', () => {
    beforeEach(() => { populate(list); });

    it('calls the callback for each value', () => {
      const spy = jasmine.createSpy('each');
      list.forEach(spy);
      expect(spy).toHaveBeenCalledWith('a', 0);
      expect(spy).toHaveBeenCalledWith('b', 1);
    });

    it('returns the same list', () => {
      expect(list.forEach(() => {})).toBe(list);
    });
  });

  describe('isEmpty', () => {
    context('when length is 0', () => {
      it('returns true', () => {
        expect(list.isEmpty()).toBe(true);
      });
    });

    context('when length is > 0', () => {
      beforeEach(() => { populate(list); });

      it('returns false', () => {
        expect(list.isEmpty()).toBe(false);
      });
    });
  });

  describe('last', () => {
    it('returns the last element without removing it', () => {
      populate(list);

      expect(list.length).toBe(2);
      expect(list.last()).toBe('b');
      expect(list.length).toBe(2);
    });

    context('when empty', () => {
      it('raises an error', () => {
        expect(() => {
          list.last();
        }).toThrowError('Nothing to see here');
      });
    });
  });

  describe('length', () => {
    beforeEach(() => { populate(list); });

    it('returns the length', () => {
      expect(list.length).toBe(2);
    });
  });

  describe('pop', () => {
    it('removes and returns the last element', () => {
      populate(list);

      expect(list.length).toBe(2);
      expect(list.last()).toBe('b');

      expect(list.pop()).toBe('b');

      expect(list.length).toBe(1);
      expect(list.last()).toBe('a');
    });

    context('when empty', () => {
      it('raises an error', () => {
        expect(() => {
          list.pop();
        }).toThrowError('Nothing to see here');
      });
    });
  });

  describe('push', () => {
    beforeEach(() => { populate(list); });

    it('adds an element to the end', () => {
      list.push('pushed');
      expect(list.last()).toBe('pushed');
    });

    it('returns the new length', () => {
      expect(list.push('pushed')).toBe(3);
    });
  });

  describe('removeAt', () => {
    beforeEach(() => { populate(list); });

    it('removes the value for a given index', () => {
      list.push('c');
      expect(list.findAt(1)).toBe('b');
      list.removeAt(1);
      expect(list.findAt(1)).toBe('c');
    });

    it('returns the removed element', () => {
      expect(list.removeAt(0)).toBe('a');
    });

    context('when negative index', () => {
      it('raises an error', () => {
        expect(() => {
          list.removeAt(-1);
        }).toThrowError('Nothing to see here');
      });
    });

    context('when no element at the index', () => {
      it('raises an error', () => {
        expect(() => {
          list.removeAt(2);
        }).toThrowError('Nothing to see here');
      });
    });
  });

  describe('shift', () => {
    it('removes and returns the first element', () => {
      populate(list);

      expect(list.length).toBe(2);
      expect(list.first()).toBe('a');

      expect(list.shift()).toBe('a');

      expect(list.length).toBe(1);
      expect(list.first()).toBe('b');
    });

    context('when empty', () => {
      it('raises an error', () => {
        expect(() => {
          list.shift();
        }).toThrowError('Nothing to see here');
      });
    });
  });

  describe('unshift', () => {
    beforeEach(() => { populate(list); });

    it('adds an element to the beginning', () => {
      list.unshift('unshifted');
      expect(list.first()).toBe('unshifted');
    });

    it('returns the new length', () => {
      expect(list.unshift('unshifted')).toBe(3);
    });
  });
});
