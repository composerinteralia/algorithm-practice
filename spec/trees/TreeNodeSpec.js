const TreeNode = require('../../lib/trees/TreeNode');

describe('TreeNode', () => {
  let root, child;
  beforeEach(() => {
    root = new TreeNode('root');
    child = new TreeNode('child');
    root.addChild(child);
  });

  describe('#addChild', () => {
    context('when child already belongs to parent', () => {
      it('does nothing', () => {
        const oldParent = child.parent();
        const oldChildren = root.children();

        root.addChild(child);

        expect(child.parent()).toBe(oldParent);
        expect(root.children()).toEqual(oldChildren);
      });

      it('returns false', () => {
        expect(root.addChild(child)).toBe(false);
      });
    });

    context('when child already has another parent', () => {
      let newParent;
      beforeEach(() => {
        newParent = new TreeNode('new parent');
        newParent.addChild(child);
      });

      it('changes the child\s parent', () => {
        expect(child.parent()).toBe(newParent);
      });

      it('removes child from the old parent\'s children', () => {
        expect(root.children()).not.toContain(child);
      });

      it('adds child to the new parent', () => {
        expect(newParent.children()).toContain(child);
      });

      it('returns true', () => {
        expect(root.addChild(child)).toBe(true);
      });
    });

    context('when child does not have a parent', () => {
      let newChild;
      beforeEach(() => {
        newChild = new TreeNode('new child');
        root.addChild(newChild);
      });

      it('sets the child\'s parent', () => {
        expect(newChild.parent()).toBe(root);
      });

      it('adds child to the new parent', () => {
        expect(root.children()).toContain(child, newChild);
      });
    });
  });

  describe('#children', () => {
    it('returns an array of children', () => {
      expect(root.children()).toEqual([child]);
    });
  });

  describe('#parent', () => {
    context('when the node is the root', () => {
      it('returns null', () => {
        expect(root.parent()).toBe(null);
      });
    });

    context('when the node is not the root', () => {
      it('returns the parent node', () => {
        expect(child.parent()).toBe(root);
      });
    });
  });

  describe('#removeChild', () => {
    context('when child belongs to parent', () => {
      it('removes the child from the parent', () => {
        root.removeChild(child);
        expect(root.children()).not.toContain(child);
      });

      it('orphans the child', () => {
        root.removeChild(child);
        expect(child.parent()).toBe(null);
      });

      it('returns true', () => {
        expect(root.removeChild(child)).toBe(true);
      });
    });

    context('when child does not belong to parent', () => {
      let parent;
      beforeEach(() => {
        parent = new TreeNode('parent');
      });

      it('does nothing', () => {
        parent.removeChild(child);
        expect(root.children()).toContain(child);
        expect(parent.children()).toHaveLength(0);
        expect(child.parent()).toBe(root);
      });

      it('returns false', () => {
        expect(parent.removeChild(child)).toBe(false);
      });
    });
  });

  describe('#setParent', () => {
    it('sets up the parent-child relationship', () => {
      const newParent = new TreeNode('new parent');
      child.setParent(newParent);
      expect(child.parent()).toBe(newParent);
      expect(newParent.children()).toContain(child);
      expect(root.children()).not.toContain(child);
    });
  });

  describe('#value', () => {
    it('returns the node\'s value', () => {
      expect(root).toHaveValue('root');
    });
  });
});
