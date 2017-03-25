class Link {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }

  connect(next) {
    this.next = next;
    next.prev = this;
  }

  remove() {
    if (this.prev) {
      this.prev.next = this.next;
    }

    if (this.next) {
      this.next.prev = this.prev;
    }

    this.next = null;
    this.prev = null;

    return this;
  }
}

class List {
  constructor() {
    this.head = new Link();
    this.tail = new Link();
    this.head.connect(this.tail);
  }

  promote(link) {
    if (link.prev && link.next) {
      link.remove();
    }

    link.connect(this.head.next);
    this.head.connect(link);

    return link;
  }

  eject() {
    return this.tail.prev.remove();
  }
}


class LRUCache {
  constructor(maxLen, getValue) {
    this.getValue = getValue;
    this.length = 0;
    this.maxLen = maxLen;
    this.list = new List();
    this.map = {};
  }

  includes(key) {
    return !!this.map[key];
  }

  get(key) {
    if (!this.includes(key)) {
      if (this.length >= this.maxLen) {
        delete this.map[this.list.eject().key];
      } else {
        this.length += 1;
      }

      this.map[key] = new Link(key, this.getValue(key));
    }

    return this.list.promote(this.map[key]).value;
  }
}

module.exports = LRUCache;

