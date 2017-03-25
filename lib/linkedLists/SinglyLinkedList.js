class Link {
  constructor(value) {
    this.value = value;
    this.next = null;
  }

  connect(nextLink) {
    nextLink.next = this.next;
    this.next = nextLink;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = new Link();
    this.length = 0;
    this.tail = this.head;
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
    return this.head === this.tail;
  }

  last() {
    if (this.isEmpty()) {
      throw new Error('Nothing to see here');
    }

    return this.tail;
  }

  pop() {
    return this.removeAt(this.length - 1);
  }

  push(value) {
    const newLast = new Link(value);
    this.tail.connect(newLast);
    this.tail = newLast;
    return this.length += 1;
  }

  removeAt(i) {
    if (i < 0 || i > this.length - 1) {
      throw new Error('Nothing to see here');
    }

    let prev = this.head;
    for (let j = 0; j < i; j++) {
      prev = prev.next;
    }

    const removed = prev.next;

    prev.next = prev.next.next;
    if (prev.next === null) {
      this.tail = prev;
    }
    this.length -= 1;

    return removed;
  }

  reverseEach(callback) {
    const reversed = new SinglyLinkedList();
    this.forEach(link => reversed.unshift(link.value));

    let link = reversed.head.next;
    for (let i = 0; i < this.length; i++) {
      callback(link, this.length - 1 - i);
      link = link.next;
    }

    return this;
  }

  shift() {
    return this.removeAt(0);
  }

  unshift(value) {
    const newFirst = new Link(value);
    this.head.connect(newFirst);
    return this.length += 1;
  }
}

module.exports = SinglyLinkedList;
