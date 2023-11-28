class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(value) {
    const newNode = new Node(value);

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;

    while (true) {
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else if (value > current.value) {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      } else {
        return this;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(value, node = this.root) {
    const newNode = new Node(value);

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    if (value < node.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertRecursively(value, node.left);
      }
    } else if (value > node.value) {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertRecursively(value, node.right);
      }
    }

    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;

    while (current) {
      if (val === current.value) {
        return current;
      } else if (val < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, node = this.root) {
    if (!node) {
      // Node not found
      return undefined;
    }

    if (val === node.value) {
      // Node found
      return node;
    } else if (val < node.value) {
      return this.findRecursively(val, node.left);
    } else {
      return this.findRecursively(val, node.right);
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder(node = this.root, result = []) {
    if (node) {
      result.push(node.value);
      this.dfsPreOrder(node.left, result);
      this.dfsPreOrder(node.right, result);
    }
    return result;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder(node = this.root, result = []) {
    if (node) {
      this.dfsInOrder(node.left, result);
      result.push(node.value);
      this.dfsInOrder(node.right, result);
    }
    return result;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder(node = this.root, result = []) {
    if (node) {
      this.dfsPostOrder(node.left, result);
      this.dfsPostOrder(node.right, result);
      result.push(node.value);
    }
    return result;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const result = [];
    const queue = [this.root];

    while (queue.length > 0) {
      const current = queue.shift();
      result.push(current.value);

      if (current.left) {
        queue.push(current.left);
      }

      if (current.right) {
        queue.push(current.right);
      }
    }

    return result;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    const removeNode = (node, value) => {
      if (node === null) {
        return null;
      }

      if (value < node.value) {
        node.left = removeNode(node.left, value);
      } else if (value > node.value) {
        node.right = removeNode(node.right, value);
      } else {
        if (node.left === null && node.right === null) {
          return null;
        } else if (node.left === null) {
          return node.right;
        } else if (node.right === null) {
          return node.left;
        } else {
          const minValue = this.findMin(node.right);
          node.value = minValue;
          node.right = removeNode(node.right, minValue);
        }
      }

      return node;
    };
    this.root = removeNode(this.root, val);

    return val;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    const checkBalance = (node) => {
      if (node === null) {
        return { height: 0, balanced: true };
      }

      const left = checkBalance(node.left);
      const right = checkBalance(node.right);

      const height = Math.max(left.height, right.height) + 1;
      const balanced = Math.abs(left.height - right.height) <= 1 && left.balanced && right.balanced;

      return { height, balanced };
    };

    return checkBalance(this.root).balanced;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) {
      return undefined;
    }

    let parent = null;
    let current = this.root;

    while (current.right) {
      parent = current;
      current = current.right;
    }

    if (current.left) {
      return this.findMaximum(current.left);
    }

    return parent.value;
  }

  findMaximum(node) {
    while (node.right) {
      node = node.right;
    }
    return node.value;
  }
}

module.exports = BinarySearchTree;
