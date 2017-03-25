class Link {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }

  connect(link) {
    this.next = link;
    link.prev = this;
  }

  remove() {
    this.prev.connect(this.next);
    this.prev = null;
    this.next = null;
    return this;
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
    return this.removeAt(this.length - 1);
  }

  push(value) {
    const link = new Link(value);
    this.tail.prev.connect(link);
    link.connect(this.tail);
    return this.length += 1;
  }

  removeAt(i) {
    const link = this.findAt(i);
    this.length -= 1;
    return link.remove();
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

  unshift(value) {
    const link = new Link(value);
    link.connect(this.head.next);
    this.head.connect(link);
    return this.length += 1;
  }
}

module.exports = DoublyLinkedList;
