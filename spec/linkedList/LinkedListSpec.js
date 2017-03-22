SinglyLinkedList = require('../../lib/linkedList/SinglyLinkedList.js');
DoublyLinkedList = require('../../lib/linkedList/DoublyLinkedList.js');

function populate(list) {
  list.push('a');
  list.push('b');
}

[SinglyLinkedList, DoublyLinkedList].forEach((List) => {
  describe(List.name,  () => {
    let list;
    beforeEach(() => {
      list = new List();
    });

    describe('findAt', () => {
      beforeEach(() => { populate(list); });

      it('returns the link for a given index', () => {
        list.push('c');
        expect(list.findAt(0)).toHaveValue('a');
        expect(list.findAt(1)).toHaveValue('b');
        expect(list.findAt(2)).toHaveValue('c');
      });

      context('when index is negative', () => {
        it('raises an error', () => {
          expect(() => {
            list.findAt(-1);
          }).toThrowError('Nothing to see here');
        });
      });

      context('when no link at the index', () => {
        it('raises an error', () => {
          expect(() => {
            list.findAt(2);
          }).toThrowError('Nothing to see here');
        });
      });
    });

    describe('first', () => {
      it('returns the first link without removing it', () => {
        populate(list);

        expect(list).toHaveLength(2);
        expect(list.first()).toHaveValue('a');
        expect(list).toHaveLength(2);
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

      it('calls the callback with each link and index', () => {
        const spy = jasmine.createSpy('each');
        list.forEach(spy);

        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenCalledWith(
          jasmine.objectContaining({ value: 'a' }),
          0
        );
        expect(spy).toHaveBeenCalledWith(
          jasmine.objectContaining({ value: 'b' }),
          1
        );
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
      it('returns the last link without removing it', () => {
        populate(list);

        expect(list).toHaveLength(2);
        expect(list.last()).toHaveValue('b');
        expect(list).toHaveLength(2);
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
        expect(list).toHaveLength(2);
      });
    });

    describe('pop', () => {
      it('removes and returns the last link', () => {
        populate(list);

        expect(list).toHaveLength(2);
        expect(list.last()).toHaveValue('b');

        expect(list.pop()).toHaveValue('b');

        expect(list).toHaveLength(1);
        expect(list.last()).toHaveValue('a');
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

      it('adds an link to the end', () => {
        list.push('pushed');
        expect(list.last()).toHaveValue('pushed');
      });

      it('returns the new length', () => {
        expect(list.push('pushed')).toBe(3);
      });
    });

    describe('removeAt', () => {
      beforeEach(() => { populate(list); });

      it('removes the link at a given index', () => {
        list.push('c');
        expect(list.findAt(1)).toHaveValue('b');
        list.removeAt(1);
        expect(list.findAt(1)).toHaveValue('c');
      });

      it('returns the removed link', () => {
        expect(list.removeAt(0)).toHaveValue('a');
      });

      context('when negative index', () => {
        it('raises an error', () => {
          expect(() => {
            list.removeAt(-1);
          }).toThrowError('Nothing to see here');
        });
      });

      context('when no link at the index', () => {
        it('raises an error', () => {
          expect(() => {
            list.removeAt(2);
          }).toThrowError('Nothing to see here');
        });
      });
    });

    describe('shift', () => {
      it('removes and returns the first link', () => {
        populate(list);

        expect(list).toHaveLength(2);
        expect(list.first()).toHaveValue('a');

        expect(list.shift()).toHaveValue('a');

        expect(list).toHaveLength(1);
        expect(list.first()).toHaveValue('b');
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

      it('adds an link to the beginning', () => {
        list.unshift('unshifted');
        expect(list.first()).toHaveValue('unshifted');
      });

      it('returns the new length', () => {
        expect(list.unshift('unshifted')).toBe(3);
      });
    });
  });
});

describe('DoublyLinkedList', () => {
  let list;
  beforeEach(() => {
    list = new DoublyLinkedList();
  });

  describe('reverseEach', () => {
    beforeEach(() => { populate(list); });

    it('calls the callback with each link and index', () => {
      const spy = jasmine.createSpy('each');
      list.reverseEach(spy);

      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenCalledWith(
        jasmine.objectContaining({ value: 'b' }),
        1
      );
      expect(spy).toHaveBeenCalledWith(
        jasmine.objectContaining({ value: 'a' }),
        0
      );
    });

    it('returns the same list', () => {
      expect(list.reverseEach(() => {})).toBe(list);
    });
  });
});
