const List = require('../linkedLists/DoublyLinkedList.js');
const Link = List.Link;

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

    const link = this.map[key];
    this.list.removeLink(link);
    this.list.unshift(link);
    return link.value;
  }
}

module.exports = LRUCache;

