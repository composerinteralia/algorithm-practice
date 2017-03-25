const List = require('../linkedLists/DoublyLinkedList.js');
const Link = List.Link;

List.prototype.promote = function promote(link) {
  if (link.prev && link.next) {
    link.remove();
  } else {
    this.length += 1;
  }

  link.connect(this.head.next);
  this.head.connect(link);

  return link;
};

class LRUCache {
  constructor(maxLen, getValue) {
    this.getValue = getValue;
    this.maxLen = maxLen;
    this.list = new List();
    this.map = {};
  }

  includes(key) {
    return !!this.map[key];
  }

  get(key) {
    if (!this.includes(key)) {
      if (this.list.length >= this.maxLen) {
        delete this.map[this.list.pop().key];
      }

      this.map[key] = new Link(key, this.getValue(key));
    }

    return this.list.promote(this.map[key]).value;
  }
}

module.exports = LRUCache;

