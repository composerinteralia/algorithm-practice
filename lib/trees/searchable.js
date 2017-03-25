const List = require('../linkedLists/SinglyLinkedList');

function searchable(obj) {
  obj.bfs = function bfs(target, callback) {
    const queue = new List();
    queue.push(this);

    while (!queue.isEmpty()) {
      const node = queue.shift().key;
      callback && callback(node);

      if (node.value === target) {
        return node;
      }

      node.children().forEach(c => queue.push(c));
    }

    return -1;
  };

  obj.dfs = function dfs(target, preCallback, postCallback) {
    if (this.value === target) return this;

    preCallback && preCallback(this);

    const children = this.children();
    for (let i = 0; i < children.length; i++) {
      const result = children[i].dfs(target, preCallback, postCallback);
      if (result !== -1) return result;
    }

    postCallback && postCallback(this);

    return -1;
  };
}

module.exports = searchable;
