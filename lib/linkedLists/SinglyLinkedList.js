class Link {
  constructor(key, value) {
    this.key = key;
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

  push(keyOrLink, value) {
    const newLast =
      keyOrLink instanceof Link ? keyOrLink : new Link(keyOrLink, value);
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

  removeLink(link) {
    let prev = this.head;
    while (prev.next !== link && prev.next !== this.tail) {
      prev = prev.next;
    }

    if (prev.next === link) {
      prev.next = link.next;
      link.next = null;
      this.length -= 1;
      return link;
    }

    return false;
  }

  reverseEach(callback) {
    const reversed = new SinglyLinkedList();
    this.forEach(link => reversed.unshift(link.key, link.value));

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

  unshift(keyOrLink, value) {
    const newFirst =
      keyOrLink instanceof Link ? keyOrLink : new Link(keyOrLink, value);
    this.head.connect(newFirst);
    return this.length += 1;
  }
}

SinglyLinkedList.Link = Link;
module.exports = SinglyLinkedList;
