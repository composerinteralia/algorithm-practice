const children = Symbol('children');
const parent = Symbol('parent');

class TreeNode {
  constructor(value) {
    this.value = value;
    this[children] = [];
    this[parent] = null;
  }

  addChild(child) {
    if (this[children].includes(child)) return false;

    const estranged = child.parent();
    if (estranged) {
      estranged.removeChild(child);
    }

    child[parent] = this;
    this[children].push(child);

    return true;
  }

  children() {
    return this[children].slice();
  }

  parent() {
    return this[parent];
  }

  removeChild(child) {
    if (!this[children].includes(child)) return false;

    this[children] = this[children].filter(c => c != child);
    child[parent] = null;
    return true;
  }

  setParent(newParent) {
    return newParent.addChild(this);
  }
}

module.exports = TreeNode;
