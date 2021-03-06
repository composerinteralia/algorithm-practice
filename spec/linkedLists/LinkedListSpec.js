const SinglyLinkedList = require('../../lib/linkedLists/SinglyLinkedList.js');
const DoublyLinkedList = require('../../lib/linkedLists/DoublyLinkedList.js');

function populate(list) {
  list.push('a', 'a');
  list.push('b', 'b');
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
        list.push('c', 'c');
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
        list.push('pushed', 'pushed');
        expect(list.last()).toHaveValue('pushed');
      });

      it('returns the new length', () => {
        expect(list.push('pushed', 'pushed')).toBe(3);
      });

      it('handles links', () => {
        const link = new List.Link();
        list.push(link);
        expect(list.last()).toBe(link);
      });
    });

    describe('removeAt', () => {
      beforeEach(() => { populate(list); });

      it('removes the link at a given index', () => {
        list.push('c', 'c');
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

    describe('removeLink', () => {
      beforeEach(() => { populate(list); });

      it('removes the link from the list', () => {
        const removed = list.first();
        list.removeLink(removed);

        expect(list).toHaveLength(1);
        expect(removed.next).toBe(null);
        if (removed.prev) {
          expect(removed.prev).toBe(null);
        }
      });

      it('connects the link\'s next and prev', () => {
        const removed = list.last();
        list.push('c', 'c');
        list.removeLink(removed);

        expect(list.first().next).toBe(list.last());
        if (list.last().prev) {
          expect(list.last().prev).toBe(list.first());
        }
      });

      it('returns the same link', () => {
        const removed = list.first();
        expect(list.removeLink(removed)).toBe(removed);
      });

      context('when the link is not connected', () => {
        it('returns false', () => {
          expect(list.removeLink(new List.Link())).toBe(false);
        });
      });
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
        list.unshift('unshifted', 'unshifted');
        expect(list.first()).toHaveValue('unshifted', 'unshifted');
      });

      it('returns the new length', () => {
        expect(list.unshift('unshifted', 'unshifted')).toBe(3);
      });

      it('handles links', () => {
        const link = new List.Link();
        list.unshift(link);
        expect(list.first()).toBe(link);
      });
    });
  });
});
