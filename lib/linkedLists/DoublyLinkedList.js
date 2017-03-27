class Link {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }

  connect(link) {
    this.next = link;
    link.prev = this;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = new Link();
    this.tail = new Link();
    this.head.connect(this.tail);
    this.length = 0;
  }

  findAt(i) {
    if (i < 0 || i > this.length - 1) {
      throw new Error('Nothing to see here');
    }

    let link = this.head.next;
    for (let j = 0; j < i; j++) {
      link = link.next;
    }

    return link;
  }

  first() {
    if (this.isEmpty()) {
      throw new Error('Nothing to see here');
    }

    return this.head.next;
  }

  forEach(callback) {
    let link = this.head.next;

    for (let i = 0; i < this.length; i++) {
      callback(link, i);
      link = link.next;
    }

    return this;
  }

  isEmpty() {
    return this.head.next === this.tail;
  }

  last() {
    if (this.isEmpty()) {
      throw new Error('Nothing to see here');
    }

    return this.tail.prev;
  }

  pop() {
    return this.removeLink(this.last());
  }

  push(keyOrLink, value) {
    const link =
      keyOrLink instanceof Link ? keyOrLink : new Link(keyOrLink, value);
    this.tail.prev.connect(link);
    link.connect(this.tail);
    return this.length += 1;
  }

  removeAt(i) {
    const link = this.findAt(i);
    return this.removeLink(link);
  }

  removeLink(link) {
    if (!link.prev || !link.next) {
      return false;
    }

    link.prev.connect(link.next);
    link.prev = null;
    link.next = null;

    this.length -= 1;

    return link;
  }

  reverseEach(callback) {
    let link = this.tail.prev;

    for (let i = 0; i < this.length; i++) {
      callback(link, this.length - 1 - i);
      link = link.prev;
    }

    return this;
  }

  shift() {
    return this.removeAt(0);
  }

  unshift(keyOrLink, value) {
    const link =
      keyOrLink instanceof Link ? keyOrLink : new Link(keyOrLink, value);
    link.connect(this.head.next);
    this.head.connect(link);
    return this.length += 1;
  }
}

DoublyLinkedList.Link = Link;
module.exports = DoublyLinkedList;
