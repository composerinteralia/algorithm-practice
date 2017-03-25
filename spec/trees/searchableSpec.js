const TreeNode = require('../../lib/trees/TreeNode');
const searchable = require('../../lib/trees/searchable');

searchable(TreeNode.prototype);

describe('search algorithms', () => {
  let a, b, c, d, e, f;
  beforeEach(() => {
    [a, b, c, d, e, f] =
      ['a', 'b', 'c', 'd', 'e', 'f'].map(val => new TreeNode(val));
    [b, c, d].forEach(node => a.addChild(node));
    [e, f].forEach(node => b.addChild(node));
  });

  describe('breadth first', () => {
    context('when the tree contains the target', () => {
      it('returns the target node', () => {
        expect(a.bfs('f')).toBe(f);
      });
    });

    context('when the tree does not contain the target', () => {
      it('returns -1', () => {
        expect(a.bfs('g')).toBe(-1);
      });
    });

    it('invokes callback with nodes in the correct order', () => {
      const callback = jasmine.createSpy('callback');
      a.bfs('g', callback);
      expect(callback.calls.allArgs()).toEqual(
        [[a], [b], [c], [d], [e], [f]]
      );
    });
  });

  describe('depth first', () => {
    context('when the tree contains the target', () => {
      it('returns the target node', () => {
        expect(a.dfs('f')).toBe(f);
      });
    });

    context('when the tree does not contain the target', () => {
      it('returns -1', () => {
        expect(a.dfs('g')).toBe(-1);
      });
    });

    it('invokes pre-order callback with nodes in correct order', () => {
      const callback = jasmine.createSpy('callback');
      a.dfs('g', callback);
      expect(callback.calls.allArgs()).toEqual(
        [[a], [b], [e], [f], [c], [d]]
      );
    });

    it('invokes post-order callback with nodes in correct order', () => {
      const callback = jasmine.createSpy('callback');
      a.dfs('g', null, callback);
      expect(callback.calls.allArgs()).toEqual(
        [[e], [f], [b], [c], [d], [a]]
      );
    });
  });
});
